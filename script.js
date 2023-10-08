document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("tic-tac-toe-board");
    const cells = [];
    let currentPlayer = "X";
    let gameOver = false;
    const boardSize = 4;

    // Create the game board
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }

    // Function to make a move
    function makeMove(index) {
        if (!gameOver && cells[index].textContent === "") {
            cells[index].textContent = currentPlayer;
            if (checkWinner(currentPlayer)) {
                alert(`Player ${currentPlayer} wins!`);
                gameOver = true;
            } else if (cells.every(cell => cell.textContent !== "")) {
                alert("It's a draw!");
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to check for a winner
    function checkWinner(player) {
        const winningCombos = [];

        // Check rows, columns, and diagonals
        for (let i = 0; i < boardSize; i++) {
            const row = [];
            const col = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(cells[i * boardSize + j]);
                col.push(cells[j * boardSize + i]);
            }
            winningCombos.push(row, col);
        }

        // Check diagonals
        const diagonal1 = [];
        const diagonal2 = [];
        for (let i = 0; i < boardSize; i++) {
            diagonal1.push(cells[i * boardSize + i]);
            diagonal2.push(cells[i * boardSize + (boardSize - 1 - i)]);
        }
        winningCombos.push(diagonal1, diagonal2);

        return winningCombos.some(combination => {
            return combination.every(cell => cell.textContent === player);
        });
    }

    // Restart the game
    document.getElementById("restart-button").addEventListener("click", () => {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        gameOver = false;
    });
});
