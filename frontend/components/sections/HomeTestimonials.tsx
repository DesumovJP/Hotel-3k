"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael",
    location: "Amsterdam",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    rating: 5,
    title: "A perfect anniversary escape",
    quote: "We've traveled to many luxury hotels, but Opduin has something special. The staff remembered our names, the spa treatments were heavenly, and watching the sunset from our balcony was unforgettable. Already planning our return.",
    date: "November 2025",
    roomType: "Dune Suite",
  },
  {
    id: 2,
    name: "Thomas B.",
    location: "Hamburg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    rating: 5,
    title: "The perfect place to disconnect",
    quote: "I needed to escape from work stress, and Texel delivered. The island is beautiful, but the hotel made it special. Morning swims, sauna sessions, and the best seafood I've had in years. Pure relaxation.",
    date: "October 2025",
    roomType: "Sea View Room",
  },
  {
    id: 3,
    name: "Familie de Jong",
    location: "Utrecht",
    image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=200",
    rating: 5,
    title: "Incredible family holiday",
    quote: "The kids loved the beach and bike rides, while we enjoyed the restaurant and spa. The staff went above and beyond to make our children feel welcome. Texel is now our favorite Dutch destination.",
    date: "August 2025",
    roomType: "Family Suite",
  },
];

export function HomeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
            Guest Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
            What our guests say
          </h2>
        </motion.div>

        {/* Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] bg-sand-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800`}
                    alt="Grand Hotel Opduin"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Guest avatar overlay */}
              <div className="absolute bottom-6 left-6 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-white">
                  <p className="font-medium">{current.name}</p>
                  <p className="text-white/70 text-sm">{current.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                {/* Quote icon */}
                <Quote className="w-12 h-12 text-shell/30 mb-6" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-shell fill-shell" />
                  ))}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-4">
                  "{current.title}"
                </h3>

                {/* Quote */}
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                  {current.quote}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span>{current.roomType}</span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                  <span>{current.date}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-12 h-12 border border-neutral-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 border border-neutral-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2 ml-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-shell" : "bg-neutral-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
