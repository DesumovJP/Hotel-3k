"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Maximize2 } from "lucide-react";
import { easeOutExpo, duration, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const rooms = [
  {
    id: 1,
    name: "Dune Suite",
    description: "Panoramic views over the rolling dunes to the North Sea beyond",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    price: "295",
    size: "55m²",
    guests: 2,
    featured: true,
  },
  {
    id: 2,
    name: "Sea View Room",
    description: "Wake to the rhythm of the tides",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
    price: "195",
    size: "35m²",
    guests: 2,
  },
  {
    id: 3,
    name: "Garden Retreat",
    description: "Tranquility among native island flora",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
    price: "225",
    size: "40m²",
    guests: 2,
  },
  {
    id: 4,
    name: "Family Suite",
    description: "Spacious comfort for the whole family",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
    price: "395",
    size: "75m²",
    guests: 4,
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
    <section ref={sectionRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-32 -right-16 w-64 h-64 rounded-full border border-shell/20"
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
              <span className="text-sm tracking-wide">View all rooms</span>
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
                <Link href={`/rooms/${room.id}`} className="block h-full">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                      {/* Room details badges */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs text-navy rounded-full">
                          <Maximize2 size={12} />
                          {room.size}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs text-navy rounded-full">
                          <Users size={12} />
                          {room.guests}
                        </span>
                      </div>

                      {/* Title & description */}
                      <h3 className={cn(
                        "font-display text-white mb-2 transition-colors duration-300",
                        isFeatured ? "text-3xl md:text-4xl" : "text-2xl"
                      )}>
                        {room.name}
                      </h3>
                      <p className={cn(
                        "text-white/80 mb-4 line-clamp-2",
                        isFeatured ? "text-base max-w-md" : "text-sm"
                      )}>
                        {room.description}
                      </p>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="text-white">
                          <span className="text-sm text-white/70">From</span>
                          <span className={cn(
                            "font-display ml-2",
                            isFeatured ? "text-2xl" : "text-xl"
                          )}>
                            €{room.price}
                          </span>
                          <span className="text-sm text-white/70 ml-1">/night</span>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-white group-hover:text-shell transition-colors"
                        >
                          <span className="text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                            Explore
                          </span>
                          <motion.div
                            whileHover={{ x: 4 }}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-shell group-hover:text-navy transition-all"
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Featured badge */}
                    {isFeatured && (
                      <div className="absolute top-6 left-6 px-4 py-2 bg-shell text-navy text-xs font-medium tracking-wide uppercase">
                        Signature Suite
                      </div>
                    )}
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
            Can't decide? Let our concierge help you find the perfect room.
          </p>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
          >
            View All Accommodations
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
