"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Calendar, Users, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { fadeInUp, defaultViewport } from "@/lib/motion";

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  type?: "meeting" | "wedding" | "event" | "general";
  onSubmit?: (data: LeadFormData) => void;
  className?: string;
}

export interface LeadFormData {
  type: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  eventDate?: string;
  guestCount?: number;
  message: string;
}

type FormField = "company" | "eventDate" | "guestCount";

const formTypes: Record<string, { title: string; subtitle: string; fields: FormField[] }> = {
  meeting: {
    title: "Request a Meeting Proposal",
    subtitle: "Tell us about your meeting requirements",
    fields: ["company", "eventDate", "guestCount"],
  },
  wedding: {
    title: "Plan Your Dream Wedding",
    subtitle: "Let us help create your perfect day",
    fields: ["eventDate", "guestCount"],
  },
  event: {
    title: "Host Your Event",
    subtitle: "From corporate gatherings to private celebrations",
    fields: ["company", "eventDate", "guestCount"],
  },
  general: {
    title: "Get in Touch",
    subtitle: "We'd love to hear from you",
    fields: [],
  },
};

export function LeadForm({
  title,
  subtitle,
  type = "general",
  onSubmit,
  className,
}: LeadFormProps) {
  const config = formTypes[type];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    type,
    name: "",
    email: "",
    phone: "",
    company: "",
    eventDate: "",
    guestCount: undefined,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className={cn("py-section-md bg-neutral", className)}
      >
        <div className="px-gutter max-w-content-sm mx-auto text-center">
          <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-display text-display-md text-ink mb-4">
            Thank You!
          </h2>
          <p className="text-ink-600 text-body-lg mb-8">
            We've received your inquiry and will get back to you within 24 hours.
          </p>
          <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
            Submit Another Inquiry
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
      className={cn("py-section-md bg-neutral", className)}
    >
      <div className="px-gutter max-w-content-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-display-lg text-ink mb-4">
            {title || config.title}
          </h2>
          <p className="text-ink-600 text-body-lg">
            {subtitle || config.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-sand-100 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-ink-700 text-body-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-ink-700 text-body-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-ink-700 text-body-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+31..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
              />
            </div>

            {/* Company (conditional) */}
            {config.fields.includes("company") && (
              <div>
                <label className="block text-ink-700 text-body-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
                />
              </div>
            )}

            {/* Event Date (conditional) */}
            {config.fields.includes("eventDate") && (
              <div>
                <label className="flex items-center gap-2 text-ink-700 text-body-sm font-medium mb-2">
                  <Calendar className="w-4 h-4 text-shell" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
                />
              </div>
            )}

            {/* Guest Count (conditional) */}
            {config.fields.includes("guestCount") && (
              <div>
                <label className="block text-ink-700 text-body-sm font-medium mb-2">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                  <input
                    type="number"
                    min="1"
                    placeholder="Estimated guests"
                    value={formData.guestCount || ""}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="mt-6">
            <label className="block text-ink-700 text-body-sm font-medium mb-2">
              Your Message *
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-ink-400" />
              <textarea
                required
                rows={4}
                placeholder="Tell us about your requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-neutral border border-sand-400 rounded-lg text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <Button variant="primary" size="lg" fullWidth type="submit">
              <Send className="w-4 h-4 mr-2" />
              Send Inquiry
            </Button>
            <p className="text-center text-ink-500 text-body-sm mt-4">
              We typically respond within 24 hours
            </p>
          </div>
        </form>
      </div>
    </motion.section>
  );
}
