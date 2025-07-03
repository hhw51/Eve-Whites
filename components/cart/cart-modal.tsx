"use client"

import { useEffect } from "react"
import { X, ShoppingBag, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart/cart-context"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, total, updateQuantity, removeItem } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="relative w-full sm:max-w-md transform overflow-hidden rounded-t-lg sm:rounded-lg bg-white shadow-xl max-h-[90vh] sm:max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b flex-shrink-0">
            <h3 className="text-base sm:text-lg font-medium tracking-wide">SHOPPING BAG ({items.length})</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your bag is empty</p>
                <button onClick={onClose} className="btn-primary">
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="max-h-[50vh] sm:max-h-96 overflow-y-auto space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="relative w-12 h-16 sm:w-16 sm:h-20 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm truncate">{item.name}</h4>
                        <p className="text-gray-600 text-xs">Size: {item.size}</p>
                        <p className="font-medium text-xs sm:text-sm">${item.price.toLocaleString()}</p>

                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 border border-gray-300 hover:border-black transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-1 border border-gray-300 hover:border-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex-shrink-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-sm sm:text-base">Total:</span>
                    <span className="font-medium text-base sm:text-lg">${total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3">
                    <Link href="/cart" onClick={onClose} className="w-full btn-secondary block text-center text-sm">
                      View Bag
                    </Link>
                    <Link href="/checkout" onClick={onClose} className="w-full btn-primary block text-center text-sm">
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
