import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Star, X, Instagram, Mail, Sparkles, Leaf, Droplets, ShieldOff } from "lucide-react";

interface Product {
  id: number;
  name: string;
  tagline: string;
  description: string;
  price: string;
  comboImage: string;
  bareImage: string;
  ingredients: string;
  directions: string;
  notice: string;
  benefits: string[];
  skinType: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Turmeric & Honey Glow Bar Soap",
    tagline: "Indulge Your Skin in Clarity & Glow",
    description: "A powerful blend of turmeric and honey designed to brighten your skin, reduce dark spots, and lock in moisture for a healthy glow.",
    price: "$10.99",
    comboImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/honey-oat-boxed_97bf5b69.jpeg",
    bareImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/honey-oat-bare_eddf2d93.jpeg",
    ingredients: "Goats Milk, Vegetable Glycerin, Turmeric, Honey, Oats, Vitamin E Oil, Salicylic Acid, Hyaluronic Acid, Lemon Extract, Aloe Vera",
    directions: "Wash your face with warm water and use as facial cleanser for up to 5 minutes. Rinse face and pat it dry with a soft towel. Apply a serum, toner, eye cream, and moisturizer for a complete routine.",
    notice: "Use the soap 2-3 times a week to ensure your skin journey.",
    benefits: ["Brightens uneven skin tone", "Helps reduce dark spots", "Deeply hydrates skin", "Leaves skin soft and smooth"],
    skinType: "All skin types (especially dull or uneven skin)",
  },
  {
    id: 3,
    name: "Pink Serenity Glow Bar Soap",
    tagline: "Indulge Your Skin in Clarity & Glow",
    description: "A gentle, calming soap that restores softness and enhances your natural glow while keeping your skin smooth and refreshed.",
    price: "$10.99",
    comboImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/rose-petal-combo_a907211d.jpeg",
    bareImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/rose-petal-bare_5483b7ba.jpeg",
    ingredients: "Goats Milk, Vegetable Glycerin, Honey, Oats, Vitamin E Oil, Salicylic Acid, Kojic Acid, Lemon Extract, Aloe Vera",
    directions: "Wash your face with warm water and use as facial cleanser for up to 5 minutes. Rinse face and pat it dry with a soft towel. Apply a serum, toner, eye cream, and moisturizer for a complete routine.",
    notice: "Use the soap 2-3 times a week to ensure your skin journey.",
    benefits: ["Softens and smooths skin", "Enhances natural glow", "Calms and refreshes skin", "Lightweight hydration"],
    skinType: "Sensitive / Dry / Normal skin",
  },
  {
    id: 4,
    name: "Turmeric & Pink Honey Glow Bar Bundle Pack",
    tagline: "Indulge Your Skin in Clarity & Glow",
    description: "Get both bestselling soaps in one luxurious bundle. Includes Pink Serenity Bar Soap and Turmeric & Honey Glow Bar Soap. Save when you bundle!",
    price: "$21",
    comboImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_3699_744a0eed.jpg",
    bareImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_3699_744a0eed.jpg",
    ingredients: "Goats Milk, Vegetable Glycerin, Turmeric, Honey, Oats, Vitamin E Oil, Salicylic Acid, Hyaluronic Acid, Lemon Extract, Aloe Vera, Kojic Acid",
    directions: "Use both soaps as part of your complete skincare ritual. Wash your face with warm water and use as facial cleanser for up to 5 minutes. Rinse face and pat it dry with a soft towel. Apply a serum, toner, eye cream, and moisturizer for a complete routine.",
    notice: "Use the soaps 2-3 times a week to ensure your skin journey.",
    benefits: ["Includes both bestsellers", "Complete skincare ritual", "Premium value", "Brightens & softens skin"],
    skinType: "All skin types",
  },
];

const testimonials = [
  { quote: "My skin feels so soft and clear.", name: "Aaliyah M.", stars: 5 },
  { quote: "The glow is actually noticeable.", name: "Jasmine T.", stars: 5 },
  { quote: "I finally found something that works.", name: "Brianna K.", stars: 5 },
];

const benefits = [
  { icon: <Leaf className="w-6 h-6" />, text: "Made with natural ingredients" },
  { icon: <Sparkles className="w-6 h-6" />, text: "Glow-enhancing formulas" },
  { icon: <Droplets className="w-6 h-6" />, text: "Deep hydration for soft skin" },
  { icon: <ShieldOff className="w-6 h-6" />, text: "No harsh chemicals" },
];

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSMSPopup, setShowSMSPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsSubmitted, setSmsSubmitted] = useState(false);
  const [smsCount, setSmsCount] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const handleSMSSubmit = () => {
    if (phoneNumber.trim()) {
      const newCount = smsCount + 1;
      setSmsCount(newCount);
      setSmsSubmitted(true);
      setPhoneNumber("");
    }
  };

  const handleEmailSubmit = () => {
    if (email.trim()) {
      setEmailSubmitted(true);
      setEmail("");
    }
  };

  // Gold accent color
  const gold = "#D4AF37";
  const headlineFont = "'Playfair Display', Georgia, serif";
  const bodyFont = "'Inter', system-ui, sans-serif";
  const cursiveFont = "'Dancing Script', cursive";
  const brandFont = "'Cormorant Garamond', 'Garamond', serif";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFF8F5", fontFamily: bodyFont, color: "#1A1A1A" }}>

      {/* SMS Raffle Popup */}
      {showSMSPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative">
            <button
              onClick={() => { setShowSMSPopup(false); setSmsSubmitted(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
            {!smsSubmitted ? (
              <div>
                <div className="text-4xl mb-3 text-center">🎟️</div>
                <h2 className="text-2xl font-bold mb-2 text-black text-center" style={{ fontFamily: headlineFont }}>Enter the Raffle!</h2>
                <p className="text-gray-600 mb-6 text-center text-sm" style={{ fontFamily: bodyFont }}>
                  Sign up for SMS updates and automatically enter our mystery gift raffle! One lucky winner will be selected to receive an exclusive prize.
                </p>
                <label className="block text-sm font-semibold text-black mb-2">Your Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <p className="text-xs text-gray-400 mb-4 text-center">
                  Message & data rates may apply. Reply STOP to unsubscribe.
                </p>
                <Button
                  onClick={handleSMSSubmit}
                  className="w-full text-white py-3 font-semibold rounded-full"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  Enter Raffle ✨
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4">🎟️</div>
                <h2 className="text-2xl font-bold mb-3 text-black" style={{ fontFamily: headlineFont }}>You're In!</h2>
                <p className="text-lg font-semibold mb-3" style={{ color: "#7C3AED" }}>Your raffle entry has been submitted!</p>
                <p className="text-gray-600 mb-2 text-sm">
                  You've been entered into our mystery gift raffle. We'll notify the winner via SMS — good luck! 🍀
                </p>
                <p className="text-gray-400 mb-6 text-xs">
                  Entry #{smsCount} recorded. Stay tuned for the announcement.
                </p>
                <Button
                  onClick={() => { setShowSMSPopup(false); setSmsSubmitted(false); }}
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative my-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <img src={selectedProduct.comboImage} alt={`${selectedProduct.name} boxed`} className="w-full rounded-xl object-cover h-56 shadow" />
                <img src={selectedProduct.bareImage} alt={`${selectedProduct.name} bare`} className="w-full rounded-xl object-cover h-56 shadow" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black mb-1" style={{ fontFamily: headlineFont }}>{selectedProduct.name}</h2>
                <p className="text-sm mb-2" style={{ fontFamily: cursiveFont, fontSize: "1rem", color: "#7C3AED" }}>{selectedProduct.tagline}</p>
                <p className="text-2xl font-bold text-black mb-3">{selectedProduct.price}</p>
                <p className="text-gray-600 text-sm mb-4" style={{ fontFamily: bodyFont }}>{selectedProduct.description}</p>

                <div className="mb-4">
                  <h3 className="font-bold text-black mb-2 uppercase text-xs tracking-widest">Benefits</h3>
                  <ul className="space-y-1">
                    {selectedProduct.benefits.map((b, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                        <span style={{ color: gold }}>✦</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-black mb-1 uppercase text-xs tracking-widest">Skin Type</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.skinType}</p>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-black mb-1 uppercase text-xs tracking-widest">Ingredients</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.ingredients}</p>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-black mb-1 uppercase text-xs tracking-widest">Directions</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.directions}</p>
                </div>

                <div className="mb-6 bg-pink-50 rounded-lg p-3">
                  <h3 className="font-bold text-black mb-1 uppercase text-xs tracking-widest">Notice</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.notice}</p>
                </div>

                <a
                  href={selectedProduct.id === 1 ? "https://buy.stripe.com/28E4gy4R3gco1IF9eO0Fi02" : "https://buy.stripe.com/3cI00i2IV1hucnjbmW0Fi01"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                >
                  <Button
                    className="w-full text-white py-3 rounded-full font-semibold shadow-lg"
                    style={{ backgroundColor: "#7C3AED" }}
                  >
                    Buy Now — {selectedProduct.price}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-pink-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-bold tracking-widest text-black" style={{ fontFamily: brandFont, fontSize: "1.1rem" }}>
            Seven Sixth SKIN
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ fontFamily: bodyFont }}>
            <button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-600 transition">Shop</button>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-600 transition">About</button>
            <button onClick={() => setShowSMSPopup(true)} className="hover:text-purple-600 transition">Contact</button>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:text-purple-600 transition">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{wishlist.length}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center overflow-hidden" style={{ minHeight: "560px" }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/hero-bg_f6752f55.jpeg"
          alt="Seven Sixth Skin soaps"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(80,20,100,0.5) 50%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="relative z-10 text-white px-4 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] mb-3 text-pink-200" style={{ fontFamily: bodyFont }}>Seven Sixth Skin</p>
          <h1
            className="font-bold mb-2 leading-tight"
            style={{
              fontFamily: brandFont,
              textShadow: "0 0 30px rgba(168, 85, 247, 0.9), 0 0 60px rgba(168, 85, 247, 0.5)",
            }}
          >
            <span className="block" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", letterSpacing: "0.12em" }}>Radiance, Redefined</span>
          </h1>
          <h2 className="font-semibold mb-3 text-white" style={{ fontFamily: headlineFont, fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
            🌸 Clear Skin. Soft Glow. Real Results. 🌸
          </h2>
          <p
            className="mb-2 text-gray-200"
            style={{ fontFamily: cursiveFont, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            Indulge Your Skin in Clarity & Glow
          </p>
          <p className="text-gray-300 mb-6 text-sm" style={{ fontFamily: bodyFont }}>
            Handcrafted soaps designed to brighten, soften, and restore your natural glow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="text-white px-8 py-3 text-base font-semibold rounded-full shadow-lg"
              style={{ backgroundColor: "#7C3AED" }}
            >
              Shop Now
            </Button>
            <Button
              onClick={() => setShowSMSPopup(true)}
              className="px-8 py-3 text-base font-semibold rounded-full hover:opacity-90 text-white border-0"
              style={{ backgroundColor: "#E91E8C" }}
            >
              Unlock Your Glow Gift ✨
            </Button>
          </div>
          <p className="mt-4 text-pink-200 text-xs" style={{ fontFamily: bodyFont }}>
            Use code <span className="font-bold text-white bg-purple-600/60 px-2 py-0.5 rounded">SERENE</span> for 5% OFF
          </p>
        </div>
      </section>

      {/* Why Everyone Loves Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#FFF0F5" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: headlineFont }}>Why Everyone Loves Seven Sixth Skin</h2>
          <p className="text-gray-500 mb-10 text-sm" style={{ fontFamily: bodyFont }}>Real ingredients. Real results. Real glow.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center gap-3 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F8D7DA", color: "#7C3AED" }}>
                  {b.icon}
                </div>
                <p className="text-sm font-medium text-center text-gray-700" style={{ fontFamily: bodyFont }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="collection" className="py-16 px-4" style={{ backgroundColor: "#FFF8F5" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: headlineFont }}>🧴 Featured Products</h2>
            <p className="text-gray-500 text-sm" style={{ fontFamily: bodyFont }}>Handcrafted with love & natural ingredients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  product.id === 4 ? "ring-2 ring-[#D4AF37]" : ""
                }`}
              >
                <div className="relative overflow-hidden h-72">
                  {product.id === 4 && (
                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                      Best Value
                    </div>
                  )}
                  <img
                    src={product.bareImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:scale-110 transition"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-black mb-1" style={{ fontFamily: headlineFont }}>{product.name}</h3>
                  <p className="text-sm mb-2" style={{ fontFamily: cursiveFont, fontSize: "0.95rem", color: "#7C3AED" }}>{product.tagline}</p>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed" style={{ fontFamily: bodyFont }}>{product.description}</p>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-black">{product.price}</span>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedProduct(product)}
                        variant="outline"
                        className="rounded-full border-purple-300 text-purple-700 hover:bg-purple-50 text-sm px-4"
                        style={{ fontFamily: bodyFont }}
                      >
                        View Product
                      </Button>
                      <a
                        href={product.id === 1 ? "https://buy.stripe.com/28E4gy4R3gco1IF9eO0Fi02" : product.id === 3 ? "https://buy.stripe.com/3cI00i2IV1hucnjbmW0Fi01" : "https://buy.stripe.com/bJe7sK6Zb2ly72Z9eO0Fi0a"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          className="rounded-full text-white text-sm px-4"
                          style={{ backgroundColor: "#7C3AED" }}
                        >
                          Buy Now
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8D7DA" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: headlineFont }}>📸 Real Glow. Real Results.</h2>
          <p className="text-gray-600 mb-10 text-sm" style={{ fontFamily: bodyFont }}>What our customers are saying</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex gap-1 mb-3 justify-center">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 text-sm leading-relaxed" style={{ fontFamily: bodyFont }}>"{t.quote}"</p>
                <p className="font-semibold text-sm text-gray-800" style={{ fontFamily: headlineFont }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-14 px-4 text-center" style={{ background: "linear-gradient(135deg, #3B0764 0%, #7C3AED 50%, #3B0764 100%)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: headlineFont }}>A Little Glow Goes A Long Way ✨</h2>
          <p className="text-purple-200 mb-6 text-sm" style={{ fontFamily: bodyFont }}>
            Use code <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded">SERENE</span> at checkout and enjoy 5% off your order.
          </p>
          <Button
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-purple-700 font-bold px-10 py-3 rounded-full hover:bg-purple-50 shadow-lg"
            style={{ fontFamily: bodyFont }}
          >
            Shop Our Collection
          </Button>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="about" className="py-16 px-4" style={{ backgroundColor: "#FFF8F5" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "#7C3AED", fontFamily: bodyFont }}>Our Story</p>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: headlineFont }}>🧠 About SevvySerene</h2>
            <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: bodyFont }}>
              Seven Sixth Skin was created for everyone who wants to feel confident in their natural beauty. Every bar is crafted with ingredients that nourish your skin and enhance your glow — without harsh chemicals.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: bodyFont }}>
              Each soap is carefully formulated with natural ingredients to provide the ultimate self-care experience. Every bar is a labor of love, made to bring out your skin's best.
            </p>
            {/* Glow Results Photos — 4 images: 2 female portraits + 1 spa + 1 male before/after */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_1670_cbd3735f.jpeg"
                  alt="Glowing skin result"
                  className="w-full h-56 object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs font-medium text-center" style={{ fontFamily: bodyFont }}>✨ Glowing Results</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/RenderedImage_e7c0e62b.jpeg"
                  alt="Radiant skin"
                  className="w-full h-56 object-cover"
                  style={{ objectPosition: "center 10%" }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs font-medium text-center" style={{ fontFamily: bodyFont }}>✨ Radiant Glow</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_1665_586e38c0.jpeg"
                  alt="Skincare treatment results"
                  className="w-full h-48 object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs font-medium text-center" style={{ fontFamily: bodyFont }}>✨ Deep Cleanse</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_1664_f2ab619f.jpeg"
                  alt="Male before and after soap results"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs font-medium text-center" style={{ fontFamily: bodyFont }}>✨ Before & After</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg col-span-2">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_0860_53475617.jpeg"
                  alt="Natural glow skin showcase"
                  className="w-full h-80 object-cover"
                  style={{ objectPosition: "center 25%" }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="text-white text-xs font-medium text-center" style={{ fontFamily: bodyFont }}>✨ Natural Glow</p>
                </div>
              </div>
            </div>
            <a
              href="https://www.instagram.com/sevensixthskin?igsh=eHduZ21rMzdpcDAz&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg"
              style={{ backgroundColor: "#7C3AED", fontFamily: bodyFont }}
            >
              <Instagram className="w-4 h-4" />
              Follow @sevensixthskin
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/owner-portrait_f4b2a3c1.jpeg"
              alt="SevvySerene - Brand Owner"
              className="rounded-2xl shadow-xl object-cover w-80 h-96"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/hero-bg_f6752f55.jpeg";
              }}
            />
          </div>
        </div>
      </section>

      {/* How We Make Section */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F3E8FF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: headlineFont }}>How We Make Our Soaps</h2>
          <p className="text-gray-500 mb-10 text-sm" style={{ fontFamily: bodyFont }}>Small batch, handcrafted with care</p>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_1966_1af4a13c.jpeg"
                alt="Soap cutting process - slicing the bar"
                className="rounded-2xl shadow-lg object-cover w-full h-64"
              />
              <p className="mt-4 text-gray-600 text-sm leading-relaxed italic" style={{ fontFamily: bodyFont }}>
                Each soap is carefully formulated with natural ingredients to provide the ultimate self-care experience.
              </p>
            </div>
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663519119903/dz7PHGwqaLSExTb7GfraCp/IMG_1959_02f11e05.jpeg"
                alt="Soap making process - handcrafted bar"
                className="rounded-2xl shadow-lg object-cover w-full h-64"
              />
              <p className="mt-4 text-gray-600 text-sm leading-relaxed italic" style={{ fontFamily: bodyFont }}>
                Every bar is a labor of love, made to bring out your skin's best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "#FFF0F5" }}>
        <div className="max-w-xl mx-auto">
          <Mail className="w-10 h-10 mx-auto mb-4" style={{ color: "#7C3AED" }} />
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: headlineFont }}>📩 Join The Glow List</h2>
          <p className="text-gray-500 mb-6 text-sm" style={{ fontFamily: bodyFont }}>
            Be the first to know about new drops, skincare tips, and exclusive offers.
          </p>
          {!emailSubmitted ? (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-pink-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                style={{ fontFamily: bodyFont }}
              />
              <Button
                onClick={handleEmailSubmit}
                className="text-white px-6 py-3 rounded-full font-semibold"
                style={{ backgroundColor: "#7C3AED", fontFamily: bodyFont }}
              >
                Join Now ✨
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm max-w-md mx-auto">
              <div className="text-3xl mb-2">💌</div>
              <p className="font-semibold text-gray-800" style={{ fontFamily: headlineFont }}>You're on the list!</p>
              <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: bodyFont }}>Welcome to the Glow List. Watch your inbox for exclusive offers.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4" style={{ backgroundColor: "#1A1A1A", color: "#e5e7eb" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: brandFont, letterSpacing: "0.1em" }}>Seven Sixth SKIN</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed" style={{ fontFamily: bodyFont }}>
              Handcrafted soaps designed to brighten, soften, and restore your natural glow. Made with love and natural ingredients.
            </p>
            <a
              href="https://www.instagram.com/sevensixthskin?igsh=eHduZ21rMzdpcDAz&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition text-sm"
              style={{ fontFamily: bodyFont }}
            >
              <Instagram className="w-4 h-4" />
              @sevensixthskin
            </a>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3 text-white uppercase tracking-widest" style={{ fontFamily: bodyFont }}>Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400" style={{ fontFamily: bodyFont }}>
              {products.map((p) => (
                <li key={p.id}>
                  <button onClick={() => setSelectedProduct(p)} className="hover:text-purple-400 transition text-left">{p.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-3 text-white uppercase tracking-widest" style={{ fontFamily: bodyFont }}>Connect</h3>
            <ul className="space-y-2 text-sm text-gray-400" style={{ fontFamily: bodyFont }}>
              <li><button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-purple-400 transition">About Us</button></li>
              <li><button onClick={() => setShowSMSPopup(true)} className="hover:text-purple-400 transition">Contact / SMS Raffle</button></li>

            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs" style={{ fontFamily: bodyFont }}>
          <p>© 2025 Seven Sixth Skin. All rights reserved.</p>
          <p className="mt-1">Use code <span className="font-bold text-purple-400">SERENE</span> for 5% off your order.</p>
        </div>
      </footer>
    </div>
  );
}
