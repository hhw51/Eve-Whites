"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Menu, X, Heart, ShoppingBag, Instagram, MessageCircle, ArrowRight } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"
import { useCart } from "@/components/cart/cart-context"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const { items: favoriteItems } = useFavorites()
  const { totalCount: cartCount, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
    setIsSearchOpen(false)
    setIsMobileMenuOpen(false)
    setSearchQuery("")
  }

  const favoriteCount = favoriteItems.length

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "ABOUT", href: "/about" },
    { name: "JOURNAL", href: "/blog" },
    { name: "CONTACT", href: "/contact" },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white ${
          isScrolled ? "shadow-sm border-b border-gray-100" : "border-b border-gray-100/60"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 w-full">
            {/* Logo */}
            <Link
              href="/"
              className="text-base sm:text-lg lg:text-2xl font-light tracking-[0.25em] text-black hover:opacity-80 transition-opacity flex-shrink-0 uppercase"
            >
              EVE WHITES
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs tracking-[0.2em] uppercase transition-colors relative py-1 ${
                      isActive
                        ? "text-black font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-black"
                        : "text-gray-700 hover:text-black font-medium"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </nav>

            {/* Right Interactive Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Account Link (Desktop) */}
              <Link
                href="/account"
                className="hidden lg:block text-xs font-medium tracking-[0.2em] text-gray-700 hover:text-black transition-colors px-2 py-1 uppercase"
              >
                ACCOUNT
              </Link>

              {/* Favorites Heart Icon */}
              <Link
                href="/favorites"
                className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label={`Favorites (${favoriteCount})`}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              {/* Cart Bag Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label={`Bespoke Bag (${cartCount})`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors ml-0.5"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop / Global Search Expandable Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 bg-white py-4 px-4 sm:px-6 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bridal gowns, evening wear, silk silhouettes..."
                className="flex-1 px-4 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-black tracking-wide"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-black"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer / Slide-Over Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Menu Panel */}
          <div className="relative w-4/5 max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div>
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-light tracking-[0.25em] uppercase text-black"
                >
                  EVE WHITES
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-700 hover:text-black"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-100">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search collection..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded text-gray-900 focus:outline-none focus:border-black"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </form>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-light tracking-[0.2em] text-gray-900 hover:text-black border-b border-gray-50 uppercase group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                  </Link>
                ))}

                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-light tracking-[0.2em] text-gray-900 hover:text-black border-b border-gray-50 uppercase group"
                >
                  <span>ACCOUNT</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                </Link>
              </nav>

              {/* Quick Actions (Favorites & Cart) */}
              <div className="px-6 space-y-2 pt-2">
                <Link
                  href="/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded text-xs tracking-wider uppercase text-gray-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>Saved Favorites</span>
                  </span>
                  <span className="font-semibold text-black">{favoriteCount}</span>
                </Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsCartOpen(true)
                  }}
                  className="w-full flex items-center justify-between p-3 bg-black text-white rounded text-xs tracking-wider uppercase transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Bespoke Bag</span>
                  </span>
                  <span className="font-semibold bg-white text-black text-[10px] px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Drawer Footer: Atelier Details */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
              <div className="text-[11px] text-gray-500 space-y-1">
                <p className="font-medium text-black uppercase tracking-wider">Eve Whites Atelier</p>
                <p>Exclusively Made-to-Order Couture</p>
                <p>2–3 Months Handcrafted Delivery</p>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <a
                  href="https://wa.me/923219981625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-black font-medium"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://www.instagram.com/evewhites.offical"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-black font-medium"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
