"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, MapPin, Phone, Mail, Award, Leaf, Heart, Star,
  Clock, Users, Ship, TreePine, Waves, ChefHat, Calendar
} from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { MiniGallery, SectionHero, SectionCTA, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
import { easeOutExpo } from "@/lib/motion";

// Timeline data
const timeline = [
  {
    year: "1932",
    title: "The Beginning",
    description: "The Petit family opens a small guesthouse for visitors to Texel, offering simple rooms and hearty island meals."
  },
  {
    year: "1956",
    title: "Post-War Renaissance",
    description: "After careful restoration, the hotel expands with a new wing, terrace restaurant, and the first glimpses of what would become our signature dune views."
  },
  {
    year: "1985",
    title: "Wellness Pioneer",
    description: "We become the first hotel on Texel to offer spa facilities, introducing the island to the concept of seaside wellness."
  },
  {
    year: "2010",
    title: "Grand Renovation",
    description: "A complete renovation transforms Opduin into a luxury destination while preserving our family heritage and island character."
  },
  {
    year: "2023",
    title: "Sustainable Future",
    description: "Achieving carbon-neutral status, installing solar panels, and deepening our commitment to local sourcing and island conservation."
  },
];

// Values data
const values = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description: "Three generations of the Petit family have welcomed guests. That warmth is in our DNA."
  },
  {
    icon: Leaf,
    title: "Island Stewardship",
    description: "We protect what makes Texel special—from supporting local farmers to preserving dune ecosystems."
  },
  {
    icon: Star,
    title: "Thoughtful Luxury",
    description: "Excellence without pretension. Every detail serves your comfort, not our ego."
  },
];

// Team data
const team = [
  {
    name: "Lucas Petit",
    role: "Owner, Third Generation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    quote: "My grandfather built this place with his hands. My job is to honor that while building something even better for the next generation.",
  },
  {
    name: "Maria Jansen",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    quote: "Texel's bounty inspires every dish. The sea, the land, the seasons — they tell the story. I just translate it to the plate.",
  },
  {
    name: "Thomas de Vries",
    role: "Spa Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    quote: "True wellness comes from connecting with nature. Here, the dunes and sea do half the work. We just help you slow down.",
  },
];

// Sustainability stats
const sustainabilityStats = [
  { value: "100%", label: "Carbon Neutral", description: "Since 2023" },
  { value: "85%", label: "Local Sourcing", description: "Food & supplies from Texel" },
  { value: "40+", label: "Solar Panels", description: "Powering our operations" },
  { value: "Zero", label: "Single-Use Plastic", description: "Throughout the hotel" },
];

// Awards
const awards = [
  { year: "2024", title: "Best Boutique Hotel Netherlands", org: "Traveller's Choice" },
  { year: "2023", title: "Green Key Gold Certification", org: "Green Key International" },
  { year: "2023", title: "Top 10 Wellness Retreats", org: "Condé Nast Traveller" },
  { year: "2022", title: "Excellence in Hospitality", org: "Dutch Hotel Association" },
];

export default function AboutPage() {
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
          label="Our Story"
          title="The Hamptons of the Wadden"
          description="Where luxury meets the rhythm of the tides. Family-run since 1932."
          backgroundImage="/home/hero-fallback.jpg"
          primaryAction={{
            label: "Book Your Stay",
            href: "/book",
          }}
          infoStrip={{
            items: [
              { icon: Clock, label: "Est.", value: "1932" },
              { icon: Users, label: "Family", value: "3rd Generation" },
              { icon: Leaf, value: "Carbon Neutral" },
              { icon: Award, value: "Award Winning" },
            ],
          }}
        />

        <SectionDivider variant="wave" color="sand-dark" />

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "About" }]} />
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  In the Dunes
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  A sanctuary at the edge of the world
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                  Nestled among the dunes of Texel, Grand Hotel Opduin has been welcoming
                  guests for nearly a century. What began as a modest seaside retreat has
                  evolved into one of the Netherlands' most cherished boutique destinations.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Our philosophy remains unchanged: to offer genuine hospitality that honors
                  the island's natural beauty and the Wadden Sea's UNESCO World Heritage status.
                  Every detail, from our locally-sourced cuisine to our sustainable practices,
                  reflects our deep connection to this remarkable place.
                </p>
                <p className="text-neutral-500 leading-relaxed mb-8">
                  Today, the third generation of the Petit family continues this legacy,
                  balancing time-honored traditions with modern comforts for the discerning traveler.
                </p>

                <Link
                  href="/about/sister-hotels"
                  className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group"
                >
                  Discover our sister hotels
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                className="relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
                    alt="Historic Grand Hotel Opduin"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-shell/20" />
              </motion.div>
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Values */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Our Values
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                What guides us
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                    className="text-center p-8 bg-white"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-shell/10 flex items-center justify-center">
                      <Icon size={28} className="text-shell" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-3">{value.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Timeline */}
        <section className="py-20 md:py-28 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Our Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Nearly a century of hospitality
              </h2>
            </motion.div>

            <div className="space-y-0">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group"
                >
                  <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-8 border-t border-sand-200 first:border-t-0">
                    <div className="font-display text-3xl md:text-5xl text-shell/50 group-hover:text-shell transition-colors">
                      {item.year}
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-ink mb-2">{item.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Sustainability */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200"
                  alt="Texel nature and sustainability"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  Sustainability
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  Caring for our island home
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                  We believe luxury and sustainability go hand in hand. From solar panels
                  on our roof to partnerships with local farmers, we're committed to
                  protecting the natural beauty that makes Texel so special.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {sustainabilityStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05, ease: easeOutExpo }}
                      className="bg-white p-5"
                    >
                      <p className="text-shell text-2xl md:text-3xl font-display mb-1">{stat.value}</p>
                      <p className="text-ink font-medium text-sm mb-1">{stat.label}</p>
                      <p className="text-neutral-500 text-xs">{stat.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Gallery */}
        <MiniGallery
          title="Moments at Opduin"
          images={[
            { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", caption: "Hotel exterior" },
            { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800", caption: "Lobby" },
            { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", caption: "Guest lounge" },
            { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", caption: "Terrace" },
          ]}
          columns={4}
          aspectRatio="square"
          background="white"
          viewAllLink="/gallery"
          viewAllText="View full gallery"
        />

        <SectionBlend from="white" to="sand-100" />

        {/* Team */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-16"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                The People
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                Meet our team
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Behind every great stay is a team that cares. These are the people who make Opduin special.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-sand-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="text-center">
                    <h3 className="font-display text-xl text-ink mb-1">{member.name}</h3>
                    <p className="text-shell text-sm uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-neutral-600 text-sm italic leading-relaxed">"{member.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <SectionBlend from="sand-100" to="white" />

        {/* Awards */}
        <section className="py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4">
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-2 block">
                  Recognition
                </span>
                <h3 className="font-display text-2xl text-ink">Awards & Honors</h3>
              </div>
              <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: easeOutExpo }}
                    className="text-center"
                  >
                    <p className="text-shell text-xs mb-1">{award.year}</p>
                    <p className="text-ink text-sm font-medium mb-1">{award.title}</p>
                    <p className="text-neutral-500 text-xs">{award.org}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

        {/* Location */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Map/Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden bg-sand-200"
              >
                <Image
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200"
                  alt="Texel Island"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-navy/20" />
                {/* Location pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-shell rounded-full flex items-center justify-center animate-pulse">
                    <MapPin size={24} className="text-navy" />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  Getting Here
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  Find us on Texel
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  Just 90 minutes from Amsterdam, yet a world away. Take the ferry from
                  Den Helder (20 minutes) and follow the dunes to De Koog.
                </p>

                {/* Journey steps */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-shell/10 flex items-center justify-center flex-shrink-0">
                      <Ship size={18} className="text-shell" />
                    </div>
                    <div>
                      <p className="text-ink font-medium">Ferry from Den Helder</p>
                      <p className="text-neutral-500 text-sm">TESO ferry, every 30 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-shell/10 flex items-center justify-center flex-shrink-0">
                      <TreePine size={18} className="text-shell" />
                    </div>
                    <div>
                      <p className="text-ink font-medium">Drive through the island</p>
                      <p className="text-neutral-500 text-sm">15 minutes to De Koog</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-shell/10 flex items-center justify-center flex-shrink-0">
                      <Waves size={18} className="text-shell" />
                    </div>
                    <div>
                      <p className="text-ink font-medium">Arrive at Opduin</p>
                      <p className="text-neutral-500 text-sm">On Texel's highest dune</p>
                    </div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="bg-white p-6 space-y-3">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <MapPin size={16} className="text-shell" />
                    <span>Ruyslaan 22, 1796 AD De Koog, Texel</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Phone size={16} className="text-shell" />
                    <a href="tel:+31222123456" className="hover:text-shell transition-colors">
                      +31 222 123 456
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Mail size={16} className="text-shell" />
                    <a href="mailto:info@grandhotelOpduin.nl" className="hover:text-shell transition-colors">
                      info@grandhotelOpduin.nl
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <SectionCTA
          icon={Heart}
          title="Experience Opduin"
          description="The best way to understand what makes us special is to visit. We look forward to welcoming you."
          actions={[
            { label: "Book Your Stay", href: "/book" },
            { label: "Contact Us", href: "/contact", variant: "secondary" },
          ]}
          background="sand"
        />
      </main>

      <Footer />
    </>
  );
}
