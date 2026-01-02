"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

interface ContactInfo {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
}

interface OpeningHours {
  reception: string;
  restaurant: string;
  spa: string;
}

interface DirectionsStep {
  mode: "car" | "ferry" | "plane";
  title: string;
  description: string;
}

interface ContactSectionProps {
  contact: ContactInfo;
  openingHours?: OpeningHours;
  directions?: DirectionsStep[];
  showMap?: boolean;
  showForm?: boolean;
  className?: string;
}

const transportIcons = {
  car: Car,
  ferry: Ship,
  plane: Plane,
};

function ContactForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-sand-100 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-gold" />
        </div>
        <h3 className="font-display text-xl text-ink mb-2">Message Sent</h3>
        <p className="text-ink-600 mb-4">We'll get back to you soon.</p>
        <Button variant="secondary" size="sm" onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-sand-100 rounded-2xl p-8">
      <h3 className="font-display text-xl text-ink mb-6">Send us a Message</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-ink-700 text-body-sm font-medium mb-2">Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-ink-700 text-body-sm font-medium mb-2">Email</label>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-ink-700 text-body-sm font-medium mb-2">Subject</label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink focus:border-gold focus:outline-none min-h-[44px]"
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
          <label className="block text-ink-700 text-body-sm font-medium mb-2">Message</label>
          <textarea
            required
            rows={4}
            placeholder="How can we help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none resize-none"
          />
        </div>

        <Button variant="primary" size="lg" fullWidth type="submit">
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>
    </form>
  );
}

export function ContactSection({
  contact,
  openingHours,
  directions,
  showMap = true,
  showForm = true,
  className,
}: ContactSectionProps) {
  const fullAddress = `${contact.address}, ${contact.postalCode} ${contact.city}, ${contact.country}`;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${contact.coordinates.lat},${contact.coordinates.lng}`;

  return (
    <section className={cn("py-section-lg bg-neutral", className)}>
      <div className="px-gutter max-w-content-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-display-lg text-ink mb-4">Contact Us</h2>
            <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">
              We're here to help you plan your perfect stay. Reach out to us anytime.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={fadeInUp}>
              {/* Address Card */}
              <div className="bg-sand-100 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-lg text-ink mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Find Us
                </h3>
                <address className="not-italic text-ink-600 mb-4">
                  {contact.address}<br />
                  {contact.postalCode} {contact.city}<br />
                  {contact.country}
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-600 font-medium transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>
              </div>

              {/* Contact Details */}
              <div className="bg-sand-100 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-lg text-ink mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gold" />
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-ink-600 hover:text-gold transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {contact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-ink-600 hover:text-gold transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              {openingHours && (
                <div className="bg-sand-100 rounded-2xl p-6 mb-6">
                  <h3 className="font-display text-lg text-ink mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold" />
                    Opening Hours
                  </h3>
                  <div className="space-y-2 text-ink-600">
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
              )}

              {/* How to Get Here */}
              {directions && directions.length > 0 && (
                <div className="bg-deepsea rounded-2xl p-6">
                  <h3 className="font-display text-lg text-neutral mb-4">
                    How to Get Here
                  </h3>
                  <div className="space-y-4">
                    {directions.map((step, i) => {
                      const Icon = transportIcons[step.mode];
                      return (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-neutral font-medium">{step.title}</p>
                            <p className="text-neutral/70 text-sm">{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Form & Map */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {showForm && <ContactForm />}

              {showMap && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-sand-200">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d4.7583!3d${contact.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA0JzM0LjIiTiA0wrA0NScyOS45IkU!5e0!3m2!1sen!2snl!4v1234567890`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Location"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Default data
export const defaultContactInfo: ContactInfo = {
  address: "Ruijslaan 22",
  city: "De Koog",
  postalCode: "1796 AD",
  country: "Texel, Netherlands",
  phone: "+31 222 317 445",
  email: "hello@opduin.nl",
  coordinates: { lat: 53.0928, lng: 4.7583 },
};

export const defaultOpeningHours: OpeningHours = {
  reception: "24 hours",
  restaurant: "07:30 - 22:00",
  spa: "09:00 - 21:00",
};

export const defaultDirections: DirectionsStep[] = [
  {
    mode: "car",
    title: "By Car",
    description: "A4 to Den Helder, then ferry to Texel. 15 min drive from ferry terminal.",
  },
  {
    mode: "ferry",
    title: "By Ferry",
    description: "TESO ferry from Den Helder runs every hour. 20 minute crossing.",
  },
  {
    mode: "plane",
    title: "By Plane",
    description: "Nearest airports: Amsterdam Schiphol (1.5h) or Texel Airport (10min).",
  },
];
