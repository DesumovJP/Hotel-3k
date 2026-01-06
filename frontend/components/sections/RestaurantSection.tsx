"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Utensils } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/accessibility";

const dishes = [
  {
    id: 1,
    name: "Wadden Sea Catch",
    description: "Fresh daily selections from local fishermen",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974",
  },
  {
    id: 2,
    name: "Salt Marsh Lamb",
    description: "Texel lamb raised on mineral-rich pastures",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069",
  },
  {
    id: 3,
    name: "Island Garden",
    description: "Seasonal vegetables from our kitchen garden",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070",
  },
  {
    id: 4,
    name: "Coastal Desserts",
    description: "Sea buckthorn, honey, and local berries",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1964",
  },
];

export function RestaurantSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-gradient-to-b from-sand-50 to-white overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            {/* Left - Title */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              {/* Sky blue accent */}
              <div className="flex items-center gap-4 mb-5">
                <span className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                  <Utensils size={18} className="text-sky-600" />
                </span>
                <span className="text-xs tracking-[0.25em] uppercase text-sky-600 font-medium">
                  Culinary
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-[-0.02em]">
                From Sea<br />
                <span className="text-sky-600">to Table</span>
              </h2>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
              className="lg:pb-3"
            >
              <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-md">
                Fresh catches from the Wadden Sea. Lamb raised on salt marshes.
                Our kitchen celebrates the island&apos;s bounty with elegant simplicity.
              </p>
              <Link
                href="/restaurant"
                className="group inline-flex items-center gap-3 text-ink/70 hover:text-sky-600 transition-colors duration-300"
              >
                <span className="text-sm tracking-[0.1em] uppercase">Reserve a table</span>
                <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-300">
                  <ArrowRight size={14} className="text-sky-600 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <motion.div
        style={prefersReducedMotion ? {} : { x }}
        className="relative"
      >
        <div className="flex gap-6 pl-6 md:pl-12 lg:pl-24 pr-12">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
              className="group flex-shrink-0 w-[320px] md:w-[400px]"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-5 shadow-neo-sm">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="px-1">
                <h3 className="font-display text-xl text-ink mb-1 group-hover:text-sky-700 transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {dish.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* "View Menu" Card */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: dishes.length * 0.1, ease: easeOutExpo }}
            className="flex-shrink-0 w-[280px] md:w-[320px]"
          >
            <Link
              href="/restaurant"
              className="group flex items-center justify-center aspect-[4/5] rounded-2xl bg-sky-50 border-2 border-dashed border-sky-200 hover:border-sky-400 hover:bg-sky-100 transition-all duration-300"
            >
              <div className="text-center">
                <span className="w-14 h-14 rounded-full bg-sky-100 group-hover:bg-sky-200 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <ArrowRight size={20} className="text-sky-600 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="text-sky-700 text-sm tracking-[0.15em] uppercase font-medium">
                  View Full Menu
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative line */}
      <div className="mt-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        </div>
      </div>
    </section>
  );
}
