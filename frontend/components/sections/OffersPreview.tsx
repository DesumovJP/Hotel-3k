"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Sun } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { LucideIcon } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: LucideIcon;
  badge: string;
}

const featuredOffers: Offer[] = [
  {
    id: "romantic-escape",
    title: "Romantic Escape",
    subtitle: "Two nights of pure romance with spa & dining",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    icon: Heart,
    badge: "Most Popular",
  },
  {
    id: "winter-wellness",
    title: "Winter Wellness",
    subtitle: "Restore body and mind with our spa retreat",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    icon: Sparkles,
    badge: "Seasonal",
  },
  {
    id: "early-bird-summer",
    title: "Summer 2026",
    subtitle: "Book ahead and save on your beach holiday",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    icon: Sun,
    badge: "Early Bird",
  },
];

export function OffersPreview() {
  return (
    <section className="py-20 md:py-28 bg-sand-100">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
              Special Offers
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              Curated experiences
            </h2>
          </div>
          <Link
            href="/offers"
            className="group inline-flex items-center gap-2 text-navy hover:text-shell transition-colors"
          >
            <span className="text-sm tracking-wide">View all packages</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.article
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                className="group"
              >
                <Link href={`/offers#${offer.id}`} className="block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/30 transition-colors" />

                    {/* Badge */}
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-shell text-navy text-xs">
                      <Icon size={12} />
                      {offer.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl text-ink mb-2 group-hover:text-shell transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-3">
                    {offer.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-navy text-sm group-hover:text-shell transition-colors">
                    Learn more
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
