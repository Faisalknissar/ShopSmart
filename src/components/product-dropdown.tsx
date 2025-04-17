"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Package, Watch, Sparkles, Shirt } from "lucide-react";

export default function ProductDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      name: "Electronics",
      icon: <Package className="h-5 w-5" />,
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      name: "Watches",
      icon: <Watch className="h-5 w-5" />,
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      name: "Jewelry",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      name: "Clothing",
      icon: <Shirt className="h-5 w-5" />,
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="relative">
      <button
        className={`flex items-center text-sm font-medium px-3 py-2 rounded-md ${isOpen ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        PRODUCTS
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="fixed left-0 right-0 mt-1 w-full bg-white shadow-lg z-50 border-t border-gray-200"
          style={{ top: "60px" }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`${category.color} ${category.iconColor} p-3 rounded-full mr-4`}
                  >
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
