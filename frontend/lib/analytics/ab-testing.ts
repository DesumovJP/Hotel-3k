/**
 * A/B Testing Framework
 * Grand Hotel Opduin - Experiment Management
 */

import { trackEvent } from './events';

// ============================================
// TEST DEFINITIONS
// ============================================

export interface ABTest {
  id: string;
  name: string;
  variants: string[];
  weights?: number[]; // Default: equal distribution
  active: boolean;
}

export const AB_TESTS: Record<string, ABTest> = {
  cta_variants: {
    id: 'cta_v1',
    name: 'CTA Button Text',
    variants: ['check_availability', 'book_now', 'reserve_room', 'explore_rooms'],
    active: true,
  },
  hero_media: {
    id: 'hero_v1',
    name: 'Hero Media Type',
    variants: ['video', 'image', 'carousel'],
    active: true,
  },
  benefits_order: {
    id: 'benefits_v1',
    name: 'Benefits Section Order',
    variants: ['rooms_first', 'wellness_first', 'dining_first', 'location_first'],
    active: true,
  },
  booking_widget_style: {
    id: 'booking_v1',
    name: 'Booking Widget Style',
    variants: ['inline', 'modal', 'sticky'],
    active: true,
  },
  room_card_layout: {
    id: 'room_card_v1',
    name: 'Room Card Layout',
    variants: ['horizontal', 'vertical', 'featured'],
    active: false,
  },
};

// ============================================
// COOKIE UTILITIES
// ============================================

const COOKIE_NAME = 'gho_ab_tests';
const COOKIE_EXPIRY_DAYS = 30;

interface ABTestAssignments {
  [testId: string]: string;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

function getAssignments(): ABTestAssignments {
  const cookie = getCookie(COOKIE_NAME);
  if (!cookie) return {};

  try {
    return JSON.parse(decodeURIComponent(cookie));
  } catch {
    return {};
  }
}

function saveAssignments(assignments: ABTestAssignments): void {
  setCookie(COOKIE_NAME, encodeURIComponent(JSON.stringify(assignments)), COOKIE_EXPIRY_DAYS);
}

// ============================================
// VARIANT SELECTION
// ============================================

function selectVariant(test: ABTest): string {
  const { variants, weights } = test;

  // Use equal weights if not specified
  const effectiveWeights = weights || variants.map(() => 1 / variants.length);

  // Normalize weights
  const totalWeight = effectiveWeights.reduce((sum, w) => sum + w, 0);
  const normalizedWeights = effectiveWeights.map((w) => w / totalWeight);

  // Random selection based on weights
  const random = Math.random();
  let cumulative = 0;

  for (let i = 0; i < variants.length; i++) {
    cumulative += normalizedWeights[i];
    if (random < cumulative) {
      return variants[i];
    }
  }

  return variants[variants.length - 1];
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Get or assign a variant for an A/B test
 */
export function getVariant(testKey: string): string | null {
  const test = AB_TESTS[testKey];
  if (!test || !test.active) return null;

  const assignments = getAssignments();

  // Return existing assignment if present
  if (assignments[test.id]) {
    return assignments[test.id];
  }

  // Select and save new variant
  const variant = selectVariant(test);
  assignments[test.id] = variant;
  saveAssignments(assignments);

  // Track assignment event
  trackEvent({
    name: 'filter_change', // Reusing event type for experiment tracking
    params: {
      filter_type: 'ab_test_assignment',
      filter_value: `${test.id}:${variant}`,
    },
  });

  return variant;
}

/**
 * React hook for A/B test variant
 */
export function useABTest(testKey: string): string | null {
  // For SSR, return null (will be assigned on client)
  if (typeof window === 'undefined') return null;

  return getVariant(testKey);
}

/**
 * Check if user is in a specific variant
 */
export function isVariant(testKey: string, variant: string): boolean {
  const currentVariant = getVariant(testKey);
  return currentVariant === variant;
}

/**
 * Force a specific variant (for testing/debugging)
 */
export function forceVariant(testKey: string, variant: string): void {
  const test = AB_TESTS[testKey];
  if (!test) return;

  const assignments = getAssignments();
  assignments[test.id] = variant;
  saveAssignments(assignments);
}

/**
 * Clear all test assignments (reset user)
 */
export function clearAssignments(): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/**
 * Get all current assignments
 */
export function getAllAssignments(): ABTestAssignments {
  return getAssignments();
}

// ============================================
// CTA VARIANT HELPERS
// ============================================

export type CTAVariant = 'check_availability' | 'book_now' | 'reserve_room' | 'explore_rooms';

export const CTA_LABELS: Record<CTAVariant, string> = {
  check_availability: 'Check Availability',
  book_now: 'Book Now',
  reserve_room: 'Reserve Your Room',
  explore_rooms: 'Explore Rooms',
};

export function getCTALabel(): string {
  const variant = getVariant('cta_variants') as CTAVariant | null;
  return variant ? CTA_LABELS[variant] : CTA_LABELS.book_now;
}

// ============================================
// HERO MEDIA VARIANT HELPERS
// ============================================

export type HeroMediaVariant = 'video' | 'image' | 'carousel';

export function getHeroMediaType(): HeroMediaVariant {
  const variant = getVariant('hero_media') as HeroMediaVariant | null;
  return variant || 'image';
}

// ============================================
// BENEFITS ORDER VARIANT HELPERS
// ============================================

export type BenefitsOrderVariant = 'rooms_first' | 'wellness_first' | 'dining_first' | 'location_first';

export const BENEFITS_ORDER: Record<BenefitsOrderVariant, string[]> = {
  rooms_first: ['rooms', 'wellness', 'dining', 'location'],
  wellness_first: ['wellness', 'rooms', 'dining', 'location'],
  dining_first: ['dining', 'rooms', 'wellness', 'location'],
  location_first: ['location', 'rooms', 'wellness', 'dining'],
};

export function getBenefitsOrder(): string[] {
  const variant = getVariant('benefits_order') as BenefitsOrderVariant | null;
  return variant ? BENEFITS_ORDER[variant] : BENEFITS_ORDER.rooms_first;
}
