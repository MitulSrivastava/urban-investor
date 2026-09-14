---
name: make-project-page
description: Create a new Noida property project page for the Urban Investors site from a brochure or details doc. Builds the full <slug>.html page and wires it into properties.html, sitemap.xml, and llms.txt. Use whenever the user wants to add a new project/property page.
---

# Make a new Urban Investors project page

This site is a set of static HTML property pages (Bootstrap 5, no build step). Every
project page shares the same structural framework (Bootstrap 5 grid, cards, accordions,
modals, and forms), but **EVERY PIECE OF CONTENT MUST BE WRITTEN 100% FRESH**.

> [!CAUTION]
> **STRICT ANTI-LEAKAGE RULE: ZERO "SOBHA RIVANA" LEFTOVERS**
> In the past, copying `sobharivana.html` resulted in leftover Sobha Rivana text, Sobha Limited
> developer bios, Sobha amenities, and Sobha Deep Dive text appearing across newly generated pages.
> **DO NOT simply clone `sobharivana.html` and do a find-and-replace!**
> `sobharivana.html` must ONLY be used as a structural visual reference for DOM elements, Bootstrap
> classes, and grid hierarchy. Every sentence of marketing copy, overview, "Why Invest", amenities,
> developer bio, FAQ questions/answers, and Deep Dive accordions **MUST BE WRITTEN BESPOKE** for the
> new project from its brochure.

Site domain: **urbaninvestors.in**
Company: **Urban Investors**
Region: **Noida / Greater Noida / Yamuna Expressway / NCR** (India only)

## Inputs (flexible)

The user provides project details one of two ways — accept either:
- **A brochure** (PDF/image/text dump) — extract the fields below from it.
- **A details doc / pasted notes** — read the fields straight from it.

> [!IMPORTANT]
> **MANDATORY FIRST STEP: ASK FOR THE UIR CODE**
> Urban Investors assigns a unique tracking identifier to every project (e.g. `UIR-026`, `UIR-027`).
> Before generating or finalizing the page, check `lead-magnet.js` under `const PROJECTS` to find the
> highest currently used UIR code, then **explicitly ask the user**:
> > *"What is the UIR Code for this project? (The last registered code in lead-magnet.js was `UIR-XXX`, so this may be `UIR-YYY`)."*
>
> You MUST have this code to populate pre-filled WhatsApp links and register the project in `lead-magnet.js`.

If a required field is missing from what they gave you, ask for just those fields. Do
not invent prices, RERA numbers, or amenities — if unknown, omit that element rather
than guessing. Marketing copy (overview paragraphs, "why invest" blurbs, deep dive guides)
you may write fresh based on the developer and micro-market analysis.

### Fields to collect
- **UIR Code (MANDATORY)** — e.g. `UIR-027`. Ask the user for this code.
- **Project name** + **developer** (e.g. "Migsun Nehru Place" / "Migsun Group")
- **Slug** — kebab-case, e.g. `migsun-nehru-place`. The **file on disk is `<slug>.html`**,
  but **every link is extensionless** (`href="<slug>"`) — the site rewrites URLs via
  .htaccess. Never put `.html` in an `href`, canonical, OG url, breadcrumb, or sitemap
  `<loc>`. (The *only* place `.html` appears is the `llms.txt` Page line — existing
  convention — and the filename itself.)
- **Location** — area + city (e.g. "Sector 22D, Yamuna Expressway" or "Sector 142, Noida")
- **Starting price** (e.g. "₹2 Cr*") + a one-line price subtitle. **Pricing Format Rule:** Always append `*` instead of `+` or `Onwards` after Lakhs/Lacs/Cr/Crore (e.g., `₹77 Lacs*`). For per sq.ft pricing, use `sq.ft*` instead of `sq.ft+` (e.g., `₹16,995/sq.ft*`).
- **Property type** (Apartments / Villas / Townhouses / Commercial / Independent Floors / Studio Apartments / Land Plots …)
- **Project status badge** (New Launch / Pre-Launch / Under Construction / Ready to Move …)
- **Unit configuration** (e.g. "3, 4 & 5 BHK" or "Retail Shops & Office Spaces")
- **3–4 "Why invest" highlights** (icon + title + one line each) — written fresh for this project
- **4 overview feature cards** (icon + title + one line) — written fresh for this project
- **Price/config table rows** (unit type, description/size, price, availability)
- **6-ish amenities** (icon + title + description) — matching actual brochure amenities
- **Nearby destinations** with drive times (for the Location section — actual local landmarks)
- **Developer background** (history, track record, delivered projects of the actual builder)
- **Investor highlights** (bullet list of ROI, appreciation drivers, rental yield)
- **Images** — see below

### Images
Images live in `images/<Project Name>/`. **The folder name must have no leading or
trailing spaces** (a trailing space deploys but then breaks `chmod` on the server).
If the uploaded folder has stray spaces, `git mv` it to the trimmed name and update
every reference before continuing.

**All images on the page must be `.webp`.** The user often uploads `.jpg`/`.jpeg`/`.png`
— convert these to `.webp` and delete the originals **before** building the page
(see Step 1 below).

**Image SEO Naming Standard (MANDATORY):**
- Name images descriptively using lowercase kebab-case:
  `[project-slug]-[feature-or-amenity]-[view-or-perspective].webp`
  (e.g., `migsun-nehru-place-commercial-tower-elevation.webp`, `migsun-nehru-place-retail-high-street-shops.webp`).
- **NEVER** use generic names like `hero.webp`, `thumbnail.webp`, `gallery1.webp`, `banner1.webp` or camera dumps `imgi_...`, `WhatsApp...`.
- Ensure NO spaces or special characters exist in any filename.
- Reference them with the exact relative path, e.g. `images/migsun-nehru-place/migsun-nehru-place-tower-elevation.webp`.

## Batch mode (multiple projects at once)

You can process several projects in one run. When the input covers more than one:

1. **First, list the projects** you parsed (name, slug, image folder, and ask for each project's UIR code)
   and show that short list back to the user before building, so mismatches are caught early.
   If any project is missing required fields or its image folder, flag just those.
2. **Process them one at a time**, fully completing Steps 1–6 for a project before moving
   to the next. This keeps each project's edits isolated and easy to review.
3. **Match images to projects** by folder name (`images/<Project Name>/`). Don't share or
   cross-wire images between projects. If a folder is missing, ask which folder belongs to
   that project rather than guessing.
4. **End with a summary table**: one row per project → slug, UIR code, and the 5 files
   touched, so the user can verify the whole batch at a glance.

Do the work directly (no need to spawn sub-agents); just keep the projects clearly
separated in your edits and output.

## Procedure

### 0. Reference values (Noida / India only)

| Setting | Value |
|---|---|
| Structural DOM reference | `sobharivana.html` (Use ONLY for CSS classes/grid layout; NEVER copy text!) |
| Listing page (Step 3) | `properties.html` |
| Lead Magnet dictionary (Step 5) | `lead-magnet.js` |
| Currency / price style | `₹2 Cr*` / `₹87 Lacs*` / `₹16,995/sq.ft*` (never use `+` or `Onwards`) |
| Breadcrumb level-2 | "Properties" → `/properties` |
| Geo tags | `geo.region` `IN-UP`, `geo.placename` `Noida`, `content-language` `en-IN` |
| llms.txt section (Step 6) | `## Property Listings` |
| Domain | `urbaninvestors.in` |
| Author | `Urban Investors` |
| Official WhatsApp Phone | `+91 11 4473 9693` (API format: `911144739693`) |

### 1. Convert any JPG/PNG images to .webp (and delete originals)

List the project's image folder first. If it contains any `.jpg`/`.jpeg`/`.png`, convert
each to `.webp` and remove the original (only after a successful convert). Requires
`cwebp` (install once with `brew install webp` if missing). Run from the repo root:

```bash
find "images/<Project Name>" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 \
  | while IFS= read -r -d '' f; do
      cwebp -q 82 "$f" -o "${f%.*}.webp" && rm "$f"
    done
```

`-q 82` is a good size/quality balance. After this, the folder should contain only
`.webp` files — reference those in the page. Never link a `.jpg`/`.png` from the HTML.

### 2. Build `<slug>.html` (100% Fresh Copywriting)

Use **`sobharivana.html`** strictly for the page scaffolding, Bootstrap classes, responsive grid layout, and JS includes. Every line of user-facing content must be written fresh from the new project's materials.

Walk through these sections and write fresh content:

#### A. Head, SEO & Meta Tags
- `<title>`: MUST be a **single line**: `<title>text</title>` — never split across lines.
  - **Format:** `<title>[Project Name] - [Product Type], [Sector/Location] | Price & Floor Plan | Urban Investors</title>`
  - Examples:
    ```html
    <title>Gaur Chrysalis - Luxury 3 &amp; 4 BHK, Sector 22D Yamuna Expressway | Price &amp; Floor Plan | Urban Investors</title>
    <title>Migsun Nehru Place - Premium Commercial Suites &amp; Retail, Greater Noida | Price &amp; Floor Plan | Urban Investors</title>
    ```
- Meta `description`: 150–160 chars summarizing the project's exact offering, starting price, location, developer, and key connectivity.
- Meta `keywords`:
  - `[Project Name] price`, `[Project Name] price list`
  - `[Project Name] floor plan`, `[Project Name] brochure`
  - `[Project Name] payment plan`
  - `[Project Name] RERA` + the actual RERA registration number
  - `[Project Name] possession date`
  - Unit-specific: `[Project Name] 3 BHK price`, etc.
  - For Yamuna Expressway / Greater Noida: `near Jewar Airport`, `near Noida International Airport`
  - For commercial: `[Project Name] rental yield`, `[Project Name] office space`
- Canonical: `<link rel="canonical" href="https://urbaninvestors.in/<slug>"/>` (NO `.html`)
- Open Graph & Twitter tags: title, description, image (`https://urbaninvestors.in/images/<project-folder>/<hero-image>.webp`), url (`https://urbaninvestors.in/<slug>`).

#### B. Structured Data JSON-LD (Fresh Data Only)
Every project page MUST include these JSON-LD schemas in `<head>`:

1. **ApartmentComplex / CommercialComplex / LandPlot schema**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "ApartmentComplex",
     "name": "<Project Name>",
     "description": "<Detailed description with price, location, developer, key features>",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "<Sector/Area>",
       "addressLocality": "<City>",
       "addressRegion": "Uttar Pradesh",
       "postalCode": "<PIN>",
       "addressCountry": "India"
     },
     "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." },
     "developer": { "@type": "Organization", "name": "<Developer Name>" },
     "image": "https://urbaninvestors.in/images/<project-folder>/<hero-image>.webp",
     "numberOfBedrooms": "<BHK options>",
     "floorSize": { "@type": "QuantitativeValue", "minValue": ..., "maxValue": ..., "unitText": "sq.ft" },
     "priceRange": "<e.g. ₹2 Cr - ₹3.5 Cr*>",
     "amenityFeature": [
       { "@type": "LocationFeatureSpecification", "name": "<Amenity 1>" },
       { "@type": "LocationFeatureSpecification", "name": "<Amenity 2>" }
     ]
   }
   ```

2. **FAQPage schema** (5+ bespoke questions & answers specifically about THIS project):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       { "@type": "Question", "name": "What is <Project Name>?", "acceptedAnswer": { "@type": "Answer", "text": "<Bespoke description>" } },
       { "@type": "Question", "name": "Where is <Project Name> located and what is its connectivity?", "acceptedAnswer": { "@type": "Answer", "text": "<Bespoke location description>" } },
       { "@type": "Question", "name": "What are the available configurations and starting prices in <Project Name>?", "acceptedAnswer": { "@type": "Answer", "text": "<Bespoke pricing details>" } },
       { "@type": "Question", "name": "What is the RERA registration number of <Project Name>?", "acceptedAnswer": { "@type": "Answer", "text": "<Actual RERA number>" } },
       { "@type": "Question", "name": "Why should I invest in <Project Name> through Urban Investors?", "acceptedAnswer": { "@type": "Answer", "text": "Urban Investors offers verified inventory, transparent direct developer pricing, priority allotment assistance, complimentary site visits, and end-to-end documentation advisory with zero brokerage." } }
     ]
   }
   ```

3. **VideoObject schema** (if a YouTube review video is embedded):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "VideoObject",
     "name": "<Project Name> - Expert Property Review",
     "description": "Comprehensive review, master plan walkthrough, and investment analysis of <Project Name>...",
     "thumbnailUrl": "https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg",
     \"uploadDate\": \"2024-01-01\",
     "duration": "PT10M",
     "embedUrl": "https://www.youtube.com/embed/<VIDEO_ID>",
     "contentUrl": "https://www.youtube.com/watch?v=<VIDEO_ID>"
   }
   ```
   > **Note on Video Iframe:** The embedded `<iframe>` MUST have a standard `src` attribute with `loading="lazy"`. Never use `data-src="..."` for YouTube iframes.

#### C. Pre-filled WhatsApp Links Specification (MANDATORY UIR CODE)
Every project page includes multiple WhatsApp action buttons. **Every single link MUST include the user-provided `[UIR-XXX]` code** at the end of the URL-encoded query string:

| Button / Location | URL Structure & Pre-filled Message Text |
|---|---|
| **Hero Section (Brochure CTA)** | `https://wa.me/911144739693?text=Please%20provide%20me%20with%20brochure%20and%20offer%20pricing%20of%20<Project+Name>%20[<UIR-CODE>]` |
| **Quick Consultation Card** | `https://wa.me/911144739693?text=Tell%20me%20more%20about%20<Project+Name>%20[<UIR-CODE>]` |
| **Expert Guidance CTA** | `https://wa.me/911144739693?text=Guide%20me%20for%20this%20project%20<Project+Name>%20[<UIR-CODE>]` |
| **Configuration Table (Row Buttons)** | `https://wa.me/911144739693?text=I%20am%20interested%20in%20<Unit+Type>%20in%20<Project+Name>%20[<UIR-CODE>]` |
| **Complete Price List CTA** | `https://wa.me/911144739693?text=Please%20share%20the%20complete%20price%20list%20for%20<Project+Name>%20[<UIR-CODE>]` |
| **Footer WhatsApp Icon** | `https://wa.me/911144739693?text=Hi%20Urban%20Investors,%20I%20am%20interested%20in%20this%20property%20[<UIR-CODE>]` |

*Example for Palm Village with UIR-025:*
`https://wa.me/911144739693?text=Please%20provide%20me%20with%20brochure%20and%20offer%20pricing%20of%20Palm%20Village%20[UIR-025]`

#### D. Page Content Sections (Write Bespoke)
1. **Hero Header:**
   - Badges: Status (e.g. `NEW LAUNCH`), Property Type, Location
   - `<h1>`: Project Name + `<span class="d-block fs-4 fw-normal text-white-50 mt-1">BY <DEVELOPER></span>`
   - Location row with pin icon
2. **Pricing & Stats Ribbon:**
   - Starting price (`₹X.XX Cr*` or `₹XX Lacs*`)
   - Price subtitle / per sq.ft rate
   - RERA Registration Number badge
3. **Why Invest in [Project Name]:**
   - 3 to 4 distinct value propositions (e.g. High Capital Growth Corridor, Builder Track Record, Low Density Living, Institutional Infrastructure).
4. **Project Overview & 4 Feature Cards:**
   - Bespoke paragraphs introducing the development concept.
   - 4 cards highlighting Total Land Area, Towers/Floors, Green Open Space %, Possession Timeline.
5. **Configuration & Pricing Table:**
   - Responsive Bootstrap table with unit types, carpet/super areas, indicative pricing (`₹...*`), and "GET PRICE" / "ENQUIRE" WhatsApp buttons with the specific unit type and `[UIR-XXX]`.
6. **Amenities Section:**
   - 6 to 9 distinct amenities with FontAwesome icons (e.g., Olympic Lap Pool, Clubhouse, Co-working Lounge, Badminton Court, 3-Tier Security, Landscaped Greens).
7. **Location & Connectivity:**
   - Proximity cards with realistic travel times (e.g., Noida-Gr. Noida Expressway - 5 mins, Metro Station - 7 mins, Jewar Airport - 25 mins, DND Flyway - 20 mins).
8. **Developer Profile:**
   - MUST be the actual developer of this project! (e.g., Gaur Group, Migsun, ACE, Eldeco, Fairfox, Splendor).
   - Write their verified portfolio, delivered square footage, and credibility metrics. **NEVER mention Sobha Limited unless the project is actually by Sobha.**
9. **Deep Dive Investment Guide (Detailed in Section 7 below):**
   - 6 accordion items — **ALL COLLAPSED BY DEFAULT** (`aria-expanded="false"`, no `show` class).
10. **FAQ Section:**
    - Accordion matching the FAQPage JSON-LD schema with questions and answers tailored to this project.

#### E. Global Elements (Preserve Intact)
Keep these global elements identical:
- Navbar brand, navigation links, and desktop phone CTA
- Contact Form `#contactForm` with hidden `token` field
- Footer with Urban Investors office addresses, phone numbers, emails, and RERA disclaimer
- The two script tags at the bottom:
  ```html
  <script src="script.js"></script>
  <script src="lead-magnet.js"></script>
  ```
- Google Tag Manager snippet (`G-EYY9YSKPZY`) in `<head>`

---

### 3. Add Listing Card to `properties.html`

1. **Insert new card at the top** of `<div class="row g-4" id="properties-grid">` (newest first).
2. Use ₹ currency in price span.
3. Accurate `data-*` filter attributes:
   - `data-location`: `noida`, `greater-noida`, `yamuna-expressway`, `prayagraj`
   - `data-property-type`: `apartment`, `villa`, `commercial`, `independent-floor`
   - `data-status`: `new-launch`, `pre-launch`, `under-construction`, `ready`
   - `data-bhk`: `1,2,3,4` or `commercial`
   - `data-amenities`: `gym,pool,club,security,garden,parking`
   - `data-price-range`: `2.34cr`, `87lacs`, `on-request`

4. **Update the `ItemList` JSON-LD Structured Data in `properties.html`:**
   Add a new `ListItem` at position 1 (and shift others or append at next position):
   ```json
   {
     "@type": "ListItem",
     "position": <number>,
     "item": {
       "@type": "ApartmentComplex",
       "name": "<Project Name>",
       "description": "<Brief description>",
       "url": "https://urbaninvestors.in/<slug>",
       "image": "images/<project-folder>/<card-image>.webp"
     }
   }
   ```

---

### 4. Add to `sitemap.xml`

Insert before `<!-- Legal Pages -->`:
```xml
  <url>
    <loc>https://urbaninvestors.in/<slug></loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
```

---

### 5. Register in `lead-magnet.js`

Add the project slug, display name, and user-provided UIR code into the `PROJECTS` dictionary in `lead-magnet.js`:
```javascript
  "<slug>": { name: "<Project Name>", uirCode: "<UIR-CODE>" },
```
*Example:*
```javascript
  "migsun-nehru-place": { name: "Migsun Nehru Place", uirCode: "UIR-019" },
```

---

### 6. Add to `llms.txt`

Add an entry at the end of `## Property Listings` (before `## Legal`):
```
- [<Project Name>](https://urbaninvestors.in/<slug>): <Short description, price, and location>.
```

---

### 7. Deep Dive Investment Guide Section Rules

Position: Placed right **ABOVE the Contact Section** (`<section id="contact" ...>`).

**Accordion Collapse Rule (CRITICAL):**
Every accordion item **MUST BE COLLAPSED BY DEFAULT**.
- Button: `class="accordion-button collapsed fw-bold text-primary fs-5"` and `aria-expanded="false"`
- Collapse container: `class="accordion-collapse collapse"` (NO `show` class on any item)

**6 Bespoke Accordion Items:**
1. **Why Invest in <Project Name>?** — Strategic advantages, location upside, unique selling points.
2. **About <Project Name>: <Project Tagline>** — Development vision, architectural concept, master layout.
3. **<Project Name> Highlights** — Bulleted summary of high-value specs (e.g. low density, ceiling heights, green views).
4. **Unit Configurations & Floor Plans** — In-depth breakdown of unit sizes, carpet efficiencies, layout options.
5. **Location Advantages & Connectivity: <Sector/Area>** — Infrastructure catalysts (Jewar Airport, FNG, Metro, Expressway connectivity).
6. **Investment Potential & ROI Analysis** — Expected rental yields, historical capital appreciation in sector, 3–5 year outlook.

---

## Post-Generation Sanity Check & Verification Checklist

Before reporting completion to the user, run these strict verification checks:

- [ ] **UIR Code Prompted & Applied:** The user was asked for the UIR code and all WhatsApp links contain `[UIR-XXX]`.
- [ ] **ZERO Sobha / Rivana Leakage:** Grep `<slug>.html` for `Sobha` and `Rivana` (case-insensitive). If the project is NOT Sobha, result MUST be 0 matches.
- [ ] **100% Fresh Content:** Overview, Developer Profile, "Why Invest", Amenities, Deep Dive Guide, and FAQs are bespoke to this project.
- [ ] **All Deep Dive Accordions Collapsed:** None of the 6 accordion items contain the class `show`. All buttons have `class="... collapsed"`.
- [ ] **Image SEO:** All image filenames use kebab-case (`project-feature-view.webp`), exist in the filesystem, and have accurate descriptive `alt` tags. No `.jpg` or `.png` images remain.
- [ ] **Single-Line Title:** `<title>` tag is strictly on a single line and contains transactional keywords ("Price & Floor Plan | Urban Investors").
- [ ] **No Broker Terminology:** Zero occurrences of "dealer", "broker", "agent", or "cheap".
- [ ] **Properties Card Filterable:** Correct `data-*` attributes set on the card in `properties.html`.
- [ ] **Registered in `lead-magnet.js`:** Added to `PROJECTS` dictionary with proper UIR code.
- [ ] **Sitemap & llms.txt Updated:** Both updated with the clean extensionless URL.
- [ ] **All 5 Files Reported:**
  1. `<slug>.html` (new)
  2. `properties.html`
  3. `sitemap.xml`
  4. `lead-magnet.js`
  5. `llms.txt`

