export const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export const initialState = {
  history: [Array(9).fill(null)],
  step: 0,
  xIsNext: true,
  winner: null,
  isDraw: false
}

export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET: 'RESET',
  UNDO: 'UNDO',
  JUMP_TO: 'JUMP_TO'
}

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_MOVE: {
      const { index } = action.payload
      const history = state.history.slice(0, state.step + 1)
      const current = history[history.length - 1]
      if (state.winner || current[index]) return state
      const squares = current.slice()
      squares[index] = state.xIsNext ? 'X' : 'O'
      const winner = calculateWinner(squares)
      const isDraw = !winner && squares.every(Boolean)
      return {
        ...state,
        history: history.concat([squares]),
        step: history.length,
        xIsNext: !state.xIsNext,
        winner,
        isDraw
      }
    }
    case ACTIONS.RESET:
      return { ...initialState }
    case ACTIONS.UNDO: {
      if (state.step === 0) return state
      const step = state.step - 1
      const squares = state.history[step]
      const winner = calculateWinner(squares)
      const isDraw = !winner && squares.every(Boolean)
      return {
        ...state,
        step,
        xIsNext: (step % 2) === 0,
        winner,
        isDraw
      }
    }
    case ACTIONS.JUMP_TO: {
      const step = action.payload.step
      const squares = state.history[step]
      const winner = calculateWinner(squares)
      const isDraw = !winner && squares.every(Boolean)
      return {
        ...state,
        step,
        xIsNext: (step % 2) === 0,
        winner,
        isDraw
      }
    }
    default:
      return state
  }
}
