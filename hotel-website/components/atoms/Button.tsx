"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-600",
  secondary:
    "bg-transparent border border-navy text-navy hover:bg-navy hover:text-white",
  ghost:
    "bg-transparent text-navy-500 hover:text-navy",
  light:
    "bg-white text-navy hover:bg-sand-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-sm",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth = false, className, children, ...props },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "font-light tracking-[0.15em] uppercase",
          "transition-colors duration-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shell focus-visible:ring-offset-2",
          "disabled:opacity-40 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
