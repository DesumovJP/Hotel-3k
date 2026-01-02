"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Flame, Snowflake, Sun, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/motion";

type Season = "spring" | "summer" | "autumn" | "winter" | "all";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  season: Season;
  pairing?: string;
  isSignature?: boolean;
  image?: string;
}

interface SeasonalMenuProps {
  title?: string;
  subtitle?: string;
  items: MenuItem[];
  currentSeason?: Season;
  pdfUrl?: string;
  onReserve?: () => void;
  className?: string;
}

const seasonIcons: Record<Season, React.FC<{ className?: string }>> = {
  spring: Leaf,
  summer: Sun,
  autumn: Flame,
  winter: Snowflake,
  all: Leaf,
};

const seasonColors: Record<Season, string> = {
  spring: "text-green-500",
  summer: "text-amber-500",
  autumn: "text-orange-500",
  winter: "text-blue-400",
  all: "text-gold",
};

const seasonLabels: Record<Season, string> = {
  spring: "Spring Menu",
  summer: "Summer Menu",
  autumn: "Autumn Menu",
  winter: "Winter Menu",
  all: "Year-Round",
};

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group flex gap-4 py-4 border-b border-sand-300 last:border-0"
    >
      {/* Image (if available) */}
      {item.image && (
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-display text-ink group-hover:text-gold transition-colors flex items-center gap-2">
              {item.name}
              {item.isSignature && (
                <span className="text-xs bg-gold text-white px-2 py-0.5 rounded">Chef's Choice</span>
              )}
            </h4>
            <p className="text-ink-500 text-body-sm mt-1 line-clamp-2">{item.description}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-shrink-0">
            <span className="border-b border-dotted border-ink-200 w-8" />
            <span className="font-display text-ink">€{item.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Tags & Pairing */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-sand-200 text-ink-600 rounded"
            >
              {tag}
            </span>
          ))}
          {item.pairing && (
            <span className="text-xs text-ink-400 italic">
              Pairs with: {item.pairing}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function SeasonalMenu({
  title = "Seasonal Menu",
  subtitle,
  items,
  currentSeason = "all",
  pdfUrl,
  onReserve,
  className,
}: SeasonalMenuProps) {
  const [activeSeason, setActiveSeason] = useState<Season>(currentSeason);

  // Group items by category
  const categories = [...new Set(items.map((i) => i.category))];
  const filteredItems =
    activeSeason === "all"
      ? items
      : items.filter((i) => i.season === activeSeason || i.season === "all");

  const SeasonIcon = seasonIcons[activeSeason];

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
            <div className="flex items-center justify-center gap-3 mb-4">
              <SeasonIcon className={cn("w-8 h-8", seasonColors[activeSeason])} />
              <h2 className="font-display text-display-lg text-ink">{title}</h2>
            </div>
            {subtitle && (
              <p className="text-ink-600 text-body-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.header>

          {/* Season tabs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-12">
            {(["all", "spring", "summer", "autumn", "winter"] as Season[]).map((season) => {
              const Icon = seasonIcons[season];
              return (
                <button
                  key={season}
                  onClick={() => setActiveSeason(season)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-body-sm transition-colors min-h-[44px]",
                    activeSeason === season
                      ? "bg-deepsea text-neutral"
                      : "bg-sand-200 text-ink-700 hover:bg-sand-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {seasonLabels[season]}
                </button>
              );
            })}
          </motion.div>

          {/* Menu content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeason}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {categories.map((category) => {
                const categoryItems = filteredItems.filter((i) => i.category === category);
                if (categoryItems.length === 0) return null;

                return (
                  <div key={category} className="mb-12 last:mb-0">
                    <h3 className="font-display text-display-sm text-ink mb-6 pb-2 border-b-2 border-gold">
                      {category}
                    </h3>
                    <div>
                      {categoryItems.map((item) => (
                        <MenuItemRow key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            {pdfUrl && (
              <motion.a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-light tracking-[0.15em] uppercase transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shell focus-visible:ring-offset-2 bg-transparent border border-navy text-navy hover:bg-navy hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Menu
              </motion.a>
            )}
            <Button variant="primary" onClick={onReserve}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Make a Reservation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Default menu items
export const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Texel Lamb Rack",
    description: "Herb-crusted local lamb with rosemary jus, seasonal vegetables",
    price: 38.50,
    category: "Mains",
    tags: ["local", "signature"],
    season: "all",
    pairing: "Château Margaux 2018",
    isSignature: true,
  },
  {
    id: 2,
    name: "Wadden Oysters",
    description: "Six freshly shucked Wadden Sea oysters with mignonette",
    price: 24.00,
    category: "Starters",
    tags: ["seafood", "local"],
    season: "autumn",
    pairing: "Champagne Brut",
    isSignature: true,
  },
  {
    id: 3,
    name: "North Sea Catch",
    description: "Daily fresh fish with citrus butter and samphire",
    price: 32.00,
    category: "Mains",
    tags: ["seafood"],
    season: "all",
    pairing: "Chablis Premier Cru",
  },
  {
    id: 4,
    name: "Garden Risotto",
    description: "Creamy arborio with seasonal vegetables and truffle oil",
    price: 26.50,
    category: "Mains",
    tags: ["vegetarian"],
    season: "spring",
  },
  {
    id: 5,
    name: "Chocolate Fondant",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 14.00,
    category: "Desserts",
    tags: ["vegetarian"],
    season: "all",
  },
];
