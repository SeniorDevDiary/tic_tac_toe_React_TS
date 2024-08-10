import React from "react";

interface BoardProps {
  squares: string[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <button key={index} className="square" onClick={() => onClick(index)}>
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
