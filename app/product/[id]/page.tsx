"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Image from "next/image"
import { Minus, Plus, Heart, Share2 } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import Product3DViewer from "@/components/product/product-3d-viewer"

interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  sizes: string[]
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const data: Product[] = await response.json()
          const foundProduct = data.find((p) => p.id === id)
          setProduct(foundProduct || null)
          if (foundProduct && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0])
          }
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
    if (!product || !selectedSize) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
    })

    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light tracking-wide mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
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
              <div className="flex space-x-2 overflow-x-auto">
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

            {/* 3D Viewer */}
            <div className="mt-8">
              <h3 className="font-medium mb-4 tracking-wide">3D PREVIEW</h3>
              <Product3DViewer />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-2">{product.name}</h1>
              <p className="text-2xl font-medium">${product.price.toLocaleString()}</p>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3 tracking-wide">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm font-medium transition-colors ${
                      selectedSize === size ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3 tracking-wide">QUANTITY</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 hover:border-black transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 hover:border-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>

              <div className="flex space-x-4">
                <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-medium tracking-wide">
                  PRODUCT DETAILS
                  <span className="transform group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                  <ul className="space-y-1">
                    <li>• Premium fabric construction</li>
                    <li>• Professional dry clean only</li>
                    <li>• Designed and crafted with care</li>
                    <li>• Model is 5'9" wearing size S</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-medium tracking-wide">
                  CARE INSTRUCTIONS
                  <span className="transform group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                  <ul className="space-y-1">
                    <li>• Professional dry cleaning recommended</li>
                    <li>• Store on padded hangers</li>
                    <li>• Avoid direct sunlight when storing</li>
                    <li>• Handle delicate details with care</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          Added to cart successfully!
        </div>
      )}
    </div>
  )
}
