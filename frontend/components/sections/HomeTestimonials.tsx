"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael",
    location: "Amsterdam",
    rating: 5,
    quote: "The staff remembered our names, the spa treatments were heavenly, and watching the sunset from our balcony was unforgettable.",
    stayType: "Anniversary Escape",
  },
  {
    id: 2,
    name: "Thomas B.",
    location: "Hamburg",
    rating: 5,
    quote: "Morning swims, sauna sessions, and the best seafood I've had in years. The perfect place to disconnect and find stillness.",
    stayType: "Wellness Retreat",
  },
  {
    id: 3,
    name: "Familie de Jong",
    location: "Utrecht",
    rating: 5,
    quote: "The kids loved the beach and bike rides, while we enjoyed the restaurant and spa. Texel is now our favorite Dutch destination.",
    stayType: "Family Holiday",
  },
];

export function HomeTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-12"
        >
          <span className="text-overline text-shell tracking-widest mb-3 block">
            Guest Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-ink">
            What our guests say
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="text-center"
            >
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-shell fill-shell" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-snug mb-8 italic">
                "{current.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-ink font-medium">{current.name}</p>
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <span>{current.location}</span>
                  <span className="w-1 h-1 bg-shell rounded-full" />
                  <span>{current.stayType}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-11 h-11 border border-sand-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-shell w-6"
                      : "bg-sand-300 hover:bg-sand-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-11 h-11 border border-sand-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 pt-8 border-t border-sand-200"
        >
          <div className="flex items-center justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display text-ink">9.2</span>
              <span>Guest Rating</span>
            </div>
            <div className="w-px h-6 bg-sand-200" />
            <div>
              <span className="text-ink font-medium">1,200+</span> verified reviews
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
