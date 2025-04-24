"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import { Package, Loader2, AlertTriangle, Edit, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminInventoryPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for inventory
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-001",
      category: "Electronics",
      stock: 45,
      lowStockThreshold: 10,
      lastUpdated: "2023-09-10",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      sku: "SW-002",
      category: "Electronics",
      stock: 32,
      lowStockThreshold: 15,
      lastUpdated: "2023-09-12",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    },
    {
      id: 3,
      name: "Men's T-Shirt",
      sku: "MT-003",
      category: "Clothing",
      stock: 78,
      lowStockThreshold: 20,
      lastUpdated: "2023-09-08",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    },
    {
      id: 4,
      name: "Women's Dress",
      sku: "WD-004",
      category: "Clothing",
      stock: 54,
      lowStockThreshold: 15,
      lastUpdated: "2023-09-11",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80",
    },
    {
      id: 5,
      name: "Coffee Maker",
      sku: "CM-005",
      category: "Home & Kitchen",
      stock: 21,
      lowStockThreshold: 10,
      lastUpdated: "2023-09-09",
      image:
        "https://images.unsplash.com/photo-1570486733338-115a0f9fd981?w=500&q=80",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      sku: "BS-006",
      category: "Electronics",
      stock: 8,
      lowStockThreshold: 10,
      lastUpdated: "2023-09-07",
      image:
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&q=80",
    },
  ]);

  const getStockStatus = (item: any) => {
    if (item.stock <= 0) {
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertTriangle className="mr-1 h-3 w-3" /> Out of Stock
        </Badge>
      );
    } else if (item.stock <= item.lowStockThreshold) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <AlertTriangle className="mr-1 h-3 w-3" /> Low Stock
        </Badge>
      );
    } else {
      return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar activePage="inventory" />

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Inventory Management</h2>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <RefreshCw size={16} />
                Refresh
              </Button>
              <Button className="flex items-center gap-2">Update Stock</Button>
            </div>
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
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={item.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStockStatus(item)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.lastUpdated}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
