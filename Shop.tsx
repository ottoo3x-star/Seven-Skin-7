import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Pink Serenity Bar Soap",
    description: "Softens skin, restores glow, and leaves a smooth radiant finish. Perfect for sensitive and dry skin types.",
    emotionalHook: "Radiant Skin Therapy",
    benefit: "Skin Softness & Glow",
    benefits: ["Softens & smooths skin", "Enhances natural glow", "Calms and refreshes"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/rose-petal-combo_a907211d.jpeg",
    stripeLink: "https://buy.stripe.com/3cI00i2IV1hucnjbmW0Fi01",
    price: "$10.99",
    featured: false,
  },
  {
    id: 3,
    name: "Turmeric & Pink Honey Glow Bar Bundle Pack",
    description: "Get both bestselling soaps in one luxurious bundle. Includes Pink Serenity Bar Soap and Turmeric & Honey Glow Bar Soap. Save when you bundle!",
    emotionalHook: "The Ultimate Glow Ritual",
    benefit: "Best Value Bundle",
    benefits: ["Includes both bestsellers", "Complete skincare ritual", "Premium value"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_3699_744a0eed.jpg",
    stripeLink: "https://buy.stripe.com/bJe7sK6Zb2ly72Z9eO0Fi0a",
    price: "$21",
    featured: true,
  },
  {
    id: 2,
    name: "Turmeric & Honey Glow Bar Soap",
    description: "Brightens skin tone, fades dark spots, and deeply hydrates. A powerful blend designed for clarity and glow.",
    emotionalHook: "Clarity & Brightness Ritual",
    benefit: "Skin Clarity & Hydration",
    benefits: ["Brightens uneven skin tone", "Helps reduce dark spots", "Deeply hydrates"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/honey-oat-boxed_97bf5b69.jpeg",
    stripeLink: "https://buy.stripe.com/28E4gy4R3gco1IF9eO0Fi02",
    price: "$10.99",
    featured: false,
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F5] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F8D7DA] to-[#FFF8F5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-[#1A1A1A]">
              Shop Our Collection
            </h1>
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <p className="text-lg text-[#1A1A1A] opacity-80 font-inter">
            Handcrafted soaps designed to brighten, soften, and restore your natural glow
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                product.featured ? "md:col-span-1 md:row-span-2 ring-2 ring-[#D4AF37]" : ""
              }`}
            >
              {/* Product Image */}
              <div className="relative h-80 sm:h-96 overflow-hidden bg-[#FFF8F5]">
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                    Best Value
                  </div>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    product.featured ? "h-full" : ""
                  }`}
                />
              </div>

              {/* Product Info */}
              <div className="p-6 sm:p-8">
                <div className="mb-3">
                  <span className="inline-block text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-2">
                    {product.emotionalHook}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-[#1A1A1A]">
                    {product.name}
                  </h2>
                </div>

                <div className="mb-4 inline-block bg-[#FFF8F5] px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-[#7C3AED]">{product.benefit}</span>
                </div>

                <p className="text-[#1A1A1A] opacity-75 font-inter mb-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Benefits */}
                <div className="mb-6 space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                      <span className="text-sm text-[#1A1A1A] opacity-80 font-inter">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-6 border-t border-[#F8D7DA]">
                  <span className="text-2xl font-playfair font-bold text-[#D4AF37]">
                    {product.price}
                  </span>
                  <a
                    href={product.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-inter font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Buy Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Builders */}
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">🔒</div>
              <h4 className="text-lg font-playfair font-bold text-[#1A1A1A] mb-1">Secure Checkout</h4>
              <p className="text-sm text-[#1A1A1A] opacity-70 font-inter">Powered by Stripe for safe, encrypted transactions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">⚡</div>
              <h4 className="text-lg font-playfair font-bold text-[#1A1A1A] mb-1">Fast Processing</h4>
              <p className="text-sm text-[#1A1A1A] opacity-70 font-inter">Ships within 3–5 business days</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">🧼</div>
              <h4 className="text-lg font-playfair font-bold text-[#1A1A1A] mb-1">Handcrafted</h4>
              <p className="text-sm text-[#1A1A1A] opacity-70 font-inter">Made with natural ingredients & care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#F8D7DA] to-[#FFF8F5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#1A1A1A] mb-4">
            A Little Glow Goes A Long Way ✨
          </h3>
          <p className="text-lg text-[#1A1A1A] opacity-80 font-inter mb-6">
            Use code <span className="font-bold text-[#D4AF37]">SERENE</span> at checkout for 5% off your order
          </p>
          <p className="text-sm text-[#1A1A1A] opacity-70 font-inter">
            Free shipping on orders over $50 • 30-day satisfaction guarantee
          </p>
        </div>
      </div>
    </div>
  );
}
