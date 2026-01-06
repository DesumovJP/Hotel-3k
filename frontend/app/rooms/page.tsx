"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionCTA } from "@/components/sections";
import { rooms } from "@/lib/data";
import {
  ArrowRight, Wifi, Wind, Coffee, ShieldCheck,
  Bed, Eye, ChevronRight, Sparkles, Check
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const roomIncludes = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Coffee, label: "Coffee and tea in room" },
  { icon: Wind, label: "Air-conditioning" },
  { icon: Sparkles, label: "Swimming in heated indoor pool" },
  { icon: ShieldCheck, label: "Free parking" },
];

export default function RoomsPage() {
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
              href="/book"
              className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white text-sm tracking-wide uppercase"
            >
              Check Availability
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
                Sleeping in Opduin
              </span>
              <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
                Rooms
              </h1>
              <p className="text-xl text-shell font-display italic mb-4">
                Waking up in silence, fresh sheets and a clean sea breeze
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Bed size={16} className="text-shell" />
                <span>22 Rooms & Suites</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-shell" />
                <span>Sea, Dune & Garden Views</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-shell" />
                <span>Book Direct: Free Sauna & €5 Off</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Rooms" }]} />
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              A holiday villa nestled in the dunes. Light and airy, without any unnecessary hotel furniture,
              air-conditioned, beautiful fabrics, comfortable beds and a mini fridge.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              Slide open the curtains for a view over the island and the dunes.
              Make a Nespresso, open the windows and slowly wake up.
            </p>
            <p className="text-neutral-600 mb-8">
              Opduin has 6 different possibilities to choose from. Double rooms with a king size bed,
              large suites with an extra sleeping couch, apartments with separate bedrooms, a holiday house
              for a big family, holiday homes for a small family and even six small single rooms.
            </p>

            {/* Book CTA */}
            <div className="bg-sand-100 p-6 rounded-lg mb-8">
              <p className="text-neutral-700 mb-4">
                Reserve via our website or just make a call: <a href="tel:+31222317445" className="text-navy font-medium hover:text-shell">+31 222 317 445</a>.
                We would love to put together your Texel-holiday with you.
                Care for some ideas? Have a look at our <Link href="/offers" className="text-navy font-medium hover:text-shell underline">package deals</Link>.
              </p>
            </div>

            {/* Always Includes */}
            <div>
              <h3 className="font-display text-xl text-ink mb-6">A stay in Opduin always includes:</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {roomIncludes.map((item, index) => (
                  <div key={index} className="neo-card p-4 flex flex-col items-center text-center gap-3">
                    <item.icon size={24} className="text-shell" />
                    <span className="text-sm text-neutral-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="space-y-20">
              {rooms.map((room, index) => (
                <motion.article
                  key={room.id}
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
                  <Link
                    href={`/rooms/${room.slug}`}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden bg-sand-100 group",
                      index % 2 === 1 && "lg:col-start-2"
                    )}
                  >
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* View Badge */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy text-xs px-3 py-1.5 flex items-center gap-1.5">
                      <Eye size={12} />
                      {room.view}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <span className="text-overline text-shell tracking-widest mb-2 block">
                      {room.size} m² · Up to {room.maxGuests} guests
                    </span>

                    <h2 className="font-display text-3xl md:text-4xl text-ink mb-3">
                      {room.name}
                    </h2>

                    <p className="text-sm text-neutral-500 italic mb-4">
                      {room.tagline}
                    </p>

                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Room Features */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {room.features.slice(0, 4).map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-600"
                        >
                          {feature}
                        </span>
                      ))}
                      {room.features.length > 4 && (
                        <span className="text-xs px-3 py-1.5 bg-sand-100 text-neutral-500">
                          +{room.features.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                      >
                        View Details
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={`/book?room=${room.slug}`}
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

        {/* Need Help Section */}
        <SectionCTA
          icon={Bed}
          title="Book Your Stay"
          description="Reserve via our website or just make a call. We would love to put together your Texel-holiday with you. Care for some ideas? Have a look at our package deals."
          actions={[
            { label: "Book Online", href: "/book" },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
