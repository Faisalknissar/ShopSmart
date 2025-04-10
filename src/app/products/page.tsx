import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

export default async function ProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
      name: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
    },
    {
      id: 4,
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80",
    },
    {
      id: 5,
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80",
    },
    {
      id: 6,
      name: "Toys & Games",
      image:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80",
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
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    },
    {
      id: 3,
      name: "Men's T-Shirt",
      price: 29.99,
      category: "Clothing",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    },
    {
      id: 4,
      name: "Women's Dress",
      price: 49.99,
      category: "Clothing",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 79.99,
      category: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1570486733338-115a0f9fd981?w=500&q=80",
    },
    {
      id: 6,
      name: "Blender",
      price: 39.99,
      category: "Home & Kitchen",
      image:
        "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&q=80",
    },
    {
      id: 7,
      name: "Fiction Novel",
      price: 14.99,
      category: "Books",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    },
    {
      id: 8,
      name: "Cookbook",
      price: 24.99,
      category: "Books",
      image:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products</h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
