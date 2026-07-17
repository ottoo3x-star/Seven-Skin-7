import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyPromo = () => {
    setPromoError("");
    if (promoCode.toUpperCase() === "SERENE") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const handleSubmitOrder = () => {
    setStep(3);
  };

  const subtotal = 25.98;
  const discount = promoApplied ? subtotal * 0.05 : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = subtotalAfterDiscount * 0.1;
  const shipping = 0;
  const total = subtotalAfterDiscount + tax + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => setLocation("/cart")} className="flex items-center gap-2 hover:text-purple-400">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold">Checkout</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 py-12">
        {step === 3 ? (
          // Order Confirmation
          <div className="max-w-2xl mx-auto text-center py-16">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4 text-black">Order Confirmed!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-gray-50 rounded-lg p-8 mb-8 text-left">
              <h3 className="text-xl font-bold mb-4 text-black">Order Details</h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Order Number:</span>
                  <span className="font-semibold text-black">#SS2026-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Email:</span>
                  <span className="font-semibold text-black">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Estimated Delivery:</span>
                  <span className="font-semibold text-black">5-7 business days</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Code Applied:</span>
                    <span className="font-semibold">SERENE (5% OFF)</span>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-lg font-bold text-black">
                  <span>Total Amount:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="flex gap-4 mb-12">
                <div className={`flex-1 pb-4 border-b-2 ${step >= 1 ? "border-purple-600" : "border-gray-300"}`}>
                  <h3 className={`font-bold ${step >= 1 ? "text-black" : "text-gray-400"}`}>1. Shipping</h3>
                </div>
                <div className={`flex-1 pb-4 border-b-2 ${step >= 2 ? "border-purple-600" : "border-gray-300"}`}>
                  <h3 className={`font-bold ${step >= 2 ? "text-black" : "text-gray-400"}`}>2. Payment</h3>
                </div>
              </div>

              {/* Shipping Form */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-black">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                      />
                    </div>
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP Code"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mt-8"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {/* Payment Form */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-black">Payment Information</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                    />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 py-3"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmitOrder}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3"
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-black">Order Summary</h3>
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Honey Oats × 2</span>
                    <span className="text-black font-semibold">$25.98</span>
                  </div>
                </div>

                {/* Promo Code Section */}
                <div className="mb-6 pb-6 border-b border-gray-300">
                  <h4 className="text-sm font-bold mb-3 text-black">Promo Code</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-600"
                    />
                    <Button
                      onClick={handleApplyPromo}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoError && <p className="text-red-600 text-xs mt-2">{promoError}</p>}
                  {promoApplied && <p className="text-green-600 text-xs mt-2">SERENE code applied! 5% off</p>}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Discount (5%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal After Discount</span>
                    <span>${subtotalAfterDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-lg font-bold text-black">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
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
                  <button className="hover:text-purple-400 transition">About</button>
                </li>
                <li>
                  <button className="hover:text-purple-400 transition">Contact</button>
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
