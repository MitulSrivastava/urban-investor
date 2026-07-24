import { initAttribution } from './attribution.js';
import { initFormTracking } from './forms.js';
import { initEventTracking } from './events.js';
import { initEngagementTracking } from './engagement.js';

/**
 * Main Entry Point for the Centralized Analytics & Attribution System
 */
(function initAnalytics() {
    // 1. Capture initial attribution data
    initAttribution();

    // 2. Intercept forms safely
    initFormTracking();

    // 3. Bind global click listeners
    initEventTracking();

    // 4. Start engagement tracking
    initEngagementTracking();
    
    console.log("[Analytics] Initialized centralized tracking module.");
})();
