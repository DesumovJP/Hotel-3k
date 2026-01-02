"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  staggerContainer,
  fadeInUp,
  defaultViewport,
} from "@/lib/motion";

export interface Testimonial {
  id: number;
  quote: string;
  guestName: string;
  guestLocation?: string;
  rating: number;
  stayDate?: string;
  source?: "direct" | "booking" | "tripadvisor" | "google";
  tags?: string[];
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  variant?: "default" | "carousel" | "grid";
  className?: string;
}

// Source logos/badges
const sourceLabels: Record<string, string> = {
  direct: "Verified Guest",
  booking: "Booking.com",
  tripadvisor: "TripAdvisor",
  google: "Google Reviews",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-4 h-4",
            star <= rating ? "fill-gold text-gold" : "text-ink-200"
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="relative bg-neutral p-8 rounded-2xl shadow-elevation-2 hover:shadow-elevation-3 transition-shadow duration-300"
    >
      {/* Quote icon */}
      <Quote className="absolute top-6 right-6 w-10 h-10 text-sand-400 opacity-50" />

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <blockquote className="text-ink-700 text-body-md leading-relaxed mb-6 relative z-10">
        "{testimonial.quote}"
      </blockquote>

      {/* Author */}
      <footer className="flex items-center justify-between">
        <div>
          <cite className="not-italic font-display text-ink font-medium">
            {testimonial.guestName}
          </cite>
          {testimonial.guestLocation && (
            <p className="text-ink-500 text-body-sm">{testimonial.guestLocation}</p>
          )}
        </div>

        {/* Source badge */}
        {testimonial.source && (
          <span className="text-xs text-ink-400 uppercase tracking-wide">
            {sourceLabels[testimonial.source]}
          </span>
        )}
      </footer>

      {/* Tags */}
      {testimonial.tags && testimonial.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-sand-300">
          {testimonial.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-sand-200 text-ink-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function TestimonialsSection({
  title = "Guest Stories",
  subtitle,
  testimonials,
  variant = "default",
  className,
}: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className={cn("py-section-lg bg-sand-100 relative overflow-hidden", className)}
    >
      {/* Decorative element */}
      <motion.div
        style={{ y: decorY }}
        className="absolute -right-20 top-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
      />

      <div className="px-gutter max-w-content-2xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-display-lg text-ink mb-4">{title}</h2>
            {subtitle && (
              <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.header>

          {/* Testimonials Grid */}
          <div
            className={cn(
              "grid gap-8",
              variant === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            )}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Stats bar */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 flex flex-wrap justify-center gap-12 text-center"
          >
            <div>
              <p className="font-display text-display-md text-gold">9.4</p>
              <p className="text-ink-500 text-body-sm">Booking.com</p>
            </div>
            <div>
              <p className="font-display text-display-md text-gold">4.8</p>
              <p className="text-ink-500 text-body-sm">Google Reviews</p>
            </div>
            <div>
              <p className="font-display text-display-md text-gold">5/5</p>
              <p className="text-ink-500 text-body-sm">TripAdvisor</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default testimonials for development
export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "An absolute sanctuary. The moment we arrived, the stress of city life melted away. The staff anticipated our every need.",
    guestName: "Sophie & Thomas",
    guestLocation: "Amsterdam",
    rating: 5,
    source: "direct",
    tags: ["rooms", "service"],
  },
  {
    id: 2,
    quote: "The wellness spa exceeded all expectations. The treatments were world-class, and the heated outdoor pool with dune views was magical.",
    guestName: "Emma van Berg",
    guestLocation: "Rotterdam",
    rating: 5,
    source: "booking",
    tags: ["wellness", "spa"],
  },
  {
    id: 3,
    quote: "The restaurant is worth the trip alone. Chef's tasting menu featuring local Texel lamb was extraordinary.",
    guestName: "Michael Schneider",
    guestLocation: "Munich",
    rating: 5,
    source: "tripadvisor",
    tags: ["dining"],
  },
  {
    id: 4,
    quote: "Perfect family holiday. The kids loved the beach, and the family suite was spacious and well-equipped.",
    guestName: "The Johnson Family",
    guestLocation: "London",
    rating: 5,
    source: "google",
    tags: ["family"],
  },
];
