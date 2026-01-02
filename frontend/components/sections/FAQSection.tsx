"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  categories?: string[];
  showSearch?: boolean;
  className?: string;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-sand-300 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left min-h-[44px] group"
        aria-expanded={isOpen}
      >
        <span className="font-display text-ink text-lg group-hover:text-gold transition-colors pr-4">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className={cn("w-5 h-5", isOpen ? "text-gold" : "text-ink-400")} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-ink-600 text-body-md leading-relaxed prose prose-sm max-w-none">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection({
  title = "Frequently Asked Questions",
  subtitle,
  items,
  categories,
  showSearch = true,
  className,
}: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allCategories = categories || [...new Set(items.map((i) => i.category).filter(Boolean))];

  const filteredItems = items.filter((item) => {
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={cn("py-section-lg bg-neutral", className)}>
      <div className="px-gutter max-w-content-lg mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.header variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-display text-display-lg text-ink mb-4">{title}</h2>
            {subtitle && (
              <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.header>

          {/* Search */}
          {showSearch && (
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-sand-100 border border-sand-300 rounded-full text-ink placeholder:text-ink-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 min-h-[44px]"
                />
              </div>
            </motion.div>
          )}

          {/* Categories */}
          {allCategories.length > 0 && (
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-body-sm transition-colors min-h-[44px]",
                  !activeCategory
                    ? "bg-deepsea text-neutral"
                    : "bg-sand-200 text-ink-700 hover:bg-sand-300"
                )}
              >
                All Topics
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category as string)}
                  className={cn(
                    "px-4 py-2 rounded-full text-body-sm transition-colors min-h-[44px]",
                    activeCategory === category
                      ? "bg-deepsea text-neutral"
                      : "bg-sand-200 text-ink-700 hover:bg-sand-300"
                  )}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}

          {/* FAQ List */}
          <motion.div variants={fadeInUp} className="bg-sand-100 rounded-2xl p-6 md:p-8">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))
            ) : (
              <p className="text-center text-ink-500 py-8">
                No questions found matching your search.
              </p>
            )}
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <p className="text-ink-600 mb-4">Can't find what you're looking for?</p>
            <a
              href="/contact"
              className="inline-flex items-center text-gold hover:text-gold-600 font-medium transition-colors"
            >
              Contact us directly →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default FAQ items
export const defaultFAQItems: FAQItem[] = [
  {
    id: 1,
    question: "What time is check-in and check-out?",
    answer: "Check-in is from 15:00 and check-out is until 11:00. Early check-in and late check-out may be available upon request, subject to availability.",
    category: "Booking",
  },
  {
    id: 2,
    question: "Is parking available at the hotel?",
    answer: "Yes, we offer complimentary parking for all hotel guests. Electric vehicle charging stations are also available.",
    category: "Facilities",
  },
  {
    id: 3,
    question: "Are pets allowed?",
    answer: "Yes, we welcome well-behaved pets in selected room categories. There is a fee of €25 per pet per night. Please inform us when making your reservation.",
    category: "Policies",
  },
  {
    id: 4,
    question: "How do I get to Texel?",
    answer: "Texel is accessible by ferry from Den Helder. The crossing takes about 20 minutes and ferries run every hour. From the ferry terminal, the hotel is a 15-minute drive.",
    category: "Location",
  },
  {
    id: 5,
    question: "What's included in the room rate?",
    answer: "All room rates include breakfast buffet, WiFi, access to the wellness facilities, and parking. Some room categories include additional amenities.",
    category: "Booking",
  },
  {
    id: 6,
    question: "Can I cancel my reservation?",
    answer: "Our standard cancellation policy allows free cancellation up to 48 hours before arrival. Different conditions may apply for special offers.",
    category: "Policies",
  },
  {
    id: 7,
    question: "Is the spa included in my stay?",
    answer: "Yes, all hotel guests have complimentary access to our wellness facilities including the indoor pool, sauna, and steam room. Spa treatments can be booked separately.",
    category: "Facilities",
  },
  {
    id: 8,
    question: "Do you have facilities for children?",
    answer: "Absolutely! We offer family rooms, kids' menus in the restaurant, babysitting services, and can arrange family-friendly island activities.",
    category: "Facilities",
  },
];
