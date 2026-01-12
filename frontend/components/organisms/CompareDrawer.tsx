"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Check, Minus, ChevronUp, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { duration, easeOutExpo } from "@/lib/motion";
import type { RoomData } from "@/components/molecules/RoomCard";

// Compare Context for global state management
interface CompareContextType {
  rooms: RoomData[];
  addRoom: (room: RoomData) => void;
  removeRoom: (roomId: string) => void;
  clearAll: () => void;
  isComparing: (roomId: string) => boolean;
  maxRooms: number;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return context;
}

interface CompareProviderProps {
  children: React.ReactNode;
  maxRooms?: number;
}

export function CompareProvider({ children, maxRooms = 3 }: CompareProviderProps) {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  const addRoom = useCallback((room: RoomData) => {
    setRooms((prev) => {
      if (prev.length >= maxRooms) return prev;
      if (prev.some((r) => r.id === room.id)) return prev;
      return [...prev, room];
    });
  }, [maxRooms]);

  const removeRoom = useCallback((roomId: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  }, []);

  const clearAll = useCallback(() => {
    setRooms([]);
  }, []);

  const isComparing = useCallback(
    (roomId: string) => rooms.some((r) => r.id === roomId),
    [rooms]
  );

  return (
    <CompareContext.Provider
      value={{ rooms, addRoom, removeRoom, clearAll, isComparing, maxRooms }}
    >
      {children}
    </CompareContext.Provider>
  );
}

// Compare Drawer Component
interface CompareDrawerProps {
  className?: string;
}

export function CompareDrawer({ className }: CompareDrawerProps) {
  const { rooms, removeRoom, clearAll } = useCompare();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(rooms.length > 0);
    if (rooms.length === 0) {
      setIsExpanded(false);
    }
  }, [rooms.length]);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Comparison attributes
  const attributes = [
    { key: "price", label: "Price per night", format: (room: RoomData) => formatPrice(room.price, room.currency) },
    { key: "size", label: "Room size", format: (room: RoomData) => `${room.size}m²` },
    { key: "maxGuests", label: "Max guests", format: (room: RoomData) => `${room.maxGuests} persons` },
    { key: "bedType", label: "Bed type", format: (room: RoomData) => room.bedType },
    { key: "view", label: "View", format: (room: RoomData) => room.view },
  ];

  // Common amenities to compare
  const commonAmenities = [
    "Free WiFi",
    "Sea View",
    "Balcony",
    "Mini Bar",
    "Room Service",
    "Air Conditioning",
    "Nespresso Machine",
    "Rain Shower",
  ];

  const hasAmenity = (room: RoomData, amenity: string) => {
    return room.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: duration.normal, ease: easeOutExpo }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-white shadow-elevation-4 rounded-t-2xl",
            className
          )}
        >
          {/* Toggle Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 border-b border-neutral-200"
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm"
                  >
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="font-medium text-ink">
                Compare {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className="text-sm text-neutral-500 hover:text-ink transition-colors"
              >
                Clear all
              </button>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronUp className="w-5 h-5 text-neutral-500" />
              </motion.div>
            </div>
          </button>

          {/* Expanded Comparison View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: duration.normal }}
                className="overflow-hidden"
              >
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Room Headers */}
                  <div className="grid gap-4 p-4 bg-neutral-50" style={{
                    gridTemplateColumns: `200px repeat(${rooms.length}, 1fr)`,
                  }}>
                    <div className="text-sm text-neutral-500">Room Details</div>
                    {rooms.map((room) => (
                      <div key={room.id} className="relative">
                        <button
                          onClick={() => removeRoom(room.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                          <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h4 className="font-display text-lg text-ink">{room.name}</h4>
                        <p className="text-sm text-neutral-600">{room.category}</p>
                      </div>
                    ))}
                  </div>

                  {/* Attributes Comparison */}
                  <div className="divide-y divide-neutral-100">
                    {attributes.map((attr) => (
                      <div
                        key={attr.key}
                        className="grid gap-4 p-4"
                        style={{
                          gridTemplateColumns: `200px repeat(${rooms.length}, 1fr)`,
                        }}
                      >
                        <div className="text-sm text-neutral-500">{attr.label}</div>
                        {rooms.map((room) => (
                          <div key={room.id} className="font-medium text-ink">
                            {attr.format(room)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Amenities Comparison */}
                  <div className="p-4 bg-neutral-50">
                    <h5 className="text-sm font-medium text-ink mb-4">Amenities</h5>
                    <div className="space-y-3">
                      {commonAmenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="grid gap-4"
                          style={{
                            gridTemplateColumns: `200px repeat(${rooms.length}, 1fr)`,
                          }}
                        >
                          <div className="text-sm text-neutral-600">{amenity}</div>
                          {rooms.map((room) => (
                            <div key={room.id}>
                              {hasAmenity(room, amenity) ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <Minus className="w-5 h-5 text-neutral-300" />
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div
                    className="grid gap-4 p-4 border-t border-neutral-200"
                    style={{
                      gridTemplateColumns: `200px repeat(${rooms.length}, 1fr)`,
                    }}
                  >
                    <div />
                    {rooms.map((room) => (
                      <Link key={room.id} href={`/rooms/${room.slug}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2",
                            room.available
                              ? "bg-shell text-navy hover:bg-shell-600"
                              : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                          )}
                        >
                          {room.available ? "Book Now" : "Unavailable"}
                          {room.available && <ArrowRight className="w-4 h-4" />}
                        </motion.button>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsed Mini View */}
          {!isExpanded && rooms.length > 1 && (
            <div className="flex items-center justify-center gap-4 p-3">
              <span className="text-sm text-neutral-600">
                Ready to compare? Click to expand
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsExpanded(true)}
                className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium"
              >
                Compare Now
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper hook for toggling comparison
export function useCompareToggle(room: RoomData) {
  const { addRoom, removeRoom, isComparing } = useCompare();
  const comparing = isComparing(room.id);

  const toggle = useCallback(() => {
    if (comparing) {
      removeRoom(room.id);
    } else {
      addRoom(room);
    }
  }, [comparing, room, addRoom, removeRoom]);

  return { comparing, toggle };
}
