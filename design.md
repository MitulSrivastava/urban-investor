# Design System: Urban Investors

**Site:** [urbaninvestors.in](https://urbaninvestors.in)
**Last Updated:** 2026-07-29

---

## 1. Visual Theme & Atmosphere

The Urban Investors design language communicates **refined professionalism** with a **luxury real-estate sensibility**. The atmosphere sits at the intersection of **"Corporate Trust"** and **"Aspirational Elegance"** — dark navy tones establish authority while warm gold accents signal exclusivity and premium positioning.

**Mood keywords:** Authoritative · Aspirational · Clean · Polished · Trustworthy · Premium

The overall density is **airy and spacious** — generous whitespace between sections (5rem–7rem vertical padding), breathing room around cards, and plenty of negative space around typography. Nothing feels cramped; the design invites leisurely browsing, befitting high-value property investment decisions.

The site employs a **layered depth model**: full-bleed hero sections with photographic backgrounds sit beneath translucent gradient overlays, while the main content uses floating cards with soft shadows, creating a sense of elevation and materiality.

---

## 2. Color Palette & Roles

### Primary Family — "Royal Navy"

| Token | Name | Hex | Role |
|---|---|---|---|
| `--primary-color` | Deep Royal Navy | `#1e3a8a` | Brand anchor — navbar text, headings, buttons, links, badges, icon circles |
| `--primary-light` | Vivid Cerulean | `#3b82f6` | Gradient endpoints, hover states, secondary CTAs, footer link highlights |
| `--primary-dark` | Midnight Navy | `#1e40af` | Dark hover states, pressed button tones |

### Accent Family — "Warm Gold"

| Token | Name | Hex | Role |
|---|---|---|---|
| `--accent-color` | Burnished Champagne Gold | `#d4a574` | Hero accent text, gold gradient starts, testimonial stars, section dividers |
| `--accent-light` | Ivory Blush | `#f7f3f0` | Soft background tints, stat item hover fills |
| `--accent-dark` | Deep Caramel | `#c19a67` | Hover state for gold elements |

### Luxury Variant — "True Gold"

| Name | Hex | Role |
|---|---|---|
| Sovereign Gold | `#D4AF37` | Property page headings, table header text, amenity icons, CTA buttons |
| Pale Gold Sheen | `rgba(212,175,55,0.1)` | Feature icon wrapper backgrounds, card hover borders |
| Burnished Bronze | `#B38F1E` | Gold gradient dark endpoint for depth |
| Champagne Mist | `#F3E5AB` | Gold gradient light endpoint for shimmer |

### Neutral Family — "Slate"

| Token | Name | Hex | Role |
|---|---|---|---|
| `--text-dark` | Charcoal Ink | `#1f2937` | Primary body text, card titles |
| `--text-muted` | Storm Grey | `#6b7280` | Secondary text, descriptions, subtitles |
| `--text-light` | Silver Fog | `#9ca3af` | Tertiary text, metadata, timestamps |
| `--white` | Pure White | `#ffffff` | Page background, card surfaces |
| `--light-bg` | Frost White | `#f8fafc` | Section alternate backgrounds |

### Dark Backgrounds

| Name | Hex | Role |
|---|---|---|
| Obsidian Night | `#0f172a` | Footer gradient start, hero gradient start |
| Charcoal Slate | `#1e293b` | Footer gradient end, hero mid-tone |
| Iron Grey | `#334155` | Hero gradient end tone |

### Utility / Status Colors

| Name | Hex | Role |
|---|---|---|
| WhatsApp Emerald | `#25D366` | WhatsApp floating button, group chat CTA |
| WhatsApp Teal | `#128C7E` | WhatsApp gradient endpoint |
| Success Mint | `#10b981` | Success states, verified badges, trust icons |
| Orange Signal | `#ff6b35` | Insight card accent (Asking Price chart bars) |
| Violet Data | `#9333ea` | Insight card accent (Govt. Registrations) |

---

## 3. Gradient Definitions

| Token / Name | Definition | Usage |
|---|---|---|
| `--gradient-primary` | `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)` | Primary buttons, service icon wrappers, modal icons, contact info panels |
| `--gradient-accent` | `linear-gradient(135deg, #d4a574 0%, #f59e0b 100%)` | Accent buttons (hero CTA), project number badges, step number hover |
| `--gradient-overlay` | `linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(31,41,55,0.7) 100%)` | Hero section photo overlay |
| Hero Background | `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)` | Hero section fallback when images aren't loaded |
| Hero Overlay | `linear-gradient(135deg, rgba(30,58,138,0.85) 0%, rgba(31,41,55,0.75) 50%, rgba(15,23,42,0.9) 100%)` | Multi-stop overlay on hero imagery |
| Footer Gradient | `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)` | Footer background |
| Gold Button | `linear-gradient(135deg, #D4AF37, #F3E5AB)` | Luxury property page pill CTAs |
| Gold Pill | `linear-gradient(135deg, #D4AF37, #F3E5AB)` | Config table CTA pills (unified with Gold Button) |
| Service Highlight | `linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)` | Highlighted service card background |
| Services BG | `linear-gradient(135deg, #f8fafc 0%, #e8f1ff 100%)` | Services section background |

---

## 4. Typography Rules

### Font Stack

| Token | Family | Source | Role |
|---|---|---|---|
| `--font-primary` | **Playfair Display** (serif) | Google Fonts | Headlines, section titles, property names, hero text, luxury accents. Weights: 400, 500, 600, **700** |
| `--font-secondary` | **Inter** (sans-serif) | Google Fonts | Body text, paragraphs, metadata, form labels. Weights: 300, 400, 500, 600, 700, 800 |
| `--font-accent` | **Poppins** (sans-serif) | Google Fonts | Buttons, badges, nav links, UI elements, service numbers. Weights: 300, 400, 500, **600**, 700 |

### Type Scale (Fluid / clamp-based)

| Element | Size | Weight | Letter-Spacing | Line-Height |
|---|---|---|---|---|
| h1 | `clamp(2.5rem, 5vw, 4rem)` | 600 | `-0.02em` | 1.3 |
| h2 | `clamp(2rem, 4vw, 3.5rem)` | 600 | `-0.02em` | 1.3 |
| h3 | `clamp(1.5rem, 3vw, 2.5rem)` | 600 | `-0.02em` | 1.3 |
| h4 | `clamp(1.25rem, 2.5vw, 2rem)` | 600 | `-0.02em` | 1.3 |
| h5 | `clamp(1.125rem, 2vw, 1.5rem)` | 600 | `-0.02em` | 1.3 |
| h6 | `clamp(1rem, 1.5vw, 1.25rem)` | 600 | `-0.02em` | 1.3 |
| Body | `16px` | 400 | `-0.01em` | 1.7 |
| Lead | `clamp(1.125rem, 2vw, 1.375rem)` | 400 | — | 1.6 |
| Buttons | `0.875rem` | 600 | `0.5px` | — |
| Badges | — | 600 | `0.5px` | — |
| Nav Links | `0.95rem` | 500 | — | — |

### Special Text Treatments

- **Gradient Text (Navy):** `background: var(--gradient-primary)` + `-webkit-background-clip: text` — used for `.gradient-text`
- **Gradient Text (Gold):** `background: var(--gradient-accent)` + clip — used for `.gradient-text-gold` and `.text-accent` in hero
- **Text Shadow (Hero):** `0 4px 20px rgba(0,0,0,0.5)` on hero title; `0 2px 10px rgba(0,0,0,0.3)` on subtitle

---

## 5. Component Catalog

### 5.1 Buttons

| Variant | Shape | Background | Text | Hover Behavior |
|---|---|---|---|---|
| `.btn-primary` | Gently rounded (`12px`) | Navy-to-Blue gradient | White, uppercase, 600 weight | Lifts 2px, shadow deepens |
| `.btn-accent` | Gently rounded (`12px`) | Gold-to-Amber gradient | Dark charcoal, uppercase | Lifts 2px, shadow deepens, shine sweep |
| `.btn-outline-primary` | Gently rounded (`12px`) | Transparent, 2px navy border | Navy text | Fills with gradient, turns white, lifts |
| `.btn-outline-light` | Gently rounded (`12px`) | Transparent, frosted glass (blur 10px) | White | Background brightens to 15% white |
| `.btn-pill-solid` | Pill-shaped (`50px`) | Navy-to-Blue gradient | White | Lifts 2px, shadow deepens |
| `.btn-pill-gold` | Pill-shaped (`50px`) | Gold-to-Pale-Gold gradient | Dark navy | Lifts 2px, shadow deepens |
| `.btn-reversed-primary` | Gently rounded (`12px`) | Navy gradient, 2px border | White | Fills white, text turns navy |

**Shared behaviors:** All buttons have a ripple pseudo-element (expanding circle on hover), `overflow: hidden`, and smooth 0.3s cubic-bezier transitions. Minimum touch target on mobile: `44px` height.

### 5.2 Cards

#### Property Card (`.property-card`)
- **Shape:** Generously rounded corners (`16px`)
- **Background:** Subtle gradient from white to frost (`#ffffff` to `#f8fafc`)
- **Shadow (resting):** `0 10px 30px rgba(0,0,0,0.1)`
- **Shadow (hover):** `0 20px 40px rgba(30,58,138,0.15)`
- **Hover:** Lifts 5px, image inside scales 1.05x
- **Image area:** Fixed 280px height, `object-fit: cover`

#### Project Card (`.project-card`)
- **Shape:** Generously rounded (`16px`), identical background gradient
- **Fixed width:** 320px in carousel (82% on mobile)
- **Number badge:** Circular, gold gradient, white text, top-left positioned
- **Shadow (resting):** `0 8px 25px rgba(0,0,0,0.1)`
- **Hover:** Lifts 5px, image scales

#### Service Card (`.service-card-modern`)
- **Shape:** Fully rounded (`rounded-4` = 24px)
- **Border:** 1px soft slate `rgba(226,232,240,0.8)`
- **Accent strip:** 4px top bar (blue gradient), hidden initially, slides in via `scaleX` on hover
- **Number badge:** Circular, soft blue tint, rotates 360 degrees on hover and fills navy
- **Icon wrapper:** 80px x 80px, 20px radius, navy gradient, 30px blue glow shadow
- **Highlight variant:** Full navy gradient background, white text, icon inverts to white/navy

#### Testimonial Card (`.testimonial-card`)
- **Shape:** Generously rounded (`16px`)
- **Decorative:** Giant quote mark in gold, top-left, 4rem, 30% opacity
- **Hover:** Lifts 5px, shadow deepens

#### Insight Card (`.insight-card`)
- **Background:** Each card has a unique soft tint (`#fdf6f0`, `#f8f4ff`, `#f0f4ff`, `#f0fdf4`)
- **Blur:** `backdrop-filter: blur(10px)`
- **Border:** 1px white at 20% opacity

#### Feature Card — Luxury (`.feature-card-luxury`)
- **Shape:** Lavishly rounded (`20px`)
- **Icon:** 70px circle, soft gold tint, flips 180 degrees on hover and fills gold
- **Shadow (hover):** `0 15px 45px rgba(11,30,54,0.08)`

#### Amenity Card — Luxury (`.amenity-card-luxury`)
- **Shape:** Lavishly rounded (`20px`)
- **Icon:** 65px, 16px radius square, gold tint to gold gradient fill on hover
- **Shadow (hover):** Same luxury shadow token

### 5.3 Navigation (`.navbar-modern`)

- **Default:** Transparent with `backdrop-filter: blur(20px)`, fixed top, 1px bottom border at 10% white
- **Scrolled state:** White background at 95% opacity, medium shadow appears
- **Links:** Poppins 500, hover adds 5% navy tint background + underline pseudo-element (gold, 80% width, centered)
- **Active link:** 10% navy tint background
- **Hamburger:** Custom 3-line toggle, animates to X via rotate transforms
- **Mobile menu:** Slides down from navbar, frosted glass (`blur(20px)`), rounded bottom corners (`24px`)
- **CTA button in nav:** Full-width on mobile, pill-shaped, with blue shadow

### 5.4 Forms

- **Inputs / Selects:** 2px border at `rgba(30,58,138,0.1)`, 12px radius, 1rem padding, subtle inner shadow
- **Focus state:** Border turns navy, 3px navy glow ring at 10%, background turns solid white
- **Labels:** 600 weight, dark text, 0.75rem bottom margin

### 5.5 Badges

- **Font:** Poppins 600, 0.5px letter-spacing
- **Shape:** Gently rounded (`12px`) or pill-shaped depending on context
- **Shine effect:** Sweeping light gradient pseudo-element on hover

### 5.6 Modals (`.modal-content`)

- **Shape:** Luxuriously rounded (`24px`)
- **Background:** Frosted glass gradient (`white 95%` to `frost 90%`), `backdrop-filter: blur(20px)`
- **Shadow:** Deep and dramatic — `0 25px 50px rgba(0,0,0,0.2)`
- **Header divider:** 1px at 5% opacity
- **Luxury variant:** Gold border at 20% opacity, navy gradient header, gold title text

### 5.7 Tables — Luxury (`.table-luxury`)

- **Wrapper:** 20px radius, luxury shadow, 1px border
- **Header:** Navy-to-blue gradient background, gold text (Playfair Display 600)
- **Cells:** 18px x 24px padding, 4% opacity borders
- **Row hover:** Subtle 3% gold tint
- **CTA cell buttons:** Gold outline, pill-shaped, 50px radius

### 5.8 Premium Config Card (`.premium-config-card`)

- **Desktop:** Table-like flex layout with header row (gold bottom border) and data rows
- **Mobile:** Stacked card layout, each row becomes a standalone card with `data-label` pseudo-content for column names
- **Typography:** Poppins for titles (18px, 700), collection badges in dark rounded pills

---

## 6. Depth & Elevation

The design uses a **four-tier shadow system** progressing from whisper-soft to dramatically elevated:

| Token | Value | Usage |
|---|---|---|
| `--shadow-light` | `0 1px 3px rgba(0,0,0,0.1)` | Resting state for subtle elements |
| `--shadow-medium` | `0 4px 6px rgba(0,0,0,0.1)` | Scrolled navbar, default card state |
| `--shadow-large` | `0 20px 25px rgba(0,0,0,0.1)` | Button hover, card hover |
| `--shadow-xl` | `0 25px 50px rgba(0,0,0,0.15)` | Modals, contact form, hero CTAs |
| `--shadow-luxury` | `0 15px 45px rgba(11,30,54,0.08)` | Property page luxury cards |

**Glassmorphism** is applied selectively:
- Mobile sticky CTA bar: `rgba(15,23,42,0.65)` background + `blur(12px)` + gold border
- Property finder card: `blur(20px)` with white-tinted background
- Exit intent modal: Dark overlay at 65% opacity, card slides up with spring animation

---

## 7. Geometry & Border Radius

| Token | Value | Description | Usage |
|---|---|---|---|
| `--border-radius` | `12px` | Gently rounded | Buttons, inputs, badges, stat items, nav links |
| `--border-radius-lg` | `16px` | Generously rounded | Property cards, project cards, service cards, carousels |
| `--border-radius-xl` | `24px` | Lavishly rounded | Contact form, modal content, property finder, luxury cards |
| Pill / Full | `50px` / `9999px` | Capsule-shaped | Pill buttons, search header badges, status badges, mobile CTA bar |
| Circle | `50%` | Perfect circle | Avatars, step numbers, icon wrappers, social link circles |
| Service Icon | `20px` | Softly squared | Service icon wrappers (distinctive square-with-rounded-corners shape) |

---

## 8. Spacing & Layout Principles

### Vertical Section Rhythm
- **Standard section padding:** `5rem 0` (80px)
- **Inner container padding:** Additional `py-4` or `py-5` for breathing room
- **Large section spacing:** `7rem 0` (112px)
- **Small section spacing:** `3rem 0` (48px)

### Grid System
- **Framework:** Bootstrap 5.3.2 12-column grid
- **Container max-width:** `1320px` at 1400px+ viewports; `1400px` custom elegant container
- **Gutter:** Default Bootstrap `g-4` (1.5rem gap) for card grids
- **Property grid:** 3-column on lg, 2-column on md, single centered card on mobile (max-width: 340px)

### Content Spacing
- **Content stack:** `1.5rem` between adjacent elements (`.content-spacing`)
- **Card internal padding:** `1.5rem` to `2.5rem` depending on card type
- **Section title to content:** `mb-5` (3rem)

### Horizontal Carousel (`.hot-projects-carousel`)
- **Scroll:** Native horizontal `overflow-x: auto` with hidden scrollbar
- **Card width:** 320px fixed, 82% on mobile
- **Gap:** `1.5rem` desktop, `1rem` mobile
- **Navigation:** 50px circular arrows, positioned at 50% vertical, with navy hover fill

---

## 9. Animation & Motion

### Timing Functions
| Token | Value | Usage |
|---|---|---|
| `--transition-fast` | `0.2s cubic-bezier(0.4, 0, 0.2, 1)` | Hover effects, nav link transitions |
| `--transition-medium` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Card transforms, button lifts, shadow changes |
| `--transition-slow` | `0.5s cubic-bezier(0.4, 0, 0.2, 1)` | Image zoom on hover, page-level transitions |

### Scroll Animations (`.animate-on-scroll`)
- **Initial state:** `opacity: 0`, `translateY(30px)`
- **Animated state:** `opacity: 1`, `translateY(0)`
- **Duration:** `0.8s` with same cubic-bezier easing
- **Stagger delays:** `0.1s` increments via `data-delay` attributes
- **Variants:** `fadeInUp`, `fadeInRight`

### Keyframe Animations
| Name | Description | Used On |
|---|---|---|
| `fadeInUp` | Slides up 20px + fades in over 1s | Hero title (0s), subtitle (0.2s), buttons (0.4s) |
| `ui-wa-pulse` | Pulsing green glow (box-shadow 0 to 15px to 0) every 2s | WhatsApp floating button |
| `ui-gp-pulse` | Pulsing gold glow every 2.4s | Gold group chat FAB |
| `ui-fadeIn` | Simple opacity 0 to 1 over 0.3s | Modal overlays |
| `ui-slideUp` | translateY(30px) to 0 + fade over 0.4s | Modal content |
| `contactGlow` | 8s infinite scale + rotation on radial gradient | Contact info panel decorative glow |

### Hover Micro-interactions
- **Cards:** Lift 5-10px + shadow deepen + image zoom 1.05x
- **Buttons:** Lift 2-4px + shadow expansion + ripple circle + optional shine sweep
- **Nav links:** Underline grows from center (gold, 80% width)
- **Service numbers:** 360 degree rotation + scale 1.1x + color fill change
- **Feature icons (luxury):** 180 degree Y-axis flip + fill color swap
- **Footer links:** Slide right 5px + gold line grows from left

### Hero Background Slideshow
- **Mechanism:** 5 background slides, each `position: absolute`, `opacity: 0` to `0.8`
- **Transition:** `opacity 2s ease-in-out`
- **Active class:** `.active` toggles opacity

### Reduced Motion
All animations and transitions are collapsed to `0.01ms` when `prefers-reduced-motion: reduce` is active.

---

## 10. Page Templates & Section Patterns

### Homepage Flow
1. **Hero** — Full-viewport, photo slideshow + gradient overlay, left-aligned headline with gold accent, single CTA
2. **Property Finder** — White section, centered glassmorphic card, search form (location/type/budget/BHK), collapsible advanced filters
3. **Hot Projects Carousel** — Light grey background, horizontal scrolling project cards with numbered badges
4. **Investment Opportunity** — Accent-colored banner, stats row (3-col), WhatsApp CTA
5. **Featured Properties** — Blue-tinted service section background, 3-column property card grid
6. **Price Insights** — White section, 4-column insight cards with unique color-tinted backgrounds
7. **Expert Video Analysis** — Dark section, 3-column YouTube embed grid
8. **About** — Light grey, 2-column (image + text), stat circles in 2x2 grid
9. **Services** — Blue-tinted background, 6-card grid (3x2), numbered with icons, one highlighted card
10. **Testimonials** — White section, 3-column desktop / carousel mobile
11. **Contact** — Navy background, 2-column (info + form)
12. **Footer** — Dark gradient, 4-column (brand/links/properties/contact)

### Property Page Flow
1. **Navbar** — Shared component
2. **Quick Glance Bar** — Sticky below navbar, frosted glass, key stats
3. **Property Hero** — Large background image with gradient overlay from bottom, breadcrumbs + title + badges
4. **Configuration Table** — Premium config card (desktop table / mobile stacked cards)
5. **Image Gallery Carousel** — Luxury-styled with glass captions, gold indicators
6. **Features Grid** — 3-column luxury feature cards with flip-icon hover
7. **Amenities Grid** — Multi-column luxury amenity cards with gold icon wrappers
8. **Location Map & Distances** — 2-column (map embed + distance list)
9. **Developer Info** — Navy gradient stat cards with gold numerals
10. **FAQ Accordion** — Collapsible Q&A sections
11. **Contact CTA** — Navy gradient card with gold buttons
12. **Contact Form Section** — Shared form component
13. **Footer** — Shared component

---

## 11. Lead Magnet & Conversion Components

### Floating WhatsApp Button
- **Desktop:** Fixed bottom-right, 60px green circle, pulsing shadow animation
- **Mobile:** Hidden (replaced by mobile CTA bar)

### Mobile Sticky CTA Bar
- **Position:** Fixed bottom, centered, 90% width, max 400px
- **Style:** Glassmorphic capsule — dark navy at 65% opacity, blur 12px, gold border
- **Buttons:** Two equal pill buttons — "Call" (navy gradient) and "WhatsApp" (green gradient)

### Exit Intent Modal
- **Trigger:** Mouse leaves viewport (desktop)
- **Overlay:** 65% dark background
- **Modal:** 440px max-width, 20px radius, gradient blue icon circle, form with 12px-radius inputs
- **Success state:** Hidden form, green check icon, confirmation text

### Gold Group Chat FAB
- **Position:** Fixed bottom-left (desktop), bottom-right above CTA bar (mobile)
- **Style:** Gold gradient pill with text label, pulsing gold glow
- **Opens:** Same modal pattern as exit intent but with green WhatsApp-themed submit

---

## 12. Responsive Breakpoints

| Breakpoint | Max Width | Key Adaptations |
|---|---|---|
| XXL | 1400px+ | Max container 1320px, hero title up to 5rem |
| XL | 1199px | Display sizes scale down, hero CTA shrinks |
| LG | 991px | Navbar collapses, hero title capped at 3rem, cards stack |
| MD | 767px | Mobile nav dropdown, carousel for testimonials, property cards center-aligned |
| SM | 575px | Tighter container padding (1rem), smaller buttons, single-column everything |
| XS | 400px | Brand logo shrinks, hero title minimum 1.5rem, property features go full-width |

### Touch Device Overrides
On `hover: none` and `pointer: coarse`:
- All hover transforms disabled (no lift)
- Nav links get larger padding (44px min touch target)
- Cards maintain resting shadow only

---

## 13. External Dependencies

| Dependency | Version | Purpose |
|---|---|---|
| Bootstrap | 5.3.2 | Grid system, utilities, collapse, carousel, modal |
| Font Awesome | 6.4.0 | Icon library (solid + brands) |
| Google Fonts | — | Playfair Display, Inter, Poppins |
| Google Tag Manager | GTM-WQM7844P | Analytics and tracking |
| TouchNow.ai | — | Form capture / CRM integration |
| Google Apps Script | — | Contact form backend submission |

---

## 14. Accessibility Foundations

- **Skip links:** Two skip-link anchors (main content + navigation)
- **Focus styles:** 2px gold outline with 2px offset on all interactive elements
- **Reduced motion:** Full `prefers-reduced-motion` support
- **ARIA:** Hamburger toggle has `aria-expanded`, `aria-controls`; carousel controls have `aria-label`
- **Semantic HTML:** `<nav>`, `<section>`, `<footer>`, `<form>` used throughout
- **Font rendering:** `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`
- **Min touch targets:** 44px on touch devices

---

## 15. Image & Media Strategy

- **Format:** WebP throughout for photography (hero backgrounds, property images, testimonial avatars)
- **Loading:** Hero image `fetchpriority="high"` + `loading="eager"`; all below-fold images `loading="lazy"`
- **Preloading:** Hero background and logo are `<link rel="preload">`
- **Object-fit:** `cover` used universally for property and gallery images
- **Gallery thumbnails:** 140px mobile, 180px tablet, 100px desktop (sidebar context)
- **YouTube embeds:** Wrapped in `ratio ratio-16x9` Bootstrap containers with rounded corners and shadow
