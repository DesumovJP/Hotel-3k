"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface InfoBox {
  icon?: LucideIcon;
  title: string;
  content: string;
}

interface SectionTwoColumnProps {
  /** Small label above title */
  label?: string;
  /** Main title */
  title: string;
  /** Main content - can be string or array of paragraphs */
  content: string | string[];
  /** Image URL */
  image: string;
  /** Image alt text */
  imageAlt?: string;
  /** Image on right (default) or left */
  imagePosition?: "left" | "right";
  /** Background color */
  background?: "white" | "sand";
  /** Optional info box (highlighted note) */
  infoBox?: InfoBox;
  /** Optional CTA link */
  ctaLink?: string;
  /** Optional CTA text */
  ctaText?: string;
  /** Optional badges/tags to show */
  tags?: string[];
  /** Additional className */
  className?: string;
}

export function SectionTwoColumn({
  label,
  title,
  content,
  image,
  imageAlt,
  imagePosition = "right",
  background = "white",
  infoBox,
  ctaLink,
  ctaText,
  tags,
  className,
}: SectionTwoColumnProps) {
  const contentArray = Array.isArray(content) ? content : [content];
  const isImageLeft = imagePosition === "left";

  return (
    <section
      className={cn(
        "py-16 md:py-24",
        background === "white" ? "bg-white" : "bg-sand-100",
        className
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className={isImageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"}
          >
            {label && (
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {label}
              </span>
            )}
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
              {title}
            </h2>

            {contentArray.map((paragraph, index) => (
              <p
                key={index}
                className={cn(
                  "text-neutral-600 leading-relaxed",
                  index === 0 ? "text-lg mb-6" : "mb-6"
                )}
              >
                {paragraph}
              </p>
            ))}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-sand-100 px-3 py-1.5 rounded-full text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Info Box */}
            {infoBox && (
              <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-shell mb-6">
                {infoBox.icon && (
                  <infoBox.icon className="w-5 h-5 text-shell mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-ink mb-1">{infoBox.title}</p>
                  <p className="text-sm text-neutral-600">{infoBox.content}</p>
                </div>
              </div>
            )}

            {/* CTA Link */}
            {ctaLink && ctaText && (
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 text-navy font-medium hover:text-shell transition-colors"
              >
                {ctaText}
                <ArrowRight size={16} />
              </Link>
            )}
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg",
              isImageLeft ? "order-1 lg:order-1" : "order-1 lg:order-2"
            )}
          >
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
