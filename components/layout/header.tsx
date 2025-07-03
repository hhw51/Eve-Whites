"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import CartModal from "@/components/cart/cart-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const { items } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect shadow-lg" : "bg-white/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl lg:text-3xl font-light tracking-widest">
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
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/account"
                className="hidden lg:block text-sm font-medium tracking-wide hover:text-gray-600 transition-colors"
              >
                ACCOUNT
              </Link>
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-6 space-y-4">
              <Link href="/shop" className="block text-lg font-medium tracking-wide">
                SHOP
              </Link>
              <Link href="/about" className="block text-lg font-medium tracking-wide">
                ABOUT
              </Link>
              <Link href="/blog" className="block text-lg font-medium tracking-wide">
                JOURNAL
              </Link>
              <Link href="/contact" className="block text-lg font-medium tracking-wide">
                CONTACT
              </Link>
              <Link href="/account" className="block text-lg font-medium tracking-wide">
                ACCOUNT
              </Link>
              <button
                onClick={() => {
                  setIsCartModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="flex items-center space-x-2 text-lg font-medium tracking-wide"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>CART ({itemCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <CartModal isOpen={isCartModalOpen} onClose={() => setIsCartModalOpen(false)} />
    </>
  )
}
