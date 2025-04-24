"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface ProductImageLightboxProps {
  images: ProductImage[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductImageLightbox({
  images,
  initialIndex,
  open,
  onOpenChange,
}: ProductImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  // Set mounted state and reset current index when component mounts
  useEffect(() => {
    setMounted(true);
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onOpenChange(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!mounted || !images || images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative h-[80vh] w-full flex items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src={images[currentIndex]?.url || ""}
              alt={images[currentIndex]?.alt || "Product image"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            onClick={handlePrevious}
            className="absolute left-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
