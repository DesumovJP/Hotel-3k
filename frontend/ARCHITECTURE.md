# Grand Hotel Opduin - Architecture Documentation

> **Version**: 1.0.0
> **Last Updated**: January 2026
> **Tech Stack**: Next.js 16.1.1 | React 19.2.3 | TypeScript 5 | Tailwind CSS 4.1.18 | Framer Motion 12.23
> **CMS**: Strapi v5

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Directory Structure](#2-directory-structure)
3. [Design System](#3-design-system)
4. [Component Architecture](#4-component-architecture)
5. [Page Structure](#5-page-structure)
6. [Data Layer](#6-data-layer)
7. [Animation System](#7-animation-system)
8. [Analytics & SEO](#8-analytics--seo)
9. [Accessibility](#9-accessibility)
10. [Strapi Schemas](#10-strapi-schemas)
11. [Quick Reference](#11-quick-reference)

---

## 1. Project Overview

### Brand Identity
- **Name**: Grand Hotel Opduin
- **Tagline**: "The Hamptons of the Wadden"
- **Location**: Texel Island, Netherlands
- **Style**: Luxury coastal aesthetic with modern refinement

### Architecture Principles
1. **Atomic Design** - Components organized from atoms → molecules → organisms → sections
2. **Server-First** - Next.js App Router with selective client components
3. **CMS-Ready** - Strapi v5 integration with fallback static data
4. **Performance Budget** - LCP ≤2.0s, CLS ≤0.05, INP ≤200ms
5. **WCAG AA+** - Full accessibility compliance

---

## 2. Directory Structure

```
hotel-website/
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout (fonts, metadata)
│   ├── page.tsx                     # Homepage
│   ├── globals.css                  # Global styles
│   ├── rooms/
│   │   ├── page.tsx                # Rooms listing
│   │   └── [slug]/page.tsx          # Room detail (dynamic)
│   ├── restaurant/page.tsx
│   ├── wellness/page.tsx
│   ├── offers/page.tsx
│   ├── meetings/page.tsx
│   ├── about/page.tsx
│   ├── gallery/page.tsx
│   ├── island/page.tsx
│   ├── contact/page.tsx
│   └── book/page.tsx
│
├── components/
│   ├── atoms/                       # 6 base components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Typography.tsx
│   │   ├── OptimizedImage.tsx
│   │   ├── YouTubeBackground.tsx
│   │   └── index.ts
│   │
│   ├── molecules/                   # 14 composite components
│   │   ├── NavLink.tsx
│   │   ├── RoomCard.tsx
│   │   ├── MenuItem.tsx
│   │   ├── PolicyBlock.tsx
│   │   ├── GalleryModal.tsx
│   │   └── index.ts
│   │
│   ├── organisms/                   # 6 page-level components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FooterLuxe.tsx
│   │   ├── BookingWidget.tsx
│   │   ├── CompareDrawer.tsx
│   │   └── index.ts
│   │
│   ├── sections/                    # 35+ content sections
│   │   ├── HeroSection.tsx
│   │   ├── RoomsSection.tsx
│   │   ├── RestaurantSection.tsx
│   │   ├── WellnessSection.tsx
│   │   ├── OffersGrid.tsx
│   │   └── index.ts
│   │
│   ├── animations/                  # 8 animation components
│   │   ├── Counter.tsx
│   │   ├── SplitText.tsx
│   │   ├── ParallaxLayer.tsx
│   │   ├── MagneticButton.tsx
│   │   └── index.ts
│   │
│   └── effects/                     # 3 visual effects
│       ├── Grain.tsx
│       ├── ImageTilt.tsx
│       └── TextHighlight.tsx
│
├── lib/
│   ├── data.ts                      # Room, menu, wellness data
│   ├── data/
│   │   └── static-content.ts        # Footer, about, policies
│   ├── types/
│   │   ├── index.ts
│   │   ├── global-settings.ts
│   │   └── wellness.ts
│   ├── api/
│   │   └── strapi.ts                # Strapi API client
│   ├── motion.ts                    # 60+ Framer Motion variants
│   ├── utils.ts                     # cn, formatPrice, debounce
│   ├── analytics/
│   │   ├── events.ts                # Event tracking
│   │   ├── ab-testing.ts            # A/B framework
│   │   └── gtm.ts                   # GTM integration
│   ├── seo/
│   │   ├── structured-data.ts       # JSON-LD schemas
│   │   └── meta.ts                  # Meta tag generators
│   ├── accessibility/
│   │   ├── hooks.ts                 # 10+ a11y hooks
│   │   └── focus-trap.ts            # Focus management
│   └── media/
│       └── image-utils.ts           # Image optimization
│
├── strapi/
│   ├── schemas/                     # 11+ collection schemas
│   │   ├── offer.schema.json
│   │   ├── room.schema.json
│   │   └── components/              # 22+ component schemas
│   └── seed-data-complete.json      # Sample content
│
├── tailwind.config.ts               # Design system tokens
├── next.config.ts                   # Next.js configuration
└── package.json
```

---

## 3. Design System

### 3.1 Color Palette

#### Primary Brand Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Sand** | `#F5E9DA` | Warm backgrounds, cards |
| **Deep Sea** | `#0E2A3A` | Dark sections, footer, text |
| **Gold** | `#C9A646` | Accent, CTAs, highlights |
| **Ink** | `#141414` | Primary text |
| **Neutral** | `#FAFAF7` | Light backgrounds |

#### Full Color Scale
```typescript
// Sand (Primary warm)
sand: {
  50: "#FDFCFA", 100: "#FBF7F2", 200: "#F8F0E6",
  300: "#F5E9DA", // Brand primary
  400: "#E8D9C4", 500: "#D4C4A8", 600: "#BBA984",
  700: "#9A8A68", 800: "#7A6E52", 900: "#5A5240"
}

// Deep Sea (Primary dark)
deepsea: {
  50: "#E8F0F3", 100: "#C5D8E0", 200: "#9EBFCC",
  300: "#6FA2B3", 400: "#4A8A9E", 500: "#2A6F85",
  600: "#1D5468", 700: "#143D4D",
  800: "#0E2A3A", // Brand primary
  900: "#081A24", 950: "#040E14"
}

// Gold (Accent)
gold: {
  50: "#FCF9F0", 100: "#F9F2DC", 200: "#F2E4B8",
  300: "#E8D28E", 400: "#DCBD62",
  500: "#C9A646", // Brand primary
  600: "#A88A35", 700: "#836B2A",
  800: "#5E4D1F", 900: "#3A3014"
}
```

#### Semantic Colors
```typescript
success: { light: "#E8F5E9", DEFAULT: "#4CAF50", dark: "#2E7D32" }
warning: { light: "#FFF8E1", DEFAULT: "#FFC107", dark: "#F57F17" }
error:   { light: "#FFEBEE", DEFAULT: "#F44336", dark: "#C62828" }
```

### 3.2 Typography

#### Font Stack
```typescript
fontFamily: {
  display: ["Playfair Display", "Georgia", "serif"],      // Headlines
  body: ["Inter", "system-ui", "-apple-system", "sans-serif"], // Body
  numeric: ["Inter", "tabular-nums", "sans-serif"],       // Prices
}
```

#### Display Scale (Fluid)
```css
display-hero: clamp(3.5rem, 8vw, 6rem)     /* 56-96px */
display-2xl:  clamp(3rem, 7vw, 5rem)       /* 48-80px */
display-xl:   clamp(2.5rem, 5vw, 4rem)     /* 40-64px */
display-lg:   clamp(2rem, 4vw, 3rem)       /* 32-48px */
display-md:   clamp(1.5rem, 3vw, 2.25rem)  /* 24-36px */
display-sm:   clamp(1.25rem, 2.5vw, 1.75rem) /* 20-28px */
```

#### Body Scale
```css
body-xl: 1.25rem  (20px)
body-lg: 1.125rem (18px)
body-md: 1rem     (16px)
body-sm: 0.875rem (14px)
body-xs: 0.75rem  (12px)
```

#### Special
```css
overline: 0.75rem, letter-spacing: 0.12em, uppercase
caption:  0.6875rem, letter-spacing: 0.04em
price:    1.5rem, tabular-nums
```

### 3.3 Spacing System

#### Base Scale (4px unit)
```typescript
spacing: {
  "4.5": "1.125rem",  // 18px
  "13": "3.25rem",    // 52px
  "15": "3.75rem",    // 60px
  "18": "4.5rem",     // 72px
  "22": "5.5rem",     // 88px
  "26": "6.5rem",     // 104px
  "30": "7.5rem",     // 120px
  "34": "8.5rem",     // 136px
  "36": "9rem",       // 144px
}
```

#### Section Spacing (Fluid)
```css
section-xs: clamp(2rem, 4vw, 3rem)      /* 32-48px */
section-sm: clamp(3rem, 6vw, 4.5rem)    /* 48-72px */
section-md: clamp(4.5rem, 9vw, 6rem)    /* 72-96px */
section-lg: clamp(6rem, 12vw, 9rem)     /* 96-144px */
section-xl: clamp(7.5rem, 15vw, 12rem)  /* 120-192px */
```

#### Gutters
```css
gutter-sm: clamp(1rem, 2vw, 1.5rem)
gutter:    clamp(1.5rem, 4vw, 4rem)
gutter-lg: clamp(3rem, 6vw, 6rem)
gutter-xl: clamp(4.5rem, 9vw, 9rem)
```

### 3.4 Elevation (Shadows)

```typescript
boxShadow: {
  "elevation-1": "0 1px 2px rgba(14,42,58,0.04), 0 1px 3px rgba(14,42,58,0.08)",
  "elevation-2": "0 2px 4px rgba(14,42,58,0.04), 0 4px 8px rgba(14,42,58,0.08)",
  "elevation-3": "0 4px 8px rgba(14,42,58,0.04), 0 8px 24px rgba(14,42,58,0.08)",
  "elevation-4": "0 8px 16px rgba(14,42,58,0.06), 0 16px 48px rgba(14,42,58,0.12)",
  "elevation-5": "0 12px 24px rgba(14,42,58,0.08), 0 24px 64px rgba(14,42,58,0.16)",
  "glow-gold":   "0 0 20px rgba(201,166,70,0.3), 0 0 40px rgba(201,166,70,0.15)",
  "glow-sand":   "0 0 20px rgba(245,233,218,0.5), 0 0 40px rgba(245,233,218,0.25)",
  "focus-ring":  "0 0 0 2px #C9A646, 0 0 0 4px rgba(201,166,70,0.25)",
}
```

### 3.5 Layout

#### Container Widths
```typescript
maxWidth: {
  "content-xs":  "480px",
  "content-sm":  "640px",
  "content-md":  "768px",
  "content-lg":  "1024px",
  "content-xl":  "1280px",
  "content-2xl": "1440px",
  "content-3xl": "1600px",
  "prose":       "65ch",
}
```

#### Breakpoints
```typescript
screens: {
  xs:   "475px",
  sm:   "640px",
  md:   "768px",
  lg:   "1024px",
  xl:   "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
}
```

#### Aspect Ratios
```typescript
aspectRatio: {
  "4/3":     "4 / 3",
  "3/2":     "3 / 2",
  "16/9":    "16 / 9",
  "21/9":    "21 / 9",
  "hero":    "16 / 7",    // Custom hero
  "card":    "4 / 5",     // Portrait cards
  "room":    "3 / 2",     // Room images
  "portrait": "3 / 4",
  "square":   "1 / 1",
  "wide":     "2 / 1",
}
```

#### Z-Index Scale
```typescript
zIndex: {
  behind:   "-1",
  base:     "0",
  dropdown: "30",
  drawer:   "40",
  modal:    "50",
  popover:  "60",
  tooltip:  "70",
  toast:    "80",
  overlay:  "90",
  max:      "100",
}
```

### 3.6 Accessibility Utilities

```css
/* Tap targets (WCAG 44x44px minimum) */
.tap-target             { min-width: 44px; min-height: 44px; }
.tap-target-comfortable { min-width: 48px; min-height: 48px; }
.tap-target-large       { min-width: 56px; min-height: 56px; }

/* Focus indicators */
.focus-visible-ring:focus-visible {
  outline: 2px solid #C9A646;
  outline-offset: 2px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 1rem 2rem;
  background: #0E2A3A;
  color: white;
  transition: top 0.3s;
}
.skip-link:focus { top: 0; }

/* Motion reduction */
.motion-reduce {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

---

## 4. Component Architecture

### 4.1 Atoms (Base Components)

#### Button
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}
```
| Variant | Background | Text | Border |
|---------|------------|------|--------|
| primary | navy | white | none |
| secondary | transparent | navy | navy |
| ghost | transparent | navy-muted | none |
| light | white | navy | none |

| Size | Padding | Font |
|------|---------|------|
| sm | px-5 py-2.5 | text-xs |
| md | px-7 py-3 | text-sm |
| lg | px-9 py-4 | text-sm |

#### Typography
- **Heading**: `as` prop (h1-h6), font-display
- **Text**: `size` prop (xs-xl), `muted` boolean
- **Label**: Overline style, uppercase

#### Badge
```typescript
interface BadgeProps {
  variant?: "default" | "gold" | "ocean" | "outline";
}
```

### 4.2 Molecules (Composite)

#### RoomCard
```typescript
interface RoomData {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  size: number;
  maxGuests: number;
  bedType: string;
  view: string;
  images: string[];
  amenities: string[];
  highlights: string[];
  available: boolean;
}

interface RoomCardProps {
  room: RoomData;
  variant?: "default" | "featured" | "compact";
  isComparing?: boolean;
  onCompareToggle?: (room: RoomData) => void;
  priority?: boolean;
}
```

#### MenuItem
```typescript
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
  featured?: boolean;
}

type DietaryTag = "vegetarian" | "vegan" | "glutenFree" | "dairyFree" |
                  "local" | "chefChoice" | "spicy" | "seafood";
```

#### PolicyBlock
```typescript
interface Policy {
  id: string;
  category: PolicyCategory;
  title: string;
  icon: React.ReactNode;
  summary: string;
  sections: PolicySection[];
  lastUpdated?: string;
}

type PolicyCategory = "booking" | "stay" | "wellness" | "restaurant" |
                      "pets" | "cancellation" | "payment";
```

### 4.3 Organisms (Page-Level)

#### Header
```typescript
interface HeaderProps {
  variant?: "light" | "dark";
}
```
- Sticky navigation with scroll state
- Mobile hamburger menu (AnimatePresence)
- Dropdown submenus with timeout
- Navigation: Rooms, Restaurant, Wellness, Offers, About (submenu), Meetings

#### Footer / FooterLuxe
```typescript
interface FooterLuxeProps {
  siteName: string;
  tagline: string;
  contact: ContactInfo;
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
  legalLinks: LegalLink[];
}
```

#### BookingWidget
```typescript
interface BookingWidgetProps {
  className?: string;
  variant?: "floating" | "inline" | "compact";
  onBook?: (booking: BookingData) => void;
}

interface BookingData {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  rooms: number;
}
```
- 3-step flow: Dates → Guests → Confirm
- Calendar date picker
- Price calculation
- Analytics tracking at each step

#### CompareDrawer
```typescript
// Context
<CompareProvider>
  <CompareDrawer />
</CompareProvider>

// Hooks
const { rooms, addRoom, removeRoom } = useCompare();
const toggle = useCompareToggle();
```

### 4.4 Sections (35+ Components)

#### HeroSection
```typescript
interface HeroSectionProps {
  youtubeId?: string;           // Default: "APJyGnhfits"
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  headline?: string;            // Default: "Grand Hotel Opduin"
  subheadline?: string;         // Default: "The Hamptons of the Wadden"
  tagline?: string;
  location?: string;            // Default: "Texel Island, Netherlands"
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}
```
**Features**:
- YouTube/video/image backgrounds
- Multi-layer parallax (5 transforms)
- Film grain overlay
- Skip link for accessibility
- Hotel JSON-LD schema
- Analytics: view_content, start_booking
- Reduced motion support

#### OffersGrid
```typescript
interface Offer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  category: "romance" | "wellness" | "adventure" | "family" | "seasonal";
  discountType: "percentage" | "fixed" | "value-add";
  discountValue?: number;
  originalPrice?: number;
  price: number;
  priceLabel?: string;
  valueStack: OfferValueItem[];
  terms: string[];
  dateRange: { start: string; end: string };
  urgencyFlag?: "limited" | "lastMinute" | "popular" | "new";
  minNights?: number;
  maxGuests?: number;
}
```

#### GalleryCinematic
```typescript
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: string;
  aspect?: "landscape" | "portrait" | "square";
  featured?: boolean;
}

interface GallerySet {
  id: string;
  name: string;
  description?: string;
  images: GalleryImage[];
}
```
- Masonry grid layout
- Category filtering
- Lightbox with keyboard navigation
- Prev/next + thumbnails

---

## 5. Page Structure

### 5.1 Homepage (`/`)

```
┌─────────────────────────────────────────┐
│ Header (sticky)                         │
├─────────────────────────────────────────┤
│ ScrollProgress                          │
├─────────────────────────────────────────┤
│ HeroSection                             │
│   - YouTube background                  │
│   - Parallax layers                     │
│   - Headline + CTAs                     │
├─────────────────────────────────────────┤
│ QuickBooking (floating widget)          │
├─────────────────────────────────────────┤
│ IntroSection                            │
│   - Brand narrative                     │
├─────────────────────────────────────────┤
│ FeaturesSection                         │
│   - 4 key benefits grid                 │
├─────────────────────────────────────────┤
│ RoomsSection                            │
│   - 4 featured rooms                    │
│   - "View all" CTA                      │
├─────────────────────────────────────────┤
│ RestaurantSection                       │
│   - Menu preview                        │
│   - Reservation CTA                     │
├─────────────────────────────────────────┤
│ WellnessSection                         │
│   - Spa overview                        │
│   - Treatment preview                   │
├─────────────────────────────────────────┤
│ IslandSection                           │
│   - Texel highlights                    │
├─────────────────────────────────────────┤
│ CTASection                              │
│   - Final call-to-action                │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### 5.2 Rooms Listing (`/rooms`)

```
┌─────────────────────────────────────────┐
│ Header (dark variant)                   │
├─────────────────────────────────────────┤
│ Breadcrumbs (Home > Rooms)              │
├─────────────────────────────────────────┤
│ Hero Section                            │
│   - Title: "Rooms & Suites"             │
│   - Subtitle                            │
├─────────────────────────────────────────┤
│ Room Grid (alternating layout)          │
│   ┌─────────┬─────────┐                 │
│   │ Room 1  │ Image   │                 │
│   ├─────────┼─────────┤                 │
│   │ Image   │ Room 2  │                 │
│   ├─────────┼─────────┤                 │
│   │ Room 3  │ Image   │                 │
│   └─────────┴─────────┘                 │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### 5.3 Room Detail (`/rooms/[slug]`)

```
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│ Breadcrumbs (Home > Rooms > Room Name)  │
├─────────────────────────────────────────┤
│ RoomDetailSection                       │
│   ┌─────────────────────────────────┐   │
│   │ Hero Image Gallery              │   │
│   │   - Main image                  │   │
│   │   - Thumbnail navigation        │   │
│   │   - Lightbox modal              │   │
│   └─────────────────────────────────┘   │
│   ┌──────────────┬──────────────────┐   │
│   │ Room Info    │ Booking Card     │   │
│   │ - Name       │ - Price          │   │
│   │ - Specs      │ - Date picker    │   │
│   │ - Amenities  │ - Book CTA       │   │
│   │ - Features   │                  │   │
│   └──────────────┴──────────────────┘   │
├─────────────────────────────────────────┤
│ Related Rooms                           │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### 5.4 Wellness (`/wellness`)

```
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│ WellnessHero                            │
├─────────────────────────────────────────┤
│ FacilitiesGrid (6 facilities)           │
│   - Indoor Pool                         │
│   - Finnish Sauna                       │
│   - Steam Room                          │
│   - Relaxation Lounge                   │
│   - Fitness Center                      │
│   - Outdoor Terrace                     │
├─────────────────────────────────────────┤
│ TreatmentCatalogPro                     │
│   - Massage (4 treatments)              │
│   - Facials (3 treatments)              │
│   - Body Treatments (3 treatments)      │
├─────────────────────────────────────────┤
│ WellnessTestimonials                    │
├─────────────────────────────────────────┤
│ SalonInfo                               │
├─────────────────────────────────────────┤
│ ScheduleCheck (booking widget)          │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

### 5.5 All Pages Summary

| Page | Route | Key Sections |
|------|-------|--------------|
| Home | `/` | Hero, QuickBooking, Rooms, Restaurant, Wellness, Island, CTA |
| Rooms | `/rooms` | Hero, Room Grid (4 rooms), Filters |
| Room Detail | `/rooms/[slug]` | Gallery, Specs, Amenities, Booking, Related |
| Restaurant | `/restaurant` | Hero, Menu Sections, SeasonalMenu, Reservation |
| Wellness | `/wellness` | Hero, Facilities, Treatments, Testimonials, Booking |
| Offers | `/offers` | OffersGrid, Filters, Detail Modal |
| Meetings | `/meetings` | MeetingsSection, Packages, LeadForm |
| About | `/about` | AboutHero, Timeline, Philosophy, Team |
| Gallery | `/gallery` | GalleryCinematic (5 sets, 17+ images) |
| Island | `/island` | IslandSection, TexelNowSection |
| Contact | `/contact` | ContactSection, Form, Map, Hours |
| Booking | `/book` | Full BookingWidget |

---

## 6. Data Layer

### 6.1 Room Data (`lib/data.ts`)

```typescript
interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  price: number;
  size: number;        // m²
  maxGuests: number;
  bedType: string;
  view: string;
  amenities: string[];
  features: string[];
}

export const rooms: Room[] = [
  { slug: "dune-suite",      price: 295, size: 55, maxGuests: 2 },
  { slug: "sea-view-room",   price: 195, size: 35, maxGuests: 2 },
  { slug: "garden-retreat",  price: 225, size: 40, maxGuests: 2 },
  { slug: "lighthouse-suite", price: 595, size: 95, maxGuests: 4 },
];

export function getRoomBySlug(slug: string): Room | undefined;
```

### 6.2 Menu Data

```typescript
interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  { title: "Starters",     items: [4 items] },
  { title: "Main Courses", items: [4 items] },
  { title: "Desserts",     items: [3 items] },
];
```

### 6.3 Wellness Data

```typescript
interface TreatmentCategory {
  title: string;
  description: string;
  treatments: Treatment[];
}

export const wellnessCategories: TreatmentCategory[] = [
  { title: "Massage",         treatments: [4] },
  { title: "Facials",         treatments: [3] },
  { title: "Body Treatments", treatments: [3] },
];

export const facilities: Facility[] = [6 facilities];
```

### 6.4 Static Content (`lib/data/static-content.ts`)

```typescript
export const footerData = {
  contact: { address, city, postalCode, country, phone, email },
  social: [{ name, url, icon }],
  links: [{ name, slug }],
  legal: [{ name, slug }],
};

export const aboutData = {
  history: { timeline: [6 events], story: string },
  philosophy: { pillars: [4], quote: string, author: string },
  team: [{ name, role, bio, image }],
};

export const cancellationPolicy = { ... };
export const meetingsContacts = { ... };
export const legalPages = { ... };
```

### 6.5 Strapi API (`lib/api/strapi.ts`)

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchGlobalSettings(): Promise<FooterLuxeProps> {
  // GET /api/global-setting?populate=*
  // Revalidate: 3600s (1 hour)
  // Returns transformed FooterLuxeProps or defaults
}
```

### 6.6 Seed Data (`strapi/seed-data-complete.json`)

```json
{
  "rooms": [5 rooms],
  "offers": [5 offers],
  "restaurantMenu": [10 items],
  "testimonials": [5 reviews],
  "blogPosts": [3 articles],
  "homeContent": { ... },
  "globalSettings": { ... }
}
```

---

## 7. Animation System

### 7.1 Timing Constants (`lib/motion.ts`)

```typescript
export const duration = {
  instant:  0.15,  // Quick feedback
  fast:     0.3,   // Micro-interactions
  normal:   0.5,   // Standard transitions
  slow:     0.8,   // Emphasis
  slower:   1.2,   // Hero animations
  slowest:  1.8,   // Cinematic
};

export const stagger = {
  tight:    0.03,  // Characters
  normal:   0.06,  // Words, items
  relaxed:  0.1,   // Cards
  loose:    0.15,  // Large items
};

export const delay = {
  none:   0,
  short:  0.1,
  normal: 0.2,
  long:   0.4,
  longer: 0.6,
};
```

### 7.2 Easing Functions

```typescript
export const easeOutExpo   = [0.16, 1, 0.3, 1];     // Standard exit
export const easeOutQuint  = [0.22, 1, 0.36, 1];    // Smooth exit
export const easeInOutQuint = [0.83, 0, 0.17, 1];   // Symmetric
export const easePremium   = [0.25, 0.1, 0.25, 1];  // Apple-like
export const easeSnappy    = [0.34, 1.56, 0.64, 1]; // Bouncy overshoot
export const easeSoft      = [0.4, 0, 0.2, 1];      // Gentle
```

### 7.3 Animation Variants (60+)

#### Fade Animations
```typescript
fadeIn:       { opacity: 0 → 1 }
fadeInUp:     { opacity: 0, y: 40 → opacity: 1, y: 0 }
fadeInDown:   { opacity: 0, y: -40 → ... }
fadeInLeft:   { opacity: 0, x: -60 → ... }
fadeInRight:  { opacity: 0, x: 60 → ... }
```

#### Scale Animations
```typescript
scaleIn:       { scale: 0.9 → 1 }
scaleUp:       { scale: 0.8 → 1, spring }
scaleInRotate: { scale: 0.9, rotate: -10 → 1, 0 }
```

#### Clip/Reveal Animations
```typescript
clipRevealLeft:   { inset: "0 100% 0 0" → "0 0 0 0" }
clipRevealRight:  { inset: "0 0 0 100%" → "0 0 0 0" }
clipRevealUp:     { inset: "100% 0 0 0" → "0 0 0 0" }
clipRevealDown:   { inset: "0 0 100% 0" → "0 0 0 0" }
clipRevealCenter: { inset: "50% 50% 50% 50%" → "0 0 0 0" }
```

#### Stagger Containers
```typescript
staggerContainer:     { stagger: 0.06, delay: 0.1 }
staggerContainerSlow: { stagger: 0.1, delay: 0.2 }
staggerContainerFast: { stagger: 0.03, delay: 0 }
```

#### Hover Animations
```typescript
cardHover:       { scale: 1.02, y: -4 }
imageHover:      { scale: 1.08 }
linkHover:       { width: "0%" → "100%" }
arrowSlide:      { x: 0 → 5 }
iconBounce:      { y: [0, -5, 0] }
iconWiggle:      { rotate: [-5, 5, -5, 5, 0] }
```

### 7.4 Viewport Settings

```typescript
defaultViewport: { once: true, amount: 0.2 }   // Standard
fullViewport:    { once: true, amount: 0.5 }   // More visible
repeatViewport:  { once: false, amount: 0.2 }  // Repeats
earlyViewport:   { once: true, amount: 0.1 }   // Early trigger
```

### 7.5 Reduced Motion

```typescript
// Check preference
const prefersReducedMotion = useReducedMotion();

// Use reduced variants
reducedMotion.fadeIn:   { opacity: 0 → 1, duration: 0.01 }
reducedMotion.static:   { no animation }
```

---

## 8. Analytics & SEO

### 8.1 Event Tracking (`lib/analytics/events.ts`)

#### Event Types
```typescript
type ContentType = 'room' | 'offer' | 'restaurant' | 'wellness' | 'blog' | 'page';
type BookingSource = 'hero_cta' | 'room_card' | 'offer_card' | 'sticky_header' |
                     'quick_booking' | 'room_detail';
type UpsellType = 'room_upgrade' | 'breakfast' | 'spa_treatment' |
                  'restaurant_reservation' | 'late_checkout' | 'early_checkin' |
                  'parking' | 'airport_transfer';
```

#### Events
| Event | Parameters |
|-------|------------|
| `view_content` | content_type, content_id, name, category, value |
| `start_booking` | room_id, room_name, source, value |
| `select_dates` | check_in, check_out, nights, guests |
| `select_room` | room_id, room_name, category, price, currency, nights |
| `add_upsell` | upsell_type, id, name, value, currency |
| `complete_booking` | booking_id, total_value, currency, rooms, nights, guests, upsells |
| `filter_change` | filter_type, value, results_count |
| `gallery_interaction` | action, gallery_name, image_index |
| `form_interaction` | form_name, action, field_name, error_message |

#### Usage
```typescript
import { trackViewContent, trackStartBooking, trackSelectRoom } from '@/lib/analytics';

// Track page view
trackViewContent('page', 'home', { name: 'Homepage' });

// Track booking start
trackStartBooking('hero_cta', { roomId: 'dune-suite', value: 295 });

// Track room selection
trackSelectRoom('dune-suite', 'Dune Suite', 'suite', 295, 2);
```

### 8.2 A/B Testing (`lib/analytics/ab-testing.ts`)

```typescript
const AB_TESTS = {
  cta_variants:    { variants: ['check_availability', 'book_now', 'reserve_room'] },
  hero_media:      { variants: ['video', 'image', 'carousel'] },
  benefits_order:  { variants: ['rooms_first', 'wellness_first', 'dining_first'] },
};

// Hook usage
const variant = useABTest('cta_variants');  // Returns assigned variant

// Helper functions
getCTALabel();       // Returns CTA text for current variant
getHeroMediaType();  // Returns hero media type
getBenefitsOrder();  // Returns section order array
```

### 8.3 Structured Data (`lib/seo/structured-data.ts`)

#### Available Schemas
| Schema | Function | Usage |
|--------|----------|-------|
| Hotel | `generateHotelSchema()` | Homepage |
| LocalBusiness | `generateLocalBusinessSchema()` | All pages |
| WebSite | `generateWebsiteSchema()` | Homepage |
| Product/HotelRoom | `generateRoomSchema(room)` | Room pages |
| Offer | `generateOfferSchema(offer)` | Offer pages |
| FAQPage | `generateFAQSchema(faqs)` | FAQ sections |
| Event | `generateEventSchema(event)` | Events |
| Restaurant | `generateRestaurantSchema()` | Restaurant page |
| BreadcrumbList | `generateBreadcrumbSchema(items)` | All pages |
| Article | `generateArticleSchema(article)` | Blog posts |

#### Usage
```typescript
import { generateHotelSchema, toJsonLd } from '@/lib/seo';

const schema = generateHotelSchema();

// In component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }}
/>
```

### 8.4 Meta Tags (`lib/seo/meta.ts`)

```typescript
// Pre-built metadata
import {
  homeMetadata,
  roomsMetadata,
  restaurantMetadata,
  wellnessMetadata
} from '@/lib/seo';

// Custom generation
import { generateRoomMetadata, generateOfferMetadata } from '@/lib/seo';

const metadata = generateRoomMetadata({
  roomName: 'Dune Suite',
  roomPrice: 295,
  roomSize: 55,
  roomCategory: 'suite',
  description: '...',
  image: '...',
});
```

---

## 9. Accessibility

### 9.1 Hooks (`lib/accessibility/hooks.ts`)

| Hook | Purpose | Returns |
|------|---------|---------|
| `useReducedMotion()` | Detect motion preference | `boolean` |
| `useFocusVisible()` | Detect keyboard navigation | `boolean` |
| `useAnnouncer()` | Screen reader announcements | `announce(msg)` |
| `useEscapeKey(callback)` | Handle Escape key | - |
| `useArrowNavigation(count)` | Arrow key nav for lists | `{ currentIndex, handleKeyDown }` |
| `useRovingTabIndex(count)` | Roving tabindex pattern | `{ activeIndex, getTabIndex, handleKeyDown }` |
| `useScrollLock(isLocked)` | Lock body scroll | - |
| `useMediaQuery(query)` | Media query listener | `boolean` |
| `usePrefersColorScheme()` | Color scheme preference | `'light' \| 'dark'` |
| `useInert(containerRef)` | Set inert on siblings | - |

### 9.2 Focus Management (`lib/accessibility/focus-trap.ts`)

```typescript
// Focus trap for modals
useFocusTrap(containerRef, {
  initialFocus: buttonRef,
  returnFocus: true,
  enabled: isOpen,
});

// Utility functions
getFocusableElements(container);
getFirstFocusable(container);
getLastFocusable(container);
handleSkipLink(targetId);
```

### 9.3 ARIA Patterns

#### Accordion (PolicyBlock)
```tsx
<button
  aria-expanded={isOpen}
  aria-controls={`panel-${id}`}
>
  {title}
</button>
<div id={`panel-${id}`} role="region">
  {content}
</div>
```

#### Carousel (Gallery)
```tsx
<div
  role="region"
  aria-roledescription="carousel"
  aria-label="Photo gallery"
>
  <button aria-label="Previous image" />
  <button aria-label="Next image" />
</div>
```

#### Form Controls (BookingWidget)
```tsx
<div role="group" aria-labelledby="dates-heading">
  <label id="checkin-label">Check-in</label>
  <input aria-labelledby="checkin-label" aria-describedby="checkin-hint" />
</div>
<div aria-live="polite" id="form-status">
  {statusMessage}
</div>
```

---

## 10. Strapi Schemas

### 10.1 Collection Types

| Schema | File | Key Fields |
|--------|------|------------|
| **Offer** | `offer.schema.json` | title, slug, price, category, valueStack, dateRanges |
| **Room** | `room.schema.json` | name, slug, price, size, amenities, gallery |
| **Benefit** | `benefit.schema.json` | title, description, icon |
| **Policy** | `policy.schema.json` | title, slug, sections |
| **BlogPost** | `blog-post.schema.json` | title, slug, content, author, tags |
| **RestaurantMenu** | `restaurant-menu.schema.json` | name, price, category, tags |
| **Testimonial** | `testimonial.schema.json` | quote, guestName, rating, source |
| **WellnessTreatment** | `wellness-treatment.schema.json` | name, duration, price, category |
| **Amenity** | `amenity.schema.json` | name, icon, category |

### 10.2 Single Types

| Schema | Purpose |
|--------|---------|
| **GlobalSettings** | Site name, contact, social links, footer links |
| **HomeContent** | Hero, sections, CTAs for homepage |

### 10.3 Components

#### Shared Components
- `shared.seo` - Meta title, description, image
- `shared.contact-info` - Address, phone, email
- `shared.social-link` - Name, URL, icon
- `shared.footer-link` - Name, slug
- `shared.legal-link` - Name, slug
- `shared.date-range` - Start, end, label
- `shared.text-item` - Text, icon, highlighted
- `shared.author` - Name, role, avatar, bio

#### Offer Components
- `offer.value-item` - Label, included, value

#### Section Components
- `sections.benefits-section`
- `sections.preview-section`
- `sections.texel-now`
- `sections.cta-section`

---

## 11. Quick Reference

### 11.1 Import Patterns

```typescript
// Components
import { Button, Badge, Typography } from '@/components/atoms';
import { RoomCard, MenuItem, PolicyBlock } from '@/components/molecules';
import { Header, Footer, BookingWidget } from '@/components/organisms';
import { HeroSection, RoomsSection, OffersGrid } from '@/components/sections';
import { Counter, SplitText, ParallaxLayer } from '@/components/animations';
import { Grain, ImageTilt } from '@/components/effects';

// Utilities
import { cn, formatPrice, formatDate } from '@/lib/utils';
import { rooms, getRoomBySlug, menuSections } from '@/lib/data';
import { footerData, aboutData } from '@/lib/data/static-content';

// Motion
import {
  fadeInUp, staggerContainer, defaultViewport,
  duration, easeOutExpo, stagger
} from '@/lib/motion';

// Analytics
import { trackViewContent, trackStartBooking, useABTest } from '@/lib/analytics';

// SEO
import { generateHotelSchema, toJsonLd, homeMetadata } from '@/lib/seo';

// Accessibility
import { useReducedMotion, useFocusTrap, useEscapeKey } from '@/lib/accessibility';

// Media
import { generateSrcSet, getImageLoadingStrategy, ASPECT_RATIOS } from '@/lib/media';
```

### 11.2 Common Patterns

#### Page Template
```typescript
// app/[page]/page.tsx
import { Header, Footer } from '@/components/organisms';
import { Breadcrumbs } from '@/components/molecules';
import { HeroSection, ContentSection } from '@/components/sections';

export const metadata = {
  title: 'Page Title | Grand Hotel Opduin',
  description: '...',
};

export default function Page() {
  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Page' }]} />
        <HeroSection {...heroProps} />
        <ContentSection />
      </main>
      <Footer />
    </>
  );
}
```

#### Client Component with Animation
```typescript
'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, defaultViewport } from '@/lib/motion';
import { useReducedMotion } from '@/lib/accessibility';

export function AnimatedSection({ children }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={prefersReducedMotion ? {} : fadeInUp}
        >
          {child}
        </motion.div>
      ))}
    </motion.section>
  );
}
```

#### Form with Analytics
```typescript
'use client';

import { trackFormInteraction } from '@/lib/analytics';
import { useAnnouncer } from '@/lib/accessibility';

export function BookingForm() {
  const announce = useAnnouncer();

  const handleSubmit = async (data) => {
    trackFormInteraction('booking', 'submit');
    try {
      await submitBooking(data);
      trackFormInteraction('booking', 'success');
      announce('Booking confirmed!', { priority: 'assertive' });
    } catch (error) {
      trackFormInteraction('booking', 'error', { errorMessage: error.message });
      announce('Error: ' + error.message, { priority: 'assertive' });
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 11.3 File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `HeroSection.tsx` |
| Pages | lowercase | `page.tsx` |
| Utilities | camelCase.ts | `utils.ts` |
| Types | camelCase.ts | `global-settings.ts` |
| Schemas | kebab-case.json | `offer.schema.json` |
| Barrel exports | index.ts | `index.ts` |

### 11.4 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.grandhoteloduin.nl
```

---

## Summary Stats

| Category | Count |
|----------|-------|
| Total Components | 75 TSX |
| Pages | 13 |
| Animation Variants | 60+ |
| Strapi Schemas | 11+ |
| Strapi Components | 22+ |
| Utility Hooks | 10+ |
| Color Palettes | 6 |
| Tracking Events | 9+ |

---

*This documentation is auto-generated and should be updated when significant architecture changes occur.*
