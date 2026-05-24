# 🎮 Codez Games

A collection of fun, browser-based games all in one place!

## Games Included

1. **🐍 Snake** - Classic snake game. Eat food to grow, but don't hit the walls or yourself!
   - Controls: Arrow Keys

2. **⭕ Tic Tac Toe** - Play against the computer AI
   - Controls: Click on cells to make your move

3. **2️⃣0️⃣4️⃣8️⃣ 2048** - Combine tiles to reach 2048
   - Controls: Arrow Keys

4. **🧠 Memory Game** - Match pairs of emoji cards
   - Controls: Click cards to flip them

5. **🐦 Flappy Bird** - Navigate through pipes without hitting them
   - Controls: Click or Press SPACE to fly

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/hudsonhilchie-create/codez-games.git
cd codez-games
```

2. Open with a local server:
```bash
python -m http.server 8000
# or with Node.js:
npx http-server
```

3. Visit `http://localhost:8000` in your browser

### Deploy on GitHub Pages

1. Go to your repository Settings
2. Navigate to Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/root` folder
5. Your site will be live at: `https://hudsonhilchie-create.github.io/codez-games/`

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API (for graphics)

## File Structure

```
codez-games/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── main.js             # Navigation and utilities
├── games/
│   ├── snake.js        # Snake game logic
│   ├── tictactoe.js    # Tic Tac Toe game logic
│   ├── 2048.js         # 2048 game logic
│   ├── memory.js       # Memory game logic
│   └── flappy.js       # Flappy Bird game logic
└── README.md           # This file
```

## Features

✅ Multiple games in one site  
✅ Score tracking  
✅ AI opponent (Tic Tac Toe)  
✅ Responsive design  
✅ Beautiful UI with gradients  
✅ Works offline  
✅ Mobile-friendly  

## Tips & Tricks

- **Snake**: Plan ahead to avoid trapping yourself
- **Tic Tac Toe**: Try to take the center or corners
- **2048**: Keep tiles organized and plan your moves
- **Memory**: Look for patterns and remember card positions
- **Flappy**: Time your clicks for precise control

## Future Enhancements

- [ ] Leaderboard system
- [ ] User accounts
- [ ] More games (Breakout, Hangman, etc.)
- [ ] Sound effects
- [ ] Dark mode
- [ ] Multiplayer modes

## License

MIT License - Feel free to use, modify, and distribute!

---

Have fun playing! 🎮