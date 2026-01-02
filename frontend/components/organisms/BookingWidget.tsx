"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ChevronDown, ChevronRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { duration, easeOutExpo } from "@/lib/motion";
import {
  trackStartBooking,
  trackSelectDates,
  trackSelectRoom,
  trackCompleteBooking,
} from "@/lib/analytics";
import { useAnnouncer, useEscapeKey, useReducedMotion } from "@/lib/accessibility";

interface BookingWidgetProps {
  className?: string;
  variant?: "floating" | "inline" | "compact";
  onBook?: (booking: BookingData) => void;
}

interface BookingData {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
}

interface PricingData {
  basePrice: number;
  nights: number;
  subtotal: number;
  taxes: number;
  total: number;
  currency: string;
}

const ROOM_BASE_PRICE = 295; // EUR per night
const TAX_RATE = 0.09; // 9% tourist tax

export function BookingWidget({
  className,
  variant = "floating",
  onBook,
}: BookingWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [step, setStep] = useState<"dates" | "guests" | "confirm">("dates");
  const [booking, setBooking] = useState<BookingData>({
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  // Accessibility hooks
  const announce = useAnnouncer();
  const prefersReducedMotion = useReducedMotion();

  // Refs for focus management
  const widgetRef = useRef<HTMLDivElement>(null);
  const firstDateButtonRef = useRef<HTMLButtonElement>(null);
  const guestsContainerRef = useRef<HTMLDivElement>(null);
  const confirmContainerRef = useRef<HTMLDivElement>(null);

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectingDate, setSelectingDate] = useState<"checkIn" | "checkOut">("checkIn");

  // Track booking start
  useEffect(() => {
    if (!hasTrackedStart && (showDatePicker || step !== "dates")) {
      trackStartBooking("quick_booking");
      setHasTrackedStart(true);
    }
  }, [showDatePicker, step, hasTrackedStart]);

  // Focus management when step changes
  useEffect(() => {
    if (step === "guests" && guestsContainerRef.current) {
      const firstButton = guestsContainerRef.current.querySelector("button");
      firstButton?.focus();
      announce("Select number of guests. Currently 2 adults, 0 children, 1 room.");
    } else if (step === "confirm" && confirmContainerRef.current) {
      confirmContainerRef.current.focus();
      announce("Reservation confirmed! Check your email for confirmation details.");
    }
  }, [step, announce]);

  // Close date picker on Escape
  useEscapeKey(() => {
    if (showDatePicker) {
      setShowDatePicker(false);
      announce("Date picker closed.");
    }
  }, showDatePicker);

  // Calculate pricing
  const pricing = useMemo<PricingData | null>(() => {
    if (!booking.checkIn || !booking.checkOut) return null;

    const nights = Math.ceil(
      (booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (nights <= 0) return null;

    const basePrice = ROOM_BASE_PRICE * booking.rooms;
    const subtotal = basePrice * nights;
    const taxes = subtotal * TAX_RATE;
    const total = subtotal + taxes;

    return {
      basePrice,
      nights,
      subtotal,
      taxes,
      total,
      currency: "EUR",
    };
  }, [booking]);

  const formatDate = (date: Date | null) => {
    if (!date) return "Select date";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleDateSelect = (date: Date) => {
    if (selectingDate === "checkIn") {
      setBooking((prev) => ({
        ...prev,
        checkIn: date,
        checkOut: prev.checkOut && prev.checkOut <= date ? null : prev.checkOut,
      }));
      setSelectingDate("checkOut");
      announce(`Check-in date selected: ${formatDate(date)}. Now select check-out date.`);
    } else {
      setBooking((prev) => ({ ...prev, checkOut: date }));
      setShowDatePicker(false);

      // Track date selection
      if (booking.checkIn) {
        trackSelectDates(booking.checkIn, date, booking.adults + booking.children);
      }

      announce(`Check-out date selected: ${formatDate(date)}. Proceeding to guest selection.`);
      setStep("guests");
    }
  };

  const handleGuestChange = (type: "adults" | "children" | "rooms", delta: number) => {
    setBooking((prev) => {
      const newValue = Math.max(type === "adults" ? 1 : type === "rooms" ? 1 : 0, prev[type] + delta);
      const labels = { adults: "adults", children: "children", rooms: "rooms" };
      announce(`${newValue} ${labels[type]}`);
      return { ...prev, [type]: newValue };
    });
  };

  const handleBookNow = () => {
    const nights = pricing?.nights || 1;

    // Track room selection
    trackSelectRoom(
      "deluxe-room",
      "Deluxe Room",
      "deluxe",
      pricing?.basePrice || ROOM_BASE_PRICE,
      nights
    );

    if (pricing && onBook) {
      onBook(booking);
    }

    // Track completed booking
    trackCompleteBooking(
      `booking-${Date.now()}`,
      pricing?.total || 0,
      booking.rooms,
      nights,
      booking.adults + booking.children,
      []
    );

    announce("Processing your reservation...");
    setStep("confirm");
  };

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Add empty slots for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  };

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const calendarDays = generateCalendarDays(calendarMonth.year, calendarMonth.month);
  const monthName = new Date(calendarMonth.year, calendarMonth.month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    if (selectingDate === "checkOut" && booking.checkIn && date <= booking.checkIn) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (booking.checkIn && date.toDateString() === booking.checkIn.toDateString()) return true;
    if (booking.checkOut && date.toDateString() === booking.checkOut.toDateString()) return true;
    return false;
  };

  const isDateInRange = (date: Date) => {
    if (!booking.checkIn || !booking.checkOut) return false;
    return date > booking.checkIn && date < booking.checkOut;
  };

  // Compact variant for header
  if (variant === "compact") {
    return (
      <motion.button
        onClick={() => setIsExpanded(true)}
        className={cn(
          "flex items-center gap-3 px-5 py-2.5 bg-deepsea text-white rounded-sm",
          "text-sm font-medium tracking-wide",
          "hover:bg-deepsea-600 hover:shadow-lg hover:shadow-deepsea/20 active:bg-deepsea-800 transition-all duration-200 ease-out tap-target focus-visible-ring",
          className
        )}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>Book Now</span>
      </motion.button>
    );
  }

  return (
    <>
      {/* Main Widget */}
      <motion.div
        ref={widgetRef}
        initial={variant === "floating" && !prefersReducedMotion ? { y: 40, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : 0.5, ease: easeOutExpo }}
        className={cn(
          "glass-300 rounded-xl shadow-elevation-3",
          variant === "floating" && "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-4xl",
          variant === "inline" && "w-full",
          className
        )}
        role="form"
        aria-label="Room booking form"
      >
        <div className="p-4 md:p-6">
          {/* Step Indicator */}
          <nav aria-label="Booking progress" className="flex items-center gap-2 mb-6">
            <ol className="flex items-center gap-2" role="list">
              {(["dates", "guests", "confirm"] as const).map((s, i) => {
                const stepLabels = { dates: "Select Dates", guests: "Guests", confirm: "Confirmation" };
                const isCompleted = i < ["dates", "guests", "confirm"].indexOf(step);
                const isCurrent = step === s;

                return (
                  <li key={s} className="flex items-center">
                    <motion.div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-150",
                        isCurrent
                          ? "bg-gold text-white"
                          : isCompleted
                          ? "bg-deepsea text-white"
                          : "bg-sand-200 text-ink/60"
                      )}
                      animate={prefersReducedMotion ? {} : { scale: isCurrent ? 1.05 : 1 }}
                      transition={{ duration: 0.15 }}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-label={`Step ${i + 1}: ${stepLabels[s]}${isCompleted ? " (completed)" : isCurrent ? " (current)" : ""}`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true">{i + 1}</span>
                      )}
                    </motion.div>
                    {i < 2 && (
                      <div
                        className={cn(
                          "w-12 h-0.5 mx-2 transition-colors duration-150",
                          isCompleted ? "bg-gold" : "bg-sand-300"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <AnimatePresence mode="wait">
            {/* Step 1: Dates */}
            {step === "dates" && (
              <motion.div
                key="dates"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Check-in */}
                  <button
                    onClick={() => {
                      setSelectingDate("checkIn");
                      setShowDatePicker(true);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all duration-150 tap-target focus-visible-ring",
                      selectingDate === "checkIn" && showDatePicker
                        ? "border-gold bg-sand-100"
                        : "border-sand-300 hover:border-gold/50"
                    )}
                  >
                    <Calendar className="w-5 h-5 text-gold" aria-hidden="true" />
                    <div>
                      <span className="text-xs text-ink/60 uppercase tracking-wider block">
                        Check-in
                      </span>
                      <span className="text-lg font-medium text-ink">
                        {formatDate(booking.checkIn)}
                      </span>
                    </div>
                  </button>

                  {/* Check-out */}
                  <button
                    onClick={() => {
                      setSelectingDate("checkOut");
                      setShowDatePicker(true);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all duration-150 tap-target focus-visible-ring",
                      selectingDate === "checkOut" && showDatePicker
                        ? "border-gold bg-sand-100"
                        : "border-sand-300 hover:border-gold/50"
                    )}
                  >
                    <Calendar className="w-5 h-5 text-gold" aria-hidden="true" />
                    <div>
                      <span className="text-xs text-ink/60 uppercase tracking-wider block">
                        Check-out
                      </span>
                      <span className="text-lg font-medium text-ink">
                        {formatDate(booking.checkOut)}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Calendar */}
                <AnimatePresence>
                  {showDatePicker && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-neutral-100 rounded-lg p-4 mb-4">
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() =>
                              setCalendarMonth((prev) => ({
                                year: prev.month === 0 ? prev.year - 1 : prev.year,
                                month: prev.month === 0 ? 11 : prev.month - 1,
                              }))
                            }
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <ChevronDown className="w-5 h-5 rotate-90" />
                          </button>
                          <span className="font-medium text-ink">{monthName}</span>
                          <button
                            onClick={() =>
                              setCalendarMonth((prev) => ({
                                year: prev.month === 11 ? prev.year + 1 : prev.year,
                                month: prev.month === 11 ? 0 : prev.month + 1,
                              }))
                            }
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <ChevronDown className="w-5 h-5 -rotate-90" />
                          </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div
                              key={day}
                              className="text-center text-xs text-neutral-500 py-2"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDays.map((date, i) => (
                            <div key={i} className="aspect-square">
                              {date && (
                                <button
                                  onClick={() => !isDateDisabled(date) && handleDateSelect(date)}
                                  disabled={isDateDisabled(date)}
                                  className={cn(
                                    "w-full h-full rounded-lg text-sm font-medium transition-all",
                                    isDateDisabled(date)
                                      ? "text-neutral-300 cursor-not-allowed"
                                      : isDateSelected(date)
                                      ? "bg-navy text-white"
                                      : isDateInRange(date)
                                      ? "bg-navy-100 text-navy"
                                      : "hover:bg-white text-ink"
                                  )}
                                >
                                  {date.getDate()}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {booking.checkIn && booking.checkOut && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setStep("guests")}
                    className="w-full py-4 bg-deepsea text-white rounded-sm font-medium hover:bg-deepsea-600 hover:shadow-lg hover:shadow-deepsea/20 active:bg-deepsea-800 transition-all duration-200 ease-out flex items-center justify-center gap-2 tap-target focus-visible-ring"
                  >
                    Continue <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Step 2: Guests */}
            {step === "guests" && (
              <motion.div
                key="guests"
                ref={guestsContainerRef}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                aria-label="Guest selection"
              >
                <div className="space-y-4 mb-6" role="group" aria-label="Number of guests and rooms">
                  {/* Adults */}
                  <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg" role="group" aria-labelledby="adults-label">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-navy" aria-hidden="true" />
                      <div>
                        <span id="adults-label" className="font-medium text-ink block">Adults</span>
                        <span className="text-sm text-neutral-600">Age 18+</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3" role="spinbutton" aria-valuenow={booking.adults} aria-valuemin={1} aria-valuemax={10} aria-label="Number of adults">
                      <button
                        onClick={() => handleGuestChange("adults", -1)}
                        disabled={booking.adults <= 1}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy disabled:opacity-50 tap-target focus-visible-ring"
                        aria-label="Decrease adults"
                      >
                        <span aria-hidden="true">-</span>
                      </button>
                      <span className="w-8 text-center font-medium" aria-live="polite">{booking.adults}</span>
                      <button
                        onClick={() => handleGuestChange("adults", 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy tap-target focus-visible-ring"
                        aria-label="Increase adults"
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg" role="group" aria-labelledby="children-label">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-navy" aria-hidden="true" />
                      <div>
                        <span id="children-label" className="font-medium text-ink block">Children</span>
                        <span className="text-sm text-neutral-600">Age 0-17</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3" role="spinbutton" aria-valuenow={booking.children} aria-valuemin={0} aria-valuemax={6} aria-label="Number of children">
                      <button
                        onClick={() => handleGuestChange("children", -1)}
                        disabled={booking.children <= 0}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy disabled:opacity-50 tap-target focus-visible-ring"
                        aria-label="Decrease children"
                      >
                        <span aria-hidden="true">-</span>
                      </button>
                      <span className="w-8 text-center font-medium" aria-live="polite">{booking.children}</span>
                      <button
                        onClick={() => handleGuestChange("children", 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy tap-target focus-visible-ring"
                        aria-label="Increase children"
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg" role="group" aria-labelledby="rooms-label">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-navy" aria-hidden="true" />
                      <div>
                        <span id="rooms-label" className="font-medium text-ink block">Rooms</span>
                        <span className="text-sm text-neutral-600">Deluxe rooms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3" role="spinbutton" aria-valuenow={booking.rooms} aria-valuemin={1} aria-valuemax={5} aria-label="Number of rooms">
                      <button
                        onClick={() => handleGuestChange("rooms", -1)}
                        disabled={booking.rooms <= 1}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy disabled:opacity-50 tap-target focus-visible-ring"
                        aria-label="Decrease rooms"
                      >
                        <span aria-hidden="true">-</span>
                      </button>
                      <span className="w-8 text-center font-medium" aria-live="polite">{booking.rooms}</span>
                      <button
                        onClick={() => handleGuestChange("rooms", 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy tap-target focus-visible-ring"
                        aria-label="Increase rooms"
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pricing Preview */}
                {pricing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-sand-100 rounded-lg p-4 mb-6"
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">
                        {formatCurrency(pricing.basePrice)} × {pricing.nights} nights
                      </span>
                      <span>{formatCurrency(pricing.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-neutral-600">Taxes & fees</span>
                      <span>{formatCurrency(pricing.taxes)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg border-t border-sand-300 pt-3">
                      <span>Total</span>
                      <span className="text-navy">{formatCurrency(pricing.total)}</span>
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("dates")}
                    className="px-6 py-4 border border-sand-300 rounded-lg font-medium hover:border-gold transition-colors duration-150 tap-target focus-visible-ring"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBookNow}
                    className="flex-1 py-4 bg-deepsea text-white rounded-sm font-medium hover:bg-deepsea-600 hover:shadow-lg hover:shadow-deepsea/20 active:bg-deepsea-800 transition-all duration-200 ease-out flex items-center justify-center gap-2 tap-target focus-visible-ring"
                  >
                    Book Now <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === "confirm" && (
              <motion.div
                key="confirm"
                ref={confirmContainerRef}
                tabIndex={-1}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-center py-8"
                role="status"
                aria-live="polite"
              >
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 bg-deepsea rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-8 h-8 text-white" aria-hidden="true" />
                </motion.div>
                <h3 className="text-2xl font-display text-ink mb-2">Reservation Confirmed</h3>
                <p className="text-ink/60 mb-6">
                  Check your email for confirmation details.
                </p>
                <div className="glass-100 rounded-lg p-4 text-left max-w-sm mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-ink/60">Check-in</span>
                    <span className="font-medium text-ink">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-ink/60">Check-out</span>
                    <span className="font-medium text-ink">{formatDate(booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/60">Guests</span>
                    <span className="font-medium text-ink">
                      {booking.adults} adults, {booking.children} children
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
