"use client";

import { cn } from "@/lib/utils";
import { BreadcrumbsInline, BreadcrumbItem } from "./Breadcrumbs";

/**
 * BreadcrumbsSection - Wrapper for breadcrumbs with standard styling
 *
 * USAGE:
 * <BreadcrumbsSection items={[{ label: "Rooms" }]} />
 *
 * // With parent:
 * <BreadcrumbsSection items={[
 *   { label: "About", href: "/about" },
 *   { label: "Sister Hotels" }
 * ]} />
 *
 * REDESIGN: Change section styling here to affect all breadcrumb sections
 */

export interface BreadcrumbsSectionProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbsSection({ items, className }: BreadcrumbsSectionProps) {
  return (
    <section
      className={cn(
        "py-6 bg-white border-b border-neutral-100",
        className
      )}
    >
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <BreadcrumbsInline items={items} />
      </div>
    </section>
  );
}
