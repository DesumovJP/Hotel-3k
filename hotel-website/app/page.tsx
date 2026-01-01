"use client";

import { Header, Footer } from "@/components/organisms";
import { ScrollProgress } from "@/components/animations";
import {
  HeroSection,
  IntroSection,
  QuickBooking,
  FeaturesSection,
  RoomsSection,
  RestaurantSection,
  WellnessSection,
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

        <section id="booking">
          <QuickBooking />
        </section>

        <section id="intro">
          <IntroSection />
        </section>

        <section id="features">
          <FeaturesSection />
        </section>

        <section id="rooms">
          <RoomsSection />
        </section>

        <section id="restaurant">
          <RestaurantSection />
        </section>

        <section id="wellness">
          <WellnessSection />
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
