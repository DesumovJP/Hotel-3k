"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Waves, UtensilsCrossed, Bed, Sparkles } from "lucide-react";
import { Heading, Text, Label } from "@/components/atoms";
import { Card3D } from "@/components/effects";
import { blurInUp, scaleIn, staggerContainerBento, defaultViewport, easeOutExpo, duration, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Bed,
    title: "22 Rooms & Suites",
    description: "Each designed for stillness, with views of dunes, sea, or gardens",
    link: "/rooms",
    size: "large", // Featured item
  },
  {
    icon: UtensilsCrossed,
    title: "Farm-to-Table Dining",
    description: "Fresh catches, island lamb, and seasonal produce",
    link: "/restaurant",
    size: "small",
  },
  {
    icon: Waves,
    title: "Spa & Wellness",
    description: "Indoor pool, sauna, and treatments inspired by the sea",
    link: "/wellness",
    size: "small",
  },
  {
    icon: Sparkles,
    title: "Island Experiences",
    description: "Cycling tours, beach walks, and nature excursions",
    link: "/island",
    size: "medium",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[var(--color-mist)] relative overflow-hidden">
      {/* Subtle moving background element */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -right-32 top-1/4 w-96 h-96 rounded-full bg-white/50 blur-3xl"
      />

      <div className="px-6 md:px-12 lg:px-24 relative">
        <motion.div
          variants={staggerContainerBento}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={blurInUp} className="text-center mb-12 md:mb-16">
            <Label className="mb-4">Experience</Label>
            <Heading as="h2">What Awaits You</Heading>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLarge = feature.size === "large";
              const isMedium = feature.size === "medium";

              return (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  custom={index}
                  className={cn(
                    isLarge && "lg:col-span-2 lg:row-span-2",
                    isMedium && "lg:col-span-2"
                  )}
                >
                  <Link href={feature.link} className="group block h-full">
                    <Card3D depth={8}>
                      <motion.div
                        className={cn(
                          "relative h-full bg-white overflow-hidden",
                          "transition-shadow duration-500",
                          "group-hover:shadow-xl",
                          isLarge ? "p-10 md:p-12" : "p-8"
                        )}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                      >
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                          <motion.div
                            initial={{ x: 40, y: -40 }}
                            whileHover={{ x: 0, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-mist)] -rotate-45 transform origin-top-right"
                          />
                        </div>

                        {/* Icon with animation */}
                        <motion.div
                          className="relative z-10 mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon
                            size={isLarge ? 36 : 28}
                            className="text-[var(--color-sea)]"
                            strokeWidth={1.5}
                          />
                        </motion.div>

                        {/* Content */}
                        <Heading
                          as={isLarge ? "h3" : "h5"}
                          className={cn(
                            "mb-3 group-hover:text-[var(--color-sea)] transition-colors duration-300",
                            isLarge && "text-2xl md:text-3xl"
                          )}
                        >
                          {feature.title}
                        </Heading>

                        <Text
                          size={isLarge ? "base" : "sm"}
                          muted
                          className={cn("mb-6", isLarge && "max-w-sm")}
                        >
                          {feature.description}
                        </Text>

                        {/* Animated link */}
                        <div className="flex items-center gap-2 text-[var(--color-slate)] group-hover:text-[var(--color-sea)] transition-colors">
                          <span className="text-xs uppercase tracking-wider">
                            Learn more
                          </span>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                          >
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </motion.div>
                        </div>

                        {/* Bottom accent line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-[var(--color-sea)]"
                          initial={{ width: "0%" }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.4, ease: easeOutExpo }}
                        />
                      </motion.div>
                    </Card3D>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
