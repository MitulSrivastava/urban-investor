import { getAttributionData } from './attribution.js';
import { getProjectName, generateEventId, getSessionId } from './config.js';

/**
 * Determines the logical location of a button or element within the page layout.
 * Searches the DOM tree upwards from the element for semantic classes or IDs.
 * 
 * @param {HTMLElement} element - The DOM element that was clicked
 * @returns {string} The detected location (e.g., 'header', 'hero', 'floating', 'popup', 'footer', 'property_card', or 'unknown')
 */
export function detectButtonLocation(element) {
    if (!element) return 'unknown';
    
    if (element.closest('header') || element.closest('.header') || element.closest('#header')) return 'header';
    if (element.closest('.hero') || element.closest('#hero')) return 'hero';
    if (element.closest('.sticky') || element.closest('.fixed')) return 'sticky';
    if (element.closest('.floating') || element.closest('.wa-float') || element.closest('.phone-float')) return 'floating';
    if (element.closest('.modal') || element.closest('.popup')) return 'popup';
    if (element.closest('footer') || element.closest('.footer') || element.closest('#footer')) return 'footer';
    if (element.closest('.property-card') || element.closest('.card')) return 'property_card';
    
    return 'unknown';
}

/**
 * The centralized entry point for all analytics event tracking.
 * Pushes a standardized event payload to the GTM dataLayer.
 * 
 * Automatically includes:
 * - Page context (title, location, path)
 * - Session and event IDs
 * - Project name (if available)
 * - UTM and attribution data
 * 
 * @param {string} eventName - The name of the custom GA4 event (e.g., 'generate_lead', 'whatsapp_click')
 * @param {Object} [parameters={}] - Additional custom parameters specific to this event
 */
export function trackEvent(eventName, parameters = {}) {
    window.dataLayer = window.dataLayer || [];
    
    const attribution = getAttributionData();
    const payload = {
        event: eventName,
        
        // Context
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        property_name: getProjectName(),
        
        // Identifiers
        session_id: getSessionId(),
        event_id: generateEventId(),
        
        // Custom Parameters
        ...parameters,
        
        // Attribution (Backward Compatibility)
        ...attribution
    };

    window.dataLayer.push(payload);
    
    if (window.analyticsDebug === true) {
        console.log(`📊 Analytics Event: ${eventName}`, payload);
    }
}

/**
 * Initializes global delegated click tracking for CTAs, WhatsApp, Phone, and other interactions.
 */
export function initEventTracking() {
    document.body.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;

        const href = (target.getAttribute('href') || '').toLowerCase();
        const text = (target.textContent || '').trim();
        const classes = (target.className || '').toLowerCase();
        const id = (target.id || '').toLowerCase();
        const button_location = detectButtonLocation(target);

        // WhatsApp Tracking
        if (href.includes('wa.me') || href.includes('api.whatsapp.com') || classes.includes('wa-') || href.includes('whatsapp://')) {
            trackEvent('whatsapp_click', { button_location, click_url: href });
            return;
        }

        // Phone Tracking
        if (href.startsWith('tel:')) {
            trackEvent('phone_contact', { button_location, click_url: href });
            return;
        }

        // Other generic clicks
        let eventType = null;
        if (href.startsWith('mailto:')) {
            eventType = 'email_click';
        } else if (href.endsWith('.pdf') || text.toLowerCase().includes('brochure') || id.includes('brochure') || classes.includes('brochure')) {
            if (target.tagName.toLowerCase() !== 'button' || target.type !== 'submit') {
                eventType = 'brochure_download';
            }
        } else if (text.toLowerCase().includes('price') && text.toLowerCase().includes('get') && target.type !== 'submit') {
            eventType = 'price_insights_click';
        } else if (text.toLowerCase().includes('compare') && target.type !== 'submit') {
            eventType = 'compare_roi_click';
        } else if (text.toLowerCase().includes('site visit') || text.toLowerCase().includes('book') && target.type !== 'submit') {
            eventType = 'book_site_visit';
        } else if (target.tagName.toLowerCase() === 'button' || classes.includes('btn') || classes.includes('cta')) {
            if (target.type !== 'submit' && !classes.includes('btn-close') && !classes.includes('close')) {
                eventType = 'cta_click';
            }
        }

        if (eventType) {
            trackEvent(eventType, {
                button_text: text,
                button_id: id,
                button_class: classes,
                click_url: href,
                button_location
            });
        }
    });
}
