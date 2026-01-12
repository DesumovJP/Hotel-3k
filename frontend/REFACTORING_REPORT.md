# Grand Hotel Opduin - Refactoring & Performance Optimization Report

**Date:** January 2026
**Project:** Next.js 16.1.1 Hotel Website
**Focus:** 120 FPS Performance, Code Quality, Architecture

---

## Executive Summary

This report provides a comprehensive audit of the Grand Hotel Opduin website codebase. The project is well-architected with a solid design system, but has several performance bottlenecks that prevent consistent 120 FPS rendering, particularly around:

1. **Excessive `backdrop-filter` usage** (50+ instances)
2. **Unoptimized animation patterns**
3. **Missing GPU acceleration hints**
4. **Image loading strategies**
5. **Component architecture inefficiencies**

---

## Table of Contents

1. [Performance Audit](#1-performance-audit)
2. [Page-by-Page Analysis](#2-page-by-page-analysis)
3. [Component Refactoring](#3-component-refactoring)
4. [CSS Optimization](#4-css-optimization)
5. [Animation Optimization](#5-animation-optimization)
6. [Image Optimization](#6-image-optimization)
7. [Architecture Improvements](#7-architecture-improvements)
8. [Priority Action Items](#8-priority-action-items)

---

## 1. Performance Audit

### 1.1 Critical Issues (High Priority)

#### `backdrop-filter` Overuse

**Problem:** 50+ instances of `backdrop-filter` across the codebase cause GPU compositing layer creation, leading to frame drops during scrolling.

**Files affected:**
- `globals.css` (14 backdrop-filter definitions)
- `Header.tsx` (header-glass class)
- `GalleryModal.tsx` (2 instances)
- `GalleryCinematic.tsx` (3 instances)
- `OffersGrid.tsx` (3 instances)
- `SectionHero.tsx` (1 instance)
- `HeroSection.tsx` (1 instance)
- `RoomsSection.tsx` (1 instance)
- `WellnessSection.tsx` (2 instances)
- `FloatingCTA.tsx` (1 instance)
- Multiple page files (rooms, offers, book)

**Recommended Fix:**
```css
/* Replace heavy backdrop-blur with solid backgrounds */
.glass-alternative {
  background: rgba(255, 255, 255, 0.95);
  /* Optionally add subtle shadow instead */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Or use backdrop-filter only for critical elements */
.backdrop-blur-critical {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  /* Force GPU layer */
  transform: translateZ(0);
  will-change: transform;
}
```

**Priority Classes to Replace:**
| Current Class | Replacement Strategy |
|--------------|---------------------|
| `backdrop-blur-sm` | Solid `bg-white/95` |
| `backdrop-blur-md` | Solid `bg-white/92` with shadow |
| `header-glass` | Keep (critical for UX) but optimize |
| `glass-100/200/300` | Replace with solid backgrounds |

---

### 1.2 Animation Performance

#### Framer Motion Overhead

**Problem:** Many components use `whileInView` animations on every scroll, causing re-renders.

**Files affected:**
- `DiscoverGrid.tsx` - 4 animated cards
- `RoomsSection.tsx` - Multiple room cards
- `HomeTestimonials.tsx` - Testimonial cards
- `GalleryCinematic.tsx` - Complex gallery animations
- `AboutPage` - 20+ animated sections

**Recommended Fix:**
```tsx
// Before (causes repaint on every scroll)
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>

// After (use CSS for simple animations)
<div className="animate-in fade-in slide-in-from-bottom-4">
```

**CSS-based animation alternative:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

---

### 1.3 will-change Misuse

**Problem:** `will-change` is set on elements that don't need it, wasting GPU memory.

**Current state in `globals.css`:**
```css
.transition-transform,
.transition-all {
  will-change: transform;
  backface-visibility: hidden;
}
```

**Issue:** This applies to ALL transition elements, not just those that need GPU acceleration.

**Fix:**
```css
/* Only apply to elements that actually animate transforms */
.will-animate-transform {
  will-change: transform;
  backface-visibility: hidden;
}

/* Apply specifically, not globally */
```

---

## 2. Page-by-Page Analysis

### 2.1 Homepage (`app/page.tsx`)

**Status:** Well-structured
**Performance Issues:**
- `HeroSection` has YouTube iframe embed (heavy)
- `DirectBookingBenefits` has multiple animated cards
- `HomeTestimonials` has Framer Motion animations on scroll

**Recommendations:**
1. Lazy-load YouTube iframe (intersection observer)
2. Use CSS scroll-driven animations for cards
3. Reduce motion complexity in `HeroSection`

---

### 2.2 About Page (`app/about/page.tsx`)

**Status:** 1,932 lines - needs refactoring
**Issues:**
- Monolithic file with all content inline
- 20+ separate `motion.div` animations
- Timeline, Team, Awards sections all in one file

**Recommendations:**
1. Extract sections into separate components:
   - `AboutTimeline.tsx`
   - `AboutTeam.tsx`
   - `AboutAwards.tsx`
   - `AboutSustainability.tsx`
2. Move data to `lib/data/about.ts` (already partially exists)
3. Use `React.memo()` for static content sections

---

### 2.3 Rooms Page (`app/rooms/page.tsx`)

**Status:** Good structure
**Performance Issues:**
- Floating CTA with `backdrop-blur-sm` on mobile
- FAQ accordion uses AnimatePresence (heavy for height animation)

**Fix for floating CTA:**
```tsx
// Before
className="bg-white/95 backdrop-blur-sm"

// After - solid background is faster
className="bg-white shadow-lg"
```

**Fix for FAQ:**
```tsx
// Use CSS for height animation instead of Framer Motion
<div className={cn(
  "grid transition-[grid-template-rows] duration-300",
  openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
)}>
  <div className="overflow-hidden">
    {/* content */}
  </div>
</div>
```

---

### 2.4 Wellness Page (`app/wellness/page.tsx`)

**Status:** Good
**Issues:**
- Uses `useScroll` hook from Framer Motion for floating CTA trigger
- Multiple `motion.div` for treatment categories

**Recommendation:** Replace Framer Motion scroll detection with native:
```tsx
useEffect(() => {
  const handleScroll = () => {
    setShowFloatingCTA(window.scrollY > window.innerHeight * 0.15);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

---

### 2.5 Gallery Page (`app/gallery/page.tsx`)

**Status:** Complex
**Component:** `GalleryCinematic.tsx` (657 lines)

**Issues:**
1. Lightbox uses `backdrop-blur-md` (line 282)
2. Parallax header animation on scroll
3. AnimatePresence for image grid filtering

**Recommendations:**
1. Replace lightbox backdrop:
```tsx
// Before
className="bg-ink/95 backdrop-blur-md"

// After
className="bg-ink/98"
```

2. Disable parallax on header (minimal visual benefit):
```tsx
// Remove or make optional
const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
```

3. Use CSS `content-visibility: auto` for off-screen images

---

### 2.6 Restaurant Page (`app/restaurant/page.tsx`)

**Status:** Review needed
**Expected Issues:** Similar patterns to other pages

---

### 2.7 Offers Page (`app/offers/page.tsx`)

**Status:** Has issues
**Problems:**
- Floating CTA with backdrop-blur (line 139)
- Badge overlays with backdrop-blur (line 280)

---

### 2.8 Contact Page (`app/contact/page.tsx`)

**Status:** Simple page
**Expected:** Fewer performance issues due to simpler content

---

### 2.9 Book Page (`app/book/page.tsx`)

**Status:** Form-heavy
**Issues:**
- Badge with backdrop-blur (line 436)

---

### 2.10 Meetings Page (`app/meetings/page.tsx`)

**Status:** Review needed
**Expected Issues:** Similar to other pages

---

### 2.11 Island Page (`app/island/page.tsx`)

**Status:** Review needed

---

## 3. Component Refactoring

### 3.1 Header Component (`components/organisms/Header.tsx`)

**Status:** Well-optimized
**Good practices:**
- Uses RAF for scroll handler
- Has `transform-gpu` and `will-change-transform`
- Uses `contain: layout style`

**One issue:** Mobile menu uses AnimatePresence for full-screen overlay
```tsx
// Consider using CSS transitions instead
<div className={cn(
  "fixed inset-0 z-60 md:hidden transition-all duration-300",
  isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
)}>
```

---

### 3.2 FilmGrain Component (`components/effects/FilmGrain.tsx`)

**Status:** Well-optimized
**Good practices:**
- Uses `contain: strict`
- Respects reduced motion
- Static SVG (no animation)
- Uses `transform-gpu`

**No changes needed.**

---

### 3.3 CustomCursor Component (`components/effects/CustomCursor.tsx`)

**Status:** Well-optimized
**Good practices:**
- Disabled on mobile
- Uses passive event listeners
- Uses Framer Motion springs (optimized)

**Minor improvement:**
```tsx
// Add contain property to cursor elements
style={{
  contain: "layout paint",
}}
```

---

### 3.4 SmoothScroll Provider (`components/providers/SmoothScroll.tsx`)

**Status:** Good implementation
**Issues:**
- MutationObserver watches entire body (performance heavy)
- Multiple `setTimeout` calls for initial resize

**Recommendations:**
```tsx
// More selective MutationObserver
mutationObserver.observe(contentRef.current, {
  childList: true,
  subtree: false, // Don't watch deeply nested changes
  attributes: false,
});
```

---

### 3.5 GalleryModal Component (`components/molecules/GalleryModal.tsx`)

**Issues:**
- Navigation buttons with `backdrop-blur-sm` (lines 225, 280)

**Fix:**
```tsx
// Replace
"bg-white/10 backdrop-blur-sm"

// With
"bg-black/40"
```

---

## 4. CSS Optimization

### 4.1 globals.css Refactoring

**File size:** ~1,450 lines
**Status:** Well-organized but has performance issues

#### Remove/Replace These Classes:

| Class | Line | Issue | Fix |
|-------|------|-------|-----|
| `.backdrop-blur-premium` | 770 | Heavy blur (12px) | Use solid bg |
| `.backdrop-glass` | 775 | Blur + saturate | Solid bg |
| `.header-glass` | 782 | 20px blur | Reduce to 10px or solid |
| `.glass-white` | 795 | 10px blur | Solid bg |
| `.glass-100` | 803 | 6px blur | Solid bg |
| `.glass-200` | 810 | 10px blur | Solid bg |
| `.glass-300` | 818 | 14px blur | Solid bg |
| `.glass-card` | 849 | 10px blur | Solid bg with shadow |
| `.glass-panel` | 857 | 12px blur | Solid bg |

#### Recommended Replacements:

```css
/* High-performance glass alternatives */
.glass-solid-100 {
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.glass-solid-200 {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.glass-solid-300 {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

### 4.2 Add Performance Utilities

```css
/* Add to globals.css */

/* Content visibility for off-screen optimization */
.content-auto {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}

/* Optimized image container */
.img-container-optimized {
  contain: layout paint;
  content-visibility: auto;
}

/* Force GPU compositing only when needed */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Remove will-change after animation completes */
@keyframes removeWillChange {
  to {
    will-change: auto;
  }
}

.animate-once {
  animation: removeWillChange 0.5s 1s forwards;
}
```

---

### 4.3 Remove Global will-change

**Current (problematic):**
```css
@media (prefers-reduced-motion: no-preference) {
  .transition-transform,
  .transition-all {
    will-change: transform;
    backface-visibility: hidden;
  }
}
```

**Replace with:**
```css
/* Only specific elements that need GPU acceleration */
.header-fixed,
.floating-cta,
.modal-backdrop {
  will-change: transform;
  backface-visibility: hidden;
}
```

---

## 5. Animation Optimization

### 5.1 motion.ts Library Optimization

**File:** `lib/motion.ts`
**Status:** Well-designed system

**Recommendations:**

1. **Reduce animation distances:**
```typescript
// Before
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 }, // 40px is too much
  // ...
};

// After
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 }, // 16px is enough
  // ...
};
```

2. **Add CSS animation alternatives:**
```typescript
export const cssAnimations = {
  fadeInUp: "animate-fade-in-up",
  fadeIn: "animate-fade-in",
  scaleIn: "animate-scale-in",
};
```

3. **Reduce default durations:**
```typescript
// Before
export const duration = {
  slow: 0.25,     // 250ms
  slower: 0.3,    // 300ms
  slowest: 0.4,   // 400ms
};

// After - faster for 120fps feel
export const duration = {
  slow: 0.2,      // 200ms
  slower: 0.25,   // 250ms
  slowest: 0.3,   // 300ms
};
```

---

### 5.2 Replace Framer Motion with CSS

For simple fade-in animations, replace Framer Motion with CSS:

**Before:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: easeOutExpo }}
>
```

**After:**
```tsx
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
```

**Add to globals.css:**
```css
/* Tailwind-style animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInFromBottom {
  from { transform: translateY(16px); }
  to { transform: translateY(0); }
}

.animate-in {
  animation-fill-mode: both;
}

.fade-in {
  animation-name: fadeIn;
}

.slide-in-from-bottom-4 {
  animation-name: slideInFromBottom;
}

.duration-500 {
  animation-duration: 500ms;
}
```

---

### 5.3 Parallax Optimization

**HeroSection parallax:**
```tsx
// Current - always running
const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

// Optimized - disable on low-end devices
const [enableParallax, setEnableParallax] = useState(true);

useEffect(() => {
  // Disable parallax on low-end devices
  const isLowEnd = navigator.hardwareConcurrency <= 4;
  setEnableParallax(!isLowEnd && !prefersReducedMotion);
}, [prefersReducedMotion]);
```

---

## 6. Image Optimization

### 6.1 Current State

The project uses `next/image` correctly with:
- Remote patterns configured
- AVIF and WebP formats enabled
- Device sizes defined

### 6.2 Improvements Needed

#### Add priority to above-the-fold images:
```tsx
// In HeroSection
<Image
  src={imageSrc}
  alt={imageAlt}
  fill
  priority // Add this
  className="object-cover"
/>
```

#### Add sizes attribute consistently:
```tsx
// Many images missing sizes
<Image
  src={room.image}
  alt={room.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### Use placeholder="blur" for LCP images:
```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  fill
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
/>
```

---

### 6.3 Lazy Loading Strategy

```tsx
// Add loading="lazy" to below-fold images
<Image
  src={image.src}
  alt={image.alt}
  fill
  loading="lazy" // Default, but explicit is good
/>
```

---

## 7. Architecture Improvements

### 7.1 Component File Size Guidelines

| Component | Current Lines | Target | Action |
|-----------|--------------|--------|--------|
| `GalleryCinematic.tsx` | 657 | <300 | Split into Gallery + Lightbox |
| `about/page.tsx` | ~1,932 | <500 | Extract 4-5 section components |
| `HeroSection.tsx` | 331 | <200 | Extract video handling |
| `Header.tsx` | 333 | <250 | Extract mobile menu |

---

### 7.2 State Management

**Issue:** Some components fetch/compute data on every render.

**Example fix:**
```tsx
// Use useMemo for computed values
const displayImages = useMemo(() => {
  return activeSet === "all"
    ? allImages
    : sets.find((s) => s.id === activeSet)?.images || [];
}, [activeSet, sets, allImages]);
```

---

### 7.3 Event Handler Optimization

**Issue:** Some scroll handlers don't use RAF:
```tsx
// Bad
useEffect(() => {
  const handleScroll = () => {
    setShowFloatingCTA(window.scrollY > window.innerHeight * 0.15);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
}, []);

// Good
useEffect(() => {
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        setShowFloatingCTA(window.scrollY > window.innerHeight * 0.15);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
}, []);
```

---

## 8. Priority Action Items

### Immediate (Week 1)

1. **Replace backdrop-filter in key components:**
   - [ ] `Header.tsx` - reduce blur radius to 8px
   - [ ] `GalleryModal.tsx` - use solid background
   - [ ] `FloatingCTA.tsx` - use solid background
   - [ ] Floating CTAs in pages (rooms, offers)

2. **Remove global will-change:**
   - [ ] Edit `globals.css` lines 1417-1430

3. **Add `content-visibility: auto` to sections:**
   - [ ] Below-fold sections on all pages

### Short-term (Week 2-3)

4. **Replace simple Framer Motion with CSS:**
   - [ ] `DiscoverGrid.tsx` card animations
   - [ ] FAQ accordions
   - [ ] Simple fade-in sections

5. **Optimize images:**
   - [ ] Add `priority` to hero images
   - [ ] Add `sizes` to all gallery images
   - [ ] Implement blur placeholders

### Medium-term (Month 1)

6. **Refactor large components:**
   - [ ] Split `GalleryCinematic.tsx`
   - [ ] Extract sections from `about/page.tsx`
   - [ ] Create shared animation components

7. **Add performance monitoring:**
   - [ ] Implement Core Web Vitals tracking
   - [ ] Add FPS counter for development

---

## Metrics to Track

| Metric | Current (Est.) | Target |
|--------|---------------|--------|
| LCP | ~2.5s | <1.5s |
| FID | ~100ms | <50ms |
| CLS | ~0.1 | <0.05 |
| FPS (scroll) | 60-90 | 120 |
| Total JS | ~350KB | <250KB |

---

## Conclusion

The Grand Hotel Opduin website has excellent design foundations and a well-thought-out component architecture. The main performance bottleneck is the overuse of `backdrop-filter` which creates excessive GPU compositing layers.

By implementing the recommendations in this report, particularly:
1. Replacing backdrop-filter with solid backgrounds
2. Using CSS animations instead of Framer Motion for simple effects
3. Adding proper GPU acceleration hints to critical elements only

The site should achieve consistent 120 FPS scrolling performance and improved Core Web Vitals scores.

---

**Report generated by:** Claude Opus 4.5
**Last updated:** January 2026
