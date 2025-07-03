"use client"

import type React from "react"

import { useState } from "react"
import { User, Package, Heart, Settings } from "lucide-react"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [email, setEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsLoggedIn(true)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light tracking-widest mb-4">MY ACCOUNT</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-medium mb-2 tracking-wide">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              New customer? <button className="underline hover:no-underline">Create an account</button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-8">MY ACCOUNT</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 flex items-center space-x-3 transition-colors ${
                  activeTab === "profile" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 flex items-center space-x-3 transition-colors ${
                  activeTab === "orders" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-4 py-3 flex items-center space-x-3 transition-colors ${
                  activeTab === "wishlist" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-3 flex items-center space-x-3 transition-colors ${
                  activeTab === "settings" ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="font-medium mb-6 tracking-wide">PROFILE INFORMATION</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2 tracking-wide text-sm">EMAIL</label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 tracking-wide text-sm">FIRST NAME</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2 tracking-wide text-sm">LAST NAME</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <button className="btn-primary">Update Profile</button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="font-medium mb-6 tracking-wide">ORDER HISTORY</h2>
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found</p>
                  <p className="text-gray-400 text-sm mt-2">Your order history will appear here</p>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="font-medium mb-6 tracking-wide">WISHLIST</h2>
                <div className="text-center py-12">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Save items you love for later</p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="font-medium mb-6 tracking-wide">ACCOUNT SETTINGS</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Email Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-sm">New arrivals and promotions</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-sm">Order updates</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm">Style tips and inspiration</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
