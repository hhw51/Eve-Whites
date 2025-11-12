"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/components/cart/cart-context"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [email, setEmail] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderPlaced(true)
      clearCart()
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-light tracking-widest mb-4">ORDER CONFIRMED</h1>
            <p className="text-gray-600">Thank you for your order! We'll send you a confirmation email shortly.</p>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-light tracking-widest mb-8">CHECKOUT</h1>
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-8">CHECKOUT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-medium mb-4 tracking-wide">CONTACT INFORMATION</h2>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing || !email}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="font-medium mb-4 tracking-wide">ORDER SUMMARY</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
