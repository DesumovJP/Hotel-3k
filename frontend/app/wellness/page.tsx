"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { SectionCTA } from "@/components/sections";
import { SplitText } from "@/components/animations";
import { Clock, Phone, Waves, Flame, Droplets, Sparkles, Heart, Baby, Scissors, Hand, Footprints, ArrowRight, FileText, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const YOUTUBE_VIDEO_ID = "6JUXaDyk4Lo";

// PDF link for full treatment menu
const treatmentMenuPDF = "https://www.opduin.nl/upload/files/wellness-menu.pdf";

const facilities = [
  {
    id: "pool",
    name: "Swimming Pool",
    description: "Heated indoor pool with Jacuzzi and children's pool",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600",
  },
  {
    id: "sauna",
    name: "Finnish Sauna",
    description: "Traditional sauna at 80-90°C",
    icon: Flame,
    highlight: "Free for hotel guests 16:30-19:00",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600",
  },
  {
    id: "steam",
    name: "Steam Bath",
    description: "Turkish steam bath experience",
    icon: Droplets,
    highlight: "Free for hotel guests 16:30-19:00",
    image: "https://images.unsplash.com/photo-1515362655824-9a74989f318e?w=600",
  },
];

const treatmentCategories = [
  {
    id: "massage",
    name: "Massage",
    icon: Hand,
    treatments: ["Relaxing Massage", "Hot Stone Massage", "Scalp Massage"],
  },
  {
    id: "facial",
    name: "Facial",
    icon: Sparkles,
    treatments: ["Sea Treatment", "Anti-Aging", "Men's Facial", "Teen Cleansing"],
  },
  {
    id: "body",
    name: "Body",
    icon: Heart,
    treatments: ["Body Peeling", "Algae Wrap", "Pregnancy Treatment"],
  },
  {
    id: "texel",
    name: "Texel Specials",
    icon: Waves,
    featured: true,
    treatments: ["Texel Feet", "Texel Feeling", "Opduin Feeling Deluxe"],
  },
  {
    id: "hands-feet",
    name: "Hands & Feet",
    icon: Footprints,
    treatments: ["Manicure", "Pedicure", "Foot Reflex Massage"],
  },
  {
    id: "waxing",
    name: "Waxing",
    icon: Scissors,
    treatments: ["Brazilian", "Legs", "Bikini Line", "Upper Lip"],
  },
  {
    id: "kids",
    name: "Kids",
    icon: Baby,
    treatments: ["Kids Massage", "Kids Manicure", "Kids Facial"],
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070",
];

export default function WellnessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { scrollYProgress } = useScroll();

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const showYoutube = !isMobile;
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0`;

  return (
    <>
      <Header />

      {/* Floating CTA - Mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCTA ? 0 : 100, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <a
          href="tel:+31222317445"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          <Phone size={16} />
          Book Treatment
        </a>
      </motion.div>

      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden bg-navy">
          <div className="absolute inset-0">
            {showYoutube && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <iframe
                  src={youtubeEmbedUrl}
                  title="Wellness background"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setYoutubeLoaded(true)}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw]",
                    "transition-opacity duration-1000",
                    youtubeLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{ border: "none" }}
                />
              </div>
            )}
            <div
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
                showYoutube && youtubeLoaded ? "opacity-0" : "opacity-100"
              )}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070')" }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">Wellness & Spa</span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      Space to Breathe
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-lg text-white/80 max-w-lg mb-8"
              >
                Indoor pool, sauna, and treatments inspired by the healing sea.
                Personal attention with Thalgo products.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
                className="hidden md:flex gap-4"
              >
                <a
                  href="tel:+31222317445"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-shell text-navy font-medium hover:bg-white transition-colors text-sm tracking-wide"
                >
                  <Phone size={16} />
                  Book a Treatment
                </a>
                <a
                  href={treatmentMenuPDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors text-sm tracking-wide"
                >
                  <FileText size={16} />
                  Treatment Menu
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-shell" />
                  <span className="text-white/60">Pool</span>
                  <span>9:00–21:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-shell" />
                  <span className="text-white/60">Salon</span>
                  <span>By appointment</span>
                </div>
                <div className="flex items-center gap-2 text-shell">
                  <Check size={16} />
                  <span>Free sauna for guests</span>
                </div>
              </div>
              <a
                href="tel:+31222317445"
                className="hidden md:inline-flex items-center gap-2 text-shell hover:text-white transition-colors text-sm"
              >
                +31 222 317 445
              </a>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  Our Approach
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  The sea heals
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                  We work exclusively with Thalgo — French marine cosmetics
                  renowned for their purity and effectiveness. Each treatment
                  draws on the restorative power of the sea.
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  Our certified specialists take time to understand your needs.
                  No rush, no routine — just personal attention in a space
                  designed for stillness.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
                  alt="Spa treatment"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                Facilities
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Pool, Sauna & Steam
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

                  {/* Icon badge - neomorphic style */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <facility.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="font-display text-2xl text-white mb-2">{facility.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-3">{facility.description}</p>
                    {facility.highlight && (
                      <span className="inline-flex items-center gap-1.5 text-shell text-sm font-medium">
                        <Check size={14} />
                        {facility.highlight}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatments */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                Treatments
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                Our Treatment Menu
              </h2>
              <p className="text-neutral-600 max-w-xl mx-auto">
                From soothing massages to revitalizing facials.
                Signature Texel treatments and care for the whole family.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {treatmentCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={cn(
                      "neo-card neo-card-hover p-6 text-center",
                      category.featured && "ring-2 ring-shell/30"
                    )}
                  >
                    <div className="neo-icon neo-icon-lg mx-auto mb-5">
                      <Icon size={22} className="text-shell" />
                    </div>
                    <h3 className="font-display text-lg text-ink mb-4">{category.name}</h3>
                    <ul className="space-y-2">
                      {category.treatments.map((treatment) => (
                        <li key={treatment} className="text-sm text-neutral-500">
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* PDF Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <a
                href={treatmentMenuPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide"
              >
                <FileText size={16} />
                View Full Menu with Prices
              </a>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {galleryImages.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative aspect-square overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={src}
                    alt={`Wellness gallery ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <SectionCTA
          icon={Sparkles}
          title="Book Your Treatment"
          description="Our salon is open to everyone, not just hotel guests. Call to reserve your personal wellness experience."
          background="sand"
          actions={[
            { label: "+31 222 317 445", href: "tel:+31222317445", icon: Phone },
            { label: "Email Us", href: "mailto:spa@opduin.nl", variant: "secondary" },
          ]}
        />
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
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Wellness gallery ${lightboxIndex + 1}`}
                width={1920}
                height={1080}
                className="object-contain max-h-[85vh] w-auto"
              />
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="text-sm text-white/60">
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
