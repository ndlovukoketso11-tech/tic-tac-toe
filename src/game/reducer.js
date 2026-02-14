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
  isDraw: false,
  aiEnabled: false,
  timePerPlayer: 10,
  timeLeft: 10,
  timerActive: false
  ,
  message: ''
}

export const ACTIONS = {
  MAKE_MOVE: 'MAKE_MOVE',
  RESET: 'RESET',
  UNDO: 'UNDO',
  JUMP_TO: 'JUMP_TO',
  TOGGLE_AI: 'TOGGLE_AI',
  TICK: 'TICK',
  TIMEOUT: 'TIMEOUT',
  START_TIMER: 'START_TIMER'
  ,SHOW_MESSAGE: 'SHOW_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE'
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
        isDraw,
        timeLeft: state.timePerPlayer,
        timerActive: !winner && !isDraw
        ,message: ''
      }
    }
    case ACTIONS.RESET:
      return { ...initialState, aiEnabled: state.aiEnabled, message: '' }
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
        isDraw,
        timeLeft: state.timePerPlayer,
        timerActive: !winner && !isDraw
        ,message: ''
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
        isDraw,
        timeLeft: state.timePerPlayer,
        timerActive: !winner && !isDraw
        ,message: ''
      }
    }
    case ACTIONS.TOGGLE_AI:
      return {
        ...state,
        aiEnabled: !state.aiEnabled,
        history: [Array(9).fill(null)],
        step: 0,
        xIsNext: true,
        winner: null,
        isDraw: false,
        timeLeft: state.timePerPlayer,
        timerActive: !state.aiEnabled
      }
    case ACTIONS.TICK:
      if (state.timeLeft <= 1) {
        return { ...state, timerActive: false, timeLeft: 0 }
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    case ACTIONS.TIMEOUT: {
      // When a player times out, switch the turn to the opponent
      // instead of immediately declaring a loss. Reset the timer
      // so the opponent can play. Also show a brief message.
      if (state.winner || state.isDraw) return state
      const nextPlayerIsX = !state.xIsNext
      const timedOut = state.xIsNext ? 'X' : 'O'
      const next = nextPlayerIsX ? 'X' : 'O'
      return {
        ...state,
        xIsNext: nextPlayerIsX,
        timeLeft: state.timePerPlayer,
        timerActive: true,
        message: `Time's up for ${timedOut} — turn passed to ${next}`
      }
    }
    case ACTIONS.START_TIMER:
      return { ...state, timerActive: true, timeLeft: state.timePerPlayer }
    case ACTIONS.SHOW_MESSAGE:
      return { ...state, message: action.payload?.message || '' }
    case ACTIONS.CLEAR_MESSAGE:
      return { ...state, message: '' }
    default:
      return state
  }
}
