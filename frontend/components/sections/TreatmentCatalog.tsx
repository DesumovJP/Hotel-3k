"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Euro, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

export interface Treatment {
  id: number;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  category: string;
  isSignature?: boolean;
  image?: string;
}

interface TreatmentCatalogProps {
  title?: string;
  subtitle?: string;
  treatments: Treatment[];
  categories?: string[];
  onBook?: (treatment: Treatment) => void;
  className?: string;
}

function TreatmentCard({
  treatment,
  onBook,
}: {
  treatment: Treatment;
  onBook?: (t: Treatment) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "bg-neutral rounded-xl overflow-hidden shadow-elevation-1 hover:shadow-elevation-2 transition-shadow",
        treatment.isSignature && "ring-2 ring-gold"
      )}
    >
      {/* Image */}
      {treatment.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <motion.img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Badge */}
        {treatment.isSignature && (
          <span className="inline-flex items-center gap-1 text-xs text-gold font-medium mb-2">
            <Sparkles className="w-3 h-3" />
            Signature Treatment
          </span>
        )}

        {/* Title & Meta */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-lg text-ink">{treatment.name}</h3>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-lg text-ink">€{treatment.price}</p>
            <p className="text-ink-500 text-xs flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" />
              {treatment.duration} min
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-ink-600 text-body-sm leading-relaxed",
            !isExpanded && "line-clamp-2"
          )}
        >
          {treatment.description}
        </p>

        {treatment.description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gold text-xs mt-2 flex items-center gap-1 hover:underline"
          >
            {isExpanded ? "Show less" : "Read more"}
            <ChevronDown
              className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")}
            />
          </button>
        )}

        {/* Book button */}
        <Button
          variant="secondary"
          size="sm"
          className="w-full mt-4"
          onClick={() => onBook?.(treatment)}
        >
          Book Treatment
        </Button>
      </div>
    </motion.article>
  );
}

export function TreatmentCatalog({
  title = "Treatment Menu",
  subtitle,
  treatments,
  categories,
  onBook,
  className,
}: TreatmentCatalogProps) {
  const allCategories = categories || [...new Set(treatments.map((t) => t.category))];
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTreatments = activeCategory
    ? treatments.filter((t) => t.category === activeCategory)
    : treatments;

  return (
    <section className={cn("py-section-lg bg-sand-100", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-display text-display-lg text-ink mb-4">{title}</h2>
            {subtitle && (
              <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.header>

          {/* Category filters */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-body-sm transition-colors min-h-[44px]",
                !activeCategory
                  ? "bg-deepsea text-neutral"
                  : "bg-sand-300 text-ink-700 hover:bg-sand-400"
              )}
            >
              All Treatments
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-body-sm transition-colors min-h-[44px]",
                  activeCategory === category
                    ? "bg-deepsea text-neutral"
                    : "bg-sand-300 text-ink-700 hover:bg-sand-400"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Treatments grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTreatments.map((treatment) => (
                <TreatmentCard key={treatment.id} treatment={treatment} onBook={onBook} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// Default treatments data
export const defaultTreatments: Treatment[] = [
  {
    id: 1,
    name: "Signature Opduin Massage",
    description: "Our signature full-body massage combines techniques from around the world with locally sourced sea salt and botanical oils. A deeply relaxing experience that melts away tension.",
    duration: 90,
    price: 145,
    category: "Massage",
    isSignature: true,
  },
  {
    id: 2,
    name: "Hot Stone Therapy",
    description: "Warm volcanic stones are placed on key points of the body to release muscle tension and improve circulation.",
    duration: 75,
    price: 125,
    category: "Massage",
  },
  {
    id: 3,
    name: "Sea Mineral Facial",
    description: "Harness the power of the Wadden Sea with this rejuvenating facial using mineral-rich seaweed and sea clay.",
    duration: 60,
    price: 95,
    category: "Facials",
    isSignature: true,
  },
  {
    id: 4,
    name: "Couples Retreat",
    description: "Share the relaxation with your partner. Side-by-side massages in our couples suite with champagne.",
    duration: 120,
    price: 295,
    category: "Packages",
  },
  {
    id: 5,
    name: "Texel Mud Wrap",
    description: "Detoxifying body wrap using mineral-rich Wadden Sea mud. Deeply cleansing and nourishing.",
    duration: 60,
    price: 85,
    category: "Body",
  },
  {
    id: 6,
    name: "Relaxation Massage",
    description: "Classic Swedish massage focused on relaxation and stress relief.",
    duration: 60,
    price: 95,
    category: "Massage",
  },
];
