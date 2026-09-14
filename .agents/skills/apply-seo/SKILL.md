---
name: apply-seo
description: Apply comprehensive SEO optimizations to Urban Investors property pages. Adds structured data (ApartmentComplex/FAQPage/VideoObject), optimizes image filenames and alt tags for Image SEO, improves meta descriptions, fixes og:image, and updates properties.html ItemList. Run after creating a new property page or to audit existing pages.
---

# Apply SEO to Property Pages

Optimize Urban Investors property pages for search engines. This skill ensures every
page has proper structured data, meta tags, optimized image assets, and is properly indexed.

Site domain: **urbaninvestors.in**

## When to Use

- After creating a new property page (via `make-project-page` skill)
- To audit/fix existing property pages
- When updating property information or adding new images

## SEO Optimizations Applied

### 0. Title Tag Formatting (CRITICAL)

Every page's `<title>` MUST be:
- **Single-line** — `<title>` and `</title>` on the SAME line, no multi-line splits
- **Premium brand tone** — Never use words like "dealer", "agent", "broker", or "cheap". Position Urban Investors as a luxury real estate advisory firm.
- **Format:** `<title>[Project Name] - [Product Type], [Sector/Location] | [Price & Floor Plan] | Urban Investors</title>`
- **Include transactional modifiers** — "Price", "Floor Plan", or "Price, Plots & Master Plan" in the title
- **Correct project type** — Use actual product (e.g., "Independent Floors" not "Apartments" if it's floors)

**Examples of correct titles:**
```html
<title>Gaur Chrysalis - Luxury 3 & 4 BHK, Sector 22D Yamuna Expressway | Price & Floor Plan | Urban Investors</title>
<title>One FNG - IGBC Platinum IT/ITES Office Spaces, Sector 142 Noida | Price & Floor Plan | Urban Investors</title>
<title>Ace Acreville - 100-Acre Gated Township, Yamuna Expressway | Price, Plots & Master Plan | Urban Investors</title>
```

**Common mistakes to fix:**
- Multi-line titles (split across 2-3 lines with whitespace)
- Missing sector/location info
- Wrong product type (e.g., calling commercial projects "residential")
- Missing transactional keywords ("Price", "Floor Plan")

### 1. Factual Accuracy Audit (CRITICAL)

Before any other SEO work, verify these facts are correct:
- **Location/Sector** — Cross-check sector number against the RERA registration and official developer site
- **Project type** — Is it residential, commercial, mixed-use, plotted? The title and description must match
- **Developer name** — Exact legal name
- **RERA number** — Verify it matches the actual project

> **Known past errors fixed:** Experion Saatori was labelled "Sector 108" (correct: Sector 151), Migsun Nehru Place was called "residential" (correct: commercial/mixed-use), Max 105 was called "apartments" (correct: independent floors), Sobha Rivana sector discrepancy.

### 2. Meta Description Enhancement

Update `<meta name="description">` to include:
- Pricing info (e.g., "Starting ₹2 Cr" or "₹16,995/sq.ft")
- RERA number (if present on page)
- Specific location details
- Key selling points
- Keep under 160 characters

**Example:**
```html
<!-- Before -->
<meta name="description" content="Discover luxury apartments in Noida.">

<!-- After -->
<meta name="description" content="Discover Ace Parkway 2.0 in Sector 150 Noida - Ultra-luxurious 3,4,4.5 BHK by Ace Group. Only 790 units. Starting ₹16,995/sq.ft. RERA registered.">
```

### 3. Image SEO & Asset Optimization (MANDATORY)

Every image used in a project page directly impacts Google Image search rankings and site crawlability. Raw camera dumps or generic filenames hurt SEO.

#### A. Strict Naming Conventions
- **Visual Inspection Required**: Always view the image first to confirm what it actually displays (clubhouse, master plan, entrance gate, badminton court, living room, swimming pool, etc.). Never rename blindly with regex or numbers.
- **Hyphen-Separated & All-Lowercase**: Use clean kebab-case:
  `[project-slug]-[feature-or-amenity]-[view-or-perspective].[ext]`
  - *Good:* `gaur-alaris-night-elevation-towers.png`
  - *Good:* `northwind-sanctuary-badminton-court-landscape.webp`
  - *Good:* `eldeco-7-peaks-master-site-plan-layout.webp`
  - *Good:* `crc-sector-150-noida-clubhouse-lounge.webp`
- **FORBIDDEN Filename Patterns**:
  - Raw camera/export strings: `imgi_...`, `WhatsApp Image...`, `download...`, `IMG-2025...`
  - Blind generic names: `gallery1.webp`, `hero.webp`, `thumbnail.webp`, `sub1.webp`, `banner1.webp`, `45.png`
  - Spaces or parentheses: e.g. `download (1).webp`, `harsh gupta.webp` (spaces cause `%20` encoding issues and broken URLs)

#### B. Accurate Alt Tags & Image Attributes
- Every `<img>` tag MUST have a meaningful, descriptive `alt` attribute that matches the actual image and includes project and feature keywords:
  ```html
  <!-- Bad -->
  <img alt="Gallery" src="images/alari/gaur-alaris-peacock-clubhouse-exterior.jpg" />
  
  <!-- Good -->
  <img alt="Gaur Alaris Grand Peacock Clubhouse Exterior at Night" class="d-block w-100 gallery-image" src="images/alari/gaur-alaris-peacock-clubhouse-exterior.jpg" />
  ```
- Use `loading="lazy"` on all gallery/off-screen images.
- Use `fetchpriority="high"` and `<link rel="preload">` ONLY on the above-the-fold hero image.

#### C. Full-Stack Synchronization
When images are renamed or added:
1. Rename the files on disk inside `images/<project-folder>/`.
2. Update all references in the project page (`<slug>.html`):
   - `<meta property="og:image" content="https://urbaninvestors.in/images/<folder>/<hero-image>.webp" />`
   - `<meta name="twitter:image" content="https://urbaninvestors.in/images/<folder>/<hero-image>.webp" />`
   - Schema JSON-LD `"image": "https://urbaninvestors.in/images/<folder>/<hero-image>.webp"`
   - Preload `<link rel="preload" as="image" href="images/<folder>/<hero-image>.webp" fetchpriority="high" />`
   - Main project image `<img class="... main-project-image" src="images/<folder>/<hero-image>.webp" />`
   - Gallery thumbnails and carousel slides
3. Update `properties.html`:
   - Property listing card image `src`
   - `ItemList` schema JSON-LD `"image"`
4. Update `index.html` if the project is featured in the hot projects carousel.
5. Run a link validation check to verify **0 broken image references** exist.

### 4. Open Graph & Twitter Social Metadata

Ensure `og:image` and `twitter:image` use the primary high-resolution project hero render:

```html
<meta property="og:image" content="https://urbaninvestors.in/images/<folder>/<project-slug>-<feature>-elevation.webp" />
<meta name="twitter:image" content="https://urbaninvestors.in/images/<folder>/<project-slug>-<feature>-elevation.webp" />
```

### 5. Structured Data (JSON-LD) - REQUIRED

Every property page MUST have these schemas in `<head>`:

#### A. ApartmentComplex / CommercialEvent / LandPlot Schema

The main property information schema:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "name": "<Project Name>",
  "description": "<Detailed description with price, location, key features - 150-200 chars>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<Sector/Area>",
    "addressLocality": "<City>",
    "addressRegion": "Uttar Pradesh",
    "postalCode": "<PIN if known, else remove>",
    "addressCountry": "India"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "<lat>",
    "longitude": "<long>"
  },
  "developer": {
    "@type": "Organization",
    "name": "<Developer Name>"
  },
  "image": "https://urbaninvestors.in/images/<project-folder>/<main-image>.webp",
  "numberOfBedrooms": "<e.g. 3, 4, 5>",
  "floorSize": {
    "@type": "QuantitativeValue",
    "minValue": <min sqft>,
    "maxValue": <max sqft>,
    "unitText": "sq.ft"
  },
  "priceRange": "<e.g. ₹2 Cr - ₹3 Cr or ₹16,995/sq.ft>",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Clubhouse" },
    { "@type": "LocationFeatureSpecification", "name": "Swimming Pool" },
    { "@type": "LocationFeatureSpecification", "name": "Gymnasium" },
    { "@type": "LocationFeatureSpecification", "name": "24/7 Security" }
  ]
}
</script>
```

**Choose correct @type:**
- Apartments/Flats → `ApartmentComplex`
- Commercial/Retail/Office → `CommercialEvent` or `LocalBusiness`
- Plots/Land → `LandPlot` or `Residence`
- Villas/Independent Houses → `Residence`

#### B. FAQPage Schema (5 Standard FAQs)

Extract from page's FAQ accordion section:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is <Project Name>?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<Answer from page FAQ section>"
      }
    },
    {
      "@type": "Question",
      "name": "Where is <Project Name> located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<Location details>"
      }
    },
    {
      "@type": "Question",
      "name": "What configurations are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<BHK/config details>"
      }
    },
    {
      "@type": "Question",
      "name": "Is <Project Name> a good investment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "<Investment potential from FAQ section>"
      }
    },
    {
      "@type": "Question",
      "name": "Why should I invest through Urban Investors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Urban Investors offers verified project information, professional consultation, transparent pricing assistance, site visit support, and complete guidance throughout your investment journey."
      }
    }
  ]
}
</script>
```

#### C. VideoObject Schema (If YouTube Video Embedded)

Check if page has YouTube iframe, then add:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "<Project Name> - Expert Property Analysis",
  "description": "Complete review and expert analysis of <Project Name>...",
  "thumbnailUrl": "https://img.youtube.com/vi/<VIDEO_ID>/maxresdefault.jpg",
  "uploadDate": "<Approximate date, e.g. 2024-01-01>",
  "duration": "PT10M",
  "embedUrl": "https://www.youtube.com/embed/<VIDEO_ID>",
  "contentUrl": "https://www.youtube.com/watch?v=<VIDEO_ID>"
}
</script>
```

To find VIDEO_ID, look for:
```html
<iframe src="https://www.youtube.com/embed/<VIDEO_ID>" loading="lazy" ...>
```
> **CRITICAL SEO RULE:** The `iframe` must use the standard `src` attribute with `loading="lazy"`. **NEVER** use javascript-based lazy loading like `data-src="..."` for video iframes. If `src` is missing, Googlebot will fail to associate the `VideoObject` structured data with the page DOM, resulting in a "Video structured data issue" in Search Console.

### 4. Update properties.html ItemList

Add the property to `properties.html` JSON-LD ItemList (only if it is not already present):

```json
{
  "@type": "ListItem",
  "position": <next position number>,
  "item": {
    "@type": "ApartmentComplex",
    "name": "<Project Name>",
    "description": "<Brief description>",
    "url": "https://urbaninvestors.in/<slug>",
    "image": "images/<project-folder>/<thumbnail>.webp"
  }
}
```

## Procedure

### Step 1: Read the Page

```bash
# Find the page to optimize
Read: <slug>.html
```

Identify:
- Project name, developer, location
- Price information from the page
- BHK configurations
- Amenities mentioned
- FAQ section content
- Any embedded YouTube videos
- Image folder for the project

### Step 2: Image Audit & SEO Optimization (MANDATORY)

```bash
ls "images/<project-folder>/"
```

1. **Visually Inspect Every Image**:
   - Open and view each image in `images/<project-folder>/` to identify what is depicted (e.g. entrance gate, clubhouse, swimming pool, landscape garden, master layout plan, 3BHK/4BHK floor plan, tower elevation).
   - NEVER use generic camera names (`imgi_...`, `WhatsApp...`, `download...`), blind numbers (`45.png`), or generic labels (`gallery1.webp`, `hero.webp`, `thumbnail.webp`).

2. **Rename to Hyphenated SEO Standard**:
   - Format: `[project-slug]-[feature-or-amenity]-[view-or-perspective].[ext]`
   - Example: `gaur-alaris-night-elevation-towers.png`, `gaur-alaris-master-site-plan.png`.
   - Ensure NO spaces or special characters exist in any filename.

3. **Update All Code References**:
   - Rename the files on disk: `git mv images/<folder>/<old-name> images/<folder>/<new-name>`
   - Update all references in `<slug>.html`, `properties.html`, `index.html`, and relevant guides.
   - Update `alt` tags to be richly descriptive and keyword-focused.
   - Designate the best exterior render as the hero image for `og:image`, `twitter:image`, structured data `image`, and preload.

### Step 3: Apply Page Optimizations

Edit `<slug>.html`:

1. **Meta description** - Add pricing, location, RERA
2. **og:image & twitter:image** - Use project-specific primary hero image
3. **og:description & twitter:description** - Match meta description
4. **ApartmentComplex schema** - Add/update with full details and hero image URL
5. **FAQPage schema** - Add 5 FAQ entries
6. **VideoObject schema** - Add if YouTube video present

### Step 4: Update properties.html

1. Update property card image thumbnail `src` with the new SEO image filename.
2. Add/update the property in the `ItemList` schema JSON-LD with the new SEO image path.

### Step 5: Verify sitemap.xml & Image Links

1. Ensure the page is listed in `sitemap.xml`.
2. Run link validation to verify **0 broken image references** exist in the workspace.

## Important Notes

1. **NO UI layout changes** - Only modify `<head>` section, JSON-LD scripts, image filenames, and `alt` attributes
2. **Preserve existing content** - Don't change visible text, buttons, pricing
3. **Use correct @type** - Match schema type to property type
4. **Full URLs for meta images** - Always use `https://urbaninvestors.in/images/...`
5. **Valid JSON-LD** - Ensure proper escaping of quotes within JSON strings
6. **Premium brand tone** - Never use "dealer", "agent", "broker", "cheap" in any meta tag. Urban Investors is a luxury real estate advisory.
7. **Title tag must be single-line** - Always `<title>text</title>` on one line
8. **No spaces in image filenames** - Always use hyphens (`-`)

### Transactional Keyword Requirements

Every property page's `<meta name="keywords">` MUST include these patterns:
- `[Project Name] price`, `[Project Name] price list`
- `[Project Name] floor plan`, `[Project Name] brochure`
- `[Project Name] payment plan`
- `[Project Name] RERA` + the actual RERA registration number
- `[Project Name] possession date`
- Config-specific: `[Project Name] 3 BHK price`, `[Project Name] 4 BHK price`
- For Yamuna Expressway / Greater Noida projects: `near Jewar Airport`, `near Noida International Airport`
- For commercial projects: `[Project Name] rental yield`, `[Project Name] rental income`

## Bulk Mode

To optimize multiple pages at once, pass a list of slugs. Process each one sequentially:

```
Apply SEO to: ace-parkway, gaur-bento, sobha-rivana
```

For each page, complete Steps 1-5 before moving to the next.

## Verification Checklist

Before finishing, verify:

- [ ] **Title tag is single-line** with premium tone, includes transactional keywords
- [ ] **Factual accuracy** — sector number, project type, developer name are correct
- [ ] **Transactional keywords present** — price, floor plan, payment plan, RERA number in meta keywords
- [ ] **Jewar Airport keyword** added (for Yamuna Expressway / Greater Noida projects)
- [ ] **All image filenames are SEO-optimized** — hyphen-separated, descriptive (no `imgi_`, `WhatsApp`, `download`, `hero.webp`, `gallery1`, spaces)
- [ ] **Image alt tags are descriptive** — accurately describe each feature/amenity
- [ ] **0 broken image references** in HTML / properties.html
- [ ] Meta description includes pricing/location
- [ ] og:image points to project-specific image (not preview.webp)
- [ ] ApartmentComplex schema has image, priceRange, floorSize
- [ ] FAQPage schema has 5 Q&As matching page content
- [ ] VideoObject schema added if YouTube present
- [ ] properties.html ItemList includes this property with optimized image path
- [ ] No unwanted UI changes made
- [ ] No "dealer", "agent", "broker" language anywhere in meta tags

## Finish

Report:
1. Page(s) optimized
2. Images used for og:image
3. Schemas added (ApartmentComplex, FAQPage, VideoObject)
4. properties.html updated (yes/no)
5. Resubmit sitemap in GSC recommended
