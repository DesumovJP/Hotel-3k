"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export function NavLink({
  href,
  children,
  className,
  isActive = false,
}: NavLinkProps) {
  return (
    <Link href={href} className={cn("relative group", className)}>
      <motion.span
        className={cn(
          "inline-block text-sm font-medium tracking-wide uppercase",
          "transition-colors duration-300",
          isActive
            ? "text-[var(--color-ocean)]"
            : "text-[var(--color-gray-700)] hover:text-[var(--color-ocean)]"
        )}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-[var(--color-gold)]"
        initial={{ width: isActive ? "100%" : "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      />
    </Link>
  );
}
