"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt?: string;
}

interface GalleryModalProps {
  images: GalleryImage[] | string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

// Normalize images to always have { src, alt } format
function normalizeImages(images: GalleryImage[] | string[]): GalleryImage[] {
  return images.map((img, index) =>
    typeof img === "string"
      ? { src: img, alt: `Image ${index + 1}` }
      : { src: img.src, alt: img.alt || `Image ${index + 1}` }
  );
}

export function GalleryModal({
  images: rawImages,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryModalProps) {
  const images = normalizeImages(rawImages);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Reset to initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) {
      setDirection(1);
      setIsLoading(true);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, images.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsLoading(true);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setIsLoading(true);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToNext, goToPrev]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe distance of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={containerRef}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={(e) => {
            if (e.target === containerRef.current) {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6">
            <span className="text-white/70 text-sm font-light tracking-wide">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Image Area */}
          <div
            className="flex-1 relative flex items-center justify-center px-4 md:px-16"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Button */}
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={cn(
                "absolute left-2 md:left-6 z-10 p-2 md:p-3 rounded-full",
                "bg-white/10 backdrop-blur-sm",
                "text-white/70 hover:text-white hover:bg-white/20",
                "transition-all duration-300",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="md:w-8 md:h-8" />
            </button>

            {/* Image Container */}
            <div className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                  )}

                  <Image
                    src={currentImage.src}
                    alt={currentImage.alt || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className={cn(
                      "object-contain transition-opacity duration-300",
                      isLoading ? "opacity-0" : "opacity-100"
                    )}
                    onLoad={() => setIsLoading(false)}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={currentIndex === images.length - 1}
              className={cn(
                "absolute right-2 md:right-6 z-10 p-2 md:p-3 rounded-full",
                "bg-white/10 backdrop-blur-sm",
                "text-white/70 hover:text-white hover:bg-white/20",
                "transition-all duration-300",
                "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/10"
              )}
              aria-label="Next image"
            >
              <ChevronRight size={24} className="md:w-8 md:h-8" />
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto max-w-full pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      "relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 overflow-hidden",
                      "rounded transition-all duration-300",
                      currentIndex === index
                        ? "ring-2 ring-white opacity-100"
                        : "opacity-50 hover:opacity-80"
                    )}
                    aria-label={`View image ${index + 1}`}
                    aria-current={currentIndex === index ? "true" : undefined}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
