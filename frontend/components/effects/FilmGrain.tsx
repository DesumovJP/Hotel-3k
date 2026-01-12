"use client";

import { useReducedMotion } from "@/lib/accessibility";
import { cn } from "@/lib/utils";

interface FilmGrainProps {
  opacity?: number;
  className?: string;
  blend?: "overlay" | "soft-light" | "multiply" | "screen";
}

/**
 * Film Grain Overlay
 * Adds a subtle analog film texture that creates a premium, editorial feel.
 * Inspired by luxury brands like Aman and high-end fashion websites.
 */
export function FilmGrain({
  opacity = 0.03,
  className,
  blend = "overlay",
}: FilmGrainProps) {
  const prefersReducedMotion = useReducedMotion();

  // Skip grain animation for reduced motion preference
  if (prefersReducedMotion) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 transform-gpu",
        className
      )}
      style={{
        mixBlendMode: blend,
        opacity,
        willChange: "auto",
        contain: "strict",
        isolation: "isolate",
      }}
      aria-hidden="true"
    >
      {/* Static grain texture - no animation for better performance */}
      <svg className="w-full h-full" style={{ transform: "translate3d(0,0,0)" }}>
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#film-grain)"
        />
      </svg>
    </div>
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
