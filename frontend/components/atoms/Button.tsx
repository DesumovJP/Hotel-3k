"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

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
  magnetic?: boolean;
  magneticStrength?: number;
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
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      magnetic = false,
      magneticStrength = 0.15,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const magneticRef = useRef<HTMLDivElement>(null);
    const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!magnetic || !magneticRef.current || props.disabled) return;

      const rect = magneticRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMagneticPosition({
        x: (e.clientX - centerX) * magneticStrength,
        y: (e.clientY - centerY) * magneticStrength,
      });
    };

    const handleMouseLeave = () => {
      setMagneticPosition({ x: 0, y: 0 });
    };

    const buttonElement = (
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

    if (!magnetic) return buttonElement;

    return (
      <motion.div
        ref={magneticRef}
        className="inline-block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={magneticPosition}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 15,
          mass: 0.5,
        }}
      >
        {buttonElement}
      </motion.div>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
