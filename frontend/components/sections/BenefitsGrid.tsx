"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Award,
  Leaf,
  Shield,
  Clock,
  Utensils,
  Sparkles,
  Heart,
  MapPin,
  Star,
  Users,
  Info,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { duration, stagger, easeOutExpo, blurInUp, staggerContainer, defaultViewport } from "@/lib/motion";

interface ProofData {
  type: "award" | "certification" | "statistic" | "review";
  title: string;
  description: string;
  source?: string;
  sourceUrl?: string;
  year?: string;
  value?: string;
}

interface BenefitItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  proof?: ProofData;
  highlight?: boolean;
}

const defaultBenefits: BenefitItem[] = [
  {
    id: "location",
    icon: <MapPin className="w-6 h-6" />,
    title: "Prime Beachfront Location",
    description: "Direct access to pristine Texel beaches, 50 meters from the Wadden Sea UNESCO World Heritage site.",
    proof: {
      type: "certification",
      title: "UNESCO World Heritage",
      description: "The Wadden Sea is recognized as one of the most important tidal flat systems in the world.",
      source: "UNESCO",
      sourceUrl: "https://whc.unesco.org/en/list/1314",
      year: "2009",
    },
    highlight: true,
  },
  {
    id: "award",
    icon: <Award className="w-6 h-6" />,
    title: "Award-Winning Hospitality",
    description: "Consistently rated among the top 10 luxury hotels in the Netherlands by leading travel publications.",
    proof: {
      type: "award",
      title: "Traveler's Choice Award",
      description: "Top 10% of hotels worldwide based on guest reviews.",
      source: "TripAdvisor",
      year: "2024",
      value: "4.8/5",
    },
  },
  {
    id: "sustainable",
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainable Luxury",
    description: "Green Key Gold certified. Solar-powered, locally-sourced cuisine, and zero single-use plastics.",
    proof: {
      type: "certification",
      title: "Green Key Gold",
      description: "Highest level of environmental certification for tourism establishments.",
      source: "Green Key International",
      year: "2023",
    },
  },
  {
    id: "dining",
    icon: <Utensils className="w-6 h-6" />,
    title: "Michelin-Recognized Dining",
    description: "Restaurant Opduin features seasonal Texel produce, fresh North Sea catches, and island lamb.",
    proof: {
      type: "award",
      title: "Michelin Bib Gourmand",
      description: "Recognized for exceptional quality cuisine at moderate prices.",
      source: "Michelin Guide",
      year: "2024",
    },
    highlight: true,
  },
  {
    id: "wellness",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Holistic Wellness",
    description: "Luxury spa with thalassotherapy, indoor heated pool, and signature Texel seaweed treatments.",
    proof: {
      type: "statistic",
      title: "Guest Satisfaction",
      description: "Average wellness experience rating from 2,500+ reviews.",
      value: "96%",
    },
  },
  {
    id: "service",
    icon: <Heart className="w-6 h-6" />,
    title: "Personalized Service",
    description: "Dedicated concierge, 24/7 room service, and bespoke island experiences tailored to you.",
    proof: {
      type: "review",
      title: "Guest Review",
      description: "\"The staff remembered our preferences from our last visit. Truly exceptional attention to detail.\"",
      source: "Verified Guest",
      year: "2024",
    },
  },
  {
    id: "guarantee",
    icon: <Shield className="w-6 h-6" />,
    title: "Best Rate Guarantee",
    description: "Book direct for the best available rate, plus complimentary breakfast and late checkout.",
    proof: {
      type: "statistic",
      title: "Price Match",
      description: "We match any lower rate found within 24 hours of booking.",
      value: "100%",
    },
  },
  {
    id: "flexibility",
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Cancellation",
    description: "Free cancellation up to 48 hours before arrival. Plans change, we understand.",
    proof: {
      type: "statistic",
      title: "Booking Confidence",
      description: "Guests rate our booking flexibility.",
      value: "98%",
    },
  },
];

interface BenefitsGridProps {
  benefits?: BenefitItem[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function BenefitsGrid({
  benefits = defaultBenefits,
  title = "Why Choose Grand Hotel Opduin",
  subtitle = "Experience the difference of authentic Dutch hospitality",
  columns = 4,
  className,
}: BenefitsGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className={cn("py-section-lg bg-sand-100", className)}
    >
      <div className="px-gutter max-w-content-2xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={blurInUp}
            className="text-overline text-shell tracking-luxury mb-4 block"
          >
            Our Promise
          </motion.span>
          <motion.h2
            variants={blurInUp}
            className="font-display text-display-lg text-ink mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={blurInUp}
            className="text-body-lg text-neutral-600 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={cn(
            "grid gap-6",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
            />
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: duration.normal }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: <Star className="w-5 h-5 text-shell" />, text: "4.8 Rating" },
            { icon: <Users className="w-5 h-5 text-navy" />, text: "10,000+ Guests" },
            { icon: <Award className="w-5 h-5 text-shell" />, text: "Top 10 NL" },
            { icon: <Leaf className="w-5 h-5 text-green-600" />, text: "Green Key Gold" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-neutral-600"
            >
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Individual Benefit Card with Proof Tooltip
function BenefitCard({
  benefit,
  index,
}: {
  benefit: BenefitItem;
  index: number;
}) {
  const [showProof, setShowProof] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      variants={blurInUp}
      custom={index}
      onMouseEnter={() => setShowProof(true)}
      onMouseLeave={() => setShowProof(false)}
      className={cn(
        "relative p-6 bg-white rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-shadow duration-300",
        benefit.highlight && "ring-2 ring-shell/20"
      )}
    >
      {/* Highlight Badge */}
      {benefit.highlight && (
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-1 bg-shell text-ink text-xs font-medium rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy mb-4">
        {benefit.icon}
      </div>

      {/* Content */}
      <h3 className="font-display text-lg text-ink mb-2 flex items-center gap-2">
        {benefit.title}
        {benefit.proof && (
          <button
            className="text-neutral-400 hover:text-navy transition-colors"
            aria-label="View proof"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </h3>
      <p className="text-sm text-neutral-600 leading-relaxed">
        {benefit.description}
      </p>

      {/* Proof Tooltip */}
      <AnimatePresence>
        {showProof && benefit.proof && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 -bottom-2 translate-y-full z-20"
          >
            <div className="bg-ink text-white rounded-lg p-4 shadow-elevation-4 mx-2">
              {/* Arrow */}
              <div className="absolute -top-2 left-8 w-4 h-4 bg-ink rotate-45" />

              {/* Proof Type Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium rounded",
                    benefit.proof.type === "award" && "bg-shell text-ink",
                    benefit.proof.type === "certification" && "bg-green-500 text-white",
                    benefit.proof.type === "statistic" && "bg-navy-400 text-white",
                    benefit.proof.type === "review" && "bg-purple-500 text-white"
                  )}
                >
                  {benefit.proof.type.charAt(0).toUpperCase() + benefit.proof.type.slice(1)}
                </span>
                {benefit.proof.year && (
                  <span className="text-xs text-white/60">{benefit.proof.year}</span>
                )}
              </div>

              {/* Value (for statistics) */}
              {benefit.proof.value && (
                <div className="text-3xl font-display text-shell mb-2">
                  {benefit.proof.value}
                </div>
              )}

              {/* Title & Description */}
              <h4 className="font-medium text-sm mb-1">{benefit.proof.title}</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {benefit.proof.description}
              </p>

              {/* Source */}
              {benefit.proof.source && (
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/50">
                    Source: {benefit.proof.source}
                  </span>
                  {benefit.proof.sourceUrl && (
                    <a
                      href={benefit.proof.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-shell hover:text-shell-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
