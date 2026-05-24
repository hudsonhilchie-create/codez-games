// Memory Game
let memoryGame = {
    cards: [],
    flipped: [],
    matched: 0,
    moves: 0,
    canFlip: true,
    emojis: ['🍎', '🍊', '🍋', '🍌', '🍉', '🍓']
};

function initMemory() {
    memoryGame.cards = [...memoryGame.emojis, ...memoryGame.emojis];
    memoryGame.flipped = [];
    memoryGame.matched = 0;
    memoryGame.moves = 0;
    memoryGame.canFlip = true;

    // Shuffle cards
    for (let i = memoryGame.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [memoryGame.cards[i], memoryGame.cards[j]] = [memoryGame.cards[j], memoryGame.cards[i]];
    }

    drawMemoryGrid();
    document.getElementById('memory-matches').textContent = '0/6';
}

function drawMemoryGrid() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';

    memoryGame.cards.forEach((card, index) => {
        const cardElement = document.createElement('button');
        cardElement.className = 'memory-card';
        cardElement.dataset.index = index;
        cardElement.textContent = '?';
        cardElement.onclick = () => flipMemoryCard(index, cardElement);
        grid.appendChild(cardElement);
    });
}

function flipMemoryCard(index, element) {
    if (!memoryGame.canFlip) return;
    if (element.classList.contains('flipped') || element.classList.contains('matched')) return;
    if (memoryGame.flipped.some(f => f.index === index)) return;

    memoryGame.flipped.push({ index, element });
    element.classList.add('flipped');
    element.textContent = memoryGame.cards[index];

    if (memoryGame.flipped.length === 2) {
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    memoryGame.canFlip = false;

    const [first, second] = memoryGame.flipped;

    if (memoryGame.cards[first.index] === memoryGame.cards[second.index]) {
        // Match found
        first.element.classList.add('matched');
        second.element.classList.add('matched');
        memoryGame.matched++;
        document.getElementById('memory-matches').textContent = memoryGame.matched + '/6';

        memoryGame.flipped = [];
        memoryGame.canFlip = true;

        if (memoryGame.matched === 6) {
            setTimeout(() => alert('You won! 🎉'), 100);
        }
    } else {
        // No match
        setTimeout(() => {
            first.element.classList.remove('flipped');
            second.element.classList.remove('flipped');
            first.element.textContent = '?';
            second.element.textContent = '?';
            memoryGame.flipped = [];
            memoryGame.canFlip = true;
        }, 1000);
    }
}