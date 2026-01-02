"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Clock,
  CreditCard,
  Calendar,
  Dog,
  Utensils,
  Sparkles,
  AlertCircle,
  Check,
  X,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo, duration } from "@/lib/motion";
import { generateFAQSchema, toJsonLd } from "@/lib/seo";
import { useReducedMotion, useArrowNavigation } from "@/lib/accessibility";

// Types
type PolicyCategory =
  | "booking"
  | "stay"
  | "wellness"
  | "restaurant"
  | "pets"
  | "cancellation"
  | "payment";

interface PolicyRule {
  label: string;
  value?: string;
  allowed?: boolean;
  note?: string;
}

interface PolicySection {
  title: string;
  rules: PolicyRule[];
}

interface Policy {
  id: string;
  category: PolicyCategory;
  title: string;
  icon: React.ReactNode;
  summary: string;
  sections: PolicySection[];
  lastUpdated?: string;
}

// Category Icons
const categoryIcons: Record<PolicyCategory, React.ReactNode> = {
  booking: <Calendar className="w-5 h-5" />,
  stay: <Clock className="w-5 h-5" />,
  wellness: <Sparkles className="w-5 h-5" />,
  restaurant: <Utensils className="w-5 h-5" />,
  pets: <Dog className="w-5 h-5" />,
  cancellation: <AlertCircle className="w-5 h-5" />,
  payment: <CreditCard className="w-5 h-5" />,
};

// Sample Policies Data
const defaultPolicies: Policy[] = [
  {
    id: "check-in-out",
    category: "stay",
    title: "Check-in & Check-out",
    icon: <Clock className="w-5 h-5" />,
    summary: "Flexible check-in from 3 PM, check-out by 11 AM",
    sections: [
      {
        title: "Standard Times",
        rules: [
          { label: "Check-in", value: "From 3:00 PM" },
          { label: "Check-out", value: "By 11:00 AM" },
          { label: "24-hour reception", allowed: true },
          { label: "Luggage storage", allowed: true, note: "Complimentary" },
        ],
      },
      {
        title: "Early/Late Options",
        rules: [
          {
            label: "Early check-in (from 12 PM)",
            value: "€50",
            note: "Subject to availability",
          },
          {
            label: "Late check-out (until 2 PM)",
            value: "€50",
            note: "Subject to availability",
          },
          {
            label: "Late check-out (until 6 PM)",
            value: "€100",
            note: "Subject to availability",
          },
          {
            label: "Guaranteed late checkout",
            value: "Included with direct booking",
            allowed: true,
          },
        ],
      },
    ],
    lastUpdated: "2025-01-01",
  },
  {
    id: "cancellation",
    category: "cancellation",
    title: "Cancellation Policy",
    icon: <AlertCircle className="w-5 h-5" />,
    summary: "Free cancellation up to 48 hours before arrival",
    sections: [
      {
        title: "Standard Rate Bookings",
        rules: [
          {
            label: "Free cancellation",
            value: "Up to 48 hours before arrival",
            allowed: true,
          },
          {
            label: "Late cancellation (within 48h)",
            value: "First night charged",
          },
          { label: "No-show", value: "Full stay charged" },
        ],
      },
      {
        title: "Special Offers & Packages",
        rules: [
          {
            label: "Early Bird rates",
            value: "Non-refundable",
            allowed: false,
          },
          {
            label: "Package deals",
            value: "50% refund if cancelled 7+ days before",
          },
          {
            label: "Peak season (Jul-Aug)",
            value: "14-day cancellation notice required",
          },
        ],
      },
      {
        title: "Modifications",
        rules: [
          {
            label: "Date changes",
            value: "Free up to 7 days before",
            allowed: true,
          },
          {
            label: "Room upgrades",
            value: "Subject to availability and rate difference",
          },
        ],
      },
    ],
    lastUpdated: "2025-01-01",
  },
  {
    id: "pets",
    category: "pets",
    title: "Pet Policy",
    icon: <Dog className="w-5 h-5" />,
    summary: "Well-behaved dogs welcome in select rooms",
    sections: [
      {
        title: "General Policy",
        rules: [
          { label: "Dogs allowed", allowed: true, note: "Max 2 per room" },
          { label: "Cats allowed", allowed: false },
          { label: "Other pets", allowed: false },
          { label: "Pet fee", value: "€25 per night per pet" },
        ],
      },
      {
        title: "Pet-Friendly Rooms",
        rules: [
          { label: "Garden Retreat rooms", allowed: true },
          { label: "Ground floor Sea View", allowed: true },
          { label: "Dune Suite", allowed: false, note: "Not available for pets" },
          { label: "Lighthouse Suite", allowed: false },
        ],
      },
      {
        title: "Guidelines",
        rules: [
          { label: "Pets in restaurant", allowed: false, note: "Terrace only" },
          { label: "Pets in spa", allowed: false },
          { label: "Pets on beach", allowed: true, note: "On leash, designated areas" },
          { label: "Pet sitting service", allowed: true, value: "€15/hour" },
        ],
      },
    ],
    lastUpdated: "2025-01-01",
  },
  {
    id: "payment",
    category: "payment",
    title: "Payment Options",
    icon: <CreditCard className="w-5 h-5" />,
    summary: "All major cards accepted, flexible payment options",
    sections: [
      {
        title: "Accepted Payment Methods",
        rules: [
          { label: "Visa / Mastercard", allowed: true },
          { label: "American Express", allowed: true },
          { label: "iDEAL", allowed: true, note: "Netherlands only" },
          { label: "Bank transfer", allowed: true, note: "For groups & events" },
          { label: "Cash", allowed: true, note: "EUR only" },
          { label: "Cryptocurrency", allowed: false },
        ],
      },
      {
        title: "Deposit & Payment Schedule",
        rules: [
          {
            label: "Booking deposit",
            value: "20% at time of booking",
          },
          {
            label: "Remaining balance",
            value: "Due at check-in",
          },
          {
            label: "Packages & special offers",
            value: "Full payment at booking",
          },
          {
            label: "Authorization hold",
            value: "€200 for incidentals",
            note: "Refunded within 5 business days",
          },
        ],
      },
    ],
    lastUpdated: "2025-01-01",
  },
];

// Single Policy Accordion Item
function PolicyAccordion({
  policy,
  isOpen,
  onToggle,
  index,
}: {
  policy: Policy;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const headerId = `policy-header-${policy.id}`;
  const panelId = `policy-panel-${policy.id}`;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <h3>
        <button
          id={headerId}
          onClick={onToggle}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-sand-50 transition-colors focus-visible-ring"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center text-navy" aria-hidden="true">
              {policy.icon}
            </div>
            <div>
              <span className="font-display text-lg text-ink block">{policy.title}</span>
              <span className="text-sm text-neutral-500">{policy.summary}</span>
            </div>
          </div>
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5 text-neutral-400" />
          </motion.div>
        </button>
      </h3>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: easeOutExpo }}
          >
            <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
              {policy.sections.map((section, sIndex) => (
                <div
                  key={section.title}
                  className={cn("py-4", sIndex > 0 && "border-t border-neutral-100")}
                >
                  <h4 className="text-sm font-medium text-ink mb-4 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <div className="space-y-3">
                    {section.rules.map((rule, rIndex) => (
                      <PolicyRuleRow key={rIndex} rule={rule} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Last Updated */}
              {policy.lastUpdated && (
                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-400">
                  <Info className="w-3 h-3" />
                  Last updated:{" "}
                  {new Date(policy.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Policy Rule Row Component
function PolicyRuleRow({ rule }: { rule: PolicyRule }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        {rule.allowed !== undefined && (
          <div
            className={cn(
              "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              rule.allowed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
            )}
          >
            {rule.allowed ? (
              <Check className="w-3 h-3" />
            ) : (
              <X className="w-3 h-3" />
            )}
          </div>
        )}

        <div>
          <span className="text-neutral-700">{rule.label}</span>
          {rule.note && (
            <span className="block text-xs text-neutral-400 mt-0.5">
              {rule.note}
            </span>
          )}
        </div>
      </div>

      {rule.value && (
        <span className="text-right text-sm font-medium text-navy">
          {rule.value}
        </span>
      )}
    </div>
  );
}

// Table View Component
function PolicyTable({ policy }: { policy: Policy }) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-sand-50 border-b border-neutral-200">
        <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center text-white">
          {policy.icon}
        </div>
        <div>
          <h3 className="font-display text-xl text-ink">{policy.title}</h3>
          <p className="text-sm text-neutral-500">{policy.summary}</p>
        </div>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-neutral-100">
        {policy.sections.map((section) => (
          <div key={section.title} className="p-6">
            <h4 className="text-sm font-medium text-shell mb-4 uppercase tracking-wider">
              {section.title}
            </h4>
            <table className="w-full">
              <tbody className="divide-y divide-neutral-100">
                {section.rules.map((rule, index) => (
                  <tr key={index} className="group">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        {rule.allowed !== undefined && (
                          <span
                            className={cn(
                              "w-2 h-2 rounded-full flex-shrink-0",
                              rule.allowed ? "bg-green-500" : "bg-red-400"
                            )}
                          />
                        )}
                        <span className="text-neutral-700">{rule.label}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium text-navy">
                      {rule.value || (rule.allowed ? "Yes" : "No")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main PolicyBlock Component
interface PolicyBlockProps {
  policies?: Policy[];
  category?: PolicyCategory;
  layout?: "accordion" | "table" | "compact";
  title?: string;
  description?: string;
  className?: string;
}

export function PolicyBlock({
  policies = defaultPolicies,
  category,
  layout = "accordion",
  title = "Hotel Policies",
  description = "Everything you need to know for a comfortable stay",
  className,
}: PolicyBlockProps) {
  const [openPolicies, setOpenPolicies] = useState<string[]>([]);

  // Filter by category if specified
  const displayPolicies = category
    ? policies.filter((p) => p.category === category)
    : policies;

  const togglePolicy = (id: string) => {
    setOpenPolicies((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Generate FAQ schema from policies
  const faqItems = displayPolicies.map((policy) => ({
    question: policy.title,
    answer: policy.summary + ". " + policy.sections.map(s =>
      s.rules.map(r => r.label + (r.value ? `: ${r.value}` : "")).join(". ")
    ).join(" "),
  }));
  const faqSchema = generateFAQSchema(faqItems);

  return (
    <section className={cn("py-section-md", className)}>
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />
      <div className="px-gutter max-w-content-lg mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="font-display text-display-md text-ink mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-body-lg text-neutral-600">{description}</p>
            )}
          </div>
        )}

        {/* Policies */}
        <div className="space-y-4" role="group" aria-label="Hotel policies accordion">
          {displayPolicies.map((policy, index) =>
            layout === "accordion" ? (
              <PolicyAccordion
                key={policy.id}
                policy={policy}
                isOpen={openPolicies.includes(policy.id)}
                onToggle={() => togglePolicy(policy.id)}
                index={index}
              />
            ) : layout === "table" ? (
              <PolicyTable key={policy.id} policy={policy} />
            ) : (
              // Compact layout - just summary
              <div
                key={policy.id}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-neutral-200"
              >
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy">
                  {policy.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-ink">{policy.title}</h3>
                  <p className="text-sm text-neutral-500">{policy.summary}</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-500 mb-4">
            Have questions about our policies?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-navy hover:text-shell transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>Contact our team</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export type { Policy, PolicySection, PolicyRule, PolicyCategory };
