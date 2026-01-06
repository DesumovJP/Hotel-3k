"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Waves, Droplets, Wind, Sparkles } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/accessibility";

const features = [
  { icon: Waves, label: "Indoor Pool", description: "Dune views" },
  { icon: Droplets, label: "Sauna & Steam", description: "Island timber" },
  { icon: Wind, label: "Treatments", description: "Sea botanicals" },
  { icon: Sparkles, label: "Relaxation", description: "Mindful space" },
];

export function WellnessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReducedMotion ? {} : { y, scale }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070"
          alt="Spa and wellness"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              {/* Sky blue accent badge */}
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-sky-400" />
                <span className="text-xs tracking-[0.25em] uppercase text-sky-300 font-medium">
                  Wellness
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.02em] mb-6">
                Space to<br />
                <span className="text-sky-300">Breathe</span>
              </h2>

              <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-lg">
                An indoor pool with views across the dunes. A sauna warmed by island timber.
                Treatments that honour the healing nature of the sea.
              </p>

              <Link
                href="/wellness"
                className="group inline-flex items-center gap-3 text-white/80 hover:text-sky-300 transition-colors duration-300"
              >
                <span className="text-sm tracking-[0.1em] uppercase">Explore wellness</span>
                <span className="w-10 h-10 rounded-full bg-sky-400/20 backdrop-blur-sm border border-sky-400/30 flex items-center justify-center group-hover:bg-sky-400/30 transition-all duration-300">
                  <ArrowRight size={16} className="text-sky-300 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Right - Feature Cards */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: easeOutExpo }}
                    className="group p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-sky-400/30 transition-all duration-300"
                  >
                    <span className="w-12 h-12 rounded-xl bg-sky-400/20 flex items-center justify-center mb-4 group-hover:bg-sky-400/30 transition-colors duration-300">
                      <Icon size={22} className="text-sky-300" />
                    </span>
                    <h3 className="font-medium text-white mb-1">
                      {feature.label}
                    </h3>
                    <p className="text-sm text-white/60">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative sky blue glow */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
