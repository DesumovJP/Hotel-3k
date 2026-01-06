"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/organisms";
import { InfoStrip, BreadcrumbsSection, FeatureGrid, SectionHeader } from "@/components/molecules";
import { SectionHeroCompact, SectionCTA } from "@/components/sections";
import { ArrowUpRight, Building2, MapPin, Heart, Waves } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

// Centralized data
import { sisterHotels, collectionValues } from "@/lib/data";

/**
 * Sister Hotels Page
 *
 * USES:
 * - PageLayout for consistent header/footer
 * - InfoStrip for the navy quick info bar
 * - BreadcrumbsSection for breadcrumbs
 * - FeatureGrid for collection values
 * - SectionCTA for final CTA
 * - Centralized data from lib/data/sister-hotels.ts
 *
 * REDESIGN: Update sisterHotels in lib/data/sister-hotels.ts to change content
 */

export default function SisterHotelsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <SectionHeroCompact
        label="Hoscom Collection"
        title="Our Sister Hotels"
        description="Five distinctive hotels across the Netherlands, each with its own character. United by a commitment to genuine hospitality."
      />

      {/* Quick Info Strip */}
      <InfoStrip
        items={[
          { icon: Building2, value: `${sisterHotels.length} Hotels` },
          { icon: MapPin, value: "Across Netherlands" },
          { icon: Heart, value: "Family Values" },
        ]}
      />

      {/* Breadcrumbs */}
      <BreadcrumbsSection
        items={[
          { label: "About", href: "/about" },
          { label: "Sister Hotels" },
        ]}
      />

      {/* Collection Values - Using FeatureGrid component */}
      <FeatureGrid
        items={collectionValues}
        columns={3}
        background="white"
      />

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
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-navy text-xs">
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

      {/* About Hoscom */}
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
          <SectionHeader
            label="About Hoscom"
            title="A Family of Unique Experiences"
            marginBottom="sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
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

      {/* CTA */}
      <SectionCTA
        icon={Waves}
        title="Begin Your Texel Journey"
        description="Grand Hotel Opduin is the jewel of the collection—a seaside sanctuary where the dunes meet the Wadden Sea."
        actions={[
          { label: "Book Your Stay", href: "/book" },
          { label: "About Opduin", href: "/about", variant: "secondary" },
        ]}
        background="navy"
      />
    </PageLayout>
  );
}
