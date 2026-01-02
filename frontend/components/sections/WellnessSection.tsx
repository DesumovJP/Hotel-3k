"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

export function WellnessSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-white-sand">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content - Left on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="order-2 lg:order-1"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                Wellness
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                Space to Breathe
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                An indoor pool with views across the dunes. A sauna warmed by island timber.
                Treatments that honour the healing nature of the sea.
              </p>
              <Link
                href="/wellness"
                className="group inline-flex items-center gap-2 text-ink hover:text-shell transition-colors text-sm tracking-wide"
              >
                Explore wellness
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Image - Right on Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              className="relative aspect-[3/2] overflow-hidden order-1 lg:order-2"
            >
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070"
                alt="Spa and wellness"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
