"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import {
  Tag,
  Loader2,
  PlusCircle,
  Edit,
  Trash2,
  Calendar,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminDiscountsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for discounts
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      code: "SUMMER25",
      type: "Percentage",
      value: 25,
      startDate: "2023-06-01",
      endDate: "2023-09-30",
      usageLimit: 1000,
      usageCount: 456,
      status: "Active",
    },
    {
      id: 2,
      code: "WELCOME10",
      type: "Percentage",
      value: 10,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      usageLimit: 5000,
      usageCount: 2134,
      status: "Active",
    },
    {
      id: 3,
      code: "FREESHIP",
      type: "Fixed",
      value: 15,
      startDate: "2023-08-15",
      endDate: "2023-10-15",
      usageLimit: 2000,
      usageCount: 789,
      status: "Active",
    },
    {
      id: 4,
      code: "FLASH50",
      type: "Percentage",
      value: 50,
      startDate: "2023-09-01",
      endDate: "2023-09-03",
      usageLimit: 500,
      usageCount: 500,
      status: "Expired",
    },
    {
      id: 5,
      code: "HOLIDAY20",
      type: "Percentage",
      value: 20,
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      usageLimit: 3000,
      usageCount: 0,
      status: "Scheduled",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "Expired":
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading discounts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar activePage="discounts" />

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Discounts & Promotions</h2>

            <Button className="flex items-center gap-2">
              <PlusCircle size={18} />
              <span>Create Discount</span>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
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
                  {discounts.map((discount) => (
                    <tr key={discount.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="h-5 w-5 text-blue-600 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {discount.code}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {discount.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          {discount.type === "Percentage" ? (
                            <>
                              <Percent className="h-4 w-4 mr-1" />
                              {discount.value}%
                            </>
                          ) : (
                            <>${discount.value.toFixed(2)}</>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          {discount.startDate} to {discount.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {discount.usageCount} / {discount.usageLimit}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{
                              width: `${(discount.usageCount / discount.usageLimit) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(discount.status)}
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
        </div>
      </div>
    </div>
  );
}
