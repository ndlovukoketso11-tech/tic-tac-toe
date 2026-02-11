import React from 'react'

export default function Square({ value, onClick, disabled }) {
  return (
    <button className={`square ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      {value}
    </button>
  )
}
