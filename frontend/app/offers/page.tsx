"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionCTA } from "@/components/sections";
import {
  Check, ArrowRight, Gift, Star, Heart, Sparkles, Users,
  Calendar, Sun, PartyPopper, Briefcase
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Offers data
const offers = [
  {
    id: "romantic-escape",
    title: "Romantic Escape",
    subtitle: "Two nights of pure romance",
    description: "Celebrate love with a curated experience including champagne, spa treatments, and a candlelit dinner overlooking the dunes.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    category: "Romance",
    icon: Heart,
    badge: "Most Popular",
    includes: [
      "2 nights in Sea View Suite",
      "Champagne on arrival",
      "Couples spa treatment (90 min)",
      "4-course dinner at Restaurant Opduin",
      "Late checkout until 2pm",
    ],
    idealFor: "Anniversaries, honeymoons, proposals",
  },
  {
    id: "winter-wellness",
    title: "Winter Wellness Retreat",
    subtitle: "Restore body and mind",
    description: "Escape the cold with our warming wellness package. Daily spa access, signature treatments, and healthy gourmet dining.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    category: "Wellness",
    icon: Sparkles,
    badge: "Seasonal",
    includes: [
      "Deluxe Room accommodation",
      "Full spa access daily",
      "One 60-min massage per stay",
      "Wellness breakfast buffet",
      "Yoga session",
    ],
    idealFor: "Self-care retreats, wellness seekers",
  },
  {
    id: "early-bird-summer",
    title: "Early Bird Summer 2026",
    subtitle: "Plan ahead, save more",
    description: "Plan ahead for the perfect Texel summer holiday. Enjoy beaches, biking, and endless sunsets at a special rate.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    category: "Seasonal",
    icon: Sun,
    badge: "Early Bird",
    includes: [
      "Dune View Room",
      "Breakfast included",
      "Free bike rental (2 bikes)",
      "Beach basket reservation",
      "Flexible rebooking",
    ],
    idealFor: "Summer vacations, beach lovers",
  },
  {
    id: "family-adventure",
    title: "Family Island Adventure",
    subtitle: "Fun for the whole family",
    description: "Create lasting memories with your family on Texel. Kids activities, seal spotting, and family-friendly dining included.",
    image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800",
    category: "Family",
    icon: Users,
    badge: "Family",
    includes: [
      "Family Suite (up to 4 guests)",
      "Kids eat free (under 12)",
      "Ecomare seal sanctuary tickets",
      "Treasure hunt activity pack",
      "Family bike rental",
    ],
    idealFor: "Family vacations, school holidays",
  },
  {
    id: "celebration-package",
    title: "Celebration Package",
    subtitle: "Mark life's special moments",
    description: "Whether it's a milestone birthday, retirement, or graduation—celebrate in style with our curated celebration package.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
    category: "Celebration",
    icon: PartyPopper,
    badge: "Special Occasion",
    includes: [
      "Superior Room accommodation",
      "Welcome cake & sparkling wine",
      "3-course celebration dinner",
      "Personalized room decoration",
      "Commemorative photo print",
    ],
    idealFor: "Birthdays, retirements, graduations",
  },
  {
    id: "workation",
    title: "Island Workation",
    subtitle: "Work remotely, live fully",
    description: "Combine productivity with island life. High-speed WiFi, ergonomic workspace, and all the inspiration of Texel at your doorstep.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    category: "Business",
    icon: Briefcase,
    badge: "Extended Stay",
    includes: [
      "7+ nights accommodation",
      "Dedicated workspace in room",
      "High-speed WiFi guaranteed",
      "Daily breakfast",
      "Access to meeting room (2h/day)",
    ],
    idealFor: "Remote workers, digital nomads",
  },
];

const packageBenefits = [
  { icon: Gift, label: "All-Inclusive Value", description: "Everything bundled at a better rate than booking separately" },
  { icon: Star, label: "Curated Experiences", description: "Thoughtfully designed by our team for the perfect stay" },
  { icon: Calendar, label: "Easy Planning", description: "One booking covers everything—no stress, no surprises" },
];


export default function OffersPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingCTA(scrolled > windowHeight * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <Header />

      {/* Floating CTA - Mobile */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-sm border-t border-neutral-200 md:hidden"
          >
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white text-sm tracking-wide uppercase"
            >
              Inquire About Packages
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-20 md:pb-0">
        {/* Compact Header - No Image */}
        <section className="bg-navy pt-24 pb-10 md:pt-28 md:pb-12">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center"
            >
              <span className="text-overline text-shell tracking-widest mb-3 block">
                Exclusive Packages
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                Special Offers
              </h1>
              <p className="text-white/70 max-w-lg mx-auto">
                Curated packages designed for unforgettable experiences on Texel.
                Everything you need, thoughtfully bundled.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Gift size={16} className="text-shell" />
                <span>6 Curated Packages</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-shell" />
                <span>Best Value Guaranteed</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-shell" />
                <span>Flexible Booking</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Book a Package */}
        <section className="py-12 md:py-16 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packageBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: easeOutExpo }}
                  className="flex items-start gap-4"
                >
                  <div className="neo-icon neo-icon-lg">
                    <benefit.icon size={24} className="text-shell" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink mb-1">{benefit.label}</h3>
                    <p className="text-sm text-neutral-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Special Offers" }]} />
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-20">
              {offers.map((offer, index) => (
                <motion.article
                  key={offer.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: easeOutExpo }}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
                    index % 2 === 1 && "lg:grid-flow-dense"
                  )}
                >
                  {/* Image - Clean style like rooms */}
                  <Link
                    href={`/contact?package=${offer.id}`}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden bg-sand-100 group",
                      index % 2 === 1 && "lg:col-start-2"
                    )}
                  >
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {offer.badge && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy text-xs px-3 py-1.5 flex items-center gap-1.5">
                        <offer.icon size={12} />
                        {offer.badge}
                      </span>
                    )}
                  </Link>

                  {/* Content - Clean like rooms */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <span className="text-overline text-shell tracking-widest mb-2 block">
                      {offer.category}
                    </span>

                    <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">
                      {offer.title}
                    </h2>

                    <p className="text-sm text-neutral-500 italic mb-4">
                      {offer.subtitle}
                    </p>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Includes - Simple tags like rooms */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {offer.includes.slice(0, 4).map((item, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-600 flex items-center gap-1.5"
                        >
                          <Check size={12} className="text-shell" />
                          {item}
                        </span>
                      ))}
                      {offer.includes.length > 4 && (
                        <span className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-500">
                          +{offer.includes.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Ideal For */}
                    <p className="text-sm text-neutral-500 mb-8">
                      <span className="text-neutral-400">Ideal for:</span> {offer.idealFor}
                    </p>

                    {/* CTAs - Like rooms */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/contact?package=${offer.id}`}
                        className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                      >
                        View Details
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/book"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Package CTA */}
        <SectionCTA
          icon={Sparkles}
          title="Looking for Something Special?"
          description="Can't find the perfect package? Our team creates bespoke experiences tailored to your wishes — from anniversaries to corporate retreats."
          actions={[
            { label: "Request Custom Package", href: "/contact" },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
