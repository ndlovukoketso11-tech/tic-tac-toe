# TicTacToe - React

## Features

### Base Game (40 marks)
- 3x3 TicTacToe board with full gameplay
- Players alternate: X then O
- Prevent overwriting filled cells
- Win detection (rows, columns, diagonals)
- Draw detection (board full, no winner)
- Clean responsive UI with hover effects

### State Management (20 marks)
- Context + `useReducer` architecture
- Reducer manages board, player, winner/draw, move history, timer, AI state
- Custom hooks: `useGameState()`, `useGameDispatch()`
- Clean action types: `MAKE_MOVE`, `RESET`, `UNDO`, `JUMP_TO`, `TOGGLE_AI`, `TICK`, `TIMEOUT`

### Manual Feature (15 marks)
- **Undo Move** — revert last move, reset timer
- Fully functional with UI button

### Advanced Features (15 marks)
Multiple advanced features implemented:

1. **🤖 Play vs Computer (AI)**
   - Toggle AI mode with button
   - Easy mode: computer plays random empty spot
   - Auto-play with 800ms delay for realism
   - AI plays as 'O', you play as 'X'

2. **⏳ Turn Timer**
   - 10 seconds per player
   - Visual countdown display
   - Timer turns red ≤3 seconds
   - Auto-lose if timeout (opponent wins)
   - Resets on each move

3. **🧠 Move History + Time Travel** (bonus)
   - List of all moves
   - Click any move to jump back to that board state
   - Current move highlighted

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (10 marks)
Deploy to Netlify or Vercel. See assignment for links.

## Loom Video (10 marks)
Record walkthrough showing:
- Gameplay demo (win + draw)
- Undo feature
- State management approach
- AI vs Computer
- Turn Timer
- Move History & Time Travel

---

**Total Implementation: 110 marks**
# tic-tac-toe
