import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-light tracking-widest mb-4">EVE WHITES</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Timeless elegance meets modern minimalism. Discover our curated collection of premium fashion essentials.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 tracking-wide">QUICK LINKS</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-medium mb-4 tracking-wide">CUSTOMER CARE</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <h4 className="font-medium mb-2 tracking-wide">STAY UPDATED</h4>
              <p className="text-gray-300 text-sm">
                Subscribe to receive updates on new arrivals and exclusive offers.
              </p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-4 py-3 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <button className="px-6 py-3 bg-white text-black font-medium tracking-wide hover:bg-gray-200 transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Eve Whites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
