"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  speed?: number; // How much horizontal movement per scroll
  direction?: "left" | "right";
}

export function HorizontalScroll({
  children,
  className,
  contentClassName,
  speed = 1,
  direction = "left",
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const multiplier = direction === "left" ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${multiplier * 30 * speed}%`]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        ref={contentRef}
        style={{ x }}
        className={cn("flex gap-6", contentClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Full horizontal scroll section (vertical scroll = horizontal movement)
interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  panels: number; // Number of panels/screens
}

export function HorizontalScrollSection({
  children,
  className,
  panels = 3,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(panels - 1) * 100}%`]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${panels * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// Marquee/Ticker effect
interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap",
        pauseOnHover && "group",
        className
      )}
    >
      <motion.div
        className={cn(
          "inline-flex gap-8",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
