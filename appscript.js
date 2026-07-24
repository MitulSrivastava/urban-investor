// -------------------------------
// 🔐 CONFIGURATION
// -------------------------------
const SHEET_ID = "1NL8r-5GHl7u5kijgBulLZJy_lX3BGOqJ97F8yYSLkV8";
const SHEET_NAME = "Sheet1";
const EXPECTED_TOKEN = "myFrontendToken123";

// Only these websites are allowed to send data:
const ALLOWED_ORIGINS = [
  "https://urbaninvestors.in",
  "https://www.urbaninvestors.in",
  "https://urbaninvestors.com",
  "https://www.urbaninvestors.com",
  "http://localhost:5500"
];

// -------------------------------
// 🔐 MAIN FORM HANDLER
// -------------------------------
function doPost(e) {
  try {
    // Origin validation removed because frontend doesn't send 'origin' field

    // ---- TOKEN VALIDATION ----
    const token = e.parameter.token;
    if (!token || token !== EXPECTED_TOKEN) {
      return jsonResponse({ success: false, error: "Invalid token" }, 403);
    }

    // ---- READ FORM FIELDS ----
    const fullName = e.parameter.full_name || "";
    const email = e.parameter.email || "";
    const phone = e.parameter.phone || "";
    const investmentRange = e.parameter.investment_range || "";
    const message = e.parameter.message || "";
    const subject = e.parameter.subject || "General Enquiry";

    // ---- READ ANALYTICS FIELDS ----
    const sessionId = e.parameter.session_id || "";
    const eventId = e.parameter.event_id || "";
    const firstSource = e.parameter.first_source || "";
    const firstMedium = e.parameter.first_medium || "";
    const firstCampaign = e.parameter.first_campaign || "";
    const firstGclid = e.parameter.first_gclid || "";
    const entryTime = e.parameter.entry_time || "";
    const latestSource = e.parameter.latest_source || "";
    const latestMedium = e.parameter.latest_medium || "";
    const latestCampaign = e.parameter.latest_campaign || "";
    const latestGclid = e.parameter.latest_gclid || "";
    const latestKeyword = e.parameter.latest_keyword || "";
    const latestContent = e.parameter.latest_content || "";
    const latestReferrer = e.parameter.latest_referrer || "";
    const landingPage = e.parameter.landing_page || "";
    const pageUrl = e.parameter.page_url || "";
    const pageTitle = e.parameter.page_title || "";
    const latestTimestamp = e.parameter.latest_timestamp || "";

    // ---- SERVER-SIDE VALIDATION ----
    if (!fullName || !email || !phone) {
      return jsonResponse({ success: false, error: "Missing required fields" }, 400);
    }

    // ---- GOOGLE SHEET LOADING ----
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.getSheets()[0]; // fallback

    // ---- SAVE TO SHEET ----
    sheet.appendRow([
      new Date(),
      fullName,
      email,
      phone,
      subject,
      investmentRange,
      message,
      token,
      sessionId,
      eventId,
      firstSource,
      firstMedium,
      firstCampaign,
      firstGclid,
      entryTime,
      latestSource,
      latestMedium,
      latestCampaign,
      latestGclid,
      latestKeyword,
      latestContent,
      latestReferrer,
      landingPage,
      pageUrl,
      pageTitle,
      latestTimestamp
    ]);

    // SUCCESS
    return jsonResponse({ success: true, message: "Saved successfully" }, 200);

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

// -------------------------------
// 🔐 JSON RESPONSE + CSP HEADERS
// -------------------------------
function jsonResponse(obj, code = 200) {
  const response = ContentService.createTextOutput(JSON.stringify(obj));
  response.setMimeType(ContentService.MimeType.JSON);

  // Security Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Security-Policy": 
      "default-src 'none'; " +
      "img-src https: data:; " +
      "script-src 'none'; " +
      "connect-src https:; " +
      "style-src 'none'; " +
      "frame-ancestors 'none';"
  };

  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(JSON.stringify(obj))
    .setHeaders(headers);
}
