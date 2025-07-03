"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: "Shipping",
    question: "How long does shipping take?",
    answer:
      "We offer free standard shipping on all orders over PKR. 2500. Standard shipping typically takes 3-5 business days within the US. Express shipping (1-2 business days) is available for an additional fee.",
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. Please note that customs duties and taxes may apply.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase for unworn items in original condition with tags attached. Returns are free for US customers, and we provide a prepaid return label.",
  },
  {
    category: "Returns",
    question: "How do I return an item?",
    answer:
      "To return an item, log into your account and select the order you wish to return. Follow the prompts to print your return label and drop off the package at any authorized shipping location.",
  },
  {
    category: "Sizing",
    question: "How do I find my size?",
    answer:
      "We provide detailed size charts for each product. We recommend measuring yourself and comparing to our size guide. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
  },
  {
    category: "Sizing",
    question: "Do your clothes run true to size?",
    answer:
      "Our garments are designed to fit true to size based on our size charts. However, fit can vary by style. We include specific fit notes on each product page to help you choose the best size.",
  },
  {
    category: "Orders",
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 1 hour of placement. After this time, orders enter our fulfillment process and cannot be changed. Please contact us immediately if you need to make changes.",
  },
  {
    category: "Orders",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.",
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
          <p className="text-gray-600">Find answers to common questions about our products, shipping, and policies.</p>
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
                  className={`w-5 h-5 text-gray-400 transition-transform ${
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
            Can't find what you're looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="mailto:hello@evewhites.com" className="btn-secondary">
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
