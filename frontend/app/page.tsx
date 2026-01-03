"use client";

import { Header, Footer } from "@/components/organisms";
import { ScrollProgress } from "@/components/animations";
import {
  HeroSection,
  DirectBookingBenefits,
  IntroSection,
  DiscoverGrid,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Scroll Progress Bar - appears after hero */}
      <ScrollProgress showAfter={0.1} />

      <Header />

      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section id="benefits">
          <DirectBookingBenefits />
        </section>

        <section id="intro">
          <IntroSection />
        </section>

        <section id="discover">
          <DiscoverGrid />
        </section>

        <section id="cta">
          <CTASection />
        </section>
      </main>

      <Footer />
    </>
  );
}
