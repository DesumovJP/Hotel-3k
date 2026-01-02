"use client";

import { motion } from "framer-motion";
import { Check, Calendar, Clock, Tag, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

export interface OfferDetailData {
  id: number;
  title: string;
  slug: string;
  subtitle?: string;
  category: string;
  description: string;
  heroImage: string;
  gallery?: string[];
  price: number;
  originalPrice?: number;
  priceLabel?: string;
  discountPercent?: number;
  valueStack: { title: string; isIncluded: boolean; isHighlight?: boolean }[];
  dateRanges?: { startDate: string; endDate: string; label?: string }[];
  terms?: string[];
  minimumNights?: number;
  urgencyFlag?: string;
  applicableRooms?: { id: number; name: string }[];
}

interface OfferDetailProps {
  offer: OfferDetailData;
  onBook?: () => void;
  className?: string;
}

const urgencyBadges: Record<string, { label: string; color: string }> = {
  limited: { label: "Limited Availability", color: "bg-red-500" },
  lastMinute: { label: "Last Minute Deal", color: "bg-orange-500" },
  popular: { label: "Most Popular", color: "bg-gold" },
  new: { label: "New Offer", color: "bg-green-500" },
  endingSoon: { label: "Ending Soon", color: "bg-red-500" },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function OfferDetail({ offer, onBook, className }: OfferDetailProps) {
  const urgency = offer.urgencyFlag ? urgencyBadges[offer.urgencyFlag] : null;
  const hasDiscount = offer.originalPrice && offer.originalPrice > offer.price;
  const discountPercent = hasDiscount
    ? Math.round(((offer.originalPrice! - offer.price) / offer.originalPrice!) * 100)
    : offer.discountPercent;

  return (
    <section className={cn("py-section-lg bg-neutral", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div variants={fadeInUp}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={offer.heroImage}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />

                {/* Urgency badge */}
                {urgency && (
                  <span className={cn("absolute top-4 left-4 px-3 py-1 text-white text-sm font-medium rounded-full", urgency.color)}>
                    {urgency.label}
                  </span>
                )}

                {/* Discount badge */}
                {discountPercent && (
                  <span className="absolute top-4 right-4 bg-gold text-white px-3 py-1 text-sm font-bold rounded-full">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnail gallery */}
              {offer.gallery && offer.gallery.length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {offer.gallery.map((img, i) => (
                    <button
                      key={i}
                      className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-gold transition-colors"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div variants={fadeInUp}>
              {/* Category */}
              <span className="text-gold text-overline uppercase tracking-widest">
                {offer.category}
              </span>

              {/* Title */}
              <h1 className="font-display text-display-lg text-ink mt-2 mb-2">
                {offer.title}
              </h1>

              {/* Subtitle */}
              {offer.subtitle && (
                <p className="text-ink-500 text-body-lg mb-6">{offer.subtitle}</p>
              )}

              {/* Description */}
              <div className="prose prose-ink mb-8">
                <p className="text-ink-700 leading-relaxed">{offer.description}</p>
              </div>

              {/* Value Stack */}
              <div className="bg-sand-100 rounded-xl p-6 mb-8">
                <h3 className="font-display text-lg text-ink mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {offer.valueStack.map((item, i) => (
                    <li
                      key={i}
                      className={cn(
                        "flex items-start gap-3",
                        item.isHighlight && "text-gold font-medium"
                      )}
                    >
                      <Check
                        className={cn(
                          "w-5 h-5 flex-shrink-0 mt-0.5",
                          item.isIncluded ? (item.isHighlight ? "text-gold" : "text-green-500") : "text-ink-300"
                        )}
                      />
                      <span className={item.isIncluded ? "text-ink-700" : "text-ink-400 line-through"}>
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA */}
              <div className="bg-deepsea rounded-xl p-6 text-neutral mb-8">
                <div className="flex items-baseline gap-3 mb-4">
                  {hasDiscount && (
                    <span className="text-neutral/60 line-through text-lg">
                      €{offer.originalPrice}
                    </span>
                  )}
                  <span className="font-display text-display-md text-neutral">
                    €{offer.price}
                  </span>
                  {offer.priceLabel && (
                    <span className="text-neutral/70">{offer.priceLabel}</span>
                  )}
                </div>

                <Button variant="primary" size="lg" fullWidth onClick={onBook}>
                  Book This Offer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-center text-neutral/60 text-sm mt-3">
                  Best price guarantee • Instant confirmation
                </p>
              </div>

              {/* Date ranges */}
              {offer.dateRanges && offer.dateRanges.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-ink flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    Valid Dates
                  </h4>
                  <div className="space-y-2">
                    {offer.dateRanges.map((range, i) => (
                      <div key={i} className="flex justify-between text-ink-600 text-sm">
                        <span>{range.label || `Period ${i + 1}`}</span>
                        <span>
                          {formatDate(range.startDate)} - {formatDate(range.endDate)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Minimum nights */}
              {offer.minimumNights && offer.minimumNights > 1 && (
                <p className="flex items-center gap-2 text-ink-600 text-sm mb-6">
                  <Clock className="w-4 h-4" />
                  Minimum stay: {offer.minimumNights} nights
                </p>
              )}

              {/* Applicable rooms */}
              {offer.applicableRooms && offer.applicableRooms.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-ink flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-gold" />
                    Available for
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.applicableRooms.map((room) => (
                      <span
                        key={room.id}
                        className="px-3 py-1 bg-sand-200 text-ink-700 text-sm rounded-full"
                      >
                        {room.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Terms */}
              {offer.terms && offer.terms.length > 0 && (
                <div className="p-4 bg-sand-100 rounded-lg">
                  <h4 className="font-medium text-ink flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-gold" />
                    Terms & Conditions
                  </h4>
                  <ul className="text-ink-600 text-sm space-y-1">
                    {offer.terms.map((term, i) => (
                      <li key={i}>• {term}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Default offer data
export const defaultOfferDetail: OfferDetailData = {
  id: 1,
  title: "Romantic Escape",
  slug: "romantic-escape",
  subtitle: "Two nights of pure romance",
  category: "Romance",
  description: "Celebrate love with a romantic getaway designed for couples. Enjoy champagne upon arrival, a relaxing couples massage at our spa, and an unforgettable candlelit dinner prepared by our executive chef.",
  heroImage: "/images/offers/romantic-escape.jpg",
  price: 699,
  originalPrice: 850,
  priceLabel: "per couple",
  valueStack: [
    { title: "2 nights in Sea View Suite", isIncluded: true, isHighlight: true },
    { title: "Champagne & chocolates on arrival", isIncluded: true },
    { title: "Couples massage (90 min)", isIncluded: true, isHighlight: true },
    { title: "4-course candlelit dinner", isIncluded: true },
    { title: "Late checkout (2pm)", isIncluded: true },
    { title: "Rose petal turndown service", isIncluded: true },
  ],
  dateRanges: [
    { startDate: "2026-02-01", endDate: "2026-12-20", label: "Year-round" },
  ],
  minimumNights: 2,
  urgencyFlag: "popular",
  applicableRooms: [
    { id: 3, name: "Sea View Suite" },
    { id: 4, name: "Penthouse Suite" },
  ],
  terms: [
    "Subject to availability",
    "Non-refundable within 7 days of arrival",
    "Cannot be combined with other offers",
  ],
};
