(function () {
"use strict";
const WA_NUMBER = "911144739693";
const PHONE_NUMBER = "7705015689";
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyK3zQjXKO656ePVyK4rH9-gbYxUwvj2irfhp0Ss7hOUghxNaPqrYOlVbaihJj_s-AagA/exec";
const FRONTEND_TOKEN = "myFrontendToken123";
function injectFloatingWA() {
const waMsg = encodeURIComponent(
"Hi Urban Investors, I'm interested in your premium properties. Please share details."
);
const wa = document.createElement("a");
wa.className = "ui-floating-wa";
wa.href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
wa.target = "_blank";
wa.rel = "noopener noreferrer";
wa.setAttribute("aria-label", "Chat on WhatsApp");
wa.innerHTML = `
<i class="fab fa-whatsapp"></i>
`;
document.body.appendChild(wa);
}
function injectMobileCTA() {
const bar = document.createElement("div");
bar.className = "ui-mobile-cta";
bar.innerHTML = `
<div class="ui-mcta-inner">
<a href="tel:${PHONE_NUMBER}" class="ui-mcta-btn ui-mcta-call">
<i class="fas fa-phone-alt fa-flip-horizontal"></i>
<span>CALL NOW</span>
</a>
<a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in your properties")}"
class="ui-mcta-btn ui-mcta-wa" target="_blank" rel="noopener noreferrer">
<i class="fab fa-whatsapp"></i>
<span>WhatsApp</span>
</a>
</div>
`;
document.body.appendChild(bar);
}
let exitShown = false;
function injectExitPopup() {
const overlay = document.createElement("div");
overlay.className = "ui-exit-overlay";
overlay.id = "uiExitOverlay";
overlay.innerHTML = `
<div class="ui-exit-modal">
<button class="ui-exit-close" id="uiExitClose">&times;</button>
<div id="uiExitFormView">
<div class="ui-exit-icon">
<i class="fas fa-gift"></i>
</div>
<h3>Wait! Don't Miss Out</h3>
<p>Get exclusive pre-launch prices & a free property consultation. Our property expert will call you within 24hrs.</p>
<form class="ui-exit-form" id="uiExitForm" action="#" method="POST">
<input type="text" class="ui-exit-input" placeholder="Your Name" id="uiExitName" required />
<input type="tel" class="ui-exit-input" placeholder="Your Phone Number" id="uiExitPhone" required  pattern="[0-9]{10}" minlength="10" maxlength="10" title="Please enter a valid 10-digit phone number" />
<button type="submit" class="ui-exit-submit">
<i class="fas fa-phone-alt" style="margin-right:8px"></i>Get My Free Consultation
</button>
</form>
<div class="ui-exit-trust">
<i class="fas fa-shield-alt"></i>
<span>100% Free · No Spam · Your data is safe</span>
</div>
</div>
<div class="ui-exit-success" id="uiExitSuccess">
<i class="fas fa-check-circle"></i>
<h4>Thank You!</h4>
<p>Our property expert will call you within 24hrs. Meanwhile, continue browsing our premium projects.</p>
</div>
</div>
`;
document.body.appendChild(overlay);
document.getElementById("uiExitClose").addEventListener("click", closeExit);
overlay.addEventListener("click", function (e) {
if (e.target === overlay) closeExit();
});
document
.getElementById("uiExitForm")
.addEventListener("submit", function (e) {
e.preventDefault();
const name = document.getElementById("uiExitName").value.trim();
const phone = document.getElementById("uiExitPhone").value.trim();
if (!name || !phone) return;
const fd = new FormData();
fd.append("full_name", name);
fd.append("email", "exit-popup@lead.com");
fd.append("phone", phone);
fd.append("subject", "Exit Popup Lead");
fd.append("investment_range", "");
fd.append(
"message",
"Lead from exit-intent popup on: " + window.location.pathname
);
fd.append("token", FRONTEND_TOKEN);
fetch(SCRIPT_URL, { method: "POST", body: fd, mode: "no-cors" }).catch(function () {});
document.getElementById("uiExitFormView").style.display = "none";
document.getElementById("uiExitSuccess").style.display = "block";
setTimeout(closeExit, 4000);
});
}
function showExit() {
if (exitShown) return;
if (sessionStorage.getItem("ui_exit_dismissed")) return;
exitShown = true;
var overlay = document.getElementById("uiExitOverlay");
if (overlay) overlay.classList.add("ui-show");
}
function closeExit() {
var overlay = document.getElementById("uiExitOverlay");
if (overlay) overlay.classList.remove("ui-show");
sessionStorage.setItem("ui_exit_dismissed", "1");
}
function setupExitIntent() {
document.addEventListener("mouseleave", function (e) {
if (e.clientY < 10) showExit();
});
var lastScrollTop = window.scrollY || document.documentElement.scrollTop;
var scrollSpeedTrigger = 50;
document.addEventListener("scroll", function() {
var st = window.scrollY || document.documentElement.scrollTop;
if (lastScrollTop - st > scrollSpeedTrigger) {
showExit();
}
lastScrollTop = st <= 0 ? 0 : st;
}, { passive: true });
var mobileTimer = null;
function resetMobileTimer() {
clearTimeout(mobileTimer);
mobileTimer = setTimeout(showExit, 45000);
}
if ("ontouchstart" in window) {
resetMobileTimer();
document.addEventListener("touchstart", resetMobileTimer, {
passive: true,
});
}
}
const PROJECTS = {
  "ace-acreville": { name: "Ace Acreville", uirCode: "UIR-001" },
  "acearte": { name: "Ace Arte", uirCode: "UIR-002" },
  "crc-150": { name: "CRC 150", uirCode: "UIR-003" },
  "crc-the-flagship": { name: "CRC The Flagship", uirCode: "UIR-004" },
  "crown-residences-godrej-golf-links-greater-noida": { name: "Crown Residences at Godrej Golf Links", uirCode: "UIR-005" },
  "dasnac-yuva": { name: "Dasnac Yuva", uirCode: "UIR-006" },
  "eldeco-7-peaks": { name: "Eldeco 7 Peaks", uirCode: "UIR-007" },
  "eldeco-ballads-of-bliss": { name: "Eldeco Ballads of Bliss", uirCode: "UIR-008" },
  "eldeco-echoes-of-eden": { name: "Eldeco Echoes of Eden", uirCode: "UIR-009" },
  "eldeco-whispers-of-wonder": { name: "Eldeco Whispers of Wonder", uirCode: "UIR-010" },
  "experion-saatori": { name: "Experion Saatori", uirCode: "UIR-011" },
  "fairfox-eon": { name: "Fairfox EON", uirCode: "UIR-012" },
  "gaur-alaris": { name: "Gaur Alaris", uirCode: "UIR-013" },
  "gaur-bento": { name: "Gaur Bento", uirCode: "UIR-014" },
  "gaur-chrysalis": { name: "Gaur Chrysalis", uirCode: "UIR-015" },
  "grandthum": { name: "Grandthum", uirCode: "UIR-016" },
  "hero-homes-sector-mu": { name: "Hero Homes Sector MU", uirCode: "UIR-017" },
  "max-105": { name: "Max 105", uirCode: "UIR-018" },
  "migsun-nehru-place": { name: "Migsun Nehru Place", uirCode: "UIR-019" },
  "noida-sector-145-plots": { name: "Noida Sector 145 Kisan Kota Plots", uirCode: "UIR-020" },
  "northwind-sanctuary": { name: "NorthWind Sanctuary Residences", uirCode: "UIR-021" },
  "onyx-by-splendor": { name: "ONYX by Splendor", uirCode: "UIR-022" },
  "omaxe-prayagraj": { name: "Omaxe Be Together Prayagraj", uirCode: "UIR-023" },
  "one-fng": { name: "One FNG", uirCode: "UIR-024" },
  "palm-village": { name: "Palm Village", uirCode: "UIR-025" },
  "sobha-rivana": { name: "Sobha Rivana", uirCode: "UIR-026" },
  "kbcentral": { name: "KB Central" },
  "arqismall": { name: "ARQIS MALL" },
  "experionsaatori": { name: "Experion Saatori", uirCode: "UIR-011" },
  "dasnac": { name: "Dasnac Yuva", uirCode: "UIR-006" },
  "eldecoballadsofbliss": { name: "Eldeco Ballads of Bliss", uirCode: "UIR-008" },
  "eldecoechoesofeden": { name: "Eldeco Echoes of Eden", uirCode: "UIR-009" },
  "gaurchrysalis": { name: "Gaur Chrysalis", uirCode: "UIR-015" },
  "gaurchrysalis2": { name: "Gaur Chrysalis", uirCode: "UIR-015" },
  "migsunnehru": { name: "Migsun Nehru Place", uirCode: "UIR-019" },
  "onefng": { name: "One FNG", uirCode: "UIR-024" },
  "palmvillage": { name: "Palm Village", uirCode: "UIR-025" },
  "aceacreville": { name: "Ace Acreville", uirCode: "UIR-001" },
};
function currentProject() {
var slug = window.location.pathname
.split("/")
.pop()
.replace(/\.html$/i, "")
.toLowerCase();
return PROJECTS[slug] || null;
}

function appendUirCodeToWaLinks(projectObj) {
  if (!projectObj || !projectObj.uirCode) return;
  const uir = projectObj.uirCode;
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    try {
      const url = new URL(link.href);
      if (url.searchParams.has('text')) {
        let text = url.searchParams.get('text');
        // Check if the UIR code is already appended
        if (!text.endsWith(uir)) {
          text = text.trim() + " " + uir;
          url.searchParams.set('text', text);
          link.href = url.toString();
        }
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  });
}

function injectGetPrice(projectObj) {
var project = projectObj.name;
var fab = document.createElement("button");
fab.type = "button";
fab.className = "ui-gp-fab";
fab.setAttribute("aria-label", "Get price for " + project);
fab.innerHTML = '<i class="fas fa-tag"></i><span>Get Price</span>';
document.body.appendChild(fab);
var overlay = document.createElement("div");
overlay.className = "ui-gp-overlay";
overlay.id = "uiGpOverlay";
overlay.innerHTML = `
<div class="ui-gp-modal">
<button class="ui-gp-close" id="uiGpClose" aria-label="Close">&times;</button>
<div id="uiGpFormView">
<div class="ui-gp-icon"><i class="fas fa-tag"></i></div>
<h3>Get the Exact Price</h3>
<p>Enter your details and we'll send the latest price &amp; payment plan for <strong>${project}</strong> on WhatsApp right away.</p>
<form class="ui-gp-form" id="uiGpForm" action="#" method="POST">
<input type="text" class="ui-gp-input" placeholder="Your Name" id="uiGpName" required />
<input type="tel" class="ui-gp-input" placeholder="Your Phone Number" id="uiGpPhone" required  pattern="[0-9]{10}" minlength="10" maxlength="10" title="Please enter a valid 10-digit phone number" />
<button type="submit" class="ui-gp-submit">
<i class="fab fa-whatsapp" style="margin-right:8px"></i>Get Price on WhatsApp
</button>
</form>
<div class="ui-gp-trust">
<i class="fas fa-lock"></i>
<span>100% Free &middot; No Spam &middot; RERA-registered projects</span>
</div>
</div>
<div class="ui-gp-success" id="uiGpSuccess">
<i class="fas fa-check-circle"></i>
<h4>Opening WhatsApp&hellip;</h4>
<p>If it doesn't open automatically, <a id="uiGpWaLink" href="#" target="_blank" rel="noopener">tap here to chat</a>.</p>
</div>
</div>
`;
document.body.appendChild(overlay);
function openGp() { overlay.classList.add("ui-show"); }
function closeGp() { overlay.classList.remove("ui-show"); }
fab.addEventListener("click", openGp);
document.getElementById("uiGpClose").addEventListener("click", closeGp);
overlay.addEventListener("click", function (e) {
if (e.target === overlay) closeGp();
});
document.getElementById("uiGpForm").addEventListener("submit", function (e) {
e.preventDefault();
var name = document.getElementById("uiGpName").value.trim();
var phone = document.getElementById("uiGpPhone").value.trim();
if (!name || !phone) return;
var fd = new FormData();
fd.append("full_name", name);
fd.append("email", "getprice@lead.com");
fd.append("phone", phone);
fd.append("subject", "Price Request - " + project);
fd.append("investment_range", "Get Price Request");
fd.append("message", "Price request for " + project + " (Page: " + window.location.pathname + ")");
fd.append("token", FRONTEND_TOKEN);
fd.append("fullName", name);
fd.append("emailAddress", "getprice@lead.com");
fd.append("phoneNumber", phone);
fd.append("investmentRange", "Get Price Request");
fd.append("Token", FRONTEND_TOKEN);
fetch(SCRIPT_URL, { method: "POST", body: fd, mode: "no-cors" }).catch(function () {});
var baseMsg = "Hi Urban Investors, this is " + name + ". Please share the exact price & payment plan for " + project + ".";
if (projectObj.uirCode) {
  baseMsg += " " + projectObj.uirCode;
}
var waMsg = encodeURIComponent(baseMsg);
var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + waMsg;
var link = document.getElementById("uiGpWaLink");
if (link) link.href = waUrl;
window.open(waUrl, "_blank");
document.getElementById("uiGpFormView").style.display = "none";
document.getElementById("uiGpSuccess").style.display = "block";
});
}
function init() {
var oldSticky = document.getElementById("uiPropertySticky");
if (oldSticky) oldSticky.remove();
injectFloatingWA();
injectMobileCTA();
injectExitPopup();
setupExitIntent();
var projectObj = currentProject();
if (projectObj) {
  injectGetPrice(projectObj);
  appendUirCodeToWaLinks(projectObj);
}
}
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init);
} else {
init();
}
})();