import React from 'react';
import './Cell.css';

const Cell = ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const {
    isStart,
    isEnd,
    isWall,
    isVisited,
    isPath,
  } = node;

  let className = 'cell';
  if (isStart) className += ' cell-start';
  else if (isEnd) className += ' cell-end';
  else if (isWall) className += ' cell-wall';
  else if (isPath) className += ' cell-path';
  else if (isVisited) className += ' cell-visited';

  return (
    <div
      className={className}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  );
};

export default Cell;
