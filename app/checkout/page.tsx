"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/components/toast-provider"
import { CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, Clock, Scissors } from "lucide-react"

export default function CheckoutPage() {
  const { items, totalAmount, totalCount, clearCart } = useCart()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<any | null>(null)

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    city: "",
    shippingAddress: "",
    landmark: "",
    notes: "",
    // Optional measurements
    bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    height: "",
  })

  const [showMeasurements, setShowMeasurements] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customerName.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.shippingAddress.trim()) {
      addToast("Please fill in all required delivery fields.", "error")
      return
    }

    if (items.length === 0) {
      addToast("Your bespoke bag is empty.", "error")
      return
    }

    setLoading(true)

    try {
      // Build order items payload including any global measurements provided at checkout
      const enrichedItems = items.map((item) => {
        if (!item.measurements && (formData.bust || formData.waist || formData.hips || formData.shoulder)) {
          return {
            ...item,
            measurements: {
              bust: formData.bust,
              waist: formData.waist,
              hips: formData.hips,
              shoulder: formData.shoulder,
              length: formData.height,
              notes: formData.notes,
            },
          }
        }
        return item
      })

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: enrichedItems,
          totalAmount,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to process order")
      }

      setCompletedOrder({
        orderId: data.orderId,
        directWhatsappUrl: data.directWhatsappUrl,
        customerName: formData.customerName,
        phone: formData.phone,
        city: formData.city,
        totalAmount,
        items: [...items],
      })

      clearCart()
      addToast("Order placed successfully!", "success")
    } catch (err: any) {
      console.error(err)
      addToast(err.message || "Failed to submit order. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  // If order completed successfully
  if (completedOrder) {
    return (
      <div className="pt-20 lg:pt-28 pb-20 min-h-screen bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-100 text-center space-y-6">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Bespoke Order Confirmed</p>
              <h1 className="text-2xl md:text-3xl font-light tracking-widest text-black">
                THANK YOU, {completedOrder.customerName.toUpperCase()}
              </h1>
              <p className="text-sm text-gray-600 font-mono">
                Order #{completedOrder.orderId}
              </p>
            </div>

            <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
              Your order has been registered with the Eve Whites atelier. Our design consultant will reach out via WhatsApp on <span className="font-medium text-black">{completedOrder.phone}</span> to finalize your exact bespoke measurements and 50% advance confirmation.
            </p>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={completedOrder.directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-medium rounded hover:bg-[#1ebd5a] transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Connect on WhatsApp (+92 321 9981625)
              </a>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-black text-black text-xs uppercase tracking-[0.2em] font-medium rounded hover:bg-black hover:text-white transition-colors"
              >
                Continue Browsing
              </Link>
            </div>

            {/* Order Details Card */}
            <div className="mt-8 pt-8 border-t border-gray-100 text-left space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-gray-900">
                Order Summary
              </h3>
              <div className="divide-y divide-gray-100 text-sm">
                {completedOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-xs">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider font-semibold">Total</span>
                <span className="text-base font-light text-black">
                  Rs. {completedOrder.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="pt-24 lg:pt-32 pb-20 min-h-screen bg-white">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Scissors className="w-8 h-8 text-gray-400 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl font-light tracking-widest text-black uppercase">
            Your Bespoke Bag is Empty
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please add handcrafted pieces from our collection before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 lg:pt-28 pb-20 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center text-xs tracking-wider text-gray-500 hover:text-black uppercase transition-colors gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Collections
          </Link>
          <h1 className="text-2xl md:text-3xl font-light tracking-widest text-black uppercase mt-3">
            Bespoke Order Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-4">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-900 pb-2 border-b">
                  1. Contact & Customer Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Ayesha Khan"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                      WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0321 1234567"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ayesha@example.com"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-900 pb-2 border-b">
                  2. Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Lahore, Karachi, Islamabad"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                      Nearest Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near Mall of Lahore"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="shippingAddress"
                    required
                    rows={2}
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    placeholder="House / Apartment #, Street, Block, Area"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Optional Custom Sizing */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-900">
                    3. Custom Measurements (Optional)
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowMeasurements(!showMeasurements)}
                    className="text-xs text-gray-600 hover:text-black underline uppercase"
                  >
                    {showMeasurements ? "Hide Measurements" : "+ Add Measurements Now"}
                  </button>
                </div>

                {showMeasurements && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4 text-xs animate-in fade-in duration-200">
                    <p className="text-gray-600">
                      You can enter your measurements now in centimetres (cm), or provide them later during your design consultation.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-500 mb-1">Bust (cm)</label>
                        <input
                          type="text"
                          name="bust"
                          value={formData.bust}
                          onChange={handleChange}
                          placeholder="e.g. 88"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">Waist (cm)</label>
                        <input
                          type="text"
                          name="waist"
                          value={formData.waist}
                          onChange={handleChange}
                          placeholder="e.g. 70"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">Hips (cm)</label>
                        <input
                          type="text"
                          name="hips"
                          value={formData.hips}
                          onChange={handleChange}
                          placeholder="e.g. 96"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">Shoulder (cm)</label>
                        <input
                          type="text"
                          name="shoulder"
                          value={formData.shoulder}
                          onChange={handleChange}
                          placeholder="e.g. 38"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 mb-1">Height / Length (cm)</label>
                        <input
                          type="text"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          placeholder="e.g. 145"
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">
                    Order Notes / Special Requests (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Neckline preferences, event date, color customizations, etc."
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Payment Notice */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 space-y-1">
                <p className="font-semibold text-black uppercase tracking-wider">Bespoke Payment Terms:</p>
                <p>
                  As each ensemble is exclusively handcrafted to your custom dimensions, a standard 50% advance is required upon order confirmation via bank transfer. The remaining 50% is due prior to courier dispatch.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-black text-white text-xs font-medium uppercase tracking-[0.25em] rounded hover:bg-gray-800 disabled:bg-gray-400 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <span>Place Order & Dispatch to Atelier</span>
                )}
              </button>
            </form>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-900 pb-2 border-b">
                Order Review ({totalCount} {totalCount === 1 ? "Piece" : "Pieces"})
              </h2>

              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto pr-1 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    <div className="relative w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs uppercase tracking-wider font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                      <p className="text-xs font-medium text-gray-900 mt-1">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                      {item.measurements && (
                        <p className="text-[10px] text-gray-400 mt-1">
                          Custom sizing specified
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Delivery Consultation</span>
                  <span className="text-green-600">Included</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gray-200">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-light text-black">
                    Rs. {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-gray-100 space-y-3 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-black flex-shrink-0" />
                  <span>2–3 Months Handcrafted Made-to-Order Timeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />
                  <span>100% Bespoke Fit & Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
