"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/accessibility";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  duration?: number;
  /** Animation style: 'slide' (from bottom), 'fade' (opacity only), 'blur' (with blur) */
  variant?: "slide" | "fade" | "blur";
  /** Split by: 'words', 'chars', or 'lines' */
  splitBy?: "words" | "chars" | "lines";
  /** Stagger delay between elements */
  stagger?: number;
  /** Only animate once */
  once?: boolean;
}

/**
 * Premium Text Reveal Component
 * Inspired by Aman's subtle, elegant text animations
 */
export function TextReveal({
  children,
  className,
  as: Tag = "p",
  delay = 0,
  duration = 0.6,
  variant = "slide",
  splitBy = "words",
  stagger = 0.03,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  // Split text into elements
  const elements = splitBy === "chars"
    ? children.split("")
    : splitBy === "lines"
    ? children.split("\n")
    : children.split(" ");

  // Animation variants based on style
  const variants = {
    slide: {
      hidden: { y: "100%", opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  };

  // If reduced motion, render static text
  if (prefersReducedMotion) {
    const StaticTag = Tag;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const MotionTag = motion[Tag] as typeof motion.p;

  return (
    <MotionTag
      ref={containerRef as React.RefObject<HTMLParagraphElement>}
      className={cn("overflow-hidden", className)}
      aria-label={children}
    >
      {elements.map((element, i) => (
        <span
          key={i}
          className={cn(
            "inline-block overflow-hidden",
            splitBy === "words" && i < elements.length - 1 && "mr-[0.25em]"
          )}
        >
          <motion.span
            className="inline-block"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[variant]}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1], // Luxury easing
            }}
          >
            {element === " " ? "\u00A0" : element}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Line Reveal - reveals text line by line with a mask
 */
interface LineRevealProps {
  children: string | string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}

export function LineReveal({
  children,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.1,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const lines = Array.isArray(children) ? children : children.split("\n");

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <p key={i} className={lineClassName}>{line}</p>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.p
            className={lineClassName}
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

/**
 * Heading Reveal - specifically for large headings with dramatic effect
 */
interface HeadingRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}

export function HeadingReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: HeadingRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const words = children.split(" ");

  if (prefersReducedMotion) {
    const StaticTag = Tag;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn("overflow-hidden", className)}
      aria-label={children}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={isInView ? { y: 0, rotateX: 0 } : { y: "110%", rotateX: -80 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1], // Expo out
            }}
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Counter Reveal - animated number counting
 */
interface CounterRevealProps {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CounterReveal({
  value,
  className,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CounterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion || !isInView) return;

    const element = ref.current;
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, prefix, suffix, decimals, prefersReducedMotion, isInView]);

  if (prefersReducedMotion) {
    return <span className={className}>{`${prefix}${value.toFixed(decimals)}${suffix}`}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {`${prefix}0${suffix}`}
    </span>
  );
}
