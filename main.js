// Main game navigation and utilities

function showGame(gameId) {
    // Hide all game screens
    const screens = document.querySelectorAll('.game-screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show selected game screen
    const selectedGame = document.getElementById(gameId);
    if (selectedGame) {
        selectedGame.classList.add('active');
    }

    // Update menu buttons
    const buttons = document.querySelectorAll('.menu-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Initialize game when shown
    if (gameId === 'snake') {
        initSnake();
    } else if (gameId === 'tictactoe') {
        initTicTacToe();
    } else if (gameId === '2048') {
        init2048();
    } else if (gameId === 'memory') {
        initMemory();
    } else if (gameId === 'flappy') {
        initFlappy();
    }
}

// Initialize the first game on page load
window.addEventListener('load', () => {
    initSnake();
});