"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  /** Show only after scrolling past this percentage */
  showAfter?: number;
}

// Page-level scroll progress bar
export function ScrollProgress({
  className,
  color = "var(--color-sea)",
  height = 2,
  position = "top",
  showAfter = 0,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(showAfter === 0);

  // Use lighter spring settings to avoid conflicts with Lenis smooth scroll
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.01,
  });

  // Use useEffect with scroll listener instead of useMotionValueEvent
  useEffect(() => {
    if (showAfter === 0) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > showAfter);
    };

    // Passive listener is already set - keep it
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 z-[100] origin-left transform-gpu",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{
        scaleX,
        height,
        backgroundColor: color,
        willChange: "transform",
        contain: "layout style paint",
        backfaceVisibility: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  );
}

// Scroll dots navigation (side navigation)
interface ScrollDotsProps {
  className?: string;
  sections: { id: string; label: string }[];
  color?: string;
  inactiveColor?: string;
}

export function ScrollDots({
  className,
  sections,
  color = "var(--color-ink)",
  inactiveColor = "var(--color-fog)",
}: ScrollDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={cn("fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3", className)}>
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          className="group relative flex items-center"
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.1 }}
        >
          {/* Label on hover */}
          <span className="absolute right-full mr-3 whitespace-nowrap text-xs uppercase tracking-wider text-[var(--color-slate)] opacity-0 group-hover:opacity-100 transition-opacity">
            {section.label}
          </span>
          {/* Dot */}
          <motion.div
            className="w-2 h-2 rounded-full transition-colors duration-300"
            animate={{
              backgroundColor: index === activeIndex ? color : inactiveColor,
              scale: index === activeIndex ? 1.5 : 1,
            }}
          />
        </motion.button>
      ))}
    </div>
  );
}

// Section progress indicator
interface SectionProgressProps {
  className?: string;
  sections: string[];
  activeIndex: number;
}

export function SectionProgress({
  className,
  sections,
  activeIndex,
}: SectionProgressProps) {
  return (
    <div className={cn("fixed right-8 top-1/2 -translate-y-1/2 z-40", className)}>
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <div
            key={section}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span
              className={cn(
                "text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity",
                index === activeIndex ? "text-[var(--color-ink)]" : "text-[var(--color-slate)]"
              )}
            >
              {section}
            </span>
            <motion.div
              className="relative"
              animate={{
                scale: index === activeIndex ? 1.5 : 1,
              }}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === activeIndex
                    ? "bg-[var(--color-ink)]"
                    : "bg-[var(--color-fog)]"
                )}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Circular progress indicator
interface CircularProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  trackColor?: string;
}

export function CircularProgress({
  progress,
  size = 60,
  strokeWidth = 4,
  className,
  color = "var(--color-sea)",
  trackColor = "var(--color-fog)",
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - progress * circumference;

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          style={{
            strokeDasharray: circumference,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        />
      </svg>
    </div>
  );
}
