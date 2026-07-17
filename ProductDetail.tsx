import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ProductInfo {
  id: number;
  name: string;
  price: string;
  image: string;
  boxedImage?: string;
  scent: string;
  infoCard: string;
  description: string;
  ingredients: string[];
  benefits: string[];
}

const productDatabase: Record<number, ProductInfo> = {
  1: {
    id: 1,
    name: "Honey Oats",
    price: "$12.99",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/FfGjTnFJKSCwktWi.jpeg",
    scent: "Warm Honey & Oats",
    infoCard: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/MMyqUeROWhRePgpx.jpeg",
    description: "A luxurious blend of soothing oats and golden honey, perfect for sensitive skin.",
    ingredients: ["Goats Milk", "Vegetable Glycerin", "Honey", "Oats", "Vitamin E Oil", "Salicylic Acid", "Kojic Acid", "Lemon Extract", "Aloe Vera"],
    benefits: ["Gentle exfoliation", "Moisturizing", "Soothing", "Anti-inflammatory"],
  },
  2: {
    id: 2,
    name: "Citrus Sunrise",
    price: "$12.99",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/adtrsKwTvjqdSysK.jpeg",
    scent: "Citrus & Orange",
    infoCard: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/aPhvMlmtZHyelYqb.jpeg",
    description: "Energizing citrus blend with turmeric for a brightening morning ritual.",
    ingredients: ["Goats Milk", "Vegetable Glycerin", "Turmeric", "Honey", "Oats", "Vitamin E Oil", "Salicylic Acid", "Hyaluronic Acid", "Lemon Extract", "Aloe Vera"],
    benefits: ["Brightening", "Energizing", "Antioxidant", "Moisturizing"],
  },
  3: {
    id: 3,
    name: "Rose Petal",
    price: "$12.99",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/LmKYMSYNQdLqdSYp.jpeg",
    boxedImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/KVhcvkkaTOwmvCFk.jpeg",
    scent: "Floral Rose",
    infoCard: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/MMyqUeROWhRePgpx.jpeg",
    description: "Romantic rose petals combined with luxurious moisturizing ingredients.",
    ingredients: ["Rose Petals", "Goats Milk", "Vegetable Glycerin", "Rose Oil", "Vitamin E Oil", "Aloe Vera", "Hyaluronic Acid"],
    benefits: ["Hydrating", "Romantic", "Soothing", "Anti-aging"],
  },
  4: {
    id: 4,
    name: "Lavender Dream",
    price: "$12.99",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/YMkcGMYtqyyEFwIv.jpeg",
    boxedImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/ZJQnhkxwNyBbAtQX.jpeg",
    scent: "Calming Lavender",
    infoCard: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/MMyqUeROWhRePgpx.jpeg",
    description: "Soothing lavender essential oil for a peaceful evening ritual.",
    ingredients: ["Lavender Oil", "Goats Milk", "Vegetable Glycerin", "Honey", "Vitamin E Oil", "Aloe Vera", "Chamomile Extract"],
    benefits: ["Calming", "Stress-relieving", "Sleep-promoting", "Skin-soothing"],
  },
  5: {
    id: 5,
    name: "Cocoa Bliss",
    price: "$12.99",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/rIwwZDKDMRRwyyQQ.jpeg",
    boxedImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/ZJQnhkxwNyBbAtQX.jpeg",
    scent: "Rich Cocoa",
    infoCard: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/MMyqUeROWhRePgpx.jpeg",
    description: "Indulgent cocoa with nourishing ingredients for silky smooth skin.",
    ingredients: ["Cocoa Butter", "Goats Milk", "Vegetable Glycerin", "Cocoa Powder", "Vitamin E Oil", "Aloe Vera", "Honey"],
    benefits: ["Nourishing", "Luxurious", "Moisturizing", "Antioxidant-rich"],
  },
};

export default function ProductDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const productId = parseInt(params?.id || "1");
  const product = productDatabase[productId];
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => setLocation("/")} className="bg-purple-600 hover:bg-purple-700">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:text-purple-400">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold">Seven Sixth SKIN</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.boxedImage && (
              <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
                <img src={product.boxedImage} alt={`${product.name} Boxed`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-black">{product.name}</h1>
              <p className="text-purple-600 text-lg mb-4">{product.scent}</p>
              <p className="text-3xl font-bold text-black mb-6">{product.price}</p>

              <p className="text-gray-700 text-lg mb-8">{product.description}</p>

              {/* Benefits */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black">Key Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <span className="text-purple-600 font-bold">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100">
                    +
                  </button>
                </div>
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-6"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-black">Ingredients</h2>
            <ul className="space-y-2">
              {product.ingredients.map((ingredient, idx) => (
                <li key={idx} className="text-gray-700 flex items-center gap-2">
                  <span className="text-purple-600">•</span> {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Info Card */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img src={product.infoCard} alt="Product Info" className="w-full h-auto" />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold mb-8 text-black">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(productDatabase)
              .filter((p) => p.id !== productId)
              .slice(0, 3)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => setLocation(`/product/${relatedProduct.id}`)}
                  className="cursor-pointer group"
                >
                  <div className="bg-gray-100 rounded-lg overflow-hidden h-64 mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-black">{relatedProduct.name}</h3>
                  <p className="text-purple-600 mb-2">{relatedProduct.scent}</p>
                  <p className="text-xl font-bold text-black">{relatedProduct.price}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-gray-400">
                Seven Sixth SKIN brings you handcrafted luxury soaps made with love and natural ingredients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setLocation("/")} className="hover:text-purple-400 transition">
                    Shop
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <a
                href="https://www.instagram.com/sevvyserene"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition"
              >
                Instagram @sevvyserene
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Seven Sixth SKIN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
