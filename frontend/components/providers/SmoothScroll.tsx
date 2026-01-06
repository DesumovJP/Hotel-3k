"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/accessibility";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Initialize Lenis with premium feel settings
    lenisRef.current = new Lenis({
      duration: 1.0, // Slightly faster for better responsiveness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1, // Normal scroll speed
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1, // Linear interpolation for smoother edge behavior
    });

    // GSAP ScrollTrigger integration
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Expose lenis instance globally for GSAP ScrollTrigger
    (window as unknown as { lenis: Lenis }).lenis = lenisRef.current;

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}

// Hook to access Lenis instance
export function useLenis() {
  const getLenis = () => (window as unknown as { lenis: Lenis | undefined }).lenis;

  const scrollTo = (target: string | number | HTMLElement, options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      // Fallback for reduced motion
      if (typeof target === "string") {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return { scrollTo, getLenis };
}
