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
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: easeOutExpo }}
                whileHover={{ y: -4 }}
                onClick={() => handleImageClick(index)}
                className={cn(
                  "relative overflow-hidden group cursor-pointer",
                  "focus-visible:ring-2 focus-visible:ring-shell focus-visible:ring-offset-2",
                  "shadow-md hover:shadow-xl transition-shadow duration-500 ease-out",
                  aspectRatioClasses[aspectRatio]
                )}
                aria-label={`View ${image.caption || image.alt || `image ${index + 1}`} in fullscreen`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes={`(max-width: 768px) 50vw, ${Math.floor(100 / columns)}vw`}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500" />

                {/* Centered text panel */}
                <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* Decorative line above */}
                    <div className="w-8 h-px bg-white/60 mx-auto mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />

                    <p className="text-white text-lg md:text-xl lg:text-2xl font-display italic leading-snug line-clamp-2 max-w-[280px]">
                      {image.caption || image.alt}
                    </p>

                    {/* Decorative line below */}
                    <div className="w-8 h-px bg-white/60 mx-auto mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
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
