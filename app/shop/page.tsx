"use client"

import { useEffect, useState } from "react"
import { Filter } from "lucide-react"
import ProductCard from "@/components/product/product-card"

interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  sizes: string[]
  featured: boolean
  collection: string
}

export default function ShopPage() {
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
          setFilteredProducts(data)
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
  }, [products, selectedCategory, selectedCollection, sortBy])

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]
  const collections = ["all", ...Array.from(new Set(products.map((p) => p.collection)))]

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-2">COLLECTIONS</h1>
            <p className="text-gray-600">Discover our exquisite bridal and evening wear</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white lg:bg-transparent p-4 lg:p-0 border lg:border-0 rounded lg:rounded-none space-y-6">
              <div>
                <h3 className="font-medium mb-4 tracking-wide">CATEGORIES</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCategory === category ? "bg-black text-white" : "hover:bg-gray-100"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4 tracking-wide">COLLECTIONS</h3>
                <div className="space-y-2">
                  {collections.map((collection) => (
                    <button
                      key={collection}
                      onClick={() => setSelectedCollection(collection)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        selectedCollection === collection ? "bg-black text-white" : "hover:bg-gray-100"
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
            <div className="mb-4 text-sm text-gray-600">Showing {filteredProducts.length} pieces</div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No pieces found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
