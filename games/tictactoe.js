// Tic Tac Toe Game
let tictactoeGame = {
    board: ['', '', '', '', '', '', '', '', ''],
    playerSymbol: 'X',
    computerSymbol: 'O',
    gameOver: false
};

function initTicTacToe() {
    tictactoeGame.board = ['', '', '', '', '', '', '', '', ''];
    tictactoeGame.gameOver = false;

    const boardElement = document.getElementById('tictactoe-board');
    boardElement.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'tictactoe-cell';
        cell.dataset.index = i;
        cell.onclick = () => playerMoveTicTacToe(i);
        boardElement.appendChild(cell);
    }

    updateTicTacToeStatus();
}

function playerMoveTicTacToe(index) {
    if (tictactoeGame.gameOver || tictactoeGame.board[index] !== '') return;

    tictactoeGame.board[index] = tictactoeGame.playerSymbol;
    updateTicTacToeBoard();

    if (checkWinner(tictactoeGame.board)) {
        tictactoeGame.gameOver = true;
        updateTicTacToeStatus('You won! 🎉');
        return;
    }

    if (tictactoeGame.board.every(cell => cell !== '')) {
        tictactoeGame.gameOver = true;
        updateTicTacToeStatus('Draw! 🤝');
        return;
    }

    setTimeout(() => {
        computerMoveTicTacToe();
    }, 500);
}

function computerMoveTicTacToe() {
    if (tictactoeGame.gameOver) return;

    // AI: Check if computer can win
    for (let i = 0; i < 9; i++) {
        if (tictactoeGame.board[i] === '') {
            tictactoeGame.board[i] = tictactoeGame.computerSymbol;
            if (checkWinner(tictactoeGame.board)) {
                updateTicTacToeBoard();
                tictactoeGame.gameOver = true;
                updateTicTacToeStatus('Computer won! 🤖');
                return;
            }
            tictactoeGame.board[i] = '';
        }
    }

    // AI: Block player from winning
    for (let i = 0; i < 9; i++) {
        if (tictactoeGame.board[i] === '') {
            tictactoeGame.board[i] = tictactoeGame.playerSymbol;
            if (checkWinner(tictactoeGame.board)) {
                tictactoeGame.board[i] = tictactoeGame.computerSymbol;
                updateTicTacToeBoard();
                updateTicTacToeStatus('Your turn (X)');
                return;
            }
            tictactoeGame.board[i] = '';
        }
    }

    // AI: Take center if available
    if (tictactoeGame.board[4] === '') {
        tictactoeGame.board[4] = tictactoeGame.computerSymbol;
        updateTicTacToeBoard();
        updateTicTacToeStatus('Your turn (X)');
        return;
    }

    // AI: Take random corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => tictactoeGame.board[i] === '');
    if (availableCorners.length > 0) {
        const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        tictactoeGame.board[randomCorner] = tictactoeGame.computerSymbol;
        updateTicTacToeBoard();
        updateTicTacToeStatus('Your turn (X)');
        return;
    }

    // AI: Take any available space
    for (let i = 0; i < 9; i++) {
        if (tictactoeGame.board[i] === '') {
            tictactoeGame.board[i] = tictactoeGame.computerSymbol;
            updateTicTacToeBoard();
            updateTicTacToeStatus('Your turn (X)');
            return;
        }
    }

    // Board is full
    tictactoeGame.gameOver = true;
    updateTicTacToeStatus('Draw! 🤝');
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function updateTicTacToeBoard() {
    const cells = document.querySelectorAll('.tictactoe-cell');
    cells.forEach((cell, index) => {
        cell.textContent = tictactoeGame.board[index];
    });
}

function updateTicTacToeStatus(message = null) {
    const statusElement = document.getElementById('tictactoe-status');
    if (message) {
        statusElement.textContent = message;
    } else {
        statusElement.textContent = 'Your turn (X)';
    }
}