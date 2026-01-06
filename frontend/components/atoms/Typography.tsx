"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Heading Component
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends Omit<HTMLMotionProps<"h1">, "ref"> {
  as?: HeadingLevel;
  children: React.ReactNode;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-hero",
  h2: "text-display-xl",
  h3: "text-display-lg",
  h4: "text-display-md",
  h5: "text-display-sm",
  h6: "text-body-lg",
};

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = "h2", className, children, ...props }, ref) => {
    const Component = motion[as] as typeof motion.h1;

    return (
      <Component
        ref={ref}
        className={cn(
          "font-heading font-light tracking-tight text-[var(--color-ink)]",
          headingStyles[as],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

// Text Component
type TextSize = "xs" | "sm" | "base" | "lg" | "xl";

interface TextProps extends Omit<HTMLMotionProps<"p">, "ref"> {
  size?: TextSize;
  muted?: boolean;
  children: React.ReactNode;
}

const textSizes: Record<TextSize, string> = {
  xs: "text-caption",
  sm: "text-body-sm",
  base: "text-body-md",
  lg: "text-body-lg",
  xl: "text-body-xl",
};

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = "base", muted = false, className, children, ...props }, ref) => {
    return (
      <motion.p
        ref={ref}
        className={cn(
          "font-light leading-relaxed",
          textSizes[size],
          muted ? "text-[var(--color-slate)]" : "text-[var(--color-charcoal)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.p>
    );
  }
);

Text.displayName = "Text";

// Label Component - ultra minimal
interface LabelProps extends Omit<HTMLMotionProps<"span">, "ref"> {
  children: React.ReactNode;
}

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-block text-overline",
          "text-[var(--color-slate)]",
          className
        )}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

Label.displayName = "Label";

export { Heading, Text, Label };
export type { HeadingProps, TextProps, LabelProps };
