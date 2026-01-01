"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Heading, Text, Label } from "@/components/atoms";
import { fadeInUp, staggerContainer, defaultViewport, easeOutExpo, clipRevealRight } from "@/lib/motion";

export function WellnessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle animated background pattern */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[var(--color-sea)]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[var(--color-sea)]" />
      </motion.div>

      <div className="px-6 md:px-12 lg:px-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Content - Left on Desktop, overlaps image */}
            <motion.div
              style={{ y: contentY }}
              className="lg:col-span-6 lg:col-start-1 order-2 lg:order-1 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
                className="bg-[var(--color-mist)] p-8 md:p-12 lg:p-14 lg:-mr-12"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <motion.div variants={fadeInUp}>
                    <Label className="mb-6">Wellness</Label>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 40 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: easeOutExpo }}
                    >
                      <Heading as="h2" className="mb-6">
                        Space to
                        <br />
                        breathe
                      </Heading>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Text size="lg" muted className="mb-4">
                      An indoor pool with views across the dunes. A sauna warmed
                      by island timber.
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Text muted className="mb-8">
                      Our spa is a place of quiet restoration. Treatments that honour
                      the healing nature of the sea.
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="/wellness"
                      className="group inline-flex items-center gap-3 text-[var(--color-ink)]"
                    >
                      <span className="relative text-sm tracking-wide">
                        Explore wellness
                        <motion.span
                          className="absolute bottom-0 left-0 h-px bg-[var(--color-sea)] origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight size={16} className="group-hover:text-[var(--color-sea)] transition-colors" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Image - Right on Desktop */}
            <motion.div
              style={{ y: imageY }}
              className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={clipRevealRight}
                className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cloud)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: easeOutExpo }}
                  className="absolute inset-0"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070"
                    alt="Spa and wellness"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -top-4 -right-4 w-32 h-32 border border-[var(--color-fog)]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
