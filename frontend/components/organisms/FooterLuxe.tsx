"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  defaultViewport,
  linkHover,
  duration,
  easeOutExpo,
} from "@/lib/motion";
import type { FooterLuxeProps, SocialLink } from "@/lib/types/global-settings";

// Icon mapping for social links
const socialIcons: Record<SocialLink["icon"], React.FC<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
};

// Individual item animation
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// Divider animation
const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export function FooterLuxe({
  siteName,
  tagline,
  contact,
  socialLinks,
  footerLinks,
  legalLinks,
}: FooterLuxeProps) {
  const currentYear = new Date().getFullYear();

  // Format full address for display
  const fullAddress = [
    contact.address,
    contact.addressLine2,
    `${contact.postalCode} ${contact.city}`,
    contact.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-navy-700 text-sand-100">
      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="max-w-[1400px] mx-auto"
        >
          {/* Main Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Brand + Tagline */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Link
                href="/"
                className="inline-block group mb-6"
                aria-label={`${siteName} - Home`}
              >
                <span className="font-display text-2xl md:text-3xl font-light text-cream-100 group-hover:text-gold transition-colors duration-300">
                  {siteName}
                </span>
              </Link>
              <p className="text-sand-300 font-body text-base leading-relaxed max-w-xs">
                {tagline}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                {socialLinks.map((social) => {
                  const IconComponent = socialIcons[social.icon];
                  return (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                      className="w-11 h-11 flex items-center justify-center rounded-full border border-sand-400/30 text-sand-300 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Column 2: Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="font-display text-xs uppercase tracking-luxury text-gold mb-6">
                Contact
              </h3>
              <address className="not-italic space-y-4">
                {/* Address */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Our location: ${fullAddress}`}
                  className="flex items-start gap-3 text-sand-300 hover:text-gold transition-colors duration-300 group min-h-[44px]"
                >
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-shell group-hover:text-gold transition-colors" />
                  <span className="text-sm leading-relaxed">
                    {contact.address}
                    {contact.addressLine2 && (
                      <>
                        <br />
                        {contact.addressLine2}
                      </>
                    )}
                    <br />
                    {contact.postalCode} {contact.city}
                    <br />
                    {contact.country}
                  </span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  aria-label={`Call us at ${contact.phone}`}
                  className="flex items-center gap-3 text-sand-300 hover:text-gold transition-colors duration-300 group min-h-[44px]"
                >
                  <Phone className="w-5 h-5 flex-shrink-0 text-shell group-hover:text-gold transition-colors" />
                  <span className="text-sm">{contact.phone}</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contact.email}`}
                  aria-label={`Email us at ${contact.email}`}
                  className="flex items-center gap-3 text-sand-300 hover:text-gold transition-colors duration-300 group min-h-[44px]"
                >
                  <Mail className="w-5 h-5 flex-shrink-0 text-shell group-hover:text-gold transition-colors" />
                  <span className="text-sm">{contact.email}</span>
                </a>
              </address>
            </motion.div>

            {/* Column 3: Quick Links */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="font-display text-xs uppercase tracking-luxury text-gold mb-6">
                Explore
              </h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-3">
                  {footerLinks.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={`/${link.slug}`}
                        className="group inline-flex items-center text-sand-300 hover:text-gold transition-colors duration-300 min-h-[44px] py-1"
                      >
                        <motion.span
                          className="relative"
                          initial="rest"
                          whileHover="hover"
                        >
                          {link.name}
                          <motion.span
                            className="absolute -bottom-0.5 left-0 h-px bg-gold origin-left"
                            variants={linkHover}
                          />
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Column 4: Newsletter / Additional Content */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="font-display text-xs uppercase tracking-luxury text-gold mb-6">
                Stay Connected
              </h3>
              <p className="text-sand-300 text-sm leading-relaxed mb-6">
                Subscribe to receive exclusive offers, seasonal updates, and the
                latest news from our coastal retreat.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="footer-email"
                  name="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-navy-800 border border-sand-400/20 rounded text-sand-100 placeholder:text-sand-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all duration-300 text-sm min-h-[44px]"
                  aria-describedby="newsletter-description"
                />
                <span id="newsletter-description" className="sr-only">
                  Enter your email to subscribe to our newsletter
                </span>
                <motion.button
                  type="submit"
                  className="w-full px-4 py-3 bg-deepsea text-white font-body text-sm font-medium uppercase tracking-wider hover:bg-deepsea-600 active:bg-deepsea-800 transition-all duration-200 ease-out rounded-sm min-h-[44px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={dividerVariants}
            className="h-px bg-gradient-to-r from-transparent via-sand-400/30 to-transparent mt-16 mb-8 origin-center"
          />

          {/* Bottom Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            {/* Copyright */}
            <p className="text-sand-400 text-xs">
              &copy; {currentYear} {siteName}. All rights reserved.
            </p>

            {/* Legal Links */}
            <nav aria-label="Legal navigation">
              <ul className="flex flex-wrap gap-6 md:gap-8">
                {legalLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={`/${link.slug}`}
                      className="text-sand-400 text-xs hover:text-gold transition-colors duration-300 min-h-[44px] inline-flex items-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

// Default props for development/preview
export const defaultFooterLuxeProps: FooterLuxeProps = {
  siteName: "Grand Hotel Opduin",
  tagline: "A sanctuary of stillness on the shores of Texel. Where the North Sea whispers and time slows.",
  contact: {
    address: "Ruijslaan 22",
    city: "De Koog",
    postalCode: "1796 AD",
    country: "Texel, Netherlands",
    phone: "+31 222 317 445",
    email: "hello@opduin.nl",
  },
  socialLinks: [
    { id: 1, name: "Facebook", url: "https://facebook.com/grandhotelOpduin", icon: "facebook" },
    { id: 2, name: "Instagram", url: "https://instagram.com/grandhotelOpduin", icon: "instagram" },
  ],
  footerLinks: [
    { id: 1, name: "Rooms", slug: "rooms" },
    { id: 2, name: "Dining", slug: "dining" },
    { id: 3, name: "Spa & Wellness", slug: "spa" },
    { id: 4, name: "Events", slug: "events" },
    { id: 5, name: "About Us", slug: "about" },
  ],
  legalLinks: [
    { id: 1, name: "Privacy Policy", slug: "privacy" },
    { id: 2, name: "Terms & Conditions", slug: "terms" },
    { id: 3, name: "Cookie Policy", slug: "cookies" },
  ],
};
