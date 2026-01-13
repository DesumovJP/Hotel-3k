"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
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
import { easeOutExpo } from "@/lib/motion";
import { Waves, Calendar } from "lucide-react";

export default function Home() {
  const t = useTranslations("home.cta");
  const tCommon = useTranslations("common");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingCTA(scrolled > windowHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating CTA - Mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showFloatingCTA ? 1 : 0, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 right-6 z-50 md:hidden"
      >
        <Link
          href="/book"
          className="group flex items-center gap-3 pl-5 pr-6 py-3 bg-navy text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-full active:scale-95 transition-transform"
        >
          <span className="relative">
            <Calendar size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-shell rounded-full animate-pulse" />
          </span>
          <span className="text-sm font-medium">{tCommon("bookNow")}</span>
        </Link>
      </motion.div>

      <main className="overscroll-none">
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
