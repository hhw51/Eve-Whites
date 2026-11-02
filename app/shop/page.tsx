"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Filter, X } from "lucide-react"
import ProductCard from "@/components/product/product-card"

interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  sizes?: string[]
  featured: boolean
  collection: string
  tags?: string[]
}

function ShopContent() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("q") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (response.ok) {
          const data = await response.json()
          setProducts(data)
        }
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.collection?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by collection
    if (selectedCollection !== "all") {
      filtered = filtered.filter((product) => product.collection === selectedCollection)
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, selectedCollection, sortBy, searchQuery])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]
  const collections = ["all", ...Array.from(new Set(products.map((p) => p.collection)))]

  if (loading) {
    return (
      <div className="pt-20 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="pt-6 lg:pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] mb-2 uppercase text-black">
              Collections
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm tracking-wide">
              Exclusively handcrafted bespoke bridal & couture evening wear
            </p>

            {searchQuery && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">Search results for:</span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 rounded text-black flex items-center gap-1">
                  "{searchQuery}"
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded text-xs uppercase tracking-wider font-medium"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-xs tracking-wider uppercase focus:outline-none focus:border-black bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-60 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white lg:bg-transparent p-4 lg:p-0 border lg:border-0 rounded space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 text-xs tracking-wider uppercase transition-colors rounded ${
                        selectedCategory === category
                          ? "bg-black text-white font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-900 mb-3">
                  Collections
                </h3>
                <div className="space-y-1">
                  {collections.map((collection) => (
                    <button
                      key={collection}
                      onClick={() => setSelectedCollection(collection)}
                      className={`block w-full text-left px-3 py-2 text-xs tracking-wider uppercase transition-colors rounded ${
                        selectedCollection === collection
                          ? "bg-black text-white font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {collection === "all" ? "All Collections" : collection}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-xs text-gray-500 uppercase tracking-wider">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <p className="text-sm uppercase tracking-wider text-gray-600 font-medium mb-1">
                  No pieces found
                </p>
                <p className="text-xs text-gray-400">
                  Try adjusting your filters or search keywords.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-20 min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  )
}
