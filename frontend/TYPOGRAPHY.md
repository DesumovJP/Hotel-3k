# Typography System - Grand Hotel Opduin

## Fonts

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display** | Cormorant Garamond | 300, 400, 500, 600 | Headings, titles |
| **Body** | DM Sans | 300, 400, 500, 600, 700 | Body text, UI |

---

## Responsive Text Utilities

All utilities use `clamp()` for smooth scaling between mobile and desktop.

### Display (Headings)

| Class | Min | Fluid | Max | Weight | Use Case |
|-------|-----|-------|-----|--------|----------|
| `.text-hero` | 2.5rem (40px) | 8vw | 5.5rem (88px) | 300 | Page heroes |
| `.text-hero-md` | 2rem (32px) | 6vw | 4rem (64px) | 300 | Compact heroes |
| `.text-display-2xl` | 3rem (48px) | 7vw | 5rem (80px) | 300 | Large sections |
| `.text-display-xl` | 2.5rem (40px) | 5vw | 4rem (64px) | 300 | Section h2 |
| `.text-display-lg` | 2rem (32px) | 4vw | 3rem (48px) | 400 | Section titles |
| `.text-display-md` | 1.5rem (24px) | 3vw | 2.25rem (36px) | 400 | Card titles |
| `.text-display-sm` | 1.25rem (20px) | 2.5vw | 1.75rem (28px) | 500 | Small headings |

### Body Text

| Class | Min | Fluid | Max | Line Height | Use Case |
|-------|-----|-------|-----|-------------|----------|
| `.text-body-xl` | 1.125rem (18px) | 2vw | 1.375rem (22px) | 1.7 | Lead paragraphs |
| `.text-body-lg` | 1rem (16px) | 1.8vw | 1.25rem (20px) | 1.7 | Descriptions |
| `.text-body-md` | 0.9375rem (15px) | 1.5vw | 1.0625rem (17px) | 1.7 | Default body |
| `.text-body-sm` | 0.8125rem (13px) | 1.3vw | 0.9375rem (15px) | 1.6 | Secondary text |

### Taglines (Italic Display)

| Class | Min | Max | Use Case |
|-------|-----|-----|----------|
| `.text-tagline-xl` | 1.25rem | 1.75rem | Hero taglines |
| `.text-tagline-lg` | 1.125rem | 1.5rem | Section taglines |
| `.text-tagline-md` | 1rem | 1.25rem | Card taglines |

### Special

| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `.text-overline` | 0.6875rem → 0.75rem | 500 | Labels, categories |
| `.text-nav` | 0.75rem → 0.8125rem | 500 | Desktop navigation |
| `.text-nav-lg` | 1.5rem → 2rem | 400 | Mobile menu |
| `.text-price` | 1.25rem → 1.75rem | 600 | Prices |
| `.text-price-sm` | 1rem → 1.25rem | 600 | Small prices |
| `.text-caption` | 0.625rem → 0.75rem | 400 | Captions |

---

## Typography Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│  HERO (text-hero)                                       │
│  Weight: 300 (Light) - Largest, most elegant            │
├─────────────────────────────────────────────────────────┤
│  SECTION TITLE (text-display-xl / text-display-lg)      │
│  Weight: 300-400 - Section headers                      │
├─────────────────────────────────────────────────────────┤
│  CARD TITLE (text-display-md / text-display-sm)         │
│  Weight: 400-500 - Component headings                   │
├─────────────────────────────────────────────────────────┤
│  BODY TEXT (text-body-*)                                │
│  Weight: 400 - Content paragraphs                       │
├─────────────────────────────────────────────────────────┤
│  LABELS (text-overline)                                 │
│  Weight: 500 - Small, uppercase, tracked                │
└─────────────────────────────────────────────────────────┘
```

---

## Usage Examples

### Hero Section
```tsx
<span className="text-overline text-shell mb-4 block">
  Welcome
</span>
<h1 className="text-hero text-white">
  Grand Hotel Opduin
</h1>
<p className="text-tagline-xl text-white/80">
  "The Hamptons of the Wadden"
</p>
<p className="text-body-lg text-white/70">
  Description text here...
</p>
```

### Section Header
```tsx
<span className="text-overline text-shell mb-3 block">
  Our Rooms
</span>
<h2 className="text-display-lg text-ink mb-4">
  Find Your Perfect Stay
</h2>
<p className="text-body-md text-neutral-600">
  Section description...
</p>
```

### Card
```tsx
<h3 className="text-display-sm text-ink mb-2">
  Deluxe Suite
</h3>
<p className="text-tagline-md text-neutral-500 mb-4">
  Sea view paradise
</p>
<p className="text-body-md text-neutral-600">
  Card description...
</p>
<span className="text-price text-navy">€299</span>
```

### Navigation
```tsx
{/* Desktop */}
<span className="text-nav">Rooms</span>

{/* Mobile menu */}
<span className="text-nav-lg">Rooms</span>
```

---

## Font Variants

### Display Light (for large headings)
```css
.font-display-light {
  font-family: var(--font-display);
  font-weight: 300;
  letter-spacing: -0.02em;
}
```

### Display Italic (for taglines)
```css
.font-display-italic {
  font-family: var(--font-display);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0;
}
```

---

## Components Using Typography

| Component | Classes Used |
|-----------|--------------|
| `SectionHero` | text-hero, text-tagline-xl, text-body-lg |
| `SectionHeroCompact` | text-hero-md, text-tagline-lg, text-body-md |
| `SectionCTA` | text-display-lg, text-body-md |
| `SectionHeader` | text-overline, text-display-lg, text-body-md |
| `PageHero` | text-overline, text-hero, text-body-lg |
| `Header` | text-nav, text-nav-lg |
| `RoomCard` | text-display-sm, text-body-md, text-price |
| `IntroSection` | text-display-xl, text-body-lg |
| `DiscoverGrid` | text-display-xl, text-display-sm |

---

## Best Practices

1. **Always use responsive utilities** - Never use hardcoded `text-3xl md:text-4xl` patterns
2. **Match weight to size** - Lighter weights (300) for large text, heavier (500) for small
3. **Use text-overline for labels** - Consistent uppercase styling
4. **Use tagline classes for italic** - Don't manually add `italic` to display font
5. **Body text hierarchy** - xl → lg → md → sm for visual importance

---

## Migration Guide

### Before (Hardcoded)
```tsx
<h2 className="font-display text-3xl md:text-4xl text-ink">
<p className="text-lg text-neutral-600">
<span className="text-xs tracking-[0.2em] uppercase">
```

### After (Responsive)
```tsx
<h2 className="text-display-lg text-ink">
<p className="text-body-lg text-neutral-600">
<span className="text-overline">
```
