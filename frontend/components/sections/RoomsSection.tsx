"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Maximize2, Eye } from "lucide-react";
import { easeOutExpo, duration, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const rooms = [
  {
    id: 1,
    name: "Dune Suite",
    tagline: "Our signature retreat",
    description: "Panoramic views over the rolling dunes to the North Sea beyond",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    size: "55m²",
    guests: 2,
    view: "Dunes & Sea",
    featured: true,
    slug: "dune-suite",
  },
  {
    id: 2,
    name: "Sea View Room",
    tagline: "Wake to the rhythm of the tides",
    description: "Watch the moods of the sea change from the comfort of your room",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
    size: "35m²",
    guests: 2,
    view: "Sea View",
    slug: "sea-view-room",
  },
  {
    id: 3,
    name: "Garden Retreat",
    tagline: "Tranquility among native flora",
    description: "Ground floor haven with direct access to our private gardens",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
    size: "40m²",
    guests: 2,
    view: "Garden",
    slug: "garden-retreat",
  },
];

export function RoomsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-sand-100 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-32 -right-16 w-64 h-64 rounded-full border border-shell/10"
      />
      <motion.div
        style={{ y: decorY }}
        className="absolute bottom-32 -left-32 w-96 h-96 rounded-full border border-navy/5"
      />

      <div className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easeOutExpo }}
          className="mb-16 md:mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="text-overline text-shell tracking-widest mb-4 block">
                Accommodations
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1]">
                Rooms designed
                <br />
                <span className="text-navy-500">for stillness</span>
              </h2>
            </div>

            <Link
              href="/rooms"
              className="group inline-flex items-center gap-3 text-navy hover:text-shell transition-colors"
            >
              <span className="text-sm tracking-wide">View all 22 rooms</span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-shell group-hover:border-shell group-hover:text-navy transition-all"
              >
                <ArrowRight size={14} />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Rooms Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {rooms.map((room, index) => {
            const isFeatured = room.featured;

            return (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: duration.slow,
                  delay: index * stagger.normal,
                  ease: easeOutExpo,
                }}
                className={cn(
                  "group relative",
                  isFeatured
                    ? "lg:col-span-7 lg:row-span-2"
                    : "lg:col-span-5"
                )}
              >
                <Link href={`/rooms/${room.slug}`} className="block h-full">
                  <div className={cn(
                    "relative overflow-hidden bg-sand-200 h-full",
                    isFeatured ? "aspect-[4/5] md:aspect-auto md:h-full min-h-[500px] lg:min-h-[700px]" : "aspect-[4/3]"
                  )}>
                    {/* Image */}
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      sizes={isFeatured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={index < 2}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                      {/* Top - Badges */}
                      <div className="flex items-start justify-between">
                        {/* View badge */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs text-navy">
                          <Eye size={12} />
                          {room.view}
                        </span>

                        {/* Featured badge */}
                        {isFeatured && (
                          <span className="px-3 py-1.5 bg-shell text-navy text-xs font-medium tracking-wide uppercase">
                            Signature Suite
                          </span>
                        )}
                      </div>

                      {/* Bottom - Info */}
                      <div>
                        {/* Room details badges */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-xs text-white">
                            <Maximize2 size={12} />
                            {room.size}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-xs text-white">
                            <Users size={12} />
                            Up to {room.guests}
                          </span>
                        </div>

                        {/* Title & description */}
                        <h3 className={cn(
                          "font-display text-white mb-2 transition-colors duration-300",
                          isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
                        )}>
                          {room.name}
                        </h3>
                        <p className="text-white/60 text-sm italic mb-3">
                          {room.tagline}
                        </p>
                        <p className={cn(
                          "text-white/80 line-clamp-2",
                          isFeatured ? "text-base max-w-md" : "text-sm"
                        )}>
                          {room.description}
                        </p>

                        {/* CTA */}
                        <div className="mt-6 flex items-center gap-2 text-white group-hover:text-shell transition-colors">
                          <span className="text-sm tracking-wide">
                            View Details
                          </span>
                          <motion.div
                            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-shell group-hover:text-navy transition-all"
                          >
                            <ArrowRight size={14} />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, delay: 0.4, ease: easeOutExpo }}
          className="mt-16 text-center"
        >
          <p className="text-neutral-600 mb-6">
            Not sure which room? Our team is here to help you find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
            >
              View All Rooms
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
            >
              Check Availability
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
