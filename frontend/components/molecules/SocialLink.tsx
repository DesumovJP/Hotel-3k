"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  className?: string;
}

export function SocialLink({
  href,
  icon: Icon,
  label,
  className,
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center",
        "w-10 h-10 rounded-full",
        "bg-[var(--color-sand)] text-[var(--color-ocean)]",
        "hover:bg-[var(--color-ocean)] hover:text-white",
        "transition-colors duration-300",
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={18} />
    </motion.a>
  );
}
