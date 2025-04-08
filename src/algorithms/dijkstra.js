export function dijkstra(grid, startNode, endNode) {
    const visitedOrder = [];
    const unvisitedNodes = [];
    const distances = {};
    const previousNodes = {};
  
    for (let row of grid) {
      for (let node of row) {
        const nodeKey = `${node.row}-${node.col}`;
        distances[nodeKey] = Infinity;
        previousNodes[nodeKey] = null;
        unvisitedNodes.push(node);
      }
    }
  
    distances[`${startNode.row}-${startNode.col}`] = 0;
  
    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort(
        (a, b) =>
          distances[`${a.row}-${a.col}`] - distances[`${b.row}-${b.col}`]
      );
  
      const current = unvisitedNodes.shift();
      const { row, col, isWall } = current;
  
      if (isWall) continue;
      if (distances[`${row}-${col}`] === Infinity) break;
  
      visitedOrder.push(current);
  
      if (current === endNode) break;
  
      const neighbors = getNeighbors(current, grid);
      for (let neighbor of neighbors) {
        const nKey = `${neighbor.row}-${neighbor.col}`;
        const alt = distances[`${row}-${col}`] + 1; // Distance between adjacent cells is 1
  
        if (alt < distances[nKey]) {
          distances[nKey] = alt;
          previousNodes[nKey] = current;
        }
      }
    }
  
    const path = [];
    let curr = endNode;
    while (curr !== null) {
      path.unshift(curr);
      curr = previousNodes[`${curr.row}-${curr.col}`];
    }
  
    return { visitedOrder, path };
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
  