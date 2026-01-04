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
  // Primary: Simple white text for dark backgrounds
  primary: [
    "bg-transparent text-white",
    "hover:text-white/80",
    "active:text-white/60",
  ].join(" "),

  // Secondary: Simple white text
  secondary: [
    "bg-transparent text-white/80",
    "hover:text-white",
    "active:text-white/60",
  ].join(" "),

  // Ghost: Minimal
  ghost: [
    "bg-transparent text-ink/70",
    "hover:text-ink hover:bg-ink/5",
    "active:bg-ink/10",
  ].join(" "),

  // Light: For dark backgrounds
  light: [
    "bg-sand-100 text-ink/80",
    "hover:bg-sand-200",
    "active:bg-sand-300",
  ].join(" "),

  // Glass: Simple white text
  glass: [
    "bg-transparent text-white/80",
    "hover:text-white",
    "active:text-white/60",
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
          "rounded-full",
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
