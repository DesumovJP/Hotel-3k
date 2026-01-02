"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has reduced motion preference enabled
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation props based on reduced motion preference
 * Returns empty object if reduced motion is preferred
 */
export function useMotionSafe<T extends object>(
  motionProps: T,
  reducedMotionProps?: Partial<T>
): T | Partial<T> {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return reducedMotionProps || {};
  }

  return motionProps;
}
