"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionHeroCompact, SectionCTA } from "@/components/sections";
import { rooms } from "@/lib/data";
import {
  Calendar, Users, Minus, Plus, Check, ArrowRight, ArrowLeft,
  Shield, Clock, CreditCard, Eye, Maximize2, Gift, BadgeCheck, Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

function BookingForm() {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");

  const steps = [
    { number: 1, label: t("steps.datesGuests") },
    { number: 2, label: t("steps.chooseRoom") },
    { number: 3, label: t("steps.yourDetails") },
  ];

  const trustIndicators = [
    { icon: Shield, label: t("trustIndicators.secure") },
    { icon: Clock, label: t("trustIndicators.instant") },
    { icon: CreditCard, label: t("trustIndicators.noPayment") },
    { icon: BadgeCheck, label: t("trustIndicators.bestRate") },
  ];

  const directBenefits = [
    t("directBenefits.sauna"),
    t("directBenefits.discount"),
    t("directBenefits.gift"),
    t("directBenefits.cancellation"),
  ];
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
  const formRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Scroll to form when step changes (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

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
          {t("success.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-neutral-600 mb-6"
        >
          {t("success.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-sand-100 p-6 mb-8"
        >
          <p className="text-sm text-neutral-500 mb-2">{t("success.confirmationTo")}</p>
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
            <p className="text-sm text-neutral-500 mb-4">{t("step3.reservationSummary")}</p>
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
            {t("success.returnHome")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
          >
            {tCommon("contactUs")}
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div ref={formRef} className="max-w-4xl mx-auto scroll-mt-8">
      <form onSubmit={handleSubmit}>
        {/* Progress Steps */}
        <div className="mb-12">
          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="h-1 bg-sand-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-navy"
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center gap-2 md:gap-4">
                <button
                  type="button"
                  onClick={() => s.number < step && setStep(s.number)}
                  className="flex items-center gap-2 md:gap-3 group"
                  disabled={s.number > step}
                >
                  <motion.div
                    whileHover={s.number < step ? { scale: 1.05 } : {}}
                    whileTap={s.number < step ? { scale: 0.95 } : {}}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center text-sm font-medium transition-all duration-300",
                      step >= s.number
                        ? "bg-navy text-white"
                        : "bg-sand-100 text-neutral-400",
                      step === s.number && "ring-2 ring-shell ring-offset-2",
                      s.number < step && "cursor-pointer hover:bg-navy-600"
                    )}
                  >
                    {step > s.number ? <Check size={16} /> : s.number}
                  </motion.div>
                  <span
                    className={cn(
                      "hidden md:block text-sm transition-colors",
                      step >= s.number ? "text-ink" : "text-neutral-400"
                    )}
                  >
                    {s.label}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 md:w-16 h-px transition-colors duration-500",
                      step > s.number ? "bg-navy" : "bg-sand-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <>
          {/* Step 1: Dates & Guests */}
          {step === 1 && (
            <div className="max-w-xl mx-auto space-y-8">
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  {t("step1.title")}
                </h3>
                <p className="text-neutral-500">{t("step1.subtitle")}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-ink mb-2">{t("checkIn")}</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-navy transition-colors" />
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-ink mb-2">{t("checkOut")}</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-navy transition-colors" />
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      min={formData.checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all bg-white"
                    />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {nights > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center overflow-hidden"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-shell/10 text-navy font-medium">
                      <Check size={16} className="text-shell" />
                      {nights} {nights > 1 ? t("step1.nightsSelectedPlural") : t("step1.nightsSelected")}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-0">
                {(["adults", "children"] as const).map((type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between py-5 border-b border-sand-200"
                  >
                    <div>
                      <p className="font-medium text-ink capitalize">{type === "adults" ? t("adults") : t("children")}</p>
                      <p className="text-sm text-neutral-500">
                        {type === "adults" ? t("step1.adultsAges") : t("step1.childrenAges")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGuestChange(type, false)}
                        className="w-10 h-10 border border-sand-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all"
                      >
                        <Minus size={16} />
                      </motion.button>
                      <span className="w-8 text-center font-display text-xl text-ink">{formData[type]}</span>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGuestChange(type, true)}
                        className="w-10 h-10 border border-sand-200 flex items-center justify-center hover:border-navy hover:bg-navy hover:text-white transition-all"
                      >
                        <Plus size={16} />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                disabled={!formData.checkIn || !formData.checkOut || nights < 1}
                className="group w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-all text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {t("continue")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          )}

          {/* Step 2: Room Selection */}
          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  {t("step2.title")}
                </h3>
                <p className="text-neutral-500">
                  {nights} night{nights > 1 ? "s" : ""} · {formData.adults} adult{formData.adults > 1 ? "s" : ""}
                  {formData.children > 0 && ` · ${formData.children} child${formData.children > 1 ? "ren" : ""}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {rooms.map((room) => (
                  <motion.button
                    key={room.id}
                    type="button"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, selectedRoom: room.slug })}
                    className={cn(
                      "text-left transition-all group",
                      "shadow-sm hover:shadow-lg",
                      formData.selectedRoom === room.slug
                        ? "ring-2 ring-navy bg-sand-50"
                        : "bg-white"
                    )}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden bg-sand-100">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />
                      {/* Selection indicator */}
                      <AnimatePresence>
                        {formData.selectedRoom === room.slug && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="absolute top-3 right-3 w-8 h-8 bg-navy flex items-center justify-center shadow-md"
                          >
                            <Check size={16} className="text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {/* View badge */}
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/95 text-xs text-navy font-medium shadow-sm">
                        <Eye size={10} />
                        {room.view}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-display text-lg text-ink mb-1 group-hover:text-navy transition-colors">{room.name}</h4>
                      <p className="text-sm text-neutral-500 mb-3 line-clamp-1">{room.tagline}</p>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Maximize2 size={12} className="text-shell" />
                          {room.size} m²
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} className="text-shell" />
                          {t("step2.upTo")} {room.maxGuests}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="button"
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="group flex items-center justify-center gap-2 px-6 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-all text-sm tracking-wide uppercase"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  {t("back")}
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(3)}
                  disabled={!formData.selectedRoom}
                  className="group flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-all text-sm tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {t("continue")}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl md:text-3xl text-ink mb-2">
                  {t("step3.title")}
                </h3>
                <p className="text-neutral-500">{t("step3.subtitle")}</p>
              </div>

              {/* Summary Card */}
              {selectedRoomData && (
                <div className="bg-sand-50 border border-sand-200 p-6 mb-8">
                  <p className="text-xs text-shell font-medium uppercase tracking-wider mb-4">{t("step3.reservationSummary")}</p>
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-24 h-20 overflow-hidden bg-sand-200 flex-shrink-0 shadow-sm">
                      <Image
                        src={selectedRoomData.image}
                        alt={selectedRoomData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-lg text-ink">{selectedRoomData.name}</p>
                      <p className="text-sm text-neutral-500 flex items-center gap-1">
                        <Calendar size={12} className="text-shell" />
                        {formData.checkIn} → {formData.checkOut}
                      </p>
                      <p className="text-sm text-neutral-500 flex items-center gap-1">
                        <Users size={12} className="text-shell" />
                        {formData.adults} adult{formData.adults > 1 ? "s" : ""}
                        {formData.children > 0 && `, ${formData.children} child${formData.children > 1 ? "ren" : ""}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-navy">{nights}</p>
                      <p className="text-xs text-neutral-500">{nights > 1 ? t("nights") : t("night")}</p>
                    </div>
                  </div>

                  {/* Direct booking benefits */}
                  <div className="border-t border-sand-200 pt-4">
                    <p className="text-xs text-navy font-medium mb-3 flex items-center gap-1.5">
                      <Gift size={14} className="text-shell" />
                      {t("directBenefits.title")}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {directBenefits.map((benefit) => (
                        <span key={benefit} className="text-xs text-neutral-600 flex items-center gap-1.5">
                          <Check size={12} className="text-shell flex-shrink-0" />
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-ink mb-2">{t("step3.firstName")}</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all bg-white"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-ink mb-2">{t("step3.lastName")}</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all bg-white"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-ink mb-2">{t("step3.email")}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all bg-white placeholder:text-neutral-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-ink mb-2">{t("step3.phone")}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+31 6 12345678"
                    className="w-full px-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all bg-white placeholder:text-neutral-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-ink mb-2">
                    {t("step3.specialRequests")} <span className="text-neutral-400 font-normal">({t("step3.specialRequestsOptional")})</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-4 border border-sand-200 focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-all resize-none bg-white placeholder:text-neutral-300"
                    placeholder={t("step3.specialRequestsPlaceholder")}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <motion.button
                  type="button"
                  onClick={() => setStep(2)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-center gap-2 px-6 py-4 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-sm tracking-wide uppercase"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  {t("back")}
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-shell text-navy hover:bg-shell/90 transition-colors text-sm tracking-wide uppercase"
                >
                  {t("step3.submitRequest")}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <p className="text-xs text-neutral-400 text-center mt-6">
                {t("step3.terms")}
              </p>
            </div>
          )}
        </>
      </form>
    </div>
  );
}

export default function BookPage() {
  const t = useTranslations("booking");
  const tNav = useTranslations("nav");

  return (
    <>
      <main>
        {/* Hero */}
        <SectionHeroCompact
          label={t("heroLabel")}
          title={t("heroTitle")}
          description={t("heroDescription")}
          image="/home/hero-fallback.jpg"
        />

        {/* Trust Indicators */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              {[
                { icon: Shield, label: t("trustIndicators.secure") },
                { icon: Clock, label: t("trustIndicators.instant") },
                { icon: CreditCard, label: t("trustIndicators.noPayment") },
                { icon: BadgeCheck, label: t("trustIndicators.bestRate") },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2">
                    <Icon size={16} className="text-shell" />
                    <span>{item.label}</span>
                    {index < 3 && (
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
            <BreadcrumbsInline items={[{ label: tNav("reserve") }]} />
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

        {/* Contact CTA */}
        <SectionCTA
          icon={Phone}
          title={t("cta.title")}
          description={t("cta.description")}
          actions={[
            { label: t("cta.call"), href: "tel:+31222317445" },
          ]}
          background="sand"
        />
      </main>

      <Footer />
    </>
  );
}
