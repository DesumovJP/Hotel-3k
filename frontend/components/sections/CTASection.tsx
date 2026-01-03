"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Waves } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <div className="neo-icon neo-icon-lg mx-auto mb-6">
            <Waves className="w-6 h-6 text-shell" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
            Ready for stillness?
          </h2>

          <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
            Escape to where the horizon stretches endlessly and the only
            schedule is the rhythm of the tides.
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide"
          >
            Check Availability
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
