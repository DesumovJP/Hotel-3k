"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextHighlightProps {
  children: string;
  className?: string;
  highlightColor?: string;
  highlightWords?: string[];
}

// Highlights specific words as user scrolls
export function TextHighlight({
  children,
  className,
  highlightColor = "var(--color-sea)",
  highlightWords = [],
}: TextHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = children.split(" ");

  return (
    <p ref={ref} className={cn("", className)}>
      {words.map((word, index) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <Word
            key={index}
            word={word}
            index={index}
            total={words.length}
            progress={scrollYProgress}
            isHighlighted={isHighlighted}
            highlightColor={highlightColor}
          />
        );
      })}
    </p>
  );
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  isHighlighted: boolean;
  highlightColor: string;
}

function Word({ word, index, total, progress, isHighlighted, highlightColor }: WordProps) {
  const start = index / total;
  const end = start + 1 / total;

  const opacity = useTransform(progress, [start, end], [0.3, 1]);

  return (
    <motion.span
      className="inline-block mr-[0.25em] transition-colors duration-300"
      style={{
        opacity,
        color: isHighlighted ? highlightColor : undefined,
      }}
    >
      {word}
    </motion.span>
  );
}

// Scroll-linked text reveal (opacity based on scroll position)
interface ScrollTextProps {
  children: string;
  className?: string;
}

export function ScrollText({ children, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  const words = children.split(" ");

  return (
    <p ref={ref} className={cn("", className)}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;

        return (
          <ScrollWord
            key={index}
            word={word}
            start={start}
            end={end}
            progress={scrollYProgress}
          />
        );
      })}
    </p>
  );
}

interface ScrollWordProps {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function ScrollWord({ word, start, end, progress }: ScrollWordProps) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const blur = useTransform(progress, [start, end], [4, 0]);

  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      style={{
        opacity,
        filter: blur.get() > 0 ? `blur(${blur}px)` : "none",
      }}
    >
      {word}
    </motion.span>
  );
}

// Gradient text highlight on scroll
interface GradientRevealProps {
  children: string;
  className?: string;
  gradient?: string;
}

export function GradientReveal({
  children,
  className,
  gradient = "linear-gradient(90deg, var(--color-ink), var(--color-sea))",
}: GradientRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["0% 100%", "100% 100%"]);

  return (
    <motion.span
      ref={ref}
      className={cn("bg-clip-text", className)}
      style={{
        backgroundImage: gradient,
        backgroundSize,
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        transition: "background-size 0.3s ease-out",
      }}
    >
      {children}
    </motion.span>
  );
}

// Underline reveal animation
interface UnderlineRevealProps {
  children: ReactNode;
  className?: string;
  color?: string;
  thickness?: number;
}

export function UnderlineReveal({
  children,
  className,
  color = "var(--color-sea)",
  thickness = 2,
}: UnderlineRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center center"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 right-0 origin-left"
        style={{
          height: thickness,
          backgroundColor: color,
          scaleX,
        }}
      />
    </span>
  );
}
