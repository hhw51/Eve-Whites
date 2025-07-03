import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart/cart-context"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eve Whites - Minimalist Fashion",
  description:
    "Discover timeless elegance with Eve Whites premium fashion collection. Minimalist designs, premium quality.",
  keywords: "fashion, minimalist, luxury, clothing, women, elegant",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col w-full max-w-full">
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
