"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalCount, totalAmount, isCartOpen, setIsCartOpen } =
    useCart()

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="text-sm font-medium tracking-[0.2em] uppercase">
              Bespoke Bag ({totalCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-gray-300 stroke-[1.5] mb-4" />
              <p className="text-sm tracking-wider uppercase text-gray-900 font-medium mb-1">
                Your bag is empty
              </p>
              <p className="text-xs text-gray-500 mb-6 max-w-xs">
                Explore our signature bridal and couture collections to add bespoke pieces.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 bg-gray-50 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-medium tracking-wider uppercase text-gray-900">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 mt-1">
                      Rs. {item.price.toLocaleString()}
                    </p>

                    {item.measurements && (
                      <div className="mt-1.5 text-[11px] text-gray-500 bg-gray-50 p-1.5 rounded">
                        <span className="font-medium text-gray-700">Custom Sizing:</span>{" "}
                        {[
                          item.measurements.bust && `Bust: ${item.measurements.bust}cm`,
                          item.measurements.waist && `Waist: ${item.measurements.waist}cm`,
                          item.measurements.hips && `Hips: ${item.measurements.hips}cm`,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Custom measurements included"}
                      </div>
                    )}
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-medium">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-[0.2em] uppercase text-gray-600">
                Subtotal
              </span>
              <span className="text-lg font-light tracking-wide text-gray-900">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed">
              Exclusively handcrafted to order. 2–3 months delivery timeline. Standard 50% advance upon order confirmation.
            </p>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full block text-center py-3.5 bg-black text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors rounded"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-2 text-xs text-gray-600 hover:text-black tracking-wider uppercase transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
