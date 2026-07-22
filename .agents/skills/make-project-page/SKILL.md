---
name: make-project-page
description: Create a new Noida property project page for the Urban Investors site from a brochure or details doc. Builds the full <slug>.html page and wires it into properties.html, sitemap.xml, and llms.txt. Use whenever the user wants to add a new project/property page.
---

# Make a new Urban Investors project page

This site is a set of static HTML property pages (Bootstrap 5, no build step). Every
project page shares the same structure — only the content values change. This skill
produces a complete, correctly-wired page so nothing gets forgotten.

Site domain: **urbaninvestors.in**
Company: **Urban Investors**
Region: **Noida / Greater Noida / Yamuna Expressway / NCR** (India only)

## Inputs (flexible)

The user provides project details one of two ways — accept either:
- **A brochure** (PDF/image/text dump) — extract the fields below from it.
- **A details doc / pasted notes** — read the fields straight from it.

**One project or many.** The input may describe a single project or several at once (a
doc listing multiple projects, or multiple brochures). When there are multiple, treat
each as its own project and run the full procedure (Steps 1–5) for each — see
"Batch mode" below.

If a required field is missing from what they gave you, ask for just those fields. Do
not invent prices, RERA numbers, or amenities — if unknown, omit that element rather
than guessing. Marketing copy (overview paragraphs, "why invest" blurbs) you may write.

### Fields to collect
- **Project name** + **developer** (e.g. "Sobha Rivana" / "Sobha Limited")
- **Slug** — kebab-case, e.g. `sobharivana`. The **file on disk is `<slug>.html`**,
  but **every link is extensionless** (`href="<slug>"`) — the site rewrites URLs via
  .htaccess. Never put `.html` in an `href`, canonical, OG url, breadcrumb, or sitemap
  `<loc>`. (The *only* place `.html` appears is the `llms.txt` Page line — existing
  convention — and the filename itself.)
- **Location** — area + city (e.g. "Sector 10, Greater Noida West")
- **Starting price** (e.g. "₹2 Cr* Onwards") + a one-line price subtitle
- **Property type** (Apartments / Villas / Townhouses / Commercial / Independent Floors …)
- **Project status badge** (New Launch / Pre-Launch / Under Construction / Ready …)
- **Unit configuration** (e.g. "3, 4 & 5 BHK")
- **3–4 "Why invest" highlights** (icon + title + one line each)
- **4 overview feature cards** (icon + title + one line)
- **Price/config table rows** (unit type, description, price, availability)
- **6-ish amenities** (icon + title + description)
- **Nearby destinations** with drive times (for the Location section)
- **Investor highlights** (bullet list)
- **Images** — see below

### Images
Images live in `images/<Project Name>/`. **The folder name must have no leading or
trailing spaces** (a trailing space deploys but then breaks `chmod` on the server).
If the uploaded folder has stray spaces, `git mv` it to the trimmed name and update
every reference before continuing.

**All images on the page must be `.webp`.** The user often uploads `.jpg`/`.jpeg`/`.png`
— convert these to `.webp` and delete the originals **before** building the page
(see Step 1 below). The page needs:
- 1 hero main image + 2 hero sub-images
- 4 gallery carousel images (can reuse hero images if only a few exist)
- 1 listing-card thumbnail (used in `properties.html`)

Reference them with the exact relative path, e.g.
`images/sobharivana/hero.webp`.

## Batch mode (multiple projects at once)

You can process several projects in one run. When the input covers more than one:

1. **First, list the projects** you parsed (name, slug, image folder) and show
   that short list back to the user before building, so mismatches are caught early.
   If any project is missing required fields or its image folder, flag just those.
2. **Process them one at a time**, fully completing Steps 1–5 for a project before moving
   to the next. This keeps each project's edits isolated and easy to review.
3. **Match images to projects** by folder name (`images/<Project Name>/`). Don't share or
   cross-wire images between projects. If a folder is missing, ask which folder belongs to
   that project rather than guessing.
4. **End with a summary table**: one row per project → slug and the 4 files
   touched, so the user can verify the whole batch at a glance.

Do the work directly (no need to spawn sub-agents); just keep the projects clearly
separated in your edits and output.

## Procedure

### 0. Reference values (Noida / India only)

| Setting | Value |
|---|---|
| Copy template from | `sobharivana.html` (cleanest current example) |
| Listing page (Step 3) | `properties.html` |
| Currency / price style | `₹2 Cr* Onwards` / `₹87 Lacs Onwards` / `₹16,995/sq.ft+` |
| Breadcrumb level-2 | "Properties" → `/properties` |
| Geo tags | `geo.region` `IN-UP`, `geo.placename` `Noida`, `content-language` `en-IN` |
| llms.txt section (Step 5) | `## Property Listings` |
| Domain | `urbaninvestors.in` |
| Author | `Urban Investors` |

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

### 2. Build `<slug>.html`

Copy **`sobharivana.html`** — it is the cleanest current template. Copy it and replace
every project-specific value. Walk through these spots (all present in the template):

- `<title>`, meta `description`, meta `keywords`, author stays "Urban Investors"
- Open Graph `og:title` / `og:description` / `og:url` and Twitter tags
- Canonical link `<link rel="canonical" href="https://urbaninvestors.in/<slug>"/>`
- Structured Data JSON-LD (`@type`, `name`, `description`, `address`, `developer`)

**Structured Data Requirements:**
Every project page MUST include these JSON-LD schemas in `<head>`:

1. **ApartmentComplex / CommercialEvent / LandPlot schema** (main property info):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "ApartmentComplex",
     "name": "<Project Name>",
     "description": "<Detailed description with price, location, key features>",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "<Sector/Area>",
       "addressLocality": "<City>",
       "addressRegion": "Uttar Pradesh",
       "postalCode": "<PIN if known>",
       "addressCountry": "India"
     },
     "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." },
     "developer": { "@type": "Organization", "name": "<Developer Name>" },
     "image": "https://urbaninvestors.in/images/<project-folder>/<hero-image>.webp",
     "numberOfBedrooms": "<BHK options>",
     "floorSize": { "@type": "QuantitativeValue", "minValue": ..., "maxValue": ..., "unitText": "sq.ft" },
     "priceRange": "<e.g. ₹2 Cr - ₹3 Cr>",
     "amenityFeature": [
       { "@type": "LocationFeatureSpecification", "name": "Clubhouse" },
       { "@type": "LocationFeatureSpecification", "name": "Swimming Pool" },
       ...
     ]
   }
   ```

2. **FAQPage schema** (for rich snippets):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       { "@type": "Question", "name": "What is <Project Name>?", "acceptedAnswer": { "@type": "Answer", "text": "..." } },
       { "@type": "Question", "name": "Where is <Project Name> located?", "acceptedAnswer": { "@type": "Answer", "text": "..." } },
       { "@type": "Question", "name": "What configurations are available?", "acceptedAnswer": { "@type": "Answer", "text": "..." } },
       { "@type": "Question", "name": "Is <Project Name> a good investment?", "acceptedAnswer": { "@type": "Answer", "text": "..." } },
       { "@type": "Question", "name": "Why should I invest through Urban Investors?", "acceptedAnswer": { "@type": "Answer", "text": "Urban Investors offers verified project information, professional consultation, transparent pricing assistance, site visit support, and complete guidance throughout your investment journey." } }
     ]
   }
   ```

3. **VideoObject schema** (if YouTube video embedded on page):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "VideoObject",
     "name": "<Project Name> - Expert Property Analysis",
     "description": "Complete review and expert analysis of <Project Name>...",
     "thumbnailUrl": "https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg",
     "uploadDate": "<approx date>",
     "duration": "PT10M",
     "embedUrl": "https://www.youtube.com/embed/<VIDEO_ID>",
     "contentUrl": "https://www.youtube.com/watch?v=<VIDEO_ID>"
   }
   ```
   
   > **CRITICAL SEO RULE:** When embedding the video in the HTML, the `iframe` must use the standard `src` attribute with `loading="lazy"`. **NEVER** use javascript-based lazy loading like `data-src="..."` for video iframes. If `src` is missing, Googlebot will fail to associate the `VideoObject` structured data with the page DOM.

- BreadcrumbList JSON-LD (if present — position-3 name + item = this project)
- Hero: badges, `<h1>` name + "BY <DEVELOPER>", location row, developer line
- Price bar: price, subtitle, status badge
- Project Configuration cards (4), "Why Invest" highlights
- Enquiry form `select` options (match the unit types)
- Project Overview heading + lead paragraph + 4 feature cards
- Property Configuration table rows (+ WhatsApp "Enquire" links with the project name
  URL-encoded in the `?text=` param)
- Gallery carousel (indicators count must match slide count) + captions
- Amenities cards, Location "Nearby Destinations", Investor highlights
- All image `src` attributes → point to files in `images/<Project Name>/`

**Leave global blocks byte-for-byte identical**: nav, WhatsApp float, mobile CTA bar,
contact form (`#contactForm` with hidden `token` field), footer, the two `<script>`
tags at the end (`script.js` and `lead-magnet.js`), and the analytics/Google Tag
Manager snippet in `<head>` (GA ID: `G-EYY9YSKPZY`).

Keep phone numbers, emails, and office addresses exactly as in the template.

### 3. Add the listing card to `properties.html`

Insert a new card at the **top** of the `<div ... id="properties-grid">` grid (newest
first), matching the existing card markup exactly. Use ₹ currency in the price span.

**Also update the properties.html JSON-LD structured data:**
Add the new project to the `ItemList` schema's `itemListElement` array (increment position):
```json
{
  "@type": "ListItem",
  "position": <next number>,
  "item": {
    "@type": "ApartmentComplex",
    "name": "<Project Name>",
    "description": "<Brief description>",
    "url": "https://urbaninvestors.in/<slug>",
    "image": "images/<project-folder>/<thumbnail>.webp"
  }
}
```

The `data-*` attributes for the filter system — fill
them accurately:

```html
<!-- <Project Name> Card -->
<div class="col-lg-4 col-md-6 mb-4"
     data-amenities="gym,pool,club,security"
     data-bhk="3,4"
     data-location="noida"
     data-price-range="<price-tag>"
     data-property-type="apartment"
     data-status="new-launch">
<div class="property-card bg-white rounded-4 overflow-hidden shadow-sm h-100">
<div class="position-relative">
<img alt="<Project Name>" class="img-fluid w-100 property-img" loading="lazy"
     src="<card-thumbnail.webp>" style="height: 200px; object-fit: cover;"/>
<div class="position-absolute top-0 start-0 m-3">
<span class="badge bg-primary px-3 py-2 rounded-pill shadow-sm"><Status Badge></span>
</div>
</div>
<div class="p-4">
<div class="d-flex justify-content-between align-items-center mb-3">
<span class="text-primary fw-bold fs-5"><₹ price></span>
<span class="text-muted small"><i class="fas fa-map-marker-alt me-1"></i><Area></span>
</div>
<h3 class="h5 fw-bold mb-3 text-dark"><Project Name></h3>
<div class="d-flex gap-3 mb-4 text-muted small">
<span><i class="fas fa-bed me-2"></i><BHK config></span>
<span><i class="fas fa-building me-2"></i><Type></span>
</div>
<a class="btn btn-outline-primary w-100 rounded-pill" href="<slug>">
                  View Details <i class="fas fa-arrow-right ms-2"></i>
</a>
</div>
</div>
</div>
```

#### `data-*` attribute reference
| Attribute | Values (match existing cards) |
|---|---|
| `data-location` | `noida`, `greater-noida`, `yamuna-expressway`, `prayagraj` |
| `data-property-type` | `apartment`, `villa`, `commercial`, `independent-floor` |
| `data-status` | `new-launch`, `pre-launch`, `under-construction`, `ready` |
| `data-bhk` | Comma-separated: `1,2,3,4`, or `commercial` for non-residential |
| `data-amenities` | Comma-separated: `gym,pool,club,security,garden,parking` etc. |
| `data-price-range` | The price string like `2.34cr`, `87lacs`, `on-request` |

### 4. Add to `sitemap.xml`

Add at the end of the `<!-- Property Listings -->` block (before the
`<!-- Legal Pages -->` comment). Use today's date for `lastmod` and the extensionless
`<loc>`:

```xml
  <url>
    <loc>https://urbaninvestors.in/<slug></loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
```

### 5. Add to `llms.txt`

Add an entry at the end of the `## Property Listings` section — before the
`## Legal` heading. Note: the `Page` URL here **includes `.html`** (the only link that
does — existing convention):

```
- [<Project Name>](https://urbaninvestors.in/<slug>): <Short description, price, and location>.
```

Match the format of existing entries, e.g.:
```
- [Sobha Rivana](https://urbaninvestors.in/sobharivana): Luxury apartment complex by Sobha.
```

### 6. Add Deep Dive Investment Guide section

Every project page MUST include a "Deep Dive Investment Guide" section positioned **ABOVE the Contact Section** (before "Schedule Your Consultation"). This placement ensures users read the investment rationale before seeing the contact form, improving conversion.

**Insert position:** Place after all content sections, but BEFORE:
```html
<!-- Contact Section -->
<section id="contact" class="py-5 bg-primary text-white">
```

**Structure:**
```html
<!-- Deep Dive Investment Guide -->
<section class="py-5 mt-5">
  <div class="container">
    <div class="text-center mb-5">
      <h2 class="fw-bold text-dark">Deep Dive Investment Guide</h2>
      <p class="text-muted">Everything you need to know about <Project Name></p>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="accordion accordion-flush shadow-sm rounded-4 border" id="deepDiveAccordion">
          <!-- 6 accordion items - ALL COLLAPSED BY DEFAULT -->
        </div>
      </div>
    </div>
  </div>
</section>
```

**CRITICAL: All accordions must be collapsed by default:**
- Button classes: `accordion-button collapsed fw-bold text-primary fs-5`
- Button attribute: `aria-expanded="false"`
- Accordion body: `class="accordion-collapse collapse"` (NO "show")
- Remove `rounded-top-4` from first item button unless it's the only one

**Example of correct collapsed state:**
```html
<!-- Item 1 -->
<div class="accordion-item rounded-top-4">
  <h2 class="accordion-header">
    <button class="accordion-button collapsed fw-bold text-primary fs-5 rounded-top-4" 
            type="button" data-bs-toggle="collapse" data-bs-target="#ddCollapse1" 
            aria-expanded="false">
      Why <Project Name>?
    </button>
  </h2>
  <div id="ddCollapse1" class="accordion-collapse collapse" data-bs-parent="#deepDiveAccordion">
    <div class="accordion-body text-muted lh-lg">
      Content here...
    </div>
  </div>
</div>
```

**6 content blocks (customize for each project):**

1. **Why <Project Name>?** - Investment rationale, what makes this project special
2. **About <Project Name>: <Tagline>** - Project overview, developer reputation, key differentiators
3. **<Project Name> Highlights** - Bullet list of key advantages (pricing, location, amenities, developer)
4. **Unit Configurations / Commercial Spaces** - Detailed breakdown of available units:
   - Residential: BHK types, sizes, target demographics
   - Commercial: Office sizes, ideal businesses, target industries
   - Land/Plots: Size ranges, development potential
5. **Location Advantages: <Area Name>** - Connectivity, infrastructure, future developments, proximity benefits
6. **Investment Potential** - Capital appreciation, rental yields, market trends, ROI expectations

**Content guidelines:**
- Adapt tone to property type (residential = lifestyle-focused, commercial = ROI-focused)
- Include specific details: sector numbers, expressway names, distances to key landmarks
- Reference infrastructure developments (Jewar Airport, metro extensions, highways)
- Highlight developer credibility with track record points
- Always mention Urban Investors' role in Step 6

**Example from grandthum-tower-c.html (lines 1560-1697):**
- Commercial project emphasis on office ecosystem, rental yields
- Reference to mixed-use development advantages
- Specific ROI potential and target tenant industries

## Finish

- Report the 4 files touched and the new page's path:
  1. `<slug>.html` (new)
  2. `properties.html` (card added + ItemList updated)
  3. `sitemap.xml` (URL added)
  4. `llms.txt` (entry added)
- Quick sanity check:
  - Gallery indicator count == slide count
  - Canonical / OG URLs use the extensionless slug
  - WhatsApp links carry the right project name
  - No leftover template text from `sobharivana.html`
  - All image `src` paths end in `.webp` and point to the correct project folder
  - `data-*` filter attributes on the properties card are accurate
  - JSON-LD schemas present: ApartmentComplex, FAQPage, VideoObject (if video)
  - **Deep Dive Investment Guide section present before footer** (6 accordion items)
- **Recommended:** Run `apply-seo` skill to verify all structured data is in place.
- Do **not** commit or push unless the user asks.
