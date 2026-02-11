import React, { createContext, useContext, useReducer } from 'react'
import { gameReducer, initialState, ACTIONS } from './reducer'

const GameStateContext = createContext()
const GameDispatchContext = createContext()

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const ctx = useContext(GameStateContext)
  if (ctx === undefined) throw new Error('useGameState must be used within GameProvider')
  return ctx
}

export function useGameDispatch() {
  const ctx = useContext(GameDispatchContext)
  if (ctx === undefined) throw new Error('useGameDispatch must be used within GameProvider')
  return ctx
}

export const actions = ACTIONS
