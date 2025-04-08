import React from 'react';
import './Grid.css';
import Cell from './Cell';

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div className="grid" onMouseLeave={onMouseUp}>
      {grid.map((row, rowIdx) => (
        <div className="grid-row" key={rowIdx}>
          {row.map((node, colIdx) => (
            <Cell
              key={`${rowIdx}-${colIdx}`}
              node={node}
              onMouseDown={() => onMouseDown(rowIdx, colIdx)}
              onMouseEnter={() => onMouseEnter(rowIdx, colIdx)}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
