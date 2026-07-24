/**
 * Centralized Configuration for Analytics System
 */

export const CONFIG = {
    SESSION_KEY: 'ui_attribution_data',
    SESSION_ID_KEY: 'ui_session_id',
};

/**
 * Generates a standard UUID v4
 */
export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Generates a unique event ID prefixed with date
 */
export function generateEventId() {
    const dateStr = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 8);
    return `evt_${dateStr}_${generateUUID().slice(0, 8)}`;
}

/**
 * Gets or creates the current Session ID
 */
export function getSessionId() {
    let sessionId = sessionStorage.getItem(CONFIG.SESSION_ID_KEY);
    if (!sessionId) {
        sessionId = `session_${generateUUID().slice(0, 12)}`;
        sessionStorage.setItem(CONFIG.SESSION_ID_KEY, sessionId);
    }
    return sessionId;
}

/**
 * Utility to extract the project/property name from the URL path.
 * Used automatically by trackEvent() to append property context to all events.
 * e.g. /gaur-plume.html -> Gaur Plume
 * 
 * @returns {string} The formatted project name, or 'Home' if no project is detected.
 */
export function getProjectName() {
    const path = window.location.pathname;
    
    // Exact mapping matches the ones in lead-magnet.js and some additional ones
    const pathSegments = path.split('/');
    const filename = pathSegments.pop().replace(/\.html$/i, '').toLowerCase();

    const PROJECTS = {
        'experion-saatori': "Experion Saatori",
        'experionsaatori': "Experion Saatori",
        'dasnac-yuva': "Dasnac Yuva",
        'dasnac': "Dasnac Yuva",
        'eldeco-ballads-of-bliss': "Eldeco Ballads of Bliss",
        'eldecoballadsofbliss': "Eldeco Ballads of Bliss",
        'eldeco-echoes-of-eden': "Eldeco Echoes of Eden",
        'eldecoechoesofeden': "Eldeco Echoes of Eden",
        'eldeco-7-peaks': "Eldeco 7 Peaks",
        'gaur-chrysalis': "Gaur Chrysalis",
        'gaur-chrysalis-2': "Gaur Chrysalis",
        'gaurchrysalis': "Gaur Chrysalis",
        'gaurchrysalis2': "Gaur Chrysalis",
        'gaur-plume': "Gaur Plume",
        'migsun-nehru-place': "Migsun Nehru Place",
        'migsunnehru': "Migsun Nehru Place",
        'one-fng': "One FNG",
        'onefng': "One FNG",
        'palm-village': "Palm Village",
        'palmvillage': "Palm Village",
        'ace-acreville': "Ace Acreville",
        'aceacreville': "Ace Acreville",
        'max-105': "Max 105",
        'sobha-rivana': "Sobha Rivana",
        'sobharivana': "Sobha Rivana",
        'grandthum': "Grandthum",
        'crc-the-flagship': "CRC The Flagship",
        'fairfox-eon': "Fairfox EON",
        'onyx-by-splendor': "Onyx By Splendor",
        'northwind-sanctuary': "Northwind Sanctuary",
        'omaxe-prayagraj': "Omaxe Prayagraj",
        'ace-parkway': "Ace Parkway",
        'crown-residences-godrej-golf-links-greater-noida': "Crown Residences Godrej",
        'eldeco-whispers-of-wonder': "Eldeco Whispers of Wonder",
        'gaur-bento': "Gaur Bento",
        'noida-sector-145-plots': "Noida Sector 145 Plots"
    };

    if (PROJECTS[filename]) {
        return PROJECTS[filename];
    }

    if (!filename || filename === 'index' || filename === '') {
        return 'Home';
    }

    // Fallback: capitalize words and replace hyphens
    return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
