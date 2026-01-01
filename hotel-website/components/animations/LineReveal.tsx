"use client";

import { useRef, useEffect, Children, isValidElement } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
}

// Reveals text line by line with mask effect
export function LineReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.6,
  once = true,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // If children is a string, split by newline or treat as single line
  const lines = typeof children === "string"
    ? children.split("\n")
    : Children.toArray(children);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div variants={lineVariants}>
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

// Paragraph reveal - for longer text blocks
interface ParagraphRevealProps {
  children: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ParagraphReveal({
  children,
  className,
  delay = 0,
  once = true,
}: ParagraphRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.p
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.p>
  );
}

// Word-by-word reveal with blur
interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function WordReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.05,
  once = true,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline", className)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
