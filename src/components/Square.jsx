import React from 'react'
import { playClick } from '../sound/sound'

export default function Square({ value, onClick, disabled }) {
  function handleClick(e) {
    if (disabled) return
    try { playClick() } catch (e) {}
    if (onClick) onClick(e)
  }

  return (
    <button className={`square ${disabled ? 'disabled' : ''}`} onClick={handleClick}>
      {value}
    </button>
  )
}
