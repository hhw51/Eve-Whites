"use client"

import type React from "react"
import { useState, useRef } from "react"
import { X } from "lucide-react"
import { useFavorites } from "@/components/favorites/favorites-context"
import { useToast } from "@/components/toast-provider"

interface SendFavoritesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SendFavoritesModal({ isOpen, onClose }: SendFavoritesModalProps) {
  const { items } = useFavorites()
  const { addToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occasion: "",
    bust: "",
    waist: "",
    hips: "",
    shoulderWidth: "",
    length: "",
    sleeveLength: "",
    neckline: "",
    backDesign: "",
    additionalNotes: "",
    referenceImage: null as File | null,
  })

  const [submitting, setSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, referenceImage: e.target.files![0] }))
      addToast("Reference image uploaded", "success")
    }
  }

  const handleSendEmail = async () => {
    if (!formData.fullName || !formData.email) {
      addToast("Please fill in your name and email", "error")
      return
    }

    setSubmitting(true)

    try {
      // Remove file before sending JSON request
      const { referenceImage, ...safeData } = formData

      const response = await fetch("/api/send-favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...safeData,
          referenceImage: null, // backend does not yet handle files
          favorites: items,
          method: "email",
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Server Error:", errorText)
        addToast("Server failed to send email.", "error")
        return
      }

      addToast("Favorites sent successfully!", "success")

      setTimeout(() => {
        onClose()
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          occasion: "",
          bust: "",
          waist: "",
          hips: "",
          shoulderWidth: "",
          length: "",
          sleeveLength: "",
          neckline: "",
          backDesign: "",
          additionalNotes: "",
          referenceImage: null,
        })
      }, 1500)
    } catch (error) {
      console.error("Error sending favorites:", error)
      addToast("Failed to send favorites. Please try again.", "error")
    } finally {
      setSubmitting(false)
    }
  }

  const handleSendWhatsApp = () => {
    if (!formData.fullName) {
      addToast("Please enter your name", "error")
      return
    }

    const favoritesText = items.map((item) => item.name).join("\n")
    const measurementsText = `Measurements (cm):
Bust: ${formData.bust || "Not provided"}
Waist: ${formData.waist || "Not provided"}
Hips: ${formData.hips || "Not provided"}
Shoulder Width: ${formData.shoulderWidth || "Not provided"}
Length: ${formData.length || "Not provided"}
Sleeve Length: ${formData.sleeveLength || "Not provided"}`

    const message = `Hello! I'm interested in your designs.

Name: ${formData.fullName}
Email: ${formData.email || "Not provided"}
Phone: ${formData.phone || "Not provided"}

Occasion: ${formData.occasion || "Not specified"}
Neckline: ${formData.neckline || "Not specified"}
Back Design: ${formData.backDesign || "Not specified"}

${measurementsText}

Additional Notes: ${formData.additionalNotes || "None"}

My Favorite Designs:
${favoritesText}
`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
    addToast("Redirecting to WhatsApp", "success")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-light tracking-widest">SEND MY FAVORITES</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 md:p-6 space-y-6">
            {/* Personal Info Section */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">PERSONAL INFORMATION</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Measurements Section */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">CUSTOM MEASUREMENTS (cm)</h3>
              <p className="text-xs text-gray-600 mb-4">
                These measurements help us create your perfect fit
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="bust"
                  placeholder="Bust"
                  value={formData.bust}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  name="waist"
                  placeholder="Waist"
                  value={formData.waist}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  name="hips"
                  placeholder="Hips"
                  value={formData.hips}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  name="shoulderWidth"
                  placeholder="Shoulder Width"
                  value={formData.shoulderWidth}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  name="length"
                  placeholder="Total Length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  name="sleeveLength"
                  placeholder="Sleeve Length"
                  value={formData.sleeveLength}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Design Preferences */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">DESIGN PREFERENCES</h3>
              <div className="space-y-4">
                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none"
                >
                  <option value="">Select Occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="engagement">Engagement</option>
                  <option value="mehndi">Mehndi</option>
                  <option value="event">Special Event</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="text"
                  name="neckline"
                  placeholder="Preferred Neckline"
                  value={formData.neckline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                />

                <input
                  type="text"
                  name="backDesign"
                  placeholder="Back Design Preference"
                  value={formData.backDesign}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                />

                <textarea
                  name="additionalNotes"
                  placeholder="Additional Notes & Design Ideas"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded text-sm resize-none"
                  rows={3}
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reference Image (Optional)
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="w-full text-sm"
                  />
                  {formData.referenceImage && (
                    <p className="text-xs text-gray-600 mt-2">
                      {formData.referenceImage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div>
              <h3 className="text-lg font-medium tracking-wide mb-4">YOUR FAVORITE DESIGNS</h3>
              <div className="bg-gray-50 rounded p-4 space-y-2 max-h-40 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-gray-600 text-sm">No favorites selected</p>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 pb-2 border-b last:border-b-0"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-8 h-10 object-cover rounded"
                      />
                      <p className="text-sm font-medium truncate">{item.name}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSendEmail}
                disabled={submitting}
                className={`flex-1 btn-primary text-xs sm:text-sm ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Sending..." : "Send via Email"}
              </button>

              <button
                onClick={handleSendWhatsApp}
                disabled={submitting}
                className="flex-1 bg-green-600 text-white px-4 py-2 sm:py-3 font-medium tracking-wide uppercase text-xs sm:text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
