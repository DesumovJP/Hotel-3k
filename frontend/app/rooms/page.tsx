"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SplitText } from "@/components/animations";
import { rooms } from "@/lib/data";
import {
  Users, Maximize, ArrowRight, Wifi, Wind, Coffee, ShieldCheck,
  Bed, Eye, ChevronRight, Sparkles, Check
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const viewFilters = [
  { id: "all", label: "All Rooms" },
  { id: "sea", label: "Sea View" },
  { id: "dunes", label: "Dunes" },
  { id: "garden", label: "Garden" },
];

const roomIncludes = [
  { icon: Wifi, label: "Free High-Speed WiFi" },
  { icon: Coffee, label: "Nespresso Machine" },
  { icon: Wind, label: "Climate Control" },
  { icon: ShieldCheck, label: "In-Room Safe" },
  { icon: Sparkles, label: "Daily Housekeeping" },
];

export default function RoomsPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.6]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingCTA(scrolled > windowHeight * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredRooms = activeFilter === "all"
    ? rooms
    : rooms.filter(room => room.view.toLowerCase().includes(activeFilter));

  return (
    <>
      <Header />

      {/* Floating CTA - Mobile */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-neutral-200 md:hidden"
          >
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white text-sm tracking-wide uppercase"
            >
              Check Availability
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-20 md:pb-0">
        {/* Hero */}
        <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden bg-navy">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070"
              alt="Luxurious rooms at Grand Hotel Opduin"
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

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Accommodations
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
                      Rooms & Suites
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
                Each room is a sanctuary designed for rest—natural materials,
                considered details, and views that ground you in Texel.
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

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Bed size={16} className="text-shell" />
                <span>22 Rooms & Suites</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-shell" />
                <span>Sea, Dune & Garden Views</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-shell" />
                <span>Book Direct: Free Sauna & €5 Off</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs + Filter */}
        <section className="py-8 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Rooms & Suites" }]} className="mb-6" />

            {/* View Filter */}
            <div className="flex flex-wrap gap-2">
              {viewFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors",
                    activeFilter === filter.id
                      ? "bg-navy text-white"
                      : "bg-sand-100 text-neutral-600 hover:bg-sand-200"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-20">
              {filteredRooms.map((room, index) => (
                <motion.article
                  key={room.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                    index % 2 === 1 && "lg:grid-flow-dense"
                  )}
                >
                  {/* Image */}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden bg-sand-100 group",
                      index % 2 === 1 && "lg:col-start-2"
                    )}
                  >
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* View Badge */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy text-xs px-3 py-1.5 flex items-center gap-1.5">
                      <Eye size={12} />
                      {room.view}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <span className="text-overline text-shell tracking-widest mb-2 block">
                      {room.size} m² · Up to {room.maxGuests} guests
                    </span>

                    <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">
                      {room.name}
                    </h2>

                    <p className="text-sm text-neutral-500 italic mb-4">
                      {room.tagline}
                    </p>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.features.slice(0, 4).map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-600"
                        >
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 4 && (
                        <span className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-500">
                          +{room.features.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                      >
                        View Details
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={`/book?room=${room.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* All Rooms Include */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                All Rooms Include
              </h2>
              <p className="text-neutral-600 max-w-lg mx-auto">
                Every stay comes with thoughtful amenities and services for your comfort.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {roomIncludes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: easeOutExpo }}
                  className="flex flex-col items-center text-center p-6 bg-white"
                >
                  <item.icon size={24} className="text-shell mb-3" />
                  <span className="text-sm text-neutral-700">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Booking Benefits */}
        <section className="py-6 bg-shell text-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="font-medium">Book Direct Benefits:</span>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    Free Sauna Access
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    €5 Off Per Night
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    Best Rate Guarantee
                  </span>
                </div>
              </div>
              <Link
                href="/book"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2 bg-white text-shell hover:bg-white/90 transition-colors text-sm tracking-wide uppercase"
              >
                Book Direct
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Need Help Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                Need Help Choosing?
              </h2>
              <p className="text-neutral-600 mb-8">
                Our team is here to help you find the perfect room for your stay.
                Whether you're celebrating a special occasion or planning a family getaway,
                we'll match you with the ideal accommodation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:+31222123456"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                >
                  Call +31 222 123 456
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
