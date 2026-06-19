/**
 * Urban Investors — Lead Magnet Components
 * Floating WhatsApp, Exit-Intent Popup, Mobile Sticky CTA
 */
(function () {
  "use strict";

  const WA_NUMBER = "917705015689";
  const PHONE_NUMBER = "7705015689";
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyE9dlJ8JAJnJndXgSPw_k8yNDnU-L9f4cwJ2cDbJaBASshEC80PKl2Tj6EohgCcdSevQ/exec";
  const FRONTEND_TOKEN = "myFrontendToken123";

  // =============================================
  // 1. FLOATING WHATSAPP BUTTON (Desktop Only)
  // =============================================
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

  // =============================================
  // 2. MOBILE STICKY CTA BAR (Mobile Only)
  // =============================================
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

  // =============================================
  // 3. EXIT-INTENT POPUP
  // =============================================
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
          <form class="ui-exit-form" id="uiExitForm">
            <input type="text" class="ui-exit-input" placeholder="Your Name" id="uiExitName" required />
            <input type="tel" class="ui-exit-input" placeholder="Your Phone Number" id="uiExitPhone" required />
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

    // Close handlers
    document.getElementById("uiExitClose").addEventListener("click", closeExit);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeExit();
    });

    // Form submit
    document
      .getElementById("uiExitForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("uiExitName").value.trim();
        const phone = document.getElementById("uiExitPhone").value.trim();
        if (!name || !phone) return;

        // Send to Google Sheets
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

        // Show success
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
    // Desktop: mouse leaves viewport
    document.addEventListener("mouseleave", function (e) {
      if (e.clientY < 10) showExit();
    });

    // Mobile: fast scroll up or inactivity
    var lastScrollTop = window.scrollY || document.documentElement.scrollTop;
    var scrollSpeedTrigger = 50; // trigger if scrolled up by 50px fast

    document.addEventListener("scroll", function() {
        var st = window.scrollY || document.documentElement.scrollTop;
        if (lastScrollTop - st > scrollSpeedTrigger) {
             // fast scroll up detected
             showExit();
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, { passive: true });

    // Fallback: Mobile 45 seconds of inactivity
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

  // =============================================
  // 4. "GET PRICE" LEAD MAGNET (Property pages only)
  // =============================================
  // Map of page slug -> project display name
  const PROJECTS = {
    experionsaatori: "Experion Saatori",
    dasnac: "Dasnac Yuva",
    eldecoballadsofbliss: "Eldeco Ballads of Bliss",
    eldecoechoesofeden: "Eldeco Echoes of Eden",
    "eldeco-7-peaks": "Eldeco 7 Peaks",
    gaurchrysalis: "Gaur Chrysalis",
    gaurchrysalis2: "Gaur Chrysalis",
    migsunnehru: "Migsun Nehru Place",
    onefng: "One FNG",
    palmvillage: "Palm Village",
    aceacreville: "Ace Acreville",
    "max-105": "Max 105",
    sobharivana: "Sobha Rivana",
  };

  function currentProject() {
    var slug = window.location.pathname
      .split("/")
      .pop()
      .replace(/\.html$/i, "")
      .toLowerCase();
    return PROJECTS[slug] || null;
  }

  function injectGetPrice(project) {
    // Floating CTA button
    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "ui-gp-fab";
    fab.setAttribute("aria-label", "Get price for " + project);
    fab.innerHTML = '<i class="fas fa-tag"></i><span>Get Price</span>';
    document.body.appendChild(fab);

    // Modal overlay
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
          <form class="ui-gp-form" id="uiGpForm">
            <input type="text" class="ui-gp-input" placeholder="Your Name" id="uiGpName" required />
            <input type="tel" class="ui-gp-input" placeholder="Your Phone Number" id="uiGpPhone" required />
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

      // 1. Save the lead to Google Sheets
      var fd = new FormData();
      fd.append("full_name", name);
      fd.append("email", "getprice@lead.com");
      fd.append("phone", phone);
      fd.append("subject", "Price Request - " + project);
      fd.append("investment_range", "Get Price Request");
      fd.append("message", "Price request for " + project + " (Page: " + window.location.pathname + ")");
      fd.append("token", FRONTEND_TOKEN);
      // New-format keys
      fd.append("fullName", name);
      fd.append("emailAddress", "getprice@lead.com");
      fd.append("phoneNumber", phone);
      fd.append("investmentRange", "Get Price Request");
      fd.append("Token", FRONTEND_TOKEN);
      fetch(SCRIPT_URL, { method: "POST", body: fd, mode: "no-cors" }).catch(function () {});

      // 2. Hand off to WhatsApp (in the same user gesture so it isn't blocked)
      var waMsg = encodeURIComponent(
        "Hi Urban Investors, this is " + name + ". Please share the exact price & payment plan for " + project + "."
      );
      var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + waMsg;
      var link = document.getElementById("uiGpWaLink");
      if (link) link.href = waUrl;
      window.open(waUrl, "_blank");

      // 3. Show success state
      document.getElementById("uiGpFormView").style.display = "none";
      document.getElementById("uiGpSuccess").style.display = "block";
    });
  }

  // =============================================
  // INIT
  // =============================================
  function init() {
    // Check if we previously had the property sticky bar element and remove it
    var oldSticky = document.getElementById("uiPropertySticky");
    if (oldSticky) oldSticky.remove();

    injectFloatingWA();
    injectMobileCTA();
    injectExitPopup();
    setupExitIntent();

    var project = currentProject();
    if (project) injectGetPrice(project);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
