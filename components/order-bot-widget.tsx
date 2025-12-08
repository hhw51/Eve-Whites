"use client"

import type React from "react"
import { useToast } from "@/components/toast-provider"
import { useState } from "react"
import { X, MessageCircle, Mail, Instagram } from "lucide-react"

export default function OrderBotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const { addToast } = useToast()
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
      return `Hello Eve Whites!\n\nI'm interested in ordering a custom bridal ensemble.\n\n*PERSONAL DETAILS*\nName: ${formData.name || "Not provided"}\nEmail: ${formData.email || "Not provided"}\nPhone: ${formData.phone || "Not provided"}\n\n*MEASUREMENTS (in cm)*\nBust: ${formData.bust || "-"}\nWaist: ${formData.waist || "-"}\nHips: ${formData.hips || "-"}\nShoulder: ${formData.shoulder || "-"}\nLength: ${formData.length || "-"}\nSleeve: ${formData.sleeve || "-"}\n\n*DESIGN PREFERENCES*\nNeckline: ${formData.neckline || "-"}\nBack Design: ${formData.backDesign || "-"}\nOccasion: ${formData.occasion || "-"}\nNotes: ${formData.notes || "-"}\n\nPlease guide me through the process.`
    }

    return `Hello Eve Whites! I'm interested in ordering a custom bridal ensemble. Please guide me through the process.`
  }

  const handleContactViaWhatsApp = () => {
    const message = encodeURIComponent(generateMessage())
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank")
    addToast("Opening WhatsApp...", "success")
    setIsOpen(false)
  }

  const handleContactViaEmail = () => {
    const subject = "Custom Bridal Order Inquiry"
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
      {/* Bot Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-black text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Order now"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Bot Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-24px)] bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold tracking-wide">Order Now</h3>
              <p className="text-xs text-gray-300">Custom Bridal Couture</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-800 rounded transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {showForm ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">Tell us about your measurements</p>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">MEASUREMENTS (cm)</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="bust"
                      placeholder="Bust"
                      value={formData.bust}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      name="waist"
                      placeholder="Waist"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      name="hips"
                      placeholder="Hips"
                      value={formData.hips}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      type="text"
                      name="shoulder"
                      placeholder="Shoulder"
                      value={formData.shoulder}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-3 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Choose your preferred contact method</p>

                <button
                  onClick={handleContactViaWhatsApp}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors text-left"
                >
                  <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-xs text-gray-600">{contactInfo.whatsapp}</p>
                  </div>
                </button>

                <button
                  onClick={handleContactViaEmail}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors text-left"
                >
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Email</p>
                    <p className="text-xs text-gray-600">{contactInfo.email}</p>
                  </div>
                </button>

                <button
                  onClick={handleContactViaInstagram}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100 transition-colors text-left"
                >
                  <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Instagram</p>
                    <p className="text-xs text-gray-600">@{contactInfo.instagram}</p>
                  </div>
                </button>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:border-black transition-colors"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
