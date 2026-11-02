"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Ordering & Consultation
  {
    category: "Ordering",
    question: "How do I place an order with Eve Whites?",
    answer:
      "All Eve Whites pieces are exclusively made-to-order. To begin your journey, you can schedule a consultation directly through our website, reach out via WhatsApp at +92 325 0948136, or email us at info@evewhites.com. Our design team will guide you through fabric selection, custom measurements, and design personalisation.",
  },
  {
    category: "Ordering",
    question: "Can I request a fully custom design?",
    answer:
      "Absolutely. Bespoke customisation is at the heart of what we do. Whether you wish to modify an existing silhouette from our collection or commission an entirely original piece, our atelier works closely with you to bring your vision to life — from neckline and fabric to embellishment and train length.",
  },
  // Measurements & Sizing
  {
    category: "Sizing",
    question: "How are measurements taken for a custom piece?",
    answer:
      "We require six key measurements: bust, waist, hips, shoulder width, total length, and sleeve length (if applicable), all in centimetres. You can provide these measurements yourself using our size guide, or visit our studio for a professional fitting session. Our consultants will advise you on any adjustments needed to achieve a perfect, flattering fit.",
  },
  {
    category: "Sizing",
    question: "What if my measurements change before delivery?",
    answer:
      "We recommend providing your measurements as close to the order confirmation date as possible. If your measurements change significantly during the 2–3 month production period, please notify us immediately. Minor alterations can often be accommodated at no additional cost, while more significant changes may require a revised timeline.",
  },
  // Delivery & Timeline
  {
    category: "Delivery",
    question: "How long does it take to receive my order?",
    answer:
      "As each garment is handcrafted to your exact specifications, our standard production timeline is 2 to 3 months from the date of order confirmation and receipt of your measurements. For rush orders or peak bridal seasons (particularly October–January), we recommend reaching out at least 4 months in advance to ensure timely delivery.",
  },
  {
    category: "Delivery",
    question: "Do you deliver internationally?",
    answer:
      "Yes, we ship worldwide. International orders are dispatched via insured, tracked courier services to ensure your ensemble arrives safely. Delivery charges and import duties vary by destination country and will be communicated at the time of order. Please allow an additional 5–10 business days for international transit.",
  },
  // Payment
  {
    category: "Payment",
    question: "What are your payment terms?",
    answer:
      "We require a 50% advance payment at the time of order confirmation to begin the production process. The remaining 50% is due upon completion, prior to dispatch. Payments can be made via bank transfer or other agreed methods. For international clients, our team will provide the appropriate payment details during consultation.",
  },
  {
    category: "Payment",
    question: "Are prices listed on the website?",
    answer:
      "Prices are not listed publicly as each piece is priced according to the fabric, level of embellishment, and degree of customisation involved. We provide a detailed quotation after your initial consultation. Our collections represent a range of investment levels to accommodate different budgets without compromising on craftsmanship.",
  },
  // Care & Returns
  {
    category: "Care & Returns",
    question: "What is your return and alteration policy?",
    answer:
      "Because every garment is custom-made to your precise measurements and design specifications, we are unable to accept returns or exchanges. However, we stand fully behind the quality of our work. Should you find any craftsmanship issue upon receipt, please contact us within 48 hours and we will make it right. Minor fitting adjustments once the garment is received can be arranged at our studio.",
  },
  {
    category: "Care & Returns",
    question: "How should I care for my Eve Whites garment?",
    answer:
      "We recommend professional dry cleaning only, using a specialist in bridal or couture garments. Store your piece on a padded, wide-shouldered hanger in a breathable garment bag, away from direct sunlight and moisture. Avoid contact with perfumes, hairspray, and sharp jewellery, which can damage delicate embellishments and fabrics.",
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(faqData.map((item) => item.category)))]

  const filteredFAQs =
    selectedCategory === "All" ? faqData : faqData.filter((item) => item.category === selectedCategory)

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest mb-4">FREQUENTLY ASKED QUESTIONS</h1>
          <p className="text-gray-600">
            Everything you need to know about ordering a bespoke Eve Whites ensemble.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{item.category}</span>
                  <h3 className="font-medium mt-1">{item.question}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                    openItems.includes(index) ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="font-medium mb-4 tracking-wide">STILL HAVE QUESTIONS?</h2>
          <p className="text-gray-600 mb-6">
            Our consultants are here to guide you through every step of the bespoke process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/923250948136"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Chat on WhatsApp
            </a>
            <a href="/contact" className="btn-secondary">
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
