"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function CarouselBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides: BannerSlide[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
      title: "Summer Collection",
      description: "Discover our latest summer styles with up to 40% off",
      buttonText: "Shop Now",
      buttonLink: "/products",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&q=80",
      title: "New Electronics",
      description: "The latest gadgets and tech accessories for your lifestyle",
      buttonText: "Explore",
      buttonLink: "/products",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      title: "Home Essentials",
      description: "Transform your space with our curated home collection",
      buttonText: "View Collection",
      buttonLink: "/products",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === bannerSlides.length - 1 ? 0 : prev + 1,
    );
  }, [bannerSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? bannerSlides.length - 1 : prev - 1,
    );
  }, [bannerSlides.length]);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] w-full">
      {/* Slides */}
      <div className="h-full relative">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center z-10">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6">{slide.description}</p>
                  <Link
                    href={slide.buttonLink}
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
