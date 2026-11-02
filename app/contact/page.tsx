"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MessageCircle, Facebook, Instagram } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || "Failed to send message. Please try again.")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-4">CONTACT US</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-medium mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-sm">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-medium mb-2 tracking-wide">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium mb-2 tracking-wide">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-medium mb-2 tracking-wide">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                    {submitError}
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-medium mb-6 tracking-wide">GET IN TOUCH</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <a href="tel:+923250948136" className="text-gray-600 text-sm hover:text-black transition-colors">
                      +92 325 0948136
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <a
                      href="mailto:info@evewhites.com"
                      className="text-gray-600 text-sm hover:text-black transition-colors"
                    >
                      info@evewhites.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <h3 className="font-medium mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/923250948136"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-black transition-colors"
                    >
                      +92 325 0948136
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Facebook className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <h3 className="font-medium mb-1">Facebook</h3>
                    <a
                      href="https://www.facebook.com/evewhites.offical"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-black transition-colors"
                    >
                      @evewhites.offical
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Instagram className="w-5 h-5 mt-1 text-gray-600" />
                  <div>
                    <h3 className="font-medium mb-1">Instagram</h3>
                    <a
                      href="https://www.instagram.com/evewhites.offical"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 text-sm hover:text-black transition-colors"
                    >
                      @evewhites.offical
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div>
              <h3 className="font-medium mb-4 tracking-wide">STORE HOURS</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>11:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>11:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
