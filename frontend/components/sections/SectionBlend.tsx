"use client";

import { cn } from "@/lib/utils";

type BlendColor = "white" | "sand" | "sand-100" | "sand-200" | "navy";

interface SectionBlendProps {
  /** Color of the section above */
  from: BlendColor;
  /** Color of the section below */
  to: BlendColor;
  /** Height of the blend zone */
  height?: "sm" | "md" | "lg" | "xl";
  /** Optional className */
  className?: string;
}

const colorMap: Record<BlendColor, string> = {
  white: "#FFFFFF",
  sand: "#FCF9F4",
  "sand-100": "#FCF9F4",
  "sand-200": "#F9F3E8",
  navy: "#4A4139",
};

// CSS variable names for colors
const cssVarMap: Record<BlendColor, string> = {
  white: "#FFFFFF",
  sand: "var(--color-sand)",
  "sand-100": "var(--color-sand-100)",
  "sand-200": "var(--color-sand-200)",
  navy: "var(--color-navy)",
};

const heightMap = {
  sm: "h-8 md:h-10",
  md: "h-12 md:h-16",
  lg: "h-16 md:h-20",
  xl: "h-20 md:h-24",
};

/**
 * SectionBlend - Creates a smooth gradient transition between two sections
 *
 * Place this component between two sections with different background colors
 * to create a seamless "blurred" transition effect.
 *
 * @example
 * <SectionIntro background="white" />
 * <SectionBlend from="white" to="sand" />
 * <SectionTwoColumn background="sand" />
 */
export function SectionBlend({
  from,
  to,
  height = "md",
  className,
}: SectionBlendProps) {
  const fromColor = cssVarMap[from];
  const toColor = cssVarMap[to];

  return (
    <div
      className={cn(
        "relative w-full",
        heightMap[height],
        className
      )}
      style={{
        background: `linear-gradient(180deg, ${fromColor} 0%, ${toColor} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * Alternative: Section wrapper with built-in blend edges
 * Apply to sections that need blended edges
 */
export function SectionWithBlend({
  children,
  background = "white",
  blendTop,
  blendBottom,
  className,
}: {
  children: React.ReactNode;
  background?: BlendColor;
  blendTop?: BlendColor;
  blendBottom?: BlendColor;
  className?: string;
}) {
  const bgColor = cssVarMap[background];
  const topColor = blendTop ? cssVarMap[blendTop] : null;
  const bottomColor = blendBottom ? cssVarMap[blendBottom] : null;

  return (
    <section
      className={cn("relative", className)}
      style={{ backgroundColor: bgColor }}
    >
      {/* Top blend */}
      {topColor && (
        <div
          className="absolute top-0 left-0 right-0 h-24 md:h-32 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${topColor} 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom blend */}
      {bottomColor && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${bottomColor} 100%)`,
          }}
        />
      )}
    </section>
  );
}
