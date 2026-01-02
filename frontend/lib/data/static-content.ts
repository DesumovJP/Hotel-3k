/**
 * Static Content - Data that doesn't change often
 * These are NOT managed by Strapi CMS
 */

// ============================================
// FOOTER DATA
// ============================================
export const footerData = {
  contact: {
    address: "Ruijslaan 22",
    city: "De Koog",
    postalCode: "1796 AD",
    country: "Texel, Netherlands",
    phone: "+31 222 317 445",
    email: "hello@opduin.nl",
  },
  social: [
    {
      name: "Facebook",
      url: "https://facebook.com/grandhotelOpduin",
      icon: "facebook" as const,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/grandhotelOpduin",
      icon: "instagram" as const,
    },
  ],
  links: [
    { name: "Rooms", slug: "rooms" },
    { name: "Dining", slug: "restaurant" },
    { name: "Spa & Wellness", slug: "wellness" },
    { name: "Events", slug: "meetings" },
    { name: "About Us", slug: "about" },
  ],
  legal: [
    { name: "Privacy Policy", slug: "privacy" },
    { name: "Terms & Conditions", slug: "terms" },
    { name: "Cookie Policy", slug: "cookies" },
  ],
};

// ============================================
// ABOUT DATA (History, Philosophy, Team)
// ============================================
export const aboutData = {
  // Hotel History
  history: {
    title: "Our Story",
    subtitle: "A Legacy of Coastal Elegance",
    intro:
      "Since 1923, Grand Hotel Opduin has been a beacon of hospitality on the shores of Texel. What began as a modest seaside inn has evolved into one of the Netherlands' most cherished luxury retreats.",
    timeline: [
      {
        year: 1923,
        title: "The Beginning",
        description:
          "Founded by the Van der Berg family as a small guesthouse for travelers seeking the healing sea air of Texel.",
      },
      {
        year: 1952,
        title: "Post-War Renaissance",
        description:
          "Major expansion added the iconic dune-facing wing, establishing Opduin as a destination hotel.",
      },
      {
        year: 1978,
        title: "The Wellness Era",
        description:
          "Introduction of the first spa facilities, pioneering the wellness concept on the island.",
      },
      {
        year: 1995,
        title: "Culinary Excellence",
        description:
          "Restaurant renovation and appointment of our first Michelin-trained executive chef.",
      },
      {
        year: 2010,
        title: "Sustainable Luxury",
        description:
          "Comprehensive renovation focusing on sustainability while preserving historic character.",
      },
      {
        year: 2023,
        title: "Centennial Celebration",
        description:
          "100 years of hospitality. Opening of the new Penthouse Suites and enhanced spa facilities.",
      },
    ],
  },

  // Hotel Philosophy
  philosophy: {
    title: "Our Philosophy",
    subtitle: "The Hamptons of the Wadden",
    intro:
      "At Grand Hotel Opduin, we believe luxury lies in simplicity, authenticity, and connection—to nature, to place, and to each other.",
    pillars: [
      {
        title: "Rooted in Place",
        description:
          "Every detail reflects the unique character of Texel—from locally-sourced ingredients to design inspired by dune landscapes and North Sea horizons.",
        icon: "map-pin",
      },
      {
        title: "Sustainable Stewardship",
        description:
          "We are custodians of this precious island ecosystem. Our practices minimize impact while maximizing guest experience.",
        icon: "leaf",
      },
      {
        title: "Genuine Hospitality",
        description:
          "Beyond service, we offer warmth. Our team doesn't just meet needs—they anticipate them, creating moments of unexpected delight.",
        icon: "heart",
      },
      {
        title: "Timeless Elegance",
        description:
          "We honor our century-long heritage while embracing contemporary comfort. Classic never goes out of style.",
        icon: "sparkles",
      },
    ],
    quote: {
      text: "True luxury is not about excess, but about having space—space to breathe, to think, to simply be.",
      author: "Elisabeth van der Berg",
      role: "Third-generation owner",
    },
  },

  // Team Members
  team: [
    {
      name: "Elisabeth van der Berg",
      role: "Owner & General Manager",
      bio: "Third-generation hotelier continuing the family legacy. Elisabeth brings a perfect blend of tradition and innovation to Opduin.",
      image: "/images/team/elisabeth.jpg",
    },
    {
      name: "Willem Brouwer",
      role: "Executive Chef",
      bio: "Trained at De Librije, Chef Willem creates dishes that tell the story of Texel through seasonal, locally-sourced ingredients.",
      image: "/images/team/willem.jpg",
    },
    {
      name: "Dr. Marlene Jansen",
      role: "Wellness Director",
      bio: "With 20 years in holistic wellness, Marlene has designed our spa programs to harmonize body, mind, and the healing power of the sea.",
      image: "/images/team/marlene.jpg",
    },
    {
      name: "Thomas de Groot",
      role: "Head Sommelier",
      bio: "Thomas curates our award-winning wine collection, with a passion for natural wines and perfect food pairings.",
      image: "/images/team/thomas.jpg",
    },
    {
      name: "Anna de Vries",
      role: "Guest Experience Manager",
      bio: "A Texel native, Anna ensures every guest discovers the authentic island experience through curated local activities.",
      image: "/images/team/anna.jpg",
    },
  ],
};

// ============================================
// CANCELLATION POLICY
// ============================================
export const cancellationPolicy = {
  title: "Cancellation Policy",
  lastUpdated: "2025-01-01",
  intro:
    "We understand plans can change. Our cancellation policy is designed to be fair while ensuring we can continue to offer the best service to all guests.",

  policies: [
    {
      name: "Flexible Rate",
      description: "Our standard booking rate with maximum flexibility.",
      rules: [
        "Free cancellation up to 48 hours before check-in",
        "Cancellation within 48 hours: first night charged",
        "No-show: full stay charged",
        "Early departure: remaining nights may be charged",
      ],
    },
    {
      name: "Non-Refundable Rate",
      description: "Discounted rate for guests certain of their plans.",
      rules: [
        "10-15% discount on room rate",
        "Full prepayment required at booking",
        "No refund for cancellation at any time",
        "Date changes subject to availability and rate difference",
      ],
    },
    {
      name: "Special Offers & Packages",
      description: "Conditions vary by offer.",
      rules: [
        "Each offer has specific cancellation terms",
        "Please check offer details before booking",
        "Seasonal packages may have stricter policies",
        "Contact us for clarification before booking",
      ],
    },
    {
      name: "Group Bookings (5+ rooms)",
      description: "Special terms for group reservations.",
      rules: [
        "Separate group contract required",
        "Deposit of 30% due within 14 days of booking",
        "Free cancellation up to 30 days before arrival",
        "14-30 days: 50% of total charged",
        "Less than 14 days: full amount charged",
      ],
    },
  ],

  notes: [
    "All times are based on local time (CET/CEST)",
    "Cancellations must be made in writing via email or through our website",
    "Refunds are processed within 5-10 business days",
    "Travel insurance is recommended for all bookings",
  ],

  contact: {
    email: "reservations@opduin.nl",
    phone: "+31 222 317 445",
  },
};

// ============================================
// MEETINGS CONTACTS (Luuk & Esmee)
// ============================================
export const meetingsContacts = {
  title: "Your Events Team",
  intro:
    "Our dedicated events team is here to help you plan the perfect meeting, celebration, or wedding. Reach out to discuss your requirements.",

  contacts: [
    {
      name: "Luuk van der Berg",
      role: "Events Manager",
      specialization: "Corporate meetings, conferences, team events",
      email: "events@opduin.nl",
      phone: "+31 222 317 446",
      image: "/images/team/luuk.jpg",
      bio: "With 15 years in hospitality events, Luuk excels at creating productive, memorable corporate gatherings. His attention to detail and understanding of business needs ensures seamless execution.",
      availability: "Monday - Friday, 09:00 - 18:00",
    },
    {
      name: "Esmee de Vries",
      role: "Wedding & Celebrations Coordinator",
      specialization: "Weddings, anniversaries, private celebrations",
      email: "weddings@opduin.nl",
      phone: "+31 222 317 447",
      image: "/images/team/esmee.jpg",
      bio: "Esmee brings creativity and heart to every celebration. From intimate elopements to grand weddings, she crafts moments that couples cherish forever.",
      availability: "Tuesday - Saturday, 10:00 - 19:00",
    },
  ],

  // Quick response promise
  responseTime: "We aim to respond to all inquiries within 24 hours.",

  // General events email
  generalInquiries: "events@opduin.nl",
};

// ============================================
// LEGAL PAGES
// ============================================
export const legalPages = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "2025-01-01",
    sections: [
      {
        title: "Information We Collect",
        content:
          "We collect information you provide directly, such as when making a reservation, signing up for our newsletter, or contacting us. This includes name, email, phone number, and payment details.",
      },
      {
        title: "How We Use Your Information",
        content:
          "Your information is used to process reservations, improve our services, send relevant communications, and comply with legal obligations.",
      },
      {
        title: "Data Protection",
        content:
          "We implement appropriate security measures to protect your personal data. Your information is stored securely and accessed only by authorized personnel.",
      },
      {
        title: "Your Rights",
        content:
          "Under GDPR, you have the right to access, correct, delete, or port your data. Contact our Data Protection Officer at privacy@opduin.nl.",
      },
    ],
  },

  terms: {
    title: "Terms & Conditions",
    lastUpdated: "2025-01-01",
    sections: [
      {
        title: "Reservations",
        content:
          "All reservations are subject to availability and confirmation. A valid credit card is required to guarantee your booking.",
      },
      {
        title: "Check-in & Check-out",
        content:
          "Standard check-in is from 15:00, check-out by 11:00. Early check-in and late check-out may be arranged subject to availability.",
      },
      {
        title: "Hotel Policies",
        content:
          "Smoking is prohibited in all indoor areas. Pets are welcome in selected rooms with prior arrangement. The hotel reserves the right to refuse service.",
      },
      {
        title: "Liability",
        content:
          "The hotel is not liable for loss or damage to guests' belongings. Valuables should be stored in the in-room safe or at reception.",
      },
    ],
  },

  cookies: {
    title: "Cookie Policy",
    lastUpdated: "2025-01-01",
    sections: [
      {
        title: "What Are Cookies",
        content:
          "Cookies are small text files stored on your device when you visit our website. They help us provide a better experience.",
      },
      {
        title: "Cookies We Use",
        content:
          "We use essential cookies for website functionality, analytics cookies to understand usage, and marketing cookies for relevant advertising.",
      },
      {
        title: "Managing Cookies",
        content:
          "You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.",
      },
    ],
  },
};
