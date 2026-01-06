/**
 * SISTER HOTELS PAGE DATA
 * ========================
 * Centralized data for the Sister Hotels page
 *
 * REDESIGN: Update content here to change Sister Hotels page data
 */

import { Heart, Building2, Users, LucideIcon } from "lucide-react";

// ============================================
// SISTER HOTELS
// ============================================
export interface SisterHotel {
  name: string;
  location: string;
  region: string;
  description: string;
  features: string[];
  image: string;
  url: string;
  character: string;
}

export const sisterHotels: SisterHotel[] = [
  {
    name: "Badhotel Rockanje",
    location: "Voorne-Putten Coast",
    region: "South Holland",
    description: "Badhotel Rockanje & Brasserie Lodgers is located on the coast of Voorne-Putten, only 400 meters from the sea, between forest and dunes. The tranquility and nature make you feel far from the outside world. The style of a North American lodge, the scent of pine trees, our hospitality and good cuisine make it a pleasant place to get a breath of fresh air.",
    features: ["Swimming pool", "Sauna", "Brasserie", "Forest location"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    url: "https://badhotelrockanje.nl",
    character: "Lodge-style retreat",
  },
  {
    name: "Delta Hotel Vlaardingen",
    location: "River Nieuwe Maas",
    region: "South Holland",
    description: "Delta Hotel and Grand Café Nautique, your home port on the river Nieuwe Maas. A place right on the water, where staying overnight, eating and meeting can be seamlessly combined. A place where you can drink a good glass and eat while the ships glide by. Where you organize an inspiring brainstorming session and bring the energy of ocean sailors on board.",
    features: ["Waterfront", "Grand Café", "Meeting rooms", "River views"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    url: "https://deltahotel.nl",
    character: "Maritime elegance",
  },
  {
    name: "Landgoed de Holtweijde",
    location: "Overijssel Estate",
    region: "Overijssel",
    description: "Authenticity, tradition, vitality, passion, romance and good taste. De Holtweijde is much more than a hotel. We move with the times, respond to changing needs and create new experiences. Authenticity, tradition, vitality, passion, romance and good taste: you will find them in the interior, the honest materials, the dishes, the service, and the landscape.",
    features: ["Historic estate", "Fine dining", "Wellness", "Oak forests"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
    url: "https://holtweijde.nl",
    character: "Historic grandeur",
  },
  {
    name: "Landgoed Duin & Kruidberg",
    location: "Zuid-Kennemerland",
    region: "North Holland",
    description: "As soon as you arrive at Landgoed Duin & Kruidberg you step into another world and you can start to relax. Discover and experience the classical-historic Mansion, the atmospheric English Landgoedtuin and the beautiful surroundings of the Zuid-Kennemerland National Park. Stylish enjoyment in a casual and genuinely hospitable atmosphere.",
    features: ["Historic mansion", "English gardens", "National Park", "Classic luxury"],
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?q=80&w=1200",
    url: "https://duin-kruidberg.nl",
    character: "Classic estate",
  },
  {
    name: "Post-Plaza Hotel",
    location: "Leeuwarden, Fryslân",
    region: "Friesland",
    description: "In the heart of the city centre, it doesn't get more Leeuwarden than this. Post-Plaza is located on one of the most beautiful streets of the capital of Fryslân. A unique Hotel & Grand Café, located in a monumental building with rich history and authentic character.",
    features: ["City center", "Grand Café", "Historic building", "Frisian charm"],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
    url: "https://postplaza.nl",
    character: "Urban sophistication",
  },
];

// ============================================
// COLLECTION VALUES
// ============================================
export interface CollectionValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const collectionValues: CollectionValue[] = [
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description: "Every hotel shares our commitment to warm, personal service",
  },
  {
    icon: Building2,
    title: "Unique Character",
    description: "Each property has its own distinct identity and story",
  },
  {
    icon: Users,
    title: "Family Values",
    description: "All managed with the same care as a family home",
  },
];
