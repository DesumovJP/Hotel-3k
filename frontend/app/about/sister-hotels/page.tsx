"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SplitText } from "@/components/animations";
import { ArrowUpRight, Building2, MapPin, Heart, Users } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const sisterHotels = [
  {
    name: "Badhotel Rockanje",
    location: "Voorne-Putten Coast",
    region: "South Holland",
    description: "Badhotel Rockanje & Brasserie Lodgers is located on the coast of Voorne-Putten, only 400 meters from the sea, between forest and dunes. The tranquility and nature make you feel far from the outside world. The style of a North American lodge, the scent of pine trees, our hospitality and good cuisine make it a pleasant place to get a breath of fresh air.",
    features: ["Swimming pool", "Sauna", "Brasserie", "Forest location"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    url: "https://badhotelrockanje.nl",
    character: "Lodge-style retreat",
  },
  {
    name: "Delta Hotel Vlaardingen",
    location: "River Nieuwe Maas",
    region: "South Holland",
    description: "Delta Hotel and Grand Café Nautique, your home port on the river Nieuwe Maas. A place right on the water, where staying overnight, eating and meeting can be seamlessly combined. A place where you can drink a good glass and eat while the ships glide by. Where you organize an inspiring brainstorming session and bring the energy of ocean sailors on board.",
    features: ["Waterfront", "Grand Café", "Meeting rooms", "River views"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    url: "https://deltahotel.nl",
    character: "Maritime elegance",
  },
  {
    name: "Landgoed de Holtweijde",
    location: "Overijssel Estate",
    region: "Overijssel",
    description: "Authenticity, tradition, vitality, passion, romance and good taste. De Holtweijde is much more than a hotel. We move with the times, respond to changing needs and create new experiences. Authenticity, tradition, vitality, passion, romance and good taste: you will find them in the interior, the honest materials, the dishes, the service, and the landscape.",
    features: ["Historic estate", "Fine dining", "Wellness", "Oak forests"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
    url: "https://holtweijde.nl",
    character: "Historic grandeur",
  },
  {
    name: "Landgoed Duin & Kruidberg",
    location: "Zuid-Kennemerland",
    region: "North Holland",
    description: "As soon as you arrive at Landgoed Duin & Kruidberg you step into another world and you can start to relax. Discover and experience the classical-historic Mansion, the atmospheric English Landgoedtuin and the beautiful surroundings of the Zuid-Kennemerland National Park. Stylish enjoyment in a casual and genuinely hospitable atmosphere.",
    features: ["Historic mansion", "English gardens", "National Park", "Classic luxury"],
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?q=80&w=1200",
    url: "https://duin-kruidberg.nl",
    character: "Classic estate",
  },
  {
    name: "Post-Plaza Hotel",
    location: "Leeuwarden, Fryslân",
    region: "Friesland",
    description: "In the heart of the city centre, it doesn't get more Leeuwarden than this. Post-Plaza is located on one of the most beautiful streets of the capital of Fryslân. A unique Hotel & Grand Café, located in a monumental building with rich history and authentic character.",
    features: ["City center", "Grand Café", "Historic building", "Frisian charm"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
    url: "https://postplaza.nl",
    character: "Urban sophistication",
  },
];

const collectionValues = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description: "Every hotel shares our commitment to warm, personal service"
  },
  {
    icon: Building2,
    title: "Unique Character",
    description: "Each property has its own distinct identity and story"
  },
  {
    icon: Users,
    title: "Family Values",
    description: "All managed with the same care as a family home"
  },
];

export default function SisterHotelsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.7]);

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden bg-navy">
          <motion.div
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070"
              alt="Hoscom Hotel Collection"
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

          <div className="absolute inset-0 flex items-end pb-16 md:pb-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Hoscom Collection
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      Our Sister Hotels
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-lg text-white/80 max-w-xl"
              >
                Five distinctive hotels across the Netherlands, each with its own character.
                United by a commitment to genuine hospitality and memorable experiences.
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
                <Building2 size={16} className="text-shell" />
                <span>6 Unique Hotels</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-shell" />
                <span>Across the Netherlands</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-shell" />
                <span>Family-Owned & Managed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs & Intro */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline
              items={[
                { label: "About", href: "/about" },
                { label: "Sister Hotels" }
              ]}
              className="mb-8"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collectionValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: easeOutExpo }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-shell/10 flex items-center justify-center">
                      <Icon size={24} className="text-shell" />
                    </div>
                    <div>
                      <h3 className="font-medium text-ink mb-1">{value.title}</h3>
                      <p className="text-sm text-neutral-600">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

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
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}>
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
                      <div className={`absolute -bottom-4 ${index % 2 === 1 ? "-left-4" : "-right-4"} w-24 h-24 border border-shell/20`} />
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
                        <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
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

        {/* CTA */}
        <section className="py-20 md:py-28 bg-navy text-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Start Your Journey at Opduin
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Grand Hotel Opduin is the jewel of the collection—a seaside sanctuary
                where the dunes meet the Wadden Sea. Experience what makes us special.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-shell text-navy hover:bg-white transition-colors text-sm tracking-wide uppercase"
                >
                  Book Your Stay
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white text-white hover:bg-white hover:text-navy transition-colors text-sm tracking-wide uppercase"
                >
                  About Opduin
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
