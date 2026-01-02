"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { Counter } from "@/components/animations";
import {
  fadeInUp,
  staggerContainer,
  easeOutExpo,
  duration,
  blurInUp,
} from "@/lib/motion";

// Types
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

interface AboutHeroProps {
  variant?: "main" | "history" | "location" | "philosophy" | "team";
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  stats?: { value: number; label: string; suffix?: string }[];
  timeline?: TimelineEvent[];
  team?: TeamMember[];
  values?: { icon: React.ReactNode; title: string; description: string }[];
  className?: string;
}

// Stats Counter Component
function StatItem({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: duration.slow, delay, ease: easeOutExpo }}
      className="text-center"
    >
      <div className="font-display text-5xl md:text-6xl text-navy mb-2">
        <Counter value={value} duration={2} delay={delay} />
        {suffix}
      </div>
      <div className="text-sm text-neutral-500 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

// Timeline Component
function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-shell/30 -translate-x-1/2" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: duration.slow,
              delay: index * 0.1,
              ease: easeOutExpo,
            }}
            className={cn(
              "relative grid md:grid-cols-2 gap-8 items-center",
              index % 2 === 0 ? "md:text-right" : ""
            )}
          >
            {/* Content */}
            <div
              className={cn(
                "ml-16 md:ml-0",
                index % 2 === 0 ? "md:pr-12" : "md:order-2 md:pl-12"
              )}
            >
              <span className="text-shell font-display text-2xl">
                {event.year}
              </span>
              <h3 className="font-display text-xl text-ink mt-2 mb-3">
                {event.title}
              </h3>
              <p className="text-neutral-600">{event.description}</p>
            </div>

            {/* Dot */}
            <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 rounded-full bg-shell border-4 border-white shadow-lg -translate-x-1/2" />

            {/* Spacer for grid alignment */}
            <div className={cn("hidden md:block", index % 2 !== 0 && "md:order-1")} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Team Grid Component
function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {members.map((member, index) => (
        <motion.div
          key={member.name}
          variants={fadeInUp}
          custom={index}
          className="group text-center"
        >
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h3 className="font-display text-lg text-ink">{member.name}</h3>
          <p className="text-sm text-shell">{member.role}</p>
          {member.bio && (
            <p className="text-sm text-neutral-500 mt-2">{member.bio}</p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Values Grid Component
function ValuesGrid({
  values,
}: {
  values: { icon: React.ReactNode; title: string; description: string }[];
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          variants={blurInUp}
          custom={index}
          className="bg-white p-8 rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-shadow"
        >
          <div className="w-14 h-14 rounded-xl bg-shell/10 flex items-center justify-center text-shell mb-6">
            {value.icon}
          </div>
          <h3 className="font-display text-xl text-ink mb-3">{value.title}</h3>
          <p className="text-neutral-600">{value.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Default Data
const defaultStats = [
  { value: 1928, label: "Established", suffix: "" },
  { value: 45, label: "Rooms & Suites", suffix: "" },
  { value: 96, label: "Guest Satisfaction", suffix: "%" },
  { value: 50, label: "Team Members", suffix: "+" },
];

const defaultTimeline: TimelineEvent[] = [
  {
    year: "1928",
    title: "The Beginning",
    description:
      "A small guesthouse opens its doors to welcome the first travelers seeking refuge on Texel's pristine shores.",
  },
  {
    year: "1956",
    title: "Expansion Era",
    description:
      "The hotel grows to 20 rooms, establishing itself as a premier destination for discerning travelers.",
  },
  {
    year: "1985",
    title: "The Restaurant Opens",
    description:
      "Restaurant Opduin debuts, bringing farm-to-table cuisine long before it became a movement.",
  },
  {
    year: "2010",
    title: "Wellness Wing",
    description:
      "A state-of-the-art spa opens, featuring thalassotherapy treatments unique to the Wadden region.",
  },
  {
    year: "2024",
    title: "Sustainable Future",
    description:
      "Achieving Green Key Gold certification, we commit to carbon neutrality by 2030.",
  },
];

const defaultTeam: TeamMember[] = [
  {
    name: "Elisabeth van der Berg",
    role: "General Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
    bio: "20 years of luxury hospitality experience",
  },
  {
    name: "Thomas Bakker",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977",
    bio: "Michelin-trained, Texel native",
  },
  {
    name: "Marie de Vries",
    role: "Spa Director",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974",
    bio: "Certified thalassotherapy specialist",
  },
  {
    name: "Jan Mulder",
    role: "Head Concierge",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
    bio: "Your guide to Texel's hidden gems",
  },
];

// Main Component
export function AboutHero({
  variant = "main",
  title = "Our Story",
  subtitle = "Since 1928",
  description = "For nearly a century, Grand Hotel Opduin has been the guardian of Texel's hospitality tradition. From humble beginnings as a seaside guesthouse to becoming the island's premier luxury retreat, our story is woven into the fabric of this remarkable island.",
  heroImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
  stats = defaultStats,
  timeline = defaultTimeline,
  team = defaultTeam,
  values,
  className,
}: AboutHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);

  return (
    <div ref={sectionRef} className={cn("relative", className)}>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 -inset-y-[20%]">
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-navy"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-gutter">
          <div className="max-w-content-xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: easeOutExpo }}
            >
              <span className="text-overline text-shell tracking-luxury mb-4 block">
                {subtitle}
              </span>
              <h1 className="font-display text-display-2xl text-white mb-6">
                {title}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">{description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-16 border-b border-neutral-100">
        <div className="px-gutter max-w-content-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Variant-Specific Content */}
      {variant === "history" && timeline && (
        <section className="py-section-lg bg-sand-100">
          <div className="px-gutter max-w-content-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-display-lg text-ink mb-4">
                Our Journey
              </h2>
              <p className="text-body-lg text-neutral-600">
                Nearly a century of hospitality excellence
              </p>
            </motion.div>
            <Timeline events={timeline} />
          </div>
        </section>
      )}

      {variant === "team" && team && (
        <section className="py-section-lg bg-white">
          <div className="px-gutter max-w-content-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-display-lg text-ink mb-4">
                Meet Our Team
              </h2>
              <p className="text-body-lg text-neutral-600">
                The people who make your stay unforgettable
              </p>
            </motion.div>
            <TeamGrid members={team} />
          </div>
        </section>
      )}

      {variant === "philosophy" && values && (
        <section className="py-section-lg bg-sand-100">
          <div className="px-gutter max-w-content-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-display-lg text-ink mb-4">
                Our Values
              </h2>
              <p className="text-body-lg text-neutral-600">
                The principles that guide everything we do
              </p>
            </motion.div>
            <ValuesGrid values={values} />
          </div>
        </section>
      )}

      {variant === "location" && (
        <section className="py-section-lg bg-white">
          <div className="px-gutter max-w-content-2xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: duration.slow }}
              >
                <h2 className="font-display text-display-lg text-ink mb-6">
                  Finding Us
                </h2>
                <p className="text-body-lg text-neutral-600 mb-8">
                  Located on the western shore of Texel, Grand Hotel Opduin sits
                  where the dunes meet the sea. Just 20 minutes from the ferry
                  terminal, a world apart from the everyday.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-shell mt-1" />
                    <div>
                      <p className="font-medium text-ink">Address</p>
                      <p className="text-neutral-600">
                        Ruyslaan 22, 1796 AD De Koog, Texel
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar className="w-5 h-5 text-shell mt-1" />
                    <div>
                      <p className="font-medium text-ink">Getting Here</p>
                      <p className="text-neutral-600">
                        Ferry from Den Helder (20 min) + 15 min drive
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/contact" className="mt-8 inline-block">
                  <Button className="gap-2">
                    Get Directions
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: duration.slow }}
                className="aspect-square rounded-xl overflow-hidden bg-sand-200"
              >
                {/* Map placeholder - in production, use real map embed */}
                <div className="w-full h-full flex items-center justify-center bg-navy-50">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-navy mx-auto mb-4" />
                    <p className="text-navy font-medium">Interactive Map</p>
                    <p className="text-sm text-neutral-500">Texel Island, Netherlands</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-section-md bg-navy text-white">
        <div className="px-gutter max-w-content-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-display-md mb-6">
              Experience Our Story
            </h2>
            <p className="text-lg text-white/70 mb-8">
              We invite you to become part of our continuing legacy
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book">
                <Button
                  size="lg"
                  className="bg-shell text-navy hover:bg-shell-400"
                >
                  Book Your Stay
                </Button>
              </Link>
              <Link href="/rooms">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border border-white/30 hover:bg-white/10"
                >
                  Explore Rooms
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export type { AboutHeroProps, TimelineEvent, TeamMember };
