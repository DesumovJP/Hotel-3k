"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionHero, SectionCTA, SectionTwoColumn, MiniGallery, SectionIntro, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { Users, Mail, ArrowRight, Check } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const activities = [
  "Oyster mudflat hiking",
  "Nature excursions",
  "Flying above the island",
  "Surfing",
  "Cycling tours",
  "Seal watching",
];

// Real meeting rooms with actual capacities and descriptions
const meetingRooms = [
  {
    name: "Slufterzaal",
    dimensions: "8 × 6m",
    area: "48m²",
    carre: 22,
    theatre: 42,
    ushape: 18,
    description: "Suitable for 2 to 42 people. Can be linked with Muyzaal and Bollekamer to form 1 large room for up to 156 people, or with Muyzaal alone for up to 110 people.",
    image: "/meetings/slufterzaal-600x450.jpg",
  },
  {
    name: "Muyzaal",
    dimensions: "7 × 7m",
    area: "49m²",
    carre: 26,
    theatre: 57,
    ushape: 20,
    description: "Suitable for 2 to 57 people. Can be linked with Slufterzaal and Bollekamer to form 1 large room for up to 156 people, or with Slufterzaal alone for up to 110 people.",
    image: "/meetings/muyzaal-600x450.jpg",
  },
  {
    name: "Bollekamer",
    dimensions: "9 × 6m",
    area: "54m²",
    carre: 20,
    theatre: 48,
    ushape: 18,
    description: "Suitable for 2 to 48 people. Can be linked with Slufterzaal and Muyzaal to form 1 large room for up to 156 people.",
    image: "/meetings/bollekamer-600x450.jpg",
  },
  {
    name: "Slufter + Muyzaal",
    dimensions: "13 × 6.5m",
    area: "84m²",
    carre: 42,
    theatre: 110,
    ushape: 36,
    description: "Combined space suitable for 20 to 110 people.",
    image: "/meetings/slufter-muyzaal-combinatie-600x450.jpg",
  },
  {
    name: "All three rooms",
    dimensions: "24 × 6.5m",
    area: "156m²",
    carre: 56,
    theatre: 140,
    ushape: 50,
    description: "Maximum configuration for up to 156 people in various setups.",
    image: "/meetings/vergaderzalen-600x450.jpg",
  },
];


const galleryImages = [
  "/meetings/vergaderzalen-600x450.jpg",
  "/meetings/slufterzaal-600x450.jpg",
  "/meetings/muyzaal-600x450.jpg",
  "/meetings/bollekamer-600x450.jpg",
  "/meetings/slufter-muyzaal-combinatie-600x450.jpg",
  "/meetings/vergaderarrangementen-600x450.jpg",
  "/meetings/teambuildingactiviteiten-600x450.jpg",
  "/meetings/een-feestje-op-texel-600x450.jpg",
  "/meetings/trouwen-op-texel-600x450.jpg",
];

export default function MeetingsPage() {
  const t = useTranslations("meetings");
  const tNav = useTranslations("nav");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const { scrollYProgress } = useScroll();

  // Get translated activities
  const translatedActivities = t.raw("teambuilding.activities") as string[];

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
          href="mailto:banqueting@opduin.nl"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          <Mail size={16} />
          {t("requestProposal")}
        </a>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label={t("heroLabel")}
          title={t("heroTitle")}
          tagline={t("heroTagline")}
          description={t("heroDescription")}
          backgroundImage="/meetings/bollekamer-600x450.jpg"
          youtubeId="APJyGnhfits"
          primaryAction={{
            label: t("requestProposal"),
            href: "mailto:banqueting@opduin.nl",
            icon: Mail,
          }}
          infoStrip={{
            items: [
              { icon: Users, value: t("infoStrip.guests") },
              { icon: Check, value: t("infoStrip.catering") },
              { icon: Check, value: t("infoStrip.team") },
            ],
            trailingContent: (
              <span className="hidden md:block text-neutral-500 text-sm">
                {t("infoStrip.response")}
              </span>
            ),
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: tNav("meetings") }]} />
          </div>
        </section>

        {/* Introduction */}
        <SectionIntro
          label={t("intro.label")}
          title={t("intro.title")}
          lead={t("intro.lead")}
          paragraphs={[
            t("intro.p1"),
            t("intro.p2"),
          ]}
          image="/meetings/vergaderzalen-600x450.jpg"
          imageAlt="Meeting room at Grand Hotel Opduin"
          highlight={{
            icon: Users,
            title: t("intro.highlightTitle"),
            description: t("intro.highlightDescription"),
          }}
          padding="lg"
        />

        {/* Blend: white -> sand */}
        <SectionBlend from="white" to="sand" height="md" />

        {/* Teambuilding Activities */}
        <SectionTwoColumn
          title={t("teambuilding.title")}
          content={[
            t("teambuilding.p1"),
            t("teambuilding.p2"),
          ]}
          image="/meetings/teambuildingactiviteiten-600x450.jpg"
          imageAlt="Teambuilding activities on Texel"
          imagePosition="left"
          background="sand"
          tags={translatedActivities}
          ctaLink="mailto:banqueting@opduin.nl"
          ctaText={t("teambuilding.cta")}
        />

        {/* Blend: sand -> white */}
        <SectionBlend from="sand" to="white" height="md" />

        {/* A Texel Party */}
        <SectionTwoColumn
          title={t("party.title")}
          content={[
            t("party.p1"),
            t("party.p2"),
            t("party.p3"),
          ]}
          image="/meetings/een-feestje-op-texel-600x450.jpg"
          imageAlt="Celebrations on Texel"
          imagePosition="right"
          background="white"
          ctaLink="mailto:banqueting@opduin.nl"
          ctaText={t("party.cta")}
        />

        {/* Blend: white -> sand-100 */}
        <SectionBlend from="white" to="sand-100" height="md" />

        {/* Weddings */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/meetings/trouwen-op-texel-600x450.jpg"
                  alt="Wedding on Texel"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                  {t("wedding.title")}
                </h2>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {t("wedding.p1")}
                </p>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {t("wedding.p2")}
                </p>
                <div className="bg-white p-4 rounded-lg mb-6">
                  <p className="text-sm font-medium text-ink mb-2">{t("wedding.contactWedding")}</p>
                  <div className="text-sm text-neutral-600 space-y-1">
                    <p><a href="https://www.trouwen-texel.nl" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-shell">www.trouwen-texel.nl</a></p>
                    <p><a href="mailto:info@trouwentexel.com" className="text-navy hover:text-shell">info@trouwentexel.com</a></p>
                    <p><a href="tel:+31657186156" className="text-navy hover:text-shell">06-57186156</a></p>
                  </div>
                </div>
                <a
                  href="mailto:banqueting@opduin.nl"
                  className="inline-flex items-center gap-2 text-navy font-medium hover:text-shell transition-colors"
                >
                  {t("wedding.contactBanqueting")}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blend: sand-100 -> white */}
        <SectionBlend from="sand-100" to="white" height="md" />

        {/* Meeting Packages */}
        <SectionTwoColumn
          title={t("packages.title")}
          content={[
            t("packages.p1"),
            t("packages.p2"),
            t("packages.p3"),
          ]}
          image="/meetings/vergaderarrangementen-600x450.jpg"
          imageAlt="Meeting packages"
          imagePosition="left"
          background="white"
          ctaLink="mailto:banqueting@opduin.nl"
          ctaText={t("packages.cta")}
        />

        {/* Blend: white -> sand-100 */}
        <SectionBlend from="white" to="sand-100" height="md" />

        {/* Meeting Rooms */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">
                {t("rooms.title")}
              </h2>
              <p className="text-neutral-600">
                {t("rooms.description")}
              </p>
            </div>

            {/* Room Cards - first 3 individual rooms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {meetingRooms.slice(0, 3).map((room) => (
                <div key={room.name} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl text-ink mb-1">{room.name}</h3>
                    <p className="text-sm text-shell mb-2">{room.dimensions} • {room.area}</p>
                    <p className="text-sm text-neutral-600 mb-3">{room.description}</p>
                    <div className="flex gap-4 text-xs text-neutral-500">
                      <span>{t("rooms.carre")}: {room.carre}</span>
                      <span>{t("rooms.theatre")}: {room.theatre}</span>
                      <span>{t("rooms.ushape")}: {room.ushape}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Capacity Table */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-display text-xl text-ink mb-4 text-center">{t("rooms.combinations")}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-navy">
                      <th className="py-3 pr-4 text-sm font-medium text-ink">{t("rooms.configuration")}</th>
                      <th className="py-3 px-4 text-sm font-medium text-ink text-center hidden md:table-cell">{t("rooms.size")}</th>
                      <th className="py-3 px-4 text-sm font-medium text-ink text-center">{t("rooms.carre")}</th>
                      <th className="py-3 px-4 text-sm font-medium text-ink text-center">{t("rooms.theatre")}</th>
                      <th className="py-3 pl-4 text-sm font-medium text-ink text-center">{t("rooms.ushape")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetingRooms.map((room) => (
                      <tr key={room.name} className="border-b border-neutral-200">
                        <td className="py-3 pr-4">
                          <span className="font-medium text-ink">{room.name}</span>
                          <span className="block text-xs text-neutral-500 md:hidden">{room.area}</span>
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-600 text-sm hidden md:table-cell">
                          {room.area}
                        </td>
                        <td className="py-3 px-4 text-center text-neutral-700">{room.carre}</td>
                        <td className="py-3 px-4 text-center text-neutral-700">{room.theatre}</td>
                        <td className="py-3 pl-4 text-center text-neutral-700">{room.ushape}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-500 mt-4 text-center">
                {t("rooms.additionalEquipment")}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <MiniGallery
          title={t("gallery")}
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        {/* Blend: sand-100 -> white */}
        <SectionBlend from="sand-100" to="white" height="md" />

        {/* Contact CTA */}
        <SectionCTA
          icon={Users}
          title={t("cta.title")}
          description={t("cta.description")}
          actions={[
            { label: "banqueting@opduin.nl", href: "mailto:banqueting@opduin.nl", icon: Mail },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
