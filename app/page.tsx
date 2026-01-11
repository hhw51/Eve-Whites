"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "@/components/product/product-card"

interface Product {
  id: string
  name: string
  images: string[]
  description: string
  featured: boolean
  collection: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [notificationDismissed, setNotificationDismissed] = useState(false)

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
    { image: "/images/web-20banner-201.png", link: "/shop" },
    { image: "/images/web-20banner-209.jpeg", link: "/shop" },
    { image: "/images/wen-20banner-205.jpeg", link: "/shop" },
    { image: "/images/web-20banner-204.png", link: "/shop" },
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
<div className="w-full max-w-full overflow-x-hidden bg-white">
      {/* 1. FIXED NAVBAR SPACING: 
         Removed large pt-16/pt-20. 
         Used smaller mt-0 to pull hero closer to the navbar.
      */}
      {!notificationDismissed && (
        <div className="bg-black text-white px-4 py-2 border-b border-white/10 text-center">
          <p className="text-[9px] md:text-xs tracking-[0.2em] uppercase">
            Exclusively made-to-order • 2-3 months delivery
          </p>
        </div>
      )}

      {/* Hero Slider */}
      <section className="relative w-full overflow-hidden">
        {/* 2. RESPONSIVE HEIGHT & FITTING:
           - Mobile: aspect-[4/5] ensures full-fit portrait dresses without stretching.
           - Tablet (md): aspect-[16/9] slims down the section height.
           - Desktop (lg): max-h-[500px] ensures it doesn't take up the whole screen.
        */}
        <div className="relative w-full aspect-[4/5] md:aspect-[16/8] lg:max-h-[550px] lg:h-[60vh]">
          {heroSlides.map((slide, index) => (
            <Link
              key={index}
              href={slide.link}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer group ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden bg-[#F2F2F2]">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt="Collection Hero"
                  fill
                  /* 3. "FULL FIT" LOGIC:
                     - 'object-contain' on mobile ensures the WHOLE image shows (no cropping).
                     - 'md:object-cover' on larger screens fills the wider banner area.
                  */
                  className="object-contain md:object-cover object-center transition-transform duration-[3000ms] group-hover:scale-105"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </Link>
          ))}

          {/* Minimalist Indicators - repositioned for slimmer height */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                className={`transition-all duration-500 h-[1.5px] ${
                  index === currentSlide ? "w-8 bg-black/60" : "w-3 bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Collections Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] mb-4">SIGNATURE</h2>
              <p className="text-gray-500 text-sm tracking-wide leading-relaxed">
                Exquisite bridal and evening wear where each piece is a masterpiece of craftsmanship.
              </p>
            </div>
            <Link href="/shop" className="text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all">
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections Showcase - Split Screen Style */}
      <section className="bg-[#fcfcfc]">
        <div className="flex flex-col md:flex-row min-h-[80vh]">
          {/* Bridal */}
          <Link href="/shop?category=bridal" className="relative flex-1 group overflow-hidden h-[60vh] md:h-auto">
            <Image
              src="/images/products/rubys-touch-2.jpg"
              alt="Bridal"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <h3 className="text-2xl font-light tracking-[0.2em] mb-2">BRIDAL</h3>
              <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">Discover</span>
            </div>
          </Link>

          {/* Evening */}
          <Link href="/shop?category=evening" className="relative flex-1 group overflow-hidden h-[60vh] md:h-auto border-t md:border-t-0 md:border-l border-white/20">
            <Image
              src="/images/products/etoile-satinee-2.jpg"
              alt="Evening"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <h3 className="text-2xl font-light tracking-[0.2em] mb-2">EVENING</h3>
              <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">Discover</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Philosophy - Editorial Layout */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase mb-8 block font-medium">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-widest leading-tight mb-12">
                CELEBRATING THE EXTRAORDINARY <br className="hidden md:block"/> BEAUTY WITHIN EVERY WOMAN
            </h2>
            <div className="max-w-2xl mx-auto space-y-6 text-gray-500 font-light leading-loose tracking-wide">
                <p>
                    At Eve Whites, every piece is more than a garment—it is an experience. 
                    From delicate lace appliqués to flowing silhouettes, we celebrate femininity 
                    through meticulous craftsmanship.
                </p>
                <Link href="/about" className="inline-block mt-8 text-black text-[10px] tracking-[0.3em] uppercase border border-black px-10 py-4 hover:bg-black hover:text-white transition-all">
                    Read Our Story
                </Link>
            </div>
        </div>
      </section>

      {/* Newsletter - Minimalist Dark */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] mb-8 uppercase">Stay Enchanted</h2>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="bg-transparent border-b border-gray-700 py-4 text-center text-xs tracking-[0.2em] focus:outline-none focus:border-white transition-colors"
            />
            <button className="text-[10px] tracking-[0.3em] mt-4 hover:text-gray-400 transition-colors uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}