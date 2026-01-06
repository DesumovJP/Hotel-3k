"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon, Mail, Phone, MapPin, Check } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CTAAction {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  note?: string;
}

interface SectionCTAProps {
  icon?: LucideIcon;
  label?: string;
  title: string;
  description: string;
  actions?: CTAAction[];
  contact?: ContactInfo;
  background?: "white" | "sand" | "navy";
  className?: string;
}

export function SectionCTA({
  icon: Icon,
  label,
  title,
  description,
  actions,
  contact,
  background = "white",
  className,
}: SectionCTAProps) {
  const isExternal = (href: string) => href.startsWith("mailto:") || href.startsWith("tel:");
  const isDark = background === "navy";

  // Contact variant - two column layout
  if (contact) {
    return (
      <section
        className={cn(
          "py-16 md:py-24",
          isDark ? "bg-navy text-white" : background === "sand" ? "bg-sand-100" : "bg-white",
          className
        )}
      >
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              {label && (
                <span className={cn(
                  "text-xs tracking-[0.2em] uppercase mb-4 block",
                  isDark ? "text-shell" : "text-shell"
                )}>
                  {label}
                </span>
              )}
              <h2 className={cn(
                "font-display text-3xl md:text-4xl mb-4",
                isDark ? "text-white" : "text-ink"
              )}>
                {title}
              </h2>
              <p className={cn(
                "mb-6 leading-relaxed",
                isDark ? "text-white/70" : "text-neutral-600"
              )}>
                {description}
              </p>
              {contact.note && (
                <div className={cn(
                  "flex items-center gap-3 text-sm",
                  isDark ? "text-shell" : "text-shell"
                )}>
                  <Check size={16} />
                  <span>{contact.note}</span>
                </div>
              )}
            </motion.div>

            {/* Right - Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              className={cn(
                "p-8 md:p-10",
                isDark
                  ? "bg-white/5 backdrop-blur-sm border border-white/10"
                  : "bg-white shadow-lg"
              )}
            >
              <div className="space-y-6">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className={cn(
                      "w-12 h-12 flex items-center justify-center flex-shrink-0",
                      isDark ? "bg-shell" : "bg-sand-100"
                    )}>
                      <Mail size={20} className={isDark ? "text-navy" : "text-shell"} />
                    </div>
                    <div>
                      <p className={cn(
                        "text-xs uppercase tracking-wide mb-1",
                        isDark ? "text-white/50" : "text-neutral-400"
                      )}>Email</p>
                      <p className={cn(
                        "transition-colors",
                        isDark
                          ? "text-white group-hover:text-shell"
                          : "text-ink group-hover:text-shell"
                      )}>{contact.email}</p>
                    </div>
                  </a>
                )}

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className={cn(
                      "w-12 h-12 flex items-center justify-center flex-shrink-0",
                      isDark ? "bg-white/10" : "bg-sand-100"
                    )}>
                      <Phone size={20} className="text-shell" />
                    </div>
                    <div>
                      <p className={cn(
                        "text-xs uppercase tracking-wide mb-1",
                        isDark ? "text-white/50" : "text-neutral-400"
                      )}>Phone</p>
                      <p className={cn(
                        "transition-colors",
                        isDark
                          ? "text-white group-hover:text-shell"
                          : "text-ink group-hover:text-shell"
                      )}>{contact.phone}</p>
                    </div>
                  </a>
                )}

                {contact.address && (
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 flex items-center justify-center flex-shrink-0",
                      isDark ? "bg-white/10" : "bg-sand-100"
                    )}>
                      <MapPin size={20} className="text-shell" />
                    </div>
                    <div>
                      <p className={cn(
                        "text-xs uppercase tracking-wide mb-1",
                        isDark ? "text-white/50" : "text-neutral-400"
                      )}>Address</p>
                      <p className={isDark ? "text-white" : "text-ink"}>{contact.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant - centered layout
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
            <span className={cn(
              "text-xs tracking-[0.2em] uppercase mb-4 block",
              isDark ? "text-shell" : "text-shell"
            )}>
              {label}
            </span>
          )}

          <h2 className={cn(
            "font-display text-3xl md:text-4xl mb-4",
            isDark ? "text-white" : "text-ink"
          )}>
            {title}
          </h2>

          <p className={cn(
            "mb-8 max-w-xl mx-auto",
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
