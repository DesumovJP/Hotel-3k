"use client";

import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import {
  HeroSection,
  DirectBookingBenefits,
  IntroSection,
  DiscoverGrid,
  HomeTestimonials,
  IslandTeaser,
  SectionCTA,
} from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { Waves } from "lucide-react";

export default function Home() {
  const t = useTranslations("home.cta");

  return (
    <>
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

        <SectionDivider variant="line" />

        <section id="testimonials">
          <HomeTestimonials />
        </section>

        <section id="island">
          <IslandTeaser />
        </section>

        <section id="cta">
          <SectionCTA
            icon={Waves}
            title={t("title")}
            description={t("description")}
            actions={[{ label: t("button"), href: "/book" }]}
            background="white"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
