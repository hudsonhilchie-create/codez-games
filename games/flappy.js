// Flappy Bird Game
let flappyGame = {
    canvas: null,
    ctx: null,
    bird: { x: 50, y: 150, width: 30, height: 30, velocity: 0 },
    pipes: [],
    score: 0,
    gameRunning: true,
    gameLoop: null,
    gravity: 0.6,
    jumpPower: -12
};

function initFlappy() {
    flappyGame.canvas = document.getElementById('flappyCanvas');
    flappyGame.ctx = flappyGame.canvas.getContext('2d');
    flappyGame.bird = { x: 50, y: 150, width: 30, height: 30, velocity: 0 };
    flappyGame.pipes = [];
    flappyGame.score = 0;
    flappyGame.gameRunning = true;

    document.getElementById('flappy-score').textContent = '0';

    if (flappyGame.gameLoop) clearInterval(flappyGame.gameLoop);
    flappyGame.gameLoop = setInterval(updateFlappyGame, 30);

    // Add event listeners
    document.addEventListener('click', flappyJump);
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            flappyJump();
            e.preventDefault();
        }
    });

    // Generate initial pipes
    for (let i = 0; i < 3; i++) {
        createFlappyPipe(flappyGame.canvas.width + i * 200);
    }
}

function createFlappyPipe(x) {
    const pipeGap = 120;
    const minHeight = 40;
    const maxHeight = flappyGame.canvas.height - pipeGap - minHeight;
    const pipeHeight = Math.random() * (maxHeight - minHeight) + minHeight;

    flappyGame.pipes.push({
        x: x,
        topHeight: pipeHeight,
        bottomY: pipeHeight + pipeGap,
        width: 50,
        scored: false
    });
}

function flappyJump() {
    if (flappyGame.gameRunning) {
        flappyGame.bird.velocity = flappyGame.jumpPower;
    }
}

function updateFlappyGame() {
    if (!flappyGame.gameRunning) return;

    // Update bird
    flappyGame.bird.velocity += flappyGame.gravity;
    flappyGame.bird.y += flappyGame.bird.velocity;

    // Check collision with ground/ceiling
    if (flappyGame.bird.y + flappyGame.bird.height >= flappyGame.canvas.height ||
        flappyGame.bird.y <= 0) {
        endFlappyGame();
        return;
    }

    // Update pipes
    for (let i = 0; i < flappyGame.pipes.length; i++) {
        const pipe = flappyGame.pipes[i];
        pipe.x -= 5;

        // Check collision with pipes
        if (flappyGame.bird.x < pipe.x + pipe.width &&
            flappyGame.bird.x + flappyGame.bird.width > pipe.x) {
            if (flappyGame.bird.y < pipe.topHeight ||
                flappyGame.bird.y + flappyGame.bird.height > pipe.bottomY) {
                endFlappyGame();
                return;
            }
        }

        // Score point
        if (pipe.x + pipe.width < flappyGame.bird.x && !pipe.scored) {
            pipe.scored = true;
            flappyGame.score++;
            document.getElementById('flappy-score').textContent = flappyGame.score;
        }

        // Remove off-screen pipes
        if (pipe.x + pipe.width < 0) {
            flappyGame.pipes.splice(i, 1);
            createFlappyPipe(flappyGame.canvas.width);
        }
    }

    drawFlappyGame();
}

function drawFlappyGame() {
    // Clear canvas
    flappyGame.ctx.fillStyle = '#87CEEB';
    flappyGame.ctx.fillRect(0, 0, flappyGame.canvas.width, flappyGame.canvas.height);

    // Draw ground
    flappyGame.ctx.fillStyle = '#90EE90';
    flappyGame.ctx.fillRect(0, flappyGame.canvas.height - 30, flappyGame.canvas.width, 30);

    // Draw bird
    flappyGame.ctx.fillStyle = '#FFD700';
    flappyGame.ctx.beginPath();
    flappyGame.ctx.arc(flappyGame.bird.x + flappyGame.bird.width / 2,
                       flappyGame.bird.y + flappyGame.bird.height / 2,
                       flappyGame.bird.width / 2, 0, Math.PI * 2);
    flappyGame.ctx.fill();

    // Draw eye
    flappyGame.ctx.fillStyle = '#000';
    flappyGame.ctx.beginPath();
    flappyGame.ctx.arc(flappyGame.bird.x + flappyGame.bird.width - 5,
                       flappyGame.bird.y + 8, 3, 0, Math.PI * 2);
    flappyGame.ctx.fill();

    // Draw pipes
    flappyGame.ctx.fillStyle = '#228B22';
    for (let pipe of flappyGame.pipes) {
        // Top pipe
        flappyGame.ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
        // Bottom pipe
        flappyGame.ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, flappyGame.canvas.height - pipe.bottomY);
    }
}

function endFlappyGame() {
    flappyGame.gameRunning = false;
    clearInterval(flappyGame.gameLoop);

    flappyGame.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    flappyGame.ctx.fillRect(0, 0, flappyGame.canvas.width, flappyGame.canvas.height);
    flappyGame.ctx.fillStyle = '#fff';
    flappyGame.ctx.font = 'bold 40px Arial';
    flappyGame.ctx.textAlign = 'center';
    flappyGame.ctx.fillText('GAME OVER!', flappyGame.canvas.width / 2, flappyGame.canvas.height / 2);
    flappyGame.ctx.font = '24px Arial';
    flappyGame.ctx.fillText('Final Score: ' + flappyGame.score, flappyGame.canvas.width / 2, flappyGame.canvas.height / 2 + 50);

    document.removeEventListener('click', flappyJump);
}