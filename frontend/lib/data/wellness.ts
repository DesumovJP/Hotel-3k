/**
 * WELLNESS PAGE DATA
 * ===================
 * Centralized data for the Wellness page
 *
 * REDESIGN: Update content here to change Wellness page data
 */

import { Waves, Flame, Droplets, Sparkles, Heart, Baby, Hand, Footprints, LucideIcon } from "lucide-react";

// ============================================
// FACILITIES
// ============================================
export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  highlight?: string;
  image: string;
}

export const facilities: Facility[] = [
  {
    id: "pool",
    name: "Swimming Pool",
    description: "Heated indoor pool with Jacuzzi and children's pool. Swimming lessons on Tuesdays.",
    icon: Waves,
    highlight: "Non-guests: €9 adults, €5 children",
    image: "/wellness/zwembad-600x450_1.jpg",
  },
  {
    id: "sauna",
    name: "Finnish Sauna & Steam Bath",
    description: "Traditional Finnish sauna and Turkish steam bath. Customary use without swimwear during free hours.",
    icon: Flame,
    highlight: "Free for guests 16:30-19:00",
    image: "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  },
  {
    id: "solarium",
    name: "Solarium",
    description: "Quick tanning service available for guests and visitors.",
    icon: Droplets,
    highlight: "€11 per session",
    image: "/wellness/solarium-600x450.jpg",
  },
];

// ============================================
// TREATMENT CATEGORIES
// ============================================
export interface Treatment {
  name: string;
  duration: string;
  price: string;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  image: string;
  treatments: Treatment[];
  featured?: boolean;
}

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: "massage",
    name: "Massage",
    icon: Hand,
    image: "/wellness/massage-600x400_2.jpg",
    treatments: [
      { name: "Relaxing Massage", duration: "25 min", price: "€50" },
      { name: "Relaxing Massage", duration: "55 min", price: "€85" },
      { name: "Hot Stone Massage", duration: "40 min", price: "€70" },
      { name: "Hot Stone Massage", duration: "75 min", price: "€110" },
      { name: "Scalp Massage", duration: "15 min", price: "€25" },
    ],
  },
  {
    id: "facial-women",
    name: "Facial (Women)",
    icon: Sparkles,
    image: "/wellness/gezichtsbehandelingen-dames-600x400_1.jpg",
    treatments: [
      { name: "Sea Treatment", duration: "55 min", price: "€85" },
      { name: "Organic Facial", duration: "40 min", price: "€65" },
      { name: "Anti-Aging Treatment", duration: "90 min", price: "€135" },
    ],
  },
  {
    id: "facial-men",
    name: "Facial (Men)",
    icon: Sparkles,
    image: "/wellness/gezichtsbehandelingen-heren-600x400_1.jpg",
    treatments: [
      { name: "Men's Facial", duration: "55 min", price: "€85" },
      { name: "Men's Deluxe Facial", duration: "90 min", price: "€110" },
    ],
  },
  {
    id: "body",
    name: "Body Treatments",
    icon: Heart,
    image: "/wellness/lichaamsbehandelingen-600x400_2.jpg",
    treatments: [
      { name: "Body Peeling", duration: "30 min", price: "€60" },
      { name: "Algae Packing", duration: "45 min", price: "€85" },
      { name: "Pregnancy Treatment", duration: "60 min", price: "€110" },
    ],
  },
  {
    id: "texel",
    name: "Texel Treatments",
    icon: Waves,
    featured: true,
    image: "/wellness/texelse-behandelingen-600x400_2.jpg",
    treatments: [
      { name: "Texel Feet (honey & sheepscream)", duration: "25 min", price: "€40" },
      { name: "Texel Feeling", duration: "55 min", price: "€85" },
      { name: "Opduin Feeling Deluxe", duration: "90 min", price: "€130" },
    ],
  },
  {
    id: "hands-feet",
    name: "Hands & Feet",
    icon: Footprints,
    image: "/wellness/handen-en-voeten-600x400_1.jpg",
    treatments: [
      { name: "Manicure", duration: "35 min", price: "€50" },
      { name: "Luxury Manicure", duration: "55 min", price: "€75" },
      { name: "Pedicure", duration: "45 min", price: "€65" },
      { name: "Foot Reflex Massage", duration: "55 min", price: "€85" },
    ],
  },
  {
    id: "kids",
    name: "Kids Wellness",
    icon: Baby,
    image: "/wellness/kinder-wellness-600x400.jpg",
    treatments: [
      { name: "Kids Massage", duration: "25 min", price: "€29" },
      { name: "Kids Manicure", duration: "25 min", price: "€29" },
      { name: "Kids Facial", duration: "25 min", price: "€29" },
    ],
  },
];

// ============================================
// GALLERY IMAGES
// ============================================
export const wellnessGalleryImages = [
  "/wellness/zwembad-600x450_1.jpg",
  "/wellness/finse-sauna-en-turks-stoombad-600x450_1.jpg",
  "/wellness/massage-600x400_2.jpg",
];
