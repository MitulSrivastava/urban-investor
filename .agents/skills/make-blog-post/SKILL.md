---
name: make-blog-post
description: Create a new SEO-optimized blog post or research article for the Urban Investors site (under /insights/<slug>). Applies the signature blue gradient, async Google Sheets lead form, complete schema markup (BlogPosting, FAQPage, BreadcrumbList), sitemap, llms.txt, and insights hub interlinking.
---

# Create an Urban Investors Blog Post / Research Guide

This skill builds and wires a high-ranking, luxury-branded real estate research article or news guide for Urban Investors under `/insights/<slug>`.

Site domain: **urbaninvestors.in**  
Brand: **Urban Investors**  
Section Name: **Insights & News**  
File location: **`insights/<slug>.html`** (served extensionlessly as `/insights/<slug>`)

---

## 1. Inputs to Collect

Accept either notes, an outline, a drafted article, or market research topics. Collect:
- **Title:** e.g., *"Top 10 Luxury Residential Projects in Noida (2026 Edition)"*
- **Slug:** kebab-case, e.g., `top-luxury-projects-noida`
- **Category:** `Investment Guide`, `Area Spotlight`, `Luxury Living`, or `Real Estate News`
- **Read time & Date:** e.g., `8 min read`, `Sep 2026`
- **Hero Image:** must be a `.webp` from `/images/...`
- **Article Sections:** Executive overview, key market drivers, tabular comparison/data, RERA analysis, investment verdict.
- **5 FAQs:** Required for `FAQPage` schema + visible accordion, including: *"Why should I invest through Urban Investors?"*.

---

## 2. Mandatory SEO Directives

### A. Title Tag (Single-Line Rule)
The `<title>` tag MUST be written on a **single line** without line breaks and include commercial/search modifiers:
```html
<title>[Article Title] - [Transactional Keywords / Trends] | Urban Investors</title>
```
*Good examples:*
- `<title>Top 10 Luxury Residential Projects in Noida (2026) - Price List & Floor Plans | Urban Investors</title>`
- `<title>Yamuna Expressway Investment Guide 2026 - Jewar Airport Impact & Price Trends | Urban Investors</title>`
- `<title>Sector 150 Noida Real Estate Guide - Sports City Price Trends & Master Plan | Urban Investors</title>`

### B. Meta Tags
```html
<meta name="description" content="[140-158 characters describing the report with high-intent keywords, RERA data, and pricing]." />
<meta name="keywords" content="[comma-separated high-intent search phrases: e.g., luxury projects noida, sector 150 apartments, jewar airport investment]" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<link rel="canonical" href="https://urbaninvestors.in/insights/<slug>" />
```

### C. Open Graph & Twitter Cards
```html
<meta property="og:type" content="article" />
<meta property="og:locale" content="en_IN" />
<meta property="og:site_name" content="Urban Investors" />
<meta property="og:title" content="[Single-line Title] | Urban Investors" />
<meta property="og:description" content="[Compelling description]" />
<meta property="og:url" content="https://urbaninvestors.in/insights/<slug>" />
<meta property="og:image" content="https://urbaninvestors.in/images/<folder>/<image>.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="[Descriptive image alt text] - Urban Investors" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@UrbanInvestors" />
<meta name="twitter:title" content="[Article Title]" />
<meta name="twitter:description" content="[Short summary]" />
<meta name="twitter:image" content="https://urbaninvestors.in/images/<folder>/<image>.webp" />
```

### D. Structured Data (JSON-LD `@graph`)
Every article requires 3 linked schemas:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://urbaninvestors.in/insights/<slug>#article",
      "isPartOf": {
        "@type": "Blog",
        "@id": "https://urbaninvestors.in/insights#blog"
      },
      "headline": "[Article Title]",
      "description": "[Article description]",
      "image": [
        "https://urbaninvestors.in/images/<folder>/<image>.webp"
      ],
      "datePublished": "2026-09-10T09:00:00+05:30",
      "dateModified": "2026-09-13T12:00:00+05:30",
      "author": {
        "@type": "Organization",
        "name": "Urban Investors Research Advisory Desk",
        "url": "https://urbaninvestors.in/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Urban Investors",
        "url": "https://urbaninvestors.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://urbaninvestors.in/images/logo/IMG-20251123-WA00103.webp"
        }
      },
      "mainEntityOfPage": "https://urbaninvestors.in/insights/<slug>"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://urbaninvestors.in/insights/<slug>#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://urbaninvestors.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Insights & News",
          "item": "https://urbaninvestors.in/insights"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[Short Article Name]",
          "item": "https://urbaninvestors.in/insights/<slug>"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://urbaninvestors.in/insights/<slug>#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[Question 1]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 1]"
          }
        },
        {
          "@type": "Question",
          "name": "[Question 2]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 2]"
          }
        },
        {
          "@type": "Question",
          "name": "[Question 3]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 3]"
          }
        },
        {
          "@type": "Question",
          "name": "[Question 4]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[Answer 4]"
          }
        },
        {
          "@type": "Question",
          "name": "Why should I invest through Urban Investors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Urban Investors provides independent institutional research, 100% verified zero-dispute inventories, developer-direct pricing with zero buyer brokerage on fresh bookings, and end-to-end legal title and registry support."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## 3. Design & Styling Rules

### A. Signature Blue Gradient (MANDATORY)
Never use plain black or charcoal `#0b1e36` for the hero. Always use the **Urban Investors Royal Blue Gradient**:
```css
.article-hero {
  background: linear-gradient(135deg, #0d255c 0%, #1e3a8a 50%, #2563eb 100%);
  padding: 5rem 0 3.5rem;
  position: relative;
  color: #ffffff;
}
```

### B. Typography & Accents
- Headings: `font-family: 'Playfair Display', serif;` (`.font-luxury`)
- Body: `font-family: 'Inter', sans-serif;`
- Accent Gold: `#d4a574` or `.text-accent`
- Primary Blue: `#1e3a8a` / `#2563eb`
- Table: Wrap in `<div class="table-responsive my-4">` using `.table .table-bordered .table-hover` with `#0b1e36` or `#1e3a8a` table header.

---

## 4. Sidebar Lead Form & Google Sheets Integration

Every article must feature a sticky sidebar (`<aside class="advisor-callout-sidebar">`) with a lead form that submits directly to Google Sheets via AJAX without page reloads.

### Form Markup:
```html
<aside class="advisor-callout-sidebar">
  <span class="badge bg-gold-light text-accent px-3 py-1 mb-2 font-monospace border border-accent">
    VIP Acquisition Desk
  </span>
  <h4 class="font-luxury fw-bold text-dark mb-3">
    Request Exclusive Project Dossier & Price Sheets
  </h4>
  <p class="text-muted small mb-4">
    Get confidential unit layouts, developer payment plans, and pre-launch pricing directly from our authorized luxury advisory directors.
  </p>

  <form id="dossierForm" class="mb-4">
    <div class="mb-3">
      <input type="text" name="full_name" class="form-control" placeholder="Your Full Name" required />
    </div>
    <div class="mb-3">
      <input type="tel" name="phone" class="form-control" placeholder="Phone Number (WhatsApp)" required />
    </div>
    <div class="mb-3">
      <input type="email" name="email" class="form-control" placeholder="Email Address" required />
    </div>
    <div class="mb-3">
      <select name="investment_range" class="form-select" required>
        <option value="">Budget Preference</option>
        <option value="₹2.5 Cr - ₹4 Cr">₹2.5 Cr - ₹4 Cr</option>
        <option value="₹4 Cr - ₹7 Cr">₹4 Cr - ₹7 Cr</option>
        <option value="₹7 Cr+">₹7 Cr+</option>
      </select>
    </div>
    <input type="hidden" name="subject" value="[Article Title] Inquiry" />
    <input type="hidden" name="token" value="myFrontendToken123" />
    <button type="submit" id="dossierSubmitBtn" class="btn btn-primary w-100 py-2">
      <span class="btn-text">Download Price Sheet <i class="fas fa-download ms-1"></i></span>
      <span class="btn-loading d-none"><i class="fas fa-spinner fa-spin me-2"></i>Sending...</span>
    </button>
    <div id="dossierStatus" class="small mt-2" style="display: none;"></div>
  </form>

  <div class="border-top pt-3 text-center">
    <p class="small text-muted mb-2">Prefer instant assistance?</p>
    <a href="https://wa.me/911144739693?text=Hi%2C%20I%20read%20your%20[Article%20Title]%20guide%20and%20want%20more%20information." target="_blank" class="btn btn-success w-100 py-2 fw-bold">
      <i class="fab fa-whatsapp me-2"></i>Chat on WhatsApp
    </a>
  </div>
</aside>
```

### Async Google Sheets Script (Place before `</body>`):
```html
<script>
  (function () {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyK3zQjXKO656ePVyK4rH9-gbYxUwvj2irfhp0Ss7hOUghxNaPqrYOlVbaihJj_s-AagA/exec";
    const FRONTEND_TOKEN = "myFrontendToken123";
    const form = document.getElementById("dossierForm");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const btn = document.getElementById("dossierSubmitBtn");
      const status = document.getElementById("dossierStatus");
      const btnText = btn.querySelector(".btn-text");
      const btnLoad = btn.querySelector(".btn-loading");

      btn.disabled = true;
      if (btnText) btnText.classList.add("d-none");
      if (btnLoad) btnLoad.classList.remove("d-none");

      const fd = new FormData(form);
      fd.set("token", FRONTEND_TOKEN);

      try {
        await fetch(scriptURL, { method: "POST", body: fd, mode: "no-cors" });
        form.reset();
        status.style.display = "block";
        status.className = "alert alert-success small py-2 px-3 mt-3 mb-0 text-center";
        status.innerHTML = '<i class="fas fa-check-circle me-1"></i> <strong>Request Sent!</strong> We will WhatsApp & email the complete price sheets shortly.';
      } catch (err) {
        status.style.display = "block";
        status.className = "alert alert-danger small py-2 px-3 mt-3 mb-0 text-center";
        status.textContent = "Network error. Please chat with us directly on WhatsApp.";
      } finally {
        btn.disabled = false;
        if (btnText) btnText.classList.remove("d-none");
        if (btnLoad) btnLoad.classList.add("d-none");
      }
    });
  })();
</script>
```

---

## 5. End-to-End Wiring Checklist

When creating a new article, execute these steps in order:

1. **Create the file:** Save to `insights/<slug>.html` using `blog/top-luxury-projects-noida.html` as the base template.
2. **Add card to Blog Hub:**
   - In `blog.html`, add a `<div class="col-md-6 col-lg-4 article-item" data-category="...">` card with image, title link, meta, excerpt, and CTA.
   - Sync root mirror: `cp blog.html insights/index.html`.
3. **Register in `sitemap.xml`:**
   Add entry under `<!-- Blog Articles & Insights -->`:
   ```xml
   <url>
     <loc>https://urbaninvestors.in/insights/<slug></loc>
     <lastmod>2026-09-13</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.8</priority>
   </url>
   ```
4. **Register in `llms.txt`:**
   Add under `## Research & Market Intelligence (Blog)`:
   ```text
   - [Article Title](https://urbaninvestors.in/insights/<slug>): Brief summary of key takeaways and covered developers.
   ```
5. **Cross-Link relevant property pages:**
   Add contextual in-content anchor links pointing to relevant project pages (`/experion-saatori`, `/acearte`, `/gaur-bento`, etc.).
6. **Validate Schema:**
   Run a Python verification check on the JSON-LD script block:
   ```bash
   python3 -c "import json, re; c=open('insights/<slug>.html').read(); [json.loads(s) for s in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', c, re.S)]; print('VALID')"
   ```
7. **Rebuild Deploy Archive:**
   Run `./deploy.sh` to package `urban-investors-deploy.zip`.
