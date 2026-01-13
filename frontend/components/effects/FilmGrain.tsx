"use client";

import { useReducedMotion } from "@/lib/accessibility";
import { cn } from "@/lib/utils";

interface FilmGrainProps {
  opacity?: number;
  className?: string;
  blend?: "overlay" | "soft-light" | "multiply" | "screen";
}

/**
 * Film Grain Overlay - Performance Optimized
 * Uses CSS pseudo-element with inline SVG data URI instead of live SVG filter.
 * The SVG filter is baked into a static background pattern for 120fps performance.
 */
export function FilmGrain({
  opacity = 0.03,
  className,
  blend = "overlay",
}: FilmGrainProps) {
  const prefersReducedMotion = useReducedMotion();

  // Skip grain for reduced motion preference
  if (prefersReducedMotion) return null;

  // Performance: Use CSS background with data URI instead of live SVG filter
  // This avoids per-frame filter computation
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50",
        className
      )}
      style={{
        mixBlendMode: blend,
        opacity,
        contain: "strict",
        // Pre-rendered noise texture as data URI - much faster than live feTurbulence
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        // Prevent bounce on mobile scroll
        overscrollBehavior: 'none',
        touchAction: 'none',
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Vignette Effect
 * Adds a subtle darkening around the edges for a cinematic feel.
 */
export function Vignette({
  intensity = 0.15,
  className,
}: {
  intensity?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-40",
        className
      )}
      style={{
        background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,${intensity}) 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
