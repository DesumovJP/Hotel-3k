"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { SplitText } from "@/components/animations";
import { Users, Phone, Mail, ArrowRight, Briefcase, Heart, Check, Utensils, Wifi, Car, Sparkles, Monitor, Coffee, MapPin, Bed, Bike, TreePine } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const YOUTUBE_ID = "APJyGnhfits";

const eventTypes = [
  {
    id: "corporate",
    icon: Briefcase,
    title: "Corporate Events",
    description: "Meetings, conferences, team retreats, and product launches in inspiring surroundings away from daily distractions.",
    features: ["Boardroom for 12", "Conference room for 40", "Full AV equipment", "Breakout spaces", "High-speed WiFi"],
  },
  {
    id: "celebrations",
    icon: Heart,
    title: "Celebrations",
    description: "Weddings, anniversaries, birthdays, and private parties with ocean views and exceptional catering.",
    features: ["Grand ballroom for 150", "Outdoor terrace", "Custom menus", "Accommodation packages", "Wedding coordinator"],
  },
];

const venues = [
  {
    name: "The Boardroom",
    capacity: "Up to 12",
    description: "Intimate setting for focused discussions with natural light and garden views",
    features: ["Projector & screen", "Video conferencing", "Whiteboard"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  },
  {
    name: "Dune View Room",
    capacity: "Up to 40",
    description: "Flexible space with floor-to-ceiling windows and direct terrace access",
    features: ["Modular setup", "Natural daylight", "Private terrace"],
    image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800",
  },
  {
    name: "Grand Ballroom",
    capacity: "Up to 150",
    description: "Elegant space for conferences, gala dinners, and wedding receptions",
    features: ["Stage & AV system", "Dance floor", "Catering kitchen"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
  },
];

const whyTexel = [
  {
    icon: MapPin,
    title: "Away from distractions",
    description: "20 minutes by ferry. A world away from office routine.",
  },
  {
    icon: TreePine,
    title: "Nature inspires",
    description: "Fresh air, open skies, beach walks between sessions.",
  },
  {
    icon: Bike,
    title: "Team activities",
    description: "Cycling tours, beach games, seal watching.",
  },
  {
    icon: Bed,
    title: "Stay overnight",
    description: "22 rooms for your entire team, with spa access.",
  },
];

const includedServices = [
  { icon: Wifi, text: "High-speed WiFi" },
  { icon: Monitor, text: "AV equipment" },
  { icon: Coffee, text: "Coffee & tea" },
  { icon: Utensils, text: "Catering options" },
  { icon: Car, text: "Free parking" },
  { icon: Sparkles, text: "Spa access" },
];

const processSteps = [
  {
    step: "1",
    title: "Tell us your vision",
    description: "Share your event details, dates, and requirements via email or phone.",
  },
  {
    step: "2",
    title: "Receive a proposal",
    description: "Within 24 hours, we'll send a tailored proposal with options and pricing.",
  },
  {
    step: "3",
    title: "Plan together",
    description: "Your dedicated event manager handles every detail from menu to room setup.",
  },
  {
    step: "4",
    title: "Arrive and enjoy",
    description: "We take care of everything. You focus on your guests and goals.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  "https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800",
];

export default function MeetingsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [youtubeLoaded, setYoutubeLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowFloatingCTA(value > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&start=0`;

  return (
    <>
      <Header />

      {/* Floating CTA - Mobile */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFloatingCTA ? 0 : 100, opacity: showFloatingCTA ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easeOutExpo }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <a
          href="mailto:events@opduin.nl"
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white shadow-xl rounded-full text-sm font-medium"
        >
          <Mail size={16} />
          Request Proposal
        </a>
      </motion.div>

      <main>
        {/* Hero */}
        <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden bg-navy">
          <div className="absolute inset-0">
            {!isMobile && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <iframe
                  src={youtubeEmbedUrl}
                  title="Background video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  onLoad={() => setYoutubeLoaded(true)}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "pointer-events-none transition-opacity duration-1000",
                    youtubeLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    border: "none",
                    width: "max(130vw, 230.77vh)",
                    height: "max(130vh, 73.125vw)",
                  }}
                />
              </div>
            )}

            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                !isMobile && youtubeLoaded ? "opacity-0" : "opacity-100"
              )}
            >
              <Image
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069"
                alt="Meetings at Grand Hotel Opduin"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

          <div className="absolute inset-0 flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Meetings & Events
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
                      Gather with Purpose
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
                className="text-lg text-white/80 max-w-lg mb-8"
              >
                From boardroom meetings to grand celebrations.
                Inspiring spaces where the dunes meet the sea.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
                className="hidden md:flex gap-4"
              >
                <a
                  href="mailto:events@opduin.nl"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-shell text-navy font-medium hover:bg-white transition-colors text-sm tracking-wide"
                >
                  <Mail size={16} />
                  Request Proposal
                </a>
                <a
                  href="tel:+31222317446"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors text-sm tracking-wide"
                >
                  <Phone size={16} />
                  +31 222 317 446
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-shell" />
                  <span>12 to 150 guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-shell" />
                  <span>Full-service catering</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-shell" />
                  <span>Dedicated events team</span>
                </div>
              </div>
              <span className="hidden md:block text-white/60 text-sm">
                Response within 24 hours
              </span>
            </div>
          </div>
        </section>

        {/* Why Texel */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                  Why Meet Here
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-ink mb-6">
                  Where focus meets fresh air
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed text-lg">
                  Twenty minutes by ferry and you&apos;re on an island. No traffic noise,
                  no urban rush — just dunes, sea, and the space to think clearly.
                  Teams leave their routines behind and return with fresh ideas.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {whyTexel.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Icon className="w-5 h-5 text-shell mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-ink text-sm">{item.title}</p>
                          <p className="text-neutral-500 text-xs">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
                className="relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070"
                  alt="Texel island nature"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                What We Host
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Your Event, Your Way
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-8 bg-white border border-sand-200"
                  >
                    <div className="w-12 h-12 rounded-full bg-shell/20 flex items-center justify-center mb-6">
                      <Icon size={24} className="text-shell" />
                    </div>
                    <h3 className="font-display text-2xl text-ink mb-3">{type.title}</h3>
                    <p className="text-neutral-600 mb-6">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                          <Check size={14} className="text-shell" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Venues */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                Our Spaces
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Versatile Venues
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {venues.map((venue, index) => (
                <motion.div
                  key={venue.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="aspect-[4/3] overflow-hidden relative mb-4">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white text-sm">
                      <Users size={16} />
                      {venue.capacity}
                    </div>
                  </div>
                  <h3 className="font-display text-xl text-ink mb-1">{venue.name}</h3>
                  <p className="text-neutral-500 text-sm mb-3">{venue.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((feature) => (
                      <span key={feature} className="text-xs px-2 py-1 bg-sand-100 text-neutral-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-12 md:py-16 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="font-display text-2xl md:text-3xl text-ink">
                Always Included
              </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {includedServices.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-2 text-neutral-600"
                  >
                    <Icon size={18} className="text-shell" />
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-3 block">
                How It Works
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                From inquiry to event
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-shell text-navy font-display text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <a
                href="mailto:events@opduin.nl"
                className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide"
              >
                Start Planning
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Wedding Section */}
        <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
              alt="Wedding at Opduin"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <span className="text-shell text-xs tracking-[0.2em] uppercase mb-4 block">
                Weddings
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
                Say yes with the sea as your witness
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto text-lg">
                Exchange vows on the dunes. Dance until midnight in our ballroom.
                Wake up to ocean views. Our wedding coordinator will craft
                every detail of your perfect day.
              </p>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-white/60 text-sm">
                <li className="flex items-center gap-1"><Check size={14} className="text-shell" /> Ceremony on the dunes</li>
                <li className="flex items-center gap-1"><Check size={14} className="text-shell" /> Reception for up to 150</li>
                <li className="flex items-center gap-1"><Check size={14} className="text-shell" /> Custom menu tasting</li>
                <li className="flex items-center gap-1"><Check size={14} className="text-shell" /> Room block for guests</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:weddings@opduin.nl"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-shell text-navy font-medium hover:bg-white transition-colors text-sm tracking-wide"
                >
                  <Heart size={16} />
                  Plan Your Wedding
                </a>
                <a
                  href="tel:+31222317447"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-colors text-sm tracking-wide"
                >
                  <Phone size={16} />
                  Wedding Coordinator
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 md:py-24 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {galleryImages.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative aspect-square overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`Events gallery ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">
                Let&apos;s Plan Together
              </h2>
              <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                Tell us about your event and we&apos;ll create a tailored proposal.
                Our events team responds within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:events@opduin.nl"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide"
                >
                  <Mail size={16} />
                  events@opduin.nl
                </a>
                <a
                  href="tel:+31222317446"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide"
                >
                  <Phone size={16} />
                  +31 222 317 446
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
