// Re-export static content (Footer, About, Cancellation, Meetings contacts)
export {
  footerData,
  aboutData,
  cancellationPolicy,
  meetingsContacts,
  legalPages,
} from "./data/static-content";

// Room data
export interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  price: number;
  size: number;
  maxGuests: number;
  bedType: string;
  view: string;
  amenities: string[];
  features: string[];
}

export const rooms: Room[] = [
  {
    id: "1",
    slug: "dune-suite",
    name: "Dune Suite",
    tagline: "Views over the rolling dunes to the sea beyond",
    description: "Our signature suite offers panoramic views of Texel's iconic dunes, with floor-to-ceiling windows that frame the ever-changing landscape.",
    longDescription: "Wake to the soft light filtering through the dunes. The Dune Suite is our most spacious accommodation, featuring a separate living area, private balcony, and uninterrupted views stretching to the North Sea horizon. Natural materials and a muted palette create a sanctuary of calm.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?q=80&w=2070",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974",
    ],
    price: 295,
    size: 55,
    maxGuests: 2,
    bedType: "King",
    view: "Dunes & Sea",
    amenities: ["Free WiFi", "Air Conditioning", "Minibar", "Safe", "Bathrobes", "Nespresso Machine"],
    features: ["Private Balcony", "Separate Living Area", "Rain Shower", "Freestanding Bath", "Sea View"],
  },
  {
    id: "2",
    slug: "sea-view-room",
    name: "Sea View Room",
    tagline: "Wake to the rhythm of the North Sea",
    description: "A refined retreat with views across the water. Watch the moods of the sea change from the comfort of your room.",
    longDescription: "The Sea View Room captures the essence of coastal living. Large windows frame the North Sea, while the interior combines comfort with understated elegance. Natural linens, warm wood, and carefully chosen details create a space that feels both luxurious and completely at ease.",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
    gallery: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070",
    ],
    price: 195,
    size: 35,
    maxGuests: 2,
    bedType: "Queen",
    view: "Sea View",
    amenities: ["Free WiFi", "Air Conditioning", "Minibar", "Safe", "Bathrobes"],
    features: ["Sea View", "Rain Shower", "Workspace"],
  },
  {
    id: "3",
    slug: "garden-retreat",
    name: "Garden Retreat",
    tagline: "Tranquility among the native flora",
    description: "Ground floor accommodation with direct access to our private gardens. A peaceful sanctuary surrounded by nature.",
    longDescription: "Step directly from your room into the tranquility of our gardens. The Garden Retreat offers a ground-floor haven, where native plants and the sounds of birdsong create a gentle backdrop. The room opens onto a private terrace, perfect for morning coffee or evening contemplation.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070",
      "https://images.unsplash.com/photo-1587985064135-0366536eab42?q=80&w=2070",
    ],
    price: 225,
    size: 40,
    maxGuests: 2,
    bedType: "King",
    view: "Garden",
    amenities: ["Free WiFi", "Air Conditioning", "Minibar", "Safe", "Bathrobes", "Nespresso Machine"],
    features: ["Private Terrace", "Garden Access", "Rain Shower", "Workspace"],
  },
  {
    id: "4",
    slug: "lighthouse-suite",
    name: "Lighthouse Suite",
    tagline: "Our most exclusive residence",
    description: "The crown of Opduin. A two-story suite with 360-degree views, private rooftop terrace, and dedicated butler service.",
    longDescription: "Rising above the hotel, the Lighthouse Suite offers an unparalleled experience. Two floors of refined living space, crowned by a private rooftop terrace with panoramic views of the island. A dedicated butler ensures every detail is attended to. This is Texel at its most extraordinary.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
    ],
    price: 595,
    size: 95,
    maxGuests: 4,
    bedType: "King + Twin",
    view: "360° Panoramic",
    amenities: ["Free WiFi", "Air Conditioning", "Full Bar", "Safe", "Premium Bathrobes", "Nespresso Machine", "Butler Service"],
    features: ["Private Rooftop Terrace", "Two Floors", "Separate Living Room", "Rain Shower", "Freestanding Bath", "360° Views", "Butler Service"],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((room) => room.slug === slug);
}

// Restaurant menu data
export interface MenuItem {
  name: string;
  description: string;
  price: string;
  dietary?: string[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    title: "Starters",
    items: [
      { name: "Wadden Oysters", description: "Six pieces, mignonette, lemon", price: "€24", dietary: ["GF"] },
      { name: "Texel Lamb Tartare", description: "Capers, shallot, mustard, crostini", price: "€18" },
      { name: "Seasonal Soup", description: "Chef's daily creation from island produce", price: "€14", dietary: ["V"] },
      { name: "North Sea Crab", description: "Brown crab, avocado, citrus", price: "€22", dietary: ["GF"] },
    ],
  },
  {
    title: "Main Courses",
    items: [
      { name: "Texel Salt Marsh Lamb", description: "Rack of lamb, seasonal vegetables, jus", price: "€42", dietary: ["GF"] },
      { name: "Catch of the Day", description: "Fresh from the North Sea, preparation varies", price: "€38", dietary: ["GF"] },
      { name: "Wild Mushroom Risotto", description: "Foraged mushrooms, truffle, parmesan", price: "€32", dietary: ["V", "GF"] },
      { name: "Beef Tenderloin", description: "Dutch beef, bone marrow, red wine reduction", price: "€48", dietary: ["GF"] },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Texel Cheese Selection", description: "Local cheeses, fig compote, walnut bread", price: "€18", dietary: ["V"] },
      { name: "Dark Chocolate Fondant", description: "Salted caramel, vanilla ice cream", price: "€14", dietary: ["V"] },
      { name: "Seasonal Fruit Tart", description: "Pastry cream, fresh island berries", price: "€12", dietary: ["V"] },
    ],
  },
];

// Wellness treatments
export interface Treatment {
  name: string;
  duration: string;
  price: string;
  description: string;
}

export interface TreatmentCategory {
  title: string;
  description: string;
  treatments: Treatment[];
}

export const wellnessCategories: TreatmentCategory[] = [
  {
    title: "Massage",
    description: "Restore balance and release tension",
    treatments: [
      { name: "Signature Opduin Massage", duration: "90 min", price: "€145", description: "A deeply relaxing full-body treatment using warm oils and intuitive techniques" },
      { name: "Deep Tissue Massage", duration: "60 min", price: "€110", description: "Focused pressure to release chronic muscle tension" },
      { name: "Hot Stone Therapy", duration: "75 min", price: "€125", description: "Heated basalt stones combined with flowing massage strokes" },
      { name: "Couples Massage", duration: "60 min", price: "€195", description: "Side-by-side relaxation in our dedicated couples suite" },
    ],
  },
  {
    title: "Facials",
    description: "Nourish and revitalize your skin",
    treatments: [
      { name: "Sea Mineral Facial", duration: "60 min", price: "€95", description: "Deep cleansing with mineral-rich products from the Wadden Sea" },
      { name: "Anti-Aging Treatment", duration: "75 min", price: "€120", description: "Targeted treatment to firm and rejuvenate" },
      { name: "Gentleman's Facial", duration: "45 min", price: "€75", description: "Tailored skincare for men" },
    ],
  },
  {
    title: "Body Treatments",
    description: "Full body renewal and care",
    treatments: [
      { name: "Salt Scrub & Wrap", duration: "60 min", price: "€85", description: "Exfoliation with Texel sea salt followed by a nourishing wrap" },
      { name: "Mud Treatment", duration: "45 min", price: "€75", description: "Mineral-rich Wadden mud for detoxification" },
      { name: "Full Spa Journey", duration: "180 min", price: "€275", description: "Complete experience: scrub, wrap, massage, and facial" },
    ],
  },
];

export const facilities = [
  { name: "Indoor Pool", description: "25-meter heated pool with dune views", icon: "waves" },
  { name: "Finnish Sauna", description: "Traditional dry sauna at 85°C", icon: "flame" },
  { name: "Steam Room", description: "Aromatic steam with eucalyptus", icon: "cloud" },
  { name: "Relaxation Lounge", description: "Quiet space with herbal teas", icon: "armchair" },
  { name: "Fitness Center", description: "Modern equipment, open 24/7", icon: "dumbbell" },
  { name: "Outdoor Terrace", description: "Heated loungers for cooler days", icon: "sun" },
];
