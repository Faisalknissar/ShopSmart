"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../../supabase/client";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Simulate fetching cart items from local storage
  useEffect(() => {
    // In a real implementation, you would fetch this from your database or local storage
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        quantity: 1,
      },
      {
        id: 3,
        name: "Men's T-Shirt",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        quantity: 2,
      },
    ];

    setCartItems(mockCartItems);
    setLoading(false);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row items-center gap-4"
                    >
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="text-lg font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow overflow-hidden sticky top-4">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full mt-6 inline-flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2" size={16} />
                  </Link>

                  <Link
                    href="/products"
                    className="w-full mt-2 inline-flex items-center justify-center px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
