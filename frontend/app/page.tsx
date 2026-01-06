"use client";

import { Header, Footer } from "@/components/organisms";
import {
  HeroSection,
  DirectBookingBenefits,
  IntroSection,
  DiscoverGrid,
  SectionCTA,
} from "@/components/sections";
import { SectionDivider } from "@/components/ui";
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

        <SectionDivider variant="wave" color="white" />

        <section id="intro">
          <IntroSection />
        </section>

        <SectionDivider variant="line" />

        <section id="discover">
          <DiscoverGrid />
        </section>

        <SectionDivider variant="fade" color="sand-dark" />

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
