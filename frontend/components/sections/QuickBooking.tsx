"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/atoms";
import { fadeInUp, defaultViewport, easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function QuickBooking() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  // Track scroll position to show/hide sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || stickyDismissed) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const shouldShow = rect.bottom < 0;
      setShowSticky(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyDismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const handleDismiss = () => {
    setStickyDismissed(true);
    setShowSticky(false);
  };

  return (
    <>
      {/* Original Inline Section */}
      <section ref={sectionRef} className="py-10 md:py-12 bg-[#212B36] relative overflow-hidden">
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
                  <label className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-3">
                    <Calendar size={14} />
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    onFocus={() => setFocusedField("checkIn")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "w-full px-4 py-4 bg-white text-[var(--color-ink)]",
                      "border-2 border-transparent outline-none transition-all duration-300",
                      "focus:border-[var(--color-sea)] focus:shadow-lg focus:shadow-[var(--color-sea)]/10"
                    )}
                    required
                  />
                </motion.div>

                {/* Check-out */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
                >
                  <label className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider mb-3">
                    <Calendar size={14} />
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    onFocus={() => setFocusedField("checkOut")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "w-full px-4 py-4 bg-white text-[var(--color-ink)]",
                      "border-2 border-transparent outline-none transition-all duration-300",
                      "focus:border-[var(--color-sea)] focus:shadow-lg focus:shadow-[var(--color-sea)]/10"
                    )}
                    required
                  />
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
                    variant="primary"
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

      {/* Sticky Booking Bar - same style as navbar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed top-[60px] md:top-[72px] left-0 right-0 z-40 bg-white border-b border-sand-200 shadow-sm"
          >
            <div className="px-4 md:px-8 lg:px-12 py-3">
              <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  {/* Check-in */}
                  <div className="flex-1 min-w-[140px]">
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      placeholder="Check-in"
                      className="w-full px-3 py-2.5 bg-sand-50 text-ink text-sm border border-sand-200 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                      required
                    />
                  </div>

                  {/* Check-out */}
                  <div className="flex-1 min-w-[140px]">
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      placeholder="Check-out"
                      className="w-full px-3 py-2.5 bg-sand-50 text-ink text-sm border border-sand-200 rounded outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                      required
                    />
                  </div>

                  {/* Guests */}
                  <div className="w-[120px]">
                    <div className="relative">
                      <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-3 py-2.5 bg-sand-50 text-ink text-sm border border-sand-200 rounded outline-none appearance-none cursor-pointer focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-6 py-2.5 text-sm whitespace-nowrap"
                  >
                    <span className="flex items-center gap-2">
                      Book Now
                      <ArrowRight size={14} />
                    </span>
                  </Button>

                  {/* Dismiss */}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="p-2 text-ink/40 hover:text-ink transition-colors"
                    aria-label="Close booking bar"
                  >
                    <X size={18} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
