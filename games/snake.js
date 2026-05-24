// Snake Game
let snakeGame = {
    canvas: null,
    ctx: null,
    snake: [{ x: 200, y: 200 }],
    food: { x: 100, y: 100 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    gameRunning: false,
    gameLoop: null,
    gridSize: 20
};

function initSnake() {
    snakeGame.canvas = document.getElementById('snakeCanvas');
    snakeGame.ctx = snakeGame.canvas.getContext('2d');
    snakeGame.snake = [{ x: 200, y: 200 }];
    snakeGame.direction = { x: 1, y: 0 };
    snakeGame.nextDirection = { x: 1, y: 0 };
    snakeGame.score = 0;
    snakeGame.gameRunning = true;
    
    generateSnakeFood();
    document.getElementById('snake-score').textContent = '0';

    // Clear previous game loop
    if (snakeGame.gameLoop) clearInterval(snakeGame.gameLoop);

    // Start game loop
    snakeGame.gameLoop = setInterval(updateSnakeGame, 100);

    // Add keyboard controls
    document.addEventListener('keydown', handleSnakeKeyPress);
}

function generateSnakeFood() {
    snakeGame.food = {
        x: Math.floor(Math.random() * 20) * 20,
        y: Math.floor(Math.random() * 20) * 20
    };
}

function handleSnakeKeyPress(e) {
    if (!snakeGame.gameRunning) return;

    switch(e.key) {
        case 'ArrowUp':
            if (snakeGame.direction.y === 0) snakeGame.nextDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (snakeGame.direction.y === 0) snakeGame.nextDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (snakeGame.direction.x === 0) snakeGame.nextDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeGame.direction.x === 0) snakeGame.nextDirection = { x: 1, y: 0 };
            break;
    }
}

function updateSnakeGame() {
    snakeGame.direction = snakeGame.nextDirection;

    // Calculate new head position
    const head = snakeGame.snake[0];
    const newHead = {
        x: head.x + snakeGame.direction.x * snakeGame.gridSize,
        y: head.y + snakeGame.direction.y * snakeGame.gridSize
    };

    // Check wall collision
    if (newHead.x < 0 || newHead.x >= snakeGame.canvas.width ||
        newHead.y < 0 || newHead.y >= snakeGame.canvas.height) {
        endSnakeGame();
        return;
    }

    // Check self collision
    for (let segment of snakeGame.snake) {
        if (newHead.x === segment.x && newHead.y === segment.y) {
            endSnakeGame();
            return;
        }
    }

    snakeGame.snake.unshift(newHead);

    // Check food collision
    if (newHead.x === snakeGame.food.x && newHead.y === snakeGame.food.y) {
        snakeGame.score += 10;
        document.getElementById('snake-score').textContent = snakeGame.score;
        generateSnakeFood();
    } else {
        snakeGame.snake.pop();
    }

    drawSnakeGame();
}

function drawSnakeGame() {
    // Clear canvas
    snakeGame.ctx.fillStyle = '#000';
    snakeGame.ctx.fillRect(0, 0, snakeGame.canvas.width, snakeGame.canvas.height);

    // Draw grid
    snakeGame.ctx.strokeStyle = '#111';
    snakeGame.ctx.lineWidth = 0.5;
    for (let i = 0; i <= snakeGame.canvas.width; i += snakeGame.gridSize) {
        snakeGame.ctx.beginPath();
        snakeGame.ctx.moveTo(i, 0);
        snakeGame.ctx.lineTo(i, snakeGame.canvas.height);
        snakeGame.ctx.stroke();
    }
    for (let i = 0; i <= snakeGame.canvas.height; i += snakeGame.gridSize) {
        snakeGame.ctx.beginPath();
        snakeGame.ctx.moveTo(0, i);
        snakeGame.ctx.lineTo(snakeGame.canvas.width, i);
        snakeGame.ctx.stroke();
    }

    // Draw snake
    snakeGame.ctx.fillStyle = '#00ff00';
    for (let i = 0; i < snakeGame.snake.length; i++) {
        const segment = snakeGame.snake[i];
        if (i === 0) {
            snakeGame.ctx.fillStyle = '#00ff00';
        } else {
            snakeGame.ctx.fillStyle = '#00cc00';
        }
        snakeGame.ctx.fillRect(segment.x, segment.y, snakeGame.gridSize - 1, snakeGame.gridSize - 1);
    }

    // Draw food
    snakeGame.ctx.fillStyle = '#ff0000';
    snakeGame.ctx.beginPath();
    snakeGame.ctx.arc(snakeGame.food.x + snakeGame.gridSize / 2,
                      snakeGame.food.y + snakeGame.gridSize / 2,
                      snakeGame.gridSize / 2 - 1, 0, Math.PI * 2);
    snakeGame.ctx.fill();
}

function endSnakeGame() {
    snakeGame.gameRunning = false;
    clearInterval(snakeGame.gameLoop);
    snakeGame.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    snakeGame.ctx.fillRect(0, 0, snakeGame.canvas.width, snakeGame.canvas.height);
    snakeGame.ctx.fillStyle = '#fff';
    snakeGame.ctx.font = 'bold 30px Arial';
    snakeGame.ctx.textAlign = 'center';
    snakeGame.ctx.fillText('GAME OVER!', snakeGame.canvas.width / 2, snakeGame.canvas.height / 2);
    snakeGame.ctx.font = '20px Arial';
    snakeGame.ctx.fillText('Final Score: ' + snakeGame.score, snakeGame.canvas.width / 2, snakeGame.canvas.height / 2 + 40);
    document.removeEventListener('keydown', handleSnakeKeyPress);
}