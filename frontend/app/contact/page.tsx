"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header, Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionHeroCompact } from "@/components/sections";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Car,
  Ship,
  Plane,
  Send,
  Check,
} from "lucide-react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Contact info
const contactInfo = {
  address: "Ruijslaan 22",
  city: "De Koog",
  postalCode: "1796 AD",
  country: "Texel, Netherlands",
  phone: "+31 222 317 445",
  email: "info@opduin.nl",
  coordinates: { lat: 53.0928, lng: 4.7583 },
};

const openingHours = {
  reception: "24 hours",
  restaurant: "12:00 - 22:00",
  spa: "By appointment",
};

const directions = [
  {
    mode: "car" as const,
    icon: Car,
    title: "By Car",
    description: "From western/southern Netherlands via Amsterdam ringroad (A10), through Zaandam, Purmerend, Hoorn to Den Helder. From east via Afsluitdijk (A7).",
  },
  {
    mode: "ferry" as const,
    icon: Ship,
    title: "By Ferry",
    description: "TESO ferry leaves from Den Helder every hour (on the half hour). 20 minute crossing, no reservation needed.",
  },
  {
    mode: "bus" as const,
    icon: Navigation,
    title: "Public Transport",
    description: "Bus 33 takes you to the ferry from Den Helder station. On Texel, bus 28 takes you from the ferry to Opduin.",
  },
];

const parkingInfo = {
  title: "Free Parking",
  description: "Parking on Opduin's own parking lot is free of charge. For island-wide parking you need to purchase a Texel vignet online.",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`;

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <SectionHeroCompact
          label="Contact"
          title="Get in Touch"
          description="We're here to help you plan your perfect stay on Texel."
        />

        {/* Quick Info Strip */}
        <section className="bg-navy text-white py-4 border-t border-white/10">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-shell" />
                <span>Reception 24h</span>
              </div>
              <span className="hidden md:block text-white/30">|</span>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-shell transition-colors">
                <Phone size={16} className="text-shell" />
                <span>{contactInfo.phone}</span>
              </a>
              <span className="hidden md:block text-white/30">|</span>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-shell transition-colors">
                <Mail size={16} className="text-shell" />
                <span>{contactInfo.email}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: "Contact" }]} />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-20 bg-white">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
              >
                {/* Address */}
                <div className="mb-8">
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-shell" />
                    Find Us
                  </h3>
                  <address className="not-italic text-neutral-600 mb-4">
                    {contactInfo.address}<br />
                    {contactInfo.postalCode} {contactInfo.city}<br />
                    {contactInfo.country}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-shell hover:text-navy font-medium transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>

                {/* Contact */}
                <div className="mb-8">
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-shell" />
                    Contact Us
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-neutral-600 hover:text-navy transition-colors"
                    >
                      <Phone className="w-4 h-4 text-shell" />
                      {contactInfo.phone}
                    </a>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 text-neutral-600 hover:text-navy transition-colors"
                    >
                      <Mail className="w-4 h-4 text-shell" />
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Parking */}
                <div className="mb-8 p-4 bg-sand-50 border-l-2 border-shell">
                  <h4 className="font-medium text-ink mb-2">{parkingInfo.title}</h4>
                  <p className="text-sm text-neutral-600">{parkingInfo.description}</p>
                </div>

                {/* Opening Hours */}
                <div className="bg-sand-100 p-6">
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-shell" />
                    Opening Hours
                  </h3>
                  <div className="space-y-2 text-neutral-600">
                    <div className="flex justify-between">
                      <span>Reception</span>
                      <span>{openingHours.reception}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Restaurant</span>
                      <span>{openingHours.restaurant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spa</span>
                      <span>{openingHours.spa}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo }}
              >
                {isSubmitted ? (
                  <div className="bg-sand-100 p-8 text-center">
                    <div className="w-16 h-16 bg-shell/10 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-shell" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-2">Message Sent</h3>
                    <p className="text-neutral-600 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 border border-navy text-navy text-sm hover:bg-navy hover:text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-sand-100 p-8">
                    <h3 className="font-display text-xl text-ink mb-6">Send us a Message</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">Subject</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink focus:border-shell focus:outline-none"
                        >
                          <option value="">Select a topic</option>
                          <option value="reservation">Reservation Inquiry</option>
                          <option value="spa">Spa & Wellness</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="events">Meetings & Events</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">Message</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-navy text-white hover:bg-navy-600 transition-colors text-sm tracking-wide uppercase"
                      >
                        <Send size={16} />
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* How to Get Here */}
        <section className="py-20 md:py-28 bg-sand-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="text-center mb-12"
            >
              <span className="text-overline text-shell tracking-widest mb-3 block">
                Directions
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                How to Get Here
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {directions.map((direction, index) => {
                const Icon = direction.icon;
                return (
                  <motion.div
                    key={direction.mode}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="neo-icon neo-icon-lg mx-auto mb-4">
                      <Icon className="w-6 h-6 text-shell" />
                    </div>
                    <h3 className="font-display text-xl text-ink mb-2">{direction.title}</h3>
                    <p className="text-neutral-600">{direction.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-[400px] md:h-[500px] relative">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2393.5!2d4.7583!3d53.0928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47cf49a7ac3d11d3%3A0x7b3c5c3d5e4f6789!2sGrand%20Hotel%20Opduin!5e0!3m2!1sen!2snl!4v1234567890`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hotel Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
