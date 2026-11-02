"use client"

import { useState } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"
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
  const { isFavorited, addFavorite, removeFavorite } = useFavorites()
  const { addToast } = useToast()
  const [isFav, setIsFav] = useState(() => isFavorited(product.id))

  const handleImageError = () => {
    setImageError(true)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFav) {
      removeFavorite(product.id)
      addToast("Removed from favorites", "info")
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        image: product.images[0],
      })
      addToast(`${product.name} added to favorites!`, "success")
    }
    setIsFav(!isFav)
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

          {/* Heart button */}
          <button
            onClick={handleToggleFavorite}
            aria-label="Toggle favorite"
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isFav ? "bg-red-500 text-white" : "bg-white/90 text-gray-800 hover:bg-white shadow-sm"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
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
