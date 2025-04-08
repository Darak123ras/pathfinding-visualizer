import React from "react";
import './Controls.css';


const Controls = ({ onVisualize, setMode, selectedAlgo, setSelectedAlgo, onReset, activeButton, speed, setSpeed }) => {
    return (
      <div className="controls">
        <select value={selectedAlgo} onChange={(e) => setSelectedAlgo(e.target.value)} className="option">
          <option value="bfs">Breadth First Search (BFS)</option>
          <option value="astar">A* Search</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="dfs">Depth First Search (DFS)</option>
        </select>
  
        <button 
          onClick={() => setMode('start')} 
          className={activeButton === 'start' ? 'active' : ''}
        >
          Start
        </button>
        <button 
          onClick={() => setMode('end')} 
          className={activeButton === 'end' ? 'active' : ''}
        >
          End
        </button>
        <button 
          onClick={() => setMode('wall')} 
          className={activeButton === 'wall' ? 'active' : ''}
        >
          Walls
        </button>
        <button 
          onClick={onVisualize} 
          className={activeButton === 'visualize' ? 'active' : ''}
        >
          Visualize
        </button>
        <button 
          onClick={onReset} 
          className={activeButton === 'reset' ? 'active' : ''}
        >
          Reset
        </button>

        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} style={{ marginLeft: '10px' }} className="option">
            <option value={0.25}> 0.25x</option>
            <option value={0.5}> 0.5x</option>
            <option value={1}> 1x</option>
            <option value={2}> 2x</option>
            <option value={4}> 4x</option>
            <option value={6}> 6x</option>
        </select>
      </div>
    );
  };

  export default Controls;