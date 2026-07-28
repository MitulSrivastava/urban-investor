import { getAttributionData } from './attribution.js';
import { getProjectName, generateEventId, getSessionId } from './config.js';
import { trackEvent } from './events.js';

/**
 * Initializes form tracking by overriding window.fetch
 * This allows us to intercept all form submissions sent to Google Apps Script
 * without modifying the inline HTML scripts.
 */
export function initFormTracking() {
    const originalFetch = window.fetch;
    
    window.fetch = async function(...args) {
        const url = args[0];
        const options = args[1];
        
        const isAppsScriptTarget = typeof url === 'string' && url.includes('script.google.com/macros');
        const hasFormData = options && options.body instanceof FormData;

        if (isAppsScriptTarget && hasFormData) {
            
            // 1. Append Enterprise Attribution Data to the FormData payload
            const attribution = getAttributionData();
            const eventId = generateEventId();
            const sessionId = getSessionId();
            
            // Append all attribution properties directly
            for (const [key, value] of Object.entries(attribution)) {
                options.body.append(key, value || "");
            }
            
            // Append session and event identifiers
            options.body.append("session_id", sessionId);
            options.body.append("event_id", eventId);
            options.body.append("page_url", window.location.href);
            options.body.append("page_title", document.title);
            
            // Extract some values for categorization
            const subject = options.body.get('subject') || '';
            let formName = "Contact Form";
            const subjectLower = subject.toLowerCase();
            
            if (subjectLower.includes('price')) formName = "Price Request";
            else if (subjectLower.includes('brochure') || subjectLower.includes('download')) formName = "Brochure Download";
            else if (subjectLower.includes('compare')) formName = "Compare Request";
            else if (subjectLower.includes('exit')) formName = "Exit Popup";
            else if (subjectLower.includes('site visit') || subjectLower.includes('book')) formName = "Book Site Visit";
            else if (subjectLower.includes('roi')) formName = "ROI Request";
            else if (subjectLower.includes('callback')) formName = "Callback Request";
            else if (subjectLower.includes('enquiry') || subjectLower.includes('inquiry')) formName = "Enquiry Form";
            
            // 2. Perform the actual fetch request
            try {
                const response = await originalFetch.apply(this, args);
                
                // 3. Push success event via centralized trackEvent
                // Treat opaque responses from no-cors Google Apps Script as success
                if (response.ok || response.type === 'opaque') {
                    try {
                        window.dataLayer = window.dataLayer || [];
                        window.dataLayer.push({
                            event: "generate_lead",
                            form_name: formName
                        });
                        console.log("generate_lead pushed directly");
                    } catch (analyticsError) {
                        // Critical Requirement: Analytics failures must never block, delay, or cancel a lead submission.
                        console.error("Analytics error tracking generate_lead:", analyticsError);
                    }
                }
                
                return response;
            } catch (error) {
                // If the fetch itself fails, throw it so the UI can handle it
                throw error;
            }
        }
        
        // Passthrough for all other fetch requests
        return originalFetch.apply(this, args);
    };
}
