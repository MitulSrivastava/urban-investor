import { CONFIG, getSessionId } from './config.js';

/**
 * Initializes and stores first-touch & latest-touch attribution data.
 */
export function initAttribution() {
    // Generate/Retrieve the Session ID for this visit
    getSessionId();

    const params = new URLSearchParams(window.location.search);
    
    const gclid = params.get("gclid");
    const utmSource = params.get("utm_source");
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");
    const utmTerm = params.get("utm_term") || params.get("keyword");
    const utmContent = params.get("utm_content");
    const referrer = document.referrer || "";
    const landingPage = window.location.pathname;
    
    const referrerLower = referrer.toLowerCase();

    let currentSource = "Direct";
    let currentMedium = "None";

    // Source / Medium Logic
    if (gclid) {
        currentSource = "Google Ads";
        currentMedium = "CPC";
    } else if (utmSource) {
        currentSource = utmSource;
        currentMedium = utmMedium || "None";
    } else if (referrerLower.includes("google")) {
        currentSource = "Google";
        currentMedium = "Organic";
    } else if (referrerLower.includes("bing")) {
        currentSource = "Bing";
        currentMedium = "Organic";
    } else if (referrerLower.includes("facebook") || referrerLower.includes("fb.com")) {
        currentSource = "Facebook";
        currentMedium = "Referral";
    } else if (referrerLower.includes("instagram")) {
        currentSource = "Instagram";
        currentMedium = "Referral";
    } else if (referrer) {
        if (!referrerLower.includes(window.location.hostname)) {
            currentSource = "Referral";
            currentMedium = "Referral";
        } else {
            currentSource = "Internal";
        }
    }

    const timestamp = new Date().toISOString();
    let existingData = getAttributionData();

    // If there is no existing data, this is a completely new visitor
    if (!existingData.first_source) {
        existingData = {
            first_source: currentSource === "Internal" ? "Direct" : currentSource,
            first_medium: currentSource === "Internal" ? "None" : currentMedium,
            first_campaign: utmCampaign || "",
            first_gclid: gclid || "",
            entry_time: timestamp,
            landing_page: landingPage,
            
            latest_source: currentSource === "Internal" ? "Direct" : currentSource,
            latest_medium: currentSource === "Internal" ? "None" : currentMedium,
            latest_campaign: utmCampaign || "",
            latest_gclid: gclid || "",
            latest_keyword: utmTerm || "",
            latest_content: utmContent || "",
            latest_referrer: referrer || "",
            latest_timestamp: timestamp
        };
    } 
    // If they are returning but we have a NEW external traffic source (e.g. they clicked an Ad today)
    else if (currentSource !== "Internal" && currentSource !== "Direct") {
        existingData.latest_source = currentSource;
        existingData.latest_medium = currentMedium;
        existingData.latest_campaign = utmCampaign || "";
        existingData.latest_gclid = gclid || "";
        existingData.latest_keyword = utmTerm || "";
        existingData.latest_content = utmContent || "";
        existingData.latest_referrer = referrer || "";
        existingData.latest_timestamp = timestamp;
    }

    sessionStorage.setItem(CONFIG.SESSION_KEY, JSON.stringify(existingData));
}

/**
 * Retrieves the currently stored attribution data (utm_source, gclid, referrer, etc.).
 * Called by trackEvent() to append session-level attribution to all events.
 * 
 * @returns {Object} An object containing all attribution properties (e.g., first_source, latest_campaign, etc.)
 */
export function getAttributionData() {
    try {
        const dataStr = sessionStorage.getItem(CONFIG.SESSION_KEY);
        if (dataStr) {
            return JSON.parse(dataStr);
        }
    } catch(e) {
        console.error("Error retrieving attribution data:", e);
    }
    return {};
}
