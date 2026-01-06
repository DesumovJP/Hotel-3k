"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/accessibility";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
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

    // RAF loop for smooth animation
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    // Expose lenis instance globally for GSAP ScrollTrigger
    (window as unknown as { lenis: Lenis }).lenis = lenisRef.current;

    // Force resize after content loads to fix height calculation
    const handleResize = () => {
      lenisRef.current?.resize();
    };

    // Initial resize after DOM is ready
    requestAnimationFrame(() => {
      handleResize();
      // Additional resize after images/fonts load
      setTimeout(handleResize, 500);
      setTimeout(handleResize, 1500);
    });

    // Listen for window resize
    window.addEventListener("resize", handleResize);

    // ResizeObserver for dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(document.body);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
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
