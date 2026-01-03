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
  title: string;
  description: string;
  actions: CTAAction[];
  background?: "white" | "sand";
  className?: string;
}

export function SectionCTA({
  icon: Icon,
  title,
  description,
  actions,
  background = "white",
  className,
}: SectionCTAProps) {
  const isExternal = (href: string) => href.startsWith("mailto:") || href.startsWith("tel:");

  return (
    <section
      className={cn(
        "py-16 md:py-24",
        background === "white" ? "bg-white" : "bg-sand-100",
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

          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
            {title}
          </h2>

          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              const isPrimary = action.variant !== "secondary";
              const isLink = isExternal(action.href);

              const buttonClasses = cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 transition-colors text-sm tracking-wide",
                isPrimary
                  ? "bg-navy text-white hover:bg-navy-600"
                  : "border border-navy text-navy hover:bg-navy hover:text-white"
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
        </motion.div>
      </div>
    </section>
  );
}
