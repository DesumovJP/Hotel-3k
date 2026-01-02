"use client";

import { motion } from "framer-motion";
import { Users, Wifi, Monitor, Coffee, MapPin, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

export interface MeetingRoom {
  id: number;
  name: string;
  capacity: number;
  size: number;
  image: string;
  amenities: string[];
  priceHalfDay: number;
  priceFullDay: number;
}

export interface MeetingPackage {
  id: number;
  name: string;
  description: string;
  includes: string[];
  pricePerPerson: number;
  isPopular?: boolean;
}

interface MeetingsSectionProps {
  rooms: MeetingRoom[];
  packages: MeetingPackage[];
  contacts?: {
    name: string;
    role: string;
    email: string;
    phone: string;
  }[];
  onInquiry?: () => void;
  className?: string;
}

const amenityIcons: Record<string, React.FC<{ className?: string }>> = {
  wifi: Wifi,
  projector: Monitor,
  catering: Coffee,
  default: Check,
};

function MeetingRoomCard({ room }: { room: MeetingRoom }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="bg-neutral rounded-xl overflow-hidden shadow-elevation-2 hover:shadow-elevation-3 transition-shadow"
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <motion.img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-ink mb-2">{room.name}</h3>

        {/* Specs */}
        <div className="flex gap-4 text-ink-600 text-body-sm mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            Up to {room.capacity}
          </span>
          <span>{room.size} m²</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity.toLowerCase()] || amenityIcons.default;
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-2 py-1 bg-sand-200 rounded text-xs text-ink-600"
              >
                <Icon className="w-3 h-3" />
                {amenity}
              </span>
            );
          })}
        </div>

        {/* Pricing */}
        <div className="flex justify-between items-center pt-4 border-t border-sand-300">
          <div>
            <p className="text-ink-500 text-xs">From</p>
            <p className="font-display text-lg text-ink">€{room.priceHalfDay}</p>
            <p className="text-ink-500 text-xs">half day</p>
          </div>
          <Button variant="secondary" size="sm">
            Inquire
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function PackageCard({ pkg }: { pkg: MeetingPackage }) {
  return (
    <motion.article
      variants={fadeInUp}
      className={cn(
        "bg-neutral rounded-xl p-6 shadow-elevation-1 relative",
        pkg.isPopular && "ring-2 ring-gold"
      )}
    >
      {pkg.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-xs px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="font-display text-xl text-ink mb-2">{pkg.name}</h3>
      <p className="text-ink-600 text-body-sm mb-4">{pkg.description}</p>

      <ul className="space-y-2 mb-6">
        {pkg.includes.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-ink-700 text-body-sm">
            <Check className="w-4 h-4 text-gold flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl text-ink">€{pkg.pricePerPerson}</span>
        <span className="text-ink-500 text-sm">/ person</span>
      </div>
    </motion.article>
  );
}

export function MeetingsSection({
  rooms,
  packages,
  contacts,
  onInquiry,
  className,
}: MeetingsSectionProps) {
  return (
    <section className={cn("py-section-lg bg-sand-100", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-16">
            <span className="text-gold text-overline uppercase tracking-widest mb-2 block">
              Meetings & Events
            </span>
            <h2 className="font-display text-display-lg text-ink mb-4">
              Inspiring Spaces for Every Occasion
            </h2>
            <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">
              From intimate boardroom meetings to grand celebrations, our versatile spaces
              provide the perfect backdrop for your event.
            </p>
          </motion.header>

          {/* Meeting Rooms */}
          <div className="mb-20">
            <motion.h3
              variants={fadeInUp}
              className="font-display text-display-sm text-ink mb-8 text-center"
            >
              Meeting Rooms
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <MeetingRoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="mb-20">
            <motion.h3
              variants={fadeInUp}
              className="font-display text-display-sm text-ink mb-8 text-center"
            >
              Meeting Packages
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>

          {/* Contacts */}
          {contacts && contacts.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="bg-deepsea rounded-2xl p-8 text-center"
            >
              <h3 className="font-display text-display-sm text-neutral mb-4">
                Get in Touch
              </h3>
              <p className="text-neutral/70 mb-8">
                Our events team is ready to help you plan the perfect meeting or event.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {contacts.map((contact, i) => (
                  <div key={i} className="text-center">
                    <p className="font-display text-lg text-neutral">{contact.name}</p>
                    <p className="text-gold text-sm mb-2">{contact.role}</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-neutral/70 text-sm hover:text-gold transition-colors block"
                    >
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="text-neutral/70 text-sm hover:text-gold transition-colors block"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
              <Button variant="primary" className="mt-8" onClick={onInquiry}>
                Request a Proposal
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Default data
export const defaultMeetingRooms: MeetingRoom[] = [
  {
    id: 1,
    name: "The Boardroom",
    capacity: 12,
    size: 35,
    image: "/images/meetings/boardroom.jpg",
    amenities: ["WiFi", "Projector", "Video conferencing", "Catering"],
    priceHalfDay: 350,
    priceFullDay: 600,
  },
  {
    id: 2,
    name: "Dune View Room",
    capacity: 40,
    size: 80,
    image: "/images/meetings/dune-view.jpg",
    amenities: ["WiFi", "Projector", "Natural light", "Terrace access"],
    priceHalfDay: 600,
    priceFullDay: 1000,
  },
  {
    id: 3,
    name: "Grand Ballroom",
    capacity: 150,
    size: 250,
    image: "/images/meetings/ballroom.jpg",
    amenities: ["WiFi", "Stage", "AV system", "Catering", "Dance floor"],
    priceHalfDay: 1500,
    priceFullDay: 2500,
  },
];

export const defaultMeetingPackages: MeetingPackage[] = [
  {
    id: 1,
    name: "Half-Day Package",
    description: "Perfect for focused morning or afternoon sessions",
    includes: ["4-hour room rental", "Coffee & tea", "Lunch or snacks", "Basic AV equipment"],
    pricePerPerson: 45,
  },
  {
    id: 2,
    name: "Full-Day Package",
    description: "Complete solution for productive all-day meetings",
    includes: ["8-hour room rental", "Continuous refreshments", "Lunch buffet", "Full AV setup", "Dedicated coordinator"],
    pricePerPerson: 75,
    isPopular: true,
  },
  {
    id: 3,
    name: "Residential Package",
    description: "Overnight stay with meeting facilities",
    includes: ["Full-day package", "Overnight accommodation", "Breakfast", "Dinner", "Spa access"],
    pricePerPerson: 195,
  },
];

export const defaultContacts = [
  {
    name: "Luuk van der Berg",
    role: "Events Manager",
    email: "events@opduin.nl",
    phone: "+31 222 317 446",
  },
  {
    name: "Esmee de Vries",
    role: "Wedding Coordinator",
    email: "weddings@opduin.nl",
    phone: "+31 222 317 447",
  },
];
