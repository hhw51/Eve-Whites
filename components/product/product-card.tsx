"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  description: string
  sizes: string[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "")
  const [showSizeSelector, setShowSizeSelector] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  const handleImageError = () => {
    setImageError(true)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!selectedSize) return

    setIsAdding(true)

    // Simulate a brief loading state
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
      })

      setIsAdding(false)
      setJustAdded(true)
      setShowSizeSelector(false)

      // Reset the "just added" state after 2 seconds
      setTimeout(() => {
        setJustAdded(false)
      }, 2000)
    }, 500)
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.sizes.length > 1) {
      setShowSizeSelector(true)
    } else {
      handleAddToCart(e)
    }
  }

  return (
    <div
      className="product-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowSizeSelector(false)
      }}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
          <Image
            src={
              imageError
                ? "/placeholder.svg?height=600&width=400"
                : product.images[currentImageIndex] || "/placeholder.svg?height=600&width=400"
            }
            alt={product.name}
            fill
            className={`product-image object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            onError={handleImageError}
          />

          {/* Image indicators */}
          {product.images.length > 1 && !imageError && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-black" : "bg-white/50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentImageIndex(index)
                  }}
                />
              ))}
            </div>
          )}

          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick Add Button */}
          <div
            className={`absolute bottom-4 right-4 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {showSizeSelector ? (
              <div className="bg-white rounded-lg p-3 shadow-lg min-w-[200px]" onClick={(e) => e.preventDefault()}>
                <p className="text-xs font-medium mb-2 tracking-wide">SELECT SIZE</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedSize(size)
                      }}
                      className={`px-2 py-1 text-xs border transition-colors ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || isAdding}
                  className="w-full bg-black text-white text-xs py-2 px-3 font-medium tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center space-x-1"
                >
                  {isAdding ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  ) : justAdded ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>ADDED</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3 h-3" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                {justAdded ? <Check className="w-5 h-5 text-green-600" /> : <ShoppingBag className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm tracking-wide uppercase">{product.name}</h3>
          <p className="text-gray-600 text-sm">PKR. {product.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  )
}
