"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, X } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"
import SendFavoritesModal from "@/components/favorites/send-favorites-modal"

export default function FavoritesPage() {
  const { items, removeFavorite } = useFavorites()
  const [isSendModalOpen, setIsSendModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest mb-4">MY FAVORITES</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {items.length === 0
              ? "You haven't added any favorites yet. Log in or sign up to access your favorites from any device."
              : `You have ${items.length} item${items.length !== 1 ? "s" : ""} in your favorites`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-6" />
            <p className="text-gray-600 text-lg mb-8">Your favorites list is empty</p>
            <Link href="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
              {items.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
                    <Image
                      src={product.image || "/placeholder.svg?height=600&width=400"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm tracking-wide uppercase hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mt-2">${product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button onClick={() => setIsSendModalOpen(true)} className="btn-primary">
                Send My Favorites
              </button>
            </div>
          </>
        )}
      </div>

      <SendFavoritesModal isOpen={isSendModalOpen} onClose={() => setIsSendModalOpen(false)} />
    </div>
  )
}
