export function bfs(grid, startNode, endNode) {
    const queue = [];
    const visited = new Set();
    const visitedOrder = [];
    const pathMap = new Map();
  
    queue.push(startNode);
    visited.add(`${startNode.row}-${startNode.col}`);
  
    while (queue.length > 0) {
      const current = queue.shift();
      visitedOrder.push(current);
  
      if (current.row === endNode.row && current.col === endNode.col) {
        const path = reconstructPath(pathMap, endNode);
        return { visitedOrder, path };
      }
  
      const neighbors = getNeighbors(current, grid);
      for (const neighbor of neighbors) {
        const key = `${neighbor.row}-${neighbor.col}`;
        if (!visited.has(key) && !neighbor.isWall) {
          visited.add(key);
          pathMap.set(key, current);
          queue.push(neighbor);
        }
      }
    }
  
    return { visitedOrder, path: [] }; // No path found
}
  
  
  function getNeighbors(node, grid) {
    const { row, col } = node;
    const neighbors = [];
  
    if (row > 0) neighbors.push(grid[row - 1][col]);       // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]);       // left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  
    return neighbors;
  }
  
  function reconstructPath(pathMap, endNode) {
    const path = [];
    let current = endNode;
  
    while (current) {
      path.unshift(current);
      const key = `${current.row}-${current.col}`;
      current = pathMap.get(key);
    }
  
    return path;
  }
  