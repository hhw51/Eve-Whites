"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Image from "next/image"
import { Heart, Share2, ShoppingBag, Check } from "lucide-react"
import ConsultationModal from "@/components/consultation-modal"
import { useFavorites } from "@/components/favorites/favorites-context"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/components/toast-provider"

interface Product {
  id: string
  name: string
  price?: number
  category: string
  images: string[]
  description: string
  longDescription?: string
  collection?: string
  tags?: string[]
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [addedAnimation, setAddedAnimation] = useState(false)

  const { isFavorited, addFavorite, removeFavorite } = useFavorites()
  const { addItem } = useCart()
  const { addToast } = useToast()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (response.ok) {
          const data: Product = await response.json()
          setProduct(data)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price || 80000,
      image: product.images[0] || "/placeholder.svg",
      quantity: 1,
    })

    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 1500)
    addToast(`${product.name} added to your bespoke bag!`, "success")
  }

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden rounded-lg">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-black" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  {product.collection || "Eve Whites Atelier"}
                </span>
                <span className="text-xs uppercase tracking-widest text-black bg-gray-100 px-2.5 py-0.5 rounded font-medium">
                  Made to Order
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-3 text-black">
                {product.name}
              </h1>

              {/* Price display */}
              <div className="text-2xl font-light tracking-wide text-black pb-2">
                {product.price ? `Rs. ${product.price.toLocaleString()}` : "Price Upon Inquiry"}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {product.longDescription && (
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.longDescription}
              </p>
            )}

            {/* Sizing & Delivery Notice */}
            <div className="border-t border-b py-5 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900">
                Custom Sizing & Delivery Timeline
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                All Eve Whites ensembles are individually handcrafted according to the client's custom measurements and require approximately <span className="font-medium text-black">2 to 3 months</span> for delivery. Sizing details can be specified in your bag or during your dedicated consultation.
              </p>
            </div>

            {/* Action Buttons: Add to Bag & Consultation */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-black text-white text-xs font-medium uppercase tracking-[0.25em] rounded hover:bg-gray-800 transition-all flex items-center justify-center gap-2.5 shadow-sm"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Added to Bespoke Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bespoke Bag</span>
                  </>
                )}
              </button>

              <ConsultationModal />
            </div>

            {/* Secondary actions: Favorite & Share */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (isFavorited(product.id)) {
                    removeFavorite(product.id)
                    addToast("Removed from favorites", "info")
                  } else {
                    addFavorite({ id: product.id, name: product.name, image: product.images[0] })
                    addToast(`${product.name} added to favorites!`, "success")
                  }
                }}
                className={`flex-1 px-4 py-3 text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center space-x-2 border rounded ${
                  isFavorited(product.id)
                    ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited(product.id) ? "fill-current" : ""}`} />
                <span>{isFavorited(product.id) ? "Saved" : "Save to Favorites"}</span>
              </button>

              <button
                onClick={async () => {
                  const url = window.location.href
                  if (navigator.share) {
                    try {
                      await navigator.share({ title: product.name, url })
                    } catch {}
                  } else {
                    await navigator.clipboard.writeText(url)
                    addToast("Link copied to clipboard", "success")
                  }
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 text-xs uppercase tracking-wider font-medium hover:border-black transition-colors flex items-center justify-center space-x-2 rounded"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Product Accordions */}
            <div className="border-t pt-6 space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-xs font-semibold tracking-[0.2em] uppercase text-gray-900">
                  Product Details & Craftsmanship
                  <span className="transform group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 text-gray-600 text-xs sm:text-sm leading-relaxed">
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Pure luxury silk and handcrafted Chantelle laces</li>
                    <li>Individually stitched to bride's specific body dimensions</li>
                    <li>2–3 months bespoke production timeline</li>
                    <li>Professional bridal dry clean only</li>
                    <li>Dispatched via insured, tracked courier worldwide</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-xs font-semibold tracking-[0.2em] uppercase text-gray-900">
                  Care & Preservation Instructions
                  <span className="transform group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 text-gray-600 text-xs sm:text-sm leading-relaxed">
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Specialist couture dry cleaning strictly recommended</li>
                    <li>Store suspended on padded, wide-shoulder archival hanger</li>
                    <li>Keep shielded from direct UV and humidity inside breathable bag</li>
                    <li>Avoid direct contact with perfumes or setting sprays</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
