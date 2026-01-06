"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

/**
 * SectionHeader - Unified section titles with label, title, description
 *
 * USAGE:
 * <SectionHeader
 *   label="Our Values"
 *   title="What guides us"
 *   description="Optional description text"
 *   align="center"
 * />
 *
 * REDESIGN: Change typography/spacing here to affect all sections
 */

export interface SectionHeaderProps {
  /** Small uppercase label above title */
  label?: string;
  /** Main title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Whether to animate on scroll */
  animate?: boolean;
  /** Text color scheme */
  theme?: "light" | "dark";
  /** Additional class names */
  className?: string;
  /** Custom margin bottom */
  marginBottom?: "sm" | "md" | "lg";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  animate = true,
  theme = "light",
  className,
  marginBottom = "md",
}: SectionHeaderProps) {
  const mbClasses = {
    sm: "mb-8",
    md: "mb-12",
    lg: "mb-16",
  };

  const content = (
    <div
      className={cn(
        align === "center" && "text-center",
        mbClasses[marginBottom],
        className
      )}
    >
      {label && (
        <span className="text-overline text-shell mb-3 block">
          {label}
        </span>
      )}

      <h2
        className={cn(
          "text-display-lg",
          theme === "dark" ? "text-white" : "text-ink",
          description && "mb-4"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-body-md max-w-2xl",
            theme === "dark" ? "text-white/70" : "text-neutral-600",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );

  if (!animate) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      {content}
    </motion.div>
  );
}
