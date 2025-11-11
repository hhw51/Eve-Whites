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
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div className="w-full sm:w-full sm:max-w-md bg-white rounded-t-lg sm:rounded-lg shadow-xl max-h-[90vh] sm:max-h-[80vh] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            <h3 className="text-base font-medium tracking-wide">SHOPPING BAG ({items.length})</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden p-4">
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
                <div className="max-h-[40vh] sm:max-h-80 overflow-y-auto space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="relative w-12 h-16 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-gray-600 text-xs">Size: {item.size}</p>
                        <p className="font-medium text-sm">${item.price.toLocaleString()}</p>

                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-1 border border-gray-300 hover:border-black transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
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
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex-shrink-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium text-lg">${total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3">
                    <Link href="/cart" onClick={onClose} className="w-full btn-secondary block text-center">
                      View Bag
                    </Link>
                    <Link href="/checkout" onClick={onClose} className="w-full btn-primary block text-center">
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
