import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const productDatabase: Record<number, { name: string; price: number; image: string }> = {
  1: {
    name: "Honey Oats",
    price: 12.99,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/FfGjTnFJKSCwktWi.jpeg",
  },
  2: {
    name: "Citrus Sunrise",
    price: 12.99,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/adtrsKwTvjqdSysK.jpeg",
  },
  3: {
    name: "Rose Petal",
    price: 12.99,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/LmKYMSYNQdLqdSYp.jpeg",
  },
  4: {
    name: "Lavender Dream",
    price: 12.99,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/YMkcGMYtqyyEFwIv.jpeg",
  },
  5: {
    name: "Cocoa Bliss",
    price: 12.99,
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663519119903/rIwwZDKDMRRwyyQQ.jpeg",
  },
};

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Honey Oats",
      price: 12.99,
      quantity: 2,
      image: productDatabase[1].image,
    },
    {
      id: 3,
      name: "Rose Petal",
      price: 12.99,
      quantity: 1,
      image: productDatabase[3].image,
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:text-purple-400">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold mb-4 text-black">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Button onClick={() => setLocation("/")} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 text-black">Items ({cartItems.length})</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-black">{item.name}</h3>
                      <p className="text-purple-600 font-semibold">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border border-gray-300 rounded">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-4 text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-black">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && <p className="text-sm text-green-600">Free shipping on orders over $50!</p>}
                </div>
                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-black">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={() => setLocation("/checkout")}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={() => setLocation("/")}
                  variant="outline"
                  className="w-full mt-3 py-3 text-lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
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
