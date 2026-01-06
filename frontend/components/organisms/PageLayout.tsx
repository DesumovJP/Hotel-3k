"use client";

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCTA, FloatingCTAProps } from "@/components/molecules";
import { cn } from "@/lib/utils";

/**
 * PageLayout - Standard page wrapper with Header, Footer, and optional floating CTA
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
  /** Disable header */
  noHeader?: boolean;
  /** Disable footer */
  noFooter?: boolean;
}

export function PageLayout({
  children,
  floatingCTA,
  hasFloatingCTA,
  mainClassName,
  noHeader = false,
  noFooter = false,
}: PageLayoutProps) {
  const showPadding = hasFloatingCTA || floatingCTA;

  return (
    <>
      {!noHeader && <Header />}

      {/* Floating CTA */}
      {floatingCTA && <FloatingCTA {...floatingCTA} />}

      <main className={cn(showPadding && "pb-20 md:pb-0", mainClassName)}>
        {children}
      </main>

      {!noFooter && <Footer />}
    </>
  );
}
