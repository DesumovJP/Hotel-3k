"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

export function RestaurantSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-sand-soft">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="relative aspect-[3/2] overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974"
                alt="Restaurant dining"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                Dining
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                From Sea to Table
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Fresh catches from the Wadden Sea. Lamb raised on salt marshes.
                Our kitchen celebrates the island&apos;s bounty with simplicity.
              </p>
              <Link
                href="/restaurant"
                className="group inline-flex items-center gap-2 text-ink hover:text-shell transition-colors text-sm tracking-wide"
              >
                Reserve a table
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
