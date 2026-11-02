"use client"

import { useState } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/components/toast-provider"

interface Product {
  id: string
  name: string
  price?: number
  images: string[]
  description: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleImageError = () => {
    setImageError(true)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price || 80000,
      image: product.images[0] || "/placeholder.svg",
      quantity: 1,
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1200)
    addToast(`${product.name} added to your bespoke bag!`, "success")
  }

  return (
    <div
      className="product-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
          <Image
            src={
              imageError
                ? "/placeholder.svg?height=600&width=400"
                : product.images[currentImageIndex] || "/placeholder.svg?height=600&width=400"
            }
            alt={product.name}
            fill
            className={`product-image object-cover transition-all duration-700 ${
              isHovered ? "scale-105" : "scale-100"
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
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-black w-4" : "bg-white/70"
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
            className={`absolute inset-0 bg-black/5 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Shopping Bag Quick-Add Button */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to bag`}
            className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300 shadow-md ${
              isAdded
                ? "bg-black text-white scale-110"
                : "bg-white/95 text-gray-900 hover:bg-black hover:text-white hover:scale-110"
            }`}
          >
            {isAdded ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            )}
          </button>
        </div>

        {/* Product Info & Pricing */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-light text-xs sm:text-sm tracking-[0.15em] uppercase text-gray-900 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-gray-400">
              Made-to-Order
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="font-normal text-black tracking-wide">
              {product.price ? `Rs. ${product.price.toLocaleString()}` : "Price Upon Inquiry"}
            </span>
            <span className="text-[11px] text-gray-400 group-hover:text-black transition-colors">
              View Atelier →
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
