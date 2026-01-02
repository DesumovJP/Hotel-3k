"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GalleryModal } from "@/components/molecules/GalleryModal";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface MiniGalleryProps {
  /** Section label (small text above title) */
  label?: string;
  /** Section title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Images - can be array of URLs or objects with src/alt/caption */
  images: (string | GalleryImage)[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Aspect ratio for images */
  aspectRatio?: "square" | "4/3" | "3/2" | "16/9";
  /** Background color class */
  background?: "white" | "sand-100" | "sand-200" | "sand-300";
  /** Optional link to view full gallery */
  viewAllLink?: string;
  /** Custom text for view all link */
  viewAllText?: string;
  /** Additional className */
  className?: string;
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

const aspectRatioClasses = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
};

const backgroundClasses = {
  "white": "bg-white",
  "sand-100": "bg-sand-100",
  "sand-200": "bg-sand-200",
  "sand-300": "bg-sand-300",
};

// Normalize images to always have { src, alt, caption } format
function normalizeImages(images: (string | GalleryImage)[]): GalleryImage[] {
  return images.map((img, index) =>
    typeof img === "string"
      ? { src: img, alt: `Gallery image ${index + 1}` }
      : { src: img.src, alt: img.alt || `Gallery image ${index + 1}`, caption: img.caption }
  );
}

export function MiniGallery({
  label = "Gallery",
  title,
  subtitle,
  images,
  columns = 4,
  aspectRatio = "square",
  background = "sand-100",
  viewAllLink,
  viewAllText = "View full gallery",
  className,
}: MiniGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const normalizedImages = normalizeImages(images);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  // Convert to GalleryModal format
  const modalImages = normalizedImages.map((img) => ({
    src: img.src,
    alt: img.caption || img.alt || "",
  }));

  return (
    <>
      <section className={cn(
        "py-20 md:py-28",
        backgroundClasses[background],
        className
      )}>
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-12"
          >
            {label && (
              <span className="text-overline text-shell tracking-widest mb-3 block">
                {label}
              </span>
            )}
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              {title}
            </h2>
            {subtitle && (
              <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className={cn("grid gap-4", columnClasses[columns])}
          >
            {normalizedImages.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleImageClick(index)}
                className={cn(
                  "relative overflow-hidden group cursor-pointer focus-visible:ring-2 focus-visible:ring-shell focus-visible:ring-offset-2",
                  aspectRatioClasses[aspectRatio]
                )}
                aria-label={`View ${image.caption || image.alt || `image ${index + 1}`} in fullscreen`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes={`(max-width: 768px) 50vw, ${Math.floor(100 / columns)}vw`}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300" />

                {/* Caption on hover */}
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-navy/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                )}

                {/* Expand indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* View All Link */}
          {viewAllLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-10"
            >
              <Link
                href={viewAllLink}
                className="group inline-flex items-center gap-3 text-ink hover:text-shell transition-colors"
              >
                <span className="text-sm tracking-wide uppercase">{viewAllText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <GalleryModal
        images={modalImages}
        initialIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
