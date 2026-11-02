"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ProductCard from "@/components/product/product-card"

interface Product {
  id: string
  name: string
  price?: number
  images: string[]
  description: string
  featured: boolean
  collection: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error")
      return
    }
    // Submission acknowledged — integrate with email service (e.g. Mailchimp) in future
    setNewsletterStatus("success")
    setNewsletterEmail("")
  }

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
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  const featuredProducts = products.filter((product) => product.featured)

  return (
    <div className="w-full bg-white">
      {/* Hero Slider Section */}
      <section className="relative w-full overflow-hidden">
        {/* DILEMMA SOLVED:
          Mobile (sm): aspect-[4/5] - Shows the full vertical dress/model.
          Tablet (md): aspect-[16/9] - Balanced horizontal fit.
          Desktop (lg): max-h-[550px] + aspect-[21/9] - Slim luxury banner.
        */}
        <div className="relative w-full aspect-[4/5] md:aspect-[16/9] lg:aspect-[21/9] lg:max-h-[550px]">
          {heroSlides.map((slide, index) => (
            <Link
              key={index}
              href={slide.link}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer group ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden bg-[#f9f9f9]">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt="Eve Whites Collection"
                  fill
                  /* 'object-contain' on small screens ensures NO parts of your image are cropped.
                    'object-cover' on md+ ensures the banner is filled side-to-side.
                  */
                  className="object-contain md:object-cover object-center transition-transform duration-[4000ms] group-hover:scale-105"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </Link>
          ))}

          {/* Indicators */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.preventDefault(); setCurrentSlide(index); }}
                className={`transition-all duration-500 h-[1px] ${
                  index === currentSlide ? "w-10 bg-black/80" : "w-4 bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Collections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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

      {/* Split Collections */}
      <section className="bg-[#fcfcfc]">
        <div className="flex flex-col md:flex-row min-h-[70vh]">
          <Link href="/shop?category=bridal" className="relative flex-1 group overflow-hidden h-[50vh] md:h-auto">
            <Image src="/images/products/rubys-touch-2.jpg" alt="Bridal" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <h3 className="text-2xl font-light tracking-[0.2em] mb-2">BRIDAL</h3>
              <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">Discover</span>
            </div>
          </Link>
          <Link href="/shop?category=evening" className="relative flex-1 group overflow-hidden h-[50vh] md:h-auto border-t md:border-t-0 md:border-l border-white/20">
            <Image src="/images/products/etoile-satinee-2.jpg" alt="Evening" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <h3 className="text-2xl font-light tracking-[0.2em] mb-2">EVENING</h3>
              <span className="text-[10px] tracking-[0.3em] uppercase border-b border-white pb-1">Discover</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase mb-8 block">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-widest leading-tight mb-10 text-black">
                CELEBRATING THE EXTRAORDINARY BEAUTY WITHIN EVERY WOMAN
            </h2>
            <Link href="/about" className="inline-block text-black text-[10px] tracking-[0.3em] uppercase border border-black px-10 py-4 hover:bg-black hover:text-white transition-all">
                Read Our Story
            </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] mb-8 uppercase">Stay Enchanted</h2>
          {newsletterStatus === "success" ? (
            <p className="text-sm tracking-[0.2em] text-gray-300 animate-fade-in">
              Thank you for subscribing. We&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus("idle") }}
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border-b border-gray-800 py-4 text-center text-xs tracking-[0.2em] focus:outline-none focus:border-white transition-colors"
              />
              {newsletterStatus === "error" && (
                <p className="text-red-400 text-xs tracking-wide">Please enter a valid email address.</p>
              )}
              <button type="submit" className="text-[10px] tracking-[0.3em] mt-4 hover:text-gray-400 transition-colors uppercase">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}