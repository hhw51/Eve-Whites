import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Eve Whites - Luxury Bridal Designer Pakistan",
  description:
    "Discover the story behind Eve Whites. A Pakistani luxury bridal brand redefining couture with avant-garde vision, cultural dignity, and timeless elegance for the modern bride.",
  keywords: [
    "about Eve Whites",
    "Pakistani bridal designer",
    "luxury fashion Pakistan",
    "avant-garde couture",
    "wedding wear designer",
  ],
  openGraph: {
    title: "About Eve Whites",
    description: "Luxury bridal couture reimagined for the modern Pakistani bride",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image src="/images/products/rubys-touch-silhouette.jpg" alt="About Eve Whites" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest text-white text-center">ABOUT EVE WHITES</h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6">THE BRAND</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-pretty">
              Eve Whites aims to redefine bridal couture with a visionary approach, embracing unconventional and
              futuristic aesthetics. Rooted in the elegance of classic silhouettes and inspired by the avant-garde
              spirit of tomorrow, our designs reflect a seamless harmony between enduring charm and modern
              sophistication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-4">INDIVIDUALITY & CONFIDENCE</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe that every bride deserves to express her individuality and confidence on her special day, a
                moment made even more meaningful by celebrating the love of self-expression. Fusing global inspirations
                and honoring the dignity of cultural decency, the brand crafts pieces that speak to both modernity and
                modesty.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Empowering every wearer to feel poised, powerful, and beautifully seen—each gown is designed to tell
                your unique story.
              </p>
            </div>
            <div className="relative h-80">
              <Image
                src="/images/products/rubys-touch-detail.jpg"
                alt="Eve Whites Craftsmanship"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 relative h-80">
              <Image
                src="/images/products/etoile-satinee-detail.jpg"
                alt="Eve Whites Design Philosophy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-light tracking-wide mb-4">SOULFUL STYLE & GRACEFUL MAGNIFICENCE</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our philosophy is founded on the principles of soulful style and graceful magnificence, anchored in the
                belief that the celestial allure of each silhouette conveys a story worth remembering.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We craft each piece for the bride who seeks more than beauty—one who desires meaning, presence and the
                intention to shine in her unique light. Every gown tells a story of individual strength, cultural pride,
                and the beautiful fusion of tradition with contemporary vision.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-gray-200 my-12">
            <div className="text-center">
              <h3 className="text-4xl font-light tracking-widest mb-2">100%</h3>
              <p className="text-gray-600 text-sm tracking-wide">HANDCRAFTED COUTURE</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-light tracking-widest mb-2">BESPOKE</h3>
              <p className="text-gray-600 text-sm tracking-wide">CUSTOMIZATION</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-light tracking-widest mb-2">LUXURY</h3>
              <p className="text-gray-600 text-sm tracking-wide">PREMIUM FABRICS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6">WHY EVE WHITES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-light text-xl">✨</span>
              </div>
              <h3 className="font-medium mb-3 tracking-wide">AVANT-GARDE DESIGN</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Where unconventional aesthetics meet timeless elegance, creating gowns that stand out and stand the test
                of time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-light text-xl">🇵🇰</span>
              </div>
              <h3 className="font-medium mb-3 tracking-wide">CULTURAL DIGNITY</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Celebrating Pakistani heritage while embracing global inspirations—modesty with modern sophistication.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-light text-xl">💎</span>
              </div>
              <h3 className="font-medium mb-3 tracking-wide">PREMIUM CRAFTSMANSHIP</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Handcrafted with meticulous attention to detail using only the finest fabrics and embellishments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide">Ready to Shine?</h2>
          <p className="text-gray-600 text-lg">Explore our collections and find the gown that speaks to your soul</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-block btn-primary px-8 py-3 text-center rounded-lg hover:bg-black transition-colors"
            >
              Explore Collections
            </a>
            <a
              href="/contact"
              className="inline-block btn-secondary px-8 py-3 text-center rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
