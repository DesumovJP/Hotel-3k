"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, Plus, ArrowRight, Maximize2, Users, Waves, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { duration, easeOutExpo } from "@/lib/motion";

export interface RoomData {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  size: number; // m²
  maxGuests: number;
  bedType: string;
  view: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  available: boolean;
}

interface RoomCardProps {
  room: RoomData;
  variant?: "default" | "featured" | "compact";
  isComparing?: boolean;
  onCompareToggle?: (room: RoomData) => void;
  priority?: boolean;
}

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  "sea-view": <Waves className="w-4 h-4" />,
  balcony: <Maximize2 className="w-4 h-4" />,
};

export function RoomCard({
  room,
  variant = "default",
  isComparing = false,
  onCompareToggle,
  priority = false,
}: RoomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: room.currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discount = room.originalPrice
    ? Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100)
    : 0;

  // Compact variant for comparison drawer
  if (variant === "compact") {
    return (
      <div className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-200">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={room.images[0]}
            alt={room.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg text-ink truncate">{room.name}</h4>
          <p className="text-sm text-neutral-600 mb-2">{room.category}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-medium text-navy">{formatPrice(room.price)}</span>
            <span className="text-xs text-neutral-500">/night</span>
          </div>
        </div>
        {onCompareToggle && (
          <button
            onClick={() => onCompareToggle(room)}
            className="self-start p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <motion.div animate={{ rotate: isComparing ? 45 : 0 }}>
              <Plus className="w-5 h-5 text-neutral-600" />
            </motion.div>
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: variant === "featured" ? rotateX : 0,
        rotateY: variant === "featured" ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden",
        "shadow-elevation-2 hover:shadow-elevation-4 transition-shadow duration-500",
        variant === "featured" && "md:col-span-2"
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden",
        variant === "featured" ? "aspect-[21/9]" : "aspect-room"
      )}>
        {/* Main Image */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="absolute inset-0"
        >
          <Image
            src={room.images[imageIndex]}
            alt={room.name}
            fill
            priority={priority}
            className="object-cover"
            sizes={variant === "featured" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

        {/* Image Dots Navigation */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {room.images.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setImageIndex(i);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  i === imageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {!room.available && (
            <span className="px-3 py-1 bg-ink/80 text-white text-xs font-medium rounded-full">
              Fully Booked
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-shell text-ink text-xs font-medium rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Compare Toggle */}
        {onCompareToggle && (
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              onCompareToggle(room);
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered || isComparing ? 1 : 0, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors",
              isComparing
                ? "bg-shell text-ink"
                : "bg-white/90 text-ink hover:bg-white"
            )}
          >
            {isComparing ? (
              <Check className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </motion.button>
        )}

        {/* Quick Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-shell text-overline tracking-widest mb-2 block">
                {room.category}
              </span>
              <h3 className="font-display text-display-sm text-white mb-2">
                {room.name}
              </h3>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-4 h-4" />
                  {room.size}m²
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Up to {room.maxGuests}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Description */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {room.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="px-3 py-1 bg-sand-100 text-navy text-xs font-medium rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            {room.originalPrice && (
              <span className="text-sm text-neutral-400 line-through mr-2">
                {formatPrice(room.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-medium text-navy">
                {formatPrice(room.price)}
              </span>
              <span className="text-sm text-neutral-500">/night</span>
            </div>
          </div>

          <Link href={`/rooms/${room.slug}`}>
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              disabled={!room.available}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-colors",
                room.available
                  ? "bg-navy text-white hover:bg-navy-500"
                  : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
              )}
            >
              {room.available ? "View Room" : "Unavailable"}
              {room.available && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          boxShadow: "inset 0 0 0 2px var(--color-shell)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Room Card Skeleton for loading states
export function RoomCardSkeleton({ variant = "default" }: { variant?: "default" | "featured" }) {
  return (
    <div className={cn(
      "bg-white rounded-2xl overflow-hidden shadow-elevation-2",
      variant === "featured" && "md:col-span-2"
    )}>
      <div className={cn(
        "skeleton",
        variant === "featured" ? "aspect-[21/9]" : "aspect-room"
      )} />
      <div className="p-4 md:p-6">
        <div className="skeleton h-4 w-3/4 mb-3 rounded" />
        <div className="skeleton h-4 w-1/2 mb-4 rounded" />
        <div className="flex gap-2 mb-6">
          <div className="skeleton h-6 w-20 rounded-full" />
          <div className="skeleton h-6 w-24 rounded-full" />
        </div>
        <div className="flex justify-between items-center">
          <div className="skeleton h-8 w-24 rounded" />
          <div className="skeleton h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
