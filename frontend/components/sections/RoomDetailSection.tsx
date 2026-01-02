"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed,
  Users,
  Maximize,
  Eye,
  Wifi,
  Coffee,
  Bath,
  Tv,
  Wind,
  PawPrint,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/motion";

// Room data interface
export interface RoomDetailData {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: number;
  maxGuests: number;
  bedType: string;
  view: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  petsAllowed?: boolean;
  petsFee?: number;
  cancellationPolicy?: {
    title: string;
    rules: string[];
  };
}

interface RoomDetailSectionProps {
  room: RoomDetailData;
  onBook?: () => void;
  className?: string;
}

// Amenity icons mapping
const amenityIcons: Record<string, React.FC<{ className?: string }>> = {
  wifi: Wifi,
  coffee: Coffee,
  bath: Bath,
  tv: Tv,
  aircon: Wind,
  default: Check,
};

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => setCurrentIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-sand-200">
        <motion.img
          key={currentIndex}
          src={images[currentIndex] || "/images/rooms/placeholder.jpg"}
          alt={`${name} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === currentIndex ? "bg-white" : "bg-white/50"
              )}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                i === currentIndex ? "border-gold" : "border-transparent"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-modal bg-black/95 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[currentIndex]}
              alt={name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function RoomDetailSection({ room, onBook, className }: RoomDetailSectionProps) {
  return (
    <section className={cn("py-section-md bg-neutral", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Gallery */}
          <motion.div variants={fadeInUp}>
            <ImageGallery images={room.images} name={room.name} />
          </motion.div>

          {/* Details */}
          <motion.div variants={fadeInUp}>
            {/* Category badge */}
            <span className="text-gold text-overline uppercase tracking-widest">
              {room.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-display-lg text-ink mt-2 mb-4">
              {room.name}
            </h1>

            {/* Key specs */}
            <div className="flex flex-wrap gap-6 mb-6 text-ink-600">
              <span className="flex items-center gap-2">
                <Maximize className="w-5 h-5" />
                {room.size} m²
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Up to {room.maxGuests} guests
              </span>
              <span className="flex items-center gap-2">
                <Bed className="w-5 h-5" />
                {room.bedType}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {room.view}
              </span>
            </div>

            {/* Description */}
            <p className="text-ink-700 text-body-lg leading-relaxed mb-8">
              {room.description}
            </p>

            {/* Price & CTA */}
            <div className="bg-sand-200 rounded-xl p-6 mb-8">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-display-md text-ink">
                  €{room.price}
                </span>
                {room.originalPrice && (
                  <span className="text-ink-400 line-through">
                    €{room.originalPrice}
                  </span>
                )}
                <span className="text-ink-500">/ night</span>
              </div>
              <Button variant="primary" size="lg" fullWidth onClick={onBook}>
                Book This Room
              </Button>
              <p className="text-center text-ink-500 text-body-sm mt-2">
                Best rate guarantee • Free cancellation
              </p>
            </div>

            {/* Highlights */}
            {room.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-lg text-ink mb-4">Room Highlights</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {room.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-ink-700">
                      <Check className="w-4 h-4 text-gold flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="font-display text-lg text-ink mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-3">
                {room.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity.toLowerCase()] || amenityIcons.default;
                  return (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-sand-100 rounded-lg text-ink-700 text-body-sm"
                    >
                      <Icon className="w-4 h-4" />
                      {amenity}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Pets Policy */}
            {room.petsAllowed !== undefined && (
              <div className="flex items-start gap-3 p-4 bg-sand-100 rounded-lg mb-4">
                <PawPrint className={cn("w-5 h-5 mt-0.5", room.petsAllowed ? "text-green-600" : "text-ink-400")} />
                <div>
                  <p className="font-medium text-ink">
                    {room.petsAllowed ? "Pets Welcome" : "No Pets Allowed"}
                  </p>
                  {room.petsAllowed && room.petsFee && (
                    <p className="text-ink-500 text-body-sm">
                      €{room.petsFee} per pet per night
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {room.cancellationPolicy && (
              <div className="p-4 bg-sand-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-gold" />
                  <h4 className="font-medium text-ink">{room.cancellationPolicy.title}</h4>
                </div>
                <ul className="text-ink-600 text-body-sm space-y-1">
                  {room.cancellationPolicy.rules.map((rule, i) => (
                    <li key={i}>• {rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default room data for development
export const defaultRoomDetail: RoomDetailData = {
  id: 1,
  name: "Sea View Suite",
  slug: "sea-view-suite",
  category: "Suite",
  description: "Luxurious suite with breathtaking North Sea views. Featuring a separate living area, spa bath, and exclusive amenities for the discerning guest.",
  price: 445,
  originalPrice: 495,
  size: 55,
  maxGuests: 3,
  bedType: "King bed + Sofa bed",
  view: "Sea View",
  images: [
    "/images/rooms/sea-view-suite-1.jpg",
    "/images/rooms/sea-view-suite-2.jpg",
    "/images/rooms/sea-view-suite-3.jpg",
  ],
  amenities: ["WiFi", "Coffee", "Bath", "TV", "Air conditioning", "Mini bar", "Safe"],
  highlights: [
    "Panoramic sea views",
    "Separate living room",
    "Spa bath",
    "Complimentary minibar",
    "Butler service",
    "Balcony",
  ],
  petsAllowed: true,
  petsFee: 25,
  cancellationPolicy: {
    title: "Flexible Cancellation",
    rules: [
      "Free cancellation up to 48 hours before check-in",
      "50% charge for cancellations within 48 hours",
      "No refund for no-shows",
    ],
  },
};
