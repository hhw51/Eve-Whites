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
    <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
      {/* Blurred & Dimmed Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* 1/4th Slide-Over Panel (lg:w-1/4, responsive on mobile/tablet) */}
      <div className="relative w-full max-w-[85vw] sm:w-[380px] lg:w-1/4 lg:max-w-none bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 ease-out border-l border-gray-100">
        {/* Header */}
        <div className="px-5 py-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-4 h-4 text-black stroke-[1.8]" />
            <h2 className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-black">
              Bespoke Bag ({totalCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-gray-300 stroke-[1.5] mb-3" />
              <p className="text-xs tracking-wider uppercase text-gray-900 font-medium mb-1">
                Your bag is empty
              </p>
              <p className="text-[11px] text-gray-500 mb-5 max-w-[200px]">
                Explore our signature bridal and couture collections.
              </p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-black text-white text-[11px] tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors rounded"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-xs font-medium tracking-wider uppercase text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-black transition-colors p-0.5 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-light text-gray-900 mt-0.5">
                      Rs. {item.price.toLocaleString()}
                    </p>

                    {item.measurements && (
                      <div className="mt-1 text-[10px] text-gray-500 bg-gray-50 p-1 rounded">
                        <span className="font-medium text-gray-700">Custom Sizing:</span>{" "}
                        {[
                          item.measurements.bust && `B: ${item.measurements.bust}cm`,
                          item.measurements.waist && `W: ${item.measurements.waist}cm`,
                          item.measurements.hips && `H: ${item.measurements.hips}cm`,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Included"}
                      </div>
                    )}
                  </div>

                  {/* Quantity selector & total */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-black">
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
          <div className="p-5 border-t border-gray-100 bg-gray-50/80 space-y-3.5">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] tracking-[0.2em] uppercase text-gray-600">
                Subtotal
              </span>
              <span className="text-base font-light tracking-wide text-gray-900">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed">
              Exclusively handcrafted to order. 2–3 months delivery timeline. Standard 50% advance upon order confirmation.
            </p>

            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full block text-center py-3 bg-black text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors rounded shadow-sm"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center py-1.5 text-[11px] text-gray-500 hover:text-black tracking-wider uppercase transition-colors"
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
