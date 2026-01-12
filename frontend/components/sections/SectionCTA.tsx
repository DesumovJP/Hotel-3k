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
        <div>
          {Icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="neo-icon neo-icon-lg mx-auto mb-6 group/icon cursor-default"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="w-6 h-6 text-shell" />
              </motion.div>
            </motion.div>
          )}

          {label && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
              className="text-overline text-shell mb-4 block"
            >
              {label}
            </motion.span>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOutExpo }}
            className={cn(
              "text-display-lg mb-4",
              isDark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
            className={cn(
              "text-body-md mb-8 max-w-xl mx-auto",
              isDark ? "text-white/70" : "text-neutral-600"
            )}
          >
            {description}
          </motion.p>

          {actions && actions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25, ease: easeOutExpo }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {actions.map((action, index) => {
                const ActionIcon = action.icon;
                const isPrimary = action.variant !== "secondary";
                const isLink = isExternal(action.href);

                const buttonClasses = cn(
                  "group inline-flex items-center justify-center gap-2 px-8 py-4 transition-all text-sm tracking-wide",
                  "hover:scale-[1.02] active:scale-[0.98]",
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
                      {!ActionIcon && isPrimary && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
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
                    {!ActionIcon && isPrimary && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
