import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [next, setNext] = useState(true);

  function handleClick(index) {
    const squares = [...board];

    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    
    squares[index] = next ? "X" : "O";
    setBoard(squares);
    setNext(!next);
  }

  function renderSquare(index) {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  }

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next Player: ${next ? "X" : "O"}`;

  function calculateWinner(squares) {
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

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const reset = () => {
    setBoard(Array(9).fill(null));
    setNext(null);
  };

  return (
    <div className="container">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
