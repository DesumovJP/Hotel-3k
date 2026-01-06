"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Sun } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/accessibility";
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

// Premium Offer Card with hover effects
interface OfferCardProps {
  offer: Offer;
  index: number;
  prefersReducedMotion: boolean;
}

function OfferCard({ offer, index, prefersReducedMotion }: OfferCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = offer.icon;

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: easeOutExpo }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group"
    >
      <Link href={`/offers#${offer.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 shadow-neo-sm">
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Badge with sky blue */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white text-xs rounded-full shadow-md">
            <Icon size={12} />
            {offer.badge}
          </span>

          {/* Hover reveal - explore text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-5 py-2.5 bg-white/95 backdrop-blur-sm rounded-full text-sky-700 text-sm tracking-[0.1em] uppercase font-medium shadow-lg">
              Explore Package
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-1">
          <h3 className="font-display text-xl lg:text-2xl text-ink mb-2 group-hover:text-sky-700 transition-colors duration-300">
            {offer.title}
          </h3>
          <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
            {offer.subtitle}
          </p>
          <span className="relative inline-flex items-center gap-1.5 text-sky-600 text-sm tracking-[0.05em] uppercase group/link">
            Learn more
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky-400 transition-all duration-300 group-hover:w-full" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function OffersPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-sky-50/50 via-sand-50 to-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            {/* Sky blue accent */}
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-px bg-sky-400" />
              <span className="text-xs tracking-[0.25em] uppercase text-sky-600 font-medium">
                Special Offers
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-[-0.02em]">
              Curated<br />
              <span className="text-sky-600">experiences</span>
            </h2>
          </div>

          <Link
            href="/offers"
            className="group inline-flex items-center gap-3 text-ink/70 hover:text-sky-600 transition-colors duration-300"
          >
            <span className="text-sm tracking-[0.1em] uppercase">View all packages</span>
            <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-300">
              <ArrowRight size={14} className="text-sky-600 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {featuredOffers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Decorative element */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-sky-300" />
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-sky-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
