"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useReducedMotion } from "@/lib/accessibility";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsReady(true);
      return;
    }

    if (!wrapperRef.current || !contentRef.current) return;

    // Add lenis class to html for CSS
    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Initialize Lenis with wrapper approach for reliable height calculation
    lenisRef.current = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    setIsReady(true);

    // RAF loop for smooth animation
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    rafIdRef.current = requestAnimationFrame(raf);

    // Expose lenis instance globally
    (window as unknown as { lenis: Lenis }).lenis = lenisRef.current;

    // Force resize function
    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
    };

    // Debounced resize for performance - use RAF for smoother updates
    let resizeTimeout: NodeJS.Timeout;
    let rafId: number | null = null;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      resizeTimeout = setTimeout(() => {
        rafId = requestAnimationFrame(handleResize);
      }, 100);
    };

    // Initial resize sequence - optimized for 120fps
    handleResize();
    setTimeout(handleResize, 200);
    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);

    // Listen for window resize with passive listener
    window.addEventListener("resize", debouncedResize, { passive: true });

    // Listen for load event
    window.addEventListener("load", handleResize);

    // Listen for all images loading
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", debouncedResize, { passive: true });
      }
    });

    // MutationObserver for dynamic content - only watch content container for performance
    let mutationTimeout: NodeJS.Timeout;
    const mutationObserver = new MutationObserver(() => {
      // Batch mutation callbacks with longer debounce
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(debouncedResize, 200);
    });
    // Watch only the content container instead of entire body
    if (contentRef.current) {
      mutationObserver.observe(contentRef.current, {
        childList: true,
        subtree: false, // Only direct children - much better performance
        attributes: false,
      });
    }

    // ResizeObserver for element size changes
    const resizeObserver = new ResizeObserver(() => {
      debouncedResize();
    });
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      clearTimeout(resizeTimeout);
      clearTimeout(mutationTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("load", handleResize);
      images.forEach((img) => {
        img.removeEventListener("load", debouncedResize);
      });
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      lenisRef.current?.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [prefersReducedMotion]);

  // If reduced motion is preferred, just render children without wrapper
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div
      ref={wrapperRef}
      className="lenis-wrapper fixed inset-0 overflow-auto"
      style={{ contain: "strict" }}
    >
      <div
        ref={contentRef}
        className="lenis-content"
      >
        {children}
      </div>
    </div>
  );
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

  // Force resize - useful after dynamic content loads
  const resize = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.resize();
    }
  };

  return { scrollTo, getLenis, resize };
}
