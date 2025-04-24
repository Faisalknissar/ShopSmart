"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Star,
  StarHalf,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

// Dynamically import components with client-side only rendering
const ProductImageCarousel = dynamic(
  () => import("@/components/product/ProductImageCarousel"),
  { ssr: false },
);

const ProductImageLightbox = dynamic(
  () => import("@/components/product/ProductImageLightbox"),
  { ssr: false },
);

const ReviewModal = dynamic(() => import("@/components/product/ReviewModal"), {
  ssr: false,
});

// Mock product data - in a real app, this would come from your database
const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    description:
      "Premium wireless headphones with noise cancellation technology, providing crystal clear sound quality and comfort for extended listening sessions. Features include Bluetooth 5.0 connectivity, 30-hour battery life, and touch controls.",
    stock: 45,
    rating: 4.5,
    reviewCount: 128,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        alt: "Wireless Headphones - Front view",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&q=80",
        alt: "Wireless Headphones - Side view",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
        alt: "Wireless Headphones - In use",
      },
      {
        id: 4,
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
        alt: "Wireless Headphones - With case",
      },
    ],
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    description:
      "Advanced smartwatch with health monitoring features, GPS tracking, and smartphone notifications. Water-resistant up to 50 meters, with a battery life of up to 7 days on a single charge.",
    stock: 32,
    rating: 4.2,
    reviewCount: 95,
    images: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        alt: "Smart Watch - Front view",
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
        alt: "Smart Watch - Side view",
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
        alt: "Smart Watch - On wrist",
      },
    ],
  },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Number(params.productId);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, fetch product data from your API/database
    // For now, we'll use mock data
    const foundProduct = mockProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
    setLoading(false);
  }, [productId]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you are looking for does not exist.
            </p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-blue-600">
            Home
          </a>{" "}
          &gt;
          <a href="/products" className="hover:text-blue-600">
            Products
          </a>{" "}
          &gt;
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images - Left Side */}
          <div>
            <ProductImageCarousel
              images={product.images}
              onImageClick={handleImageClick}
            />
          </div>

          {/* Product Details - Right Side */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  return starValue <= Math.floor(product.rating) ? (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ) : starValue - 0.5 <= product.rating ? (
                    <StarHalf key={i} className="h-5 w-5 fill-current" />
                  ) : (
                    <Star key={i} className="h-5 w-5 text-gray-300" />
                  );
                })}
              </div>
              <span className="text-blue-600">{product.rating}</span>
              <span className="mx-2 text-gray-400">|</span>
              <a href="#reviews" className="text-gray-500 hover:text-blue-600">
                {product.reviewCount} reviews
              </a>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-blue-600 mb-4">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Stock */}
            <div className="mb-6">
              <span className="font-medium">Availability:</span>
              <span
                className={
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="flex space-x-4">
              <Button className="px-8 py-6" disabled={product.stock <= 0}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="px-8 py-6">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Product Image Lightbox */}
        <ProductImageLightbox
          images={product.images}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
        />

        <ReviewModal open={reviewModalOpen} onOpenChange={setReviewModalOpen} />

        {/* Reviews section */}
        <div id="reviews" className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Rating Summary */}
              <div className="md:w-1/3">
                <div className="text-center md:text-left">
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    4.8
                  </div>
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">763 Reviews</div>

                  <button
                    onClick={() => setReviewModalOpen(true)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                  >
                    Write A Review
                  </button>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="md:w-2/3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center mb-2">
                    <div className="w-8 text-right mr-2">{rating}</div>
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width:
                            rating === 5
                              ? "80%"
                              : rating === 4
                                ? "15%"
                                : rating === 3
                                  ? "3%"
                                  : rating === 2
                                    ? "1%"
                                    : "0.5%",
                        }}
                      ></div>
                    </div>
                    <div className="w-10 text-right ml-2 text-sm text-gray-500">
                      {rating === 5
                        ? "629"
                        : rating === 4
                          ? "116"
                          : rating === 3
                            ? "13"
                            : rating === 2
                              ? "3"
                              : "2"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold">Product Reviews</div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">sort by:</span>
              <select className="text-sm border-none bg-transparent focus:outline-none">
                <option>Most recent</option>
                <option>Highest rated</option>
                <option>Lowest rated</option>
              </select>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-8">
            {/* Review 1 */}
            <div className="border-b pb-8">
              <div className="flex items-start mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-700 font-semibold mr-4">
                  R
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <h4 className="font-semibold">Thanks to Emma 😊 😊</h4>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                      09/01/24
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Rajagopala...</span>
                    <span className="text-xs text-gray-500 ml-2">
                      Verified Buyer, Side sleeper
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Chennai, Tamil Nadu
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    We've bought Emma Hybrid mattress, 6.5'6 (10"). We've chosen
                    10" based on our body weight, these guide info not available
                    in Emma website. If they add its good.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Was this review helpful?
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center text-sm text-gray-700">
                        <ThumbsUp className="h-4 w-4 mr-1" /> 57
                      </button>
                      <button className="flex items-center text-sm text-gray-700">
                        <ThumbsDown className="h-4 w-4 mr-1" /> 21
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="border-b pb-8">
              <div className="flex items-start mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-700 font-semibold mr-4">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <div>
                      <div className="flex mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <h4 className="font-semibold">Simply super</h4>
                    </div>
                    <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                      08/13/24
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium">Shankar E.</span>
                    <span className="text-xs text-gray-500 ml-2">
                      Verified Buyer, Back sleeper
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      Changanacherry, Kottayam, Kerala
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Emma mattress is simply super. Experience it, feel it. I
                    brought 1 king size and 3 queen size mattresses a couple of
                    months back, and we are getting good sleep, no stress, no
                    body pain.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Was this review helpful?
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center text-sm text-gray-700">
                        <ThumbsUp className="h-4 w-4 mr-1" /> 42
                      </button>
                      <button className="flex items-center text-sm text-gray-700">
                        <ThumbsDown className="h-4 w-4 mr-1" /> 5
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
