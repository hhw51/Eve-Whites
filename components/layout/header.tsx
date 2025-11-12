"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, Heart } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { items: favoriteItems } = useFavorites()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const favoriteCount = favoriteItems.length

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled ? "glass-effect shadow-lg" : "bg-white/90"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 w-full">
            {/* Logo */}
            <Link href="/" className="text-lg sm:text-xl lg:text-3xl font-light tracking-widest flex-shrink-0">
              EVE WHITES
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-gray-600 transition-colors">
                SHOP
              </Link>
              <Link href="/about" className="text-sm font-medium tracking-wide hover:text-gray-600 transition-colors">
                ABOUT
              </Link>
              <Link href="/blog" className="text-sm font-medium tracking-wide hover:text-gray-600 transition-colors">
                JOURNAL
              </Link>
              <Link href="/contact" className="text-sm font-medium tracking-wide hover:text-gray-600 transition-colors">
                CONTACT
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <Link
                href="/account"
                className="hidden lg:block text-sm font-medium tracking-wide hover:text-gray-600 transition-colors"
              >
                ACCOUNT
              </Link>
              <Link href="/favorites" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t w-full">
            <div className="px-4 py-4 space-y-3 w-full max-w-full">
              <Link
                href="/shop"
                className="block text-base font-medium tracking-wide py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link
                href="/about"
                className="block text-base font-medium tracking-wide py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/blog"
                className="block text-base font-medium tracking-wide py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                JOURNAL
              </Link>
              <Link
                href="/contact"
                className="block text-base font-medium tracking-wide py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
              <Link
                href="/account"
                className="block text-base font-medium tracking-wide py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                ACCOUNT
              </Link>
              <Link
                href="/favorites"
                className="flex items-center space-x-2 text-base font-medium tracking-wide py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span>FAVORITES ({favoriteCount})</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
