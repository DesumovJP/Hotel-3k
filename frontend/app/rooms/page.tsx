"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionCTA, SectionHeroCompact, SectionIntro, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { rooms } from "@/lib/data";
import {
  ArrowRight, Bed, Eye, ChevronRight, Check, ChevronDown
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";


const faqs = [
  {
    question: "What are the check-in and check-out times?",
    answer: "Standard check-in is after 3 PM with checkout before 11 AM. Early arrivals are accommodated if rooms are ready, or you can leave your contact info for a call when your room becomes available. Late checkout ('lazy Sunday') costs €42.50 until the last ferry at 9 PM, subject to room availability."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Direct bookings allow free cancellation up to 24 hours before arrival (3 PM cutoff). Cancellations within 24 hours incur full charges for overnight stays and beauty treatments, though breakfast and taxes are refunded. Third-party bookings follow their respective policies."
  },
  {
    question: "Are pets allowed?",
    answer: "Dogs are permitted on request at €28.50 per night. We provide a dog pillow and water bowl. Dogs cannot enter the restaurant, and an entire floor remains pet-free for allergic guests."
  },
  {
    question: "What costs should I expect?",
    answer: "Municipal taxes of €3.85 per person per night apply at checkout. Breakfast is included for standard rooms (8-10:30 AM service). The West Hampton family home excludes breakfast but offers it separately at €24 (adults) or €12 (children)."
  },
  {
    question: "Is parking available?",
    answer: "Free on-site parking is available with limited spaces. We recommend arriving early to secure a spot."
  },
  {
    question: "What wellness facilities are available?",
    answer: "The heated pool operates from 7 AM to 11 PM. Sauna rentals cost €10/hour, while massage chairs and solarium carry separate fees. Direct bookers receive complimentary sauna tokens."
  }
];

export default function RoomsPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        {/* Hero */}
        <SectionHeroCompact
          label="Sleeping in Opduin"
          title="Rooms"
          tagline="Waking up in silence, fresh sheets and a clean sea breeze"
        />

        {/* Quick Info Strip */}
        <section className="neo-bar">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm py-4">
              <div className="flex items-center gap-2">
                <Bed size={16} className="text-shell" />
                <span className="text-neutral-500">Rooms</span>
                <span className="text-ink font-medium">22 Rooms & Suites</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-shell" />
                <span className="text-neutral-500">Views</span>
                <span className="text-ink font-medium">Sea, Dune & Garden</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-shell" />
                <span className="text-neutral-500">Direct</span>
                <span className="text-ink font-medium">Free Sauna & €5 Off</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Rooms" }]} />
          </div>
        </section>

        {/* Intro */}
        <SectionIntro
          label="Accommodations"
          title="A villa in the dunes"
          lead="Light and airy, without any unnecessary hotel furniture, air-conditioned, beautiful fabrics, comfortable beds and a mini fridge."
          paragraphs={[
            "Slide open the curtains for a view over the island and the dunes. Make a Nespresso, open the windows and slowly wake up.",
            "Opduin has 6 different possibilities to choose from. Double rooms with a king size bed, large suites with an extra sleeping couch, apartments with separate bedrooms, a holiday house for a big family, holiday homes for a small family and even six small single rooms.",
          ]}
          image="/rooms/suite-600x400_4.jpg"
          imageAlt="Suite at Grand Hotel Opduin"
          highlight={{
            icon: Check,
            title: "Book Direct Benefits",
            description: "Free sauna access, €5 discount per night, and flexible cancellation when you book directly with us.",
          }}
          padding="lg"
        />

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

                    <h2 className="text-display-md text-ink mb-3">
                      {room.name}
                    </h2>

                    <p className="text-tagline-md text-neutral-500 mb-4">
                      {room.tagline}
                    </p>

                    <p className="text-body-md text-neutral-600 mb-6">
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

        <SectionBlend from="white" to="sand-50" />

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-sand-50">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-12"
            >
              <span className="text-overline text-shell tracking-widest mb-3 block">
                Good to Know
              </span>
              <h2 className="text-display-lg text-ink">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: easeOutExpo }}
                  className="bg-white border border-neutral-100"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  >
                    <span className="font-medium text-ink group-hover:text-navy transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "text-neutral-400 transition-transform duration-300 flex-shrink-0",
                        openFaq === index && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeOutExpo }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-body-md text-neutral-600">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-50" to="white" />

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
