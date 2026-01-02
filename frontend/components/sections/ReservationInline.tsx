"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Phone, Mail, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { fadeInUp, defaultViewport } from "@/lib/motion";

interface ReservationInlineProps {
  title?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  openingHours?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  onSubmit?: (data: ReservationData) => void;
  className?: string;
}

interface ReservationData {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export function ReservationInline({
  title = "Make a Reservation",
  subtitle = "Join us for an unforgettable dining experience",
  phone = "+31 222 317 445",
  email = "restaurant@opduin.nl",
  openingHours = {
    breakfast: "07:30 - 10:30",
    lunch: "12:00 - 14:30",
    dinner: "18:00 - 22:00",
  },
  onSubmit,
  className,
}: ReservationInlineProps) {
  const [formData, setFormData] = useState<ReservationData>({
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setIsSubmitted(true);
  };

  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
  ];

  if (isSubmitted) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className={cn("py-section-md bg-deepsea text-neutral", className)}
      >
        <div className="px-gutter max-w-content-md mx-auto text-center">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-display-md text-neutral mb-4">
            Reservation Confirmed
          </h2>
          <p className="text-neutral/70 text-body-lg mb-8">
            Thank you for your reservation. We've sent a confirmation to {formData.email}.
            We look forward to welcoming you.
          </p>
          <Button
            variant="secondary"
            onClick={() => setIsSubmitted(false)}
          >
            Make Another Reservation
          </Button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeInUp}
      className={cn("py-section-md bg-deepsea text-neutral", className)}
    >
      <div className="px-gutter max-w-content-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display text-display-lg text-neutral mb-4">{title}</h2>
            <p className="text-neutral/70 text-body-lg mb-8">{subtitle}</p>

            {/* Opening Hours */}
            <div className="mb-8">
              <h3 className="text-gold text-overline uppercase tracking-widest mb-4">
                Opening Hours
              </h3>
              <div className="space-y-3">
                {openingHours.breakfast && (
                  <div className="flex justify-between text-neutral/80">
                    <span>Breakfast</span>
                    <span>{openingHours.breakfast}</span>
                  </div>
                )}
                {openingHours.lunch && (
                  <div className="flex justify-between text-neutral/80">
                    <span>Lunch</span>
                    <span>{openingHours.lunch}</span>
                  </div>
                )}
                {openingHours.dinner && (
                  <div className="flex justify-between text-neutral/80">
                    <span>Dinner</span>
                    <span>{openingHours.dinner}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-neutral/80 hover:text-gold transition-colors"
              >
                <Phone className="w-5 h-5" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-neutral/80 hover:text-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
                {email}
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-deepsea-700 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Date */}
              <div>
                <label className="block text-neutral/70 text-body-sm mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral focus:border-gold focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-neutral/70 text-body-sm mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral focus:border-gold focus:outline-none appearance-none min-h-[44px]"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="mb-4">
              <label className="block text-neutral/70 text-body-sm mb-2">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral focus:border-gold focus:outline-none appearance-none min-h-[44px]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                  <option value={9}>9+ (Please call)</option>
                </select>
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-neutral/70 text-body-sm mb-2">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral placeholder:text-neutral/40 focus:border-gold focus:outline-none min-h-[44px]"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-neutral/70 text-body-sm mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral placeholder:text-neutral/40 focus:border-gold focus:outline-none min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-neutral/70 text-body-sm mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+31..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral placeholder:text-neutral/40 focus:border-gold focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <label className="block text-neutral/70 text-body-sm mb-2">
                Special Requests (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Allergies, dietary requirements, special occasions..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-4 py-3 bg-deepsea-800 border border-deepsea-600 rounded-lg text-neutral placeholder:text-neutral/40 focus:border-gold focus:outline-none resize-none"
              />
            </div>

            <Button variant="primary" size="lg" fullWidth type="submit">
              Reserve Table
            </Button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}
