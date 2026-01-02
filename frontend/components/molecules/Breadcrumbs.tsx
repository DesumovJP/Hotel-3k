"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "py-4 px-6 md:px-12 lg:px-24 bg-sand-50 border-b border-sand-200",
        className
      )}
    >
      <ol className="flex items-center gap-2 text-sm max-w-6xl mx-auto flex-wrap">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-neutral-500 hover:text-navy transition-colors"
          >
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-neutral-400" />
              {isLast || !item.href ? (
                <span className="text-navy font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-neutral-500 hover:text-navy transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Inline variant for placing inside content sections (after hero)
interface BreadcrumbsInlineProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbsInline({ items, className }: BreadcrumbsInlineProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("py-3", className)}
    >
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-neutral-400 hover:text-navy transition-colors"
          >
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-neutral-300" />
              {isLast || !item.href ? (
                <span className="text-neutral-600">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-neutral-400 hover:text-navy transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
