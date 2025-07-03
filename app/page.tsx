"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "@/components/product/product-card"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  description: string
  sizes: string[]
  featured: boolean
  collection: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

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

  const featuredProducts = products.filter((product) => product.featured)

  const heroSlides = [
    {
      image: "/images/products/rubys-touch-1.jpg",
      title: "RUBY'S TOUCH",
      subtitle: "An epitome of elegance and allure",
      cta: "Discover Collection",
    },
    {
      image: "/images/products/etoile-satinee-1.jpg",
      title: "ÉTOILE SATINÉE",
      subtitle: "Mesmerizing mermaid silhouette",
      cta: "Shop Now",
    },
    {
      image: "/images/products/classic-elegance-1.jpg",
      title: "TIMELESS ELEGANCE",
      subtitle: "Sophisticated luxury for every occasion",
      cta: "Explore",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 w-full max-w-full overflow-x-hidden">
      {/* Hero Carousel */}
      <section className="relative h-screen overflow-hidden w-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 w-full ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl w-full">
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-widest mb-4 fade-in">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg md:text-xl mb-8 fade-in" style={{ animationDelay: "0.2s" }}>
                  {slide.subtitle}
                </p>
                <Link href="/shop" className="btn-primary fade-in" style={{ animationDelay: "0.4s" }}>
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-widest mb-4">SIGNATURE COLLECTIONS</h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4">
              Discover our exquisite bridal and evening wear collections, where each piece is a masterpiece of
              craftsmanship and elegance, designed for life's most precious moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-secondary">
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Bridal Collection */}
            <div className="text-center">
              <div className="relative h-96 mb-8 overflow-hidden rounded-lg">
                <Image
                  src="/images/products/rubys-touch-2.jpg"
                  alt="Bridal Collection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-light tracking-widest mb-4">BRIDAL COLLECTION</h3>
              <p className="text-gray-600 mb-6 leading-relaxed px-4">
                Exquisite bridal gowns crafted for your most important day. Each dress embodies timeless elegance with
                intricate details and luxurious fabrics.
              </p>
              <Link href="/shop?category=bridal" className="btn-primary">
                Explore Bridal
              </Link>
            </div>

            {/* Evening Collection */}
            <div className="text-center">
              <div className="relative h-96 mb-8 overflow-hidden rounded-lg">
                <Image
                  src="/images/products/etoile-satinee-2.jpg"
                  alt="Evening Collection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-light tracking-widest mb-4">EVENING COLLECTION</h3>
              <p className="text-gray-600 mb-6 leading-relaxed px-4">
                Sophisticated evening wear for special occasions. Designed to make you feel confident and radiant at
                every elegant affair.
              </p>
              <Link href="/shop?category=evening" className="btn-primary">
                Explore Evening
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-widest mb-6">OUR PHILOSOPHY</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Eve Whites, we believe that every woman deserves to feel extraordinary. Our collections are
                meticulously crafted to celebrate femininity, elegance, and the unique beauty of each individual.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                From the delicate lace appliqués to the flowing silhouettes, every detail is thoughtfully designed to
                create gowns that are not just worn, but experienced.
              </p>
              <Link href="/about" className="btn-primary">
                Our Story
              </Link>
            </div>
            <div className="relative h-96 lg:h-[500px]">
              <Image
                src="/images/products/rubys-touch-silhouette.jpg"
                alt="Brand Philosophy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white w-full">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-widest mb-4">STAY ENCHANTED</h2>
          <p className="text-gray-300 mb-8">
            Be the first to discover our latest collections, exclusive designs, and special moments.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white w-full"
            />
            <button className="px-8 py-4 bg-white text-black font-medium tracking-wide hover:bg-gray-200 transition-colors w-full sm:w-auto mt-2 sm:mt-0">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
