"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeroCompactProps {
  /** Small label above title */
  label: string;
  /** Main title */
  title: string;
  /** Optional tagline (italic, shell color) */
  tagline?: string;
  /** Optional description */
  description?: string;
  /** Center or left align content */
  align?: "center" | "left";
  /** Optional background image */
  image?: string;
  /** Additional className */
  className?: string;
}

export function SectionHeroCompact({
  label,
  title,
  tagline,
  description,
  align = "center",
  image,
  className,
}: SectionHeroCompactProps) {
  return (
    <section
      className={cn(
        "relative bg-navy pt-24 pb-10 md:pt-28 md:pb-12",
        image && "pt-28 pb-14 md:pt-32 md:pb-16",
        className
      )}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </>
      )}
      <div className="relative px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className={align === "center" ? "text-center" : ""}
        >
          <span className="text-overline text-shell tracking-widest mb-3 block">
            {label}
          </span>
          <h1 className="text-hero-md text-white mb-4">
            {title}
          </h1>
          {tagline && (
            <p className="text-tagline-lg text-shell mb-4">
              {tagline}
            </p>
          )}
          {description && (
            <p
              className={cn(
                "text-body-md text-white/70",
                align === "center" && "max-w-lg mx-auto"
              )}
            >
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
