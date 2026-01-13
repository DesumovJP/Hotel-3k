"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { RoomGallery } from "@/components/molecules";
import {
  Users,
  Maximize,
  Bed,
  Eye,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  Wifi,
  Wind,
  Coffee,
  Tv,
  Bath,
  Snowflake,
  Sofa,
  UtensilsCrossed,
  Sun,
  Home,
  Waves,
  BedDouble,
  Baby,
  type LucideIcon,
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import type { Room } from "@/lib/data";

// Smart icon mapping for room features/amenities
function getFeatureIcon(text: string): LucideIcon {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("wifi") || lowerText.includes("wi-fi")) return Wifi;
  if (lowerText.includes("air") || lowerText.includes("conditioning") || lowerText.includes("airco")) return Wind;
  if (lowerText.includes("nespresso") || lowerText.includes("coffee")) return Coffee;
  if (lowerText.includes("tv") || lowerText.includes("television")) return Tv;
  if (lowerText.includes("bath")) return Bath;
  if (lowerText.includes("shower")) return Waves;
  if (lowerText.includes("fridge") || lowerText.includes("refrigerator") || lowerText.includes("microwave") || lowerText.includes("kitchen") || lowerText.includes("stove")) return UtensilsCrossed;
  if (lowerText.includes("bed") || lowerText.includes("box spring") || lowerText.includes("king")) return BedDouble;
  if (lowerText.includes("couch") || lowerText.includes("sofa") || lowerText.includes("seating") || lowerText.includes("living")) return Sofa;
  if (lowerText.includes("balcony") || lowerText.includes("terrace")) return Sun;
  if (lowerText.includes("kids") || lowerText.includes("child") || lowerText.includes("bunk")) return Baby;
  if (lowerText.includes("sauna")) return Snowflake;
  if (lowerText.includes("room") && (lowerText.includes("separate") || lowerText.includes("bedroom"))) return Home;

  return Bed;
}

interface RoomDetailClientProps {
  room: Room;
  otherRooms: Room[];
}

export function RoomDetailClient({ room, otherRooms }: RoomDetailClientProps) {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] md:h-[60vh] overflow-hidden bg-navy">
          <Image
            src={room.image}
            alt={room.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-transparent" />

          {/* Back Link */}
          <div className="absolute top-24 left-6 md:left-12 lg:left-24">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={16} />
              All Rooms
            </Link>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span
                  className="text-white/90 text-xs tracking-[0.2em] uppercase mb-3 block"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)' }}
                >
                  {room.view} View · {room.size} m²
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                  {room.name}
                </h1>
                <p className="text-xl text-white/80 font-display italic">
                  {room.tagline}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-shell" />
                <span>Up to {room.maxGuests} Guests</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <Maximize size={16} className="text-shell" />
                <span>{room.size} m²</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <div className="flex items-center gap-2">
                <BedDouble size={16} className="text-shell" />
                <span>{room.bedType}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline
              items={[
                { label: "Rooms & Suites", href: "/rooms" },
                { label: room.name },
              ]}
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left Column - Details */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  {/* Description */}
                  <div className="mb-10">
                    <h2 className="font-display text-2xl text-ink mb-4">About This Room</h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {room.longDescription}
                    </p>
                  </div>

                  {/* Room Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                      { icon: Users, label: "Guests", value: `Up to ${room.maxGuests}` },
                      { icon: Maximize, label: "Size", value: `${room.size} m²` },
                      { icon: BedDouble, label: "Bed", value: room.bedType.split(" ")[0] },
                      { icon: Eye, label: "View", value: room.view },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="neo-card p-4 text-center"
                      >
                        <stat.icon size={24} className="text-shell mx-auto mb-2" />
                        <p className="text-ink font-medium">{stat.value}</p>
                        <p className="text-xs text-neutral-500">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Features & Amenities */}
                  <div className="mb-10">
                    <h2 className="font-display text-2xl text-ink mb-5">Room Features</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                      {room.features.map((feature, index) => {
                        const Icon = getFeatureIcon(feature);
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            className="flex items-center gap-2.5 text-ink/60"
                          >
                            <Icon size={16} className="text-shell/70" />
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        );
                      })}
                      {room.amenities.map((amenity, index) => {
                        const Icon = getFeatureIcon(amenity);
                        return (
                          <motion.div
                            key={`amenity-${index}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: (room.features.length + index) * 0.03 }}
                            className="flex items-center gap-2.5 text-ink/60"
                          >
                            <Icon size={16} className="text-shell/70" />
                            <span className="text-sm">{amenity}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Booking Card */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
                  className="sticky top-24"
                >
                  <div className="neo-card p-8">
                    <h3 className="font-display text-xl text-ink mb-2">Book This Room</h3>
                    <p className="text-neutral-500 text-sm mb-6">
                      Price varies per day. Direct booking recommended.
                    </p>

                    {/* Room highlights */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-sand-50">
                        <Eye size={18} className="text-shell" />
                        <div>
                          <p className="font-medium text-ink text-sm">{room.view} View</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-sand-50">
                        <Users size={18} className="text-shell" />
                        <div>
                          <p className="font-medium text-ink text-sm">Up to {room.maxGuests} guests</p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3">
                      <Link
                        href={`/book?room=${room.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        Check Availability
                        <ArrowRight size={16} />
                      </Link>
                      <a
                        href="tel:+31222317445"
                        className="flex items-center justify-center gap-2 w-full py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                      >
                        <Phone size={16} />
                        +31 222 317 445
                      </a>
                      <a
                        href="mailto:info@opduin.nl"
                        className="flex items-center justify-center gap-2 w-full py-3 text-neutral-600 hover:text-navy transition-colors text-sm"
                      >
                        <Mail size={16} />
                        info@opduin.nl
                      </a>
                    </div>
                  </div>

                  {/* Direct Booking Note */}
                  <div className="mt-6 p-4 bg-shell/10 text-center">
                    <p className="text-sm text-neutral-600">
                      <strong className="text-navy">Book direct & save!</strong><br />
                      Free sauna access + €5 off
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <RoomGallery images={room.gallery} roomName={room.name} />

        {/* More Rooms */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink">More Rooms</h2>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors text-sm"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherRooms.map((otherRoom, index) => (
                <motion.article
                  key={otherRoom.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/rooms/${otherRoom.slug}`} className="group block h-full">
                    <div className="neo-card neo-card-hover overflow-hidden h-full flex flex-col">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={otherRoom.image}
                          alt={otherRoom.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-navy text-xs flex items-center gap-1.5 shadow-sm">
                          <Eye size={12} />
                          {otherRoom.view}
                        </span>
                      </div>
                      <div className="p-5 flex-1">
                        <h3 className="font-display text-lg text-ink mb-1 group-hover:text-shell transition-colors line-clamp-1">
                          {otherRoom.name}
                        </h3>
                        <p className="text-neutral-500 text-sm">{otherRoom.size} m² · Up to {otherRoom.maxGuests} guests</p>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
