"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Text } from "@/components/atoms";
import { fadeInUp, defaultViewport } from "@/lib/motion";

const exploreLinks = [
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/wellness", label: "Wellness" },
  { href: "/offers", label: "Special Offers" },
  { href: "/meetings", label: "Meetings & Events" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/island", label: "The Island" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://facebook.com/grandhotelop", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com/grandhotelop", label: "Instagram", icon: Instagram },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="font-display text-2xl text-white">
                  Grand Hotel Opduin
                </span>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                A sanctuary of stillness on the shores of Texel.
                Where the North Sea whispers and time slows.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 tap-target focus-visible-ring"
                    aria-label={social.label}
                  >
                    <social.icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-6">
                Explore
              </h4>
              <nav className="space-y-3">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-white/70 hover:text-shell transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* About */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-6">
                About
              </h4>
              <nav className="space-y-3">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-white/70 hover:text-shell transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-6">
                Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-shell mt-1 flex-shrink-0" />
                  <div className="text-white/70 text-sm">
                    <p>Ruijslaan 22</p>
                    <p>1796 AD De Koog</p>
                    <p>Texel, Netherlands</p>
                  </div>
                </div>
                <a
                  href="tel:+31222317445"
                  className="flex items-center gap-3 text-white/70 hover:text-shell transition-colors"
                >
                  <Phone size={16} className="text-shell flex-shrink-0" />
                  <span>+31 222 317 445</span>
                </a>
                <a
                  href="mailto:hello@opduin.nl"
                  className="flex items-center gap-3 text-white/70 hover:text-shell transition-colors"
                >
                  <Mail size={16} className="text-shell flex-shrink-0" />
                  <span>hello@opduin.nl</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="py-6 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} Grand Hotel Opduin. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
