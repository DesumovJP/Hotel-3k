"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SplitText } from "@/components/animations";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Gallery categories and images
const categories = [
  { id: "all", name: "All" },
  { id: "rooms", name: "Rooms & Suites" },
  { id: "wellness", name: "Wellness" },
  { id: "restaurant", name: "Restaurant" },
  { id: "texel", name: "Texel Island" },
];

const galleryImages = [
  // Rooms
  { id: "r1", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200", alt: "Dune Suite with panoramic views", caption: "Dune Suite", category: "rooms", featured: true },
  { id: "r2", src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800", alt: "Sea View Room", caption: "Sea View Room", category: "rooms" },
  { id: "r3", src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800", alt: "Garden Retreat", caption: "Garden Retreat", category: "rooms" },
  { id: "r4", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800", alt: "Family Suite", caption: "Family Suite", category: "rooms" },

  // Wellness
  { id: "w1", src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200", alt: "Indoor pool with dune views", caption: "Infinity Pool", category: "wellness", featured: true },
  { id: "w2", src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800", alt: "Spa treatment room", caption: "Spa Treatment", category: "wellness" },
  { id: "w3", src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800", alt: "Finnish sauna", caption: "Finnish Sauna", category: "wellness" },

  // Restaurant
  { id: "d1", src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200", alt: "Restaurant interior", caption: "Restaurant Opduin", category: "restaurant", featured: true },
  { id: "d2", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", alt: "Signature seafood dish", caption: "Culinary Delights", category: "restaurant" },
  { id: "d3", src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800", alt: "Chef at work", caption: "Our Chef", category: "restaurant" },

  // Texel
  { id: "t1", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200", alt: "Texel beach", caption: "Pristine Beaches", category: "texel", featured: true },
  { id: "t2", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", alt: "Rolling dunes", caption: "The Dunes", category: "texel" },
  { id: "t3", src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", alt: "Texel farmland", caption: "Island Beauty", category: "texel" },
  { id: "t4", src: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800", alt: "Lighthouse", caption: "Texel Lighthouse", category: "texel" },
];

export default function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.6]);

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
    <>
      <Header />

      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[50vh] min-h-[400px] overflow-hidden bg-navy">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080"
              alt="Gallery"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-navy"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Visual Stories
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      Gallery
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-lg text-white/80 max-w-lg"
              >
                Moments captured at Grand Hotel Opduin.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: easeOutExpo }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Gallery" }]} className="mb-8" />
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((cat) => (
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
      </main>

      <Footer />

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
    </>
  );
}
