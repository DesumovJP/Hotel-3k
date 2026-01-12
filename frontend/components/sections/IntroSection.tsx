"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Waves, Award, Star } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const usps = [
  { icon: Clock, text: "90+ years of hospitality" },
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
            <span className="text-overline text-shell mb-4 block">
              Welcome to Opduin
            </span>

            <h2 className="text-display-xl text-ink mb-6">
              The Hamptons on
              <span className="text-shell"> the Wadden</span>
            </h2>

            <p className="text-body-lg text-neutral-600 mb-6">
              More than 90 years of hospitality combined in a tasteful, comfortable
              and contemporary hotel. The beach is within walking distance, the village
              and cozy restaurants are next door.
            </p>

            <p className="text-body-md text-neutral-500 mb-8">
              Plenty of opportunities for relaxation, exercise and recreation.
              Rooms ranging from suites to holiday homes, with options for single
              occupancy through apartments. All rooms with air conditioning and
              comfortable bedding, positioned atop a dune.
            </p>

            {/* USP badges - neomorphic grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {usps.map((usp, index) => {
                const Icon = usp.icon;
                return (
                  <motion.div
                    key={usp.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05, ease: easeOutExpo }}
                    className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-shell" />
                    </div>
                    <span className="text-sm text-ink/80">{usp.text}</span>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
            >
              <span className="relative">
                Discover our story
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-shell group-hover:w-full transition-all duration-300" />
              </span>
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
            <div className="neo-frame group/image overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/home/home-600x400_1.jpg"
                  alt="Grand Hotel Opduin exterior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                />
              </div>
            </div>

            {/* Floating stats card - neomorphic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOutExpo }}
              className="absolute -bottom-4 -left-4 md:-left-8 p-5 md:p-6 bg-white rounded-2xl shadow-neo-lg animate-float"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  >
                    <Star size={14} className="text-shell fill-shell" />
                  </motion.div>
                ))}
              </div>
              <p className="text-display-md text-ink mb-1">9.2</p>
              <p className="text-neutral-500 text-sm">Guest Rating</p>
              <p className="text-neutral-400 text-xs mt-1">1,200+ reviews</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
