import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { FavoritesProvider } from "@/components/favorites/favorites-context"
import { ToastProvider } from "@/components/toast-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import OrderBotWidget from "@/components/order-bot-widget"

export const metadata: Metadata = {
  title: "Eve Whites - Luxury Bridal & Evening Wear | Pakistani Designer",
  description:
    "Eve Whites redefines bridal couture with avant-garde aesthetics and classical elegance. Luxury Pakistani designer dresses for brides seeking individuality, confidence, and meaningful style.",
  keywords: [
    "bridal wear Pakistan",
    "luxury wedding gowns",
    "Pakistani designer bridal",
    "couture evening wear",
    "wedding dress Pakistan",
    "Eve Whites",
    "designer bridal",
    "luxury fashion Pakistan",
    "modest bridal wear",
  ],
  authors: [{ name: "Eve Whites" }],
  creator: "Eve Whites",
  publisher: "Eve Whites",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "Eve Whites - Luxury Bridal & Evening Wear",
    description:
      "Discover avant-garde bridal couture that celebrates individuality and grace. Premium Pakistani designer collections.",
    type: "website",
    locale: "en_PK",
    url: "https://evewhites.com",
    siteName: "Eve Whites",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eve Whites - Luxury Bridal Couture",
    description: "Avant-garde bridal wear for the modern Pakistani bride",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.app'
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Eve Whites",
              description:
                "Luxury bridal and evening wear designer based in Pakistan, specializing in avant-garde couture with classical elegance",
              url: "https://evewhites.com",
              logo: "https://evewhites.com/logo.png",
              sameAs: ["https://www.instagram.com/evewhites.offical", "https://www.facebook.com/evewhites.offical"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+92-325-0948136",
                contactType: "Customer Service",
                email: "info@evewhites.com",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <ToastProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col w-full max-w-full">
              <Header />
              <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
              <Footer />
              <OrderBotWidget />
            </div>
          </FavoritesProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
