"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heading, Label } from "@/components/atoms";
import { WordReveal } from "@/components/animations";
import { ScrollText } from "@/components/effects";
import { blurInUp, staggerContainer, defaultViewport, easeOutExpo, duration, delay } from "@/lib/motion";

export function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative line */}
      <motion.div
        style={{ y: decorY }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-32 bg-gradient-to-b from-transparent via-[var(--color-fog)] to-transparent"
      />

      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Animated Label */}
          <motion.div
            variants={blurInUp}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <Label className="mb-8">Welcome</Label>
            </motion.div>
          </motion.div>

          {/* Heading with mask reveal */}
          <div className="overflow-hidden mb-10">
            <motion.div
              initial={{ y: 60 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
            >
              <Heading as="h2">
                A sanctuary at the edge of the world
              </Heading>
            </motion.div>
          </div>

          {/* First paragraph with scroll-linked word reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <ScrollText className="text-lg md:text-xl text-[var(--color-slate)] font-light leading-relaxed">
              Grand Hotel Opduin stands where the dunes meet the North Sea, on the
              island the Dutch call &ldquo;the jewel of the Wadden.&rdquo; For over a century,
              travelers have come here seeking what cannot be found in the city:
              silence, space, and the restorative power of nature.
            </ScrollText>
          </motion.div>

          {/* Second paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: easeOutExpo }}
          >
            <p className="text-[var(--color-slate)] font-light leading-relaxed">
              Our rooms frame views of endless horizons. Our restaurant serves
              what the island provides. Our spa draws on the healing properties
              of the sea. Everything is designed to slow time, to let you breathe,
              to help you return to yourself.
            </p>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 1, ease: easeOutExpo }}
            className="mt-12 mx-auto w-16 h-px bg-[var(--color-fog)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
