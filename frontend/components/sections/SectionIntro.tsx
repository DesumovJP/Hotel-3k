"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface HighlightBox {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SectionIntroProps {
  /** Optional small label above content */
  label?: string;
  /** Optional main title */
  title?: string;
  /** Lead paragraph (larger, more prominent) */
  lead?: string;
  /** Additional paragraphs */
  paragraphs?: string[];
  /** Optional image - creates two-column layout */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Image position */
  imagePosition?: "left" | "right";
  /** Optional highlight callout box */
  highlight?: HighlightBox;
  /** Background color */
  background?: "white" | "sand";
  /** Vertical padding size */
  padding?: "sm" | "md" | "lg" | "xl";
  /** Additional className for section */
  className?: string;
}

export function SectionIntro({
  label,
  title,
  lead,
  paragraphs = [],
  image,
  imageAlt = "",
  imagePosition = "right",
  highlight,
  background = "white",
  padding = "md",
  className,
}: SectionIntroProps) {
  const paddingClasses = {
    sm: "py-10 md:py-14",
    md: "py-14 md:py-20",
    lg: "py-16 md:py-24",
    xl: "py-20 md:py-28",
  };

  const bgClass = background === "white" ? "bg-white" : "bg-sand-100";
  const hasImage = !!image;

  // Text content block
  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: hasImage ? (imagePosition === "right" ? -30 : 30) : 0, y: hasImage ? 0 : 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      {/* Label */}
      {label && (
        <span className="text-overline text-shell mb-4 block">
          {label}
        </span>
      )}

      {/* Title */}
      {title && (
        <h2 className="text-display-lg text-ink mb-6">
          {title}
        </h2>
      )}

      {/* Lead paragraph */}
      {lead && (
        <p className="text-body-lg text-neutral-600 mb-6">
          {lead}
        </p>
      )}

      {/* Additional paragraphs */}
      {paragraphs.length > 0 && (
        <div className="space-y-4 mb-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-body-md text-neutral-600">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Highlight callout box */}
      {highlight && (
        <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-shell">
          <highlight.icon className="w-5 h-5 text-shell mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-ink mb-1">{highlight.title}</p>
            <p className="text-body-sm text-neutral-600">{highlight.description}</p>
          </div>
        </div>
      )}
    </motion.div>
  );

  // Image block
  const imageContent = hasImage && (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "right" ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
      className="relative aspect-[4/3] overflow-hidden"
    >
      <Image
        src={image}
        alt={imageAlt || title || ""}
        fill
        className="object-cover"
      />
    </motion.div>
  );

  // Two-column layout with image
  if (hasImage) {
    return (
      <section className={cn(paddingClasses[padding], bgClass, className)}>
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {imagePosition === "left" ? (
              <>
                {imageContent}
                {textContent}
              </>
            ) : (
              <>
                {textContent}
                {imageContent}
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Text-only layout (no wall of text - better visual hierarchy)
  return (
    <section className={cn(paddingClasses[padding], bgClass, className)}>
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          {textContent}
        </div>
      </div>
    </section>
  );
}
