import type { Config } from "tailwindcss";

/**
 * Grand Hotel Opduin - Premium Design System v2
 * "Hamptons of the Wadden" - Luxury coastal aesthetic
 *
 * Primary Colors:
 * - Sand #F5E9DA (warm backgrounds)
 * - Deep Sea #0E2A3A (dark sections, footer)
 * - Gold #C9A646 (accent, CTAs)
 * - Ink #141414 (primary text)
 * - Neutral #FAFAF7 (light backgrounds)
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============================================
      // COLOR SYSTEM - Hamptons of the Wadden
      // ============================================
      colors: {
        // Sand - Warm honey-golden backgrounds (primary brand)
        sand: {
          50: "#FEFDFB",
          100: "#FCF9F4",
          200: "#F9F3E8",
          300: "#F5EBDA", // Warm honey sand
          400: "#EDDCBF",
          500: "#DECA9F",
          600: "#C9B17A",
          700: "#A8915C",
          800: "#857346",
          900: "#625535",
          DEFAULT: "#F5EBDA",
        },
        // Driftwood - Warm dark for sections (replacing cold deepsea)
        deepsea: {
          50: "#F5F3F1",
          100: "#E8E4E0",
          200: "#D1CAC2",
          300: "#B5AAA0",
          400: "#958878",
          500: "#756758",
          600: "#5A4E42",
          700: "#453D33",
          800: "#352F28", // Warm driftwood dark
          900: "#252119",
          950: "#15120E",
          DEFAULT: "#352F28",
        },
        // Accent Gold - CTAs, highlights
        gold: {
          50: "#FCF9F0",
          100: "#F9F2DC",
          200: "#F2E4B8",
          300: "#E8D28E",
          400: "#DCBD62",
          500: "#C9A646", // Brand primary
          600: "#A88A35",
          700: "#836B2A",
          800: "#5E4D1F",
          900: "#3A3014",
          DEFAULT: "#C9A646",
        },
        // Ink - Primary text
        ink: {
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#CCCCCC",
          300: "#A3A3A3",
          400: "#737373",
          500: "#525252",
          600: "#3D3D3D",
          700: "#292929",
          800: "#1F1F1F",
          900: "#141414", // Brand primary
          950: "#0A0A0A",
          DEFAULT: "#141414",
        },
        // Neutral - Light backgrounds
        neutral: {
          50: "#FFFFFF",
          100: "#FEFEFE",
          200: "#FCFCFB",
          300: "#FAFAF7", // Brand primary
          400: "#F5F5F2",
          500: "#EBEBEA",
          600: "#D4D4D3",
          700: "#A3A3A2",
          800: "#737372",
          900: "#525251",
          DEFAULT: "#FAFAF7",
        },
        // Shell - Legacy warm accent (for backward compatibility)
        shell: {
          50: "#FAFAF8",
          100: "#F5F4F1",
          200: "#E8E6E0",
          300: "#D4D0C6",
          400: "#BFB9AB",
          500: "#a79f88",
          600: "#918A74",
          700: "#7A7461",
          800: "#635E4F",
          900: "#4D493D",
          DEFAULT: "#a79f88",
        },
        // Navy - Warm brown (replacing cold blue)
        navy: {
          50: "#F7F5F3",
          100: "#EBE6E1",
          200: "#D6CCC2",
          300: "#BDAE9E",
          400: "#9C8A76",
          500: "#7A6B5A",
          600: "#5F5347",
          700: "#4A4139",
          800: "#38322C",
          900: "#282420",
          DEFAULT: "#4A4139",
        },
        // Cream - Card backgrounds (legacy)
        cream: {
          50: "#FFFFFF",
          100: "#FEFEFE",
          200: "#FCFCFB",
          300: "#FAFAF8",
          DEFAULT: "#FEFEFE",
        },
        // Semantic Colors
        success: {
          light: "#E8F5E9",
          DEFAULT: "#4CAF50",
          dark: "#2E7D32",
        },
        warning: {
          light: "#FFF8E1",
          DEFAULT: "#FFC107",
          dark: "#F57F17",
        },
        error: {
          light: "#FFEBEE",
          DEFAULT: "#F44336",
          dark: "#C62828",
        },
      },

      // ============================================
      // TYPOGRAPHY - Luxury serif + Humanist sans
      // ============================================
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        numeric: ["var(--font-inter)", "tabular-nums", "sans-serif"],
      },
      fontSize: {
        // Fluid Display Scale (clamp-based)
        "display-hero": ["clamp(3.5rem, 8vw, 6rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-2xl": ["clamp(3rem, 7vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        // Body Scale
        "body-xl": ["1.25rem", { lineHeight: "1.6" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "body-xs": ["0.75rem", { lineHeight: "1.5" }],
        // Special
        overline: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.12em" }],
        caption: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        price: ["1.5rem", { lineHeight: "1.2", fontVariantNumeric: "tabular-nums" }],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.12em",
        luxury: "0.2em",
        caps: "0.15em",
      },

      // ============================================
      // SPACING - Modular scale (48/64/96 for sections)
      // Desktop: 96px max, Mobile: 64px
      // ============================================
      spacing: {
        // Base scale
        "4.5": "1.125rem", // 18px
        "13": "3.25rem", // 52px
        "15": "3.75rem", // 60px
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "24": "6rem", // 96px - section max
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
        // Section spacing (compact per redesign)
        "section-xs": "clamp(1.5rem, 3vw, 2rem)",    // 24-32px internal
        "section-sm": "clamp(3rem, 5vw, 4rem)",      // 48-64px
        "section-md": "clamp(4rem, 6vw, 6rem)",      // 64-96px
        "section-lg": "clamp(4rem, 8vw, 6rem)",      // 64-96px (was 144px)
        "section-hero": "clamp(6rem, 10vw, 8rem)",   // Hero stays spacious
        // Block spacing (internal)
        "block-sm": "1.5rem",  // 24px
        "block-md": "2rem",    // 32px
        "block-lg": "3rem",    // 48px
        // Gutters (responsive)
        "gutter-sm": "clamp(1rem, 2vw, 1.5rem)",
        gutter: "clamp(1.5rem, 4vw, 4rem)",
        "gutter-lg": "clamp(3rem, 6vw, 6rem)",
      },

      // ============================================
      // MOTION - 120-600ms with premium easing
      // ============================================
      transitionDuration: {
        "75": "75ms",
        "120": "120ms",
        "150": "150ms",
        "180": "180ms",
        "200": "200ms",
        "240": "240ms",
        "300": "300ms",
        "400": "400ms",
        "450": "450ms",
        "500": "500ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      transitionTimingFunction: {
        "premium-in": "cubic-bezier(0.22, 1, 0.36, 1)",
        "premium-out": "cubic-bezier(0.33, 1, 0.68, 1)",
        "premium-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.5" },
        },
      },
      animation: {
        "fade-in": "fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-up": "fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-down": "fade-down 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slide-up 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-down": "slide-down 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },

      // ============================================
      // ELEVATION - Premium shadows with brand tint
      // ============================================
      boxShadow: {
        "elevation-1": "0 1px 2px rgba(14, 42, 58, 0.04), 0 1px 3px rgba(14, 42, 58, 0.08)",
        "elevation-2": "0 2px 4px rgba(14, 42, 58, 0.04), 0 4px 8px rgba(14, 42, 58, 0.08)",
        "elevation-3": "0 4px 8px rgba(14, 42, 58, 0.04), 0 8px 24px rgba(14, 42, 58, 0.08)",
        "elevation-4": "0 8px 16px rgba(14, 42, 58, 0.06), 0 16px 48px rgba(14, 42, 58, 0.12)",
        "elevation-5": "0 12px 24px rgba(14, 42, 58, 0.08), 0 24px 64px rgba(14, 42, 58, 0.16)",
        "inner-soft": "inset 0 2px 4px rgba(14, 42, 58, 0.06)",
        "glow-gold": "0 0 20px rgba(201, 166, 70, 0.3), 0 0 40px rgba(201, 166, 70, 0.15)",
        "glow-sand": "0 0 20px rgba(245, 233, 218, 0.5), 0 0 40px rgba(245, 233, 218, 0.25)",
        "focus-ring": "0 0 0 2px #C9A646, 0 0 0 4px rgba(201, 166, 70, 0.25)",
        "focus-ring-deepsea": "0 0 0 2px #0E2A3A, 0 0 0 4px rgba(14, 42, 58, 0.25)",
        // Neomorphism shadows
        "neo-sm": "4px 4px 10px rgba(0, 0, 0, 0.05), -4px -4px 10px rgba(255, 255, 255, 0.8)",
        "neo-md": "6px 6px 16px rgba(0, 0, 0, 0.06), -6px -6px 16px rgba(255, 255, 255, 0.9)",
        "neo-lg": "10px 10px 24px rgba(0, 0, 0, 0.07), -10px -10px 24px rgba(255, 255, 255, 0.95)",
        "neo-xl": "14px 14px 32px rgba(0, 0, 0, 0.08), -14px -14px 32px rgba(255, 255, 255, 1)",
        "neo-inset": "inset 2px 2px 6px rgba(0, 0, 0, 0.04), inset -2px -2px 6px rgba(255, 255, 255, 0.7)",
        "neo-btn": "4px 4px 12px rgba(0, 0, 0, 0.1)",
      },

      // ============================================
      // LAYOUT
      // ============================================
      maxWidth: {
        "content-xs": "480px",
        "content-sm": "640px",
        "content-md": "768px",
        "content-lg": "1024px",
        "content-xl": "1280px",
        "content-2xl": "1440px",
        "content-3xl": "1600px",
        prose: "65ch",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "16/9": "16 / 9",
        "21/9": "21 / 9",
        hero: "16 / 7",
        card: "4 / 5",
        room: "3 / 2",
        portrait: "3 / 4",
        square: "1 / 1",
        wide: "2 / 1",
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      zIndex: {
        behind: "-1",
        base: "0",
        dropdown: "30",
        drawer: "40",
        modal: "50",
        popover: "60",
        tooltip: "70",
        toast: "80",
        overlay: "90",
        max: "100",
      },

      // ============================================
      // BACKDROP & BLUR
      // ============================================
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
        // Glass system blurs
        "glass-sm": "6px",
        "glass-md": "10px",
        "glass-lg": "14px",
      },

      // ============================================
      // GLASSMORPHISM SYSTEM - "Calm Premium Glass"
      // ============================================
      // Usage: Apply via CSS classes defined in globals.css
      // glass-100: Light glass (0.68 opacity, 6px blur)
      // glass-200: Medium glass (0.76 opacity, 10px blur)
      // glass-300: Heavy glass (0.84 opacity, 14px blur)
      // glass-white: Hero/Section overlay (0.72 opacity, 6-12px blur)

      // ============================================
      // GRID
      // ============================================
      gridTemplateColumns: {
        "auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fill-250": "repeat(auto-fill, minmax(250px, 1fr))",
        "auto-fill-300": "repeat(auto-fill, minmax(300px, 1fr))",
        "auto-fit-200": "repeat(auto-fit, minmax(200px, 1fr))",
        "auto-fit-250": "repeat(auto-fit, minmax(250px, 1fr))",
        "auto-fit-300": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [
    // ============================================
    // ACCESSIBILITY UTILITIES PLUGIN
    // ============================================
    function({ addUtilities, addComponents }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void; addComponents: (components: Record<string, Record<string, string | Record<string, string>>>) => void }) {
      // Tap target utilities (WCAG 44x44px minimum)
      addUtilities({
        '.tap-target': {
          'min-width': '44px',
          'min-height': '44px',
        },
        '.tap-target-comfortable': {
          'min-width': '48px',
          'min-height': '48px',
        },
        '.tap-target-large': {
          'min-width': '56px',
          'min-height': '56px',
        },
      });

      // Focus visible utilities
      addUtilities({
        '.focus-visible-ring': {
          'outline': 'none',
        },
        '.focus-visible-ring:focus-visible': {
          'outline': '2px solid #C9A646',
          'outline-offset': '2px',
        },
        '.focus-visible-ring-deepsea:focus-visible': {
          'outline': '2px solid #0E2A3A',
          'outline-offset': '2px',
        },
        '.focus-visible-ring-inset:focus-visible': {
          'outline': '2px solid #C9A646',
          'outline-offset': '-2px',
        },
      });

      // Screen reader only (visible when focused for skip links)
      addUtilities({
        '.sr-only-focusable': {
          'position': 'absolute',
          'width': '1px',
          'height': '1px',
          'padding': '0',
          'margin': '-1px',
          'overflow': 'hidden',
          'clip': 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border': '0',
        },
        '.sr-only-focusable:focus': {
          'position': 'static',
          'width': 'auto',
          'height': 'auto',
          'margin': '0',
          'overflow': 'visible',
          'clip': 'auto',
          'white-space': 'normal',
        },
      });

      // Reduced motion utilities
      addUtilities({
        '.motion-safe': {},
        '.motion-reduce': {
          'animation-duration': '0.01ms !important',
          'animation-iteration-count': '1 !important',
          'transition-duration': '0.01ms !important',
        },
      });

      // High contrast mode support
      addUtilities({
        '.contrast-safe-border': {
          'border': '1px solid transparent',
        },
      });

      // Accessible components
      addComponents({
        // Skip link component
        '.skip-link': {
          'position': 'absolute',
          'top': '-100%',
          'left': '50%',
          'transform': 'translateX(-50%)',
          'z-index': '100',
          'padding': '1rem 2rem',
          'background-color': '#0E2A3A',
          'color': '#FFFFFF',
          'font-weight': '600',
          'text-decoration': 'none',
          'border-radius': '0 0 0.5rem 0.5rem',
          'transition': 'top 0.3s ease',
        },
        '.skip-link:focus': {
          'top': '0',
        },
        // Visually hidden but accessible
        '.visually-hidden': {
          'position': 'absolute',
          'width': '1px',
          'height': '1px',
          'padding': '0',
          'margin': '-1px',
          'overflow': 'hidden',
          'clip': 'rect(0, 0, 0, 0)',
          'white-space': 'nowrap',
          'border': '0',
        },
        // Focus indicator for images/cards
        '.focus-within-ring': {
          'outline': 'none',
        },
        '.focus-within-ring:focus-within': {
          'outline': '2px solid #C9A646',
          'outline-offset': '4px',
          'border-radius': '0.5rem',
        },
      });
    },
  ],
};

export default config;
