"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline, FeatureGrid } from "@/components/molecules";
import { SectionHero, SectionCTA, SectionBlend, MiniGallery } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { ArrowUpRight, Building2, MapPin, Heart, Waves, Calendar, Clock } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

// Centralized data
import { sisterHotels, collectionValues } from "@/lib/data";

// Gallery images from sister hotels
const galleryImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
];

export default function SisterHotelsPage() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Floating Book Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showFloatingCTA ? 1 : 0, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 right-6 z-50 md:hidden"
      >
        <Link
          href="/book"
          className="flex items-center justify-center w-14 h-14 bg-navy text-white shadow-xl rounded-full"
          aria-label="Book Your Stay"
        >
          <Calendar size={22} />
        </Link>
      </motion.div>

      <main>
        {/* Hero */}
        <SectionHero
          label="Hoscom Collection"
          title="Our Sister Hotels"
          description="Five distinctive hotels across the Netherlands, each with its own character. United by a commitment to genuine hospitality."
          backgroundImage="/home/home-600x400_1.jpg"
          primaryAction={{
            label: "Book at Opduin",
            href: "/book",
          }}
          infoStrip={{
            items: [
              { icon: Building2, value: `${sisterHotels.length} Hotels` },
              { icon: MapPin, value: "Across Netherlands" },
              { icon: Heart, value: "Family Values" },
            ],
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline
              items={[
                { label: "About", href: "/about" },
                { label: "Sister Hotels" },
              ]}
            />
          </div>
        </section>

        {/* Collection Values */}
        <FeatureGrid
          items={collectionValues}
          columns={3}
          background="white"
        />

        <SectionBlend from="white" to="sand-100" />

        {/* Hotels Grid */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <div className="space-y-16 md:space-y-24">
              {sisterHotels.map((hotel, index) => (
                <motion.article
                  key={hotel.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className="group"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                      index % 2 === 1 ? "lg:grid-flow-dense" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />

                        {/* Character badge */}
                        <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 text-navy text-xs shadow-sm">
                          {hotel.character}
                        </span>
                      </div>
                      {/* Decorative */}
                      <div
                        className={`absolute -bottom-4 ${
                          index % 2 === 1 ? "-left-4" : "-right-4"
                        } w-24 h-24 border border-shell/20`}
                      />
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={14} className="text-shell" />
                        <span className="text-shell text-sm uppercase tracking-widest">
                          {hotel.location}
                        </span>
                      </div>

                      <h2 className="font-display text-3xl md:text-4xl text-ink mb-2">
                        {hotel.name}
                      </h2>

                      <p className="text-sm text-neutral-500 mb-4">{hotel.region}</p>

                      <p className="text-neutral-600 leading-relaxed mb-6">
                        {hotel.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {hotel.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 bg-white text-neutral-700 text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      <a
                        href={hotel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase group/link"
                      >
                        Visit Website
                        <ArrowUpRight
                          size={16}
                          className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* About Hoscom */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                About Hoscom
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                A Family of Unique Experiences
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Lucas Petit, owner of Hoscom, manages six distinctive hotels across the Netherlands.
                Each property has been carefully developed to offer guests a unique experience,
                rooted in local character and genuine hospitality.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                What unites them is a shared philosophy: hotels should be places where guests
                can truly be themselves, surrounded by thoughtful details and warm service.
                From the dunes of Texel to the streets of Leeuwarden, each hotel tells its own story.
              </p>
            </motion.div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Gallery */}
        <MiniGallery
          title="Our Collection"
          images={galleryImages}
          columns={3}
          background="sand-100"
        />

        {/* CTA */}
        <SectionCTA
          icon={Waves}
          title="Begin Your Texel Journey"
          description="Grand Hotel Opduin is the jewel of the collection—a seaside sanctuary where the dunes meet the Wadden Sea."
          actions={[
            { label: "Book Your Stay", href: "/book" },
            { label: "About Opduin", href: "/about", variant: "secondary" },
          ]}
        />
      </main>

      <Footer />
    </>
  );
}
