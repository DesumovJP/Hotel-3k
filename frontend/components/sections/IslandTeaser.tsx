"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

export function IslandTeaser() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home/hero-fallback.jpg"
          alt="Texel Island landscape"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
      </div>

      <div className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 lg:py-40">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-shell text-xs tracking-[0.2em] uppercase mb-6 block"
            >
              Texel Island
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8"
            >
              Where the North Sea
              <span className="block text-shell italic mt-2">meets stillness</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              The largest Dutch Wadden island. Endless beaches, rolling dunes,
              and a rhythm set only by the tides. A short journey from the mainland,
              yet a world apart.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: easeOutExpo }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-white hover:text-shell transition-colors"
              >
                <span className="text-sm tracking-[0.15em] uppercase">
                  Discover Texel
                </span>
                <span className="w-10 h-10 border border-white/30 flex items-center justify-center group-hover:border-shell group-hover:bg-shell/10 transition-all">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4, ease: easeOutExpo }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-shell/30 to-transparent origin-left"
      />
    </section>
  );
}
