export function astar(grid, startNode, endNode) {
    const visitedOrder = [];
    const cameFrom = new Map();
  
    const openSet = [startNode];
    const gScore = {};
    const fScore = {};
  
    for (const row of grid) {
      for (const node of row) {
        gScore[`${node.row}-${node.col}`] = Infinity;
        fScore[`${node.row}-${node.col}`] = Infinity;
      }
    }
  
    gScore[`${startNode.row}-${startNode.col}`] = 0;
    fScore[`${startNode.row}-${startNode.col}`] = heuristic(startNode, endNode);
  
    while (openSet.length > 0) {
      // Sort openSet by lowest fScore
      openSet.sort((a, b) => fScore[`${a.row}-${a.col}`] - fScore[`${b.row}-${b.col}`]);
      const current = openSet.shift();
  
      if (current.row === endNode.row && current.col === endNode.col) {
        const path = reconstructPath(cameFrom, endNode);
        return { visitedOrder, path };
      }
  
      visitedOrder.push(current);
  
      for (const neighbor of getNeighbors(current, grid)) {
        if (neighbor.isWall) continue;
  
        const tempG = gScore[`${current.row}-${current.col}`] + 1;
        if (tempG < gScore[`${neighbor.row}-${neighbor.col}`]) {
          cameFrom.set(`${neighbor.row}-${neighbor.col}`, current);
          gScore[`${neighbor.row}-${neighbor.col}`] = tempG;
          fScore[`${neighbor.row}-${neighbor.col}`] = tempG + heuristic(neighbor, endNode);
  
          if (!openSet.some(n => n.row === neighbor.row && n.col === neighbor.col)) {
            openSet.push(neighbor);
          }
        }
      }
    }
  
    return { visitedOrder, path: [] };
  }
  
  function heuristic(a, b) {
    // Manhattan Distance
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }
  
  function getNeighbors(node, grid) {
    const { row, col } = node;
    const neighbors = [];
  
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
    return neighbors;
  }
  
  function reconstructPath(cameFrom, endNode) {
    const path = [];
    let current = endNode;
    while (cameFrom.has(`${current.row}-${current.col}`)) {
      path.unshift(current);
      current = cameFrom.get(`${current.row}-${current.col}`);
    }
    path.unshift(current);
    return path;
  }
  