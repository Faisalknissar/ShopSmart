"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Loader2,
  Eye,
  TruckIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminOrdersPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      date: "2023-09-15",
      total: 149.98,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      date: "2023-09-14",
      total: 79.99,
      status: "Processing",
      items: 1,
    },
    {
      id: "ORD-003",
      customer: "Robert Johnson",
      date: "2023-09-13",
      total: 249.97,
      status: "Shipped",
      items: 3,
    },
    {
      id: "ORD-004",
      customer: "Emily Davis",
      date: "2023-09-12",
      total: 129.99,
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-005",
      customer: "Michael Wilson",
      date: "2023-09-11",
      total: 349.95,
      status: "Cancelled",
      items: 4,
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Loader2 className="mr-1 h-3 w-3 animate-spin" /> {status}
          </Badge>
        );
      case "Shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            <TruckIcon className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar activePage="orders" />

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Orders</h2>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                Export
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.items}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={18} />
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
