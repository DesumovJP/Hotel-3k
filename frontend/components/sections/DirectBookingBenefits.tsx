"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const benefits = [
  "€5 cheaper than Booking.com",
  "Free sauna access",
  "Texel gift on departure",
  "Flexible cancellation",
];

export function DirectBookingBenefits() {
  return (
    <section className="bg-navy text-white overflow-hidden">
      <div className="px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4 md:py-5"
          >
            {/* Benefits list */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-shell font-medium text-sm tracking-wide whitespace-nowrap">
                Book Direct & Save
              </span>

              <div className="hidden md:block w-px h-4 bg-white/20" />

              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-1.5 text-white/80 text-sm whitespace-nowrap"
                  >
                    <Check size={14} className="text-shell flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-shell text-navy text-sm font-medium hover:bg-white transition-colors whitespace-nowrap self-start lg:self-auto"
            >
              Book Direct
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
