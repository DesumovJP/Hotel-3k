"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

interface Category {
  id: string;
  image: string;
  link: string;
}

const categoryData: Category[] = [
  {
    id: "rooms",
    image: "/home/de-kamers-600x450_1.jpg",
    link: "/rooms",
  },
  {
    id: "restaurant",
    image: "/home/restaurant-opduin-600x450.jpg",
    link: "/restaurant",
  },
  {
    id: "wellness",
    image: "/wellness/zwembad-600x450_1.jpg",
    link: "/wellness",
  },
  {
    id: "offers",
    image: "/home/aanbieding-voor-een-compleet-en-voordelig-verblijf-600x450.jpg",
    link: "/offers",
  },
];

export function DiscoverGrid() {
  const t = useTranslations("home.discover");

  const categories = categoryData.map((cat) => ({
    ...cat,
    label: t(`categories.${cat.id}.label`),
    title: t(`categories.${cat.id}.title`),
    subtitle: t(`categories.${cat.id}.subtitle`),
  }));

  return (
    <section className="py-20 md:py-28 bg-sand-100">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center mb-16"
        >
          <span className="text-overline text-shell mb-4 block">
            {t("label")}
          </span>
          <h2 className="text-display-xl text-ink">
            {t("title")}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
              className="group"
            >
              <Link
                href={category.link}
                className="block bg-white shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />
                </div>
                <div className="p-6 relative">
                  {/* Accent line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-shell scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <span className="text-overline text-shell mb-2 block">
                    {category.label}
                  </span>
                  <h3 className="text-display-sm text-ink mb-2 group-hover:text-shell transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {category.subtitle}
                  </p>
                  <div className="flex items-center gap-2 text-neutral-500 group-hover:text-shell transition-colors text-sm">
                    <span className="relative">
                      {t("explore")}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-shell group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
