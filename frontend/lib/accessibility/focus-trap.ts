/**
 * Focus Trap Utilities
 * Grand Hotel Opduin - Keyboard Navigation
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';

// ============================================
// FOCUSABLE ELEMENT SELECTORS
// ============================================

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
  return Array.from(elements).filter((el) => {
    // Filter out hidden elements
    return el.offsetParent !== null && !el.hasAttribute('inert');
  });
}

/**
 * Get first focusable element in container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container);
  return elements[0] || null;
}

/**
 * Get last focusable element in container
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container);
  return elements[elements.length - 1] || null;
}

// ============================================
// FOCUS TRAP HOOK
// ============================================

interface FocusTrapOptions {
  initialFocus?: React.RefObject<HTMLElement | null>;
  returnFocus?: boolean;
  enabled?: boolean;
}

/**
 * Trap focus within a container (for modals, dialogs, etc.)
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  options: FocusTrapOptions = {}
): void {
  const { initialFocus, returnFocus = true, enabled = true } = options;
  const previousActiveElement = useRef<Element | null>(null);

  // Handle tab key navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!containerRef.current || event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab from first element -> move to last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab from last element -> move to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    },
    [containerRef]
  );

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    // Store current focus
    previousActiveElement.current = document.activeElement;

    // Set initial focus
    const container = containerRef.current;
    requestAnimationFrame(() => {
      if (initialFocus?.current) {
        initialFocus.current.focus();
      } else {
        const firstFocusable = getFirstFocusable(container);
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          // Make container focusable if no focusable children
          container.setAttribute('tabindex', '-1');
          container.focus();
        }
      }
    });

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Return focus on cleanup
      if (returnFocus && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [enabled, containerRef, initialFocus, returnFocus, handleKeyDown]);
}

// ============================================
// FOCUS SCOPE COMPONENT HELPERS
// ============================================

interface FocusScopeState {
  paused: boolean;
}

/**
 * Create a focus scope controller
 */
export function createFocusScope() {
  const state: FocusScopeState = {
    paused: false,
  };

  return {
    pause: () => {
      state.paused = true;
    },
    resume: () => {
      state.paused = false;
    },
    isPaused: () => state.paused,
  };
}

// ============================================
// FOCUS RESTORATION HOOK
// ============================================

/**
 * Save and restore focus (for temporary UI changes)
 */
export function useFocusRestoration(): {
  saveFocus: () => void;
  restoreFocus: () => void;
} {
  const savedElement = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      savedElement.current = document.activeElement;
    }
  }, []);

  const restoreFocus = useCallback(() => {
    if (savedElement.current) {
      savedElement.current.focus();
      savedElement.current = null;
    }
  }, []);

  return { saveFocus, restoreFocus };
}

// ============================================
// FOCUS WITHIN HOOK
// ============================================

/**
 * Track if focus is within a container
 */
export function useFocusWithin(
  containerRef: React.RefObject<HTMLElement | null>
): boolean {
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleFocusIn = () => setIsFocusWithin(true);
    const handleFocusOut = (event: FocusEvent) => {
      // Check if new focus target is outside container
      if (!container.contains(event.relatedTarget as Node)) {
        setIsFocusWithin(false);
      }
    };

    container.addEventListener('focusin', handleFocusIn);
    container.addEventListener('focusout', handleFocusOut);

    return () => {
      container.removeEventListener('focusin', handleFocusIn);
      container.removeEventListener('focusout', handleFocusOut);
    };
  }, [containerRef]);

  return isFocusWithin;
}

// Need to import useState for useFocusWithin
import { useState } from 'react';

// ============================================
// FOCUS VISIBLE MANAGER
// ============================================

let focusVisibleState = false;

/**
 * Initialize focus visible tracking (call once in app)
 */
export function initFocusVisible(): void {
  if (typeof window === 'undefined') return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      focusVisibleState = true;
      document.body.classList.add('focus-visible-active');
    }
  };

  const handleMouseDown = () => {
    focusVisibleState = false;
    document.body.classList.remove('focus-visible-active');
  };

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('mousedown', handleMouseDown);
}

/**
 * Check if focus should be visible
 */
export function isFocusVisible(): boolean {
  return focusVisibleState;
}

// ============================================
// SKIP LINK HELPER
// ============================================

/**
 * Handle skip link navigation
 */
export function handleSkipLink(targetId: string): void {
  const target = document.getElementById(targetId);
  if (!target) return;

  // Make target focusable if not already
  if (!target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
  }

  target.focus();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
