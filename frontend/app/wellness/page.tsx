"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { SectionHero, SectionCTA } from "@/components/sections";
import { Clock, Phone, Waves, Flame, Droplets, Sparkles, Heart, Baby, Hand, Footprints, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const facilities = [
  {
    id: "pool",
    name: "Swimming Pool",
    description: "Heated indoor pool with Jacuzzi and children's pool. Swimming lessons on Tuesdays.",
    icon: Waves,
    highlight: "Non-guests: €9 adults, €5 children",
    image: "/wellness/zwembad-600x450_1.jpg",
  },
  {
    id: "sauna",
    name: "Finnish Sauna & Steam Bath",
    description: "Traditional Finnish sauna and Turkish steam bath. Customary use without swimwear during free hours.",
    icon: Flame,
    highlight: "Free for guests 16:30-19:00",
    image: "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  },
  {
    id: "solarium",
    name: "Solarium",
    description: "Quick tanning service available for guests and visitors.",
    icon: Droplets,
    highlight: "€11 per session",
    image: "/wellness/solarium-600x450.jpg",
  },
];

const treatmentCategories = [
  {
    id: "massage",
    name: "Massage",
    icon: Hand,
    image: "/wellness/massage-600x400_2.jpg",
    treatments: [
      { name: "Relaxing Massage", duration: "25 min", price: "€50" },
      { name: "Relaxing Massage", duration: "55 min", price: "€85" },
      { name: "Hot Stone Massage", duration: "40 min", price: "€70" },
      { name: "Hot Stone Massage", duration: "75 min", price: "€110" },
      { name: "Scalp Massage", duration: "15 min", price: "€25" },
    ],
  },
  {
    id: "facial-women",
    name: "Facial (Women)",
    icon: Sparkles,
    image: "/wellness/gezichtsbehandelingen-dames-600x400_1.jpg",
    treatments: [
      { name: "Sea Treatment", duration: "55 min", price: "€85" },
      { name: "Organic Facial", duration: "40 min", price: "€65" },
      { name: "Anti-Aging Treatment", duration: "90 min", price: "€135" },
    ],
  },
  {
    id: "facial-men",
    name: "Facial (Men)",
    icon: Sparkles,
    image: "/wellness/gezichtsbehandelingen-heren-600x400_1.jpg",
    treatments: [
      { name: "Men's Facial", duration: "55 min", price: "€85" },
      { name: "Men's Deluxe Facial", duration: "90 min", price: "€110" },
    ],
  },
  {
    id: "body",
    name: "Body Treatments",
    icon: Heart,
    image: "/wellness/lichaamsbehandelingen-600x400_2.jpg",
    treatments: [
      { name: "Body Peeling", duration: "30 min", price: "€60" },
      { name: "Algae Packing", duration: "45 min", price: "€85" },
      { name: "Pregnancy Treatment", duration: "60 min", price: "€110" },
    ],
  },
  {
    id: "texel",
    name: "Texel Treatments",
    icon: Waves,
    featured: true,
    image: "/wellness/texelse-behandelingen-600x400_2.jpg",
    treatments: [
      { name: "Texel Feet (honey & sheepscream)", duration: "25 min", price: "€40" },
      { name: "Texel Feeling", duration: "55 min", price: "€85" },
      { name: "Opduin Feeling Deluxe", duration: "90 min", price: "€130" },
    ],
  },
  {
    id: "hands-feet",
    name: "Hands & Feet",
    icon: Footprints,
    image: "/wellness/handen-en-voeten-600x400_1.jpg",
    treatments: [
      { name: "Manicure", duration: "35 min", price: "€50" },
      { name: "Luxury Manicure", duration: "55 min", price: "€75" },
      { name: "Pedicure", duration: "45 min", price: "€65" },
      { name: "Foot Reflex Massage", duration: "55 min", price: "€85" },
    ],
  },
  {
    id: "kids",
    name: "Kids Wellness",
    icon: Baby,
    image: "/wellness/kinder-wellness-600x400.jpg",
    treatments: [
      { name: "Kids Massage", duration: "25 min", price: "€29" },
      { name: "Kids Manicure", duration: "25 min", price: "€29" },
      { name: "Kids Facial", duration: "25 min", price: "€29" },
    ],
  },
];

const galleryImages = [
  "/wellness/zwembad-600x450_1.jpg",
  "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  "/wellness/massage-600x400_2.jpg",
  "/wellness/openingstijden-beautysalon-600x450.jpg",
];

export default function WellnessPage() {
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
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

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
        <SectionHero
          label="Wellness in Opduin"
          title="Personal Attention"
          description="There is nothing like personal attention. Our certified beauty specialists work with Thalgo — light and fresh quality products with its origin from the sea."
          backgroundImage="/wellness/zwembad-600x450_1.jpg"
          youtubeId="6JUXaDyk4Lo"
          primaryAction={{
            label: "Book a Treatment",
            href: "tel:+31222317445",
            icon: Phone,
          }}
        />

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
                  Beauty Salon
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  Thalgo Marine Cosmetics
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                  Our certified beauty specialists work with Thalgo — light and fresh
                  quality products with its origin from the sea. French marine cosmetics
                  renowned for their purity and effectiveness.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  All treatments are by appointment only and accessible to non-guests as well.
                  Book your treatment by phone or check availability in our online booking tool.
                </p>
                <p className="text-neutral-500 text-sm">
                  For private sauna bookings: €12.50 per person per hour.
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
                  src="/wellness/openingstijden-beautysalon-600x450.jpg"
                  alt="Beauty Salon Opduin"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <motion.div
                  key={facility.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="neo-card neo-card-hover p-3 group"
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-center text-center">
                      <facility.icon className="w-12 h-12 text-shell mx-auto mb-6" />
                      <h3 className="font-display text-2xl text-white mb-4">{facility.name}</h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">{facility.description}</p>
                      {facility.highlight && (
                        <p className="text-shell font-medium text-lg">{facility.highlight}</p>
                      )}
                    </div>
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
                Signature Texel treatments with local honey and Noordkroon sheepscream.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      "neo-card neo-card-hover p-3 group",
                      category.featured && "ring-2 ring-shell"
                    )}
                  >
                    <div className="relative h-[300px] rounded-xl overflow-hidden">
                      {/* Background Image */}
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-navy/75 group-hover:bg-navy/70 transition-colors" />

                      {/* Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-5">
                          <Icon size={22} className="text-shell" />
                          <h3 className="font-display text-xl text-white">{category.name}</h3>
                        </div>

                        {/* Treatments list */}
                        <div className="space-y-2 w-full text-left">
                          {category.treatments.map((treatment, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-white text-left">{treatment.name}</span>
                              <span className="text-shell font-medium flex-shrink-0 ml-2">{treatment.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

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
          description="Our salon is open to everyone, not just hotel guests. All treatments are by appointment only. Call to reserve your personal wellness experience."
          background="sand"
          actions={[
            { label: "+31 222 317 445", href: "tel:+31222317445", icon: Phone },
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
