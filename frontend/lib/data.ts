// Re-export static content (Footer, About, Cancellation, Meetings contacts)
export {
  footerData,
  aboutData,
  cancellationPolicy,
  meetingsContacts,
  legalPages,
} from "./data/static-content";

// ============================================
// CENTRALIZED DATA EXPORTS
// ============================================

// Hotel Info - Single source of truth for contact info
export * from "./data/hotel-info";

// Page-specific data
export * from "./data/about";
export * from "./data/wellness";
export * from "./data/restaurant";
export * from "./data/meetings";
export * from "./data/gallery";
export * from "./data/island";
export * from "./data/sister-hotels";

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
    slug: "double-room",
    name: "Double Room",
    tagline: "Comfortable with view over the dunes or forest",
    description: "The big, comfy double bed, mini fridge, Nespresso machine and fast Wi-Fi make this room a comfortable place with view over the dunes or the forest.",
    longDescription: "The big, comfy double bed, mini fridge, Nespresso machine and fast Wi-Fi make this room a comfortable place with view over the dunes or the forest. Within a minute the room is nice and cool with the air-conditioning. Light and airy, without any unnecessary hotel furniture, beautiful fabrics, comfortable beds. Slide open the curtains for a view over the island.",
    image: "/rooms/tweepersoonskamer-600x400_5.jpg",
    gallery: [
      "/rooms/tweepersoonskamer-600x400_5.jpg",
      "/rooms/tweepersoonskamer-600x400_6.jpg",
      "/rooms/tweepersoonskamer-600x400_8.jpg",
      "/rooms/tweepersoonskamer-600x400_3.jpg",
    ],
    price: 0,
    size: 25,
    maxGuests: 2,
    bedType: "King-size (190x205)",
    view: "Dunes or Forest",
    amenities: ["Free WiFi", "Air Conditioning", "Mini Fridge", "Nespresso Machine", "Shower"],
    features: ["Shower", "Nespresso machine", "Air-conditioning", "King-size box spring bed", "Mini fridge"],
  },
  {
    id: "2",
    slug: "suite",
    name: "Suite",
    tagline: "Spacious with seating area and sleeping couch",
    description: "The suites are more spacious than the double rooms and have along with the king size bed a large seating area with couch and a reading / working / coffee table.",
    longDescription: "The suites are more spacious than the double rooms and have along with the king size bed a large seating area with couch and a reading / working / coffee table. The sleeping couch can be made up for 2 children. Ideal for families or those who want extra space to relax.",
    image: "/rooms/suite-600x400_4.jpg",
    gallery: [
      "/rooms/suite-600x400_4.jpg",
      "/rooms/suite-600x400_5.jpg",
      "/rooms/suite-600x400_7.jpg",
      "/rooms/suite-600x400_3.jpg",
    ],
    price: 0,
    size: 35,
    maxGuests: 4,
    bedType: "King-size (190x205)",
    view: "Dunes or Forest",
    amenities: ["Free WiFi", "Air Conditioning", "Mini Fridge", "Nespresso Machine", "Shower or Bath"],
    features: ["Shower or bath", "Nespresso machine", "Air-conditioning", "King-size box spring bed", "Mini fridge", "Sleeping couch for 2 children"],
  },
  {
    id: "3",
    slug: "single-room",
    name: "Single Room",
    tagline: "Perfect for a short stay of 1 or 2 nights",
    description: "Opduin has six real single rooms. A small room and therefore suitable for a short stay of 1 or 2 nights. We deliberately emphasized sleeping in this room.",
    longDescription: "Opduin has six real single rooms. A small room and therefore suitable for a short stay of 1 or 2 nights. We deliberately emphasized sleeping in this room. So it is equipped with a large bed of 120 x 210 and a large TV. No closet, desk or seating area in this room, but air-conditioning, Wi-Fi and a Nespresso machine are available.",
    image: "/rooms/eenpersoonskamer-600x400_3.jpg",
    gallery: [
      "/rooms/eenpersoonskamer-600x400_3.jpg",
      "/rooms/eenpersoonskamer-600x400_4.jpg",
      "/rooms/eenpersoonskamer-600x400_6.jpg",
    ],
    price: 0,
    size: 15,
    maxGuests: 1,
    bedType: "Box spring (120x200)",
    view: "Courtyard",
    amenities: ["Free WiFi", "Air Conditioning", "Nespresso Machine", "Shower", "Large TV"],
    features: ["Nespresso machine", "Shower", "Air-conditioning", "Box spring bed (120x200)"],
  },
  {
    id: "4",
    slug: "hotel-apartment",
    name: "Hotel Apartment",
    tagline: "Large with extra bedroom and own balcony",
    description: "The 3 apartments are large (50 to 90m²) and have an extra bedroom and own balcony with forest view. All this gives this room the feeling of an own residency.",
    longDescription: "The 3 apartments are large (50 to 90m²) and have an extra bedroom and own balcony with forest view. All this gives this room the feeling of an own residency. Nice and luxurious when staying with a party of 2, but when the sleeping couch is pulled out even 6 persons can comfortably stay in this room.",
    image: "/rooms/hotelappartementen-600x400_5.jpg",
    gallery: [
      "/rooms/hotelappartementen-600x400_5.jpg",
      "/rooms/hotelappartementen-600x400_6.jpg",
      "/rooms/hotelappartementen-600x400_7.jpg",
      "/rooms/hotelappartementen-600x400_8.jpg",
    ],
    price: 0,
    size: 70,
    maxGuests: 6,
    bedType: "King-size (200x210) + 2 singles",
    view: "Forest",
    amenities: ["Free WiFi", "Air Conditioning", "Mini Fridge", "Nespresso Machine", "Bath and Shower", "Balcony"],
    features: ["Bath and separate shower", "Nespresso machine and mini fridge", "King-size bed (200x210)", "Separate kids room with 2 single beds", "Air-conditioning", "Sleeping couch", "Balcony"],
  },
  {
    id: "5",
    slug: "holiday-home",
    name: "Holiday Home",
    tagline: "Independent living with hotel comfort",
    description: "Ideal for a family that prefers to come and go during the day. On ground level, with an own front door and own terrace.",
    longDescription: "In the original Opduin villa 3 holiday homes are situated, ideal for a family that prefers to come and go during the day. On ground level, with an own front door and own terrace. Inside the home there is a kitchenette with microwave, a fridge and a small stove. Ideal for a longer holiday, completely independent, but still with all the facilities and comforts of the hotel. You do not need to rent bed linen, kitchen linen and towels separately or bring them with you. We arrange everything.",
    image: "/rooms/vakantiewoning-600x400_5.jpg",
    gallery: [
      "/rooms/vakantiewoning-600x400_5.jpg",
      "/rooms/vakantiewoning-600x400_6.jpg",
      "/rooms/vakantiewoning-600x400_7.jpg",
      "/rooms/vakantiewoning-600x400_4.jpg",
    ],
    price: 0,
    size: 45,
    maxGuests: 4,
    bedType: "King-size (190x205) + bunk bed",
    view: "Garden",
    amenities: ["Free WiFi", "Kitchenette", "Microwave", "Fridge", "Small stove", "Rain shower"],
    features: ["Kitchenette with Nespresso, stove, microwave and fridge", "Rain shower", "King-size box spring bed", "Separate kids room with bunk bed", "Living room", "Terrace"],
  },
  {
    id: "6",
    slug: "west-hampton",
    name: "Family Home West-Hampton",
    tagline: "Very large and spacious for 8 persons",
    description: "A Hamptons-inspired luxurious family home with 4 large bedrooms, 4 ensuite bathrooms, living room, fully equipped kitchen, outside terrace, sauna, and floor heating.",
    longDescription: "To the right side of Opduin we built a new Hamptons-inspired luxurious family home. A very large and spacious holiday home for 8 persons. With 4 large bedrooms, 4 ensuite bathrooms, living room, fully equipped kitchen, outside terrace, sauna, airconditioning and floor heating. Cars can be parked on the own drive way. Ideal for a family up to 8 persons who are used to draw their own plan or for guests who prefer lots of space. It is just a ten minutes walk to the beach. Breakfast is not included (€24/adult, €12/child).",
    image: "/rooms/familiehuis-west-hampton-600x400.jpg",
    gallery: [
      "/rooms/familiehuis-west-hampton-600x400.jpg",
      "/rooms/familiehuis-west-hampton-600x400_1.jpg",
      "/rooms/familiehuis-west-hampton-600x400_2.jpg",
      "/rooms/familiehuis-west-hampton-600x400_3.jpg",
    ],
    price: 0,
    size: 150,
    maxGuests: 8,
    bedType: "4 King-size beds",
    view: "Forest & Garden",
    amenities: ["Free WiFi", "Air Conditioning", "Floor Heating", "Full Kitchen", "Private Sauna", "Private Parking"],
    features: ["4 large bedrooms", "4 ensuite bathrooms", "Living room", "Fully equipped kitchen", "Outside terrace", "Private sauna", "Air-conditioning", "Floor heating", "Private driveway"],
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
