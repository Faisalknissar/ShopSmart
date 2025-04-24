"use client";

import { useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useRouter } from "next/navigation";
import {
  Star,
  Loader2,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "../components/admin-sidebar";

export default function AdminReviewsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Mock data for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Wireless Headphones",
      customer: "John Doe",
      rating: 5,
      title: "Amazing sound quality!",
      content:
        "These headphones have incredible sound quality and battery life. Highly recommended!",
      date: "2023-09-10",
      status: "Approved",
      helpful: 24,
      notHelpful: 2,
      reported: false,
    },
    {
      id: 2,
      product: "Smart Watch",
      customer: "Jane Smith",
      rating: 4,
      title: "Great features, but battery could be better",
      content:
        "I love all the features this watch offers, especially the fitness tracking. However, the battery life could be improved.",
      date: "2023-09-08",
      status: "Approved",
      helpful: 15,
      notHelpful: 3,
      reported: false,
    },
    {
      id: 3,
      product: "Coffee Maker",
      customer: "Robert Johnson",
      rating: 2,
      title: "Disappointing performance",
      content:
        "The coffee maker stopped working after just two weeks of use. Very disappointed with the quality.",
      date: "2023-09-07",
      status: "Pending",
      helpful: 8,
      notHelpful: 1,
      reported: true,
    },
    {
      id: 4,
      product: "Men's T-Shirt",
      customer: "Emily Davis",
      rating: 5,
      title: "Perfect fit and comfortable",
      content:
        "The t-shirt fits perfectly and the material is very comfortable. Will definitely buy more colors!",
      date: "2023-09-05",
      status: "Approved",
      helpful: 12,
      notHelpful: 0,
      reported: false,
    },
    {
      id: 5,
      product: "Women's Dress",
      customer: "Michael Wilson",
      rating: 1,
      title: "Not as advertised",
      content:
        "The dress looks nothing like the pictures. The color is completely different and the sizing is way off.",
      date: "2023-09-03",
      status: "Rejected",
      helpful: 30,
      notHelpful: 5,
      reported: true,
    },
  ]);

  const getStatusBadge = (status: string, reported: boolean) => {
    if (reported) {
      return (
        <Badge className="bg-red-100 text-red-800">
          <Flag className="mr-1 h-3 w-3" /> Reported
        </Badge>
      );
    }

    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <AdminSidebar activePage="reviews" />

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Reviews Management</h2>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                Filter
              </Button>
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
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Helpful
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
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {review.product}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {review.customer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {review.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {review.content}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {review.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <ThumbsUp className="h-4 w-4 mr-1 text-green-600" />
                          {review.helpful}
                          <ThumbsDown className="h-4 w-4 ml-3 mr-1 text-red-600" />
                          {review.notHelpful}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(review.status, review.reported)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye size={18} />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <CheckCircle size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <XCircle size={18} />
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
