"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { Heading, Text, Label, Button } from "@/components/atoms";
import { SplitText, MagneticWrapper } from "@/components/animations";
import { rooms } from "@/lib/data";
import { Calendar, Users, Minus, Plus, Check, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, defaultViewport, easeOutExpo } from "@/lib/motion";

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
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-sea)] flex items-center justify-center"
        >
          <Check size={32} className="text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Heading as="h2" className="mb-4">Request Received</Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Text muted className="mb-8">
            Thank you for your reservation request. Our team will review your details
            and confirm your booking within 24 hours via email.
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Text size="sm" muted className="mb-8">
            Confirmation will be sent to: {formData.email}
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <MagneticWrapper strength={0.15}>
            <Link href="/">
              <Button variant="secondary">
                Return Home
              </Button>
            </Link>
          </MagneticWrapper>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {[1, 2, 3].map((s, index) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: easeOutExpo }}
            className="flex items-center gap-4"
          >
            <motion.button
              type="button"
              onClick={() => s < step && setStep(s)}
              whileHover={s <= step ? { scale: 1.1 } : {}}
              whileTap={s <= step ? { scale: 0.95 } : {}}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step >= s
                  ? "bg-[var(--color-ink)] text-white"
                  : "bg-[var(--color-fog)] text-[var(--color-charcoal)]"
              )}
            >
              {step > s ? <Check size={16} /> : s}
            </motion.button>
            {s < 3 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className={cn(
                  "w-16 h-px origin-left",
                  step > s ? "bg-[var(--color-ink)]" : "bg-[var(--color-fog)]"
                )}
              />
            )}
          </motion.div>
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
              <Heading as="h3" className="mb-2">When are you visiting?</Heading>
              <Text muted>Select your dates and number of guests</Text>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2">Check-in</label>
                <input
                  type="date"
                  required
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2">Check-out</label>
                <input
                  type="date"
                  required
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors"
                />
              </motion.div>
            </div>

            <div className="space-y-4">
              {(["adults", "children"] as const).map((type, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-center justify-between py-4 border-b border-[var(--color-cloud)]"
                >
                  <div>
                    <Text className="font-medium capitalize">{type}</Text>
                    <Text size="xs" muted>
                      {type === "adults" ? "Ages 18+" : "Ages 0-17"}
                    </Text>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.button
                      type="button"
                      onClick={() => handleGuestChange(type, false)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border border-[var(--color-fog)] flex items-center justify-center hover:border-[var(--color-ink)] transition-colors"
                    >
                      <Minus size={16} />
                    </motion.button>
                    <Text className="w-8 text-center font-medium">{formData[type]}</Text>
                    <motion.button
                      type="button"
                      onClick={() => handleGuestChange(type, true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full border border-[var(--color-fog)] flex items-center justify-center hover:border-[var(--color-ink)] transition-colors"
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <MagneticWrapper strength={0.1}>
                <Button
                  type="button"
                  fullWidth
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!formData.checkIn || !formData.checkOut}
                >
                  Continue
                  <ArrowRight size={16} />
                </Button>
              </MagneticWrapper>
            </motion.div>
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
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <Heading as="h3" className="mb-2">Choose your room</Heading>
              <Text muted>Select from our available accommodations</Text>
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
                  whileHover={{ y: -4 }}
                  className={cn(
                    "text-left p-4 border transition-all",
                    formData.selectedRoom === room.slug
                      ? "border-[var(--color-ink)] bg-[var(--color-mist)]"
                      : "border-[var(--color-fog)] hover:border-[var(--color-stone)]"
                  )}
                >
                  <div className="relative aspect-[3/2] mb-4 overflow-hidden bg-[var(--color-cloud)]">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <AnimatePresence>
                      {formData.selectedRoom === room.slug && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--color-ink)] flex items-center justify-center"
                        >
                          <Check size={16} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Text className="font-medium">{room.name}</Text>
                      <Text size="sm" muted>{room.size} m² · Up to {room.maxGuests} guests</Text>
                    </div>
                    <Text className="font-medium">€{room.price}</Text>
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
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <MagneticWrapper strength={0.1} className="flex-1">
                <Button
                  type="button"
                  fullWidth
                  size="lg"
                  onClick={() => setStep(3)}
                  disabled={!formData.selectedRoom}
                >
                  Continue
                  <ArrowRight size={16} />
                </Button>
              </MagneticWrapper>
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
              <Heading as="h3" className="mb-2">Your details</Heading>
              <Text muted>Complete your reservation request</Text>
            </div>

            {/* Summary */}
            {selectedRoomData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-[var(--color-mist)] p-6 mb-8"
              >
                <Text size="sm" muted className="mb-4">Reservation Summary</Text>
                <div className="flex gap-4">
                  <div className="relative w-24 h-16 overflow-hidden bg-[var(--color-cloud)]">
                    <Image
                      src={selectedRoomData.image}
                      alt={selectedRoomData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Text className="font-medium">{selectedRoomData.name}</Text>
                    <Text size="sm" muted>
                      {formData.checkIn} → {formData.checkOut}
                    </Text>
                    <Text size="sm" muted>
                      {formData.adults} adults{formData.children > 0 && `, ${formData.children} children`}
                    </Text>
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
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2">Special Requests (optional)</label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-fog)] focus:border-[var(--color-sea)] outline-none transition-colors resize-none"
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
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <MagneticWrapper strength={0.1} className="flex-1">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                >
                  Submit Request
                </Button>
              </MagneticWrapper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Text size="xs" muted className="text-center mt-6">
                By submitting, you agree to our booking terms. Your card will not be charged until confirmation.
              </Text>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function BookPage() {
  return (
    <>
      <Header variant="dark" />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Label className="mb-4">Reservations</Label>
              </motion.div>
              <motion.div variants={fadeInUp} className="overflow-hidden">
                <Heading as="h1" className="mb-4">
                  <SplitText type="words" animation="fadeUp" staggerDelay={0.05}>
                    Book Your Stay
                  </SplitText>
                </Heading>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Text muted className="max-w-xl mx-auto">
                  Complete the form below to request a reservation. Our team will confirm availability
                  and send you a confirmation within 24 hours.
                </Text>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-12 md:py-16 bg-white">
          <div className="px-6 md:px-12 lg:px-24">
            <Suspense fallback={
              <div className="text-center py-12">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Loading...
                </motion.div>
              </div>
            }>
              <BookingForm />
            </Suspense>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 md:py-16 bg-[var(--color-mist)]">
          <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.div variants={fadeInUp}>
                <Heading as="h3" className="mb-4">Prefer to speak with us?</Heading>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Text muted>Our reservations team is available to assist you.</Text>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Phone, title: "Phone", content: "+31 (0)222 317 445", href: "tel:+31222317445" },
                { icon: Mail, title: "Email", content: "reservations@opduin.nl", href: "mailto:reservations@opduin.nl" },
                { icon: MapPin, title: "Address", content: "Ruijslaan 22, 1796 AD\nDe Koog, Texel", href: null },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: easeOutExpo }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon size={24} className="mx-auto mb-4 text-[var(--color-sea)]" />
                    </motion.div>
                    <Text className="font-medium mb-2">{item.title}</Text>
                    {item.href ? (
                      <a href={item.href} className="text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors">
                        {item.content}
                      </a>
                    ) : (
                      <Text size="sm" muted className="whitespace-pre-line">
                        {item.content}
                      </Text>
                    )}
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
