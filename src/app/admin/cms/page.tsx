"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import {
  FileText,
  Loader2,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  Globe,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminCmsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for CMS pages
  const [pages, setPages] = useState([
    {
      id: 1,
      title: "About Us",
      slug: "/about",
      author: "Admin",
      lastUpdated: "2023-08-15",
      status: "Published",
      type: "Page",
    },
    {
      id: 2,
      title: "Contact Us",
      slug: "/contact",
      author: "Admin",
      lastUpdated: "2023-08-20",
      status: "Published",
      type: "Page",
    },
    {
      id: 3,
      title: "Privacy Policy",
      slug: "/privacy-policy",
      author: "Admin",
      lastUpdated: "2023-07-10",
      status: "Published",
      type: "Legal",
    },
    {
      id: 4,
      title: "Terms of Service",
      slug: "/terms-of-service",
      author: "Admin",
      lastUpdated: "2023-07-10",
      status: "Published",
      type: "Legal",
    },
    {
      id: 5,
      title: "Shipping Information",
      slug: "/shipping-info",
      author: "John Doe",
      lastUpdated: "2023-09-05",
      status: "Draft",
      type: "Info",
    },
    {
      id: 6,
      title: "Return Policy",
      slug: "/return-policy",
      author: "Jane Smith",
      lastUpdated: "2023-09-08",
      status: "Published",
      type: "Info",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Globe className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Page":
        return <Badge className="bg-blue-100 text-blue-800">{type}</Badge>;
      case "Legal":
        return <Badge className="bg-purple-100 text-purple-800">{type}</Badge>;
      case "Info":
        return <Badge className="bg-gray-100 text-gray-800">{type}</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading CMS pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar activePage="cms" />

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">CMS Pages</h2>

            <Button className="flex items-center gap-2">
              <PlusCircle size={18} />
              <span>Create Page</span>
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
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
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {page.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">{page.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(page.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <User className="h-4 w-4 mr-1 text-gray-500" />
                          {page.author}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          {page.lastUpdated}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(page.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit size={18} />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Eye size={18} />
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
