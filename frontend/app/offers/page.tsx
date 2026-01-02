"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SplitText } from "@/components/animations";
import {
  Check, ArrowRight, Gift, Star, Heart, Sparkles, Users,
  Calendar, Sun, PartyPopper, Briefcase, FileText
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

const categories = [
  { id: "all", label: "All Packages" },
  { id: "romance", label: "Romance" },
  { id: "wellness", label: "Wellness" },
  { id: "family", label: "Family" },
  { id: "seasonal", label: "Seasonal" },
];

export default function OffersPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.6]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowFloatingCTA(scrolled > windowHeight * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredOffers = activeCategory === "all"
    ? offers
    : offers.filter(offer => offer.category.toLowerCase() === activeCategory);

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
        {/* Hero */}
        <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden bg-navy">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070"
              alt="Special Offers at Grand Hotel Opduin"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-navy"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Exclusive Packages
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1]">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      Special Offers
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-lg text-white/80 max-w-lg"
              >
                Curated packages designed for unforgettable experiences on Texel.
                Everything you need, thoughtfully bundled.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: easeOutExpo }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Gift size={16} className="text-shell" />
                <span>{offers.length} Exclusive Packages</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-shell" />
                <span>Best Value Guaranteed</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-shell" />
                <span>Request Custom Package</span>
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
                  <div className="flex-shrink-0 w-12 h-12 bg-white flex items-center justify-center">
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

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Special Offers" }]} className="mb-6" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors",
                    activeCategory === cat.id
                      ? "bg-navy text-white"
                      : "bg-sand-100 text-neutral-600 hover:bg-sand-200"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-20">
              {filteredOffers.map((offer, index) => (
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
                  {/* Image */}
                  <div className={cn(
                    "relative aspect-[4/3] overflow-hidden group",
                    index % 2 === 1 && "lg:col-start-2"
                  )}>
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {offer.badge && (
                      <span className="absolute top-4 left-4 bg-shell text-white text-xs px-3 py-1.5 flex items-center gap-1.5">
                        <offer.icon size={12} />
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <span className="text-overline text-shell tracking-widest mb-2 block">
                      {offer.category}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl text-ink mb-2">
                      {offer.title}
                    </h2>
                    <p className="text-sm text-neutral-500 italic mb-4">{offer.subtitle}</p>
                    <p className="text-neutral-600 mb-6 leading-relaxed">{offer.description}</p>

                    {/* Includes */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-ink mb-3 uppercase tracking-wide">
                        Package Includes
                      </h4>
                      <ul className="space-y-2">
                        {offer.includes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-neutral-600">
                            <Check className="w-4 h-4 text-shell flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <p className="text-sm text-neutral-500 mb-6">
                      <span className="font-medium">Ideal for:</span> {offer.idealFor}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/contact?package=${offer.id}`}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        Inquire & Book
                        <ArrowRight size={16} />
                      </Link>
                      <Link
                        href="/book"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                      >
                        Check Availability
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Booking Benefits */}
        <section className="py-6 bg-shell text-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm">
                <span className="font-medium">Book Direct Benefits:</span>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    Free Sauna Access
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    €5 Off Per Night
                  </span>
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    Best Rate Guarantee
                  </span>
                </div>
              </div>
              <Link
                href="/book"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2 bg-white text-shell hover:bg-white/90 transition-colors text-sm tracking-wide uppercase"
              >
                Book Direct
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Custom Package CTA */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
                  alt="Custom package planning"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Bespoke Experiences
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                  Looking for Something Special?
                </h2>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  Can't find the perfect package? Our team specializes in creating bespoke
                  experiences tailored to your wishes. From anniversary celebrations to
                  corporate retreats, we'll design something unique just for you.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Tell us about your occasion and preferences",
                    "We'll craft a personalized itinerary",
                    "Review and refine until it's perfect",
                    "Enjoy a truly tailored Texel experience"
                  ].map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-neutral-600">
                      <span className="flex-shrink-0 w-6 h-6 bg-shell text-white text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                  >
                    Request Custom Package
                  </Link>
                  <a
                    href="tel:+31222123456"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                  >
                    Call +31 222 123 456
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-navy text-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Ready to Book?
              </h2>
              <p className="text-white/70 mb-8">
                Secure your package today. Book directly with us for the best rates
                and exclusive benefits including complimentary sauna access.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-shell text-white hover:bg-shell/90 transition-colors text-sm tracking-wide uppercase"
              >
                Book Your Stay
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
