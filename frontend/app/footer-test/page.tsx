"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook, Instagram, MapPin, Phone, Mail, ArrowUpRight, ArrowRight,
  Waves, Heart, Star, ExternalLink, Clock, Calendar
} from "lucide-react";

const navLinks = [
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/wellness", label: "Wellness" },
  { href: "/offers", label: "Offers" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/island", label: "The Island" },
  { href: "/contact", label: "Contact" },
];

// ============================================
// VARIANT 1: Minimal One-Line
// ============================================
function FooterVariant1() {
  return (
    <footer className="bg-white border-t border-sand-200">
      <div className="px-6 md:px-12 lg:px-24 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg text-ink">Grand Hotel Opduin</span>

          <nav className="flex items-center gap-6 text-sm text-ink/60">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm text-ink/50">
            <a href="tel:+31222317445" className="hover:text-shell transition-colors">+31 222 317 445</a>
            <span>|</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 2: Magazine / Editorial Style
// ============================================
function FooterVariant2() {
  return (
    <footer className="bg-sand-50">
      <div className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Large title */}
          <div className="mb-16">
            <h2 className="font-display text-6xl md:text-8xl text-ink leading-none mb-4">
              Opduin
            </h2>
            <p className="text-xl text-ink/50 max-w-md">
              Where the dunes meet the sea
            </p>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-shell mb-4">Location</p>
              <p className="text-ink/70 text-sm leading-relaxed">
                Ruijslaan 22<br />
                1796 AD De Koog<br />
                Texel, Netherlands
              </p>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-shell mb-4">Explore</p>
              <nav className="space-y-2">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block text-ink/70 hover:text-ink text-sm transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="col-span-6 md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-shell mb-4">About</p>
              <nav className="space-y-2">
                {aboutLinks.map(link => (
                  <Link key={link.href} href={link.href} className="block text-ink/70 hover:text-ink text-sm transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="col-span-12 md:col-span-5 md:text-right">
              <p className="text-xs uppercase tracking-widest text-shell mb-4">Connect</p>
              <a href="tel:+31222317445" className="block text-2xl font-display text-ink hover:text-shell transition-colors mb-2">
                +31 222 317 445
              </a>
              <a href="mailto:info@opduin.nl" className="text-ink/60 hover:text-ink transition-colors">
                info@opduin.nl
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-sand-200 px-6 md:px-12 lg:px-24 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-ink/40">
          <span>© {new Date().getFullYear()} Grand Hotel Opduin</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
            <a href="#" className="hover:text-ink transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 3: Card-Based Neomorphic
// ============================================
function FooterVariant3() {
  return (
    <footer className="bg-sand-100 py-16">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand Card */}
          <div className="neo-card p-8 bg-white">
            <Waves className="w-8 h-8 text-shell mb-4" />
            <h3 className="font-display text-2xl text-ink mb-3">Grand Hotel Opduin</h3>
            <p className="text-ink/60 text-sm leading-relaxed mb-6">
              A sanctuary of stillness on the shores of Texel.
            </p>
            <div className="flex gap-3">
              <a href="#" className="neo-icon neo-icon-sm">
                <Facebook size={16} className="text-ink/50" />
              </a>
              <a href="#" className="neo-icon neo-icon-sm">
                <Instagram size={16} className="text-ink/50" />
              </a>
            </div>
          </div>

          {/* Navigation Card */}
          <div className="neo-card p-8 bg-white">
            <h4 className="text-xs uppercase tracking-widest text-shell mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[...navLinks, ...aboutLinks].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink/60 hover:text-ink text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="neo-card p-8 bg-navy text-white">
            <h4 className="text-xs uppercase tracking-widest text-shell mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-shell mt-0.5" />
                <div className="text-sm text-white/80">
                  <p>Ruijslaan 22</p>
                  <p>1796 AD De Koog, Texel</p>
                </div>
              </div>
              <a href="tel:+31222317445" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Phone size={18} className="text-shell" />
                <span className="text-sm">+31 222 317 445</span>
              </a>
              <a href="mailto:info@opduin.nl" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Mail size={18} className="text-shell" />
                <span className="text-sm">info@opduin.nl</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-ink/40">
          © {new Date().getFullYear()} Grand Hotel Opduin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 4: Split Dark/Light
// ============================================
function FooterVariant4() {
  return (
    <footer>
      {/* Dark section */}
      <div className="bg-navy text-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-shell text-xs uppercase tracking-widest mb-2">Ready to escape?</p>
              <h2 className="font-display text-4xl md:text-5xl">Book your stay</h2>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy hover:bg-shell hover:text-white transition-colors text-sm uppercase tracking-wide"
            >
              Check Availability
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="h-px bg-white/10" />
        </div>
      </div>

      {/* Light section */}
      <div className="bg-sand-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex items-center gap-8">
              <span className="font-display text-xl text-ink">Grand Hotel Opduin</span>
              <nav className="hidden md:flex items-center gap-6 text-sm text-ink/60">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6 text-sm text-ink/60">
              <a href="tel:+31222317445" className="hover:text-ink transition-colors">+31 222 317 445</a>
              <div className="flex gap-3">
                <a href="#" className="hover:text-shell transition-colors"><Facebook size={18} /></a>
                <a href="#" className="hover:text-shell transition-colors"><Instagram size={18} /></a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-sand-200 flex flex-col md:flex-row justify-between gap-4 text-xs text-ink/40">
            <span>© {new Date().getFullYear()} Grand Hotel Opduin</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-ink transition-colors">Privacy</a>
              <a href="#" className="hover:text-ink transition-colors">Terms</a>
              <a href="#" className="hover:text-ink transition-colors">Hoscom Collection</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 5: Centered / Stacked
// ============================================
function FooterVariant5() {
  return (
    <footer className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <Waves className="w-10 h-10 text-shell mx-auto mb-6" />
        <h2 className="font-display text-3xl text-ink mb-4">Grand Hotel Opduin</h2>
        <p className="text-ink/50 mb-8">Texel, Netherlands</p>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
          {[...navLinks, ...aboutLinks].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/60 hover:text-ink text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <a href="tel:+31222317445" className="text-xl font-display text-ink hover:text-shell transition-colors">
            +31 222 317 445
          </a>
          <a href="mailto:info@opduin.nl" className="text-ink/60 hover:text-ink transition-colors text-sm">
            info@opduin.nl
          </a>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-10">
          <a href="#" className="w-12 h-12 rounded-full border border-sand-200 flex items-center justify-center text-ink/50 hover:text-shell hover:border-shell transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full border border-sand-200 flex items-center justify-center text-ink/50 hover:text-shell hover:border-shell transition-colors">
            <Instagram size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-ink/40">
          © {new Date().getFullYear()} Grand Hotel Opduin
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 6: Full-Width CTA Banner
// ============================================
function FooterVariant6() {
  return (
    <footer>
      {/* CTA Banner */}
      <div className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat" />
        </div>
        <div className="relative px-6 md:px-12 lg:px-24 py-20">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <p className="text-shell text-sm uppercase tracking-widest mb-2">Escape to Texel</p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
                Your sanctuary awaits
              </h2>
              <p className="text-white/60 max-w-md">
                Where the North Sea whispers and time slows down
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="px-8 py-4 bg-shell text-navy hover:bg-white transition-colors text-sm uppercase tracking-wide text-center"
              >
                Book Your Stay
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors text-sm uppercase tracking-wide text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-ink text-white/80 px-6 md:px-12 lg:px-24 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-8">
            <span className="font-display">Grand Hotel Opduin</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline">Ruijslaan 22, Texel</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+31222317445" className="hover:text-white transition-colors">+31 222 317 445</a>
            <div className="flex gap-3">
              <a href="#" className="hover:text-shell transition-colors"><Facebook size={16} /></a>
              <a href="#" className="hover:text-shell transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 7: Classic with Decorative Border
// ============================================
function FooterVariant7() {
  return (
    <footer className="bg-sand-50">
      {/* Decorative border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-shell to-transparent" />

      <div className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Top section with brand */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-12 pb-12 border-b border-sand-200">
            <div className="md:max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-shell/20 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-shell" />
                </div>
                <span className="font-display text-xl text-ink">Grand Hotel Opduin</span>
              </div>
              <p className="text-ink/60 text-sm leading-relaxed">
                A seaside sanctuary where the dunes meet the Wadden Sea. Experience genuine Dutch hospitality on the island of Texel.
              </p>
            </div>

            {/* Newsletter */}
            <div className="md:max-w-sm">
              <h4 className="text-xs uppercase tracking-widest text-shell mb-4">Stay Updated</h4>
              <p className="text-ink/60 text-sm mb-4">Receive special offers and island inspiration</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-white border border-sand-200 text-sm focus:outline-none focus:border-shell"
                />
                <button className="px-6 py-3 bg-navy text-white text-sm hover:bg-navy-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-shell mb-4">Stay</h4>
              <nav className="space-y-2">
                <Link href="/rooms" className="block text-ink/60 hover:text-ink text-sm">Rooms & Suites</Link>
                <Link href="/offers" className="block text-ink/60 hover:text-ink text-sm">Special Offers</Link>
                <Link href="/book" className="block text-ink/60 hover:text-ink text-sm">Book Now</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-shell mb-4">Experience</h4>
              <nav className="space-y-2">
                <Link href="/restaurant" className="block text-ink/60 hover:text-ink text-sm">Restaurant</Link>
                <Link href="/wellness" className="block text-ink/60 hover:text-ink text-sm">Wellness</Link>
                <Link href="/meetings" className="block text-ink/60 hover:text-ink text-sm">Meetings</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-shell mb-4">Discover</h4>
              <nav className="space-y-2">
                <Link href="/about" className="block text-ink/60 hover:text-ink text-sm">Our Story</Link>
                <Link href="/island" className="block text-ink/60 hover:text-ink text-sm">Texel Island</Link>
                <Link href="/gallery" className="block text-ink/60 hover:text-ink text-sm">Gallery</Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest text-shell mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-ink/60">
                <p>Ruijslaan 22</p>
                <p>1796 AD De Koog, Texel</p>
                <a href="tel:+31222317445" className="block hover:text-ink">+31 222 317 445</a>
                <a href="mailto:info@opduin.nl" className="block hover:text-ink">info@opduin.nl</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-sand-100 px-6 md:px-12 lg:px-24 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink/50">
          <span>© {new Date().getFullYear()} Grand Hotel Opduin. Part of Hoscom Collection.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <div className="flex gap-3 ml-4">
              <a href="#" className="hover:text-shell"><Facebook size={14} /></a>
              <a href="#" className="hover:text-shell"><Instagram size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 8: Visual / Image-Based
// ============================================
function FooterVariant8() {
  return (
    <footer className="relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero/opduin-luchtfoto-1920x700.jpg')" }}
      />
      <div className="absolute inset-0 bg-navy/90" />

      <div className="relative px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Brand */}
            <div>
              <h2 className="font-display text-4xl text-white mb-4">Grand Hotel Opduin</h2>
              <p className="text-white/60 mb-8 max-w-sm">
                Where the rhythm of the tides sets the pace and the horizon stretches endlessly.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-shell text-navy hover:bg-white transition-colors text-sm"
                >
                  Book Your Stay
                </Link>
                <Link
                  href="/virtual-tour"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-colors text-sm"
                >
                  Virtual Tour
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Right - Info */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-shell text-xs uppercase tracking-widest mb-4">Navigate</h4>
                <nav className="space-y-2">
                  {[...navLinks, ...aboutLinks].slice(0, 6).map(link => (
                    <Link key={link.href} href={link.href} className="block text-white/70 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div>
                <h4 className="text-shell text-xs uppercase tracking-widest mb-4">Visit Us</h4>
                <div className="space-y-3 text-sm text-white/70">
                  <p>Ruijslaan 22<br />1796 AD De Koog<br />Texel, Netherlands</p>
                  <a href="tel:+31222317445" className="block hover:text-white transition-colors">
                    +31 222 317 445
                  </a>
                  <a href="mailto:info@opduin.nl" className="block hover:text-white transition-colors">
                    info@opduin.nl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-white/40">© {new Date().getFullYear()} Grand Hotel Opduin</span>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors">Terms</a>
              <div className="flex gap-3">
                <a href="#" className="text-white/50 hover:text-shell transition-colors"><Facebook size={16} /></a>
                <a href="#" className="text-white/50 hover:text-shell transition-colors"><Instagram size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 9: Compact Modern
// ============================================
function FooterVariant9() {
  return (
    <footer className="bg-ink text-white">
      <div className="px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Brand & Social */}
            <div className="flex items-center gap-8">
              <span className="font-display text-2xl">Opduin</span>
              <div className="flex gap-2">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-shell flex items-center justify-center transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-shell flex items-center justify-center transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap gap-x-8 gap-y-2">
              {[...navLinks, ...aboutLinks].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Contact */}
            <div className="flex items-center gap-6 text-sm">
              <a href="tel:+31222317445" className="text-white/80 hover:text-shell transition-colors">
                +31 222 317 445
              </a>
              <Link
                href="/book"
                className="px-6 py-2 bg-shell text-navy hover:bg-white transition-colors text-sm"
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 lg:px-24 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-white/40">
          <span>© {new Date().getFullYear()} Grand Hotel Opduin · Texel</span>
          <span>Part of Hoscom Collection</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// VARIANT 10: Luxury / Elegant
// ============================================
function FooterVariant10() {
  return (
    <footer className="bg-[#1a1a1a]">
      {/* Gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-shell to-transparent" />

      <div className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Centered brand */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-shell/50" />
              <Star className="w-5 h-5 text-shell" />
              <div className="w-16 h-px bg-shell/50" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-2">Grand Hotel Opduin</h2>
            <p className="text-shell text-sm tracking-widest uppercase">Texel · Netherlands · Est. 1932</p>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center">
            <div>
              <h4 className="text-shell text-xs tracking-[0.3em] uppercase mb-6">Address</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Ruijslaan 22<br />
                1796 AD De Koog<br />
                Texel, Netherlands
              </p>
            </div>
            <div>
              <h4 className="text-shell text-xs tracking-[0.3em] uppercase mb-6">Reservations</h4>
              <a href="tel:+31222317445" className="block text-white/60 hover:text-shell text-sm transition-colors mb-2">
                +31 222 317 445
              </a>
              <a href="mailto:reservations@opduin.nl" className="block text-white/60 hover:text-shell text-sm transition-colors">
                reservations@opduin.nl
              </a>
            </div>
            <div>
              <h4 className="text-shell text-xs tracking-[0.3em] uppercase mb-6">Follow</h4>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-white/40 hover:text-shell transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white/40 hover:text-shell transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-16">
            {[...navLinks, ...aboutLinks].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-shell text-xs tracking-widest uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-white/20 text-xs">HOSCOM COLLECTION</span>
              <div className="w-8 h-px bg-white/20" />
            </div>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Grand Hotel Opduin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// NEW VARIANT A: Aman-inspired (Warm minimal)
// Based on Aman.com - warm beige, elegant columns
// ============================================
function FooterNewA() {
  return (
    <footer className="bg-[#f5f1eb]">
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
            {/* Brand */}
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl text-[#2c2c2c] mb-4">Grand Hotel Opduin</h2>
              <p className="text-[#2c2c2c]/60 text-sm leading-relaxed mb-6">
                A seaside sanctuary on the shores of Texel, where the dunes meet the Wadden Sea.
              </p>
              <div className="text-sm text-[#2c2c2c]/60 space-y-1">
                <p>Ruijslaan 22, 1796 AD De Koog</p>
                <p>Texel, Netherlands</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#2c2c2c]/40 mb-5">Stay</h4>
              <nav className="space-y-3">
                <Link href="/rooms" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Rooms & Suites</Link>
                <Link href="/offers" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Special Offers</Link>
                <Link href="/book" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Reservations</Link>
              </nav>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#2c2c2c]/40 mb-5">Experience</h4>
              <nav className="space-y-3">
                <Link href="/restaurant" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Restaurant</Link>
                <Link href="/wellness" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Wellness</Link>
                <Link href="/meetings" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Meetings</Link>
              </nav>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#2c2c2c]/40 mb-5">Discover</h4>
              <nav className="space-y-3">
                <Link href="/about" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Our Story</Link>
                <Link href="/island" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Texel Island</Link>
                <Link href="/gallery" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">Gallery</Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#2c2c2c]/40 mb-5">Contact</h4>
              <div className="space-y-3">
                <a href="tel:+31222317445" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">
                  +31 222 317 445
                </a>
                <a href="mailto:info@opduin.nl" className="block text-sm text-[#2c2c2c]/70 hover:text-[#2c2c2c] transition-colors">
                  info@opduin.nl
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-[#2c2c2c]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#2c2c2c]/40 hover:text-[#2c2c2c] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-[#2c2c2c]/40 hover:text-[#2c2c2c] transition-colors"><Instagram size={18} /></a>
            </div>
            <div className="flex items-center gap-6 text-xs text-[#2c2c2c]/40">
              <span>© {new Date().getFullYear()} Grand Hotel Opduin</span>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#2c2c2c] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// NEW VARIANT B: Four Seasons / Edition style
// Dark, clean, multi-column with generous space
// ============================================
function FooterNewB() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Top section - Brand & CTA */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 pb-16 border-b border-white/10">
            <div>
              <h2 className="font-display text-2xl mb-2">Grand Hotel Opduin</h2>
              <p className="text-white/50 text-sm">Texel, Netherlands</p>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1a1a1a] hover:bg-white/90 transition-colors text-sm uppercase tracking-wider"
            >
              Book Your Stay
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Navigation grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-6">Accommodations</h4>
              <nav className="space-y-3">
                <Link href="/rooms" className="block text-sm text-white/70 hover:text-white transition-colors">Rooms & Suites</Link>
                <Link href="/offers" className="block text-sm text-white/70 hover:text-white transition-colors">Special Offers</Link>
              </nav>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-6">Dining & Wellness</h4>
              <nav className="space-y-3">
                <Link href="/restaurant" className="block text-sm text-white/70 hover:text-white transition-colors">Restaurant</Link>
                <Link href="/wellness" className="block text-sm text-white/70 hover:text-white transition-colors">Spa & Pool</Link>
              </nav>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-6">About</h4>
              <nav className="space-y-3">
                <Link href="/about" className="block text-sm text-white/70 hover:text-white transition-colors">Our Story</Link>
                <Link href="/island" className="block text-sm text-white/70 hover:text-white transition-colors">Texel Island</Link>
                <Link href="/gallery" className="block text-sm text-white/70 hover:text-white transition-colors">Gallery</Link>
              </nav>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] text-white/40 mb-6">Contact</h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>Ruijslaan 22<br />1796 AD De Koog</p>
                <a href="tel:+31222317445" className="block hover:text-white transition-colors">+31 222 317 445</a>
                <a href="mailto:info@opduin.nl" className="block hover:text-white transition-colors">info@opduin.nl</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors">
                <Instagram size={16} />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40">
              <span>© {new Date().getFullYear()} Grand Hotel Opduin</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span className="text-white/20">|</span>
              <span>Part of Hoscom Collection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// NEW VARIANT C: Ocean House style
// Dark with subtle warmth, newsletter, trust badges
// ============================================
function FooterNewC() {
  return (
    <footer className="bg-[#1c2127] text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="px-6 md:px-12 lg:px-24 py-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="font-display text-xl mb-2">Stay Inspired</h3>
              <p className="text-white/50 text-sm">Receive exclusive offers and island stories</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="px-6 py-3 bg-[#c5a880] text-[#1c2127] hover:bg-[#d4bc9a] transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="px-6 md:px-12 lg:px-24 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Brand & Address */}
            <div className="md:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <span className="font-display text-2xl">Grand Hotel Opduin</span>
              </Link>
              <div className="text-sm text-white/60 space-y-1 mb-6">
                <p>Ruijslaan 22</p>
                <p>1796 AD De Koog, Texel</p>
                <p>The Netherlands</p>
              </div>
              <div className="space-y-2">
                <a href="tel:+31222317445" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#c5a880]" />
                  +31 222 317 445
                </a>
                <a href="mailto:info@opduin.nl" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#c5a880]" />
                  info@opduin.nl
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-[#c5a880] text-xs uppercase tracking-[0.2em] mb-5">Experience</h4>
                <nav className="space-y-2.5">
                  {[
                    { href: "/rooms", label: "Rooms & Suites" },
                    { href: "/restaurant", label: "Restaurant" },
                    { href: "/wellness", label: "Wellness & Spa" },
                    { href: "/meetings", label: "Meetings" },
                    { href: "/offers", label: "Special Offers" },
                  ].map(link => (
                    <Link key={link.href} href={link.href} className="block text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <h4 className="text-[#c5a880] text-xs uppercase tracking-[0.2em] mb-5">Discover</h4>
                <nav className="space-y-2.5">
                  {[
                    { href: "/about", label: "Our Story" },
                    { href: "/island", label: "Texel Island" },
                    { href: "/gallery", label: "Gallery" },
                    { href: "/contact", label: "Contact" },
                    { href: "/about/sister-hotels", label: "Hoscom Collection" },
                  ].map(link => (
                    <Link key={link.href} href={link.href} className="block text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Social & Trust */}
            <div className="md:col-span-3 md:text-right">
              <h4 className="text-[#c5a880] text-xs uppercase tracking-[0.2em] mb-5">Follow Us</h4>
              <div className="flex md:justify-end gap-3 mb-8">
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Facebook size={18} className="text-white/70" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Instagram size={18} className="text-white/70" />
                </a>
              </div>

              {/* Trust badges placeholder */}
              <div className="flex md:justify-end gap-4 opacity-50">
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-[10px] text-white/50">
                  4★
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 px-6 md:px-12 lg:px-24 py-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Grand Hotel Opduin. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// NEW VARIANT D: Minimal Premium
// Ultra-clean, like Apple footer but for luxury hotel
// ============================================
function FooterNewD() {
  return (
    <footer className="bg-[#fafafa] border-t border-neutral-200">
      <div className="px-6 md:px-12 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Navigation row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 pb-10 border-b border-neutral-200">
            {[
              { href: "/rooms", label: "Rooms" },
              { href: "/restaurant", label: "Restaurant" },
              { href: "/wellness", label: "Wellness" },
              { href: "/offers", label: "Offers" },
              { href: "/about", label: "About" },
              { href: "/island", label: "Texel" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contact" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-sm text-neutral-500">
            <span>Ruijslaan 22, De Koog, Texel</span>
            <span className="hidden md:inline text-neutral-300">|</span>
            <a href="tel:+31222317445" className="hover:text-neutral-900 transition-colors">+31 222 317 445</a>
            <span className="hidden md:inline text-neutral-300">|</span>
            <a href="mailto:info@opduin.nl" className="hover:text-neutral-900 transition-colors">info@opduin.nl</a>
          </div>

          {/* Social & Legal */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-5">
              <a href="#" className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
              <span>© {new Date().getFullYear()} Grand Hotel Opduin</span>
              <a href="#" className="hover:text-neutral-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-neutral-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-neutral-600 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// TEST PAGE
// ============================================
export default function FooterTestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-navy text-white py-8 px-6 text-center sticky top-0 z-50">
        <h1 className="font-display text-3xl mb-2">Footer Variants</h1>
        <p className="text-white/60 text-sm">Based on research: Aman, Four Seasons, Edition, Ocean House</p>
      </div>

      {/* NEW Variants first */}
      <div className="space-y-0">
        {[
          { num: "A", name: "Aman-inspired (Warm Minimal)", component: <FooterNewA />, recommended: true },
          { num: "B", name: "Four Seasons / Edition (Dark Clean)", component: <FooterNewB /> },
          { num: "C", name: "Ocean House (Dark + Newsletter)", component: <FooterNewC /> },
          { num: "D", name: "Apple-style (Ultra Minimal)", component: <FooterNewD /> },
        ].map(({ num, name, component, recommended }) => (
          <div key={num}>
            <div className={`py-4 px-6 border-y ${recommended ? 'bg-shell/20 border-shell/30' : 'bg-sand-100 border-sand-200'}`}>
              <div className="max-w-6xl mx-auto flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${recommended ? 'bg-shell text-white' : 'bg-ink/10 text-ink'}`}>
                  {num}
                </span>
                <span className="font-medium text-ink">{name}</span>
                {recommended && <span className="text-xs bg-shell/20 text-shell px-2 py-1 rounded">NEW - Recommended</span>}
              </div>
            </div>
            {component}
          </div>
        ))}

        {/* Divider */}
        <div className="py-8 px-6 bg-neutral-100 text-center">
          <p className="text-neutral-500 text-sm">Previous variants below (for comparison)</p>
        </div>

        {/* Old variants */}
        {[
          { num: 1, name: "Minimal One-Line", component: <FooterVariant1 /> },
          { num: 2, name: "Magazine / Editorial", component: <FooterVariant2 /> },
          { num: 3, name: "Card-Based Neomorphic", component: <FooterVariant3 /> },
          { num: 4, name: "Split Dark/Light", component: <FooterVariant4 /> },
          { num: 5, name: "Centered / Stacked", component: <FooterVariant5 /> },
          { num: 6, name: "Full-Width CTA Banner", component: <FooterVariant6 /> },
          { num: 7, name: "Classic with Newsletter", component: <FooterVariant7 /> },
          { num: 8, name: "Visual / Image-Based", component: <FooterVariant8 /> },
          { num: 9, name: "Compact Modern", component: <FooterVariant9 /> },
          { num: 10, name: "Luxury / Elegant", component: <FooterVariant10 /> },
        ].map(({ num, name, component }) => (
          <div key={num}>
            <div className="bg-neutral-50 py-3 px-6 border-y border-neutral-200">
              <div className="max-w-6xl mx-auto flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-neutral-300 text-white flex items-center justify-center text-xs">
                  {num}
                </span>
                <span className="text-sm text-neutral-500">{name}</span>
              </div>
            </div>
            {component}
          </div>
        ))}
      </div>
    </div>
  );
}
