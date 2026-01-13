"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BadgePercent, Sparkles, Gift, LucideIcon } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const benefitIcons = [BadgePercent, Sparkles, Gift];

function BenefitItem({
  icon: Icon,
  label,
  value,
  index
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: easeOutExpo }}
      className="group/item flex items-center gap-1.5 md:gap-2 cursor-default"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon size={14} className="text-shell group-hover/item:text-navy transition-colors md:w-4 md:h-4" />
      </motion.div>
      <span className="hidden sm:inline text-neutral-500">{label}</span>
      <span className="text-ink font-medium text-xs sm:text-sm">{value}</span>
    </motion.div>
  );
}

export function DirectBookingBenefits() {
  const t = useTranslations("home.benefits");

  const benefits = [
    { icon: benefitIcons[0], label: t("items.discount.label"), value: t("items.discount.value") },
    { icon: benefitIcons[1], label: t("items.sauna.label"), value: t("items.sauna.value") },
    { icon: benefitIcons[2], label: t("items.gift.label"), value: t("items.gift.value") },
  ];

  return (
    <section className="neo-bar">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
            <div className="flex items-center justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 text-sm">
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, ease: easeOutExpo }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/book"
                className="group flex sm:inline-flex items-center justify-center gap-2 text-shell hover:text-navy transition-colors text-sm font-medium px-5 py-2.5 sm:px-0 sm:py-0 bg-navy/5 sm:bg-transparent rounded-full sm:rounded-none"
              >
                <span className="relative">
                  {t("cta")}
                  <span className="hidden sm:block absolute -bottom-0.5 left-0 w-0 h-px bg-navy group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
