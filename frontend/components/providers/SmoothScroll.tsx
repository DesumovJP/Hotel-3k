"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider - Now uses native scroll for maximum performance
 *
 * Benefits of native scroll:
 * - GPU-accelerated at 60-120fps
 * - No JavaScript overhead
 * - Better battery life on mobile
 * - Consistent behavior across all browsers
 * - Works perfectly with Framer Motion animations
 */
export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Just render children directly - no wrapper needed
  return <>{children}</>;
}

// Hook for programmatic scrolling (uses native smooth scroll)
export function useLenis() {
  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
    }
  ) => {
    const behavior = options?.immediate ? "instant" : "smooth";

    if (typeof target === "number") {
      window.scrollTo({ top: target + (options?.offset || 0), behavior });
    } else if (typeof target === "string") {
      const element = document.querySelector(target);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + (options?.offset || 0);
        window.scrollTo({ top, behavior });
      }
    } else if (target instanceof HTMLElement) {
      const top = target.getBoundingClientRect().top + window.scrollY + (options?.offset || 0);
      window.scrollTo({ top, behavior });
    }
  };

  const getLenis = () => null; // No Lenis instance
  const resize = () => {}; // No-op, native scroll handles this

  return { scrollTo, getLenis, resize };
}
