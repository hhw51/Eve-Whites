"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"

interface SendFavoritesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SendFavoritesModal({ isOpen, onClose }: SendFavoritesModalProps) {
  const { items } = useFavorites()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occasion: "",
    colorPalette: "",
    fabricPreference: "",
    customDescription: "",
    referenceImage: null as File | null,
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, referenceImage: e.target.files![0] }))
    }
  }

  const handleSendEmail = async () => {
    if (!formData.fullName || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/send-favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          favorites: items,
          method: "email",
        }),
      })

      if (response.ok) {
        setSubmitMessage("Your favorites have been sent successfully!")
        setTimeout(() => {
          onClose()
          setSubmitMessage("")
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            occasion: "",
            colorPalette: "",
            fabricPreference: "",
            customDescription: "",
            referenceImage: null,
          })
        }, 2000)
      }
    } catch (error) {
      console.error("Error sending favorites:", error)
      alert("Failed to send favorites. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleSendWhatsApp = () => {
    if (!formData.fullName || !formData.email) {
      alert("Please fill in all required fields")
      return
    }

    const favoritesText = items.map((item) => `${item.name} - $${item.price.toLocaleString()}`).join("\n")

    const message = `Hello! I'm interested in your designs.\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nOccasion: ${formData.occasion || "Not specified"}\nColor Preference: ${formData.colorPalette || "Not specified"}\nFabric: ${formData.fabricPreference || "Not specified"}\nCustom Design: ${formData.customDescription || "None"}\n\nMy Favorite Designs:\n${favoritesText}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" onClick={onClose} />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-light tracking-widest">SEND MY FAVORITES</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {submitMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {submitMessage}
              </div>
            )}

            {/* Personal Info Section */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">PERSONAL INFORMATION</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Design Preferences Section */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">DESIGN PREFERENCES</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  >
                    <option value="">Select an occasion</option>
                    <option value="wedding">Wedding</option>
                    <option value="party">Party</option>
                    <option value="casual">Casual</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Color Palette</label>
                  <input
                    type="text"
                    name="colorPalette"
                    value={formData.colorPalette}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                    placeholder="e.g., Ivory and blush with gold accents"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Fabric Preference</label>
                  <select
                    name="fabricPreference"
                    value={formData.fabricPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                  >
                    <option value="">Select fabric</option>
                    <option value="silk">Silk</option>
                    <option value="satin">Satin</option>
                    <option value="crepe">Crepe</option>
                    <option value="lace">Lace</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Design Description</label>
                  <textarea
                    name="customDescription"
                    value={formData.customDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-black resize-none"
                    rows={4}
                    placeholder="Describe your ideal design, style, silhouette, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reference Image (Optional)</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full"
                  />
                  {formData.referenceImage && (
                    <p className="text-sm text-gray-600 mt-2">{formData.referenceImage.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Favorites Summary */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">YOUR FAVORITE DESIGNS</h3>
              <div className="bg-gray-50 rounded p-4 space-y-3 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-3 border-b last:border-b-0">
                    <div className="relative w-12 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-gray-600 text-sm">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSendEmail}
                disabled={submitting}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Send via Email"}
              </button>
              <button
                onClick={handleSendWhatsApp}
                disabled={submitting}
                className="flex-1 bg-green-600 text-white px-6 py-3 font-medium tracking-wide uppercase text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
