"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "gold" | "ocean" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-sand-dark)] text-[var(--color-black)]",
  gold: "bg-[var(--color-gold)] text-[var(--color-black)]",
  ocean: "bg-[var(--color-ocean)] text-white",
  outline:
    "bg-transparent border border-[var(--color-ocean)] text-[var(--color-ocean)]",
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center px-3 py-1",
        "text-xs font-medium uppercase tracking-wider",
        "rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.span>
  );
}
