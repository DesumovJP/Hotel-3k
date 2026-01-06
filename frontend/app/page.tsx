"use client";

import { Header, Footer } from "@/components/organisms";
import {
  HeroSection,
  DirectBookingBenefits,
  IntroSection,
  DiscoverGrid,
  SectionCTA,
} from "@/components/sections";
import { Waves } from "lucide-react";

export default function Home() {
  return (
    <>
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
          <SectionCTA
            icon={Waves}
            title="Ready for stillness?"
            description="Escape to where the horizon stretches endlessly and the only schedule is the rhythm of the tides."
            actions={[{ label: "Check Availability", href: "/book" }]}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
