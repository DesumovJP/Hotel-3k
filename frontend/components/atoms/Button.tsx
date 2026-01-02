"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Button Component - Elegant Hotel Design System
 *
 * @variant primary - Deep sea blue background, white text (main CTAs)
 * @variant secondary - Transparent with blue border/text (secondary actions)
 * @variant ghost - Transparent, subtle hover (tertiary actions)
 * @variant light - White background, blue text (for dark backgrounds)
 * @variant glass - Glassmorphism style
 *
 * @size sm - Compact (36px height)
 * @size md - Default (44px height - WCAG tap target)
 * @size lg - Large (52px height)
 *
 * All variants feature elegant hover/active states visible on both light and dark backgrounds
 */

type ButtonVariant = "primary" | "secondary" | "ghost" | "light" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  // Primary: Blue background, white text
  // Hover: Lighter blue with subtle shadow
  // Active: Darker blue, pressed feel
  primary: [
    "bg-deepsea text-white",
    "hover:bg-deepsea-600 hover:shadow-lg hover:shadow-deepsea/20",
    "active:bg-deepsea-800 active:shadow-none",
  ].join(" "),

  // Secondary: Transparent with blue border/text
  // Hover: Fill with blue, text becomes white
  // Active: Darker blue fill
  secondary: [
    "bg-transparent border-2 border-deepsea text-deepsea",
    "hover:bg-deepsea hover:text-white hover:border-deepsea",
    "active:bg-deepsea-800 active:border-deepsea-800",
  ].join(" "),

  // Ghost: Minimal styling for tertiary actions
  // Hover: Subtle background tint
  // Active: Slightly darker
  ghost: [
    "bg-transparent text-ink/70",
    "hover:text-ink hover:bg-ink/5",
    "active:bg-ink/10",
  ].join(" "),

  // Light: White background for dark backgrounds
  // Hover: Subtle cream tint with shadow
  // Active: Slightly darker
  light: [
    "bg-white text-deepsea",
    "hover:bg-sand-50 hover:shadow-lg hover:shadow-white/20",
    "active:bg-sand-100 active:shadow-none",
  ].join(" "),

  // Glass: Glassmorphism for overlays
  // Hover: More opaque
  // Active: Solid white
  glass: [
    "bg-white/10 backdrop-blur-sm border border-white/20 text-white",
    "hover:bg-white/20 hover:border-white/30",
    "active:bg-white/30",
  ].join(" "),
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs min-h-[36px]",
  md: "px-7 py-3 text-sm min-h-[44px]",
  lg: "px-9 py-4 text-sm min-h-[52px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth = false, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2",
          "font-medium tracking-[0.08em] uppercase",
          // Smooth transitions for all interactive states
          "transition-all duration-200 ease-out",
          "rounded-sm",
          // Accessibility
          "tap-target focus-visible-ring",
          "disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none",
          // Variant and size
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
