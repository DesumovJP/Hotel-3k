"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const experiences = [
  {
    id: "dining",
    label: "Dining",
    title: "From Sea to Table",
    description:
      "Fresh catches from the Wadden Sea. Lamb raised on salt marshes. Our kitchen celebrates the island's bounty.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974",
    link: "/restaurant",
    linkText: "Reserve a table",
  },
  {
    id: "wellness",
    label: "Wellness",
    title: "Space to Breathe",
    description:
      "Indoor pool with dune views. Sauna warmed by island timber. Treatments inspired by the healing sea.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070",
    link: "/wellness",
    linkText: "Explore wellness",
  },
  {
    id: "meetings",
    label: "Meetings & Events",
    title: "Gather with Purpose",
    description:
      "Inspiring spaces for teams and celebrations. From intimate boardrooms to seaside receptions.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069",
    link: "/meetings",
    linkText: "Plan your event",
  },
];

export function ExperiencesSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-sand-soft">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
                className="group"
              >
                {/* Image */}
                <Link href={exp.link} className="block relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                {/* Content */}
                <span className="text-shell text-xs tracking-[0.2em] uppercase mb-2 block">
                  {exp.label}
                </span>
                <h3 className="font-display text-xl md:text-2xl text-ink mb-2">
                  {exp.title}
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed text-sm">
                  {exp.description}
                </p>
                <Link
                  href={exp.link}
                  className="inline-flex items-center gap-2 text-ink hover:text-shell transition-colors text-sm tracking-wide"
                >
                  {exp.linkText}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
