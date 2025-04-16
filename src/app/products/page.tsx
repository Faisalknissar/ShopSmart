"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  // Set the category from URL parameters when the component mounts
  useEffect(() => {
    if (categoryParam) {
      // Find the matching category name with proper casing
      const matchedCategory = categories.find(
        (category) =>
          category.name.toLowerCase() === categoryParam.toLowerCase(),
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.name);
      }
    }
  }, [categoryParam]);

  // This is a placeholder for actual product data
  // In a real implementation, you would fetch this from your database
  const categories = [
    {
      id: 1,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80",
    },
    {
      id: 2,
      name: "Clothing",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
    },
    {
      id: 3,
      name: "Watches",
      image:
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&q=80",
    },
    {
      id: 4,
      name: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
    },
    {
      id: 5,
      name: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
    },
    {
      id: 6,
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      description:
        "Premium wireless headphones with noise cancellation technology.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      description: "Advanced smartwatch with health monitoring features.",
    },
    {
      id: 3,
      name: "Men's T-Shirt",
      price: 29.99,
      category: "Clothing",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
      description: "Comfortable cotton t-shirt for everyday wear.",
    },
    {
      id: 4,
      name: "Women's Dress",
      price: 49.99,
      category: "Clothing",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
      description:
        "Elegant dress perfect for casual and semi-formal occasions.",
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 79.99,
      category: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1570486733338-115a0f9fd981?w=500&q=80",
      description: "Programmable coffee maker with multiple brewing options.",
    },
    {
      id: 6,
      name: "Luxury Watch",
      price: 299.99,
      category: "Watches",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
      description:
        "Elegant timepiece with premium materials and craftsmanship.",
    },
    {
      id: 7,
      name: "Diamond Necklace",
      price: 499.99,
      category: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
      description: "Stunning diamond necklace perfect for special occasions.",
    },
    {
      id: 8,
      name: "Gold Earrings",
      price: 199.99,
      category: "Jewelry",
      image:
        "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
      description: "Elegant gold earrings with a timeless design.",
    },
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">
            {selectedCategory ? selectedCategory : "All Products"}
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded md:hidden ${showFilters ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                aria-label="Show filters"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Always visible on desktop, toggleable on mobile */}
          <div
            className={`${showFilters ? "block" : "hidden"} md:block md:w-1/4 lg:w-1/5`}
          >
            <div className="bg-white rounded-lg shadow p-4 sticky top-20">
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> Categories
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                      className="mr-2"
                    />
                    <label htmlFor="all-categories">All Categories</label>
                  </div>
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={selectedCategory === category.name}
                        onChange={() => setSelectedCategory(category.name)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.id}`}>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button className="mt-2 w-full py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  Apply
                </button>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Customer Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        className="mr-2"
                      />
                      <label htmlFor={`rating-${rating}`}>
                        {rating} Stars & Above
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Categories Section - Only show on mobile when filters are hidden */}
            <section className="mb-8 md:hidden">
              <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
                <button
                  className={`whitespace-nowrap px-4 py-2 rounded-full ${selectedCategory === "" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedCategory("")}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`whitespace-nowrap px-4 py-2 rounded-full ${selectedCategory === category.name ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Products Section */}
            <section>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-500">
                    No products found. Try a different search or category.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-500 mb-1">
                          {product.category}
                        </div>
                        <h3 className="font-medium mb-2">{product.name}</h3>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add to cart functionality would go here
                              alert(`Added ${product.name} to cart`);
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 h-48 sm:h-auto">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 sm:w-3/4 flex flex-col justify-between">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              {product.category}
                            </div>
                            <h3 className="font-medium text-lg mb-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {product.description}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">
                              ${product.price.toFixed(2)}
                            </span>
                            <button
                              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add to cart functionality would go here
                                alert(`Added ${product.name} to cart`);
                              }}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
