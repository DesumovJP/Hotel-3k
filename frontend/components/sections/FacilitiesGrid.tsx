"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Clock, Users, Thermometer } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo, duration, stagger } from "@/lib/motion";
import type { WellnessFacility, FacilityIcon, PriceType } from "@/lib/types/wellness";

function formatFacilityPrice(price: number, priceType: PriceType): string {
  if (priceType === "free" || priceType === "included" || price === 0) {
    return priceType === "included" ? "Included" : "Free";
  }
  const suffix = {
    per_hour: "/hr",
    per_session: "/session",
    per_day: "/day",
    free: "",
    included: "",
  }[priceType];
  return `€${price}${suffix}`;
}

interface FacilityCardProps {
  facility: WellnessFacility;
  index: number;
  isFeatured?: boolean;
}

function FacilityCard({ facility, index, isFeatured = false }: FacilityCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: duration.slow,
        delay: index * stagger.tight,
        ease: easeOutExpo,
      }}
      className={cn(
        "group relative",
        isFeatured && "md:col-span-2 md:row-span-2"
      )}
    >
      <div className={cn(
        "relative overflow-hidden h-full bg-sand-200",
        isFeatured ? "aspect-square md:aspect-auto md:min-h-[500px]" : "aspect-[4/3]"
      )}>
        {/* Image */}
        <Image
          src={facility.image?.url || "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800"}
          alt={facility.image?.alternativeText || facility.title}
          fill
          sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent" />
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className={cn(
            "px-3 py-1.5 text-xs font-medium tracking-wide",
            facility.priceType === "included" || facility.priceType === "free"
              ? "bg-shell text-navy"
              : "bg-white/95 text-navy shadow-sm"
          )}>
            {formatFacilityPrice(facility.price, facility.priceType)}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className={cn(
            "font-display text-white mb-2",
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          )}>
            {facility.title}
          </h3>
          <p className={cn(
            "text-white/80 mb-4",
            isFeatured ? "text-base max-w-md" : "text-sm line-clamp-2"
          )}>
            {facility.shortDescription || facility.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-white/70 text-sm">
            {facility.temperature && (
              <span className="inline-flex items-center gap-1.5">
                <Thermometer size={14} />
                {facility.temperature}
              </span>
            )}
            {facility.capacity && (
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} />
                Max {facility.capacity}
              </span>
            )}
            {facility.availability && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} />
                {facility.availability.mondayToFriday}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

interface FacilitiesGridProps {
  facilities: WellnessFacility[];
  title?: string;
  subtitle?: string;
  variant?: "grid" | "bento" | "carousel";
  className?: string;
}

export function FacilitiesGrid({
  facilities,
  title = "Spa Facilities",
  subtitle = "Premium wellness amenities for your complete relaxation",
  className,
}: FacilitiesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const sortedFacilities = [...facilities].sort((a, b) => {
    if (a.isHighlighted && !b.isHighlighted) return -1;
    if (!a.isHighlighted && b.isHighlighted) return 1;
    return a.sortOrder - b.sortOrder;
  });

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className={cn("py-20 md:py-28 bg-white relative overflow-hidden", className)}
    >
      {/* Decorative */}
      <motion.div
        style={{ y: decorY }}
        className="absolute top-20 -left-20 w-80 h-80 rounded-full border border-shell/10"
      />

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slow, ease: easeOutExpo }}
          className="text-center mb-14"
        >
          <span className="text-overline text-shell tracking-widest mb-4 block">
            Facilities
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ink mb-4">
            {title}
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sortedFacilities.map((facility, index) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              index={index}
              isFeatured={index === 0}
            />
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center text-neutral-500 text-sm"
        >
          All facilities are available exclusively for hotel guests. Towels and robes provided.
        </motion.p>
      </div>
    </section>
  );
}

export const defaultFacilities: WellnessFacility[] = [
  {
    id: 1,
    documentId: "pool-1",
    title: "Indoor Swimming Pool",
    slug: "indoor-swimming-pool",
    description: "Our heated indoor pool offers stunning views across the dunes.",
    shortDescription: "Heated pool with panoramic dune views, 25m length.",
    icon: "pool",
    image: {
      id: 1,
      url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200",
      alternativeText: "Indoor swimming pool with dune views",
      width: 1200,
      height: 800,
    },
    price: 0,
    priceType: "included",
    availability: { mondayToFriday: "07:00 - 21:00", saturday: "08:00 - 21:00", sunday: "08:00 - 20:00" },
    capacity: 20,
    temperature: "28°C",
    features: ["25m length", "Panoramic views", "Sun loungers"],
    isHighlighted: true,
    sortOrder: 1,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 2,
    documentId: "sauna-1",
    title: "Finnish Sauna",
    slug: "finnish-sauna",
    description: "Traditional Finnish sauna heated with island timber.",
    shortDescription: "Traditional Finnish sauna with authentic heat therapy.",
    icon: "sauna",
    image: {
      id: 2,
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      alternativeText: "Finnish sauna interior",
      width: 800,
      height: 600,
    },
    price: 0,
    priceType: "included",
    availability: { mondayToFriday: "09:00 - 21:00", saturday: "09:00 - 21:00", sunday: "09:00 - 20:00" },
    capacity: 8,
    temperature: "80-90°C",
    features: ["Island timber", "Aufguss sessions"],
    isHighlighted: false,
    sortOrder: 2,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 3,
    documentId: "steam-1",
    title: "Steam Bath",
    slug: "steam-bath",
    description: "Eucalyptus-infused steam bath for respiratory wellness.",
    shortDescription: "Eucalyptus-infused steam for wellness.",
    icon: "steam",
    image: {
      id: 3,
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
      alternativeText: "Steam bath room",
      width: 800,
      height: 600,
    },
    price: 0,
    priceType: "included",
    availability: { mondayToFriday: "09:00 - 21:00", saturday: "09:00 - 21:00", sunday: "09:00 - 20:00" },
    capacity: 6,
    temperature: "45°C",
    features: ["Eucalyptus essence", "Chromotherapy"],
    isHighlighted: false,
    sortOrder: 3,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
  {
    id: 4,
    documentId: "solarium-1",
    title: "Solarium",
    slug: "solarium",
    description: "Professional high-pressure solarium for a golden glow.",
    shortDescription: "Professional high-pressure tanning.",
    icon: "solarium",
    image: {
      id: 4,
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
      alternativeText: "Modern solarium",
      width: 800,
      height: 600,
    },
    price: 15,
    priceType: "per_session",
    availability: { mondayToFriday: "09:00 - 20:00", saturday: "09:00 - 20:00", sunday: "10:00 - 18:00" },
    capacity: 1,
    features: ["High-pressure lamps", "Timer control"],
    isHighlighted: false,
    sortOrder: 4,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    publishedAt: "2024-01-01",
    locale: "en",
  },
];
