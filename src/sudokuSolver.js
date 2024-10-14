export function solveSudoku(board) {
    const isSafe = (row, col, num) => {
        // Check the row and column
        for (let x = 0; x < 9; x++) {
            if (
                board[row][x] === num ||
                board[x][col] === num ||
                board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + (x % 3)] === num
            ) {
                return false;
            }
        }
        return true;
    };

    const solve = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isSafe(row, col, num)) {
                            board[row][col] = num; // Try this number
                            if (solve()) {
                                return true; // If it leads to a solution, return true
                            }
                            board[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // No solution found
                }
            }
        }
        return true; // Solved
    };

    solve(); // Start solving
    return board; // Return solved board
}
