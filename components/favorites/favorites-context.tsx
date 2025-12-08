"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

interface FavoritedProduct {
  id: string
  name: string
  image: string
}

interface FavoritesState {
  items: FavoritedProduct[]
}

type FavoritesAction =
  | { type: "ADD_FAVORITE"; payload: FavoritedProduct }
  | { type: "REMOVE_FAVORITE"; payload: string }
  | { type: "LOAD_FAVORITES"; payload: FavoritedProduct[] }
  | { type: "CLEAR_FAVORITES" }

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case "ADD_FAVORITE": {
      const exists = state.items.find((item) => item.id === action.payload.id)
      if (exists) return state
      return {
        items: [...state.items, action.payload],
      }
    }

    case "REMOVE_FAVORITE": {
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      }
    }

    case "LOAD_FAVORITES":
      return {
        items: action.payload,
      }

    case "CLEAR_FAVORITES":
      return { items: [] }

    default:
      return state
  }
}

const FavoritesContext = createContext<{
  state: FavoritesState
  dispatch: React.Dispatch<FavoritesAction>
  addFavorite: (item: FavoritedProduct) => void
  removeFavorite: (id: string) => void
  isFavorited: (id: string) => boolean
  items: FavoritedProduct[]
} | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] })

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("eve-whites-favorites")
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites)
        dispatch({ type: "LOAD_FAVORITES", payload: parsedFavorites })
      } catch (error) {
        console.error("Error loading favorites from localStorage:", error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("eve-whites-favorites", JSON.stringify(state.items))
  }, [state.items])

  const addFavorite = (item: FavoritedProduct) => {
    dispatch({ type: "ADD_FAVORITE", payload: item })
  }

  const removeFavorite = (id: string) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: id })
  }

  const isFavorited = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <FavoritesContext.Provider
      value={{
        state,
        dispatch,
        addFavorite,
        removeFavorite,
        isFavorited,
        items: state.items,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
