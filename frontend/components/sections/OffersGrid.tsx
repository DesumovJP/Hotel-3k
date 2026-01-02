"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, X, Check, Star, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { easeOutExpo, duration, stagger } from "@/lib/motion";
import { generateOfferSchema, toJsonLd } from "@/lib/seo";
import { useFocusTrap, useEscapeKey, useReducedMotion, useScrollLock, useAnnouncer } from "@/lib/accessibility";
import { trackViewContent } from "@/lib/analytics";

interface OfferValueItem {
  label: string;
  included: boolean;
}

interface Offer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  category: "romance" | "wellness" | "adventure" | "family" | "seasonal";
  discountType: "percentage" | "fixed" | "value-add";
  discountValue?: number;
  originalPrice?: number;
  price: number;
  priceLabel?: string;
  valueStack: OfferValueItem[];
  terms: string[];
  dateRange: { start: string; end: string };
  urgencyFlag?: "limited" | "lastMinute" | "popular" | "new";
  minNights?: number;
  maxGuests?: number;
}

const sampleOffers: Offer[] = [
  {
    id: "1",
    slug: "romantic-escape",
    title: "Romantic Escape",
    subtitle: "Two nights of pure romance",
    description: "Celebrate love with a curated experience including champagne, spa treatments, and a candlelit dinner overlooking the dunes.",
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    category: "romance",
    discountType: "value-add",
    price: 595,
    priceLabel: "per couple",
    valueStack: [
      { label: "2 nights in Sea View Suite", included: true },
      { label: "Champagne on arrival", included: true },
      { label: "Couples spa treatment", included: true },
      { label: "4-course dinner", included: true },
      { label: "Late checkout until 2pm", included: true },
    ],
    terms: ["Valid until March 2026", "Subject to availability"],
    dateRange: { start: "2025-01-01", end: "2026-03-31" },
    urgencyFlag: "popular",
    minNights: 2,
    maxGuests: 2,
  },
  {
    id: "2",
    slug: "winter-wellness",
    title: "Winter Wellness",
    subtitle: "Restore body and mind",
    description: "Escape the cold with our warming wellness package. Daily spa access, signature treatments, and healthy gourmet dining.",
    heroImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
    category: "wellness",
    discountType: "percentage",
    discountValue: 25,
    originalPrice: 450,
    price: 338,
    priceLabel: "per night",
    valueStack: [
      { label: "Deluxe Room", included: true },
      { label: "Full spa access daily", included: true },
      { label: "60-min massage", included: true },
      { label: "Wellness breakfast", included: true },
    ],
    terms: ["Minimum 2-night stay", "Valid Jan-Feb 2026"],
    dateRange: { start: "2026-01-01", end: "2026-02-28" },
    urgencyFlag: "new",
    minNights: 2,
  },
  {
    id: "3",
    slug: "early-bird-summer",
    title: "Early Bird Summer",
    subtitle: "Book now, save 20%",
    description: "Plan ahead for the perfect Texel summer holiday. Enjoy beaches, biking, and endless sunsets.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073",
    category: "seasonal",
    discountType: "percentage",
    discountValue: 20,
    originalPrice: 295,
    price: 236,
    priceLabel: "per night",
    valueStack: [
      { label: "Dune View Room", included: true },
      { label: "Breakfast included", included: true },
      { label: "Free bike rental", included: true },
      { label: "Beach basket reservation", included: true },
    ],
    terms: ["Book by March 31, 2026", "Valid Jun-Aug 2026"],
    dateRange: { start: "2026-06-01", end: "2026-08-31" },
    urgencyFlag: "limited",
    minNights: 3,
  },
  {
    id: "4",
    slug: "family-adventure",
    title: "Family Adventure",
    subtitle: "Fun for the whole family",
    description: "Create lasting memories with your family on Texel. Kids activities, seal spotting, and family-friendly dining.",
    heroImage: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1974",
    category: "family",
    discountType: "value-add",
    price: 425,
    priceLabel: "per night",
    valueStack: [
      { label: "Family Suite (up to 4)", included: true },
      { label: "Kids eat free (under 12)", included: true },
      { label: "Ecomare tickets", included: true },
      { label: "Treasure hunt pack", included: true },
    ],
    terms: ["Valid school holidays", "Max 2 adults + 2 children"],
    dateRange: { start: "2025-01-01", end: "2026-12-31" },
    urgencyFlag: "popular",
    minNights: 2,
    maxGuests: 4,
  },
];

const categories = [
  { id: "all", label: "All Offers" },
  { id: "romance", label: "Romance" },
  { id: "wellness", label: "Wellness" },
  { id: "family", label: "Family" },
  { id: "seasonal", label: "Seasonal" },
];

function UrgencyBadge({ type }: { type: Offer["urgencyFlag"] }) {
  if (!type) return null;
  const config = {
    limited: { bg: "bg-red-500", text: "Limited" },
    lastMinute: { bg: "bg-orange-500", text: "Last Minute" },
    popular: { bg: "bg-shell text-navy", text: "Popular" },
    new: { bg: "bg-navy", text: "New" },
  };
  const { bg, text } = config[type];
  return (
    <span className={cn("px-3 py-1.5 text-xs font-medium text-white", bg)}>
      {text}
    </span>
  );
}

function OfferCard({ offer, onSelect, index, isFeatured = false }: {
  offer: Offer;
  onSelect: (offer: Offer) => void;
  index: number;
  isFeatured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: duration.slow,
        delay: index * stagger.tight,
        ease: easeOutExpo,
      }}
      className={cn(
        "group relative cursor-pointer",
        isFeatured && "lg:col-span-2 lg:row-span-2"
      )}
      onClick={() => onSelect(offer)}
    >
      <div className={cn(
        "relative overflow-hidden h-full bg-sand-200",
        isFeatured ? "aspect-[4/5] md:aspect-auto md:min-h-[600px]" : "aspect-[3/4]"
      )}>
        {/* Image */}
        <Image
          src={offer.heroImage}
          alt={offer.title}
          fill
          sizes={isFeatured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <UrgencyBadge type={offer.urgencyFlag} />
          {offer.discountValue && (
            <span className="px-3 py-1.5 bg-white text-navy text-xs font-bold">
              -{offer.discountValue}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
          {/* Category */}
          <span className="text-shell text-xs tracking-widest uppercase mb-2">
            {offer.category}
          </span>

          {/* Title */}
          <h3 className={cn(
            "font-display text-white mb-1",
            isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
          )}>
            {offer.title}
          </h3>
          <p className="text-white/70 text-sm mb-4">{offer.subtitle}</p>

          {/* Inclusions preview */}
          <div className="mb-4">
            {offer.valueStack.slice(0, isFeatured ? 4 : 2).map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm mb-1">
                <Check size={14} className="text-shell flex-shrink-0" />
                <span className="line-clamp-1">{item.label}</span>
              </div>
            ))}
            {offer.valueStack.length > (isFeatured ? 4 : 2) && (
              <span className="text-shell text-sm">
                +{offer.valueStack.length - (isFeatured ? 4 : 2)} more
              </span>
            )}
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between">
            <div className="text-white">
              {offer.originalPrice && (
                <span className="text-white/50 line-through text-sm block">
                  €{offer.originalPrice}
                </span>
              )}
              <span className={cn("font-display", isFeatured ? "text-3xl" : "text-2xl")}>
                €{offer.price}
              </span>
              {offer.priceLabel && (
                <span className="text-white/70 text-sm ml-1">{offer.priceLabel}</span>
              )}
            </div>

            <motion.div
              whileHover={{ x: 4 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-shell group-hover:text-navy transition-all"
            >
              <ArrowRight size={16} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function OfferDetailModal({ offer, onClose }: { offer: Offer; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const announce = useAnnouncer();

  useFocusTrap(modalRef, { enabled: true });
  useEscapeKey(onClose, true);
  useScrollLock(true);

  useEffect(() => {
    announce(`${offer.title} offer details. Press Escape to close.`);
  }, [announce, offer.title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-modal bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Hero */}
        <div className="relative aspect-[21/9]">
          <Image src={offer.heroImage} alt={offer.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-shell text-xs tracking-widest uppercase">{offer.category}</span>
            <h2 className="font-display text-3xl md:text-4xl mt-2">{offer.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <p className="text-lg text-neutral-600 mb-8">{offer.description}</p>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-sand-100">
            <div>
              {offer.originalPrice && (
                <span className="text-neutral-400 line-through text-sm block">€{offer.originalPrice}</span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display text-navy">€{offer.price}</span>
                {offer.priceLabel && <span className="text-neutral-500">{offer.priceLabel}</span>}
              </div>
              {offer.discountValue && (
                <span className="text-green-600 text-sm font-medium">Save {offer.discountValue}%</span>
              )}
            </div>
            <Link href={`/book?offer=${offer.slug}`} className="ml-auto">
              <Button size="lg" className="gap-2">
                Book This Offer
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="font-display text-xl text-ink mb-4">What's Included</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {offer.valueStack.map((item, i) => (
                <li key={i} className={cn("flex items-center gap-3 p-3", item.included ? "bg-green-50" : "bg-neutral-50")}>
                  {item.included ? (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <span className="w-5 h-5 text-neutral-400 text-xs flex items-center justify-center">+€</span>
                  )}
                  <span className={item.included ? "text-neutral-700" : "text-neutral-500"}>
                    {item.label}{!item.included && " (add-on)"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms */}
          <div className="border-t pt-6">
            <h4 className="text-sm font-medium text-ink mb-3">Terms & Conditions</h4>
            <ul className="space-y-1.5">
              {offer.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-500">
                  <span className="text-neutral-300">•</span>
                  {term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface OffersGridProps {
  offers?: Offer[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  className?: string;
}

export function OffersGrid({
  offers = sampleOffers,
  title = "Special Offers",
  subtitle = "Exclusive packages for unforgettable experiences",
  showFilters = true,
  className,
}: OffersGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredOffers = activeCategory === "all"
    ? offers
    : offers.filter((o) => o.category === activeCategory);

  return (
    <section ref={sectionRef} className={cn("py-20 md:py-28 bg-white", className)}>
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: duration.slow, ease: easeOutExpo }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="text-overline text-shell tracking-widest mb-4 block">
                Exclusive Packages
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
                {title}
              </h2>
              <p className="text-neutral-600 mt-4 max-w-lg">{subtitle}</p>
            </div>

            <Link href="/offers" className="group inline-flex items-center gap-3 text-navy hover:text-shell transition-colors">
              <span className="text-sm tracking-wide">View all offers</span>
              <motion.div
                whileHover={{ x: 4 }}
                className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-shell group-hover:border-shell group-hover:text-navy transition-all"
              >
                <ArrowRight size={14} />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: duration.normal, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2 text-sm font-medium transition-all",
                  activeCategory === cat.id
                    ? "bg-navy text-white"
                    : "bg-sand-100 text-neutral-600 hover:bg-sand-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer, index) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onSelect={setSelectedOffer}
                index={index}
                isFeatured={index === 0}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">No offers in this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <OfferDetailModal offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export type { Offer, OfferValueItem };
