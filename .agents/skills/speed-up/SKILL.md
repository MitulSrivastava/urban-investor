---
name: speed-up
description: Apply PageSpeed performance optimizations to Urban Investors property pages. Adds image lazy loading, hero preload, fetchpriority, removes dead JS, adds image dimensions, and fixes iframe loading. Run after creating a new property page or to audit existing pages for speed.
---

# Speed Up Property Pages

Optimize Urban Investors property pages for Google PageSpeed Insights.
This skill applies invisible performance fixes — **zero UI/UX or functionality changes**.

Site domain: **urbaninvestors.in**

## When to Use

- After creating a new property page (via `make-project-page` skill)
- After applying SEO (via `apply-seo` skill)
- To audit/fix slow-loading existing property pages
- Before running a PageSpeed test

## Performance Optimizations Applied

### 1. Hero Image Preload (LCP Fix)

Find the main hero/banner image in the `<head>` section. Add a preload link
**before** the preconnect hints so the browser starts downloading immediately:

```html
<!-- Add BEFORE the preconnect hints -->
<!-- Performance: Preload LCP hero image -->
<link rel="preload" as="image" href="images/<project-folder>/<hero-image>.webp" fetchpriority="high"/>
```

To find the hero image:
1. Look for the first large `<img>` inside `class="hero-section"` or `id="main-content"`
2. It's usually the image with `class="main-project-image"`
3. Use that `src` value for the preload href

### 2. Hero Image Attributes (LCP + CLS Fix)

Add `fetchpriority="high"` and explicit `width`/`height` to the hero image:

```html
<!-- Before -->
<img alt="..." class="w-100 main-project-image" src="images/..." style="height: 450px; object-fit: cover"/>

<!-- After -->
<img alt="..." class="w-100 main-project-image" fetchpriority="high" height="450" src="images/..." style="height: 450px; object-fit: cover" width="800"/>
```

Rules:
- `width="800"` is a reasonable default for full-width hero images
- Match `height` to the value in the inline `style` attribute
- Do NOT add `loading="lazy"` to the hero — it's above the fold

### 3. Lazy Load All Below-Fold Images

Add `loading="lazy"` to every `<img>` tag that is NOT the hero image and NOT the navbar logo.

**DO lazy load:**
- Sidebar gallery thumbnails (`class="gallery-thumb"`)
- Carousel images (`class="gallery-image"`)
- Amenity/feature section images
- Footer images

**DO NOT lazy load:**
- Hero/banner image (above fold — use `fetchpriority="high"` instead)
- Navbar logo (always visible in fixed nav)
- Tiny inline icons (e.g., share button icon)

```html
<!-- Before -->
<img alt="..." class="w-100 gallery-thumb" src="images/..."/>

<!-- After -->
<img alt="..." class="w-100 gallery-thumb" loading="lazy" src="images/..."/>
```

### 4. Fix YouTube Iframe Loading

Check all `<iframe>` tags with YouTube embeds. They MUST use `src` (not `data-src`)
with `loading="lazy"`:

```html
<!-- WRONG — Googlebot can't see this, hurts SEO + speed -->
<iframe class="lazy-video" data-src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1" ...></iframe>

<!-- CORRECT — native lazy load, Googlebot compatible -->
<iframe loading="lazy" src="https://www.youtube.com/embed/VIDEO_ID" ...></iframe>
```

Rules:
- Replace `data-src` with `src`
- Remove `class="lazy-video"`
- Add `loading="lazy"`
- Remove `autoplay=1&mute=1` from the URL (not needed with lazy load)

### 5. Remove Dead Lazy-Video JavaScript

After fixing iframes (step 4), search for and **remove** the IntersectionObserver
script that was used for JS-based lazy loading. It typically looks like:

```html
<script>
  document.addEventListener("DOMContentLoaded", function() {
    var lazyVideos = [].slice.call(document.querySelectorAll("iframe.lazy-video"));
    if ("IntersectionObserver" in window) {
      // ... observer code ...
    }
  });
</script>
```

This code is dead weight after step 4 — it queries for `.lazy-video` elements
that no longer exist.

### 6. Add Width/Height to Images (CLS Fix)

For images that use CSS for sizing, add matching `width` and `height` HTML
attributes to prevent Cumulative Layout Shift:

```html
<!-- Before — causes layout shift -->
<img src="..." style="height: 450px; object-fit: cover"/>

<!-- After — browser reserves space immediately -->
<img src="..." style="height: 450px; object-fit: cover" width="800" height="450"/>
```

Common dimensions used across the site:
- Hero images: `width="800" height="450"`
- Gallery carousel images: `width="800" height="500"`
- Sidebar gallery thumbs: Skip (CSS controlled, small)
- Gallery carousel on mobile: CSS overrides to 300px height

## Procedure

### Step 1: Read the Page

```bash
Read: <slug>.html
```

Identify:
- The hero/banner image `src` path
- All `<img>` tags and which have `loading="lazy"`
- All `<iframe>` tags and whether they use `src` or `data-src`
- Any dead JS related to lazy loading
- Images missing `width`/`height` attributes

### Step 2: Apply Optimizations

Edit `<slug>.html`:

1. **Hero preload** — Add `<link rel="preload">` in `<head>` before preconnect hints
2. **Hero attributes** — Add `fetchpriority="high"`, `width`, `height`
3. **Lazy images** — Add `loading="lazy"` to all below-fold images
4. **Fix iframes** — Replace `data-src` with `src`, add `loading="lazy"`
5. **Remove dead JS** — Delete unused IntersectionObserver scripts
6. **Add dimensions** — Add `width`/`height` to key images

### Step 3: Verify No UI Changes

After applying, confirm:
- [ ] No visible elements were changed
- [ ] No CSS classes were removed
- [ ] No content was altered
- [ ] All images still reference the same source files
- [ ] The YouTube video still works (src not data-src)

## Important Notes

1. **NO UI changes** — Only modify HTML attributes and `<head>` links
2. **Preserve all content** — Don't change visible text, buttons, styles
3. **Don't touch Bootstrap/Font Awesome** — Those are site-wide dependencies
4. **Don't delay GTM** — Analytics must fire immediately
5. **Hero image is never lazy** — It's the LCP element, needs `fetchpriority="high"`
6. **Test after deploy** — Run PageSpeed Insights to verify improvement

## Bulk Mode

To optimize multiple pages at once:

```
Speed up: acearte, sobha-rivana, gaur-bento
```

For each page, complete Steps 1-3 before moving to the next.

## Verification Checklist

Before finishing, verify:

- [ ] Hero image has `<link rel="preload">` in head
- [ ] Hero image has `fetchpriority="high"` and `width`/`height`
- [ ] All below-fold images have `loading="lazy"`
- [ ] No `data-src` on any iframe (use `src` + `loading="lazy"`)
- [ ] No dead lazy-video IntersectionObserver JS remains
- [ ] Key images have `width`/`height` attributes
- [ ] Zero visual changes to the page

## Expected Results

These optimizations typically improve PageSpeed scores by **+8-12 points**:

| Metric | Improvement |
|--------|-------------|
| LCP (Largest Contentful Paint) | ~0.5-1s faster from preload + fetchpriority |
| CLS (Cumulative Layout Shift) | Near zero from width/height attributes |
| TBT (Total Blocking Time) | ~50ms less from removing dead JS |
| Speed Index | Faster from lazy loading off-screen images |

## Finish

Report:
1. Page(s) optimized
2. Number of images lazy-loaded
3. Iframes fixed (data-src → src)
4. Dead JS removed (yes/no)
5. Hero preload added (yes/no)
