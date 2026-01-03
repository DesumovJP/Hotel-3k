"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  detail: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    id: "rooms",
    label: "Accommodations",
    title: "Rooms & Suites",
    subtitle: "22 rooms with sea, dune & garden views",
    detail: "From €159/night",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    link: "/rooms",
  },
  {
    id: "restaurant",
    label: "Dining",
    title: "From Sea to Table",
    subtitle: "Fresh Wadden Sea catches, local ingredients",
    detail: "Open daily 7:00 – 22:00",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974",
    link: "/restaurant",
  },
  {
    id: "wellness",
    label: "Wellness",
    title: "Space to Breathe",
    subtitle: "Pool, sauna & sea-inspired treatments",
    detail: "Complimentary for guests",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070",
    link: "/wellness",
  },
  {
    id: "offer",
    label: "Featured",
    title: "Romantic Escape",
    subtitle: "2 nights, spa, dinner for two",
    detail: "From €459",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    link: "/offers",
  },
  {
    id: "island",
    label: "Texel",
    title: "The Island",
    subtitle: "30km beaches, nature, villages",
    detail: "20 min by ferry",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070",
    link: "/island",
  },
];

export function DiscoverGrid() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-sand-50 to-sand-100/50">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-16 md:mb-20"
        >
          <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
            Discover
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink max-w-2xl leading-[1.1]">
            Everything you need for the perfect stay
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured Card - Rooms */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <Link href={categories[0].link} className="group block h-full">
              {/* Neomorphic container */}
              <div className="h-full neo-card neo-card-lg neo-card-hover">
                <div className="relative h-full min-h-[460px] lg:min-h-[640px] rounded-2xl overflow-hidden">
                  <Image
                    src={categories[0].image}
                    alt={categories[0].title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end">
                    <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4">
                      {categories[0].label}
                    </span>
                    <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-white mb-4 leading-[1.1]">
                      {categories[0].title}
                    </h3>
                    <p className="text-white/80 text-lg md:text-xl mb-3 max-w-lg">
                      {categories[0].subtitle}
                    </p>
                    <p className="text-shell text-lg font-medium mb-8">
                      {categories[0].detail}
                    </p>
                    <div className="flex items-center gap-3 text-white/90 group-hover:text-shell transition-colors">
                      <span className="text-sm tracking-wide uppercase">View rooms</span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Secondary Cards - Text inside */}
          {categories.slice(1).map((category, index) => (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: easeOutExpo }}
            >
              <Link href={category.link} className="group block h-full">
                {/* Neomorphic container */}
                <div className="h-full neo-card neo-card-sm neo-card-hover">
                  <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                      <span className="text-shell text-xs tracking-[0.15em] uppercase mb-3">
                        {category.label}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl text-white mb-3 leading-tight">
                        {category.title}
                      </h3>
                      <p className="text-white/75 text-sm mb-2">
                        {category.subtitle}
                      </p>
                      <p className="text-shell text-sm font-medium mb-5">
                        {category.detail}
                      </p>
                      <div className="flex items-center gap-2 text-white/80 group-hover:text-shell transition-colors">
                        <span className="text-xs tracking-wide uppercase">Explore</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
