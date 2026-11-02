"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setStatus("error")
      return
    }
    // Acknowledged — integrate with email service (e.g. Mailchimp) in future
    setStatus("success")
    setEmail("")
  }

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
                href="https://www.instagram.com/evewhites.offical"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-600 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/923250948136"
                target="_blank"
                rel="noopener noreferrer"
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
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-medium mb-4 tracking-wide">CUSTOMER CARE</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/faq#Delivery" className="hover:text-white transition-colors">Delivery Info</Link></li>
              <li><Link href="/faq#Care & Returns" className="hover:text-white transition-colors">Care & Returns</Link></li>
              <li><Link href="/faq#Sizing" className="hover:text-white transition-colors">Sizing Guide</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h4 className="font-medium mb-2 tracking-wide">STAY UPDATED</h4>
              <p className="text-gray-300 text-sm">
                Subscribe to receive updates on new arrivals and exclusive offers.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              {status === "success" ? (
                <p className="text-sm text-gray-300 tracking-wide py-3">
                  Thank you for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle") }}
                    placeholder={status === "error" ? "Please enter a valid email" : "Enter your email"}
                    className={`flex-1 lg:w-80 px-4 py-3 bg-transparent border text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      status === "error" ? "border-red-500 placeholder-red-400" : "border-gray-600 focus:border-white"
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white text-black font-medium tracking-wide hover:bg-gray-200 transition-colors"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Eve Whites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

