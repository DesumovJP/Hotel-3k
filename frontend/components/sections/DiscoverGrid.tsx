"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

interface Category {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    id: "rooms",
    label: "Accommodations",
    title: "Rooms & Suites",
    subtitle: "22 rooms with dune, forest & garden views",
    image: "/home/de-kamers-600x450_1.jpg",
    link: "/rooms",
  },
  {
    id: "restaurant",
    label: "Dining",
    title: "Wadden Gastronomy",
    subtitle: "Local products, fresh and homemade",
    image: "/home/restaurant-opduin-600x450.jpg",
    link: "/restaurant",
  },
  {
    id: "wellness",
    label: "Wellness",
    title: "Personal Attention",
    subtitle: "Pool, sauna & Thalgo treatments",
    image: "/wellness/zwembad-600x450_1.jpg",
    link: "/wellness",
  },
  {
    id: "offer",
    label: "Package Deals",
    title: "Book Direct & Save",
    subtitle: "Exclusive perks for direct bookers",
    image: "/home/aanbieding-voor-een-compleet-en-voordelig-verblijf-600x450.jpg",
    link: "/offers",
  },
];

export function DiscoverGrid() {
  return (
    <section className="py-20 md:py-28 bg-sand-100">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-overline text-shell mb-4 block">
            Discover
          </span>
          <h2 className="text-display-xl text-ink">
            Everything for the perfect stay
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
            >
              <Link href={category.link} className="group block bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6">
                  <span className="text-overline text-shell mb-2 block">
                    {category.label}
                  </span>
                  <h3 className="text-display-sm text-ink mb-2 group-hover:text-shell transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {category.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-neutral-500 group-hover:text-shell transition-colors text-sm">
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
