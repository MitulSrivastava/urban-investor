# Urban Investors Analytics & Attribution Guide (Enterprise Edition)

This document outlines the centralized Analytics and Attribution system implemented on the Urban Investors website, upgraded to support Enterprise CRM standards like Session IDs, Event deduplication, and First-Touch vs Latest-Touch attribution.

## 1. Architecture Overview

To avoid duplicating analytics listeners across 30+ property pages, we implemented a centralized ES6 Module architecture located in the `/analytics/` folder:

*   `main.js`: The entry point script loaded into the `<head>` of every `.html` file.
*   `config.js`: Central configuration, UUID generator, Session/Event ID trackers, and project detection logic based on URL paths.
*   `attribution.js`: Parses UTM parameters and `gclid` on every page load. It stores `first_*` touch parameters (never overwritten) and updates `latest_*` touch parameters if a new external traffic source is detected.
*   `forms.js`: Intercepts `window.fetch` globally to inject the rich attribution data into every form submission seamlessly without altering inline HTML scripts. It also pushes a `generate_lead` event to Google Tag Manager upon successful form submission.
*   `events.js`: Implements delegated click tracking for WhatsApp links, phone calls, CTA buttons, and brochure downloads. It now captures specific contextual data like `button_text` and `button_class`.
*   `engagement.js`: Tracks scroll depth (25%, 50%, 75%, 100%) and time on page.

## 2. Google Sheets Configuration

Since the `forms.js` interceptor now extracts Enterprise CRM attributes (Session IDs, Event IDs, First-Touch, and Latest-Touch params), your Google Sheets must be updated to capture these new columns.

**You must update your Google Sheets Header Row to exactly this format to capture all the incoming data:**

```text
Timestamp	Name	Email	Phone	Subject	Investment Range	Message	Token	Session ID	Event ID	First Source	First Medium	First Campaign	First GCLID	Entry Time	Latest Source	Latest Medium	Latest Campaign	Latest GCLID	Latest Keyword	Latest Content	Latest Referrer	Landing Page	Page URL	Page Title
```

*(Note: Ensure your Google Apps Script is mapping these exact lowercase keys: `session_id`, `event_id`, `first_source`, `first_medium`, `first_campaign`, `first_gclid`, `entry_time`, `latest_source`, `latest_medium`, `latest_campaign`, `latest_gclid`, `latest_keyword`, `latest_content`, `latest_referrer`, `landing_page`, `page_url`, `page_title` into your new sheet columns!)*

## 3. Google Tag Manager (GTM) Events

The following events are now automatically pushed to the `dataLayer` and can be used to set up Triggers and Tags inside GTM:

*   `generate_lead` (Fires on successful form submissions)
*   `whatsapp_click` (Fires when `wa.me` or `api.whatsapp.com` links are clicked)
*   `phone_click` (Fires when `tel:` links are clicked)
*   `brochure_download` (Fires when PDF links or Brochure CTAs are clicked)
*   `price_request`, `compare_request`, `book_site_visit`
*   `cta_click` (Fires for generic buttons)
*   `scroll_depth`
*   `time_on_page`

**All events include the following standardized context variables:**
`project_name`, `page_path`, `session_id`, `event_id`, `first_source`, `latest_source`, `latest_campaign`, `latest_medium`.
Click events also include: `button_text`, `button_id`, `button_class`, `click_url`.

## 4. Maintenance Guide

*   **Adding a New Page**: When you create a new `.html` property page in the future, simply ensure this line is included inside the `<head>` tag:
    `<!-- Centralized Analytics Module -->`
    `<script type="module" src="analytics/main.js"></script>`
*   **Updating Project Names**: Open `analytics/config.js` and add your new page slug to the `PROJECTS` mapping object.

## 5. Rollback Instructions

If you ever need to completely remove this analytics system and revert the site to its previous state:

1.  Remove the line `<script type="module" src="analytics/main.js"></script>` from the `<head>` of all `.html` files.
2.  Delete the `analytics/` folder.
3.  Forms will automatically revert to sending only the original data payload without attribution fields.
