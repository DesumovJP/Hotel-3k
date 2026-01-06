"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16">
            {/* Left Block - Brand */}
            <div className="lg:max-w-xs">
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
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-shell transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Block - Navigation columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {/* Explore */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-shell mb-6 font-medium">
                  Explore
                </h4>
                <nav className="space-y-3">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/60 hover:text-shell transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* About */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-shell mb-6 font-medium">
                  About
                </h4>
                <nav className="space-y-3">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-white/60 hover:text-shell transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-xs uppercase tracking-[0.2em] text-shell mb-6 font-medium">
                  Contact
                </h4>
                <div className="space-y-3 text-sm text-white/60">
                  <p>Ruijslaan 22, 1796 AD De Koog</p>
                  <p>Texel, Netherlands</p>
                  <a
                    href="tel:+31222317445"
                    className="block hover:text-shell transition-colors"
                  >
                    +31 222 317 445
                  </a>
                  <a
                    href="mailto:info@opduin.nl"
                    className="block hover:text-shell transition-colors"
                  >
                    info@opduin.nl
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="py-6 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Grand Hotel Opduin. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-white/40 hover:text-shell transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-white/40 hover:text-shell transition-colors"
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
