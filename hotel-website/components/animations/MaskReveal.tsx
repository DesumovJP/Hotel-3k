"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface MaskRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionVariants = {
  left: {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0% 0 0)" },
  },
  right: {
    hidden: { clipPath: "inset(0 0 0 100%)" },
    visible: { clipPath: "inset(0 0 0 0%)" },
  },
  up: {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: { clipPath: "inset(0% 0 0 0)" },
  },
  down: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: { clipPath: "inset(0 0 0% 0)" },
  },
};

export function MaskReveal({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.8,
  once = true,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directionVariants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Alternative: Overlay reveal (colored bar slides across)
interface OverlayRevealProps {
  children: React.ReactNode;
  className?: string;
  overlayColor?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function OverlayReveal({
  children,
  className,
  overlayColor = "var(--color-ink)",
  direction = "left",
  delay = 0,
  duration = 1,
  once = true,
}: OverlayRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const overlayVariants = {
    left: {
      initial: { x: "-100%" },
      animate: { x: "100%" },
    },
    right: {
      initial: { x: "100%" },
      animate: { x: "-100%" },
    },
    up: {
      initial: { y: "100%" },
      animate: { y: "-100%" },
    },
    down: {
      initial: { y: "-100%" },
      animate: { y: "100%" },
    },
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
        initial={overlayVariants[direction].initial}
        animate={isInView ? overlayVariants[direction].animate : overlayVariants[direction].initial}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </div>
  );
}
