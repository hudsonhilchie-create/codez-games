// 2048 Game
let game2048 = {
    grid: [],
    score: 0,
    moved: false
};

function init2048() {
    game2048.grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    game2048.score = 0;
    game2048.moved = false;

    add2048Tile();
    add2048Tile();
    draw2048();
    document.getElementById('game2048-score').textContent = '0';

    document.addEventListener('keydown', handle2048KeyPress);
}

function add2048Tile() {
    const emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (game2048.grid[i][j] === 0) {
                emptyTiles.push({ row: i, col: j });
            }
        }
    }

    if (emptyTiles.length > 0) {
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        game2048.grid[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function handle2048KeyPress(e) {
    let moved = false;

    switch(e.key) {
        case 'ArrowLeft':
            moved = move2048Left();
            break;
        case 'ArrowRight':
            moved = move2048Right();
            break;
        case 'ArrowUp':
            moved = move2048Up();
            break;
        case 'ArrowDown':
            moved = move2048Down();
            break;
        default:
            return;
    }

    if (moved) {
        add2048Tile();
        draw2048();
        if (isGame2048Over()) {
            setTimeout(() => alert('Game Over! Final Score: ' + game2048.score), 100);
        }
    }
}

function move2048Left() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        const merged = merge2048(game2048.grid[i]);
        if (merged.changed) moved = true;
        game2048.grid[i] = merged.row;
    }
    return moved;
}

function move2048Right() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        game2048.grid[i] = game2048.grid[i].reverse();
        const merged = merge2048(game2048.grid[i]);
        if (merged.changed) moved = true;
        game2048.grid[i] = merged.row.reverse();
    }
    return moved;
}

function move2048Up() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        const column = [game2048.grid[0][j], game2048.grid[1][j], game2048.grid[2][j], game2048.grid[3][j]];
        const merged = merge2048(column);
        if (merged.changed) moved = true;
        for (let i = 0; i < 4; i++) {
            game2048.grid[i][j] = merged.row[i];
        }
    }
    return moved;
}

function move2048Down() {
    let moved = false;
    for (let j = 0; j < 4; j++) {
        const column = [game2048.grid[0][j], game2048.grid[1][j], game2048.grid[2][j], game2048.grid[3][j]];
        column.reverse();
        const merged = merge2048(column);
        if (merged.changed) moved = true;
        merged.row.reverse();
        for (let i = 0; i < 4; i++) {
            game2048.grid[i][j] = merged.row[i];
        }
    }
    return moved;
}

function merge2048(row) {
    let changed = false;
    row = row.filter(val => val !== 0);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            game2048.score += row[i];
            document.getElementById('game2048-score').textContent = game2048.score;
            row.splice(i + 1, 1);
            changed = true;
        }
    }

    while (row.length < 4) {
        row.push(0);
    }

    return { row, changed };
}

function isGame2048Over() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (game2048.grid[i][j] === 0) return false;
            if (i < 3 && game2048.grid[i][j] === game2048.grid[i + 1][j]) return false;
            if (j < 3 && game2048.grid[i][j] === game2048.grid[i][j + 1]) return false;
        }
    }
    return true;
}

function draw2048() {
    const grid = document.getElementById('grid-2048');
    grid.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile-2048';
            tile.setAttribute('data-value', game2048.grid[i][j]);
            tile.textContent = game2048.grid[i][j] || '';
            grid.appendChild(tile);
        }
    }
}