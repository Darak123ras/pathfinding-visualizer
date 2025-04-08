export function dfs(grid, startNode, endNode) {
    const visitedOrder = [];
    const path = [];
    const visited = new Set();
  
    const found = dfsRecursive(grid, startNode, endNode, visited, visitedOrder, path);
    return {
      visitedOrder,
      path: found ? path.reverse() : []
    };
  }
  
  function dfsRecursive(grid, current, endNode, visited, visitedOrder, path) {
    const key = `${current.row}-${current.col}`;
    if (visited.has(key) || current.isWall) return false;
  
    visited.add(key);
    visitedOrder.push(current);
  
    if (current === endNode) {
      path.push(current);
      return true;
    }
  
    const neighbors = getNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (dfsRecursive(grid, neighbor, endNode, visited, visitedOrder, path)) {
        path.push(current);
        return true;
      }
    }
  
    return false;
  }
  
  function getNeighbors(grid, node) {
    const { row, col } = node;
    const neighbors = [];
  
    if (row > 0) neighbors.push(grid[row - 1][col]); // up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
    if (col > 0) neighbors.push(grid[row][col - 1]); // left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  
    return neighbors;
  }
  