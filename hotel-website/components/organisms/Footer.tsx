"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Text } from "@/components/atoms";
import { fadeInUp, defaultViewport } from "@/lib/motion";

export function Footer() {
  return (
    <footer className="bg-[var(--color-mist)] py-16 md:py-20">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="font-heading text-3xl font-light text-[var(--color-ink)]">
                  Grand Hotel Opduin
                </span>
              </Link>
              <Text muted className="max-w-sm">
                A sanctuary of stillness on the shores of Texel.
                Where the North Sea whispers and time slows.
              </Text>
            </div>

            {/* Contact */}
            <div>
              <Text className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-slate)] mb-6">
                Contact
              </Text>
              <div className="space-y-3">
                <Text muted>Ruijslaan 22</Text>
                <Text muted>1796 AD De Koog</Text>
                <Text muted>Texel, Netherlands</Text>
                <a
                  href="mailto:hello@opduin.nl"
                  className="block text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors mt-6"
                >
                  hello@opduin.nl
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <Text className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-slate)] mb-6">
                Explore
              </Text>
              <nav className="space-y-3">
                {["Rooms", "Restaurant", "Wellness", "The Island"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
                    >
                      {item}
                    </Link>
                  )
                )}
              </nav>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-[var(--color-fog)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Text size="xs" muted>
                &copy; {new Date().getFullYear()} Grand Hotel Opduin
              </Text>
              <div className="flex gap-8">
                <Link
                  href="/privacy"
                  className="text-xs text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
