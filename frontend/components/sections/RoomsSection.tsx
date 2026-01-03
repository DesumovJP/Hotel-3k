"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Eye, ChevronRight } from "lucide-react";
import { easeOutExpo } from "@/lib/motion";

const rooms = [
  {
    id: 1,
    name: "Dune Suite",
    tagline: "Our signature retreat",
    description: "Panoramic views over the rolling dunes to the North Sea beyond",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    size: "55",
    guests: 2,
    view: "Dunes & Sea",
    slug: "dune-suite",
  },
  {
    id: 2,
    name: "Sea View Room",
    tagline: "Wake to the rhythm of the tides",
    description: "Watch the moods of the sea change from the comfort of your room",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
    size: "35",
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
    size: "40",
    guests: 2,
    view: "Garden",
    slug: "garden-retreat",
  },
];

export function RoomsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-overline text-shell tracking-widest mb-4 block">
              Accommodations
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.1]">
              Rooms designed<br />
              <span className="text-navy-500">for stillness</span>
            </h2>
          </div>

          <Link
            href="/rooms"
            className="group inline-flex items-center gap-2 text-navy hover:text-shell transition-colors"
          >
            <span className="text-sm tracking-wide">View all rooms</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: easeOutExpo }}
              className="group"
            >
              {/* Image */}
              <Link href={`/rooms/${room.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-sand-100 mb-5">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* View Badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy text-xs px-3 py-1.5 flex items-center gap-1.5">
                  <Eye size={12} />
                  {room.view}
                </span>
              </Link>

              {/* Content */}
              <div>
                <span className="text-overline text-shell tracking-widest mb-2 block text-xs">
                  {room.size} m² · Up to {room.guests} guests
                </span>

                <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-navy-600 transition-colors">
                  <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
                </h3>

                <p className="text-sm text-neutral-500 italic mb-3">
                  {room.tagline}
                </p>

                <p className="text-neutral-600 text-sm mb-5 line-clamp-2">
                  {room.description}
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="inline-flex items-center gap-1 text-navy hover:text-shell transition-colors text-sm tracking-wide uppercase group/link"
                  >
                    View Details
                    <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  <Link
                    href={`/book?room=${room.slug}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-navy text-white hover:bg-navy-600 transition-colors text-xs tracking-wide uppercase"
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
  );
}
