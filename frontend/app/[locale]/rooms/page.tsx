"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionCTA, SectionHeroCompact, SectionIntro, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { rooms } from "@/lib/data";
import {
  ArrowRight, Bed, Eye, ChevronRight, Check, ChevronDown
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function RoomsPage() {
  const t = useTranslations("rooms");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;

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
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#FEFDFB] shadow-[0_-2px_12px_rgba(0,0,0,0.08)] border-t border-neutral-100 md:hidden"
          >
            <Link
              href="/book"
              className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white text-sm tracking-wide uppercase"
            >
              {t("checkAvailability")}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-20 md:pb-0">
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
                <Bed size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("infoStrip.roomsLabel")}</span>
                <span className="text-ink font-medium whitespace-nowrap">{t("infoStrip.rooms")}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <Eye size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("infoStrip.viewsLabel")}</span>
                <span className="text-ink font-medium whitespace-nowrap">{t("infoStrip.views")}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <Check size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("infoStrip.directLabel")}</span>
                <span className="text-ink font-medium whitespace-nowrap">{t("infoStrip.direct")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: tNav("rooms") }]} />
          </div>
        </section>

        {/* Intro */}
        <SectionIntro
          label={t("intro.label")}
          title={t("intro.title")}
          lead={t("intro.lead")}
          paragraphs={[
            t("intro.p1"),
            t("intro.p2"),
          ]}
          image="/rooms/suite-600x400_4.jpg"
          imageAlt={t("intro.imageAlt")}
          highlight={{
            icon: Check,
            title: t("intro.highlightTitle"),
            description: t("intro.highlightDescription"),
          }}
          padding="lg"
        />

        {/* Rooms Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-20">
              {rooms.map((room, index) => (
                <motion.article
                  key={room.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                    index % 2 === 1 && "lg:grid-flow-dense"
                  )}
                >
                  {/* Image */}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden bg-sand-100 group",
                      index % 2 === 1 && "lg:col-start-2"
                    )}
                  >
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* View Badge */}
                    <span className="absolute top-4 left-4 bg-white/95 text-navy text-xs px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
                      <Eye size={12} />
                      {room.view}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <span className="text-overline text-shell tracking-widest mb-2 block">
                      {room.size} m² · {t("grid.upTo", { count: room.maxGuests })}
                    </span>

                    <h2 className="text-display-md text-ink mb-3">
                      {room.name}
                    </h2>

                    <p className="text-tagline-md text-neutral-500 mb-4">
                      {room.tagline}
                    </p>

                    <p className="text-body-md text-neutral-600 mb-6">
                      {room.description}
                    </p>

                    {/* Room Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.features.slice(0, 4).map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-600"
                        >
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 4 && (
                        <span className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-500">
                          {t("grid.more", { count: room.features.length - 4 })}
                        </span>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                      >
                        {t("grid.viewDetails")}
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={`/book?room=${room.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        {tCommon("bookNow")}
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-50" />

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-sand-50">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-12"
            >
              <span className="text-overline text-shell tracking-widest mb-3 block">
                {t("faq.label")}
              </span>
              <h2 className="text-display-lg text-ink">
                {t("faq.title")}
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: easeOutExpo }}
                  className="bg-white border border-neutral-100"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  >
                    <span className="font-medium text-ink group-hover:text-navy transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "text-neutral-400 transition-transform duration-300 flex-shrink-0",
                        openFaq === index && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-body-md text-neutral-600">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-50" to="white" />

        {/* Need Help Section */}
        <SectionCTA
          icon={Bed}
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
