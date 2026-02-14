import React, { useEffect } from 'react'
import Board from './components/Board'
import { useGameState, useGameDispatch, actions } from './game/GameContext'
import { playAIMove, playWin, playDraw, playTimeout } from './sound/sound'

const getRandomEmptySquare = (squares) => {
  const empty = squares
    .map((val, idx) => val === null ? idx : null)
    .filter(idx => idx !== null)
  return empty[Math.floor(Math.random() * empty.length)]
}

export default function App() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const current = state.history[state.step]

  // Timer effect
  useEffect(() => {
    if (!state.timerActive || state.winner || state.isDraw) return
    const timer = setInterval(() => {
      dispatch({ type: actions.TICK })
    }, 1000)
    return () => clearInterval(timer)
  }, [state.timerActive, state.winner, state.isDraw, dispatch])

  // Handle timeout
  useEffect(() => {
    if (state.timeLeft === 0 && state.timerActive && !state.winner && !state.isDraw) {
      dispatch({ type: actions.TIMEOUT })
    }
  }, [state.timeLeft, state.timerActive, state.winner, state.isDraw, dispatch])

  // Auto-clear flash messages after a short delay
  useEffect(() => {
    if (!state.message) return
    const t = setTimeout(() => dispatch({ type: actions.CLEAR_MESSAGE }), 2500)
    return () => clearTimeout(t)
  }, [state.message, dispatch])

  // Play sounds on win/draw/timeout
  useEffect(() => {
    if (state.winner) {
      try { playWin() } catch (e) {}
    } else if (state.isDraw) {
      try { playDraw() } catch (e) {}
    }
  }, [state.winner, state.isDraw])

  useEffect(() => {
    if (!state.message) return
    if (state.message.toLowerCase().includes("time")) {
      try { playTimeout() } catch (e) {}
    }
  }, [state.message])

  // AI opponent move
  useEffect(() => {
    if (!state.aiEnabled || state.xIsNext || state.winner || state.isDraw) return
    const timer = setTimeout(() => {
      const emptyIdx = getRandomEmptySquare(current)
      if (emptyIdx !== undefined) {
        dispatch({ type: actions.MAKE_MOVE, payload: { index: emptyIdx } })
        try { playAIMove() } catch (e) {}
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [state.aiEnabled, state.xIsNext, state.winner, state.isDraw, current, dispatch])

  function handleReset() {
    dispatch({ type: actions.RESET })
  }

  function handleUndo() {
    dispatch({ type: actions.UNDO })
  }

  function jumpTo(step) {
    dispatch({ type: actions.JUMP_TO, payload: { step } })
  }

  function handleToggleAI() {
    dispatch({ type: actions.TOGGLE_AI })
  }

  const status = state.winner
    ? `Winner: ${state.winner}${state.aiEnabled && state.winner === 'O' ? ' (AI)' : ''}`
    : state.isDraw
    ? 'Draw!'
    : `Next Player: ${state.xIsNext ? 'X' : 'O'}${state.aiEnabled && !state.xIsNext ? ' (AI)' : ''}`

  const timerColor = state.timeLeft <= 3 ? '#f5120a' : '#8310b9'

  return (
    <div className="app">
      <h1>TicTacToe</h1>
      <div className="game">
        <Board />
        <div className="sidebar">
          {state.message && <div className="flash-message">{state.message}</div>}
          <div className="status">{status}</div>
          <div className="timer" style={{ color: timerColor }}>⏱️ {state.timeLeft}s</div>
          <div className="controls">
            <button onClick={handleUndo} disabled={state.step === 0}>Undo</button>
            <button onClick={handleReset}>Restart</button>
            <button onClick={handleToggleAI} className={state.aiEnabled ? 'active' : ''}>
              {state.aiEnabled ? '🤖 AI: ON' : '🤖 AI: OFF'}
            </button>
          </div>
          <div className="history">
            <h3>Move History</h3>
            <ol>
              {state.history.map((_, move) => {
                const desc = move === 0 ? 'Go to game start' : `Go to move #${move}`
                return (
                  <li key={move}>
                    <button
                      onClick={() => jumpTo(move)}
                      className={move === state.step ? 'current' : ''}
                    >
                      {desc}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
      <footer className="footer">Context + useReducer • Undo + Time Travel • Timer + AI</footer>
    </div>
  )
}
