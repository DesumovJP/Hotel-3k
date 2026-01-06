"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/organisms";
import { InfoStrip, BreadcrumbsSection } from "@/components/molecules";
import { SectionHeroCompact } from "@/components/sections";
import { X, ChevronLeft, ChevronRight, Camera, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

// Centralized data
import { galleryCategories, galleryImages } from "@/lib/data";

/**
 * Gallery Page
 *
 * USES:
 * - PageLayout for consistent header/footer
 * - InfoStrip for the navy quick info bar
 * - BreadcrumbsSection for breadcrumbs
 * - Centralized data from lib/data/gallery.ts
 *
 * REDESIGN: Update galleryImages in lib/data/gallery.ts to change gallery content
 */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  return (
    <PageLayout>
      {/* Hero */}
      <SectionHeroCompact
        label="Visual Stories"
        title="Gallery"
        description="Moments captured at Grand Hotel Opduin."
      />

      {/* Quick Info Strip - Using centralized component */}
      <InfoStrip
        items={[
          { icon: Camera, value: `${galleryImages.length} Photos` },
          { icon: Grid3X3, value: `${galleryCategories.length - 1} Categories` },
        ]}
      />

      {/* Breadcrumbs - Using centralized component */}
      <BreadcrumbsSection items={[{ label: "Gallery" }]} />

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-navy text-white"
                    : "bg-sand-100 text-neutral-600 hover:bg-sand-200"
                )}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={cn(
                    "relative overflow-hidden group cursor-pointer",
                    image.featured ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                  )}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-display">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={filteredImages[lightboxIndex]?.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[lightboxIndex]?.src || ""}
                alt={filteredImages[lightboxIndex]?.alt || ""}
                width={1920}
                height={1080}
                className="object-contain max-h-[85vh] w-auto"
              />
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="text-lg font-display mb-1">{filteredImages[lightboxIndex]?.caption}</p>
              <p className="text-sm text-white/60">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
