"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * InfoStrip - Bar showing quick info items
 *
 * USAGE:
 * <InfoStrip items={[
 *   { icon: Clock, label: "Reception", value: "24h" },
 *   { icon: Bed, label: "22 Rooms" },
 *   { icon: Check, value: "Book Direct: Free Sauna", highlight: true },
 * ]} variant="sand" />
 *
 * REDESIGN: Change colors/layout here to affect all pages
 */

export interface InfoStripItem {
  icon?: LucideIcon;
  label?: string;
  value?: string;
  highlight?: boolean;
}

export interface InfoStripProps {
  items: InfoStripItem[];
  /** Optional trailing content (e.g., a CTA link) */
  trailing?: React.ReactNode;
  /** Background variant */
  variant?: "navy" | "dark" | "sand";
  className?: string;
}

export function InfoStrip({
  items,
  trailing,
  variant = "sand",
  className,
}: InfoStripProps) {
  const isSand = variant === "sand";

  return (
    <section
      className={cn(
        "py-4",
        isSand
          ? "neo-bar"
          : variant === "navy"
          ? "bg-navy text-white border-t border-white/10"
          : "bg-[#212B36] text-white border-t border-white/10",
        className
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex items-center gap-2">
                {Icon && (
                  <Icon size={16} className="text-shell" />
                )}
                {item.label && (
                  <span className={isSand ? "text-neutral-500" : "text-white/60"}>
                    {item.label}
                  </span>
                )}
                {item.value && (
                  <span
                    className={cn(
                      isSand ? "text-ink font-medium" : "",
                      item.highlight && "text-shell"
                    )}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            );
          })}

          {/* Trailing content */}
          {trailing}
        </div>
      </div>
    </section>
  );
}
