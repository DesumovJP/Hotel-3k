"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Heading, Text, Label } from "@/components/atoms";
import { MaskReveal } from "@/components/animations";
import { fadeInUp, staggerContainer, defaultViewport, easeOutExpo, clipRevealLeft } from "@/lib/motion";

export function RestaurantSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[var(--color-mist)] relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image - with overlapping card effect */}
            <motion.div
              style={{ y: imageY }}
              className="lg:col-span-7 relative"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={clipRevealLeft}
                className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cloud)]"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: easeOutExpo }}
                  className="absolute inset-0"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974"
                    alt="Restaurant dining"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-4 -left-4 w-24 h-24 border border-[var(--color-fog)]"
              />
            </motion.div>

            {/* Content - overlaps image on desktop */}
            <motion.div
              style={{ y: contentY }}
              className="lg:col-span-6 lg:-ml-12 relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
                className="bg-white p-8 md:p-12 lg:p-14 shadow-xl"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                >
                  <motion.div variants={fadeInUp}>
                    <Label className="mb-6">Dining</Label>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 40 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: easeOutExpo }}
                    >
                      <Heading as="h2" className="mb-6">
                        From sea
                        <br />
                        to table
                      </Heading>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Text size="lg" muted className="mb-4">
                      Fresh catches from the Wadden Sea. Lamb raised on salt marshes.
                      Vegetables from island gardens.
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Text muted className="mb-8">
                      Our kitchen celebrates the island&apos;s bounty with simplicity
                      and respect for tradition.
                    </Text>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <Link
                      href="/restaurant"
                      className="group inline-flex items-center gap-3 text-[var(--color-ink)]"
                    >
                      <span className="relative text-sm tracking-wide">
                        Reserve a table
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
          </div>
        </div>
      </div>
    </section>
  );
}
