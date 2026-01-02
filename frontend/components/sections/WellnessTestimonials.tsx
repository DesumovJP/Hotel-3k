"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  staggerContainer,
  fadeInUp,
  defaultViewport,
  easeOutExpo,
} from "@/lib/motion";
import type { WellnessTestimonial, TestimonialSource } from "@/lib/types/wellness";

// ============================================
// HELPER COMPONENTS
// ============================================

const SOURCE_LABELS: Record<TestimonialSource, { label: string; color: string }> = {
  direct: { label: "Verified Guest", color: "bg-gold" },
  booking: { label: "Booking.com", color: "bg-blue-600" },
  tripadvisor: { label: "TripAdvisor", color: "bg-green-600" },
  google: { label: "Google", color: "bg-red-500" },
  spa_finder: { label: "Spa Finder", color: "bg-purple-600" },
};

function StarRating({ rating, size = "default" }: { rating: number; size?: "sm" | "default" }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            star <= rating ? "fill-gold text-gold" : "text-sand-300",
            size === "sm" ? "w-3 h-3" : "w-5 h-5"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// ============================================
// CAROUSEL TESTIMONIAL CARD
// ============================================

interface TestimonialSlideProps {
  testimonial: WellnessTestimonial;
  isActive: boolean;
}

function TestimonialSlide({ testimonial, isActive }: TestimonialSlideProps) {
  const source = SOURCE_LABELS[testimonial.source];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className={cn(
        "relative bg-white rounded-3xl p-8 md:p-12 shadow-elevation-3",
        "transition-all duration-500",
        !isActive && "pointer-events-none"
      )}
    >
      {/* Quote Icon */}
      <Quote
        className="absolute top-6 right-6 w-12 h-12 text-sand-200 opacity-50"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Rating */}
        <div className="mb-6">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote */}
        <blockquote className="font-display text-xl md:text-2xl text-ink leading-relaxed mb-8">
          "{testimonial.quote}"
        </blockquote>

        {/* Treatment Tag */}
        {testimonial.treatment && (
          <div className="mb-6">
            <span className="inline-flex items-center px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">
              {testimonial.treatment}
            </span>
          </div>
        )}

        {/* Author */}
        <footer className="flex items-center gap-4">
          {testimonial.avatar ? (
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <Image
                src={testimonial.avatar.url}
                alt=""
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-sand-200 flex items-center justify-center">
              <span className="text-xl font-display text-ink-400">
                {testimonial.guestName.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <cite className="not-italic font-medium text-ink">
              {testimonial.guestName}
            </cite>
            {testimonial.guestLocation && (
              <p className="text-ink-500 text-sm">{testimonial.guestLocation}</p>
            )}
          </div>
          {source && (
            <span
              className={cn(
                "px-3 py-1 text-white text-xs rounded-full",
                source.color
              )}
            >
              {source.label}
            </span>
          )}
        </footer>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN CAROUSEL COMPONENT
// ============================================

interface WellnessTestimonialsProps {
  testimonials: WellnessTestimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export function WellnessTestimonials({
  testimonials,
  title = "What Our Guests Say",
  subtitle = "Real experiences from our wellness visitors",
  autoplay = true,
  autoplayInterval = 6000,
  className,
}: WellnessTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = testimonials.length;

  // Navigation handlers
  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay logic
  useEffect(() => {
    if (isPlaying && totalSlides > 1) {
      intervalRef.current = setInterval(goNext, autoplayInterval);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, goNext, autoplayInterval, totalSlides]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      intervalRef.current = setInterval(goNext, autoplayInterval);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  if (testimonials.length === 0) return null;

  return (
    <section
      className={cn("py-section-lg bg-sand-100 relative overflow-hidden", className)}
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-deepsea/5 rounded-full blur-3xl" />
      </div>

      <div className="px-gutter max-w-content-xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-3 text-gold text-overline tracking-[0.2em] uppercase mb-4">
              <span className="w-8 h-px bg-gold" />
              Testimonials
              <span className="w-8 h-px bg-gold" />
            </span>
            <h2
              id="testimonials-title"
              className="font-display text-display-lg text-ink mb-4"
            >
              {title}
            </h2>
            <p className="text-ink-600 text-body-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          </motion.header>

          {/* Carousel */}
          <motion.div
            variants={fadeInUp}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Testimonials carousel"
          >
            {/* Slides */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="w-full"
                >
                  <TestimonialSlide
                    testimonial={testimonials[currentIndex]}
                    isActive={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {totalSlides > 1 && (
              <>
                {/* Arrow Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                  <button
                    onClick={goPrev}
                    className={cn(
                      "pointer-events-auto p-3 rounded-full bg-white shadow-elevation-2",
                      "hover:bg-sand-50 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                      "-translate-x-1/2 md:-translate-x-full"
                    )}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-6 h-6 text-ink" />
                  </button>
                  <button
                    onClick={goNext}
                    className={cn(
                      "pointer-events-auto p-3 rounded-full bg-white shadow-elevation-2",
                      "hover:bg-sand-50 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                      "translate-x-1/2 md:translate-x-full"
                    )}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-6 h-6 text-ink" />
                  </button>
                </div>

                {/* Dots & Play/Pause */}
                <div className="flex items-center justify-center gap-6 mt-8">
                  {/* Dots */}
                  <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        role="tab"
                        aria-selected={index === currentIndex}
                        aria-label={`Go to testimonial ${index + 1}`}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all duration-300",
                          "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2",
                          index === currentIndex
                            ? "bg-gold w-8"
                            : "bg-sand-300 hover:bg-sand-400"
                        )}
                      />
                    ))}
                  </div>

                  {/* Play/Pause */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn(
                      "p-2 rounded-full border border-sand-300",
                      "hover:bg-sand-100 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                    )}
                    aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 text-ink-500" />
                    ) : (
                      <Play className="w-4 h-4 text-ink-500" />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-sand-200 rounded-full overflow-hidden mt-4">
                  <motion.div
                    key={currentIndex}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPlaying ? 1 : 0 }}
                    transition={{
                      duration: isPlaying ? autoplayInterval / 1000 : 0,
                      ease: "linear",
                    }}
                    className="h-full bg-gold origin-left"
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-sand-200"
          >
            <div className="text-center">
              <p className="font-display text-3xl text-gold mb-1">9.6</p>
              <p className="text-ink-500 text-sm">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl text-gold mb-1">500+</p>
              <p className="text-ink-500 text-sm">Happy Guests</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl text-gold mb-1">98%</p>
              <p className="text-ink-500 text-sm">Would Recommend</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default testimonials data
export const defaultWellnessTestimonials: WellnessTestimonial[] = [
  {
    id: 1,
    documentId: "testimonial-1",
    quote:
      "The Signature Opduin Massage was absolutely divine. The therapist knew exactly where I held tension and worked miracles. I left feeling like a new person.",
    guestName: "Emma van der Berg",
    guestLocation: "Amsterdam",
    rating: 5,
    source: "direct",
    treatment: "Signature Opduin Massage",
    isHighlighted: true,
    tags: ["massage", "relaxation"],
    createdAt: "2024-06-15",
    publishedAt: "2024-06-15",
  },
  {
    id: 2,
    documentId: "testimonial-2",
    quote:
      "The pool area with views over the dunes is magical. We spent hours there between treatments. The whole experience was incredibly peaceful.",
    guestName: "Michael & Sarah",
    guestLocation: "London",
    rating: 5,
    source: "booking",
    treatment: "Couples Retreat Package",
    isHighlighted: true,
    tags: ["couples", "facilities"],
    createdAt: "2024-05-20",
    publishedAt: "2024-05-20",
  },
  {
    id: 3,
    documentId: "testimonial-3",
    quote:
      "The Sea Mineral Facial left my skin glowing for weeks. The use of local Wadden Sea ingredients makes it truly unique. Highly recommend!",
    guestName: "Julia Schmidt",
    guestLocation: "Munich",
    rating: 5,
    source: "tripadvisor",
    treatment: "Sea Mineral Facial",
    isHighlighted: false,
    tags: ["facial", "skincare"],
    createdAt: "2024-04-10",
    publishedAt: "2024-04-10",
  },
  {
    id: 4,
    documentId: "testimonial-4",
    quote:
      "As someone who visits spas regularly, I can say Opduin Wellness stands out. The attention to detail, the quality of products, and the genuine care from staff is exceptional.",
    guestName: "David Jansen",
    guestLocation: "Rotterdam",
    rating: 5,
    source: "google",
    isHighlighted: true,
    tags: ["service", "quality"],
    createdAt: "2024-03-25",
    publishedAt: "2024-03-25",
  },
];
