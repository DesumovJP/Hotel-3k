"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight, MapPin, Phone, Mail, Award, Leaf, Heart, Star,
  Clock, Users, Ship, TreePine, Waves, Calendar
} from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { MiniGallery, SectionHero, SectionCTA, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { easeOutExpo } from "@/lib/motion";

const valueKeys = ["hospitality", "stewardship", "luxury"] as const;
const valueIcons = {
  hospitality: Heart,
  stewardship: Leaf,
  luxury: Star,
};

const statKeys = ["carbonNeutral", "localSourcing", "solarPanels", "plastic"] as const;

const teamImages = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
];

export default function AboutPage() {
  const t = useTranslations("about");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const { scrollYProgress } = useScroll();

  const timelineItems = t.raw("timeline.items") as Array<{
    year: string;
    title: string;
    description: string;
  }>;
  const teamMembers = t.raw("team.members") as Array<{
    name: string;
    role: string;
    quote: string;
  }>;
  const awards = t.raw("awards.items") as Array<{
    year: string;
    title: string;
    org: string;
  }>;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Floating Book Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showFloatingCTA ? 1 : 0, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 right-6 z-50 md:hidden"
      >
        <Link
          href="/book"
          className="flex items-center justify-center w-14 h-14 bg-navy text-white shadow-xl rounded-full"
          aria-label={t("bookYourStayAria")}
        >
          <Calendar size={22} />
        </Link>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label={t("heroLabel")}
          title={t("pageTitle")}
          description={t("pageDescription")}
          backgroundImage="/home/hero-fallback.jpg"
          primaryAction={{
            label: t("bookYourStay"),
            href: "/book",
          }}
          infoStrip={{
            items: [
              { icon: Clock, label: t("established"), value: "1932" },
              { icon: Users, label: t("family"), value: t("thirdGen") },
              { icon: Leaf, value: t("carbonNeutral") },
              { icon: Award, value: t("awardWinning") },
            ],
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: tNav("about") }]} />
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  {t("intro.label")}
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  {t("intro.title")}
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                  {t("intro.p1")}
                </p>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {t("intro.p2")}
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  {t("intro.p3")}
                </p>

                <Link
                  href="/about/sister-hotels"
                  className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                >
                  {t("intro.discoverSister")}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                className="relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
                    alt={t("intro.imageAlt")}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-shell/20" />
              </motion.div>
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Values */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {t("values.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                {t("values.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {valueKeys.map((key, index) => {
                const Icon = valueIcons[key];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                    className="text-center p-8 bg-white"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-shell/10 flex items-center justify-center">
                      <Icon size={28} className="text-shell" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-3">
                      {t(`values.items.${key}.title`)}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {t(`values.items.${key}.description`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Timeline */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {t("timeline.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                {t("timeline.title")}
              </h2>
            </motion.div>

            <div className="space-y-0">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group"
                >
                  <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-8 border-t border-sand-200 first:border-t-0">
                    <div className="font-display text-3xl md:text-5xl text-shell/50 group-hover:text-shell transition-colors">
                      {item.year}
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-ink mb-2">{item.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Sustainability */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200"
                  alt={t("sustainability.imageAlt")}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  {t("sustainability.label")}
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  {t("sustainability.title")}
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                  {t("sustainability.description")}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {statKeys.map((key, index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05, ease: easeOutExpo }}
                      className="bg-white p-5"
                    >
                      <p className="text-shell text-2xl md:text-3xl font-display mb-1">
                        {t(`sustainability.stats.${key}.value`)}
                      </p>
                      <p className="text-ink font-medium text-sm mb-1">
                        {t(`sustainability.stats.${key}.label`)}
                      </p>
                      <p className="text-neutral-500 text-xs">
                        {t(`sustainability.stats.${key}.description`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Gallery */}
        <MiniGallery
          title={t("gallery")}
          images={[
            { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", caption: "Hotel exterior" },
            { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800", caption: "Lobby" },
            { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", caption: "Guest lounge" },
            { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", caption: "Terrace" },
          ]}
          columns={4}
          aspectRatio="square"
          background="white"
          viewAllLink="/gallery"
          viewAllText={t("viewFullGallery")}
        />

        <SectionBlend from="white" to="sand-100" />

        {/* Team */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {t("team.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                {t("team.title")}
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                {t("team.description")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-sand-200">
                    <Image
                      src={teamImages[index]}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="text-center">
                    <h3 className="font-display text-xl text-ink mb-1">{member.name}</h3>
                    <p className="text-shell text-sm uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-neutral-600 text-sm italic leading-relaxed">"{member.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Awards */}
        <section className="py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4">
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-2 block">
                  {t("awards.label")}
                </span>
                <h3 className="font-display text-2xl text-ink">{t("awards.title")}</h3>
              </div>
              <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: easeOutExpo }}
                    className="text-center"
                  >
                    <p className="text-shell text-xs mb-1">{award.year}</p>
                    <p className="text-ink text-sm font-medium mb-1">{award.title}</p>
                    <p className="text-neutral-500 text-xs">{award.org}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Location */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Map/Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden bg-sand-200"
              >
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200"
                  alt={t("location.imageAlt")}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/20" />
                {/* Location pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-shell rounded-full flex items-center justify-center animate-pulse">
                    <MapPin size={24} className="text-navy" />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  {t("location.label")}
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  {t("location.title")}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  {t("location.description")}
                </p>

                {/* Journey steps */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-shell/10 flex items-center justify-center flex-shrink-0">
                      <Ship size={18} className="text-shell" />
                    </div>
                    <div>
                      <p className="text-ink font-medium">{t("location.steps.ferry.title")}</p>
                      <p className="text-neutral-500 text-sm">{t("location.steps.ferry.description")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-shell/10 flex items-center justify-center flex-shrink-0">
                      <TreePine size={18} className="text-shell" />
                    </div>
                    <div>
                      <p className="text-ink font-medium">{t("location.steps.drive.title")}</p>
                      <p className="text-neutral-500 text-sm">{t("location.steps.drive.description")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-shell/10 flex items-center justify-center flex-shrink-0">
                      <Waves size={18} className="text-shell" />
                    </div>
                    <div>
                      <p className="text-ink font-medium">{t("location.steps.arrive.title")}</p>
                      <p className="text-neutral-500 text-sm">{t("location.steps.arrive.description")}</p>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <MapPin size={16} className="text-shell" />
                    <span>Ruyslaan 22, 1796 AD De Koog, Texel</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Phone size={16} className="text-shell" />
                    <a href="tel:+31222317445" className="hover:text-shell transition-colors">
                      +31 222 317 445
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Mail size={16} className="text-shell" />
                    <a href="mailto:info@opduin.nl" className="hover:text-shell transition-colors">
                      info@opduin.nl
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <SectionCTA
          icon={Heart}
          title={t("cta.title")}
          description={t("cta.description")}
          actions={[
            { label: tCommon("bookYourStay"), href: "/book" },
            { label: tCommon("contactUs"), href: "/contact", variant: "secondary" },
          ]}
          background="sand"
        />
      </main>

      <Footer />
    </>
  );
}
