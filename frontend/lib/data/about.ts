/**
 * ABOUT PAGE DATA
 * ================
 * Centralized data for the About page
 *
 * REDESIGN: Update content here to change About page data
 */

import { Heart, Leaf, Star, LucideIcon } from "lucide-react";

// ============================================
// TIMELINE
// ============================================
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: "1932",
    title: "The Beginning",
    description: "The Petit family opens a small guesthouse for visitors to Texel, offering simple rooms and hearty island meals.",
  },
  {
    year: "1956",
    title: "Post-War Renaissance",
    description: "After careful restoration, the hotel expands with a new wing, terrace restaurant, and the first glimpses of what would become our signature dune views.",
  },
  {
    year: "1985",
    title: "Wellness Pioneer",
    description: "We become the first hotel on Texel to offer spa facilities, introducing the island to the concept of seaside wellness.",
  },
  {
    year: "2010",
    title: "Grand Renovation",
    description: "A complete renovation transforms Opduin into a luxury destination while preserving our family heritage and island character.",
  },
  {
    year: "2023",
    title: "Sustainable Future",
    description: "Achieving carbon-neutral status, installing solar panels, and deepening our commitment to local sourcing and island conservation.",
  },
];

// ============================================
// VALUES
// ============================================
export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description: "Three generations of the Petit family have welcomed guests. That warmth is in our DNA.",
  },
  {
    icon: Leaf,
    title: "Island Stewardship",
    description: "We protect what makes Texel special—from supporting local farmers to preserving dune ecosystems.",
  },
  {
    icon: Star,
    title: "Thoughtful Luxury",
    description: "Excellence without pretension. Every detail serves your comfort, not our ego.",
  },
];

// ============================================
// TEAM
// ============================================
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export const team: TeamMember[] = [
  {
    name: "Lucas Petit",
    role: "Owner, Third Generation",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    quote: "My grandfather built this place with his hands. My job is to honor that while building something even better for the next generation.",
  },
  {
    name: "Maria Jansen",
    role: "Executive Chef",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    quote: "Texel's bounty inspires every dish. The sea, the land, the seasons — they tell the story. I just translate it to the plate.",
  },
  {
    name: "Thomas de Vries",
    role: "Spa Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    quote: "True wellness comes from connecting with nature. Here, the dunes and sea do half the work. We just help you slow down.",
  },
];

// ============================================
// SUSTAINABILITY STATS
// ============================================
export interface SustainabilityStat {
  value: string;
  label: string;
  description: string;
}

export const sustainabilityStats: SustainabilityStat[] = [
  { value: "100%", label: "Carbon Neutral", description: "Since 2023" },
  { value: "85%", label: "Local Sourcing", description: "Food & supplies from Texel" },
  { value: "40+", label: "Solar Panels", description: "Powering our operations" },
  { value: "Zero", label: "Single-Use Plastic", description: "Throughout the hotel" },
];

// ============================================
// AWARDS
// ============================================
export interface Award {
  year: string;
  title: string;
  org: string;
}

export const awards: Award[] = [
  { year: "2024", title: "Best Boutique Hotel Netherlands", org: "Traveller's Choice" },
  { year: "2023", title: "Green Key Gold Certification", org: "Green Key International" },
  { year: "2023", title: "Top 10 Wellness Retreats", org: "Condé Nast Traveller" },
  { year: "2022", title: "Excellence in Hospitality", org: "Dutch Hotel Association" },
];

// ============================================
// GALLERY IMAGES
// ============================================
export const aboutGalleryImages = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", caption: "Hotel exterior" },
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800", caption: "Lobby" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800", caption: "Guest lounge" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800", caption: "Terrace" },
];
