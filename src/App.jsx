import React,{useState,useEffect,useRef} from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import './App.css';
import  {bfs}  from './algorithms/bfs';
import { astar } from './algorithms/astar';
import { dijkstra } from './algorithms/dijkstra';
import {dfs} from './algorithms/dfs';
import GuideModal from './components/GuideModal';


function App() {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [mode, setMode] = useState('wall'); 
  // mode: 'wall' | 'start' | 'end'
  const [activeButton, setActiveButton] = useState(null);
  const [speed, setSpeed] = useState(1); // Default 1x speed
  const [isAnimating, setIsAnimating] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const totalGuideSteps = 3;
  const [guideIndex, setGuideIndex] = useState(0);
  const timeoutRefs = useRef([]);  // for clearing animation if needed

  

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setActiveButton(newMode);
  };

  const handleVisualizeClick = () => {
    handleVisualize();
    setActiveButton("visualize");
  };

  const handleResetClick = () => {
    handleFullReset(); 
    setActiveButton("reset");
  };

  const [selectedAlgo, setSelectedAlgo] = useState('bfs');

  const [rows, setRows] = useState(17);
  const [cols, setCols] = useState(40);

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setCols(15);
        setRows(20);
      } else if (width < 1024) {
        setCols(25);
        setRows(20);
      } else {
        setCols(40);
        setRows(17);
      }
    };

    updateGridSize(); 
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);
  const [grid, setGrid] = useState([]);

  const createInitialGrid = () => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push({
          row,
          col,
          isStart: false, 
          isEnd: false,  
          isWall: false,
          isVisited: false,
          isPath: false
        });
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  };
  useEffect(() => {
    setGrid(createInitialGrid());
  }, [rows, cols]);


  useEffect(() => {
    // Clear only visited and path, NOT walls, start or end
    const clearedGrid = grid.map(row =>
      row.map(cell => ({
        ...cell,
        isVisited: false,
        isPath: false,
      }))
    );
    setGrid(clearedGrid);
  }, [selectedAlgo]);

  

  

  const toggleWall = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isEnd) {
      node.isWall = !node.isWall;
      setGrid(newGrid);
    }
  };


  // Reset grid before and after using bfs/dfs/a*/dijkstra
  const resetGridState = (customGrid = grid) => {
    const newGrid = customGrid.map(row =>
      row.map(cell => ({
        ...cell,
        isVisited: false,
        isPath: false,
      }))
    );
    setGrid(newGrid);
    return newGrid;
  };
  
  const handleFullReset = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    setIsAnimating(false);
    const freshGrid = createInitialGrid();
    setGrid(freshGrid);
  };
  
  
    

  const handleVisualize = () => {
    const start = grid.flat().find(node => node.isStart);
    const end = grid.flat().find(node => node.isEnd);
  
    if (!start || !end) {
      alert("Please set both START and END nodes.");
      return;
    }
    
    const cleanedGrid = resetGridState(); 

    let result;
    if (selectedAlgo === 'bfs') {
      result = bfs(grid, start, end);
    } else if (selectedAlgo === 'astar') {
      result = astar(grid, start, end);
    }else if(selectedAlgo === 'dijkstra'){
      result = dijkstra(grid, start, end);
    }else if(selectedAlgo==='dfs'){
      result=dfs(grid,start,end);
    }


  
    if (result) {
      const { visitedOrder, path } = result;
      animateTraversal(visitedOrder, path);
    }
  };
  
  const animateTraversal = (visitedNodes, pathNodes) => {
    setIsAnimating(true); // Block interactions
  
    timeoutRefs.current.forEach(clearTimeout); // Clear any previous timeouts
    timeoutRefs.current = [];
  
    for (let i = 0; i < visitedNodes.length; i++) {
      const timeout = setTimeout(() => {
        const node = visitedNodes[i];
        const newGrid = grid.slice();
        newGrid[node.row][node.col].isVisited = true;
        setGrid([...newGrid]);
      }, (15 / speed) * i);
      timeoutRefs.current.push(timeout);
    }
  
    const totalVisitedTime = (15 / speed) * visitedNodes.length;
  
    for (let i = 0; i < pathNodes.length; i++) {
      const timeout = setTimeout(() => {
        const node = pathNodes[i];
        const newGrid = grid.slice();
        newGrid[node.row][node.col].isPath = true;
        setGrid([...newGrid]);
  
        if (i === pathNodes.length - 1) {
          setIsAnimating(false); // Animation done
        }
      }, totalVisitedTime + (30 / speed) * i);
      timeoutRefs.current.push(timeout);
    }
  
    // Fallback end in case no path
    if (pathNodes.length === 0) {
      const fallback = setTimeout(() => {
        setIsAnimating(false);
      }, totalVisitedTime);
      timeoutRefs.current.push(fallback);
    }
  };
  
  const handleCellClick = (row, col) => {
    if (isAnimating) return;
    const cleanedGrid = resetGridState(grid); // Pass the current grid

  
    const newGrid = cleanedGrid.map(row => row.map(cell => ({ ...cell })));
  
    if (mode === 'wall') {
      if (!newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
        // Clear visited/path when wall is added/removed
        newGrid[row][col].isVisited = false;
        newGrid[row][col].isPath = false;
        newGrid[row][col].isWall = !newGrid[row][col].isWall;
      }
    } else if (mode === 'start') {
      newGrid.forEach(row => row.forEach(cell => (cell.isStart = false)));
      newGrid[row][col].isStart = true;
    } else if (mode === 'end') {
      newGrid.forEach(row => row.forEach(cell => (cell.isEnd = false)));
      newGrid[row][col].isEnd = true;
    }
  
    setGrid(newGrid);
  };
  

  // Mouse Drag
  const handleMouseDown = (row, col) => {
    if (mode === 'wall') {
      handleCellClick(row, col);
      setMouseIsPressed(true);
    } else {
      handleCellClick(row, col);
    }
  };
  
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || mode !== 'wall') return;
    handleCellClick(row, col);
  };
  
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  
  const generateRandomMaze = () => {
    const newGrid = grid.map(row =>
      row.map(cell => {
        const isStart = cell.isStart;
        const isEnd = cell.isEnd;
  
        return {
          ...cell,
          isVisited: false,  // ✅ Clear old traversal
          isPath: false,     // ✅ Clear old path
          isWall: (!isStart && !isEnd && Math.random() < 0.3), // only add wall if not start/end
        };
      })
    );
    setGrid(newGrid);
  };
  
  
  

  
  return (
    <>
       {showGuide && (
        <GuideModal
          guideIndex={guideIndex}
          setGuideIndex={setGuideIndex}
          setShowGuide={setShowGuide}
        />
      )}

      <div className="app-container">
        <h1>Pathfinding Visualizer</h1>

        <Controls 
          onVisualize={handleVisualizeClick} 
          setMode={handleModeChange}    
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
          onReset={handleResetClick}     
          activeButton={activeButton}
          speed={speed}
          setSpeed={setSpeed}
        />


        <button onClick={generateRandomMaze} style={{ marginBottom: '10px' }} className="random">Generate Random Maze</button>

        <Grid
          grid={grid}
          toggleWall={toggleWall}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />

    </div>
    </>
  )
}

export default App
