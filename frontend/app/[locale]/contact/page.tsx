"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/organisms";
import { BreadcrumbsInline } from "@/components/molecules";
import { SectionHeroCompact, SectionBlend } from "@/components/sections";
import { SectionDivider } from "@/components/ui";
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
  const t = useTranslations("contact");
  const tNav = useTranslations("nav");
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
      <main>
        {/* Hero */}
        <SectionHeroCompact
          label={t("heroLabel")}
          title={t("heroTitle")}
          description={t("heroDescription")}
        />

        {/* Quick Info Strip */}
        <section className="neo-bar">
          <div className="px-4 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 md:gap-8 text-xs md:text-sm py-3 md:py-4 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                <Clock size={14} className="text-shell" />
                <span className="hidden sm:inline text-neutral-500">{t("reception")}</span>
                <span className="text-ink font-medium whitespace-nowrap">24h</span>
              </div>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 md:gap-2 flex-shrink-0 hover:text-shell transition-colors">
                <Phone size={14} className="text-shell" />
                <span className="text-ink font-medium whitespace-nowrap">{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1.5 md:gap-2 flex-shrink-0 hover:text-shell transition-colors">
                <Mail size={14} className="text-shell" />
                <span className="text-ink font-medium whitespace-nowrap hidden sm:inline">{contactInfo.email}</span>
                <span className="text-ink font-medium whitespace-nowrap sm:hidden">Email</span>
              </a>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b border-neutral-100">
          <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
            <BreadcrumbsInline items={[{ label: tNav("contact") }]} />
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
                    {t("findUs")}
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
                    {t("getDirections")}
                  </a>
                </div>

                {/* Contact */}
                <div className="mb-8">
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-shell" />
                    {t("contactUs")}
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
                  <h4 className="font-medium text-ink mb-2">{t("parking.title")}</h4>
                  <p className="text-sm text-neutral-600">{t("parking.description")}</p>
                </div>

                {/* Opening Hours */}
                <div className="bg-sand-100 p-6">
                  <h3 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-shell" />
                    {t("openingHours")}
                  </h3>
                  <div className="space-y-2 text-neutral-600">
                    <div className="flex justify-between">
                      <span>{t("reception")}</span>
                      <span>{openingHours.reception}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("restaurant")}</span>
                      <span>{openingHours.restaurant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("spa")}</span>
                      <span>{t("byAppointment")}</span>
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
                    <h3 className="font-display text-xl text-ink mb-2">{t("success.title")}</h3>
                    <p className="text-neutral-600 mb-6">
                      {t("success.description")}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 border border-navy text-navy text-sm hover:bg-navy hover:text-white transition-colors"
                    >
                      {t("success.sendAnother")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-sand-100 p-8">
                    <h3 className="font-display text-xl text-ink mb-6">{t("form.title")}</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">{t("form.name")}</label>
                        <input
                          type="text"
                          required
                          placeholder={t("form.namePlaceholder")}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">{t("form.email")}</label>
                        <input
                          type="email"
                          required
                          placeholder={t("form.emailPlaceholder")}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink placeholder:text-neutral-400 focus:border-shell focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">{t("form.subject")}</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-sand-300 text-ink focus:border-shell focus:outline-none"
                        >
                          <option value="">{t("form.selectTopic")}</option>
                          <option value="reservation">{t("form.topics.reservation")}</option>
                          <option value="spa">{t("form.topics.spa")}</option>
                          <option value="restaurant">{t("form.topics.restaurant")}</option>
                          <option value="events">{t("form.topics.events")}</option>
                          <option value="feedback">{t("form.topics.feedback")}</option>
                          <option value="other">{t("form.topics.other")}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-ink text-sm font-medium mb-2">{t("form.message")}</label>
                        <textarea
                          required
                          rows={5}
                          placeholder={t("form.messagePlaceholder")}
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
                        {t("form.send")}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        <SectionBlend from="white" to="sand-100" />

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
                {t("directions.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                {t("directions.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="text-center"
              >
                <div className="neo-icon neo-icon-lg mx-auto mb-4">
                  <Car className="w-6 h-6 text-shell" />
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{t("directions.byCar.title")}</h3>
                <p className="text-neutral-600">{t("directions.byCar.description")}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="neo-icon neo-icon-lg mx-auto mb-4">
                  <Ship className="w-6 h-6 text-shell" />
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{t("directions.byFerry.title")}</h3>
                <p className="text-neutral-600">{t("directions.byFerry.description")}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="neo-icon neo-icon-lg mx-auto mb-4">
                  <Navigation className="w-6 h-6 text-shell" />
                </div>
                <h3 className="font-display text-xl text-ink mb-2">{t("directions.publicTransport.title")}</h3>
                <p className="text-neutral-600">{t("directions.publicTransport.description")}</p>
              </motion.div>
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
