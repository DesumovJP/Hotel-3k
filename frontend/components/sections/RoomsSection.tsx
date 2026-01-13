"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Eye, ChevronRight } from "lucide-react";
import { easeOutExpo, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/accessibility";

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

// Premium Room Card with 3D Tilt Effect
interface RoomCardProps {
  room: typeof rooms[0];
  index: number;
  prefersReducedMotion: boolean;
}

function RoomCard({ room, index, prefersReducedMotion }: RoomCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Glare effect position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: easeOutExpo }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group cursor-pointer"
    >
      {/* Image Container with Glare */}
      <Link
        href={`/rooms/${room.slug}`}
        className="block relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100 mb-6 shadow-neo-sm"
        data-cursor="view"
      >
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Glare effect */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.25) 0%, transparent 50%)`,
            }}
          />
        )}

        {/* View Badge with sky blue */}
        <span className="absolute top-4 left-4 bg-white/95 text-sky-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Eye size={12} className="text-sky-500" />
          {room.view}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* View prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm tracking-[0.2em] uppercase font-medium">
            Explore
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="px-1">
        {/* Room specs with sky blue accent */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs tracking-[0.15em] uppercase text-sky-600 font-medium">
            {room.size} m²
          </span>
          <span className="w-1 h-1 rounded-full bg-sky-300" />
          <span className="text-xs tracking-[0.15em] uppercase text-neutral-400">
            Up to {room.guests} guests
          </span>
        </div>

        <h3 className="font-display text-2xl lg:text-[1.75rem] text-ink mb-2 group-hover:text-sky-700 transition-colors duration-300">
          <Link href={`/rooms/${room.slug}`}>{room.name}</Link>
        </h3>

        <p className="text-sm text-sky-600/80 italic mb-3 font-light">
          {room.tagline}
        </p>

        <p className="text-neutral-500 text-sm mb-6 line-clamp-2 leading-relaxed">
          {room.description}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-5">
          <Link
            href={`/rooms/${room.slug}`}
            className="relative inline-flex items-center gap-1.5 text-ink/70 hover:text-sky-600 transition-colors duration-300 text-sm tracking-[0.1em] uppercase group/link"
          >
            View Details
            <ChevronRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-sky-400 transition-all duration-300 group-hover/link:w-full" />
          </Link>
          <Link
            href={`/book?room=${room.slug}`}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-sky-600 text-white hover:bg-sky-700 transition-colors duration-300 text-xs tracking-[0.12em] uppercase rounded-full shadow-sm hover:shadow-md"
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function RoomsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white via-sky-50/30 to-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            {/* Sky blue accent line */}
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-px bg-sky-400" />
              <span className="text-xs tracking-[0.25em] uppercase text-sky-600 font-medium">
                Accommodations
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-[-0.02em]">
              Rooms designed<br />
              <span className="text-sky-600">for stillness</span>
            </h2>
          </div>

          <Link
            href="/rooms"
            className="group inline-flex items-center gap-3 text-ink/70 hover:text-sky-600 transition-colors duration-300"
          >
            <span className="text-sm tracking-[0.1em] uppercase">View all rooms</span>
            <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors duration-300">
              <ArrowRight size={14} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {rooms.map((room, index) => (
            <RoomCard
              key={room.id}
              room={room}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
