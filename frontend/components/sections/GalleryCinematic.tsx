"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid3X3,
  LayoutGrid,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fadeInUp,
  staggerContainer,
  easeOutExpo,
  duration,
} from "@/lib/motion";
import {
  useFocusTrap,
  useEscapeKey,
  useReducedMotion,
  useScrollLock,
  useAnnouncer,
} from "@/lib/accessibility";
import { trackViewContent } from "@/lib/analytics";

// Types
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: string;
  aspect?: "landscape" | "portrait" | "square";
  featured?: boolean;
}

interface GallerySet {
  id: string;
  name: string;
  description?: string;
  images: GalleryImage[];
}

// Sample Gallery Data - Curated Sets
const curatedSets: GallerySet[] = [
  {
    id: "rooms",
    name: "Rooms & Suites",
    description: "Coastal elegance meets modern comfort",
    images: [
      {
        id: "r1",
        src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
        alt: "Dune Suite with panoramic views",
        caption: "Dune Suite - Wake up to endless horizon",
        category: "rooms",
        aspect: "landscape",
        featured: true,
      },
      {
        id: "r2",
        src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
        alt: "Sea View Room interior",
        caption: "Sea View Room - Rhythm of the tides",
        category: "rooms",
        aspect: "portrait",
      },
      {
        id: "r3",
        src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
        alt: "Garden Retreat bedroom",
        caption: "Garden Retreat - Island tranquility",
        category: "rooms",
        aspect: "landscape",
      },
      {
        id: "r4",
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
        alt: "Family Suite living area",
        caption: "Family Suite - Space for memories",
        category: "rooms",
        aspect: "square",
      },
    ],
  },
  {
    id: "wellness",
    name: "Wellness & Spa",
    description: "Where restoration meets the sea",
    images: [
      {
        id: "w1",
        src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070",
        alt: "Indoor pool with dune views",
        caption: "Infinity pool overlooking the dunes",
        category: "wellness",
        aspect: "landscape",
        featured: true,
      },
      {
        id: "w2",
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
        alt: "Spa treatment room",
        caption: "Signature Texel seaweed treatment",
        category: "wellness",
        aspect: "portrait",
      },
      {
        id: "w3",
        src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
        alt: "Sauna with natural light",
        caption: "Finnish sauna with island timber",
        category: "wellness",
        aspect: "landscape",
      },
    ],
  },
  {
    id: "restaurant",
    name: "Restaurant & Dining",
    description: "From sea to table, a culinary journey",
    images: [
      {
        id: "d1",
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974",
        alt: "Restaurant interior at sunset",
        caption: "Restaurant Opduin - Evening ambiance",
        category: "restaurant",
        aspect: "landscape",
        featured: true,
      },
      {
        id: "d2",
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
        alt: "Signature seafood dish",
        caption: "North Sea catch of the day",
        category: "restaurant",
        aspect: "square",
      },
      {
        id: "d3",
        src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1974",
        alt: "Chef preparing fresh ingredients",
        caption: "Chef crafting island flavors",
        category: "restaurant",
        aspect: "portrait",
      },
    ],
  },
  {
    id: "texel",
    name: "Texel Island",
    description: "Nature, beaches, and endless skies",
    images: [
      {
        id: "t1",
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073",
        alt: "Texel beach at golden hour",
        caption: "Pristine beaches stretch for miles",
        category: "texel",
        aspect: "landscape",
        featured: true,
      },
      {
        id: "t2",
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
        alt: "Rolling dunes landscape",
        caption: "UNESCO World Heritage dunes",
        category: "texel",
        aspect: "landscape",
      },
      {
        id: "t3",
        src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2032",
        alt: "Texel farmland at sunset",
        caption: "Island's pastoral beauty",
        category: "texel",
        aspect: "portrait",
      },
      {
        id: "t4",
        src: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1976",
        alt: "Historic lighthouse",
        caption: "The iconic Texel lighthouse",
        category: "texel",
        aspect: "square",
      },
    ],
  },
  {
    id: "people",
    name: "Moments & Memories",
    description: "Stories of joy and connection",
    images: [
      {
        id: "p1",
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069",
        alt: "Guests enjoying beach walk",
        caption: "Morning walks on the shore",
        category: "people",
        aspect: "landscape",
        featured: true,
      },
      {
        id: "p2",
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070",
        alt: "Couple at restaurant",
        caption: "Romantic dinner for two",
        category: "people",
        aspect: "portrait",
      },
      {
        id: "p3",
        src: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1974",
        alt: "Family on Texel bikes",
        caption: "Family adventures on two wheels",
        category: "people",
        aspect: "landscape",
      },
    ],
  },
];

// Lightbox Component
function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onNavigate,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onNavigate: (index: number) => void;
}) {
  const currentImage = images[currentIndex];
  const lightboxRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const announce = useAnnouncer();

  // Accessibility hooks
  useFocusTrap(lightboxRef, { enabled: true });
  useEscapeKey(onClose, true);
  useScrollLock(true);

  // Announce image changes
  useEffect(() => {
    announce(`Image ${currentIndex + 1} of ${images.length}: ${currentImage.alt}`);
  }, [currentIndex, images.length, currentImage.alt, announce]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  return (
    <motion.div
      ref={lightboxRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-max bg-ink/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image gallery lightbox, showing ${currentImage.caption || currentImage.alt}`}
      tabIndex={-1}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors tap-target focus-visible-ring"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors tap-target focus-visible-ring"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors tap-target focus-visible-ring"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Image */}
      <motion.div
        key={currentImage.id}
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        className="relative max-w-[90vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        role="img"
        aria-label={currentImage.alt}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1920}
          height={1080}
          className="object-contain max-h-[85vh] w-auto"
          priority
        />
      </motion.div>

      {/* Caption */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white" aria-live="polite">
        <p className="text-lg font-display mb-1">{currentImage.caption}</p>
        <p className="text-sm text-white/60">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Image thumbnails">
        {images.slice(0, 8).map((img, i) => (
          <button
            key={img.id}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(i);
            }}
            className={cn(
              "w-16 h-10 rounded overflow-hidden transition-all focus-visible-ring",
              i === currentIndex
                ? "ring-2 ring-white opacity-100"
                : "opacity-50 hover:opacity-75"
            )}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`View image ${i + 1}`}
            tabIndex={i === currentIndex ? 0 : -1}
          >
            <Image
              src={img.src}
              alt=""
              width={64}
              height={40}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Masonry Grid Item
function MasonryItem({
  image,
  onClick,
  index,
}: {
  image: GalleryImage;
  onClick: () => void;
  index: number;
}) {
  const aspectClasses = {
    landscape: "aspect-[3/2]",
    portrait: "aspect-[2/3]",
    square: "aspect-square",
  };

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative overflow-hidden rounded-xl cursor-pointer",
        image.featured && "md:col-span-2 md:row-span-2",
        aspectClasses[image.aspect || "landscape"]
      )}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={
          image.featured
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-white font-display text-lg">{image.caption}</p>
      </div>

      {/* Expand Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
          <Maximize2 className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

// Main Gallery Component
interface GalleryCinematicProps {
  sets?: GallerySet[];
  title?: string;
  subtitle?: string;
  layout?: "masonry" | "grid" | "carousel";
  className?: string;
}

export function GalleryCinematic({
  sets = curatedSets,
  title = "Gallery",
  subtitle = "Moments captured at Grand Hotel Opduin",
  layout = "masonry",
  className,
}: GalleryCinematicProps) {
  const [activeSet, setActiveSet] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Parallax for header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Get all images or filtered by set
  const allImages = sets.flatMap((set) => set.images);
  const displayImages =
    activeSet === "all"
      ? allImages
      : sets.find((s) => s.id === activeSet)?.images || [];

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    // Track gallery view (using 'page' type for gallery content)
    trackViewContent("page", displayImages[index]?.id || "unknown", { name: displayImages[index]?.alt || "Gallery image", category: "gallery" });
  }, [displayImages]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const navigateToImage = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % displayImages.length);
  }, [displayImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  }, [displayImages.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    },
    [lightboxOpen, closeLightbox, nextImage, prevImage]
  );

  return (
    <section
      ref={sectionRef}
      className={cn("py-section-lg bg-sand-100 overflow-hidden", className)}
    >
      <div className="px-gutter max-w-content-2xl mx-auto">
        {/* Header */}
        <motion.div
          style={{ y: headerY }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.normal }}
            className="text-overline text-shell tracking-luxury mb-4 block"
          >
            Visual Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slow, delay: 0.1 }}
            className="font-display text-display-lg text-ink mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.slow, delay: 0.2 }}
            className="text-body-lg text-neutral-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Set Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.normal, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setActiveSet("all")}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
              activeSet === "all"
                ? "bg-navy text-white shadow-elevation-2"
                : "bg-white text-neutral-600 hover:bg-sand-200"
            )}
          >
            <Grid3X3 className="w-4 h-4 inline mr-2" />
            All ({allImages.length})
          </button>
          {sets.map((set) => (
            <button
              key={set.id}
              onClick={() => setActiveSet(set.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
                activeSet === set.id
                  ? "bg-navy text-white shadow-elevation-2"
                  : "bg-white text-neutral-600 hover:bg-sand-200"
              )}
            >
              {set.name} ({set.images.length})
            </button>
          ))}
        </motion.div>

        {/* Set Description */}
        <AnimatePresence mode="wait">
          {activeSet !== "all" && (
            <motion.p
              key={activeSet}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-neutral-500 mb-8 italic"
            >
              {sets.find((s) => s.id === activeSet)?.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Masonry Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
        >
          <AnimatePresence mode="popLayout">
            {displayImages.map((image, index) => (
              <MasonryItem
                key={image.id}
                image={image}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        {activeSet !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.normal, delay: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setActiveSet("all")}
              className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors"
            >
              <LayoutGrid className="w-5 h-5" />
              <span>View all {allImages.length} images</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={displayImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            onNavigate={navigateToImage}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export type { GalleryImage, GallerySet };
