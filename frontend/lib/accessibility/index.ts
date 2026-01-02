/**
 * Accessibility Module
 * Grand Hotel Opduin - WCAG AA+ Compliance
 */

// Hooks
export {
  useReducedMotion,
  useFocusVisible,
  useAnnouncer,
  useEscapeKey,
  useArrowNavigation,
  useRovingTabIndex,
  useScrollLock,
  useMediaQuery,
  usePrefersColorScheme,
  useInert,
} from './hooks';

// Focus Trap
export {
  getFocusableElements,
  getFirstFocusable,
  getLastFocusable,
  useFocusTrap,
  createFocusScope,
  useFocusRestoration,
  useFocusWithin,
  initFocusVisible,
  isFocusVisible,
  handleSkipLink,
} from './focus-trap';
