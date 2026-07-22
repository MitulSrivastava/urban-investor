# Urban Investors Design System & Brand Guidelines

This document serves as the official design system and brand guidelines for **Urban Investors**. It establishes the visual language, design tokens, and components that define the premium real estate advisory brand, ensuring consistency across all luxury Noida project landing pages and the corporate website.

---

## 1. Visual Theme & Atmosphere

The visual theme is anchored in the **"Luxury Digital Concierge"** narrative, evoking exclusivity, trust, and premium architectural heritage. The brand style balances classical editorial elegance with high-end modern digital design.

### Brand Pillars:
*   **Architectural Authority:** Traditional serif typography combined with razor-sharp alignment and structured grids to reflect the stability and permanence of premium real estate.
*   **Exclusive Sophistication:** Deep, atmospheric navy backgrounds (`#0B1E36` / `#0F172A`) paired with rich metallic champagne-gold highlights (`#D4AF37` / `#d4a574`) that convey elite status without excess.
*   **Modern Clarity:** Light, high-contrast layouts for detailed project descriptions, utilizing generous whitespace and smooth glassmorphism layers (`backdrop-filter`) to feel airy and professional.
*   **Fluid Motion:** Subtle, organic scroll animations (`fade-in-up`, `fade-in-right`) and weighted hover effects that mimic the tactile response of premium materials.

---

## 2. Color Palette & Roles

The color palette is built using specific, tailored variables to support both dark-luxe overlays and light, clean utility sheets.

### Core Brand Colors

| Color Token | Visual Name | Hex Value / Code | Functional Role |
| :--- | :--- | :--- | :--- |
| `--navy-dark` | **Deep Midnight Blue** | `#0B1E36` | Primary background for luxury sections, footers, and modal headers. |
| `--primary-color` | **Classic Navy** | `#1e3a8a` | Branding, primary headers, active states, and dark text elements. |
| `--primary-light` | **Vibrant Royal Blue** | `#3b82f6` | High-emphasis UI callouts, links, scroll-bar gradients, and icon backgrounds. |
| `--primary-dark` | **Deep Slate Blue** | `#1e40af` | Hover states for primary buttons and text links. |
| `--accent-color` | **Champagne Gold** | `#d4a574` | Standard accent, section underlines, secondary CTA borders. |
| `--gold-primary` | **Metallic Luxury Gold** | `#D4AF37` | Premium badges, icons, hover accents, and table header accents. |
| `--accent-light` | **Alabaster Warm Cream** | `#f7f3f0` | Soft background for alternative sections, badges, and card outlines. |
| `--light-bg` | **Ice Blue White** | `#f8fafc` | Base background for utility sections, tables, and content blocks. |
| `--white` | **Pure White** | `#ffffff` | Primary text on dark backgrounds, card backgrounds on light sheets. |
| `--text-dark` | **Charcoal Gray** | `#1f2937` | Primary body text on light backgrounds for optimal readability. |
| `--text-muted` | **Cool Slate Gray** | `#6b7280` | Subtitles, meta-information, and secondary details. |
| `--text-light` | **Muted Silver** | `#9ca3af` | Tertiary details, captions, and disabled states. |

### Color Gradients

```css
/* Navy-to-Vibrant Blue Gradient (Used for primary buttons, banners, and hero backgrounds) */
--gradient-primary: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);

/* Gold-to-Amber Gradient (Used for primary CTAs and accents) */
--gradient-accent: linear-gradient(135deg, #d4a574 0%, #f59e0b 100%);

/* Navy-to-Slate Overlay Gradient (Used for hero banner media overlays) */
--gradient-overlay: linear-gradient(135deg, rgba(30,58,138,0.9) 0%, rgba(31,41,55,0.7) 100%);
```

---

## 3. Typography Rules

Urban Investors pairs classic, luxury editorial typography with highly readable, geometric sans-serif typefaces to maintain readability across dense charts and mobile displays.

### Font Families
*   **Primary Display (Luxury & Headlines):** `"Playfair Display", serif`
    *   *Usage:* All section headers (`h1` through `h6`), property names, display titles, and luxury callout cards.
    *   *Character:* High contrast, elegant serifs, editorial feel.
*   **Secondary Body (Structure & Content):** `"Inter", sans-serif`
    *   *Usage:* Paragraphs, feature lists, pricing descriptions, and fine print.
    *   *Character:* Highly readable at small scales, modern, neutral.
*   **Accent Typography (Interactive UI):** `"Poppins", sans-serif`
    *   *Usage:* Navigation menus, badges, buttons, form controls, and icons.
    *   *Character:* Geometric, clean, encouraging interaction.

### Typographic Scale
*   **Hero Display (h1):** `clamp(2.5rem, 5vw, 4rem)` / Line-Height: `1.1` / Weight: `700`
*   **Section Headers (h2):** `clamp(2rem, 4vw, 3.5rem)` / Line-Height: `1.3` / Weight: `600`
*   **Subsection Titles (h3):** `clamp(1.5rem, 3vw, 2.5rem)` / Line-Height: `1.3` / Weight: `600`
*   **Card Titles (h4):** `clamp(1.25rem, 2.5vw, 2rem)` / Line-Height: `1.3` / Weight: `600`
*   **Body Copy (p):** `16px` / Line-Height: `1.7` / Weight: `400` / Letter-Spacing: `-0.01em`

---

## 4. Component Stylings

### Navigation (Modern Sticky Header)
The navigation bar utilizes **glassmorphism** to keep the background architectural photography visible during scrolls, creating an immersive experience.
*   **Base Styling:** Fully transparent background, persistent bottom-border (`rgba(255,255,255,0.1)`), backdrop blur of `20px`.
*   **Scrolled State:** Collapses in height (`padding: 1rem 0`), shifts to `rgba(255,255,255,0.95)` fill, and gains a medium drop shadow (`--shadow-medium`).
*   **Menu Links:** poppins font, `0.95rem`, font-weight `500`. Hover state triggers a subtle blue background block (`rgba(30,58,138,0.05)`) and draws an accent gold bottom-border (`--accent-color`) that expands from the center (`width: 80%`).

### Buttons
Buttons should feel tactile and premium, with distinct visual weights.

1.  **Primary Button (`.btn-primary`):**
    *   *Fill:* Blue gradient (`--gradient-primary`)
    *   *Corners:* 12px (`--border-radius`)
    *   *Font:* Poppins, Bold, All-Caps, `0.875rem`
    *   *Hover:* Translates up by `2px` with a broad shadow (`--shadow-large`).
2.  **Accent Button (`.btn-accent`):**
    *   *Fill:* Gold gradient (`--gradient-accent`)
    *   *Typography:* Dark text (`--text-dark`), Poppins, Bold, All-Caps
    *   *Hover:* Scale and translate transitions for high-conversion CTAs.
3.  **Outline Button (`.btn-outline-primary`):**
    *   *Stroke:* 2px solid Navy (`--primary-color`)
    *   *Fill:* Transparent.
    *   *Hover:* Fills with Navy gradient, text turns white.
4.  **Luxury Pill Button (`.btn-pill-gold`):**
    *   *Shape:* Fully rounded (`50px`)
    *   *Fill:* Linear gradient of Gold to Amber (`#D4AF37` to `#F3E5AB`)
    *   *Hover:* Translates up by `2px` with high-glow shadows.

### Cards & Containers
Urban Investors groups luxury cards into specific stylistic types:

*   **Standard Property Cards (`.property-card`):**
    *   *Background:* Warm white/light gray gradient (`#ffffff` to `#f8fafc`).
    *   *Corners:* `16px` (`--border-radius-lg`).
    *   *Elevation:* High-quality, soft shadow (`0 10px 30px rgba(0,0,0,0.1)`).
    *   *Hover:* Subtle lift (`translateY(-5px)`) and a Navy glow shadow expansion.
*   **Luxury Feature Cards (`.feature-card-luxury`):**
    *   *Background:* White with 1px border (`rgba(0,0,0,0.05)`).
    *   *Icon Wrapper:* Soft gold background (`rgba(212,175,55,0.1)`), circular.
    *   *Hover:* Outlines in gold, and rotates the icon along the Y-axis.
*   **Testimonial Cards (`.testimonial-card`):**
    *   *Decoration:* Generous top-left quotation mark in faded Accent Gold (`opacity: 0.3`).
    *   *Layout:* Includes circular avatar borders highlighted in Accent Gold.

### Forms & Inputs
Forms must appear uncluttered and feel secure.
*   **Control Styling:** 2px light navy border (`rgba(30,58,138,0.1)`), 12px rounded corners, generous interior padding.
*   **Focus State:** High-contrast navy outline (`--primary-color`), with a 3px soft shadow ring (`rgba(30,58,138,0.1)`).
*   **Luxury Forms:** Inputs inside deep-navy sections transition to a gold focus ring (`--gold-primary`) with subtle background opacity shifts.

### Tables (Luxury Data Grid)
Used to detail property plans, pricing, and sizing specifications.
*   **Header Theme:** Flat gradient from Deep Midnight to Navy (`#0b1e36` to `#1e3a8a`). Text is stylized in Playfair Display, Colored in Gold (`#D4AF37`).
*   **Body Styling:** Warm-white rows with thin, light border-bottoms (`rgba(0,0,0,0.04)`). Row hover states trigger a light gold wash (`rgba(212,175,55,0.03)`).
*   **Mobile Adaptability:** Columns stack vertically on screens under `768px`, converting table cells into key-value grids using the `data-label` attribute.

---

## 5. Layout & Spacing

Whitespace is treated as a premium asset, separating dense project details so they can be digested slowly.

### Spatial Spacing Scale
*   **Standard Padding (`.section-spacing`):** `5rem 0` (Used for average sections).
*   **Compact Padding (`.section-spacing-sm`):** `3rem 0` (Used for alerts, filters, and forms).
*   **Grand Padding (`.section-spacing-lg`):** `7rem 0` (Used for hero banners, brand overviews, and footers).

### Layout Grid Specifications
*   **Desktop Layout:** Max-width container of `1400px` (or `1320px` standard container).
*   **Gutters:** Generous `2rem` (32px) standard layout gaps.
*   **Responsive Collapsing:** Layouts drop gracefully to `100vw` edge-to-edge grids on mobile, scaling down padding to `1rem` and adjusting card widths for easy touch scrolling.

---

## 6. Depth & Elevation

Depth is created using a layered shadow system and tonal contrast.

*   **Level 0 (Flat):** Used for base backgrounds (`#ffffff` / `#f8fafc`).
*   **Level 1 (Soft Elevation):** `--shadow-light` (`0 1px 3px rgba(0,0,0,0.1)`). Used for static elements and secondary panels.
*   **Level 2 (Active Elevation):** `--shadow-medium` (`0 4px 6px rgba(0,0,0,0.1)`). Used for form inputs, navigation cards, and buttons.
*   **Level 3 (Luxury Elevation):** `--shadow-luxury` (`0 15px 45px rgba(11,30,54,0.08)`). Used for property displays and key highlights.
*   **Level 4 (Floating Overlays):** `--shadow-xl` (`0 25px 50px rgba(0,0,0,0.15)`). Used for booking modals and sticky bottom contact bars.

---

## 7. Animation & Transitions

All components use CSS transitions on interactive events to maintain a luxurious, premium feel.

*   **Fast Transitions:** `0.2s cubic-bezier(0.4, 0, 0.2, 1)` (Used for text color, hover underlines, toggles).
*   **Medium Transitions:** `0.3s cubic-bezier(0.4, 0, 0.2, 1)` (Used for button movements, cards, dropdowns).
*   **Slow Transitions:** `0.5s cubic-bezier(0.4, 0, 0.2, 1)` (Used for large image scales and backdrop blurs).

---

## 8. Implementation Quick Reference

Developers should utilize the following CSS custom properties directly in custom stylesheets:

```css
/* Color Palette */
color: var(--primary-color);
color: var(--secondary-color);
color: var(--accent-color);
background-color: var(--light-bg);

/* Typography */
font-family: var(--font-primary);    /* Playfair Display */
font-family: var(--font-secondary);  /* Inter */
font-family: var(--font-accent);     /* Poppins */

/* Borders & Shadows */
border-radius: var(--border-radius); /* 12px */
box-shadow: var(--shadow-medium);
box-shadow: var(--shadow-luxury);

/* Transitions */
transition: all var(--transition-medium);
```
