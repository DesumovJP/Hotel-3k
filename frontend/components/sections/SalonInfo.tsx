"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Clock,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import {
  staggerContainer,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  defaultViewport,
} from "@/lib/motion";
import type { SalonInfo as SalonInfoType, OpeningHours } from "@/lib/types/wellness";

// ============================================
// OPENING HOURS COMPONENT
// ============================================

interface OpeningHoursDisplayProps {
  hours: OpeningHours;
}

function OpeningHoursDisplay({ hours }: OpeningHoursDisplayProps) {
  const schedule = [
    { label: "Monday - Friday", time: hours.mondayToFriday },
    { label: "Saturday", time: hours.saturday },
    { label: "Sunday", time: hours.sunday },
  ];

  return (
    <div className="space-y-3">
      {schedule.map((item) => (
        <div
          key={item.label}
          className="flex justify-between items-center py-2 border-b border-sand-200 last:border-0"
        >
          <span className="text-ink-600 text-sm">{item.label}</span>
          <span className="text-ink font-medium text-sm">{item.time}</span>
        </div>
      ))}
      {hours.holidays && (
        <div className="flex justify-between items-center py-2 text-gold">
          <span className="text-sm">Holidays</span>
          <span className="font-medium text-sm">{hours.holidays}</span>
        </div>
      )}
      {hours.notes && (
        <p className="text-ink-500 text-xs mt-4 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {hours.notes}
        </p>
      )}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

interface SalonInfoProps {
  info: SalonInfoType;
  variant?: "compact" | "full" | "split";
  showBooking?: boolean;
  className?: string;
}

export function SalonInfo({
  info,
  variant = "full",
  showBooking = true,
  className,
}: SalonInfoProps) {
  const isCompact = variant === "compact";
  const isSplit = variant === "split";

  return (
    <section
      className={cn(
        "py-section-md bg-white relative overflow-hidden",
        className
      )}
      aria-labelledby="salon-info-title"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sand-50 -skew-x-12 origin-top-right" />

      <div className="px-gutter max-w-content-xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header - Full/Split variant */}
          {!isCompact && (
            <motion.header variants={fadeInUp} className="text-center mb-12">
              <h2
                id="salon-info-title"
                className="font-display text-display-md text-ink mb-2"
              >
                {info.name}
              </h2>
              <p className="text-gold font-display text-lg italic">
                {info.tagline}
              </p>
            </motion.header>
          )}

          <div
            className={cn(
              "grid gap-8",
              isSplit ? "lg:grid-cols-2" : "lg:grid-cols-3"
            )}
          >
            {/* Opening Hours Card */}
            <motion.div
              variants={fadeInLeft}
              className={cn(
                "bg-sand-50 rounded-2xl p-8",
                "shadow-elevation-1 hover:shadow-elevation-2 transition-shadow",
                isSplit && "lg:row-span-2"
              )}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold/10 rounded-xl">
                  <Clock className="w-6 h-6 text-gold" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-ink">Opening Hours</h3>
              </div>
              <OpeningHoursDisplay hours={info.openingHours} />
            </motion.div>

            {/* Contact Card */}
            <motion.div
              variants={fadeInUp}
              className={cn(
                "bg-deepsea text-white rounded-2xl p-8",
                "shadow-elevation-2"
              )}
            >
              <h3 className="font-display text-xl mb-6">Contact Us</h3>
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${info.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                  aria-label={`Call us at ${info.contact.phone}`}
                >
                  <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="font-medium">{info.contact.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${info.contact.email}`}
                  className="flex items-center gap-4 group"
                  aria-label={`Email us at ${info.contact.email}`}
                >
                  <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide">
                      Email
                    </p>
                    <p className="font-medium">{info.contact.email}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                {info.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${info.contact.whatsapp.replace(/\s/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                    aria-label="Message us on WhatsApp"
                  >
                    <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">
                        WhatsApp
                      </p>
                      <p className="font-medium">{info.contact.whatsapp}</p>
                    </div>
                  </a>
                )}
              </div>

              {/* Book Button */}
              {showBooking && (
                <Link
                  href={info.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-8"
                >
                  <Button
                    size="lg"
                    fullWidth
                    variant="primary"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
              )}
            </motion.div>

            {/* Location Card (only in full/split) */}
            {!isCompact && (
              <motion.div
                variants={fadeInRight}
                className={cn(
                  "bg-sand-50 rounded-2xl p-8",
                  "shadow-elevation-1 hover:shadow-elevation-2 transition-shadow"
                )}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gold/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl text-ink">Location</h3>
                </div>
                <p className="text-ink-600 leading-relaxed mb-6">
                  {info.address}
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(info.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold text-sm hover:underline"
                >
                  Get directions
                  <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            )}

            {/* Policies Card (full variant only) */}
            {variant === "full" && info.policies && info.policies.length > 0 && (
              <motion.div
                variants={fadeInUp}
                className="lg:col-span-3 bg-sand-100 rounded-2xl p-8"
              >
                <h3 className="font-display text-xl text-ink mb-6 text-center">
                  Spa Policies
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {info.policies.map((policy, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <p className="text-ink-600 text-sm">{policy}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Default data
export const defaultSalonInfo: SalonInfoType = {
  name: "Opduin Wellness & Beauty",
  tagline: "There is nothing like personal attention",
  description:
    "Experience true relaxation in our award-winning wellness center. Our expert therapists combine traditional techniques with modern innovation.",
  openingHours: {
    mondayToFriday: "09:00 - 21:00",
    saturday: "09:00 - 21:00",
    sunday: "10:00 - 20:00",
    holidays: "10:00 - 18:00",
    notes: "Last appointments 1 hour before closing. Extended hours available by request.",
  },
  contact: {
    phone: "+31 222 317 445",
    email: "wellness@opduin.nl",
    whatsapp: "+31 6 1234 5678",
  },
  address:
    "Grand Hotel Opduin, Ruyslaan 22, 1796 AD De Koog, Texel, Netherlands",
  bookingUrl: "https://book.wellnessliving.com/opduin",
  policies: [
    "Please arrive 15 minutes before your appointment",
    "Cancellations require 24-hour notice",
    "Treatments for guests aged 16+ only (except Kids Spa)",
    "Gift vouchers are available at reception",
  ],
};
