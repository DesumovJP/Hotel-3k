"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

/**
 * Footer Component
 *
 * Aman-inspired design: warm, minimal, elegant columns
 * Uses site's sand/shell color palette
 */
export function Footer() {
  return (
    <footer className="bg-navy">
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 mb-16">
            {/* Brand - full width on mobile */}
            <div className="col-span-2 md:col-span-4 pb-6 md:pb-0 border-b border-white/10 md:border-0">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/icon.png"
                  alt="Grand Hotel Opduin"
                  width={120}
                  height={120}
                  className="object-contain brightness-0 invert md:w-40 md:h-40"
                />
              </Link>
              <div className="text-sm text-white/70 space-y-1">
                <p>Ruijslaan 22, 1796 AD De Koog</p>
                <p>Texel, Netherlands</p>
              </div>
            </div>

            {/* Stay */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 md:mb-5">Stay</h4>
              <nav className="space-y-2.5 md:space-y-3">
                <Link href="/rooms" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Rooms & Suites
                </Link>
                <Link href="/offers" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Special Offers
                </Link>
                <Link href="/book" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Reservations
                </Link>
              </nav>
            </div>

            {/* Experience */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 md:mb-5">Experience</h4>
              <nav className="space-y-2.5 md:space-y-3">
                <Link href="/restaurant" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Restaurant
                </Link>
                <Link href="/wellness" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Wellness
                </Link>
                <Link href="/meetings" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Meetings
                </Link>
              </nav>
            </div>

            {/* Discover */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 md:mb-5">Discover</h4>
              <nav className="space-y-2.5 md:space-y-3">
                <Link href="/about" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Our Story
                </Link>
                <Link href="/island" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Texel Island
                </Link>
                <Link href="/gallery" className="block text-sm text-white/80 hover:text-white transition-colors">
                  Gallery
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4 md:mb-5">Contact</h4>
              <div className="space-y-2.5 md:space-y-3">
                <a
                  href="tel:+31222317445"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-shell" />
                  <span className="hidden sm:inline">+31 222 317 445</span>
                  <span className="sm:hidden">Call us</span>
                </a>
                <a
                  href="mailto:info@opduin.nl"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-shell" />
                  <span className="hidden sm:inline">info@opduin.nl</span>
                  <span className="sm:hidden">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com/grandhotelop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/grandhotelop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-white/50">
              <span>© {new Date().getFullYear()} Grand Hotel Opduin</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/about/sister-hotels" className="hover:text-white transition-colors">
                Hoscom Collection
              </Link>
              <span className="text-white/30">·</span>
              <a
                href="https://webbie.team/en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                made by webbie.team
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
