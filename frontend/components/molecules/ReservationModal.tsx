"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Users, User, Mail, Phone, MessageSquare, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const timeSlots = {
  lunch: ["12:00", "12:30", "13:00", "13:30", "14:00"],
  dinner: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
};

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    mealType: "" as "lunch" | "dinner" | "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    requests: "",
  });

  // Mount check for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend
    console.log("Reservation:", formData);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setIsSubmitted(false);
      setFormData({
        date: "",
        mealType: "",
        time: "",
        guests: 2,
        name: "",
        email: "",
        phone: "",
        requests: "",
      });
    }, 300);
  };

  const canProceedStep1 = formData.date && formData.mealType && formData.time && formData.guests;
  const canProceedStep2 = formData.name && formData.email && formData.phone;

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  // Don't render on server
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/60"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="relative w-full max-w-lg bg-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="font-display text-xl text-ink">Reserve a Table</h2>
                {!isSubmitted && (
                  <p className="text-sm text-neutral-500">Step {step} of 2</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-sand-100 transition-colors rounded-lg"
                aria-label="Close"
              >
                <X size={20} className="text-neutral-500" />
              </button>
            </div>

            {isSubmitted ? (
              /* Success State */
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-shell/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-shell" />
                </div>
                <h3 className="font-display text-2xl text-ink mb-3">Reservation Received</h3>
                <p className="text-neutral-600 mb-6">
                  Thank you, {formData.name}! We've received your reservation request for{" "}
                  <strong>{formData.guests} guests</strong> on{" "}
                  <strong>{new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</strong>{" "}
                  at <strong>{formData.time}</strong>.
                </p>
                <p className="text-sm text-neutral-500 mb-8">
                  We'll send a confirmation to {formData.email} within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {step === 1 ? (
                  /* Step 1: Date, Time, Guests */
                  <div className="p-6 space-y-6">
                    {/* Date */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-3">
                        <Calendar size={16} className="text-shell" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-200 text-ink focus:border-shell focus:outline-none"
                        required
                      />
                    </div>

                    {/* Meal Type */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-3">
                        <Clock size={16} className="text-shell" />
                        Lunch or Dinner?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mealType: "lunch", time: "" })}
                          className={cn(
                            "px-4 py-3 border text-sm font-medium transition-colors",
                            formData.mealType === "lunch"
                              ? "border-shell bg-shell/10 text-shell"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          )}
                        >
                          Lunch
                          <span className="block text-xs font-normal mt-1 opacity-70">12:00 – 14:30</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, mealType: "dinner", time: "" })}
                          className={cn(
                            "px-4 py-3 border text-sm font-medium transition-colors",
                            formData.mealType === "dinner"
                              ? "border-shell bg-shell/10 text-shell"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          )}
                        >
                          Dinner
                          <span className="block text-xs font-normal mt-1 opacity-70">18:00 – 22:00</span>
                        </button>
                      </div>
                    </div>

                    {/* Time Slots */}
                    {formData.mealType && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="text-sm font-medium text-ink mb-3 block">
                          Select Time
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots[formData.mealType].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, time })}
                              className={cn(
                                "px-4 py-2 border text-sm transition-colors",
                                formData.time === time
                                  ? "border-shell bg-shell text-white"
                                  : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Guests */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-3">
                        <Users size={16} className="text-shell" />
                        Number of Guests
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {guestOptions.map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setFormData({ ...formData, guests: num })}
                            className={cn(
                              "w-12 h-12 border text-sm font-medium transition-colors",
                              formData.guests === num
                                ? "border-shell bg-shell text-white"
                                : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                            )}
                          >
                            {num}
                          </button>
                        ))}
                        <span className="flex items-center text-sm text-neutral-500 ml-2">
                          {formData.guests > 6 ? "Large group" : "guests"}
                        </span>
                      </div>
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className={cn(
                        "w-full py-4 text-sm tracking-wide uppercase transition-colors",
                        canProceedStep1
                          ? "bg-navy text-white hover:bg-navy-600"
                          : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      )}
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  /* Step 2: Contact Details */
                  <div className="p-6 space-y-5">
                    {/* Summary */}
                    <div className="p-4 bg-sand-50 border-l-2 border-shell">
                      <p className="text-sm text-neutral-600">
                        <strong>{formData.guests} guests</strong> · {formData.mealType === "lunch" ? "Lunch" : "Dinner"} at <strong>{formData.time}</strong>
                        <br />
                        {new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-2">
                        <User size={16} className="text-shell" />
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-neutral-200 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-2">
                        <Mail size={16} className="text-shell" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-neutral-200 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-2">
                        <Phone size={16} className="text-shell" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+31 6 12345678"
                        className="w-full px-4 py-3 border border-neutral-200 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        required
                      />
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-ink mb-2">
                        <MessageSquare size={16} className="text-shell" />
                        Special Requests
                        <span className="text-neutral-400 font-normal">(optional)</span>
                      </label>
                      <textarea
                        value={formData.requests}
                        onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                        placeholder="Dietary requirements, special occasion, seating preferences..."
                        rows={3}
                        className="w-full px-4 py-3 border border-neutral-200 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none resize-none"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors text-sm tracking-wide uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!canProceedStep2}
                        className={cn(
                          "flex-1 py-4 text-sm tracking-wide uppercase transition-colors",
                          canProceedStep2
                            ? "bg-navy text-white hover:bg-navy-600"
                            : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                        )}
                      >
                        Confirm Reservation
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
