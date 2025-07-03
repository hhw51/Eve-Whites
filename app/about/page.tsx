import Image from "next/image"

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
            <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6">OUR STORY</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Eve Whites was born from a passion for creating extraordinary moments through exceptional design. We
              believe that every woman deserves to feel radiant, confident, and utterly beautiful on her most special
              days.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-light tracking-wide mb-4">CRAFTSMANSHIP</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Each gown in our collection is a testament to meticulous craftsmanship and attention to detail. From the
                delicate lace appliqués to the flowing silhouettes, every element is thoughtfully designed and expertly
                executed.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our artisans work with the finest fabrics and materials, ensuring that each piece not only looks
                stunning but feels luxurious against the skin.
              </p>
            </div>
            <div className="relative h-80">
              <Image
                src="/images/products/rubys-touch-detail.jpg"
                alt="Our Craftsmanship"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-80">
              <Image
                src="/images/products/etoile-satinee-detail.jpg"
                alt="Our Design Philosophy"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-light tracking-wide mb-4">DESIGN PHILOSOPHY</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We believe in the power of elegance and the beauty of femininity. Our designs celebrate the unique grace
                of every woman, creating pieces that enhance natural beauty rather than overshadow it.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Each collection tells a story of romance, sophistication, and timeless appeal, ensuring that our gowns
                remain as beautiful in memories as they are in the moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-widest mb-6">OUR VALUES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-light text-xl">E</span>
              </div>
              <h3 className="font-medium mb-3 tracking-wide">ELEGANCE</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We believe true elegance is timeless. Our designs embody sophistication that transcends trends and
                seasons.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-light text-xl">Q</span>
              </div>
              <h3 className="font-medium mb-3 tracking-wide">QUALITY</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every stitch, every bead, every detail is crafted with precision and care, ensuring exceptional quality
                in every piece.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-light text-xl">L</span>
              </div>
              <h3 className="font-medium mb-3 tracking-wide">LUXURY</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We create experiences of luxury through exceptional design, premium materials, and personalized service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
