"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartCustomMeasurements {
  bust?: string
  waist?: string
  hips?: string
  shoulder?: string
  length?: string
  notes?: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  measurements?: CartCustomMeasurements
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  totalAmount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "eve_whites_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error("Failed to save cart to storage", e)
    }
  }, [items, isLoaded])

  const addItem = (newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      // If same product without custom measurements exists, bump quantity
      const hasCustom =
        newItem.measurements &&
        Object.values(newItem.measurements).some((v) => v && v.trim() !== "")

      if (!hasCustom) {
        const existingIndex = prev.findIndex(
          (item) => item.productId === newItem.productId && !item.measurements
        )
        if (existingIndex > -1) {
          const updated = [...prev]
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + newItem.quantity,
          }
          return updated
        }
      }

      // Otherwise create a unique line item
      const id = `${newItem.productId}-${Date.now()}`
      return [...prev, { ...newItem, id }]
    })
    setIsCartOpen(true)
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (e) {
      console.error("Failed to clear cart storage", e)
    }
  }

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
