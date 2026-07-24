import { getAttributionData } from './attribution.js';
import { getProjectName, generateEventId, getSessionId } from './config.js';

/**
 * Initializes engagement tracking (Scroll depth and Time on Page).
 */
export function initEngagementTracking() {
    initTimeTracking();
    initScrollTracking();
    initNativeVideoTracking();
}

function pushEngagementEvent(eventName, extraParams = {}) {
    const attribution = getAttributionData();
    const projectName = getProjectName();
    const eventId = generateEventId();
    const sessionId = getSessionId();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        event_id: eventId,
        session_id: sessionId,
        page_path: window.location.pathname,
        project_name: projectName,
        first_source: attribution.first_source || "Direct",
        first_medium: attribution.first_medium || "None",
        latest_source: attribution.latest_source || "Direct",
        latest_medium: attribution.latest_medium || "None",
        latest_campaign: attribution.latest_campaign || "",
        ...extraParams
    });
}

function initTimeTracking() {
    const intervals = [30, 60, 120];
    const tracked = new Set();

    intervals.forEach(seconds => {
        setTimeout(() => {
            if (!tracked.has(seconds)) {
                tracked.add(seconds);
                pushEngagementEvent('time_on_page', { time_threshold: seconds });
            }
        }, seconds * 1000);
    });
}

function initScrollTracking() {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set();

    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkScrollDepth();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function checkScrollDepth() {
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        const winHeight = window.innerHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        thresholds.forEach(threshold => {
            if (scrollPercent >= (threshold - 1) && !tracked.has(threshold)) {
                tracked.add(threshold);
                pushEngagementEvent('scroll_depth', { scroll_threshold: threshold });
            }
        });
    }
}

function initNativeVideoTracking() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        let playTracked = false;
        let completeTracked = false;

        video.addEventListener('play', () => {
            if (!playTracked) {
                playTracked = true;
                pushEngagementEvent('video_play', { video_src: video.currentSrc });
            }
        });

        video.addEventListener('ended', () => {
            if (!completeTracked) {
                completeTracked = true;
                pushEngagementEvent('video_complete', { video_src: video.currentSrc });
            }
        });
    });
}
