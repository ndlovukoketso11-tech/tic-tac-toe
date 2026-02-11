import React from 'react'
import Square from './Square'
import { useGameState, useGameDispatch, actions } from '../game/GameContext'

export default function Board() {
  const state = useGameState()
  const dispatch = useGameDispatch()
  const current = state.history[state.step]

  function handleClick(i) {
    dispatch({ type: actions.MAKE_MOVE, payload: { index: i } })
  }

  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={current[i]}
        onClick={() => handleClick(i)}
        disabled={!!current[i] || state.winner}
      />
    )
  }

  return (
    <div className="board">
      {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
    </div>
  )
}
