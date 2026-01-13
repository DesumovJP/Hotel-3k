import { Variants } from "framer-motion";

// ============================================
// UNIFIED TIMING SYSTEM - "Calm Premium Glass"
// Per redesign: 150-300ms range, surgical use only
// ============================================

// Duration scale (in seconds) - Optimized for native scroll (snappier)
export const duration = {
  instant: 0.1,    // 100ms - micro-interactions
  fast: 0.15,      // 150ms - hover states
  normal: 0.2,     // 200ms - standard transitions
  slow: 0.35,      // 350ms - content reveals
  slower: 0.45,    // 450ms - larger animations
  slowest: 0.6,    // 600ms - special hero reveals
} as const;

// Calm Premium easing - per redesign spec
export const easeCalmPremium = [0.22, 1, 0.36, 1] as const;

// Stagger scale (in seconds) - smoother cascades
export const stagger = {
  tight: 0.04,    // For characters
  normal: 0.08,   // For words, small items
  relaxed: 0.12,  // For cards, sections
  loose: 0.18,    // For large items
} as const;

// Delay scale (in seconds)
export const delay = {
  none: 0,
  short: 0.1,
  normal: 0.2,
  long: 0.4,
  longer: 0.6,
} as const;

// ============================================
// EASING FUNCTIONS
// ============================================

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;
export const easePremium = [0.25, 0.1, 0.25, 1] as const;
export const easeSnappy = [0.34, 1.56, 0.64, 1] as const; // Bouncy
export const easeSoft = [0.4, 0, 0.2, 1] as const;

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easeOutExpo },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOutQuint },
  },
};

export const fadeInUpSlow: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slower, ease: easeOutQuint },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOutQuint },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easeOutQuint },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easeOutQuint },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: easeOutExpo },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easeSnappy },
  },
};

export const scaleInRotate: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// ============================================
// BLUR ANIMATIONS - For variety
// ============================================

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const blurInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const blurInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// ============================================
// ROTATE ANIMATIONS - For variety
// ============================================

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -5, y: 20 },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// ============================================
// STAGGER CONTAINERS - Unified system
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: delay.short,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.relaxed,
      delayChildren: delay.normal,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.tight,
      delayChildren: delay.none,
    },
  },
};

// Bento grid - varied delays
export const staggerContainerBento: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: delay.short,
    },
  },
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

export const slideInFromBottom: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: duration.normal, ease: easeOutExpo },
  },
};

export const slideInFromTop: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const slideInFromLeft: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const slideInFromRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// ============================================
// CLIP/MASK REVEAL ANIMATIONS
// ============================================

export const clipRevealLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export const clipRevealRight: Variants = {
  hidden: { clipPath: "inset(0 0 0 100%)" },
  visible: {
    clipPath: "inset(0 0 0 0%)",
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export const clipRevealDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export const clipRevealCenter: Variants = {
  hidden: { clipPath: "inset(50% 50% 50% 50%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration.fast, ease: "easeIn" },
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: duration.fast, ease: easeOutExpo },
  },
};

export const cardHover3D = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: duration.fast },
  },
};

export const imageHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const imageHoverSubtle = {
  rest: { scale: 1.02 },
  hover: {
    scale: 1.08,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

export const linkHover = {
  rest: { width: "0%" },
  hover: {
    width: "100%",
    transition: { duration: duration.fast, ease: easeOutExpo },
  },
};

// ============================================
// TEXT REVEAL ANIMATIONS
// ============================================

export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * stagger.relaxed,
      duration: duration.normal,
      ease: easeOutExpo,
    },
  }),
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * stagger.tight,
      duration: duration.normal,
      ease: easeOutExpo,
    },
  }),
};

export const lineReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: duration.slow, ease: easeOutExpo },
  },
};

// ============================================
// ICON ANIMATIONS
// ============================================

export const iconBounce = {
  rest: { y: 0 },
  hover: {
    y: [-2, 2, -2],
    transition: {
      duration: duration.normal,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

export const iconWiggle = {
  rest: { rotate: 0 },
  hover: {
    rotate: [-5, 5, -5, 5, 0],
    transition: { duration: duration.normal },
  },
};

export const iconPulse = {
  rest: { scale: 1 },
  hover: {
    scale: [1, 1.2, 1],
    transition: { duration: duration.fast },
  },
};

export const iconSpin = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: { duration: duration.slow, ease: "linear" },
  },
};

// Arrow for CTAs
export const arrowSlide = {
  rest: { x: 0 },
  hover: {
    x: 5,
    transition: { duration: duration.fast, ease: easeOutExpo },
  },
};

// ============================================
// DECORATIVE ANIMATIONS
// ============================================

export const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export const lineGrowY: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: duration.slower, ease: easeOutExpo },
  },
};

export const dotPulse = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatY = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// SCROLL INDICATOR
// ============================================

export const scrollIndicator = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: delay.longer, duration: duration.slower },
  },
};

export const scrollLine = {
  animate: {
    y: [0, 8, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// VIEWPORT SETTINGS
// ============================================

export const defaultViewport = {
  once: true,
  amount: 0.2,
};

export const fullViewport = {
  once: true,
  amount: 0.5,
};

export const repeatViewport = {
  once: false,
  amount: 0.2,
};

export const earlyViewport = {
  once: true,
  amount: 0.1,
};

// ============================================
// TRANSITION PRESETS
// ============================================

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export const springBouncy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
};

export const smoothTransition = {
  duration: duration.slow,
  ease: easeOutExpo,
};

export const slowTransition = {
  duration: duration.slower,
  ease: easeOutExpo,
};

export const fastTransition = {
  duration: duration.fast,
  ease: easeOutExpo,
};

// ============================================
// REDUCED MOTION VARIANTS
// Automatically uses these when prefers-reduced-motion is set
// ============================================

export const reducedMotion = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  },
  static: {
    hidden: {},
    visible: {},
  },
};

// ============================================
// UTILITY: Create custom stagger container
// ============================================

export const createStaggerContainer = (
  childStagger: number = stagger.normal,
  childDelay: number = delay.short
): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: childStagger,
      delayChildren: childDelay,
    },
  },
});

// ============================================
// UTILITY: Create custom fade animation
// ============================================

export const createFadeInUp = (
  distance: number = 40,
  dur: number = duration.slow
): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur, ease: easeOutExpo },
  },
});

export const createFadeInDown = (
  distance: number = 40,
  dur: number = duration.slow
): Variants => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur, ease: easeOutExpo },
  },
});

export const createFadeInLeft = (
  distance: number = 60,
  dur: number = duration.slow
): Variants => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: dur, ease: easeOutExpo },
  },
});

export const createFadeInRight = (
  distance: number = 60,
  dur: number = duration.slow
): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: dur, ease: easeOutExpo },
  },
});
