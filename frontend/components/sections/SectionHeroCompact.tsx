"use client";

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
  /** Additional className */
  className?: string;
}

export function SectionHeroCompact({
  label,
  title,
  tagline,
  description,
  align = "center",
  className,
}: SectionHeroCompactProps) {
  return (
    <section
      className={cn(
        "bg-navy pt-24 pb-10 md:pt-28 md:pb-12",
        className
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
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
