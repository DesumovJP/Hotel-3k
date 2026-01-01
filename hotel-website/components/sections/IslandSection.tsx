"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Heading } from "@/components/atoms";
import { Counter, SplitText } from "@/components/animations";
import { easeOutExpo } from "@/lib/motion";

const stats = [
  { value: 30, suffix: " km", label: "Coastline" },
  { value: 170, suffix: " km²", label: "Area" },
  { value: 7, suffix: "", label: "Villages" },
];

export function IslandSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] min-h-[600px] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -inset-y-[20%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070')",
          }}
        />
      </motion.div>

      {/* Dynamic overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
      >
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-white/60 text-[11px] tracking-[0.3em] uppercase mb-6"
        >
          The Island
        </motion.span>

        {/* Title with split animation */}
        <div className="overflow-hidden mb-8">
          <motion.div
            initial={{ y: 60 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <Heading as="h2" className="!text-white text-center">
              <SplitText type="chars" animation="fadeUp" staggerDelay={0.04} delay={0.2}>
                Texel
              </SplitText>
            </Heading>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
          className="text-white/80 text-lg md:text-xl font-light text-center max-w-2xl mb-12"
        >
          Rolling dunes. Villages where time moves gently.
          The largest of the Wadden Islands — a place apart.
        </motion.p>

        {/* Stats with counter animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: easeOutExpo }}
          className="flex gap-12 md:gap-20 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-white text-3xl md:text-4xl font-light mb-2">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                  delay={0.8 + index * 0.2}
                />
              </div>
              <span className="text-white/50 text-xs uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: easeOutExpo }}
        >
          <Link
            href="/island"
            className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors"
          >
            <span className="relative text-sm tracking-wide">
              Discover the island
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-white origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </span>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <ArrowRight size={16} />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </section>
  );
}
