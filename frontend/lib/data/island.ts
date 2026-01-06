/**
 * ISLAND PAGE DATA
 * =================
 * Centralized data for the Texel Island page
 *
 * REDESIGN: Update content here to change Island page data
 */

import { Waves, Bird, Bike, Aperture, Fish, TreePine, LucideIcon } from "lucide-react";

// ============================================
// ATTRACTIONS
// ============================================
export interface Attraction {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const attractions: Attraction[] = [
  {
    icon: TreePine,
    title: "Dunes National Park",
    description: "43 km² of protected dunes and salt marshes. Home to migratory birds and rare flora. Free entry.",
  },
  {
    icon: Aperture,
    title: "Texel Lighthouse",
    description: "Climb 118 steps for panoramic views from 45m above sea level. The iconic red lighthouse marks the island's northern tip.",
  },
  {
    icon: Fish,
    title: "Ecomare",
    description: "Seal sanctuary and nature museum. Watch rescued seals recover before returning to the sea. Learn about the island's Ice Age origins.",
  },
  {
    icon: Bird,
    title: "Birdwatching",
    description: "One of Europe's premier birding destinations. Spot spoonbills, avocets, terns and gannets in diverse ecosystems.",
  },
  {
    icon: Bike,
    title: "Cycling Tours",
    description: "63 km of scenic routes through dunes, villages, and along the coast. Bikes available for rent at the hotel.",
  },
  {
    icon: Waves,
    title: "Mudflat Walking",
    description: "Experience wadlopen - walking on the seabed at low tide. Guided tours reveal the Wadden Sea's unique biodiversity.",
  },
];

// ============================================
// VILLAGES
// ============================================
export interface Village {
  name: string;
  description: string;
  distance: string;
}

export const villages: Village[] = [
  {
    name: "Den Burg",
    description: "The island's capital. Charming shops, restaurants, and a weekly market.",
    distance: "5 min",
  },
  {
    name: "De Koog",
    description: "Beach village with cafés and direct access to the North Sea coast.",
    distance: "2 min",
  },
  {
    name: "Oudeschild",
    description: "Historic fishing port. Fresh seafood and maritime heritage.",
    distance: "10 min",
  },
  {
    name: "Den Hoorn",
    description: "Artists' village. Galleries, studios, and the island's oldest church.",
    distance: "8 min",
  },
  {
    name: "Oosterend",
    description: "The prettiest village. Traditional architecture and local crafts.",
    distance: "15 min",
  },
];

// ============================================
// QUICK FACTS
// ============================================
export interface IslandFact {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export const islandFacts: IslandFact[] = [
  { label: "Coastline", value: 30, suffix: " km" },
  { label: "Area", value: 170, suffix: " km²" },
  { label: "Population", value: 13500, prefix: "~", suffix: "" },
  { label: "Villages", value: 7, suffix: "" },
  { label: "Sheep", value: 14000, prefix: "~", suffix: "" },
  { label: "Ferry time", value: 20, suffix: " min" },
];

// ============================================
// LOCAL PRODUCTS
// ============================================
export const localProducts = [
  {
    title: "Texel Lamb",
    description: "Salt marsh-fed, celebrated by chefs across the Netherlands",
  },
  {
    title: "Texelse Bierbrouwerij",
    description: "Craft beers brewed with island character since 1999",
  },
  {
    title: "Fresh Seafood",
    description: "Direct from Oudeschild harbour to your plate",
  },
  {
    title: "Island Cheese",
    description: "Artisanal varieties from local sheep and cow's milk",
  },
];
