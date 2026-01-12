"use client";

import { ReactNode } from "react";
import { Footer } from "./Footer";
import { FloatingCTA, FloatingCTAProps } from "@/components/molecules";
import { cn } from "@/lib/utils";

/**
 * PageLayout - Standard page wrapper with Footer and optional floating CTA
 * Note: Header is now in layout.tsx outside SmoothScrollProvider for backdrop-filter to work
 *
 * USAGE:
 * <PageLayout>
 *   <SectionHero {...} />
 *   <SectionContent {...} />
 * </PageLayout>
 *
 * // With floating CTA (mobile)
 * <PageLayout floatingCTA={{ label: "Book Now", href: "/book" }}>
 *   ...
 * </PageLayout>
 *
 * REDESIGN: Change page structure here to affect all pages
 */

export interface PageLayoutProps {
  children: ReactNode;
  /** Optional floating CTA for mobile */
  floatingCTA?: FloatingCTAProps;
  /** Add bottom padding for floating CTA */
  hasFloatingCTA?: boolean;
  /** Custom main element class */
  mainClassName?: string;
  /** Disable footer */
  noFooter?: boolean;
}

export function PageLayout({
  children,
  floatingCTA,
  hasFloatingCTA,
  mainClassName,
  noFooter = false,
}: PageLayoutProps) {
  const showPadding = hasFloatingCTA || floatingCTA;

  return (
    <>
      {/* Floating CTA */}
      {floatingCTA && <FloatingCTA {...floatingCTA} />}

      <main className={cn(showPadding && "pb-20 md:pb-0", mainClassName)}>
        {children}
      </main>

      {!noFooter && <Footer />}
    </>
  );
}
