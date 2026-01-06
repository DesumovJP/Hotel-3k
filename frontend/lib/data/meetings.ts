/**
 * MEETINGS PAGE DATA
 * ===================
 * Centralized data for the Meetings & Events page
 *
 * REDESIGN: Update content here to change Meetings page data
 */

// ============================================
// ACTIVITIES
// ============================================
export const activities = [
  "Oyster mudflat hiking",
  "Nature excursions",
  "Flying above the island",
  "Surfing",
  "Cycling tours",
  "Seal watching",
];

// ============================================
// MEETING ROOMS
// ============================================
export interface MeetingRoom {
  name: string;
  dimensions: string;
  area: string;
  carre: number;
  theatre: number;
  ushape: number;
  description: string;
  image: string;
}

export const meetingRooms: MeetingRoom[] = [
  {
    name: "Slufterzaal",
    dimensions: "8 × 6m",
    area: "48m²",
    carre: 22,
    theatre: 42,
    ushape: 18,
    description: "Suitable for 2 to 42 people. Can be linked with Muyzaal and Bollekamer to form 1 large room for up to 156 people, or with Muyzaal alone for up to 110 people.",
    image: "/meetings/slufterzaal-600x450.jpg",
  },
  {
    name: "Muyzaal",
    dimensions: "7 × 7m",
    area: "49m²",
    carre: 26,
    theatre: 57,
    ushape: 20,
    description: "Suitable for 2 to 57 people. Can be linked with Slufterzaal and Bollekamer to form 1 large room for up to 156 people, or with Slufterzaal alone for up to 110 people.",
    image: "/meetings/muyzaal-600x450.jpg",
  },
  {
    name: "Bollekamer",
    dimensions: "9 × 6m",
    area: "54m²",
    carre: 20,
    theatre: 48,
    ushape: 18,
    description: "Suitable for 2 to 48 people. Can be linked with Slufterzaal and Muyzaal to form 1 large room for up to 156 people.",
    image: "/meetings/bollekamer-600x450.jpg",
  },
  {
    name: "Slufter + Muyzaal",
    dimensions: "13 × 6.5m",
    area: "84m²",
    carre: 42,
    theatre: 110,
    ushape: 36,
    description: "Combined space suitable for 20 to 110 people.",
    image: "/meetings/slufter-muyzaal-combinatie-600x450.jpg",
  },
  {
    name: "All three rooms",
    dimensions: "24 × 6.5m",
    area: "156m²",
    carre: 56,
    theatre: 140,
    ushape: 50,
    description: "Maximum configuration for up to 156 people in various setups.",
    image: "/meetings/vergaderzalen-600x450.jpg",
  },
];

// ============================================
// GALLERY IMAGES
// ============================================
export const meetingsGalleryImages = [
  "/meetings/vergaderzalen-600x450.jpg",
  "/meetings/slufterzaal-600x450.jpg",
  "/meetings/muyzaal-600x450.jpg",
  "/meetings/bollekamer-600x450.jpg",
  "/meetings/slufter-muyzaal-combinatie-600x450.jpg",
  "/meetings/vergaderarrangementen-600x450.jpg",
  "/meetings/teambuildingactiviteiten-600x450.jpg",
  "/meetings/een-feestje-op-texel-600x450.jpg",
  "/meetings/trouwen-op-texel-600x450.jpg",
];

// ============================================
// WEDDING PLANNER
// ============================================
export const weddingPlanner = {
  name: "Sophie - Trouwen Texel",
  website: "https://www.trouwen-texel.nl",
  email: "info@trouwentexel.com",
  phone: "06-57186156",
};
