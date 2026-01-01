"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Heading, Text, Button } from "@/components/atoms";
import { MagneticWrapper, SplitText } from "@/components/animations";
import { fadeInUp, blurInUp, staggerContainer, defaultViewport, easeOutExpo, duration } from "@/lib/motion";

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.04, 0.02]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          style={{ y: decorY }}
          className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-sea)]"
        />
        <motion.div
          style={{ y: decorY }}
          className="absolute -bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--color-sea)]"
        />
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: easeOutExpo }}
        className="absolute left-1/2 top-0 w-px h-20 bg-gradient-to-b from-[var(--color-fog)] to-transparent origin-top"
      />

      <div className="px-6 md:px-12 lg:px-24 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Label */}
          <motion.div variants={fadeInUp}>
            <span className="text-sm tracking-[0.25em] uppercase text-[var(--color-slate)] mb-8 block">
              Begin your stay
            </span>
          </motion.div>

          {/* Heading with split text */}
          <motion.div variants={fadeInUp} className="mb-8 overflow-hidden">
            <motion.div
              initial={{ y: 60 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              <Heading as="h2">
                <SplitText type="words" animation="fadeUp" staggerDelay={0.06}>
                  Ready for stillness?
                </SplitText>
              </Heading>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div variants={blurInUp}>
            <Text size="lg" muted className="mb-12 max-w-xl mx-auto">
              Escape to where the horizon stretches endlessly and the only
              schedule is the rhythm of the tides.
            </Text>
          </motion.div>

          {/* Buttons with magnetic effect */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticWrapper strength={0.15}>
              <Link href="/book">
                <Button size="lg" className="relative overflow-hidden group">
                  <span className="relative z-10">Check Availability</span>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ x: ["0%", "200%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                </Button>
              </Link>
            </MagneticWrapper>

            <MagneticWrapper strength={0.15}>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: easeOutExpo }}
        className="absolute left-1/2 bottom-0 w-px h-20 bg-gradient-to-t from-[var(--color-fog)] to-transparent origin-bottom"
      />
    </section>
  );
}
