"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { SectionHero, SectionCTA, SectionTwoColumn, MiniGallery, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { BreadcrumbsInline } from "@/components/molecules";
import { Clock, Phone, Waves, Flame, Droplets, Sparkles, Heart, Baby, Hand, Footprints, Check } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const facilityKeys = ["pool", "sauna", "solarium"] as const;
const facilityIcons = {
  pool: Waves,
  sauna: Flame,
  solarium: Droplets,
};
const facilityImages = {
  pool: "/wellness/zwembad-600x450_1.jpg",
  sauna: "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  solarium: "/wellness/solarium-600x450.jpg",
};

const categoryKeys = ["massage", "facialWomen", "facialMen", "body", "texel", "handsFeet", "kids"] as const;
const categoryIcons = {
  massage: Hand,
  facialWomen: Sparkles,
  facialMen: Sparkles,
  body: Heart,
  texel: Waves,
  handsFeet: Footprints,
  kids: Baby,
};

const galleryImages = [
  "/wellness/zwembad-600x450_1.jpg",
  "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  "/wellness/massage-600x400_2.jpg",
  "/wellness/openingstijden-beautysalon-600x450.jpg",
  "/wellness/texelse-behandelingen-600x400_2.jpg",
  "/wellness/solarium-600x450.jpg",
];

export default function WellnessPage() {
  const t = useTranslations("wellness");
  const tNav = useTranslations("nav");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Floating CTA - Mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCTA ? 0 : 100, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <a
          href="tel:+31222317445"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          <Phone size={16} />
          {t("bookTreatment")}
        </a>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label={t("heroLabel")}
          title={t("heroTitle")}
          description={t("heroDescription")}
          backgroundImage="/wellness/zwembad-600x450_1.jpg"
          youtubeId="6JUXaDyk4Lo"
          primaryAction={{
            label: t("bookTreatment"),
            href: "tel:+31222317445",
            icon: Phone,
          }}
          infoStrip={{
            items: [
              { icon: Clock, label: t("infoStrip.pool"), value: t("infoStrip.poolHours") },
              { icon: Clock, label: t("infoStrip.salon"), value: t("infoStrip.byAppointment") },
              { icon: Check, value: t("infoStrip.freeSauna"), highlight: true },
            ],
            phoneNumber: "+31 222 317 445",
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: tNav("wellness") }]} />
          </div>
        </section>

        {/* Philosophy */}
        <SectionTwoColumn
          label={t("philosophy.label")}
          title={t("philosophy.title")}
          content={[
            t("philosophy.p1"),
            t("philosophy.p2"),
            t("philosophy.p3"),
          ]}
          image="/wellness/openingstijden-beautysalon-600x450.jpg"
          imageAlt={t("philosophy.imageAlt")}
          imagePosition="right"
          background="white"
        />

        <SectionBlend from="white" to="sand-100" />

        {/* Facilities */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {t("facilities.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
                {t("facilities.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {facilityKeys.map((key, index) => {
                const Icon = facilityIcons[key];
                return (
                  <motion.article
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                    className="group bg-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={facilityImages[key]}
                        alt={t(`facilities.${key}.name`)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-shell text-xs tracking-[0.15em] uppercase mb-2 block">
                        {t(`facilities.${key}.highlight`)}
                      </span>
                      <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-shell transition-colors">
                        {t(`facilities.${key}.name`)}
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        {t(`facilities.${key}.description`)}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Treatments */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {t("treatmentsSection.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink mb-6">
                {t("treatmentsSection.title")}
              </h2>
              <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
                {t("treatmentsSection.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {categoryKeys.map((key, index) => {
                const Icon = categoryIcons[key];
                const treatments = t.raw(`treatmentsSection.categories.${key}.treatments`) as Array<{
                  name: string;
                  duration: string;
                  price: string;
                }>;
                const featured = key === "texel";
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={cn(
                      "border-t border-neutral-200 pt-6",
                      featured && "border-t-2 border-shell"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <Icon size={20} className="text-shell" />
                      <h3 className="font-display text-xl text-ink">
                        {t(`treatmentsSection.categories.${key}.name`)}
                      </h3>
                      {featured && (
                        <span className="text-xs text-shell uppercase tracking-wider">
                          {t("treatmentsSection.signature")}
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {treatments.map((treatment, i) => (
                        <div key={i} className="flex justify-between items-baseline">
                          <div className="flex items-baseline gap-2">
                            <span className="text-ink">{treatment.name}</span>
                            <span className="text-neutral-400 text-sm">{treatment.duration}</span>
                          </div>
                          <span className="text-shell font-medium">{treatment.price}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Gallery */}
        <MiniGallery
          title={t("gallery")}
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        <SectionBlend from="sand-100" to="white" />

        {/* CTA */}
        <SectionCTA
          icon={Sparkles}
          title={t("cta.title")}
          description={t("cta.description")}
          background="white"
          actions={[
            { label: "+31 222 317 445", href: "tel:+31222317445", icon: Phone },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
