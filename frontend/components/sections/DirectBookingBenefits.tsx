"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BadgePercent, Sparkles, Gift, LucideIcon } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const benefits = [
  { icon: BadgePercent, label: "Direct", value: "Save €5" },
  { icon: Sparkles, label: "Included", value: "Free sauna" },
  { icon: Gift, label: "Bonus", value: "Texel gift" },
];

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
      className="group/item flex items-center gap-2 cursor-default"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon size={16} className="text-shell group-hover/item:text-navy transition-colors" />
      </motion.div>
      <span className="text-neutral-500">{label}</span>
      <span className="text-ink font-medium">{value}</span>
    </motion.div>
  );
}

export function DirectBookingBenefits() {
  return (
    <section className="neo-bar">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 py-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              {benefits.map((benefit, index) => (
                <BenefitItem key={benefit.label} {...benefit} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, ease: easeOutExpo }}
            >
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 text-shell hover:text-navy transition-colors text-sm font-medium"
              >
                <span className="relative">
                  Book direct
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-navy group-hover:w-full transition-all duration-300" />
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
