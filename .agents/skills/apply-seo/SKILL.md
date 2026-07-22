---
name: apply-seo
description: Apply comprehensive SEO optimizations to Urban Investors property pages. Adds structured data (ApartmentComplex/FAQPage/VideoObject), improves meta descriptions, fixes og:image, and updates properties.html ItemList. Run after creating a new property page or to audit existing pages.
---

# Apply SEO to Property Pages

Optimize Urban Investors property pages for search engines. This skill ensures every
page has proper structured data, meta tags, and is properly indexed.

Site domain: **urbaninvestors.in**

## When to Use

- After creating a new property page (via `make-project-page` skill)
- To audit/fix existing property pages
- When updating property information

## SEO Optimizations Applied

### 1. Meta Description Enhancement

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

### 2. Open Graph & Twitter Images

Replace generic `preview.webp` with project-specific images:

```html
<!-- Find project images -->
ls images/<project-folder>/

<!-- Update these tags -->
<meta property="og:image" content="https://urbaninvestors.in/images/<folder>/<image>.webp" />
<meta name="twitter:image" content="https://urbaninvestors.in/images/<folder>/<image>.webp" />
```

### 3. Structured Data (JSON-LD) - REQUIRED

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

### Step 2: Check Available Images

```bash
ls "images/<project-folder>/"
```

Pick the best hero/banner image for og:image and structured data.

### Step 3: Apply Optimizations

Edit `<slug>.html`:

1. **Meta description** - Add pricing, location, RERA
2. **og:image & twitter:image** - Use project-specific image
3. **og:description & twitter:description** - Match meta description
4. **ApartmentComplex schema** - Add/update with full details
5. **FAQPage schema** - Add 5 FAQ entries
6. **VideoObject schema** - Add if YouTube video present

### Step 4: Update properties.html

Add the property to the ItemList schema in properties.html.

### Step 5: Verify sitemap.xml

Ensure the page is listed in sitemap.xml (should already be there from `make-project-page`).

## Important Notes

1. **NO UI changes** - Only modify `<head>` section and JSON-LD scripts
2. **Preserve existing content** - Don't change visible text, buttons, images
3. **Use correct @type** - Match schema type to property type
4. **Full URLs for images** - Always use `https://urbaninvestors.in/images/...`
5. **Valid JSON-LD** - Ensure proper escaping of quotes within JSON strings

## Bulk Mode

To optimize multiple pages at once, pass a list of slugs. Process each one sequentially:

```
Apply SEO to: ace-parkway, gaur-bento, sobha-rivana
```

For each page, complete Steps 1-5 before moving to the next.

## Verification Checklist

Before finishing, verify:

- [ ] Meta description includes pricing/location
- [ ] og:image points to project-specific image (not preview.webp)
- [ ] ApartmentComplex schema has image, priceRange, floorSize
- [ ] FAQPage schema has 5 Q&As matching page content
- [ ] VideoObject schema added if YouTube present
- [ ] properties.html ItemList includes this property
- [ ] No visible UI changes made

## Finish

Report:
1. Page(s) optimized
2. Images used for og:image
3. Schemas added (ApartmentComplex, FAQPage, VideoObject)
4. properties.html updated (yes/no)
5. Resubmit sitemap in GSC recommended
