"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import {
  Check,
  ArrowRight,
  Phone,
  Mail,
  Moon,
  Sparkles,
  ChevronLeft,
  Gift,
  Clock,
  Bed,
  Coffee,
  UtensilsCrossed,
  Waves,
  Car,
  Wifi,
  Wine,
  Cake,
  MapPin,
  Ticket,
  ShoppingBag,
  Percent,
  Music,
  type LucideIcon,
} from "lucide-react";

// Smart icon mapping based on inclusion text
function getInclusionIcon(text: string): LucideIcon {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("night") || lowerText.includes("accommodation") || lowerText.includes("overnight")) return Bed;
  if (lowerText.includes("breakfast")) return Coffee;
  if (lowerText.includes("dinner") || lowerText.includes("restaurant")) return UtensilsCrossed;
  if (lowerText.includes("coffee") || lowerText.includes("tea") || lowerText.includes("cake") || lowerText.includes("pie")) return Cake;
  if (lowerText.includes("wellness") || lowerText.includes("pool") || lowerText.includes("sauna") || lowerText.includes("spa")) return Waves;
  if (lowerText.includes("parking")) return Car;
  if (lowerText.includes("wifi")) return Wifi;
  if (lowerText.includes("liquor") || lowerText.includes("wine") || lowerText.includes("beverage")) return Wine;
  if (lowerText.includes("massage") || lowerText.includes("solarium") || lowerText.includes("bathrobe")) return Sparkles;
  if (lowerText.includes("ecomare") || lowerText.includes("entrance") || lowerText.includes("ticket")) return Ticket;
  if (lowerText.includes("picnic") || lowerText.includes("bag")) return ShoppingBag;
  if (lowerText.includes("map") || lowerText.includes("trail")) return MapPin;
  if (lowerText.includes("discount") || lowerText.includes("%")) return Percent;
  if (lowerText.includes("music") || lowerText.includes("live")) return Music;
  if (lowerText.includes("chocolate")) return Gift;

  return Check;
}
import { easeOutExpo } from "@/lib/motion";
import type { Offer } from "@/lib/data/offers";

interface OfferDetailClientProps {
  offer: Offer;
  otherOffers: Offer[];
}

export function OfferDetailClient({ offer, otherOffers }: OfferDetailClientProps) {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden bg-navy">
          <Image
            src={offer.imageLarge}
            alt={offer.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />

          {/* Badge */}
          <div className="absolute top-24 left-6 md:left-12 lg:left-24">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-shell text-navy text-sm font-medium">
              <Gift size={16} />
              {offer.badge}
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span
                  className="text-white/90 text-xs tracking-[0.2em] uppercase mb-3 block"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)' }}
                >
                  {offer.category} Package
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                  {offer.title}
                </h1>
                <p className="text-xl text-white/80 font-display italic">
                  {offer.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Moon size={16} className="text-shell" />
                <span>{offer.nights} {offer.nights === 1 ? "Night" : "Nights"}</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-shell" />
                <span>{offer.category}</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-shell" />
                <span>Free Cancellation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline
              items={[
                { label: "Package Deals", href: "/offers" },
                { label: offer.title },
              ]}
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left Column - Details */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  {/* Description */}
                  <div className="mb-10">
                    <h2 className="font-display text-2xl text-ink mb-4">About This Package</h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {offer.longDescription}
                    </p>
                  </div>

                  {/* What's Included - Compact list */}
                  <div className="mb-10">
                    <h2 className="font-display text-2xl text-ink mb-4">What&apos;s Included</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {offer.includes.map((item, index) => {
                        const Icon = getInclusionIcon(item);
                        return (
                          <li
                            key={index}
                            className="flex items-center gap-3 py-2 text-neutral-700"
                          >
                            <Icon size={16} className="text-shell flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Conditions */}
                  <div className="p-6 bg-sand-100 border-l-4 border-shell">
                    <h3 className="font-display text-lg text-ink mb-4 flex items-center gap-2">
                      <Clock size={18} className="text-shell" />
                      Conditions
                    </h3>
                    <ul className="space-y-2">
                      {offer.conditions.map((condition, index) => (
                        <li key={index} className="text-neutral-600 text-sm flex items-start gap-2">
                          <span className="text-shell mt-1">•</span>
                          {condition}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Booking Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                  className="sticky top-24"
                >
                  <div className="neo-card p-8">
                    <h3 className="font-display text-xl text-ink mb-2">Book This Package</h3>
                    <p className="text-neutral-500 text-sm mb-6">
                      Price varies per day. Direct booking recommended.
                    </p>

                    {/* Nights indicator */}
                    <div className="flex items-center gap-3 p-4 bg-sand-50 mb-6">
                      <Moon size={20} className="text-shell" />
                      <div>
                        <p className="font-medium text-ink">{offer.nights} {offer.nights === 1 ? "Night" : "Nights"}</p>
                        <p className="text-xs text-neutral-500">Per 2 persons</p>
                      </div>
                    </div>

                    {/* Ideal For */}
                    <div className="mb-6">
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Ideal for</p>
                      <p className="text-neutral-600 text-sm">{offer.idealFor}</p>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3">
                      <Link
                        href="/book"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        Check Availability
                        <ArrowRight size={16} />
                      </Link>
                      <a
                        href="tel:+31222317445"
                        className="flex items-center justify-center gap-2 w-full py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                      >
                        <Phone size={16} />
                        +31 222 317 445
                      </a>
                      <a
                        href="mailto:info@opduin.nl"
                        className="flex items-center justify-center gap-2 w-full py-3 text-neutral-600 hover:text-navy transition-colors text-sm"
                      >
                        <Mail size={16} />
                        info@opduin.nl
                      </a>
                    </div>
                  </div>

                  {/* Direct Booking Note */}
                  <div className="mt-6 p-4 bg-shell/10 text-center">
                    <p className="text-sm text-neutral-600">
                      <strong className="text-navy">Book direct & save!</strong><br />
                      Avoid 15% third-party commission fees
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* More Packages */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink">More Packages</h2>
              <Link
                href="/offers"
                className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherOffers.map((otherOffer, index) => (
                <motion.article
                  key={otherOffer.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/offers/${otherOffer.slug}`} className="group block h-full">
                    <div className="neo-card neo-card-hover overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={otherOffer.image}
                          alt={otherOffer.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-navy text-xs shadow-sm">
                          {otherOffer.badge}
                        </span>
                      </div>
                      <div className="p-5 flex-1">
                        <h3 className="font-display text-lg text-ink mb-1 group-hover:text-shell transition-colors line-clamp-1">
                          {otherOffer.title}
                        </h3>
                        <p className="text-neutral-500 text-sm line-clamp-1">{otherOffer.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 bg-white border-t border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <Link
              href="/offers"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-navy transition-colors text-sm"
            >
              <ChevronLeft size={16} />
              Back to All Packages
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
