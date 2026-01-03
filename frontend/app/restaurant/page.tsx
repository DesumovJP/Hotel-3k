"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { SectionCTA } from "@/components/sections";
import { SplitText } from "@/components/animations";
import { Clock, Phone, Users, ArrowRight, FileText, Wine, Leaf, Sun, UtensilsCrossed, Coffee, Heart, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const YOUTUBE_VIDEO_ID = "8Raur-TG4_A";

const menuPDFs = {
  dinner: "https://www.opduin.nl/upload/files/opduin_menukaart%20EN%20vanaf%2012%20dec.pdf",
  lunch: "https://www.opduin.nl/upload/files/opduin_lunchkaart_A5%20(2).pdf",
};

const localIngredients = [
  {
    icon: UtensilsCrossed,
    title: "Texel Lamb",
    description: "Salt marsh lamb with distinctive flavour from grazing on sea herbs",
  },
  {
    icon: Leaf,
    title: "Island Vegetables",
    description: "From local farms, harvested at peak freshness",
  },
  {
    icon: Wine,
    title: "Wadden Sea Catch",
    description: "Daily fresh fish and shellfish from local fishermen",
  },
];

const diningOptions = [
  {
    title: "Breakfast",
    time: "7:00 – 10:30",
    description: "Extensive buffet for hotel guests. Fresh breads, local cheeses, eggs to order, and island honey.",
    note: "Included for hotel guests",
    icon: Coffee,
  },
  {
    title: "Lunch",
    time: "12:00 – 14:30",
    description: "Light dishes and sandwiches. Perfect after a morning beach walk or cycle tour.",
    note: "Open to all",
    icon: Sun,
  },
  {
    title: "Dinner",
    time: "18:00 – 22:00",
    description: "Multi-course dining experience. Choose 3 to 6 courses showcasing the island's finest.",
    note: "Reservations recommended",
    icon: UtensilsCrossed,
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974",
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974",
];

export default function RestaurantPage() {
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

      {/* Floating Reserve Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCTA ? 0 : 100, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <Link
          href="/book?type=restaurant"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          Reserve a Table
          <ArrowRight size={16} />
        </Link>
      </motion.div>

      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden bg-navy">
          <div className="absolute inset-0">
            {showYoutube && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <iframe
                  src={youtubeEmbedUrl}
                  title="Restaurant background video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setYoutubeLoaded(true)}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "w-[177.78vh] h-[100vh] min-w-[100vw] min-h-[56.25vw]",
                    "pointer-events-none transition-opacity duration-1000",
                    youtubeLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{ border: "none" }}
                />
              </div>
            )}

            <div
              className={cn(
                "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
                showYoutube && youtubeLoaded ? "opacity-0" : "opacity-100"
              )}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974')" }}
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
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Restaurant
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
                      From Sea to Table
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
                Fresh catches, island lamb, seasonal produce. Our kitchen celebrates
                Texel&apos;s bounty with simplicity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
                className="hidden md:flex gap-4"
              >
                <Link
                  href="/book?type=restaurant"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-shell text-navy font-medium hover:bg-white transition-colors text-sm tracking-wide"
                >
                  Reserve a Table
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:+31222317445"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors text-sm tracking-wide"
                >
                  <Phone size={16} />
                  +31 222 317 445
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
                  <span className="text-white/60">Lunch</span>
                  <span>12:00–14:30</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-shell" />
                  <span className="text-white/60">Dinner</span>
                  <span>18:00–22:00</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <span>Smart casual</span>
                </div>
              </div>
              <Link
                href="/book?type=restaurant"
                className="hidden md:inline-flex items-center gap-2 text-shell hover:text-white transition-colors text-sm"
              >
                Reserve now
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Philosophy / Story */}
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
                  Our Philosophy
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  The island on your plate
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                  Every morning, the day&apos;s catch arrives from the harbour.
                  Our lamb grazes on salt marshes just beyond the dunes.
                  Vegetables travel minutes, not miles.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  We don&apos;t chase trends. We honour tradition, respect the seasons,
                  and let exceptional ingredients speak for themselves. Our kitchen
                  has earned recognition for its honest approach to island cuisine.
                </p>

                {/* Wine note */}
                <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-shell">
                  <Wine className="w-5 h-5 text-shell mt-0.5" />
                  <div>
                    <p className="font-medium text-ink mb-1">Curated Wine Selection</p>
                    <p className="text-sm text-neutral-600">
                      Our sommelier pairs each course with wines from small European producers.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1954"
                  alt="Chef preparing fresh ingredients"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Local Ingredients */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                Local Sourcing
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Ingredients with a story
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {localIngredients.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="neo-icon neo-icon-lg mx-auto mb-4">
                      <Icon className="w-6 h-6 text-shell" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-2">{item.title}</h3>
                    <p className="text-neutral-600 text-sm">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dining Options */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                When to Dine
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Three moments, one kitchen
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diningOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="neo-card neo-card-hover p-8 text-center"
                  >
                    <div className="neo-icon neo-icon-lg mx-auto mb-5">
                      <Icon size={22} className="text-shell" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-1">{option.title}</h3>
                    <p className="text-shell text-sm font-medium mb-4">{option.time}</p>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-5">{option.description}</p>
                    <p className="text-xs text-neutral-500 inline-flex items-center gap-1.5">
                      <Check size={12} className="text-shell" />
                      {option.note}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course Menu Section */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Dinner Experience
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                Served in courses
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
                We believe great meals unfold slowly. Choose from 3 to 6 courses
                and let our kitchen guide you through the flavours of Texel —
                from the first amuse to the final sweet note.
              </p>
              <p className="text-neutral-500 mb-10">
                Each course crafted, each moment savoured.
              </p>

              {/* Menu Links */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={menuPDFs.dinner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide"
                >
                  <FileText size={16} />
                  View Dinner Menu
                </a>
                <a
                  href={menuPDFs.lunch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide"
                >
                  <FileText size={16} />
                  View Lunch Menu
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dietary & Terrace */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-sand-50"
              >
                <Heart className="w-8 h-8 text-shell mb-4" />
                <h3 className="font-display text-xl text-ink mb-3">Dietary Requirements</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Vegetarian, vegan, gluten-free, or other dietary needs — our kitchen
                  adapts every course with the same care and creativity. Please inform
                  us when booking.
                </p>
                <p className="text-xs text-neutral-500">All menus available in adjusted versions</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-sand-50"
              >
                <Sun className="w-8 h-8 text-shell mb-4" />
                <h3 className="font-display text-xl text-ink mb-3">Summer Terrace</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  When the weather permits, dine on our terrace overlooking the dunes.
                  Watch the sunset paint the sky as you enjoy your meal. Available for
                  lunch and early dinner.
                </p>
                <p className="text-xs text-neutral-500">May – September, weather permitting</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: easeOutExpo }}
                  className="relative aspect-square overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={src}
                    alt={`Restaurant gallery ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Private Dining CTA */}
        <SectionCTA
          icon={Users}
          title="Private Dining & Events"
          description="Celebrate special occasions in our private dining room. Customized menus, attentive service, and views of the dunes. Perfect for birthdays, anniversaries, or intimate gatherings."
          actions={[
            { label: "Enquire Now", href: "/meetings" },
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
                alt={`Restaurant gallery ${lightboxIndex + 1}`}
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
