"use client";

import { cn } from "@/lib/utils";

interface GrainProps {
  className?: string;
  opacity?: number;
  blend?: "overlay" | "soft-light" | "multiply" | "screen";
}

// Subtle film grain overlay for premium feel
export function Grain({
  className,
  opacity = 0.03,
  blend = "overlay",
}: GrainProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[9999]",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
        mixBlendMode: blend,
      }}
    />
  );
}

// Vignette effect
interface VignetteProps {
  className?: string;
  intensity?: number;
  color?: string;
}

export function Vignette({
  className,
  intensity = 0.3,
  color = "black",
}: VignetteProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        background: `radial-gradient(ellipse at center, transparent 0%, ${color} 150%)`,
        opacity: intensity,
      }}
    />
  );
}

// Gradient overlay
interface GradientOverlayProps {
  className?: string;
  direction?: "top" | "bottom" | "left" | "right" | "radial";
  from?: string;
  to?: string;
  opacity?: number;
}

export function GradientOverlay({
  className,
  direction = "bottom",
  from = "transparent",
  to = "black",
  opacity = 0.5,
}: GradientOverlayProps) {
  const gradients = {
    top: `linear-gradient(to top, ${from}, ${to})`,
    bottom: `linear-gradient(to bottom, ${from}, ${to})`,
    left: `linear-gradient(to left, ${from}, ${to})`,
    right: `linear-gradient(to right, ${from}, ${to})`,
    radial: `radial-gradient(circle, ${from}, ${to})`,
  };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        background: gradients[direction],
        opacity,
      }}
    />
  );
}

// Animated gradient background
interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

export function AnimatedGradient({
  className,
  colors = ["var(--color-mist)", "var(--color-snow)", "var(--color-sand)"],
  speed = 15,
}: AnimatedGradientProps) {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        background: `linear-gradient(-45deg, ${colors.join(", ")})`,
        backgroundSize: "400% 400%",
        animation: `gradient ${speed}s ease infinite`,
      }}
    >
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

// Noise texture background
interface NoiseBackgroundProps {
  className?: string;
  opacity?: number;
}

export function NoiseBackground({
  className,
  opacity = 0.5,
}: NoiseBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}
