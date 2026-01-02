/**
 * Accessibility Hooks
 * Grand Hotel Opduin - WCAG AA+ Compliance
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

// ============================================
// REDUCED MOTION HOOK
// ============================================

/**
 * Detect user's motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// ============================================
// FOCUS VISIBLE HOOK
// ============================================

/**
 * Detect if focus should be visible (keyboard navigation)
 * Returns true if user is navigating via keyboard
 */
export function useFocusVisible(): boolean {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isFocusVisible;
}

// ============================================
// LIVE ANNOUNCER HOOK
// ============================================

type AriaLive = 'polite' | 'assertive' | 'off';

interface AnnouncerOptions {
  priority?: AriaLive;
  clearAfter?: number;
}

/**
 * Announce messages to screen readers
 */
export function useAnnouncer(): (message: string, options?: AnnouncerOptions) => void {
  const regionRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Create live region if not exists
    let region = document.getElementById('a11y-announcer') as HTMLDivElement | null;

    if (!region) {
      region = document.createElement('div');
      region.id = 'a11y-announcer';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      region.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      `;
      document.body.appendChild(region);
    }

    regionRef.current = region;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const announce = useCallback((message: string, options: AnnouncerOptions = {}) => {
    const { priority = 'polite', clearAfter = 5000 } = options;

    if (!regionRef.current) return;

    // Update aria-live priority
    regionRef.current.setAttribute('aria-live', priority);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear and set new message (forces announcement)
    regionRef.current.textContent = '';
    requestAnimationFrame(() => {
      if (regionRef.current) {
        regionRef.current.textContent = message;
      }
    });

    // Clear after delay
    if (clearAfter > 0) {
      timeoutRef.current = setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.textContent = '';
        }
      }, clearAfter);
    }
  }, []);

  return announce;
}

// ============================================
// ESCAPE KEY HOOK
// ============================================

/**
 * Handle Escape key press
 */
export function useEscapeKey(callback: () => void, enabled: boolean = true): void {
  useEffect(() => {
    if (!enabled) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, enabled]);
}

// ============================================
// ARROW NAVIGATION HOOK
// ============================================

interface ArrowNavigationOptions {
  orientation?: 'horizontal' | 'vertical' | 'both';
  loop?: boolean;
  onNavigate?: (index: number) => void;
}

/**
 * Handle arrow key navigation for lists/grids
 */
export function useArrowNavigation(
  itemsCount: number,
  options: ArrowNavigationOptions = {}
): {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
} {
  const { orientation = 'both', loop = true, onNavigate } = options;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      let newIndex = currentIndex;

      const isHorizontal = orientation === 'horizontal' || orientation === 'both';
      const isVertical = orientation === 'vertical' || orientation === 'both';

      switch (event.key) {
        case 'ArrowRight':
          if (isHorizontal) {
            event.preventDefault();
            newIndex = currentIndex + 1;
          }
          break;
        case 'ArrowLeft':
          if (isHorizontal) {
            event.preventDefault();
            newIndex = currentIndex - 1;
          }
          break;
        case 'ArrowDown':
          if (isVertical) {
            event.preventDefault();
            newIndex = currentIndex + 1;
          }
          break;
        case 'ArrowUp':
          if (isVertical) {
            event.preventDefault();
            newIndex = currentIndex - 1;
          }
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = itemsCount - 1;
          break;
        default:
          return;
      }

      // Handle loop or clamp
      if (loop) {
        newIndex = ((newIndex % itemsCount) + itemsCount) % itemsCount;
      } else {
        newIndex = Math.max(0, Math.min(itemsCount - 1, newIndex));
      }

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        onNavigate?.(newIndex);
      }
    },
    [currentIndex, itemsCount, orientation, loop, onNavigate]
  );

  return { currentIndex, setCurrentIndex, handleKeyDown };
}

// ============================================
// ROVING TABINDEX HOOK
// ============================================

/**
 * Implement roving tabindex pattern for composite widgets
 */
export function useRovingTabIndex<T extends HTMLElement>(
  itemsCount: number
): {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  getTabIndex: (index: number) => 0 | -1;
  itemRefs: React.MutableRefObject<(T | null)[]>;
  handleKeyDown: (event: React.KeyboardEvent, index: number) => void;
} {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(T | null)[]>([]);

  const getTabIndex = useCallback(
    (index: number): 0 | -1 => {
      return index === activeIndex ? 0 : -1;
    },
    [activeIndex]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      let newIndex = index;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          newIndex = (index + 1) % itemsCount;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          newIndex = (index - 1 + itemsCount) % itemsCount;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = itemsCount - 1;
          break;
        default:
          return;
      }

      setActiveIndex(newIndex);
      itemRefs.current[newIndex]?.focus();
    },
    [itemsCount]
  );

  return { activeIndex, setActiveIndex, getTabIndex, itemRefs, handleKeyDown };
}

// ============================================
// SCROLL LOCK HOOK
// ============================================

/**
 * Lock body scroll (for modals, drawers)
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
}

// ============================================
// MEDIA QUERY HOOK
// ============================================

/**
 * Listen to media query changes
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ============================================
// PREFERS COLOR SCHEME HOOK
// ============================================

type ColorScheme = 'light' | 'dark';

/**
 * Detect user's color scheme preference
 */
export function usePrefersColorScheme(): ColorScheme {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return colorScheme;
}

// ============================================
// INERT POLYFILL HOOK
// ============================================

/**
 * Set inert attribute on elements outside modal/dialog
 */
export function useInert(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean): void {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const elementsToInert: Element[] = [];

    // Get all siblings and ancestors' siblings
    let current: HTMLElement | null = container;
    while (current && current !== document.body) {
      const parent: HTMLElement | null = current.parentElement;
      const currentElement = current;
      if (parent) {
        Array.from(parent.children).forEach((sibling) => {
          if (sibling !== currentElement && sibling instanceof HTMLElement) {
            if (!sibling.hasAttribute('inert')) {
              sibling.setAttribute('inert', '');
              elementsToInert.push(sibling);
            }
          }
        });
      }
      current = parent;
    }

    return () => {
      elementsToInert.forEach((element) => {
        element.removeAttribute('inert');
      });
    };
  }, [containerRef, isActive]);
}
