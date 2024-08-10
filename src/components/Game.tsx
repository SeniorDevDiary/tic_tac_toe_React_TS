import React, { useState, useEffect } from "react";
import Board from "./Board";

const Game: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (!isXNext && !winner) {
      const aiMove = getBestMove(squares);
      if (aiMove !== -1) {
        handleClick(aiMove);
      }
    }
  }, [isXNext, winner, squares]);

  const handleClick = (index: number) => {
    if (squares[index] || winner) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(""));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <Board squares={squares} onClick={handleClick} />
      <div className="info">
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

// AI function to get the best move
const getBestMove = (squares: string[]): number => {
  const availableSquares = squares
    .map((square, index) => (square === "" ? index : -1))
    .filter((index) => index !== -1);
  if (availableSquares.length === 0) return -1;

  // Random AI move, can be replaced with more complex logic
  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
};

export default Game;
