"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionCTA } from "@/components/sections";
import {
  Check, ArrowRight, Gift, Star, Snowflake, Leaf, Sparkles, Compass, UtensilsCrossed
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Real package deals from opduin.nl
const offers = [
  {
    id: "warm-winter",
    slug: "warm-winter-offer",
    title: "Warm Winter Offer",
    subtitle: "Cozy escape with wellness included",
    description: "Escape the winter cold with our warming package. Enjoy a cozy stay with breakfast, afternoon coffee and cake, and full access to our wellness facilities including sauna, steam room, and heated indoor pool.",
    image: "/offers/warm-winteraanbieding-400x300_2.jpg",
    category: "Seasonal",
    icon: Snowflake,
    badge: "Winter Special",
    includes: [
      "Overnight stay with breakfast",
      "Coffee and cake in the afternoon",
      "Access to wellness facilities",
      "Free parking",
      "Free WiFi",
    ],
    idealFor: "Weekend getaways, wellness seekers",
  },
  {
    id: "early-spring",
    slug: "early-spring-week",
    title: "Early Spring Week",
    subtitle: "Up to 50% discount on accommodation",
    description: "Book early and save big on your spring holiday. Enjoy the awakening nature of Texel with up to 50% discount on your overnight stay with breakfast. The perfect time to explore the island before the summer crowds arrive.",
    image: "/offers/vroege-voorjaars-week-400x300.jpg",
    category: "Seasonal",
    icon: Leaf,
    badge: "Up to 50% Off",
    includes: [
      "Up to 50% discount on accommodation",
      "Breakfast included",
      "Access to wellness facilities",
      "Free parking",
      "Free WiFi",
    ],
    idealFor: "Early bookers, budget-conscious travelers",
  },
  {
    id: "opduin-relax",
    slug: "opduin-relax-deal",
    title: "Opduin Relax Deal",
    subtitle: "3 nights of pure relaxation",
    description: "Unwind completely with our 3-night relaxation package. Includes a delicious dinner at our restaurant, full access to wellness facilities, and everything you need for a peaceful retreat in the dunes of Texel.",
    image: "/offers/opduin-verwenaanbieding-400x300_2.jpg",
    category: "Wellness",
    icon: Sparkles,
    badge: "3 Nights",
    includes: [
      "3 nights accommodation",
      "Breakfast daily",
      "1 dinner at Restaurant Opduin",
      "Access to wellness facilities",
      "Free parking",
    ],
    idealFor: "Couples, wellness retreats, relaxation",
  },
  {
    id: "explore-texel",
    slug: "explore-texel-deal",
    title: "Explore Texel Deal",
    subtitle: "2 nights discovering the island",
    description: "The perfect package for those who want to discover all that Texel has to offer. Includes entrance to Ecomare seal sanctuary, a picnic bag for your adventures, and dinner to end your day of exploration.",
    image: "/offers/ontdek-texel-aanbieding-400x300_1.jpg",
    category: "Adventure",
    icon: Compass,
    badge: "2 Nights",
    includes: [
      "2 nights accommodation",
      "Breakfast daily",
      "1 dinner at Restaurant Opduin",
      "Entrance to Ecomare",
      "Picnic bag for your excursion",
    ],
    idealFor: "Families, nature lovers, first-time visitors",
  },
  {
    id: "taste-of-texel",
    slug: "taste-of-texel-deal",
    title: "Taste of Texel Deal",
    subtitle: "2 nights of culinary delight",
    description: "Experience the best flavors Texel has to offer. This culinary package includes two dinners at our restaurant featuring local Texel lamb, fresh seafood, and island produce. A feast for food lovers.",
    image: "/offers/smaak-van-texel-aanbieding-400x300_1.jpg",
    category: "Culinary",
    icon: UtensilsCrossed,
    badge: "2 Dinners",
    includes: [
      "2 nights accommodation",
      "Breakfast daily",
      "2 dinners at Restaurant Opduin",
      "Access to wellness facilities",
      "Free parking",
    ],
    idealFor: "Foodies, couples, culinary enthusiasts",
  },
];

const packageBenefits = [
  { icon: Gift, label: "Book Direct & Save", description: "No 15% commission to Booking.com means better rates for you" },
  { icon: Star, label: "Free Extras Included", description: "Each package includes perks you won't find elsewhere" },
  { icon: Check, label: "Flexible Cancellation", description: "Easier cancellation when you book directly with us" },
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
                Book Direct & Save
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                Package Deals
              </h1>
              <p className="text-xl text-shell font-display italic mb-4">
                Advantageous offers for direct bookers
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
                <span>5 Package Deals</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-shell" />
                <span>Free Extras & Discounts</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-shell" />
                <span>2+ Nights Stay</span>
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
            <BreadcrumbsInline items={[{ label: "Package Deals" }]} />
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              Booking via Booking.com is very convenient, but also pricey. We pay 15% commission
              on your booking through this or a similar booking site. That is why we have put together
              these advantageous offers for direct bookers.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              Affordable holidays with perks for stays of two nights or more. Our packages include
              free extras and/or a discount on the accommodation price. Plus, easier cancellation
              policies when you book directly with us.
            </p>
            <div className="bg-sand-100 p-6 rounded-lg">
              <p className="text-neutral-700">
                Questions about our packages? Give us a call: <a href="tel:+31222317445" className="text-navy font-medium hover:text-shell">+31 222 317 445</a>.
                We would love to put together your perfect Texel holiday.
              </p>
            </div>
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
                    href={`/offers/${offer.slug}`}
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
                        href={`/offers/${offer.slug}`}
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

        {/* Contact CTA */}
        <SectionCTA
          icon={Gift}
          title="Book Your Package"
          description="Reserve via our website or just make a call. We are happy to answer your questions and help you choose the right package for your Texel holiday."
          actions={[
            { label: "Book Online", href: "/book" },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
