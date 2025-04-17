"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Loader2,
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for analytics
  const stats = [
    {
      title: "Total Sales",
      value: "$12,345",
      change: "+12%",
      trend: "up",
      period: "from last month",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      value: "156",
      change: "+8%",
      trend: "up",
      period: "from last month",
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Customers",
      value: "86",
      change: "+15%",
      trend: "up",
      period: "from last month",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      period: "from last month",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
    },
  ];

  // Mock data for top products
  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 45,
      revenue: "$4,455",
      growth: "+12%",
    },
    {
      name: "Smart Watch",
      sales: 38,
      revenue: "$7,582",
      growth: "+8%",
    },
    {
      name: "Men's T-Shirt",
      sales: 32,
      revenue: "$958",
      growth: "+5%",
    },
    {
      name: "Coffee Maker",
      sales: 28,
      revenue: "$2,240",
      growth: "+15%",
    },
    {
      name: "Women's Dress",
      sales: 25,
      revenue: "$1,245",
      growth: "-2%",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar activePage="analytics" />

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Last 30 days
              </div>
              <Button variant="outline" className="ml-2">
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {stat.change} {stat.period}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${stat.color} p-3 rounded-lg flex items-center justify-center`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Overview Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Sales Overview
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <BarChart3 className="h-12 w-12 text-gray-300" />
                <p className="ml-2 text-gray-500">
                  Sales chart will be displayed here
                </p>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Top Products
              </h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-2 border-b border-gray-100"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-2">{product.sales} sold</span>
                        <span
                          className={`${product.growth.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                        >
                          {product.growth}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Traffic Sources
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Traffic sources chart will be displayed here
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Customer Demographics
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Demographics chart will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
