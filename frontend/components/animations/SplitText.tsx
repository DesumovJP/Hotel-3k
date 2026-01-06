"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, Variants, Variant } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  type?: "chars" | "words" | "lines";
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "wave";
  once?: boolean;
}

const animations: Record<string, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  wave: {
    hidden: { y: 20, opacity: 0, rotateX: 90 },
    visible: { y: 0, opacity: 1, rotateX: 0 },
  },
};

export function SplitText({
  children,
  className,
  as: Tag = "span",
  delay = 0,
  duration = 0.05,
  staggerDelay = 0.03,
  type = "chars",
  animation = "fadeUp",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const controls = useAnimation();
  const [elements, setElements] = useState<string[]>([]);

  useEffect(() => {
    if (type === "chars") {
      setElements(children.split(""));
    } else if (type === "words") {
      setElements(children.split(" "));
    } else {
      setElements(children.split("\n"));
    }
  }, [children, type]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  // Trigger animation immediately for above-the-fold content
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          controls.start("visible");
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [controls, elements]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: animations[animation].hidden,
    visible: {
      ...animations[animation].visible,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      aria-label={children}
    >
      {elements.map((element, index) => (
        <span
          key={index}
          className={cn(
            "inline-block overflow-hidden",
            type === "words" && index < elements.length - 1 && "mr-[0.25em]"
          )}
        >
          <motion.span
            className="inline-block"
            variants={itemVariants}
            style={{ transformOrigin: "bottom" }}
          >
            {element === " " ? "\u00A0" : element}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
