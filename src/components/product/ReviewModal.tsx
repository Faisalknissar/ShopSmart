"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReviewModal({ open, onOpenChange }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Share your thoughts</h2>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Rate your experience:
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-2xl focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${(hoveredRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll send you an email to verify this review came from you.
                </p>
              </div>
            </div>

            {/* Review Headline */}
            <div>
              <label
                htmlFor="headline"
                className="block text-sm font-medium mb-2"
              >
                Add Review Headline:
              </label>
              <input
                type="text"
                id="headline"
                placeholder="Review Heading"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Review Content */}
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium mb-2"
              >
                Write a review:
              </label>
              <textarea
                id="review"
                rows={4}
                placeholder="Tell us what you like or dislike"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Add media:
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Product Selection */}
            <div>
              <label
                htmlFor="product"
                className="block text-sm font-medium mb-2"
              >
                Choose your product:
              </label>
              <select
                id="product"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a product</option>
                <option value="product1">Wireless Headphones</option>
                <option value="product2">Smart Watch</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-2"
              >
                Where do you live? (City, State):
              </label>
              <input
                type="text"
                id="location"
                placeholder="City, State"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-black hover:bg-gray-800 text-white py-3">
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
