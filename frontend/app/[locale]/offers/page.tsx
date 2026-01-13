"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionCTA, SectionHeroCompact } from "@/components/sections";
import {
  Check, ArrowRight, Gift, Star, Snowflake, Leaf, Sparkles, Compass, UtensilsCrossed
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const offerKeys = ["warmWinter", "earlySpring", "opduinRelax", "exploreTexel", "tasteOfTexel"] as const;
const offerImages = {
  warmWinter: "/offers/warm-winteraanbieding-400x300_2.jpg",
  earlySpring: "/offers/vroege-voorjaars-week-400x300.jpg",
  opduinRelax: "/offers/opduin-verwenaanbieding-400x300_2.jpg",
  exploreTexel: "/offers/ontdek-texel-aanbieding-400x300_1.jpg",
  tasteOfTexel: "/offers/smaak-van-texel-aanbieding-400x300_1.jpg",
};
const offerSlugs = {
  warmWinter: "warm-winter-offer",
  earlySpring: "early-spring-week",
  opduinRelax: "opduin-relax-deal",
  exploreTexel: "explore-texel-deal",
  tasteOfTexel: "taste-of-texel-deal",
};
const offerIcons = {
  warmWinter: Snowflake,
  earlySpring: Leaf,
  opduinRelax: Sparkles,
  exploreTexel: Compass,
  tasteOfTexel: UtensilsCrossed,
};

export default function OffersPage() {
  const t = useTranslations("offers");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingCTA(scrolled > windowHeight * 0.15);
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
            <Gift size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-shell rounded-full animate-pulse" />
          </span>
          <span className="text-sm font-medium">{t("bookPackage")}</span>
        </Link>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHeroCompact
          label={t("heroLabel")}
          title={t("heroTitle")}
          tagline={t("heroTagline")}
        />

        {/* Quick Info Strip */}
        <section className="neo-bar">
          <div className="px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 md:gap-8 text-xs md:text-sm py-3 md:py-4 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <Gift size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("infoStrip.packagesLabel")}</span>
                <span className="text-ink font-medium whitespace-nowrap">{t("infoStrip.deals", { count: offerKeys.length })}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <Star size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("infoStrip.includedLabel")}</span>
                <span className="text-ink font-medium whitespace-nowrap">{t("infoStrip.freeExtras")}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <Check size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("infoStrip.directLabel")}</span>
                <span className="text-ink font-medium whitespace-nowrap">{t("infoStrip.skipFee")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: tNav("offers") }]} />
          </div>
        </section>

        {/* Intro - Like rooms page */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell mb-4 block">
                  {t("intro.label")}
                </span>
                <h2 className="text-display-lg text-ink mb-6">
                  {t("intro.title")}
                </h2>
                <p className="text-body-lg text-neutral-600 mb-6">
                  {t("intro.p1")}
                </p>
                <p className="text-body-md text-neutral-600 mb-8">
                  {t("intro.p2")}
                </p>

                {/* Benefits highlight */}
                <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-shell">
                  <Gift className="w-5 h-5 text-shell mt-0.5" />
                  <div>
                    <p className="font-medium text-ink mb-1">{t("intro.highlightTitle")}</p>
                    <p className="text-sm text-neutral-600">
                      {t("intro.highlightDescription")}
                    </p>
                  </div>
                </div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="/offers/opduin-verwenaanbieding-600x400_2.jpg"
                  alt={t("intro.imageAlt")}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-20">
              {offerKeys.map((key, index) => {
                const Icon = offerIcons[key];
                const includes = t.raw(`items.${key}.includes`) as string[];
                return (
                  <motion.article
                    key={key}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
                    className={cn(
                      "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                      index % 2 === 1 && "lg:grid-flow-dense"
                    )}
                  >
                    {/* Image - Clean style like rooms */}
                    <Link
                      href={`/offers/${offerSlugs[key]}`}
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden bg-sand-100 group",
                        index % 2 === 1 && "lg:col-start-2"
                      )}
                    >
                      <Image
                        src={offerImages[key]}
                        alt={t(`items.${key}.title`)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 text-navy text-xs px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                        <Icon size={12} />
                        {t(`items.${key}.badge`)}
                      </span>
                    </Link>

                    {/* Content - Clean like rooms */}
                    <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                      <span className="text-overline text-shell tracking-widest mb-2 block">
                        {t(`items.${key}.category`)}
                      </span>

                      <h2 className="text-display-md text-ink mb-3">
                        {t(`items.${key}.title`)}
                      </h2>

                      <p className="text-tagline-md text-neutral-500 mb-4">
                        {t(`items.${key}.subtitle`)}
                      </p>

                      <p className="text-body-md text-neutral-600 mb-6">
                        {t(`items.${key}.description`)}
                      </p>

                      {/* Includes - Simple tags like rooms */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {includes.slice(0, 4).map((item, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-600 flex items-center gap-1.5"
                          >
                            <Check size={12} className="text-shell" />
                            {item}
                          </span>
                        ))}
                        {includes.length > 4 && (
                          <span className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-500">
                            {t("more", { count: includes.length - 4 })}
                          </span>
                        )}
                      </div>

                      {/* Ideal For */}
                      <p className="text-sm text-neutral-500 mb-8">
                        <span className="text-neutral-400">{t("idealFor")}:</span> {t(`items.${key}.idealFor`)}
                      </p>

                      {/* CTAs - Like rooms */}
                      <div className="flex flex-wrap gap-4">
                        <Link
                          href={`/offers/${offerSlugs[key]}`}
                          className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                        >
                          {t("viewDetails")}
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                          href="/book"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                        >
                          {tCommon("bookNow")}
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <SectionCTA
          icon={Gift}
          title={t("cta.title")}
          description={t("cta.description")}
          actions={[
            { label: t("cta.bookOnline"), href: "/book" },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
