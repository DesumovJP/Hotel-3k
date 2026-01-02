"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bike, Shell, Sun, Bird } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const highlights = [
  {
    icon: Shell,
    title: "30km of beaches",
    description: "From quiet coves to wide sandy stretches",
  },
  {
    icon: Bike,
    title: "140km cycle paths",
    description: "Through dunes, forests, and villages",
  },
  {
    icon: Bird,
    title: "Nature reserves",
    description: "Home to seals, spoonbills, and migrating birds",
  },
  {
    icon: Sun,
    title: "Most sun hours",
    description: "The sunniest spot in the Netherlands",
  },
];

export function IslandSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-navy">
      {/* Background Image with parallax effect */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
          alt="Texel island landscape"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Texel Island
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                The largest Wadden Island awaits
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Where sheep graze on salt meadows, seals bask on sandbanks,
                and seven villages each tell their own story. Just 20 minutes
                by ferry—yet a world away from the everyday.
              </p>

              <Link
                href="/island"
                className="inline-flex items-center gap-2 px-6 py-3 bg-shell text-navy font-medium hover:bg-white transition-colors text-sm tracking-wide"
              >
                Explore the island
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Right - Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: easeOutExpo }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-shell mb-3" />
                    <h3 className="text-white font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
