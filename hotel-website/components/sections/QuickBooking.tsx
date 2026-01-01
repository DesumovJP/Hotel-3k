"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/atoms";
import { fadeInUp, defaultViewport, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function QuickBooking() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <section className="py-10 md:py-12 bg-[#212B36] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />

      <div className="px-6 md:px-12 lg:px-24 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="max-w-5xl mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-end">
              {/* Check-in */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
              >
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-3">
                  Check-in
                </label>
                <div className="relative group">
                  <Calendar
                    size={18}
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                      focusedField === "checkIn" ? "text-[var(--color-sea)]" : "text-[var(--color-slate)]"
                    )}
                  />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    onFocus={() => setFocusedField("checkIn")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-white text-[var(--color-ink)]",
                      "border-2 border-transparent outline-none transition-all duration-300",
                      "focus:border-[var(--color-sea)] focus:shadow-lg focus:shadow-[var(--color-sea)]/10"
                    )}
                    required
                  />
                </div>
              </motion.div>

              {/* Check-out */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
              >
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-3">
                  Check-out
                </label>
                <div className="relative group">
                  <Calendar
                    size={18}
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                      focusedField === "checkOut" ? "text-[var(--color-sea)]" : "text-[var(--color-slate)]"
                    )}
                  />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    onFocus={() => setFocusedField("checkOut")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-white text-[var(--color-ink)]",
                      "border-2 border-transparent outline-none transition-all duration-300",
                      "focus:border-[var(--color-sea)] focus:shadow-lg focus:shadow-[var(--color-sea)]/10"
                    )}
                    required
                  />
                </div>
              </motion.div>

              {/* Guests */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: easeOutExpo }}
              >
                <label className="block text-white/70 text-xs uppercase tracking-wider mb-3">
                  Guests
                </label>
                <div className="relative group">
                  <Users
                    size={18}
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                      focusedField === "guests" ? "text-[var(--color-sea)]" : "text-[var(--color-slate)]"
                    )}
                  />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    onFocus={() => setFocusedField("guests")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-white text-[var(--color-ink)]",
                      "border-2 border-transparent outline-none appearance-none cursor-pointer transition-all duration-300",
                      "focus:border-[var(--color-sea)] focus:shadow-lg focus:shadow-[var(--color-sea)]/10"
                    )}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: easeOutExpo }}
              >
                <Button
                  type="submit"
                  variant="light"
                  fullWidth
                  className="py-4 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Check Availability
                    <motion.div
                      className="inline-block"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: easeOutExpo }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </section>
  );
}
