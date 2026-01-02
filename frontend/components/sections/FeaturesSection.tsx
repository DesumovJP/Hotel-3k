"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { easeOutExpo, duration, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "22 Rooms & Suites",
    description: "Each designed for stillness, with views of dunes, sea, or gardens",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    link: "/rooms",
    size: "large",
  },
  {
    title: "Farm-to-Table Dining",
    description: "Fresh catches, island lamb, and seasonal produce",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
    link: "/restaurant",
    size: "small",
  },
  {
    title: "Spa & Wellness",
    description: "Indoor pool, sauna, and treatments inspired by the sea",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070",
    link: "/wellness",
    size: "small",
  },
  {
    title: "Island Experiences",
    description: "Cycling tours, beach walks, and nature excursions",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070",
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

  const decorY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gradient-white-sand relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-20 -right-20 w-80 h-80 rounded-full border border-shell/10"
      />

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easeOutExpo }}
          className="text-center mb-14"
        >
          <span className="text-overline text-shell tracking-widest mb-4 block">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
            What Awaits You
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const isLarge = feature.size === "large";
            const isMedium = feature.size === "medium";

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: duration.slow,
                  delay: index * stagger.tight,
                  ease: easeOutExpo,
                }}
                className={cn(
                  "group relative",
                  isLarge && "lg:col-span-2 lg:row-span-2",
                  isMedium && "lg:col-span-2"
                )}
              >
                <Link href={feature.link} className="block h-full">
                  <div className={cn(
                    "relative overflow-hidden h-full",
                    isLarge ? "aspect-square md:aspect-auto md:min-h-[480px]" : "aspect-[4/3]"
                  )}>
                    {/* Image */}
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      <h3 className={cn(
                        "font-display text-white mb-2",
                        isLarge ? "text-2xl md:text-3xl" : "text-xl"
                      )}>
                        {feature.title}
                      </h3>
                      <p className={cn(
                        "text-white/80 mb-4",
                        isLarge ? "text-base max-w-sm" : "text-sm line-clamp-2"
                      )}>
                        {feature.description}
                      </p>

                      {/* Link */}
                      <div className="flex items-center gap-2 text-white/70 group-hover:text-shell transition-colors">
                        <span className="text-sm tracking-wide">Discover</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
