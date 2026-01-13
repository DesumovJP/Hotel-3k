"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline, FeatureGrid, ReservationModal } from "@/components/molecules";
import { SectionHero, SectionCTA, MiniGallery, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { Clock, Users, ArrowRight, FileText, Wine, Leaf, Sun, UtensilsCrossed, Coffee, Heart, Check, Calendar } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const menuPDFs = {
  breakfast: "https://www.opduin.nl/upload/files/opduin_ontbijtkaart.pdf",
  lunch: "https://www.opduin.nl/upload/files/opduin_lunchkaart_A5%20(2).pdf",
  dinner: "https://www.opduin.nl/upload/files/opduin_menukaart%20EN%20vanaf%2012%20dec.pdf",
};

const galleryImages = [
  "/restaurant/restaurant-opduin-600x450.jpg",
  "/restaurant/lunchen-in-opduin-600x450_2.jpg",
  "/restaurant/slow-food-chefs-alliantie-600x450_1.jpg",
  "/restaurant/tafel-reserveren-600x450_2.jpg",
  "/restaurant/restaurant-opduin-600x450.jpg",
  "/restaurant/lunchen-in-opduin-600x450_2.jpg",
];

export default function RestaurantPage() {
  const t = useTranslations("restaurant");
  const tCommon = useTranslations("common");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const localIngredients = [
    {
      icon: UtensilsCrossed,
      title: t("localSourcing.items.texel.title"),
      description: t("localSourcing.items.texel.description"),
    },
    {
      icon: Leaf,
      title: t("localSourcing.items.organic.title"),
      description: t("localSourcing.items.organic.description"),
    },
    {
      icon: Wine,
      title: t("localSourcing.items.fish.title"),
      description: t("localSourcing.items.fish.description"),
    },
  ];

  const diningOptions = [
    {
      key: "breakfast",
      icon: Coffee,
      menuUrl: menuPDFs.breakfast,
    },
    {
      key: "lunch",
      icon: Sun,
      menuUrl: menuPDFs.lunch,
    },
    {
      key: "dinner",
      icon: UtensilsCrossed,
      menuUrl: menuPDFs.dinner,
    },
  ];

  return (
    <>
      {/* Floating Reserve Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showFloatingCTA ? 1 : 0, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 right-6 z-50 md:hidden"
      >
        <button
          onClick={() => setIsReservationOpen(true)}
          className="group flex items-center gap-3 pl-5 pr-6 py-3 bg-navy text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] rounded-full active:scale-95 transition-transform"
          aria-label={t("reserveTableAria")}
        >
          <span className="relative">
            <Calendar size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-shell rounded-full animate-pulse" />
          </span>
          <span className="text-sm font-medium">{t("reserveTable")}</span>
        </button>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label={t("heroLabel")}
          title={t("pageTitle")}
          singleLineTitle
          description={t("pageDescription")}
          backgroundImage="/restaurant/restaurant-opduin-600x450.jpg"
          youtubeId="8Raur-TG4_A"
          primaryAction={{
            label: t("reserveTable"),
            href: "/book?type=restaurant",
          }}
          infoStrip={{
            items: [
              { icon: Clock, label: t("lunch"), value: t("lunchHours") },
              { icon: Clock, label: t("dinner"), value: t("dinnerHours") },
            ],
            trailingContent: (
              <button
                onClick={() => setIsReservationOpen(true)}
                className="hidden md:inline-flex items-center gap-2 text-shell hover:text-navy transition-colors text-sm font-medium"
              >
                {t("reserveNow")}
                <ArrowRight size={14} />
              </button>
            ),
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Restaurant" }]} />
          </div>
        </section>

        {/* Philosophy / Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  {t("philosophy.label")}
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  {t("philosophy.title")}
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
                  {t("philosophy.text1")}
                </p>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  {t("philosophy.text2")}
                </p>

                {/* Dog note */}
                <div className="flex items-start gap-3 p-4 bg-sand-50 border-l-2 border-shell">
                  <Heart className="w-5 h-5 text-shell mt-0.5" />
                  <div>
                    <p className="font-medium text-ink mb-1">{t("dogFree")}</p>
                    <p className="text-sm text-neutral-600">
                      {t("dogFreeText")}
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
                  src="/restaurant/slow-food-chefs-alliantie-600x450_1.jpg"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Local Ingredients */}
        <FeatureGrid
          label={t("localSourcing.label")}
          title={t("localSourcing.title")}
          items={localIngredients}
        />

        {/* Dining Options */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                {t("dining.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink">
                {t("dining.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {diningOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.article
                    key={option.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                    className="group bg-white p-8"
                  >
                    <Icon size={28} className="text-shell mb-6" />
                    <p className="text-shell text-sm font-medium tracking-wide mb-2">
                      {t(`dining.${option.key}.time`)}
                    </p>
                    <h3 className="font-display text-2xl text-ink mb-4">
                      {t(`dining.${option.key}.title`)}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {t(`dining.${option.key}.description`)}
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-2 mb-6">
                      <Check size={14} className="text-shell" />
                      {t(`dining.${option.key}.note`)}
                    </p>
                    {option.menuUrl && (
                      <a
                        href={option.menuUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm group/link"
                      >
                        <FileText size={14} />
                        {t("dining.viewMenu")}
                        <ArrowRight size={14} className="opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                      </a>
                    )}
                  </motion.article>
                );
              })}
            </div>

            {/* Reserve CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <p className="text-neutral-600 text-lg mb-6">
                {t("reserveCta")}
              </p>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
              >
                {t("reserveTable")}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="sand-50" />

        {/* Quick Info Strip */}
        <section className="py-6 bg-sand-50">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-shell" />
                <span className="text-neutral-500">{t("infoStrip.dietary.label")}</span>
                <span className="text-ink font-medium">{t("infoStrip.dietary.value")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-shell" />
                <span className="text-neutral-500">{t("infoStrip.terrace.label")}</span>
                <span className="text-ink font-medium">{t("infoStrip.terrace.value")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-shell" />
                <span className="text-neutral-500">{t("infoStrip.capacity.label")}</span>
                <span className="text-ink font-medium">{t("infoStrip.capacity.value")}</span>
              </div>
            </div>
          </div>
        </section>

        <SectionBlend from="sand-50" to="sand-100" />

        {/* Gallery */}
        <MiniGallery
          title={t("gallery")}
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        {/* Private Dining CTA */}
        <SectionCTA
          icon={Users}
          title={t("privateDining.title")}
          description={t("privateDining.description")}
          actions={[
            { label: tCommon("enquireNow"), href: "/meetings" },
          ]}
        />
      </main>

      <Footer />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  );
}
