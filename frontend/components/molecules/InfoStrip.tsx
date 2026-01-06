"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * InfoStrip - Navy bar showing quick info items
 *
 * USAGE:
 * <InfoStrip items={[
 *   { icon: Clock, label: "Reception", value: "24h" },
 *   { icon: Bed, label: "22 Rooms" },
 *   { icon: Check, value: "Book Direct: Free Sauna", highlight: true },
 * ]} />
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
  variant?: "navy" | "dark";
  className?: string;
}

export function InfoStrip({
  items,
  trailing,
  variant = "navy",
  className,
}: InfoStripProps) {
  return (
    <section
      className={cn(
        "py-4 border-t",
        variant === "navy"
          ? "bg-navy text-white border-white/10"
          : "bg-[#212B36] text-white border-white/10",
        className
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          {items.map((item, index) => {
            const Icon = item.icon;
            const displayText = item.label && item.value
              ? `${item.label}: ${item.value}`
              : item.label || item.value;

            return (
              <div key={index} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-2",
                    item.highlight && "text-shell font-medium"
                  )}
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className={cn(item.highlight ? "text-shell" : "text-shell")}
                    />
                  )}
                  <span>{displayText}</span>
                </div>

                {/* Separator */}
                {index < items.length - 1 && (
                  <span className="hidden md:block ml-8 text-white/30">|</span>
                )}
              </div>
            );
          })}

          {/* Trailing content */}
          {trailing && (
            <>
              <span className="hidden md:block text-white/30">|</span>
              {trailing}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
