import React from 'react'
import Board from './components/Board'
import { useGameState, useGameDispatch, actions } from './game/GameContext'

export default function App() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const current = state.history[state.step]

  function handleReset() {
    dispatch({ type: actions.RESET })
  }

  function handleUndo() {
    dispatch({ type: actions.UNDO })
  }

  function jumpTo(step) {
    dispatch({ type: actions.JUMP_TO, payload: { step } })
  }

  const status = state.winner
    ? `Winner: ${state.winner}`
    : state.isDraw
    ? 'Draw!'
    : `Next Player: ${state.xIsNext ? 'X' : 'O'}`

  return (
    <div className="app">
      <h1>TicTacToe</h1>
      <div className="game">
        <Board />
        <div className="sidebar">
          <div className="status">{status}</div>
          <div className="controls">
            <button onClick={handleUndo} disabled={state.step === 0}>Undo</button>
            <button onClick={handleReset}>Restart</button>
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
      <footer className="footer">Built with Context + useReducer • Undo + Time Travel</footer>
    </div>
  )
}
