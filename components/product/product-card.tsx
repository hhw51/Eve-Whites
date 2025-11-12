"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"

interface Product {
  id: string
  name: string
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
  const [isFav, setIsFav] = useState(() => isFavorited(product.id))

  const handleImageError = () => {
    setImageError(true)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFav) {
      removeFavorite(product.id)
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        image: product.images[0],
      })
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

          <button
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
              isFav ? "bg-red-500 text-white" : "bg-white/90 text-gray-800 hover:bg-white"
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm tracking-wide uppercase">{product.name}</h3>
          <p className="text-gray-600 text-xs">Made to Order</p>
        </div>
      </Link>
    </div>
  )
}
