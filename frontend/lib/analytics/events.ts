/**
 * Analytics Event Tracking System
 * Grand Hotel Opduin - Conversion & Engagement Tracking
 */

// ============================================
// EVENT TYPE DEFINITIONS
// ============================================

export type ContentType =
  | 'room'
  | 'offer'
  | 'restaurant'
  | 'wellness'
  | 'blog'
  | 'page';

export type BookingSource =
  | 'hero_cta'
  | 'room_card'
  | 'offer_card'
  | 'sticky_header'
  | 'quick_booking'
  | 'room_detail';

export type UpsellType =
  | 'room_upgrade'
  | 'breakfast'
  | 'spa_treatment'
  | 'restaurant_reservation'
  | 'late_checkout'
  | 'early_checkin'
  | 'parking'
  | 'airport_transfer';

// ============================================
// EVENT INTERFACES
// ============================================

export interface ViewContentEvent {
  name: 'view_content';
  params: {
    content_type: ContentType;
    content_id: string;
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  };
}

export interface StartBookingEvent {
  name: 'start_booking';
  params: {
    room_id?: string;
    room_name?: string;
    source: BookingSource;
    value?: number;
  };
}

export interface SelectDatesEvent {
  name: 'select_dates';
  params: {
    check_in: string;
    check_out: string;
    nights: number;
    guests?: number;
  };
}

export interface SelectRoomEvent {
  name: 'select_room';
  params: {
    room_id: string;
    room_name: string;
    room_category: string;
    price: number;
    currency: string;
    nights: number;
  };
}

export interface AddUpsellEvent {
  name: 'add_upsell';
  params: {
    upsell_type: UpsellType;
    upsell_id: string;
    upsell_name: string;
    value: number;
    currency: string;
  };
}

export interface CompleteBookingEvent {
  name: 'complete_booking';
  params: {
    booking_id: string;
    total_value: number;
    currency: string;
    rooms: number;
    nights: number;
    guests: number;
    upsells: string[];
    payment_method?: string;
  };
}

export interface FilterChangeEvent {
  name: 'filter_change';
  params: {
    filter_type: string;
    filter_value: string;
    results_count?: number;
  };
}

export interface GalleryInteractionEvent {
  name: 'gallery_interaction';
  params: {
    action: 'open' | 'close' | 'next' | 'previous' | 'thumbnail_click';
    gallery_name: string;
    image_index?: number;
  };
}

export interface FormInteractionEvent {
  name: 'form_interaction';
  params: {
    form_name: string;
    action: 'start' | 'field_focus' | 'field_blur' | 'error' | 'submit' | 'success';
    field_name?: string;
    error_message?: string;
  };
}

export type AnalyticsEvent =
  | ViewContentEvent
  | StartBookingEvent
  | SelectDatesEvent
  | SelectRoomEvent
  | AddUpsellEvent
  | CompleteBookingEvent
  | FilterChangeEvent
  | GalleryInteractionEvent
  | FormInteractionEvent;

// ============================================
// GTM DATAAYER TYPES
// ============================================

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ============================================
// TRACKING FUNCTIONS
// ============================================

/**
 * Push event to GTM dataLayer and GA4
 */
export function trackEvent<T extends AnalyticsEvent>(event: T): void {
  // GTM dataLayer push
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: event.name,
      ...event.params,
      timestamp: new Date().toISOString(),
    });
  }

  // Google Analytics 4 event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.name, event.params);
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event.name, event.params);
  }
}

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

export function trackViewContent(
  contentType: ContentType,
  contentId: string,
  options?: { name?: string; category?: string; value?: number }
): void {
  trackEvent({
    name: 'view_content',
    params: {
      content_type: contentType,
      content_id: contentId,
      content_name: options?.name,
      content_category: options?.category,
      value: options?.value,
      currency: options?.value ? 'EUR' : undefined,
    },
  });
}

export function trackStartBooking(
  source: BookingSource,
  options?: { roomId?: string; roomName?: string; value?: number }
): void {
  trackEvent({
    name: 'start_booking',
    params: {
      source,
      room_id: options?.roomId,
      room_name: options?.roomName,
      value: options?.value,
    },
  });
}

export function trackSelectDates(
  checkIn: Date,
  checkOut: Date,
  guests?: number
): void {
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  trackEvent({
    name: 'select_dates',
    params: {
      check_in: checkIn.toISOString().split('T')[0],
      check_out: checkOut.toISOString().split('T')[0],
      nights,
      guests,
    },
  });
}

export function trackSelectRoom(
  roomId: string,
  roomName: string,
  roomCategory: string,
  price: number,
  nights: number
): void {
  trackEvent({
    name: 'select_room',
    params: {
      room_id: roomId,
      room_name: roomName,
      room_category: roomCategory,
      price,
      currency: 'EUR',
      nights,
    },
  });
}

export function trackAddUpsell(
  upsellType: UpsellType,
  upsellId: string,
  upsellName: string,
  value: number
): void {
  trackEvent({
    name: 'add_upsell',
    params: {
      upsell_type: upsellType,
      upsell_id: upsellId,
      upsell_name: upsellName,
      value,
      currency: 'EUR',
    },
  });
}

export function trackCompleteBooking(
  bookingId: string,
  totalValue: number,
  rooms: number,
  nights: number,
  guests: number,
  upsells: string[] = [],
  paymentMethod?: string
): void {
  trackEvent({
    name: 'complete_booking',
    params: {
      booking_id: bookingId,
      total_value: totalValue,
      currency: 'EUR',
      rooms,
      nights,
      guests,
      upsells,
      payment_method: paymentMethod,
    },
  });
}

export function trackGalleryInteraction(
  action: GalleryInteractionEvent['params']['action'],
  galleryName: string,
  imageIndex?: number
): void {
  trackEvent({
    name: 'gallery_interaction',
    params: {
      action,
      gallery_name: galleryName,
      image_index: imageIndex,
    },
  });
}

export function trackFormInteraction(
  formName: string,
  action: FormInteractionEvent['params']['action'],
  options?: { fieldName?: string; errorMessage?: string }
): void {
  trackEvent({
    name: 'form_interaction',
    params: {
      form_name: formName,
      action,
      field_name: options?.fieldName,
      error_message: options?.errorMessage,
    },
  });
}
