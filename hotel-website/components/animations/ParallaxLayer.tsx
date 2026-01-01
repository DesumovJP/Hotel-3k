"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Positive = moves slower, negative = moves faster
  direction?: "vertical" | "horizontal";
  offset?: [string, string]; // Start and end offset percentages
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  direction = "vertical",
  offset = ["0%", "100%"],
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = 100 * speed;

  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical"
      ? [`${-range}%`, `${range}%`]
      : [`${-range}%`, `${range}%`]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          [direction === "vertical" ? "y" : "x"]: transform,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Multi-layer parallax container
interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface ParallaxItemProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // 0 = no movement, 1 = max movement
  scale?: boolean; // Scale on scroll
}

export function ParallaxContainer({ children, className }: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}

export function useParallax(scrollProgress: MotionValue<number>, depth: number = 0.5) {
  const y = useTransform(scrollProgress, [0, 1], [`${-50 * depth}%`, `${50 * depth}%`]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1 + 0.1 * depth, 1, 1 + 0.1 * depth]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return { y, scale, opacity };
}

// Parallax image component
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  scale = 1.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-20 * speed}%`, `${20 * speed}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
