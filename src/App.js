import React, { useState } from 'react';
import './App.css';

const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const App = () => {
    const [board, setBoard] = useState(initialBoard);
    const [message, setMessage] = useState('');

    const isValid = (board, row, col, num) => {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num) {
                return false; // Check row and column
            }
        }

        // Check 3x3 grid
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) {
                    return false; // Check grid
                }
            }
        }
        return true;
    };

    const solveSudoku = (board) => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) { // Empty cell found
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num; // Assign number

                            if (solveSudoku(board)) {
                                return true; // Successfully solved
                            }

                            board[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // Trigger backtracking
                }
            }
        }
        return true; // Puzzle solved
    };

    const handleSolve = () => {
        const boardCopy = board.map(row => [...row]);
        if (solveSudoku(boardCopy)) {
            setBoard(boardCopy);
            setMessage('Solved successfully!');
        } else {
            setMessage('No solution exists.');
        }
    };

    const handleChange = (row, col, value) => {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = value ? parseInt(value) : 0;
        setBoard(newBoard);
    };

    return (
        <div className="App">
            <h1>Sudoku Solver</h1>
            <div className="grid">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                min="1"
                                max="9"
                                value={cell === 0 ? '' : cell}
                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                className="cell"
                                disabled={initialBoard[rowIndex][colIndex] !== 0} // Disable cells that are pre-filled
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleSolve} className="solve-button">Solve</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
