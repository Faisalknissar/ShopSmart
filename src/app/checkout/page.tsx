"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  // Form states
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        setEmail(user.email || "");
        setStep(2); // Skip to shipping if already logged in
      }
    };

    checkUser();
  }, [supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would verify the user's credentials
    // For now, we'll just simulate a successful login
    setIsLoggedIn(true);
    setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would process the payment
    // For now, we'll just simulate a successful payment
    router.push("/success");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Checkout Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <div
              className={`w-16 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <div
              className={`w-16 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          {/* Step 1: Authentication */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Sign In or Continue as Guest
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue to Shipping
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Shipping Information */}
          {step === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-between pt-4">
                  {!user && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">
                    Select Payment Method
                  </label>

                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="mr-2"
                      />
                      <span>UPI Payment</span>
                    </label>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={() => setPaymentMethod("netbanking")}
                        className="mr-2"
                      />
                      <span>Net Banking</span>
                    </label>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="mr-2"
                      />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "upi" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        placeholder="username@upi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Select Bank
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select a bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={!paymentMethod}
                    className={`px-6 py-3 text-white rounded-lg transition-colors ${paymentMethod ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    Complete Order
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
