"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/toast-provider"
import { X, Mail, MessageCircle, Instagram } from "lucide-react"

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    length: "",
    sleeve: "",
    neckline: "",
    backDesign: "",
    occasion: "",
    notes: "",
  })
  const { addToast } = useToast()

  const contactInfo = {
    whatsapp: "+923250948136",
    email: "info@evewhites.com",
    instagram: "evewhites.offical",
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const generateMessage = () => {
    const hasFormData = Object.values(formData).some((val) => val)

    if (hasFormData) {
      return `Hello Eve Whites!\n\nI'm interested in scheduling a consultation for a custom bridal ensemble.\n\n*PERSONAL DETAILS*\nName: ${formData.name || "Not provided"}\nEmail: ${formData.email || "Not provided"}\nPhone: ${formData.phone || "Not provided"}\n\n*MEASUREMENTS (in cm)*\nBust: ${formData.bust || "-"}\nWaist: ${formData.waist || "-"}\nHips: ${formData.hips || "-"}\nShoulder Width: ${formData.shoulder || "-"}\nLength: ${formData.length || "-"}\nSleeve Length: ${formData.sleeve || "-"}\n\n*DESIGN PREFERENCES*\nNeckline: ${formData.neckline || "-"}\nBack Design: ${formData.backDesign || "-"}\nOccasion: ${formData.occasion || "-"}\n\n*ADDITIONAL NOTES*\n${formData.notes || "None"}\n\nPlease guide me through the process.`
    }

    return `Hello Eve Whites! I'm interested in scheduling a consultation for a custom bridal ensemble. Please guide me through the process.`
  }

  const handleContactViaWhatsApp = () => {
    const message = encodeURIComponent(generateMessage())
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank")
    addToast("Opening WhatsApp...", "success")
    setIsOpen(false)
  }

  const handleContactViaEmail = () => {
    const subject = "Custom Bridal Consultation Request"
    const body = generateMessage()
    window.open(`mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    addToast("Opening email client...", "success")
    setIsOpen(false)
  }

  const handleContactViaInstagram = () => {
    window.open(`https://www.instagram.com/${contactInfo.instagram}/`, "_blank")
    addToast("Opening Instagram...", "success")
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-black text-white px-6 py-3 font-medium tracking-wide hover:bg-gray-900 transition-colors"
      >
        SCHEDULE CONSULTATION
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-black text-white p-6 flex items-center justify-between border-b">
              <div>
                <h2 className="text-xl font-light tracking-widest">SCHEDULE CONSULTATION</h2>
                <p className="text-sm text-gray-300 mt-1">Tell us about your dream bridal ensemble</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-800 rounded transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {showForm ? (
                <>
                  {/* Personal Information */}
                  <div>
                    <h3 className="font-medium tracking-wide mb-4 text-sm">PERSONAL INFORMATION</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
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

                  {/* Measurements */}
                  <div>
                    <h3 className="font-medium tracking-wide mb-4 text-sm">YOUR MEASUREMENTS (cm)</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="bust"
                        placeholder="Bust"
                        value={formData.bust}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        name="waist"
                        placeholder="Waist"
                        value={formData.waist}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        name="hips"
                        placeholder="Hips"
                        value={formData.hips}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        name="shoulder"
                        placeholder="Shoulder Width"
                        value={formData.shoulder}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        name="length"
                        placeholder="Total Length"
                        value={formData.length}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                      <input
                        type="text"
                        name="sleeve"
                        placeholder="Sleeve Length"
                        value={formData.sleeve}
                        onChange={handleInputChange}
                        className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Design Preferences */}
                  <div>
                    <h3 className="font-medium tracking-wide mb-4 text-sm">DESIGN PREFERENCES</h3>
                    <div className="space-y-3">
                      <select
                        name="neckline"
                        value={formData.neckline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">Select Neckline Preference</option>
                        <option value="sweetheart">Sweetheart</option>
                        <option value="plunging">Plunging</option>
                        <option value="high-neck">High Neck</option>
                        <option value="illusion">Illusion</option>
                        <option value="off-shoulder">Off-Shoulder</option>
                      </select>
                      <select
                        name="backDesign"
                        value={formData.backDesign}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">Select Back Design</option>
                        <option value="low-back">Low Back</option>
                        <option value="open-back">Open Back</option>
                        <option value="lace-up">Lace Up</option>
                        <option value="button">Button Back</option>
                        <option value="closed">Closed Back</option>
                      </select>
                      <select
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                      >
                        <option value="">Select Occasion</option>
                        <option value="wedding">Wedding</option>
                        <option value="engagement">Engagement</option>
                        <option value="mehndi">Mehndi</option>
                        <option value="walima">Walima</option>
                        <option value="evening">Evening Event</option>
                      </select>
                      <textarea
                        name="notes"
                        placeholder="Any additional notes or inspiration (optional)"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 border border-black text-black rounded font-medium hover:bg-black hover:text-white transition-colors text-sm"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-900 transition-colors text-sm"
                    >
                      Continue to Contact Options
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium tracking-wide mb-4">CONNECT WITH US</h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Choose your preferred method to schedule your consultation
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleContactViaWhatsApp}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div className="text-left">
                        <p className="font-medium text-sm">WhatsApp</p>
                        <p className="text-xs text-gray-600">{contactInfo.whatsapp}</p>
                      </div>
                    </button>

                    <button
                      onClick={handleContactViaEmail}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-xs text-gray-600">{contactInfo.email}</p>
                      </div>
                    </button>

                    <button
                      onClick={handleContactViaInstagram}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100 transition-colors"
                    >
                      <Instagram className="w-5 h-5 text-pink-600" />
                      <div className="text-left">
                        <p className="font-medium text-sm">Instagram</p>
                        <p className="text-xs text-gray-600">@{contactInfo.instagram}</p>
                      </div>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full mt-4 px-4 py-2 border border-gray-300 rounded font-medium hover:border-black transition-colors text-sm"
                  >
                    Back to Form
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
