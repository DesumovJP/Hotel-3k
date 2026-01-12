"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  ChevronDown,
  SlidersHorizontal,
  X,
  Star,
  Leaf,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import {
  staggerContainer,
  fadeInUp,
  defaultViewport,
  easeOutExpo,
} from "@/lib/motion";
import type {
  WellnessTreatment,
  TreatmentCategory,
  TreatmentFilters,
  TreatmentSort,
  TreatmentSortField,
} from "@/lib/types/wellness";
import { TREATMENT_CATEGORY_LABELS } from "@/lib/types/wellness";

// ============================================
// CATEGORY TABS COMPONENT
// ============================================

interface CategoryTabsProps {
  categories: TreatmentCategory[];
  activeCategory: TreatmentCategory | null;
  onSelect: (category: TreatmentCategory | null) => void;
  treatmentCounts: Record<string, number>;
}

function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
  treatmentCounts,
}: CategoryTabsProps) {
  return (
    <div className="relative">
      {/* Scrollable container */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <nav
          className="flex gap-2 md:flex-wrap md:justify-center min-w-max md:min-w-0"
          role="tablist"
          aria-label="Treatment categories"
        >
          {/* All button */}
          <button
            role="tab"
            aria-selected={activeCategory === null}
            onClick={() => onSelect(null)}
            className={cn(
              "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
              "min-h-[44px] min-w-[44px]",
              activeCategory === null
                ? "bg-deepsea text-white shadow-elevation-2"
                : "bg-sand-200 text-ink-700 hover:bg-sand-300"
            )}
          >
            <span>All</span>
            <span className="ml-2 text-xs opacity-70">
              ({Object.values(treatmentCounts).reduce((a, b) => a + b, 0)})
            </span>
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => onSelect(category)}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                "min-h-[44px] whitespace-nowrap",
                activeCategory === category
                  ? "bg-deepsea text-white shadow-elevation-2"
                  : "bg-sand-200 text-ink-700 hover:bg-sand-300"
              )}
            >
              <span>{TREATMENT_CATEGORY_LABELS[category]}</span>
              {treatmentCounts[category] > 0 && (
                <span className="ml-2 text-xs opacity-70">
                  ({treatmentCounts[category]})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Fade edges on mobile */}
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-sand-100 to-transparent pointer-events-none md:hidden" />
    </div>
  );
}

// ============================================
// FILTER PANEL COMPONENT
// ============================================

interface FilterPanelProps {
  filters: TreatmentFilters;
  onFilterChange: (filters: TreatmentFilters) => void;
  sort: TreatmentSort;
  onSortChange: (sort: TreatmentSort) => void;
  priceRange: { min: number; max: number };
  durationRange: { min: number; max: number };
  isOpen: boolean;
  onToggle: () => void;
}

function FilterPanel({
  filters,
  onFilterChange,
  sort,
  onSortChange,
  priceRange,
  durationRange,
  isOpen,
  onToggle,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minDuration !== undefined ||
    filters.maxDuration !== undefined ||
    filters.isSignature;

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={onToggle}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
            isOpen
              ? "bg-deepsea text-white"
              : "bg-sand-200 text-ink-700 hover:bg-sand-300"
          )}
          aria-expanded={isOpen}
          aria-controls="filter-panel"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-gold" />
          )}
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={`${sort.field}-${sort.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split("-") as [
                TreatmentSortField,
                "asc" | "desc"
              ];
              onSortChange({ field, direction });
            }}
            className="appearance-none bg-sand-200 text-ink-700 text-sm px-4 py-2 pr-8 rounded-lg cursor-pointer hover:bg-sand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Sort treatments"
          >
            <option value="sortOrder-asc">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration-asc">Duration: Short to Long</option>
            <option value="duration-desc">Duration: Long to Short</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
          <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500 pointer-events-none" />
        </div>
      </div>

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl p-6 shadow-elevation-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-3">
                    Price Range
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder={`€${priceRange.min}`}
                      value={filters.minPrice || ""}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          minPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      min={priceRange.min}
                      max={priceRange.max}
                      aria-label="Minimum price"
                    />
                    <span className="text-ink-400">-</span>
                    <input
                      type="number"
                      placeholder={`€${priceRange.max}`}
                      value={filters.maxPrice || ""}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          maxPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      min={priceRange.min}
                      max={priceRange.max}
                      aria-label="Maximum price"
                    />
                  </div>
                </div>

                {/* Duration Range */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-3">
                    Duration (minutes)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder={`${durationRange.min}`}
                      value={filters.minDuration || ""}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          minDuration: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      min={durationRange.min}
                      max={durationRange.max}
                      step={5}
                      aria-label="Minimum duration"
                    />
                    <span className="text-ink-400">-</span>
                    <input
                      type="number"
                      placeholder={`${durationRange.max}`}
                      value={filters.maxDuration || ""}
                      onChange={(e) =>
                        onFilterChange({
                          ...filters,
                          maxDuration: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full px-3 py-2 border border-sand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                      min={durationRange.min}
                      max={durationRange.max}
                      step={5}
                      aria-label="Maximum duration"
                    />
                  </div>
                </div>

                {/* Special Filters */}
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-3">
                    Special
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        onFilterChange({
                          ...filters,
                          isSignature: !filters.isSignature,
                        })
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors",
                        filters.isSignature
                          ? "bg-gold text-deepsea"
                          : "bg-sand-200 text-ink-600 hover:bg-sand-300"
                      )}
                    >
                      <Sparkles className="w-4 h-4" />
                      Signature
                    </button>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-sand-200">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// TREATMENT CARD COMPONENT
// ============================================

interface TreatmentCardProps {
  treatment: WellnessTreatment;
  onBook?: (treatment: WellnessTreatment) => void;
  variant?: "default" | "compact";
}

function TreatmentCard({
  treatment,
  onBook,
  variant = "default",
}: TreatmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      layout
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden",
        "shadow-elevation-1 hover:shadow-elevation-3 transition-shadow duration-500",
        treatment.isSignature && "ring-2 ring-gold ring-offset-2"
      )}
      role="article"
      aria-label={`${treatment.title} treatment`}
    >
      {/* Image */}
      {treatment.image && variant === "default" && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="absolute inset-0"
          >
            <Image
              src={treatment.image.url}
              alt={treatment.image.alternativeText || treatment.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {treatment.isSignature && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold text-deepsea text-xs font-medium rounded-full">
                <Sparkles className="w-3 h-3" />
                Signature
              </span>
            )}
            {treatment.isNew && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-deepsea text-white text-xs font-medium rounded-full">
                <Star className="w-3 h-3" />
                New
              </span>
            )}
            {treatment.category === "texel_specials" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                <Leaf className="w-3 h-3" />
                Local
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Compact badges */}
        {variant === "compact" && (treatment.isSignature || treatment.isNew) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {treatment.isSignature && (
              <span className="inline-flex items-center gap-1 text-xs text-gold font-medium">
                <Sparkles className="w-3 h-3" />
                Signature
              </span>
            )}
            {treatment.isNew && (
              <span className="inline-flex items-center gap-1 text-xs text-deepsea font-medium">
                <Star className="w-3 h-3" />
                New
              </span>
            )}
          </div>
        )}

        {/* Title & Price Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-lg text-ink leading-tight">
            {treatment.title}
          </h3>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-lg text-ink font-medium">
              €{treatment.price}
            </p>
            <p className="text-ink-500 text-xs flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" />
              {treatment.duration} min
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p
            className={cn(
              "text-ink-600 text-sm leading-relaxed",
              !isExpanded && "line-clamp-2"
            )}
          >
            {treatment.shortDescription || treatment.description}
          </p>
          {(treatment.shortDescription || treatment.description).length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gold text-xs mt-2 flex items-center gap-1 hover:underline focus:outline-none focus:underline"
              aria-expanded={isExpanded}
            >
              {isExpanded ? "Show less" : "Read more"}
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          )}
        </div>

        {/* Benefits Tags */}
        {treatment.benefits && treatment.benefits.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {treatment.benefits.slice(0, 3).map((benefit) => (
              <span
                key={benefit}
                className="px-2 py-0.5 bg-sand-100 text-ink-600 text-xs rounded"
              >
                {benefit}
              </span>
            ))}
          </div>
        )}

        {/* Book Button */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={() => onBook?.(treatment)}
            className="group/btn"
          >
            Book Online
            <ExternalLink className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Hover accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gold origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
      />
    </motion.article>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

interface TreatmentCatalogProProps {
  treatments: WellnessTreatment[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  showTabs?: boolean;
  onBook?: (treatment: WellnessTreatment) => void;
  bookingUrl?: string;
  className?: string;
}

export function TreatmentCatalogPro({
  treatments,
  title = "Treatment Menu",
  subtitle = "Discover our curated selection of wellness treatments",
  showFilters = true,
  showTabs = true,
  onBook,
  bookingUrl = "https://book.wellnessliving.com",
  className,
}: TreatmentCatalogProProps) {
  // State
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory | null>(
    null
  );
  const [filters, setFilters] = useState<TreatmentFilters>({});
  const [sort, setSort] = useState<TreatmentSort>({
    field: "sortOrder",
    direction: "asc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate categories and counts
  const categories = useMemo(() => {
    const cats = [...new Set(treatments.map((t) => t.category))];
    return cats.sort();
  }, [treatments]);

  const treatmentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    treatments.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, [treatments]);

  // Calculate ranges for filters
  const priceRange = useMemo(() => {
    const prices = treatments.map((t) => t.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [treatments]);

  const durationRange = useMemo(() => {
    const durations = treatments.map((t) => t.duration);
    return { min: Math.min(...durations), max: Math.max(...durations) };
  }, [treatments]);

  // Filter and sort treatments
  const filteredTreatments = useMemo(() => {
    let result = [...treatments];

    // Category filter
    if (activeCategory) {
      result = result.filter((t) => t.category === activeCategory);
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      result = result.filter((t) => t.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((t) => t.price <= filters.maxPrice!);
    }

    // Duration filter
    if (filters.minDuration !== undefined) {
      result = result.filter((t) => t.duration >= filters.minDuration!);
    }
    if (filters.maxDuration !== undefined) {
      result = result.filter((t) => t.duration <= filters.maxDuration!);
    }

    // Signature filter
    if (filters.isSignature) {
      result = result.filter((t) => t.isSignature);
    }

    // Sort
    result.sort((a, b) => {
      const direction = sort.direction === "asc" ? 1 : -1;
      switch (sort.field) {
        case "price":
          return (a.price - b.price) * direction;
        case "duration":
          return (a.duration - b.duration) * direction;
        case "name":
          return a.title.localeCompare(b.title) * direction;
        case "sortOrder":
        default:
          // Signature treatments first, then by sortOrder
          if (a.isSignature !== b.isSignature) {
            return a.isSignature ? -1 : 1;
          }
          return (a.sortOrder - b.sortOrder) * direction;
      }
    });

    return result;
  }, [treatments, activeCategory, filters, sort]);

  // Handle booking
  const handleBook = useCallback(
    (treatment: WellnessTreatment) => {
      if (onBook) {
        onBook(treatment);
      } else if (treatment.bookingUrl) {
        window.open(treatment.bookingUrl, "_blank", "noopener,noreferrer");
      } else if (bookingUrl) {
        window.open(bookingUrl, "_blank", "noopener,noreferrer");
      }
    },
    [onBook, bookingUrl]
  );

  return (
    <section
      id="treatments"
      className={cn("py-section-lg bg-sand-100", className)}
      aria-labelledby="treatments-title"
    >
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-3 text-gold text-overline tracking-[0.2em] uppercase mb-4">
              <span className="w-8 h-px bg-gold" />
              Our Services
              <span className="w-8 h-px bg-gold" />
            </span>
            <h2
              id="treatments-title"
              className="font-display text-display-lg text-ink mb-4"
            >
              {title}
            </h2>
            <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.header>

          {/* Category Tabs */}
          {showTabs && categories.length > 1 && (
            <motion.div variants={fadeInUp} className="mb-8">
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
                treatmentCounts={treatmentCounts}
              />
            </motion.div>
          )}

          {/* Filters */}
          {showFilters && (
            <motion.div variants={fadeInUp}>
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                sort={sort}
                onSortChange={setSort}
                priceRange={priceRange}
                durationRange={durationRange}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </motion.div>
          )}

          {/* Results count */}
          <motion.div variants={fadeInUp} className="mb-6">
            <p className="text-ink-500 text-sm">
              Showing {filteredTreatments.length} treatment
              {filteredTreatments.length !== 1 ? "s" : ""}
              {activeCategory && (
                <span>
                  {" "}
                  in{" "}
                  <strong className="text-ink-700">
                    {TREATMENT_CATEGORY_LABELS[activeCategory]}
                  </strong>
                </span>
              )}
            </p>
          </motion.div>

          {/* Treatments Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${JSON.stringify(filters)}-${sort.field}-${sort.direction}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredTreatments.map((treatment) => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  onBook={handleBook}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredTreatments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-ink-500 text-lg mb-4">
                No treatments match your filters.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setFilters({});
                  setActiveCategory(null);
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <p className="text-ink-600 mb-4">
              Can't find what you're looking for?
            </p>
            <Link href="/contact">
              <Button variant="secondary">Contact us for custom packages</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default treatments for development
export const defaultWellnessTreatments: WellnessTreatment[] = [
  {
    id: 1,
    documentId: "treatment-1",
    title: "Signature Opduin Massage",
    slug: "signature-opduin-massage",
    category: "massage",
    description: "Our signature full-body massage combines techniques from around the world with locally sourced sea salt and botanical oils. A deeply relaxing 90-minute journey.",
    shortDescription: "Our signature 90-minute full-body massage with local sea salt and botanical oils.",
    duration: 90,
    price: 145,
    isSignature: true,
    isPopular: true,
    isNew: false,
    tags: ["relaxation", "full-body", "aromatherapy"],
    benefits: ["Deep relaxation", "Muscle relief", "Improved circulation"],
    sortOrder: 1,
    image: {
      id: 1,
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
      alternativeText: "Signature massage treatment",
      width: 800,
      height: 600,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 2,
    documentId: "treatment-2",
    title: "Hot Stone Therapy",
    slug: "hot-stone-therapy",
    category: "massage",
    description: "Warm volcanic stones placed on key energy points release deep muscle tension and restore balance.",
    shortDescription: "Volcanic stones therapy for deep muscle tension release.",
    duration: 75,
    price: 125,
    isSignature: false,
    isPopular: true,
    isNew: false,
    tags: ["stones", "heat-therapy"],
    benefits: ["Deep tissue relief", "Energy balance", "Stress reduction"],
    sortOrder: 2,
    image: {
      id: 2,
      url: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800",
      alternativeText: "Hot stone massage",
      width: 800,
      height: 600,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 3,
    documentId: "treatment-3",
    title: "Sea Mineral Facial (Women)",
    slug: "sea-mineral-facial-women",
    category: "facial_women",
    description: "Rejuvenating facial using mineral-rich Wadden Sea seaweed and clay. Deeply cleansing and hydrating.",
    shortDescription: "Rejuvenating facial with Wadden Sea minerals.",
    duration: 60,
    price: 95,
    isSignature: true,
    isPopular: false,
    isNew: false,
    tags: ["hydrating", "anti-aging"],
    benefits: ["Deep hydration", "Skin renewal", "Natural glow"],
    sortOrder: 3,
    image: {
      id: 3,
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
      alternativeText: "Facial treatment",
      width: 800,
      height: 600,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 4,
    documentId: "treatment-4",
    title: "Texel Mud Wrap",
    slug: "texel-mud-wrap",
    category: "texel_specials",
    description: "Detoxifying body wrap using mineral-rich Wadden Sea mud. A true Texel experience.",
    shortDescription: "Authentic Texel body wrap with local Wadden Sea mud.",
    duration: 60,
    price: 85,
    isSignature: false,
    isPopular: false,
    isNew: true,
    tags: ["local", "detox", "texel"],
    benefits: ["Detoxification", "Skin nourishment", "Mineral boost"],
    sortOrder: 4,
    image: {
      id: 4,
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
      alternativeText: "Body wrap treatment",
      width: 800,
      height: 600,
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 5,
    documentId: "treatment-5",
    title: "Express Manicure",
    slug: "express-manicure",
    category: "hands_feet",
    description: "Quick polish and nail care for perfectly groomed hands.",
    shortDescription: "Quick nail care and polish for busy schedules.",
    duration: 30,
    price: 35,
    isSignature: false,
    isPopular: false,
    isNew: false,
    tags: ["quick", "nails"],
    benefits: ["Groomed nails", "Soft hands"],
    sortOrder: 10,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 6,
    documentId: "treatment-6",
    title: "Kids Spa Experience",
    slug: "kids-spa-experience",
    category: "kids",
    description: "A gentle and fun spa experience designed especially for our younger guests.",
    shortDescription: "Fun and gentle spa treatment for children.",
    duration: 30,
    price: 45,
    isSignature: false,
    isPopular: false,
    isNew: true,
    tags: ["family", "gentle"],
    benefits: ["Fun experience", "Gentle products", "Family time"],
    sortOrder: 15,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
];
