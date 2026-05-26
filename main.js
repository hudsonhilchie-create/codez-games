// Main game controller

function startGame(gameId) {
    const modal = document.getElementById('gameModal');
    const gameArea = document.getElementById('gameArea');
    
    // Clear previous game
    gameArea.innerHTML = '';
    
    // Create appropriate game HTML based on game ID
    if (gameId === 'snake') {
        gameArea.innerHTML = `
            <div class="game-header">
                <h2>🐍 SNAKE</h2>
                <div class="game-info">
                    <span>Score: <span id="snake-score">0</span></span>
                    <button class="reset-btn" onclick="initSnake()">New Game</button>
                </div>
            </div>
            <canvas id="snakeCanvas" width="400" height="400"></canvas>
            <p style="text-align: center; color: #666; font-style: italic;">Use Arrow Keys to move. Eat the food to grow!</p>
        `;
    } else if (gameId === 'tictactoe') {
        gameArea.innerHTML = `
            <div class="game-header">
                <h2>⭕ TIC TAC TOE</h2>
                <button class="reset-btn" onclick="initTicTacToe()">New Game</button>
            </div>
            <div class="tictactoe-board" id="tictactoe-board"></div>
            <p id="tictactoe-status" class="game-status">Your turn (X)</p>
        `;
    } else if (gameId === '2048') {
        gameArea.innerHTML = `
            <div class="game-header">
                <h2>2048</h2>
                <div class="game-info">
                    <span>Score: <span id="game2048-score">0</span></span>
                    <button class="reset-btn" onclick="init2048()">New Game</button>
                </div>
            </div>
            <div class="grid-2048" id="grid-2048"></div>
            <p style="text-align: center; color: #666; font-style: italic;">Use Arrow Keys to move tiles. Combine same numbers!</p>
        `;
    } else if (gameId === 'memory') {
        gameArea.innerHTML = `
            <div class="game-header">
                <h2>🧠 MEMORY</h2>
                <div class="game-info">
                    <span>Matches: <span id="memory-matches">0</span>/6</span>
                    <button class="reset-btn" onclick="initMemory()">New Game</button>
                </div>
            </div>
            <div class="memory-grid" id="memory-grid"></div>
        `;
    } else if (gameId === 'flappy') {
        gameArea.innerHTML = `
            <div class="game-header">
                <h2>🐦 FLAPPY BIRD</h2>
                <div class="game-info">
                    <span>Score: <span id="flappy-score">0</span></span>
                    <button class="reset-btn" onclick="initFlappy()">New Game</button>
                </div>
            </div>
            <canvas id="flappyCanvas" width="400" height="500"></canvas>
            <p style="text-align: center; color: #666; font-style: italic;">Click or Press SPACE to fly!</p>
        `;
    }
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize the game after a short delay to ensure DOM is ready
    setTimeout(() => {
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
    }, 100);
}

function closeGame() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Stop all game loops
    if (snakeGame.gameLoop) clearInterval(snakeGame.gameLoop);
    if (game2048.gameLoop) clearInterval(game2048.gameLoop);
    if (flappyGame.gameLoop) clearInterval(flappyGame.gameLoop);
    
    // Remove event listeners
    document.removeEventListener('keydown', handleSnakeKeyPress);
    document.removeEventListener('keydown', handle2048KeyPress);
    document.removeEventListener('click', flappyJump);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    const modalContent = document.querySelector('.modal-content');
    if (event.target === modal || event.target === document.querySelector('.modal-overlay')) {
        closeGame();
    }
}

// Scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
