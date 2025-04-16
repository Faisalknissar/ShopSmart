"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Edit,
  Trash2,
  Package,
  LayoutGrid,
  BarChart3,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for products and categories
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      stock: 45,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      category: "Electronics",
      stock: 32,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    },
    {
      id: 3,
      name: "Men's T-Shirt",
      price: 29.99,
      category: "Clothing",
      stock: 78,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    },
    {
      id: 4,
      name: "Women's Dress",
      price: 49.99,
      category: "Clothing",
      stock: 54,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
    },
    {
      id: 5,
      name: "Coffee Maker",
      price: 79.99,
      category: "Home & Kitchen",
      stock: 21,
      image:
        "https://images.unsplash.com/photo-1570486733338-115a0f9fd981?w=500&q=80",
    },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", productCount: 15 },
    { id: 2, name: "Clothing", productCount: 24 },
    { id: 3, name: "Home & Kitchen", productCount: 18 },
    { id: 4, name: "Books", productCount: 32 },
    { id: 5, name: "Beauty", productCount: 12 },
  ]);

  // Check if user is authenticated and admin
  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in?redirect=/admin");
        return;
      }

      // In a real implementation, you would check if the user has admin privileges
      // For now, we'll just simulate an admin user
      setIsAdmin(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access the admin dashboard.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-md md:h-screen md:fixed">
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 text-blue-600"
                >
                  <Package size={18} />
                  <span>Products</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LayoutGrid size={18} />
                  <span>Categories</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BarChart3 size={18} />
                  <span>Analytics</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <Tabs defaultValue="products">
            <TabsList className="mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Products</h2>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusCircle size={18} />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={product.image}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${product.price.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.stock}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Categories</h2>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <PlusCircle size={18} />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Products
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {category.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {category.productCount}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Edit size={18} />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Total Sales
                  </h3>
                  <p className="text-3xl font-bold">$12,345</p>
                  <p className="text-sm text-green-600 mt-2">
                    +12% from last month
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Orders
                  </h3>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-sm text-green-600 mt-2">
                    +8% from last month
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Customers
                  </h3>
                  <p className="text-3xl font-bold">86</p>
                  <p className="text-sm text-green-600 mt-2">
                    +15% from last month
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Sales Overview
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">
                    Sales chart will be displayed here
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
