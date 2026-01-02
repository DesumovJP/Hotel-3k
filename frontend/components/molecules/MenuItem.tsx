"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Leaf,
  Fish,
  Flame,
  Award,
  Wine,
  Info,
  Heart,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { useReducedMotion } from "@/lib/accessibility";

// Types
type DietaryTag = "vegetarian" | "vegan" | "glutenFree" | "dairyFree" | "local" | "chefChoice" | "spicy" | "seafood";

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags: DietaryTag[];
  pairing?: string;
  season?: "spring" | "summer" | "autumn" | "winter" | "year-round";
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  featured?: boolean;
  new?: boolean;
}

interface MenuSection {
  id: string;
  title: string;
  description?: string;
  items: MenuItemType[];
}

// Tag Configuration
const tagConfig: Record<DietaryTag, { icon: React.ReactNode; label: string; color: string }> = {
  vegetarian: {
    icon: <Leaf className="w-3 h-3" />,
    label: "Vegetarian",
    color: "bg-green-100 text-green-700",
  },
  vegan: {
    icon: <Leaf className="w-3 h-3" />,
    label: "Vegan",
    color: "bg-green-100 text-green-700",
  },
  glutenFree: {
    icon: <span className="text-[10px] font-bold">GF</span>,
    label: "Gluten Free",
    color: "bg-amber-100 text-amber-700",
  },
  dairyFree: {
    icon: <span className="text-[10px] font-bold">DF</span>,
    label: "Dairy Free",
    color: "bg-blue-100 text-blue-700",
  },
  local: {
    icon: <Award className="w-3 h-3" />,
    label: "Local",
    color: "bg-shell/20 text-shell-700",
  },
  chefChoice: {
    icon: <Award className="w-3 h-3" />,
    label: "Chef's Choice",
    color: "bg-navy text-white",
  },
  spicy: {
    icon: <Flame className="w-3 h-3" />,
    label: "Spicy",
    color: "bg-red-100 text-red-700",
  },
  seafood: {
    icon: <Fish className="w-3 h-3" />,
    label: "Seafood",
    color: "bg-cyan-100 text-cyan-700",
  },
};

// Tag Badge Component
function TagBadge({ tag }: { tag: DietaryTag }) {
  const config = tagConfig[tag];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
        config.color
      )}
      title={config.label}
      role="img"
      aria-label={config.label}
    >
      <span aria-hidden="true">{config.icon}</span>
    </span>
  );
}

// Single Menu Item Component (Compact)
function MenuItemCompact({
  item,
  showImage = false,
}: {
  item: MenuItemType;
  showImage?: boolean;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const detailsId = `menu-item-details-${item.id}`;

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative py-4 border-b border-neutral-100 last:border-b-0",
        item.featured && "bg-sand-50 -mx-4 px-4 rounded-lg border-none mb-2"
      )}
      aria-labelledby={`menu-item-name-${item.id}`}
    >
      <div className="flex items-start gap-4">
        {/* Image (optional) */}
        {showImage && item.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <dl className="flex items-start justify-between gap-4">
            {/* Name & Tags */}
            <div className="flex-1">
              <dt className="flex items-center gap-2 flex-wrap">
                <span id={`menu-item-name-${item.id}`} className="font-display text-lg text-ink">{item.name}</span>
                {item.new && (
                  <span className="px-2 py-0.5 bg-shell text-ink text-xs font-medium rounded-full" aria-label="New item">
                    New
                  </span>
                )}
                {item.featured && (
                  <span className="px-2 py-0.5 bg-navy text-white text-xs font-medium rounded-full" aria-label="Featured item">
                    Featured
                  </span>
                )}
              </dt>

              {/* Tags */}
              {item.tags.length > 0 && (
                <dd className="flex gap-1 mt-1" aria-label={`Dietary info: ${item.tags.map(t => tagConfig[t].label).join(", ")}`}>
                  {item.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </dd>
              )}
            </div>

            {/* Price */}
            <dd className="text-right flex-shrink-0">
              <span className="font-display text-lg text-navy" aria-label={`Price: ${item.price.toFixed(2)} euros`}>
                €{item.price.toFixed(2)}
              </span>
            </dd>
          </dl>

          {/* Description */}
          <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
            {item.description}
          </p>

          {/* Wine Pairing */}
          {item.pairing && (
            <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
              <Wine className="w-3 h-3" aria-hidden="true" />
              <span>Pairs with: <span className="font-medium">{item.pairing}</span></span>
            </div>
          )}

          {/* Details Toggle */}
          {(item.ingredients || item.allergens) && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 mt-2 text-xs text-neutral-400 hover:text-navy transition-colors focus-visible-ring"
              aria-expanded={showDetails}
              aria-controls={detailsId}
            >
              <Info className="w-3 h-3" aria-hidden="true" />
              <span>Details</span>
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: showDetails ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                <ChevronDown className="w-3 h-3" />
              </motion.div>
            </button>
          )}

          {/* Expanded Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                id={detailsId}
                initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: easeOutExpo }}
                className="overflow-hidden"
              >
                <dl className="pt-3 mt-3 border-t border-neutral-100 text-xs space-y-2">
                  {item.ingredients && (
                    <div>
                      <dt className="font-medium text-neutral-700 inline">Ingredients: </dt>
                      <dd className="text-neutral-500 inline">{item.ingredients.join(", ")}</dd>
                    </div>
                  )}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="text-amber-600" role="alert">
                      <dt className="font-medium inline">
                        <AlertTriangle className="w-3 h-3 inline mr-1" aria-hidden="true" />
                        Allergens:
                      </dt>
                      <dd className="inline ml-1" aria-label={`Contains allergens: ${item.allergens.join(", ")}`}>
                        {item.allergens.join(", ")}
                      </dd>
                    </div>
                  )}
                  {item.calories && (
                    <div>
                      <dt className="sr-only">Calories</dt>
                      <dd className="text-neutral-400">{item.calories} kcal</dd>
                    </div>
                  )}
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

// Featured Menu Item (Large Card)
function MenuItemFeatured({ item }: { item: MenuItemType }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-elevation-2 hover:shadow-elevation-4 transition-shadow"
      aria-labelledby={`featured-item-${item.id}`}
    >
      {/* Image */}
      {item.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {item.new && (
              <span className="px-3 py-1 bg-shell text-ink text-xs font-medium rounded-full">
                New
              </span>
            )}
            {item.featured && (
              <span className="px-3 py-1 bg-navy text-white text-xs font-medium rounded-full flex items-center gap-1">
                <Award className="w-3 h-3" />
                Chef's Special
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex gap-2 mb-3">
            {item.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Title & Price */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 id={`featured-item-${item.id}`} className="font-display text-xl text-ink">{item.name}</h3>
          <span className="font-display text-xl text-navy flex-shrink-0" aria-label={`Price: ${item.price.toFixed(2)} euros`}>
            €{item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-neutral-600 mb-4">{item.description}</p>

        {/* Wine Pairing */}
        {item.pairing && (
          <div className="flex items-center gap-2 p-3 bg-sand-50 rounded-lg text-sm">
            <Wine className="w-4 h-4 text-shell" />
            <span className="text-neutral-600">
              <span className="font-medium text-ink">Sommelier suggests: </span>
              {item.pairing}
            </span>
          </div>
        )}

        {/* Season Indicator */}
        {item.season && item.season !== "year-round" && (
          <div className="mt-3 text-xs text-neutral-400">
            Seasonal: {item.season.charAt(0).toUpperCase() + item.season.slice(1)}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// Menu Section Component
interface MenuSectionProps {
  section: MenuSection;
  layout?: "compact" | "detailed" | "grid";
  showImages?: boolean;
}

export function MenuSectionComponent({
  section,
  layout = "compact",
  showImages = false,
}: MenuSectionProps) {
  const featuredItems = section.items.filter((item) => item.featured);
  const regularItems = section.items.filter((item) => !item.featured);

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="font-display text-display-sm text-ink">{section.title}</h2>
        {section.description && (
          <p className="text-neutral-500 mt-2">{section.description}</p>
        )}
      </div>

      {/* Featured Items (Grid) */}
      {featuredItems.length > 0 && layout !== "compact" && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredItems.map((item) => (
            <MenuItemFeatured key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Regular Items */}
      <div
        className={cn(
          layout === "grid"
            ? "grid md:grid-cols-2 gap-4"
            : "divide-y divide-neutral-100"
        )}
      >
        {(layout === "compact" ? section.items : regularItems).map((item) => (
          <MenuItemCompact key={item.id} item={item} showImage={showImages} />
        ))}
      </div>
    </div>
  );
}

// Main MenuItem Export (for single item use)
interface MenuItemProps {
  item: MenuItemType;
  variant?: "compact" | "featured" | "card";
  showImage?: boolean;
}

export function MenuItem({
  item,
  variant = "compact",
  showImage = false,
}: MenuItemProps) {
  if (variant === "featured") {
    return <MenuItemFeatured item={item} />;
  }

  return <MenuItemCompact item={item} showImage={showImage} />;
}

// Sample Menu Data for Testing
export const sampleMenuData: MenuSection[] = [
  {
    id: "starters",
    title: "Starters",
    description: "Begin your journey with flavors of the Wadden",
    items: [
      {
        id: "s1",
        name: "Texel Oysters",
        description: "Six fresh oysters from Texel beds, served with mignonette and lemon",
        price: 24,
        tags: ["seafood", "local", "glutenFree"],
        pairing: "Champagne Brut",
        featured: true,
        image: "https://images.unsplash.com/photo-1482049016530-d79f7d5e5d95?q=80&w=1920",
      },
      {
        id: "s2",
        name: "Wadden Crab Salad",
        description: "Delicate crab meat with avocado, citrus segments, and micro herbs",
        price: 18,
        tags: ["seafood", "glutenFree"],
        ingredients: ["Brown crab", "Avocado", "Grapefruit", "Lime", "Micro cress"],
        allergens: ["Shellfish"],
      },
      {
        id: "s3",
        name: "Texel Lamb Tartare",
        description: "Hand-cut Texel lamb with capers, shallots, and quail egg",
        price: 19,
        tags: ["local"],
        pairing: "Pinot Noir",
      },
      {
        id: "s4",
        name: "Roasted Beet Carpaccio",
        description: "Island-grown beetroot with goat cheese mousse and walnut praline",
        price: 14,
        tags: ["vegetarian", "glutenFree", "local"],
        new: true,
      },
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    description: "The heart of island cuisine",
    items: [
      {
        id: "m1",
        name: "North Sea Sole Meunière",
        description: "Whole Dover sole pan-fried in brown butter with capers and lemon",
        price: 42,
        tags: ["seafood", "glutenFree", "chefChoice"],
        pairing: "Chablis Grand Cru",
        featured: true,
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1920",
      },
      {
        id: "m2",
        name: "Texel Lamb Rack",
        description: "Herb-crusted rack with confit potato, seasonal vegetables, and jus",
        price: 38,
        tags: ["local", "glutenFree"],
        pairing: "Bordeaux Rouge",
        featured: true,
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1920",
      },
      {
        id: "m3",
        name: "Wild Mushroom Risotto",
        description: "Arborio rice with foraged island mushrooms and aged parmesan",
        price: 26,
        tags: ["vegetarian", "local"],
        pairing: "Barolo",
      },
      {
        id: "m4",
        name: "Catch of the Day",
        description: "Fresh fish selection, preparation varies daily. Ask your server.",
        price: 36,
        tags: ["seafood", "glutenFree"],
        season: "year-round",
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    description: "Sweet endings crafted with care",
    items: [
      {
        id: "d1",
        name: "Texel Honey Parfait",
        description: "Frozen honey parfait with lavender shortbread and bee pollen",
        price: 14,
        tags: ["vegetarian", "local"],
        featured: true,
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1920",
      },
      {
        id: "d2",
        name: "Dark Chocolate Fondant",
        description: "Warm chocolate cake with salted caramel and vanilla ice cream",
        price: 14,
        tags: ["vegetarian"],
        pairing: "Port Wine",
      },
      {
        id: "d3",
        name: "Seasonal Fruit Tart",
        description: "Crisp pastry with vanilla cream and island berries",
        price: 12,
        tags: ["vegetarian"],
      },
      {
        id: "d4",
        name: "Dutch Cheese Selection",
        description: "Artisan cheeses with quince paste and oat crackers",
        price: 16,
        tags: ["vegetarian", "local"],
        pairing: "Dessert Wine",
      },
    ],
  },
];

export type { MenuItemType, MenuSection, DietaryTag };
