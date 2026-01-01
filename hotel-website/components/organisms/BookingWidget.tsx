"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ChevronDown, ChevronRight, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { duration, easeOutExpo } from "@/lib/motion";

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

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectingDate, setSelectingDate] = useState<"checkIn" | "checkOut">("checkIn");

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
    } else {
      setBooking((prev) => ({ ...prev, checkOut: date }));
      setShowDatePicker(false);
      setStep("guests");
    }
  };

  const handleGuestChange = (type: "adults" | "children" | "rooms", delta: number) => {
    setBooking((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : type === "rooms" ? 1 : 0, prev[type] + delta),
    }));
  };

  const handleBookNow = () => {
    if (pricing && onBook) {
      onBook(booking);
    }
    // In a real app, this would redirect to booking confirmation
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
          "flex items-center gap-3 px-5 py-2.5 bg-shell text-ink rounded-full",
          "text-sm font-medium tracking-wide",
          "hover:bg-shell-600 transition-colors duration-300",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Calendar className="w-4 h-4" />
        <span>Book Now</span>
      </motion.button>
    );
  }

  return (
    <>
      {/* Main Widget */}
      <motion.div
        initial={variant === "floating" ? { y: 100, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: duration.slow, delay: 1.5, ease: easeOutExpo }}
        className={cn(
          "bg-white rounded-xl shadow-elevation-3",
          variant === "floating" && "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-4xl",
          variant === "inline" && "w-full",
          className
        )}
      >
        <div className="p-4 md:p-6">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {["dates", "guests", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step === s
                      ? "bg-navy text-white"
                      : i < ["dates", "guests", "confirm"].indexOf(step)
                      ? "bg-shell text-ink"
                      : "bg-neutral-300 text-neutral-600"
                  )}
                  animate={{ scale: step === s ? 1.1 : 1 }}
                >
                  {i < ["dates", "guests", "confirm"].indexOf(step) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </motion.div>
                {i < 2 && (
                  <div
                    className={cn(
                      "w-12 h-0.5 mx-2",
                      i < ["dates", "guests", "confirm"].indexOf(step)
                        ? "bg-shell"
                        : "bg-neutral-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Dates */}
            {step === "dates" && (
              <motion.div
                key="dates"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Check-in */}
                  <button
                    onClick={() => {
                      setSelectingDate("checkIn");
                      setShowDatePicker(true);
                    }}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all",
                      selectingDate === "checkIn" && showDatePicker
                        ? "border-navy bg-navy-50"
                        : "border-neutral-300 hover:border-neutral-400"
                    )}
                  >
                    <Calendar className="w-5 h-5 text-navy" />
                    <div>
                      <span className="text-xs text-neutral-600 uppercase tracking-wider block">
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
                      "flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all",
                      selectingDate === "checkOut" && showDatePicker
                        ? "border-navy bg-navy-50"
                        : "border-neutral-300 hover:border-neutral-400"
                    )}
                  >
                    <Calendar className="w-5 h-5 text-navy" />
                    <div>
                      <span className="text-xs text-neutral-600 uppercase tracking-wider block">
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
                    onClick={() => setStep("guests")}
                    className="w-full py-4 bg-navy text-white rounded-lg font-medium hover:bg-navy-500 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Step 2: Guests */}
            {step === "guests" && (
              <motion.div
                key="guests"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4 mb-6">
                  {/* Adults */}
                  <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-navy" />
                      <div>
                        <span className="font-medium text-ink block">Adults</span>
                        <span className="text-sm text-neutral-600">Age 18+</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleGuestChange("adults", -1)}
                        disabled={booking.adults <= 1}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{booking.adults}</span>
                      <button
                        onClick={() => handleGuestChange("adults", 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-navy" />
                      <div>
                        <span className="font-medium text-ink block">Children</span>
                        <span className="text-sm text-neutral-600">Age 0-17</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleGuestChange("children", -1)}
                        disabled={booking.children <= 0}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{booking.children}</span>
                      <button
                        onClick={() => handleGuestChange("children", 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-navy" />
                      <div>
                        <span className="font-medium text-ink block">Rooms</span>
                        <span className="text-sm text-neutral-600">Deluxe rooms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleGuestChange("rooms", -1)}
                        disabled={booking.rooms <= 1}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{booking.rooms}</span>
                      <button
                        onClick={() => handleGuestChange("rooms", 1)}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-navy"
                      >
                        +
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
                    className="px-6 py-4 border border-neutral-300 rounded-lg font-medium hover:border-navy transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBookNow}
                    className="flex-1 py-4 bg-shell text-ink rounded-lg font-medium hover:bg-shell-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Book Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 bg-shell rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-8 h-8 text-ink" />
                </motion.div>
                <h3 className="text-2xl font-display text-ink mb-2">Reservation Confirmed</h3>
                <p className="text-neutral-600 mb-6">
                  Check your email for confirmation details.
                </p>
                <div className="bg-neutral-100 rounded-lg p-4 text-left max-w-sm mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-600">Check-in</span>
                    <span className="font-medium">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-600">Check-out</span>
                    <span className="font-medium">{formatDate(booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Guests</span>
                    <span className="font-medium">
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
