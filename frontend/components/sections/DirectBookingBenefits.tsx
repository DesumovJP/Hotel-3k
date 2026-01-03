"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BadgePercent, Sparkles, Gift } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

export function DirectBookingBenefits() {
  return (
    <section className="neo-bar">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex flex-wrap items-center justify-between gap-4 py-4"
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <BadgePercent size={16} className="text-shell" />
                <span className="text-neutral-500">Direct</span>
                <span className="text-ink font-medium">Save €5</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-shell" />
                <span className="text-neutral-500">Included</span>
                <span className="text-ink font-medium">Free sauna</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift size={16} className="text-shell" />
                <span className="text-neutral-500">Bonus</span>
                <span className="text-ink font-medium">Texel gift</span>
              </div>
            </div>

            <Link
              href="/book"
              className="group inline-flex items-center gap-2 text-shell hover:text-navy transition-colors text-sm font-medium"
            >
              Book direct
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
