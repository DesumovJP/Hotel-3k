"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CTAAction {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
}

interface SectionCTAProps {
  icon?: LucideIcon;
  label?: string;
  title: string;
  description: string;
  actions?: CTAAction[];
  background?: "white" | "sand" | "navy";
  className?: string;
}

export function SectionCTA({
  icon: Icon,
  label,
  title,
  description,
  actions,
  background = "white",
  className,
}: SectionCTAProps) {
  const isExternal = (href: string) => href.startsWith("mailto:") || href.startsWith("tel:");
  const isDark = background === "navy";

  return (
    <section
      className={cn(
        "py-16 md:py-24",
        isDark ? "bg-navy text-white" : background === "sand" ? "bg-sand-100" : "bg-white",
        className
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          {Icon && (
            <div className="neo-icon neo-icon-lg mx-auto mb-6">
              <Icon className="w-6 h-6 text-shell" />
            </div>
          )}

          {label && (
            <span className="text-overline text-shell mb-4 block">
              {label}
            </span>
          )}

          <h2 className={cn(
            "text-display-lg mb-4",
            isDark ? "text-white" : "text-ink"
          )}>
            {title}
          </h2>

          <p className={cn(
            "text-body-md mb-8 max-w-xl mx-auto",
            isDark ? "text-white/70" : "text-neutral-600"
          )}>
            {description}
          </p>

          {actions && actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {actions.map((action, index) => {
                const ActionIcon = action.icon;
                const isPrimary = action.variant !== "secondary";
                const isLink = isExternal(action.href);

                const buttonClasses = cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 transition-colors text-sm tracking-wide",
                  isPrimary
                    ? isDark
                      ? "bg-shell text-navy hover:bg-white"
                      : "bg-ink text-white hover:bg-ink/90"
                    : isDark
                      ? "border border-white/30 text-white hover:bg-white/10"
                      : "border border-ink text-ink hover:bg-ink hover:text-white"
                );

                if (isLink) {
                  return (
                    <a
                      key={index}
                      href={action.href}
                      className={buttonClasses}
                    >
                      {ActionIcon && <ActionIcon size={16} />}
                      {action.label}
                      {!ActionIcon && isPrimary && <ArrowRight size={16} />}
                    </a>
                  );
                }

                return (
                  <Link
                    key={index}
                    href={action.href}
                    className={buttonClasses}
                  >
                    {ActionIcon && <ActionIcon size={16} />}
                    {action.label}
                    {!ActionIcon && isPrimary && <ArrowRight size={16} />}
                  </Link>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
