"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Waves, Award, Star } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const usps = [
  { icon: Clock, text: "Since 1932" },
  { icon: MapPin, text: "On the highest dune" },
  { icon: Waves, text: "5 min walk to beach" },
  { icon: Award, text: "Family-run" },
];

export function IntroSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
              Welcome to Opduin
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink mb-6 leading-tight">
              Where the dunes meet the sea,
              <span className="text-shell"> you find stillness</span>
            </h2>

            <p className="text-neutral-600 text-lg leading-relaxed mb-6">
              Perched on Texel&apos;s highest dune since 1932. Wake to salt air,
              dine on today&apos;s catch, let the spa wash away the world.
            </p>

            <p className="text-neutral-500 leading-relaxed mb-8">
              The beach is a five-minute walk. The rest of life feels much further.
              Here, where the Wadden Sea meets the North Sea, you&apos;ll find a refuge
              that has welcomed travelers for nearly a century.
            </p>

            {/* USP badges - neomorphic */}
            <div className="flex flex-wrap gap-3 mb-8">
              {usps.map((usp, index) => {
                const Icon = usp.icon;
                return (
                  <motion.div
                    key={usp.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05, ease: easeOutExpo }}
                    className="neo-badge-lg text-neutral-600"
                  >
                    <Icon size={15} className="text-shell" />
                    <span>{usp.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
            >
              Discover our story
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right - Image with neomorphic frame */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
            className="relative"
          >
            {/* Neomorphic container */}
            <div className="neo-frame">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200"
                  alt="Grand Hotel Opduin exterior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating stats card - neomorphic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOutExpo }}
              className="absolute -bottom-4 -left-4 md:-left-8 p-5 md:p-6 neo-card shadow-neo-lg"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-shell fill-shell" />
                ))}
              </div>
              <p className="text-3xl md:text-4xl font-display text-ink mb-1">9.2</p>
              <p className="text-neutral-500 text-sm">Guest Rating</p>
              <p className="text-neutral-400 text-xs mt-1">1,200+ reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
