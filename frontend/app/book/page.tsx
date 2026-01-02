"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SplitText } from "@/components/animations";
import { rooms } from "@/lib/data";
import {
  Calendar, Users, Minus, Plus, Check, ArrowRight, ArrowLeft,
  Phone, Mail, MapPin, Shield, Clock, CreditCard,
  Eye, Maximize2, Gift, BadgeCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

const steps = [
  { number: 1, label: "Dates & Guests" },
  { number: 2, label: "Choose Room" },
  { number: 3, label: "Your Details" },
];

const trustIndicators = [
  { icon: Shield, label: "Secure Booking" },
  { icon: Clock, label: "Instant Confirmation" },
  { icon: CreditCard, label: "No Payment Now" },
  { icon: BadgeCheck, label: "Best Rate Guarantee" },
];

const directBenefits = [
  "Free sauna access",
  "€5 off per night",
  "Texel gift on departure",
  "Flexible cancellation",
];

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get("room");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    selectedRoom: preselectedRoom || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleGuestChange = (type: "adults" | "children", increment: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [type]: increment
        ? Math.min(prev[type] + 1, type === "adults" ? 6 : 4)
        : Math.max(prev[type] - 1, type === "adults" ? 1 : 0),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const selectedRoomData = rooms.find((r) => r.slug === formData.selectedRoom);

  // Calculate nights
  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="max-w-xl mx-auto text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 bg-shell flex items-center justify-center"
        >
          <Check size={40} className="text-navy" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display text-3xl md:text-4xl text-ink mb-4"
        >
          Request Received
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-neutral-600 mb-6"
        >
          Thank you for your reservation request. Our team will review your details
          and confirm your booking within 24 hours via email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-sand-100 p-6 mb-8"
        >
          <p className="text-sm text-neutral-500 mb-2">Confirmation will be sent to:</p>
          <p className="text-ink font-medium">{formData.email}</p>
        </motion.div>

        {/* Summary */}
        {selectedRoomData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="bg-white border border-sand-200 p-6 mb-8 text-left"
          >
            <p className="text-sm text-neutral-500 mb-4">Reservation Summary</p>
            <div className="flex gap-4 mb-4">
              <div className="relative w-24 h-20 overflow-hidden bg-sand-100 flex-shrink-0">
                <Image
                  src={selectedRoomData.image}
                  alt={selectedRoomData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-display text-lg text-ink">{selectedRoomData.name}</p>
                <p className="text-sm text-neutral-500">{nights} nights</p>
              </div>
            </div>
            <div className="border-t border-sand-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Check-in</span>
                <span className="text-ink">{formData.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Check-out</span>
                <span className="text-ink">{formData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Guests</span>
                <span className="text-ink">
                  {formData.adults} adults{formData.children > 0 && `, ${formData.children} children`}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-12">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center gap-2 md:gap-4">
              <motion.button
                type="button"
                onClick={() => s.number < step && setStep(s.number)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: easeOutExpo }}
                className="flex items-center gap-2 md:gap-3"
                disabled={s.number > step}
              >
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors",
                    step >= s.number
                      ? "bg-navy text-white"
                      : "bg-sand-100 text-neutral-400"
                  )}
                >
                  {step > s.number ? <Check size={16} /> : s.number}
                </div>
                <span
                  className={cn(
                    "hidden md:block text-sm",
                    step >= s.number ? "text-ink" : "text-neutral-400"
                  )}
                >
                  {s.label}
                </span>
              </motion.button>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className={cn(
                    "w-8 md:w-16 h-px origin-left",
                    step > s.number ? "bg-navy" : "bg-sand-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Dates & Guests */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="max-w-xl mx-auto space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  When are you visiting?
                </h3>
                <p className="text-neutral-500">Select your dates and number of guests</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-ink mb-2">Check-in</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors bg-white"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-ink mb-2">Check-out</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      min={formData.checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors bg-white"
                    />
                  </div>
                </motion.div>
              </div>

              {nights > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-shell font-medium"
                >
                  {nights} night{nights > 1 ? "s" : ""} selected
                </motion.div>
              )}

              <div className="space-y-0">
                {(["adults", "children"] as const).map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between py-5 border-b border-sand-200"
                  >
                    <div>
                      <p className="font-medium text-ink capitalize">{type}</p>
                      <p className="text-sm text-neutral-500">
                        {type === "adults" ? "Ages 18+" : "Ages 0-17"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleGuestChange(type, false)}
                        className="w-10 h-10 border border-sand-200 flex items-center justify-center hover:border-navy transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-ink">{formData[type]}</span>
                      <button
                        type="button"
                        onClick={() => handleGuestChange(type, true)}
                        className="w-10 h-10 border border-sand-200 flex items-center justify-center hover:border-navy transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => setStep(2)}
                disabled={!formData.checkIn || !formData.checkOut || nights < 1}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Room Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
            >
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  Choose your room
                </h3>
                <p className="text-neutral-500">
                  {nights} night{nights > 1 ? "s" : ""} · {formData.adults} adult{formData.adults > 1 ? "s" : ""}
                  {formData.children > 0 && ` · ${formData.children} child${formData.children > 1 ? "ren" : ""}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {rooms.map((room, index) => (
                  <motion.button
                    key={room.id}
                    type="button"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: easeOutExpo }}
                    onClick={() => setFormData({ ...formData, selectedRoom: room.slug })}
                    className={cn(
                      "text-left border transition-all group",
                      formData.selectedRoom === room.slug
                        ? "border-navy bg-sand-50"
                        : "border-sand-200 hover:border-neutral-300 bg-white"
                    )}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-sand-100">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Selection indicator */}
                      <AnimatePresence>
                        {formData.selectedRoom === room.slug && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="absolute top-3 right-3 w-8 h-8 bg-navy flex items-center justify-center"
                          >
                            <Check size={16} className="text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {/* View badge */}
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs text-navy">
                        <Eye size={10} />
                        {room.view}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-display text-lg text-ink mb-1">{room.name}</h4>
                      <p className="text-sm text-neutral-500 mb-3">{room.tagline}</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Maximize2 size={12} />
                          {room.size} m²
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          Up to {room.maxGuests}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex gap-4"
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!formData.selectedRoom}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="max-w-xl mx-auto"
            >
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  Your details
                </h3>
                <p className="text-neutral-500">Complete your reservation request</p>
              </div>

              {/* Summary Card */}
              {selectedRoomData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="bg-sand-100 p-6 mb-8"
                >
                  <p className="text-sm text-neutral-500 mb-4">Reservation Summary</p>
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-20 h-16 overflow-hidden bg-sand-200 flex-shrink-0">
                      <Image
                        src={selectedRoomData.image}
                        alt={selectedRoomData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-ink">{selectedRoomData.name}</p>
                      <p className="text-sm text-neutral-500">
                        {formData.checkIn} → {formData.checkOut}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {formData.adults} adult{formData.adults > 1 ? "s" : ""}
                        {formData.children > 0 && `, ${formData.children} child${formData.children > 1 ? "ren" : ""}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-shell font-medium">{nights} nights</p>
                    </div>
                  </div>

                  {/* Direct booking benefits */}
                  <div className="border-t border-sand-200 pt-4">
                    <p className="text-xs text-shell font-medium mb-2 flex items-center gap-1">
                      <Gift size={12} />
                      Book Direct Benefits Included
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {directBenefits.slice(0, 2).map((benefit) => (
                        <span key={benefit} className="text-xs text-neutral-500 flex items-center gap-1">
                          <Check size={10} className="text-shell" />
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors bg-white"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-ink mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors bg-white"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-ink mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+31 6 12345678"
                    className="w-full px-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors bg-white"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-ink mb-2">
                    Special Requests <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-4 border border-sand-200 focus:border-navy outline-none transition-colors resize-none bg-white"
                    placeholder="Dietary requirements, accessibility needs, special occasions..."
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4 mt-8"
              >
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-shell text-navy hover:bg-shell/90 transition-colors text-sm tracking-wide uppercase"
                >
                  Submit Request
                  <ArrowRight size={16} />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-xs text-neutral-400 text-center mt-6"
              >
                By submitting, you agree to our booking terms. No payment required until confirmation.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero - Simplified */}
        <section className="relative h-[40vh] min-h-[280px] overflow-hidden bg-navy">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
              alt="Book your stay at Grand Hotel Opduin"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-navy/50" />

          <div className="absolute inset-0 flex items-end pb-12 md:pb-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                <span className="text-overline text-shell tracking-widest mb-4 block">
                  Reservations
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: 60 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
                >
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                    <SplitText type="words" animation="fadeUp" staggerDelay={0.05} delay={0.2}>
                      Book Your Stay
                    </SplitText>
                  </h1>
                </motion.div>
              </div>

              <p className="text-lg text-white/80 max-w-lg">
                Reserve directly with us for the best rates and exclusive benefits.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              {trustIndicators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <Icon size={16} className="text-shell" />
                    <span>{item.label}</span>
                    {index < trustIndicators.length - 1 && (
                      <span className="hidden md:block ml-6 text-white/30">|</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-sand-200">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Book" }]} />
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24">
            <Suspense
              fallback={
                <div className="text-center py-12">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-neutral-500"
                  >
                    Loading...
                  </motion.div>
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-20 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">
                Prefer to speak with us?
              </h2>
              <p className="text-neutral-500">Our reservations team is available to assist you.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+31 (0)222 317 445",
                  href: "tel:+31222317445",
                  subtext: "Mon-Sun 9:00-18:00"
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "reservations@opduin.nl",
                  href: "mailto:reservations@opduin.nl",
                  subtext: "Response within 24h"
                },
                {
                  icon: MapPin,
                  title: "Address",
                  content: "Ruijslaan 22, De Koog",
                  href: null,
                  subtext: "1796 AD Texel"
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: easeOutExpo }}
                    className="text-center bg-white p-8"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 bg-shell/10 flex items-center justify-center">
                      <Icon size={24} className="text-shell" />
                    </div>
                    <h3 className="font-medium text-ink mb-2">{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-neutral-600 hover:text-shell transition-colors block mb-1"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-neutral-600 mb-1">{item.content}</p>
                    )}
                    <p className="text-sm text-neutral-400">{item.subtext}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
