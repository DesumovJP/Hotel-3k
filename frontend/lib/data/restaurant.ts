/**
 * RESTAURANT PAGE DATA
 * =====================
 * Centralized data for the Restaurant page
 *
 * REDESIGN: Update content here to change Restaurant page data
 */

import { UtensilsCrossed, Leaf, Wine, Coffee, Sun, LucideIcon } from "lucide-react";

// ============================================
// MENU PDFs
// ============================================
export const menuPDFs = {
  dinner: "https://www.opduin.nl/upload/files/opduin_menukaart%20EN%20vanaf%2012%20dec.pdf",
  lunch: "https://www.opduin.nl/upload/files/opduin_lunchkaart_A5%20(2).pdf",
};

// ============================================
// LOCAL INGREDIENTS
// ============================================
export interface LocalIngredient {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const localIngredients: LocalIngredient[] = [
  {
    icon: UtensilsCrossed,
    title: "Texel & Wadden Products",
    description: "As many products as possible from Texel and other Wadden Sea regions",
  },
  {
    icon: Leaf,
    title: "Organic & Seasonal",
    description: "Organic meat and seasonal vegetables from local farms",
  },
  {
    icon: Wine,
    title: "Day-fresh Fish",
    description: "The sea provides us with day-fresh fish and shellfish",
  },
];

// ============================================
// DINING OPTIONS
// ============================================
export interface DiningOption {
  title: string;
  time: string;
  description: string;
  note: string;
  icon: LucideIcon;
}

export const diningOptions: DiningOption[] = [
  {
    title: "Breakfast",
    time: "7:00 – 10:30",
    description: "Extensive buffet for hotel guests. Fresh breads, local cheeses, eggs to order, and island honey.",
    note: "Included for hotel guests",
    icon: Coffee,
  },
  {
    title: "Lunch",
    time: "12:00 – 14:30",
    description: "Light dishes and sandwiches. Perfect after a morning beach walk or cycle tour.",
    note: "Open to all",
    icon: Sun,
  },
  {
    title: "Dinner",
    time: "18:00 – 22:00",
    description: "Multi-course dining experience. Choose 3 to 6 courses showcasing the island's finest.",
    note: "Reservations recommended",
    icon: UtensilsCrossed,
  },
];

// ============================================
// GALLERY IMAGES
// ============================================
export const restaurantGalleryImages = [
  "/restaurant/restaurant-opduin-600x450.jpg",
  "/restaurant/lunchen-in-opduin-600x450_2.jpg",
  "/restaurant/tafel-reserveren-600x450_2.jpg",
];
