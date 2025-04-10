"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductImageLightbox from "@/components/product/ProductImageLightbox";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, StarHalf } from "lucide-react";

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

        {/* Reviews section will be added in the next implementation */}
        <div id="reviews" className="border-t pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-gray-500">
            Review section will be implemented in the next phase.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
