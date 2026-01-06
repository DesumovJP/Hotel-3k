"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

/**
 * FloatingCTA - Mobile floating action button
 *
 * USAGE:
 * <FloatingCTA
 *   label="Check Availability"
 *   href="/book"
 *   icon={ArrowRight}
 * />
 *
 * // Or with phone link
 * <FloatingCTA
 *   label="Book Treatment"
 *   href="tel:+31222317445"
 *   icon={Phone}
 *   variant="pill"
 * />
 *
 * REDESIGN: Change styles/behavior here to affect all floating CTAs
 */

export interface FloatingCTAProps {
  /** Button label */
  label: string;
  /** Link href */
  href: string;
  /** Optional icon */
  icon?: LucideIcon;
  /** Visual variant */
  variant?: "bar" | "pill";
  /** Scroll threshold to show (0-1) */
  showAfter?: number;
  /** Whether the link is external (tel:, mailto:) */
  external?: boolean;
  className?: string;
}

export function FloatingCTA({
  label,
  href,
  icon: Icon = ArrowRight,
  variant = "bar",
  showAfter = 0.15,
  external,
  className,
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrolled > windowHeight * showAfter);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const isExternal = external || href.startsWith("tel:") || href.startsWith("mailto:");

  const buttonContent = (
    <>
      {label}
      {Icon && <Icon size={16} />}
    </>
  );

  const buttonClasses = cn(
    "flex items-center justify-center gap-2 bg-navy text-white text-sm font-medium",
    variant === "bar" && "w-full py-4 tracking-wide uppercase",
    variant === "pill" && "px-6 py-3 shadow-xl rounded-full",
    className
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
          className={cn(
            "fixed z-50 md:hidden",
            variant === "bar"
              ? "bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-neutral-200"
              : "bottom-6 left-1/2 -translate-x-1/2"
          )}
        >
          {isExternal ? (
            <a href={href} className={buttonClasses}>
              {buttonContent}
            </a>
          ) : (
            <Link href={href} className={buttonClasses}>
              {buttonContent}
            </Link>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
