"use client"

import { useEffect, useState } from "react"
import { use } from "react"
import Image from "next/image"
import { Heart, Share2 } from "lucide-react"
import Product3DViewer from "@/components/product/product-3d-viewer"

interface Product {
  id: string
  name: string
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

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const data: Product[] = await response.json()
          const foundProduct = data.find((p) => p.id === id)
          setProduct(foundProduct || null)
        }
      } catch (error) {
        console.error("Error loading product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

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
              {product.collection && <p className="text-sm tracking-wide text-gray-500 mb-2">{product.collection}</p>}
              {/* Price display removed */}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {product.longDescription && (
              <p className="text-gray-600 leading-relaxed text-sm">{product.longDescription}</p>
            )}

            {/* Measurements section replaced with custom made-to-order text */}
            <div className="border-t border-b py-6">
              <h3 className="font-medium tracking-wide mb-3">CUSTOM SIZING & DELIVERY</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Measurements: Please note that all bridal outfits are made as per the custom size of the bride and may
                take a minimum of 2 to 3 months for delivery. If you have any inquiries regarding your desired ensemble,
                you are welcome to contact one of our consultants at the number provided below.
              </p>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-black text-white px-6 py-3 font-medium tracking-wide hover:bg-gray-900 transition-colors">
                SCHEDULE CONSULTATION
              </button>

              <div className="flex gap-4">
                <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 font-medium tracking-wide hover:border-black transition-colors flex items-center justify-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Add to Favorites</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 font-medium tracking-wide hover:border-black transition-colors flex items-center justify-center space-x-2">
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
                    <li>• Premium bridal fabric construction</li>
                    <li>• Custom made-to-order</li>
                    <li>• 2-3 months delivery time</li>
                    <li>• Professional dry clean only</li>
                    <li>• Designed and handcrafted with care</li>
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
                    <li>• Use a garment bag for long-term storage</li>
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
