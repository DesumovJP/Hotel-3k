"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { PageLayout } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { GalleryModal } from "@/components/molecules/GalleryModal";
import { SectionHeroCompact, SectionBlend } from "@/components/sections";
import { Camera, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

// Centralized data
import { galleryCategories, galleryImages } from "@/lib/data";

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const tNav = useTranslations("nav");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  }, []);

  // Convert to GalleryModal format
  const modalImages = filteredImages.map((img) => ({
    src: img.src,
    alt: img.caption || img.alt,
  }));

  return (
    <PageLayout>
      {/* Hero */}
      <SectionHeroCompact
        label={t("heroLabel")}
        title={t("heroTitle")}
        description={t("heroDescription")}
      />

      {/* Quick Info Strip */}
      <section className="neo-bar">
        <div className="px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 md:gap-8 text-xs md:text-sm py-3 md:py-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Camera size={14} className="text-shell" />
              <span className="hidden sm:inline text-neutral-500">{t("photos")}</span>
              <span className="text-ink font-medium">{galleryImages.length}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Grid3X3 size={14} className="text-shell" />
              <span className="hidden sm:inline text-neutral-500">{t("categories")}</span>
              <span className="text-ink font-medium">{galleryCategories.length - 1}</span>
            </div>
          </div>
        </div>
      </section>

      <SectionBlend from="sand" to="white" height="sm" />

      {/* Breadcrumbs */}
      <section className="py-6 bg-white border-b border-neutral-100">
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <BreadcrumbsInline items={[{ label: tNav("gallery") }]} />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-10"
          >
            <span className="text-overline text-shell tracking-widest mb-3 block">
              {t("heroLabel")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              {t("heroTitle")}
            </h2>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 rounded-full",
                  activeCategory === cat.id
                    ? "bg-navy text-white shadow-md"
                    : "bg-sand-100 text-neutral-600 hover:bg-sand-200 hover:text-ink"
                )}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Image Grid - Matching MiniGallery style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: easeOutExpo }}
                  whileHover={{ y: -4 }}
                  onClick={() => handleImageClick(index)}
                  className={cn(
                    "relative overflow-hidden group cursor-pointer aspect-square",
                    "focus-visible:ring-2 focus-visible:ring-shell focus-visible:ring-offset-2",
                    "shadow-md hover:shadow-xl transition-shadow duration-500 ease-out",
                    image.featured && "md:col-span-2 md:row-span-2"
                  )}
                  aria-label={`View ${image.caption || image.alt} in fullscreen`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Elegant overlay */}
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500" />

                  {/* Centered text panel */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {/* Decorative line above */}
                      <div className="w-8 h-px bg-white/60 mx-auto mb-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />

                      <p className="text-white text-base md:text-lg lg:text-xl font-display italic leading-snug line-clamp-2 max-w-[280px]">
                        {image.caption}
                      </p>

                      {/* Decorative line below */}
                      <div className="w-8 h-px bg-white/60 mx-auto mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal - Using shared GalleryModal component */}
      <GalleryModal
        images={modalImages}
        initialIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageLayout>
  );
}
