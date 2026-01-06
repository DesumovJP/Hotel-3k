"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

/**
 * FeatureGrid - Unified grid of feature/value cards with neomorphic icons
 *
 * USAGE:
 * <FeatureGrid
 *   label="Local Sourcing"
 *   title="Ingredients with a story"
 *   items={[
 *     { icon: Heart, title: "Genuine Hospitality", description: "..." },
 *   ]}
 * />
 */

export interface FeatureItem {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  /** Section label (small text above title) */
  label?: string;
  /** Section title */
  title?: string;
  /** Feature items */
  items: FeatureItem[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Whether to animate items */
  animate?: boolean;
  /** Background style (only used when asSection=true) */
  background?: "white" | "sand";
  /** Render as full section with padding (default: true) */
  asSection?: boolean;
  className?: string;
}

export function FeatureGrid({
  label,
  title,
  items,
  columns = 3,
  animate = true,
  background = "sand",
  asSection = true,
  className,
}: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const bgClass = background === "sand" ? "bg-sand-100" : "bg-white";

  const renderItem = (item: FeatureItem, index: number) => {
    const Icon = item.icon;

    const content = (
      <div className="text-center">
        {/* Neomorphic Icon */}
        {Icon && (
          <div className="neo-icon neo-icon-lg mx-auto mb-4">
            <Icon size={24} className="text-shell" />
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-xl text-ink mb-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-600 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    );

    if (!animate) {
      return <div key={item.title}>{content}</div>;
    }

    return (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: easeOutExpo,
        }}
      >
        {content}
      </motion.div>
    );
  };

  const headerContent = (label || title) && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      {label && (
        <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
          {label}
        </span>
      )}
      {title && (
        <h2 className="font-display text-3xl md:text-4xl text-ink">
          {title}
        </h2>
      )}
    </motion.div>
  );

  const gridContent = (
    <div className={cn("grid grid-cols-1 gap-8", gridCols[columns])}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );

  // Render without section wrapper
  if (!asSection) {
    return (
      <div className={className}>
        {headerContent}
        {gridContent}
      </div>
    );
  }

  // Render as full section
  return (
    <section className={cn("py-16 md:py-20", bgClass, className)}>
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {headerContent}
        {gridContent}
      </div>
    </section>
  );
}
