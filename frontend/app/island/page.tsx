"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { Breadcrumbs, ImageGallery } from "@/components/molecules";
import { Heading, Text, Label, Button } from "@/components/atoms";
import { SplitText, Counter } from "@/components/animations";
import {
  Waves,
  Bird,
  Bike,
  Aperture,
  Fish,
  MapPin,
  Clock,
  Ship,
  TreePine,
  Camera
} from "lucide-react";
import { fadeInUp, staggerContainer, defaultViewport, easeOutExpo } from "@/lib/motion";

const attractions = [
  {
    icon: TreePine,
    title: "Dunes National Park",
    description: "43 km² of protected dunes and salt marshes. Home to migratory birds and rare flora. Free entry.",
  },
  {
    icon: Aperture,
    title: "Texel Lighthouse",
    description: "Climb 118 steps for panoramic views from 45m above sea level. The iconic red lighthouse marks the island's northern tip.",
  },
  {
    icon: Fish,
    title: "Ecomare",
    description: "Seal sanctuary and nature museum. Watch rescued seals recover before returning to the sea. Learn about the island's Ice Age origins.",
  },
  {
    icon: Bird,
    title: "Birdwatching",
    description: "One of Europe's premier birding destinations. Spot spoonbills, avocets, terns and gannets in diverse ecosystems.",
  },
  {
    icon: Bike,
    title: "Cycling Tours",
    description: "63 km of scenic routes through dunes, villages, and along the coast. Bikes available for rent at the hotel.",
  },
  {
    icon: Waves,
    title: "Mudflat Walking",
    description: "Experience wadlopen - walking on the seabed at low tide. Guided tours reveal the Wadden Sea's unique biodiversity.",
  },
];

const villages = [
  {
    name: "Den Burg",
    description: "The island's capital. Charming shops, restaurants, and a weekly market.",
    distance: "5 min",
  },
  {
    name: "De Koog",
    description: "Beach village with cafés and direct access to the North Sea coast.",
    distance: "2 min",
  },
  {
    name: "Oudeschild",
    description: "Historic fishing port. Fresh seafood and maritime heritage.",
    distance: "10 min",
  },
  {
    name: "Den Hoorn",
    description: "Artists' village. Galleries, studios, and the island's oldest church.",
    distance: "8 min",
  },
  {
    name: "Oosterend",
    description: "The prettiest village. Traditional architecture and local crafts.",
    distance: "15 min",
  },
];

const facts = [
  { label: "Coastline", value: 30, suffix: " km" },
  { label: "Area", value: 170, suffix: " km²" },
  { label: "Population", value: 13500, prefix: "~", suffix: "" },
  { label: "Villages", value: 7, suffix: "" },
  { label: "Sheep", value: 14000, prefix: "~", suffix: "" },
  { label: "Ferry time", value: 20, suffix: " min" },
];

export default function IslandPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.6]);

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "The Island" }]} />

      <main>
        {/* Hero with Parallax */}
        <section ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
              alt="Texel Island landscape"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <Label className="!text-white/70 mb-4">The Island</Label>
              </motion.div>

              <div className="overflow-hidden mb-6">
                <motion.div
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <Heading as="h1" className="!text-white">
                    <SplitText type="chars" animation="fadeUp" staggerDelay={0.04} delay={0.2}>
                      Texel
                    </SplitText>
                  </Heading>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
              >
                <Text size="lg" className="!text-white/80 max-w-2xl">
                  The largest of the Dutch Wadden Islands. A place where endless
                  beaches meet rolling dunes, where time moves to the rhythm of
                  the tides, and where nature remains wonderfully untamed.
                </Text>
              </motion.div>
            </div>
          </div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: easeOutExpo }}
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </section>

        {/* Quick Facts with Counter */}
        <section className="py-12 bg-[#212B36]">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
              {facts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                  className="text-center"
                >
                  <p className="text-white text-2xl md:text-3xl font-light mb-1">
                    <Counter
                      value={fact.value}
                      prefix={fact.prefix || ""}
                      suffix={fact.suffix}
                      duration={2}
                      delay={0.5 + index * 0.1}
                    />
                  </p>
                  <p className="text-xs text-white/70 uppercase tracking-wider">
                    {fact.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-6">UNESCO World Heritage</Label>
              </motion.div>
              <motion.div variants={fadeInUp} className="overflow-hidden">
                <Heading as="h2" className="mb-8">
                  The Jewel of the Wadden
                </Heading>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Text size="lg" muted className="mb-6 leading-relaxed">
                  Texel (pronounced "Tessel") sits at the edge of the Wadden Sea,
                  a UNESCO World Heritage site and one of the most important
                  wetland ecosystems in the world. Just 20 minutes by ferry from
                  the mainland, yet a world apart.
                </Text>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Text muted className="leading-relaxed">
                  The island has been shaped by wind and water for millennia.
                  Its western shore faces the open North Sea with 30 kilometres
                  of pristine sandy beaches. The eastern side borders the shallow
                  Wadden Sea, where the tide reveals vast mudflats teeming with life.
                  Between them lie the dunes — a protected national park covering
                  43 square kilometres.
                </Text>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Attractions */}
        <section className="py-16 md:py-24 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-4">Discover</Label>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Heading as="h2">Things to See & Do</Heading>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attractions.map((attraction, index) => {
                const Icon = attraction.icon;
                return (
                  <motion.div
                    key={attraction.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                    className="bg-white p-8 hover:shadow-lg transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon size={32} className="mb-6 text-[var(--color-sea)] group-hover:text-[var(--color-ink)] transition-colors" />
                    </motion.div>
                    <Heading as="h4" className="mb-3">
                      {attraction.title}
                    </Heading>
                    <Text size="sm" muted>
                      {attraction.description}
                    </Text>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* De Slufter Feature */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden bg-[var(--color-mist)]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073"
                  alt="De Slufter nature reserve"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <Label className="mb-6">Natural Wonder</Label>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Heading as="h2" className="mb-6">
                    De Slufter
                  </Heading>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Text size="lg" muted className="mb-6">
                    Where the sea broke through the dunes and created something
                    extraordinary — a tidal wetland unlike anywhere else.
                  </Text>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Text muted className="mb-6">
                    During high tide, De Slufter disappears beneath the salty sea water.
                    As it retreats, it reveals a special ecosystem of sea lavender,
                    glasswort, and countless migratory birds. The ever-changing landscape
                    offers some of the most spectacular walks on the island.
                  </Text>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Text size="sm" muted>
                    Just 15 minutes by bike from Grand Hotel Opduin.
                  </Text>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Villages */}
        <section className="py-16 md:py-24 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-4">Explore</Label>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Heading as="h2">Seven Villages</Heading>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {villages.map((village, index) => (
                <motion.div
                  key={village.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                  className="bg-white p-6 flex items-start gap-4 group hover:shadow-md transition-shadow"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <MapPin size={20} className="text-[var(--color-sea)] flex-shrink-0 mt-1" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Heading as="h5">{village.name}</Heading>
                      <Text size="xs" muted className="px-2 py-0.5 bg-[var(--color-mist)] rounded">
                        {village.distance}
                      </Text>
                    </div>
                    <Text size="sm" muted>
                      {village.description}
                    </Text>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Products */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={staggerContainer}
                className="order-2 lg:order-1"
              >
                <motion.div variants={fadeInUp}>
                  <Label className="mb-6">Taste the Island</Label>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Heading as="h2" className="mb-6">
                    Local Flavours
                  </Heading>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Text muted className="mb-6 leading-relaxed">
                    Texel's isolation has bred self-sufficiency and a proud
                    culinary tradition. The island's famous sheep — outnumbering
                    residents — graze on salt marshes, giving the lamb its
                    distinctive flavour.
                  </Text>
                </motion.div>
                <motion.div variants={fadeInUp} className="space-y-4">
                  {[
                    { title: "Texel Lamb", desc: "Salt marsh-fed, celebrated by chefs across the Netherlands" },
                    { title: "Texelse Bierbrouwerij", desc: "Craft beers brewed with island character since 1999" },
                    { title: "Fresh Seafood", desc: "Direct from Oudeschild harbour to your plate" },
                    { title: "Island Cheese", desc: "Artisanal varieties from local sheep and cow's milk" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1, ease: easeOutExpo }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-sea)] mt-2" />
                      <Text muted>
                        <strong className="text-[var(--color-ink)]">{item.title}</strong> —
                        {" "}{item.desc}
                      </Text>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden bg-[var(--color-mist)] order-1 lg:order-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070"
                  alt="Texel landscape with sheep"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Getting Here */}
        <section className="py-16 md:py-24 bg-[#212B36]">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Label className="!text-white/70 mb-6">Getting Here</Label>
              </motion.div>
              <motion.div variants={fadeInUp} className="overflow-hidden">
                <Heading as="h2" className="!text-white mb-8">
                  <SplitText type="words" animation="fadeUp" staggerDelay={0.05}>
                    Just 20 Minutes Away
                  </SplitText>
                </Heading>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  TESO ferries depart regularly from Den Helder.
                  Direct trains from Amsterdam Central take just over an hour.
                </p>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Ship, title: "Ferry", lines: ["20 min from Den Helder", "Departures every 30 min"] },
                { icon: Clock, title: "From Amsterdam", lines: ["1h 17min by train", "Direct to Den Helder"] },
                { icon: Camera, title: "Best Time", lines: ["April to October", "Mild maritime climate"] },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15, ease: easeOutExpo }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon size={32} className="mx-auto mb-4 text-white/80" />
                    </motion.div>
                    <p className="text-white font-medium mb-1">{item.title}</p>
                    <p className="text-sm text-white/70">
                      {item.lines[0]}<br />
                      {item.lines[1]}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-4">Gallery</Label>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Heading as="h2">Island Impressions</Heading>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
            >
              <ImageGallery
                images={[
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070",
                  "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=2070",
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070",
                  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2070",
                ]}
                alt="Texel Island"
                columns={4}
                aspectRatio="square"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="overflow-hidden">
                <Heading as="h2" className="mb-6">
                  <SplitText type="words" animation="fadeUp" staggerDelay={0.05}>
                    Your Island Escape Awaits
                  </SplitText>
                </Heading>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Text muted className="mb-8">
                  Let us be your base for exploring Texel. We'll arrange bike rentals,
                  recommend hidden beaches, and share our favourite island secrets.
                </Text>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link href="/book">
                  <Button size="lg" variant="primary">
                    Book Your Stay
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
