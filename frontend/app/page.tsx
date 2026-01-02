"use client";

import { Header, Footer } from "@/components/organisms";
import { ScrollProgress } from "@/components/animations";
import {
  HeroSection,
  DirectBookingBenefits,
  IntroSection,
  RoomsSection,
  ExperiencesSection,
  OffersPreview,
  IslandSection,
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

        <section id="rooms">
          <RoomsSection />
        </section>

        <section id="experiences">
          <ExperiencesSection />
        </section>

        <section id="offers">
          <OffersPreview />
        </section>

        <section id="island">
          <IslandSection />
        </section>

        <section id="cta">
          <CTASection />
        </section>
      </main>

      <Footer />
    </>
  );
}
