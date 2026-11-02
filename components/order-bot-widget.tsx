"use client"

import type React from "react"
import { useToast } from "@/components/toast-provider"
import { useState } from "react"
import { X, MessageCircle, Mail, Instagram } from "lucide-react"
import {
  INITIAL_FORM_DATA,
  CONTACT_INFO,
  generateConsultationMessage,
  type ConsultationFormData,
} from "@/lib/consultation-utils"

export default function OrderBotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const { addToast } = useToast()
  const [formData, setFormData] = useState<ConsultationFormData>(INITIAL_FORM_DATA)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleContactViaWhatsApp = () => {
    const message = encodeURIComponent(generateConsultationMessage(formData, "order"))
    window.open(`https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${message}`, "_blank")
    addToast("Opening WhatsApp...", "success")
    setIsOpen(false)
  }

  const handleContactViaEmail = () => {
    const subject = "Custom Bridal Order Inquiry"
    const body = generateConsultationMessage(formData, "order")
    window.open(
      `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    )
    addToast("Opening email client...", "success")
    setIsOpen(false)
  }

  const handleContactViaInstagram = () => {
    window.open(`https://www.instagram.com/${CONTACT_INFO.instagram}/`, "_blank")
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
                    {(["bust", "waist", "hips", "shoulder"] as const).map((field) => (
                      <input key={field} type="text" name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={formData[field]} onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black" />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="flex-1 px-3 py-2 text-sm border border-black rounded hover:bg-black hover:text-white transition-colors font-medium">
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">Choose your preferred contact method</p>

                <button onClick={handleContactViaWhatsApp}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors text-left">
                  <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-xs text-gray-600">{CONTACT_INFO.whatsapp}</p>
                  </div>
                </button>

                <button onClick={handleContactViaEmail}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors text-left">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Email</p>
                    <p className="text-xs text-gray-600">{CONTACT_INFO.email}</p>
                  </div>
                </button>

                <button onClick={handleContactViaInstagram}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-pink-50 border border-pink-200 rounded hover:bg-pink-100 transition-colors text-left">
                  <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Instagram</p>
                    <p className="text-xs text-gray-600">@{CONTACT_INFO.instagram}</p>
                  </div>
                </button>

                <button onClick={() => setShowForm(true)}
                  className="w-full mt-3 px-3 py-2 border border-gray-300 rounded text-sm font-medium hover:border-black transition-colors">
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
