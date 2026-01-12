"use client"
import { useState } from "react"

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-black text-white w-full z-[100] relative">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-[10px] md:text-xs tracking-[0.2em] lg:tracking-[0.3em] uppercase font-medium">
            Exclusively made-to-order <span className="mx-2 opacity-40">•</span> 2-3 months delivery
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="hover:opacity-60 transition-opacity text-xs pr-2"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  )
}