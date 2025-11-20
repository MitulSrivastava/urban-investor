/**
 * Urban Investors - Professional JavaScript
 * Handles interactive features with clean animations for professional experience
 */

// Utility functions
const utils = {
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// Subtle scroll animations class
class ScrollAnimations {
  constructor() {
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.observeElements();
    this.setupIntersectionObserver();
  }

  observeElements() {
    const elements = document.querySelectorAll(
      ".animate-on-scroll, [data-animation]"
    );
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease-out";
    });
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, options);

    document
      .querySelectorAll(".animate-on-scroll, [data-animation]")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  animateElement(element) {
    const delay = element.dataset.delay || "0s";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, parseFloat(delay) * 1000);
  }
}

/**
 * Main website initialization function
 */
function initializeWebsite() {
  // Setup interactive features
  setupNavigation();
  setupContactForm();
  setupNewsletterForm();
  setupPropertyFinderAnimations();
  setupLazyLoading();
  setupInvestmentTracking();
}

/* =================================================================== */
/* PROPERTY PAGE SPECIFIC FUNCTIONS */
/* =================================================================== */

/**
 * Initialize property page functionality
 */
function initializePropertyPage() {
  // Only run on property page
  if (!document.querySelector(".property-page")) {
    setupPropertyContactForm();
    setupPropertyScrollEffects();
    setupPropertyCarousel();
    setupPropertyModalForms();
    setupPropertyUnitEnquiry();
  }
}

/**
 * Setup property contact form
 */
function setupPropertyContactForm() {
  const form = document.getElementById("propertyContactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: form.querySelector('input[type="text"]')?.value,
      phone: form.querySelector('input[type="tel"]')?.value,
      email: form.querySelector('input[type="email"]')?.value,
      interest: form.querySelector("select")?.value,
      project: "Dasnac",
    };

    // Validate form
    if (!validatePropertyForm(formData)) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    // Submit form
    submitPropertyContactForm(formData);
  });
}

/**
 * Setup property scroll effects
 */
function setupPropertyScrollEffects() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/**
 * Setup property carousel functionality
 */
function setupPropertyCarousel() {
  const carousel = document.getElementById("projectGallery");
  if (!carousel) return;

  // Auto-play carousel
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 5000,
    wrap: true,
  });

  // Pause on hover
  carousel.addEventListener("mouseenter", () => {
    carouselInstance.pause();
  });

  carousel.addEventListener("mouseleave", () => {
    carouselInstance.cycle();
  });
}

/**
 * Setup property modal forms
 */
function setupPropertyModalForms() {
  // Quick enquiry forms
  const enquireModals = document.querySelectorAll('[data-bs-toggle="modal"]');

  enquireModals.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const modalId = this.getAttribute("data-bs-target");
      const modal = document.querySelector(modalId);

      if (modal) {
        const form = modal.querySelector("form");
        if (form) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            // handlePropertyEnquiry(this); - Removed as function doesn't exist
            showNotification(
              "Thank you for your enquiry. Our team will contact you shortly.",
              "success"
            );
          });
        }
      }
    });
  });
}

/**
 * Handle unit-specific enquiries
 */
function setupPropertyUnitEnquiry() {
  window.enquireUnit = function (unitType) {
    showNotification(
      `Thank you for your interest in ${unitType} units. Our team will contact you with detailed information within 24 hours.`,
      "success"
    );
  };
}

// Initialize property page functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on a property page and initialize accordingly
  if (document.querySelector(".hero-section")) {
    initializePropertyPage();
  }
});

// Export property functions for global access
window.enquireUnit = window.enquireUnit || function () {};

// DOM Content Loaded Event - Single initialization point
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded - Starting initialization...");

  // Debug: Check if Bootstrap is loaded
  if (typeof bootstrap !== "undefined") {
    console.log("Bootstrap is loaded");
  } else {
    console.error("Bootstrap is NOT loaded!");
  }

  // Initialize website features
  initializeWebsite();
  initializeServicesPage();
  setupPropertyFiltering();

  // Initialize subtle features - only if classes are defined
  if (typeof ScrollAnimations !== "undefined") {
    new ScrollAnimations();
  }
  if (typeof EnhancedNavbar !== "undefined") {
    new EnhancedNavbar();
  }
  setupPropertyFinderAnimations();
});

/**
 * Enhanced navbar
 */
class EnhancedNavbar {
  constructor() {
    this.navbar = document.querySelector(".navbar-modern");
    this.init();
  }

  init() {
    if (!this.navbar) return;

    const handleScroll = utils.throttle(() => {
      const scrolled = window.scrollY > 50;
      this.navbar.classList.toggle("scrolled", scrolled);

      if (scrolled) {
        this.navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        this.navbar.style.backdropFilter = "blur(20px)";
        this.navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      } else {
        this.navbar.style.backgroundColor = "rgba(255, 255, 255, 1)";
        this.navbar.style.backdropFilter = "none";
        this.navbar.style.boxShadow = "none";
      }
    }, 16);

    window.addEventListener("scroll", handleScroll);
  }
}

/**
 * Setup hot selling projects carousel
 */
function setupHotProjectsCarousel() {
  const carousel = document.querySelector(".hot-projects-carousel");
  if (!carousel) return;

  const container = carousel.querySelector(".projects-container");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");
  const cards = container.querySelectorAll(".project-card");

  if (!container || !prevBtn || !nextBtn || cards.length === 0) return;

  let currentIndex = 0;
  const cardWidth = 320 + 16; // card width + gap

  function getVisibleCards() {
    const containerWidth = container.parentElement.offsetWidth;
    const cardWidthWithGap = 320 + 16;
    const visibleCards = Math.floor(containerWidth / cardWidthWithGap);
    return Math.max(1, Math.min(visibleCards, cards.length));
  }

  function getMaxIndex() {
    const visibleCards = getVisibleCards();
    return Math.max(0, cards.length - visibleCards);
  }

  function updateCarousel() {
    const translateX = -currentIndex * cardWidth;
    container.style.transform = `translateX(${translateX}px)`;

    const maxIndex = getMaxIndex();

    prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";
    prevBtn.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
    nextBtn.style.pointerEvents = currentIndex >= maxIndex ? "none" : "auto";
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Touch/swipe support
  let startX = 0;
  let isDragging = false;

  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  container.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  container.addEventListener("touchend", (e) => {
    if (!isDragging) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const maxIndex = getMaxIndex();

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < maxIndex) {
        currentIndex++;
      } else if (diff < 0 && currentIndex > 0) {
        currentIndex--;
      }
      updateCarousel();
    }

    isDragging = false;
  });

  updateCarousel();

  const totalWidth = cards.length * cardWidth;
  container.style.width = `${totalWidth}px`;

  window.addEventListener(
    "resize",
    utils.debounce(() => {
      const newMaxIndex = getMaxIndex();
      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex;
      }
      updateCarousel();
    }, 250)
  );
}

/**
 * Setup property finder animations
 */
function setupPropertyFinderAnimations() {
  const propertyCard = document.querySelector(".property-finder-card");
  if (propertyCard) {
    const formFields = propertyCard.querySelectorAll(".search-field");
    formFields.forEach((field, index) => {
      field.style.opacity = "0";
      field.style.transform = "translateY(15px)";
      field.style.transition = "all 0.5s ease-out";

      setTimeout(() => {
        field.style.opacity = "1";
        field.style.transform = "translateY(0)";
      }, index * 100 + 300);
    });
  }

  setTimeout(() => {
    setupHotProjectsCarousel();
  }, 100);
}

/**
 * Initialize services page functionality
 */
function initializeServicesPage() {
  if (!document.querySelector(".services-hero")) return;

  setupServicesAnimations();
  setupServicesContactForm();
  setupServiceNavigation();
}

/**
 * Setup services page animations
 */
function setupServicesAnimations() {
  const serviceCards = document.querySelectorAll(".service-card");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px",
  };

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100); // Faster stagger for hero cards
      }
    });
  }, observerOptions);

  serviceCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease-out";
    serviceObserver.observe(card);
  });

  // Animate process steps with enhanced timing
  const processSteps = document.querySelectorAll(".process-step");
  processSteps.forEach((step, index) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(30px)";
    step.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 150); // Slightly faster for better flow
        }
      });
    }, observerOptions);

    processObserver.observe(step);
  });
}

/**
 * Setup services contact form functionality
 */
function setupServicesContactForm() {
  const form = document.getElementById("servicesContactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // Get form data
    const formData = {
      firstName: document.getElementById("firstName")?.value,
      lastName: document.getElementById("lastName")?.value,
      email: document.getElementById("email")?.value,
      service: document.getElementById("service")?.value,
      message: document.getElementById("message")?.value,
    };

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    setTimeout(() => {
      // Reset form
      form.reset();
      form.classList.remove("was-validated");

      // Show success message
      submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
      submitBtn.classList.remove("btn-primary");
      submitBtn.classList.add("btn-success");

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.classList.remove("btn-success");
        submitBtn.classList.add("btn-primary");
      }, 3000);

      console.log("Services form submitted:", formData);
    }, 2000);
  });
}

/**
 * Setup service navigation and smooth scrolling
 */
function setupServiceNavigation() {
  // Smooth scroll for service links
  const serviceLinks = document.querySelectorAll('a[href^="#"]');

  serviceLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Highlight active service section
  const sections = document.querySelectorAll("section[id]");

  const handleScroll = utils.throttle(() => {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all service cards
        document.querySelectorAll(".service-card").forEach((card) => {
          card.classList.remove("active");
        });

        // Add active class to corresponding service card
        const serviceCard = document
          .querySelector(`a[href="#${sectionId}"]`)
          ?.closest(".service-card");
        if (serviceCard) {
          serviceCard.classList.add("active");
        }
      }
    });
  }, 100);

  window.addEventListener("scroll", handleScroll);
}

/**
 * Navigation functionality
 */
function setupNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const hashLinks = document.querySelectorAll('a[href^="#"]');

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.backgroundColor = "";
      navbar.style.backdropFilter = "";
    }
  });

  // Enhanced smooth scrolling for all hash links (including hero button)
  hashLinks.forEach((link) => {
    // Debug: Log all hash links
    console.log("Found hash link:", link.href, link.classList);

    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip dropdown toggles
      if (this.classList.contains("dropdown-toggle")) {
        console.log("Skipping dropdown toggle:", this.textContent);
        return;
      }

      console.log("Processing hash link:", href);

      if (href.startsWith("#") && href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 80;

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
          }
        }
      }
    });
  });

  window.addEventListener("scroll", updateActiveNavLink);
}

/**
 * Update active navigation link
 */
function updateActiveNavLink() {
  // Skip auto-updating nav links on property page
  if (document.querySelector(".property-page")) {
    return;
  }

  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        navLink.classList.add("active");
      }
    }
  });
}

/**
 * Setup property scroll effects
 */
function setupPropertyScrollEffects() {
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-lg-4 col-md-6 mb-4";

  cardDiv.innerHTML = `
        <div class="card property-card h-100">
            <div class="property-image">
                <img src="${property.image}" 
                     alt="${property.title}" 
                     class="card-img-top"
                     loading="lazy">
                <div class="property-badge">
                    <span class="badge bg-accent">${property.type}</span>
                </div>
                <div class="property-overlay">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-white text-dark">
                            <i class="fas fa-bed me-1"></i>${
                              property.bedrooms
                            } Beds
                        </span>
                        <span class="badge bg-white text-dark">
                            <i class="fas fa-bath me-1"></i>${
                              property.bathrooms
                            } Baths
                        </span>
                        <span class="badge bg-white text-dark">
                            <i class="fas fa-ruler me-1"></i>${property.area}
                        </span>
                    </div>
                </div>
            </div>
            <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-2">${property.title}</h5>
                <p class="text-muted mb-2">
                    <i class="fas fa-map-marker-alt me-2"></i>${
                      property.location
                    }
                </p>
                <div class="property-price mb-3">${property.price}</div>
                <div class="property-features mb-3">
                    ${property.features
                      .map(
                        (feature) =>
                          `<span class="badge bg-light text-dark me-1 mb-1">
                            <i class="fas fa-check text-accent me-1"></i>${feature}
                        </span>`
                      )
                      .join("")}
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary flex-fill" onclick="viewProperty(${
                      property.id
                    })">
                        View Details
                    </button>
                    <button class="btn btn-outline-primary" onclick="scheduleViewing(${
                      property.id
                    })" aria-label="Schedule viewing for ${property.title}">
                        <i class="fas fa-calendar-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

  return cardDiv;
}

/**
 * Property card intersection observer
 */
function observePropertyCards() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  document.querySelectorAll(".property-card").forEach((card, index) => {
    card.parentElement.style.opacity = "0";
    card.parentElement.style.transform = "translateY(20px)";
    card.parentElement.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
    observer.observe(card.parentElement);
  });
}

/**
 * Simple property interaction functions
 */
function viewProperty(propertyId) {
  // Redirect to dasnac.html for Manhattan Penthouse (ID 1)
  if (propertyId === 1) {
    window.location.href = "dasnac.html";
    return;
  }

  showNotification(
    `Property #${propertyId} details available. Our team will contact you with comprehensive information.`,
    "success"
  );

  console.log(`Viewing property ${propertyId}`);

  setTimeout(() => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, 1500);
}

function scheduleViewing(propertyId) {
  showNotification(
    `Viewing request submitted for Property #${propertyId}. Our representative will contact you within 24 hours.`,
    "success"
  );

  console.log(`Viewing scheduled for property ${propertyId}`);

  setTimeout(() => {
    const contactSection = document.querySelector("#contact");
    const message = document.querySelector("#message");

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    if (message) {
      message.value = `I would like to schedule a viewing for Property ID: ${propertyId}. Please contact me with available times.`;
    }
  }, 1500);
}

/**
 * Contact form setup
 */
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    this.classList.remove("was-validated");

    if (!this.checkValidity()) {
      this.classList.add("was-validated");
      return;
    }

    submitBtn.disabled = true;
    if (btnText) btnText.classList.add("d-none");
    if (btnLoading) btnLoading.classList.remove("d-none");

    try {
      await simulateFormSubmission();

      showNotification(
        "Thank you! Your message has been sent successfully. We'll contact you within 24 hours.",
        "success"
      );

      this.reset();
      this.classList.remove("was-validated");
    } catch (error) {
      showNotification(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.classList.remove("d-none");
      if (btnLoading) btnLoading.classList.add("d-none");
    }
  });

  const inputs = contactForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        validateField(this);
      }
    });
  });
}

/**
 * Validate form field
 */
function validateField(field) {
  const isValid = field.checkValidity();

  if (isValid) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
  }

  return isValid;
}

/**
 * Simulate form submission
 */
function simulateFormSubmission() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.05) {
        resolve();
      } else {
        reject(new Error("Submission failed"));
      }
    }, 2000);
  });
}

/**
 * Newsletter form setup
 */
function setupNewsletterForm() {
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      if (email && isValidEmail(email)) {
        showNotification(
          "Thank you for subscribing to our newsletter!",
          "success"
        );
        this.reset();
      } else {
        showNotification("Please enter a valid email address.", "error");
      }
    });
  }
}

/**
 * Email validation
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification alert alert-${
    type === "error" ? "danger" : type
  } alert-dismissible position-fixed`;
  notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/**
 * Lazy loading for images
 */
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

/**
 * Enhanced UI/UX interactions for elegant experience
 */
class ElegantInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothAnimations();
    this.setupElegantHovers();
    this.setupFormEnhancements();
    this.setupScrollEffects();
    this.setupPageTransitions();
  }

  setupSmoothAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll(
      ".card, .service-card, .property-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.6s ease-out";
      observer.observe(card);
    });
  }

  setupElegantHovers() {
    // Enhanced button ripple effects
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function (e) {
        this.style.transform = "translateY(-2px)";
      });

      button.addEventListener("mouseleave", function (e) {
        this.style.transform = "translateY(0)";
      });
    });

    // Elegant card interactions
    const interactiveCards = document.querySelectorAll(
      ".property-card, .service-card, .testimonial-card"
    );

    interactiveCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-8px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  setupFormEnhancements() {
    // Elegant form field animations
    const formFields = document.querySelectorAll(".form-control, .form-select");

    formFields.forEach((field) => {
      field.addEventListener("focus", function () {
        this.parentElement.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 8px 25px rgba(30, 58, 138, 0.15)";
      });

      field.addEventListener("blur", function () {
        this.parentElement.style.transform = "translateY(0)";
        this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.05)";
      });
    });

    // Enhanced form validation feedback
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      const inputs = form.querySelectorAll("input, select, textarea");

      inputs.forEach((input) => {
        input.addEventListener("input", function () {
          if (this.checkValidity()) {
            this.classList.remove("is-invalid");
            this.classList.add("is-valid");
          }
        });
      });
    });
  }

  setupScrollEffects() {
    // Elegant scroll-based animations
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;

          // Parallax effect for hero images
          const heroImages = document.querySelectorAll(
            ".hero-background, .services-hero"
          );
          heroImages.forEach((img) => {
            img.style.transform = `translateY(${scrolled * 0.3}px)`;
          });

          // Floating effect for certain elements
          const floatingElements =
            document.querySelectorAll(".floating-element");
          floatingElements.forEach((element, index) => {
            const speed = 0.5 + index * 0.1;
            element.style.transform = `translateY(${
              Math.sin(scrolled * 0.01 + index) * 10
            }px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupPageTransitions() {
    // Smooth page transitions
    // document.body.classList.add("page-enter"); - Removed as unused

    // Enhanced link transitions
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Elegant notification system
  static showElegantNotification(message, type = "info", duration = 5000) {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} position-fixed animate-fade-in-down`;
    notification.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 1050;
      min-width: 300px;
      max-width: 400px;
      animation: slideInRight 0.5s ease-out;
      backdrop-filter: blur(10px);
    `;

    notification.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "exclamation-triangle"
            : "info-circle"
        } me-2"></i>
        <span>${message}</span>
        <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = "slideOutRight 0.3s ease-in";
        setTimeout(() => notification.remove(), 300);
      }
    }, duration);
  }
}

/**
 * Investment opportunity tracking
 */
function setupInvestmentTracking() {
  const investmentSection = document.querySelector(".bg-accent");
  const investmentButton = document.querySelector(".bg-accent .btn-primary");

  if (investmentButton) {
    investmentButton.addEventListener("click", function (e) {
      e.preventDefault();

      showNotification(
        "Investment consultation request received. Our team will contact you within 2 hours.",
        "success"
      );

      setTimeout(() => {
        const contactSection = document.querySelector("#contact");
        const investmentRange = document.querySelector("#investmentRange");
        const message = document.querySelector("#message");

        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }

        if (investmentRange) {
          investmentRange.value = "10m+";
        }

        if (message) {
          message.value =
            "I am interested in the Assured Exit Option investment opportunity. Please provide more details about the ₹50 Lakhs investment with 1-year exit strategy.";
        }
      }, 1000);
    });
  }
}

/**
 * Property filtering functionality
 */
function setupPropertyFiltering() {
  const searchForm = document.getElementById("propertySearchForm");
  const propertyCards = document.querySelectorAll("#properties-grid .col-lg-6");

  if (!searchForm) return;

  // Add event listener to the form
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    filterProperties();
  });

  // Also filter when form inputs change
  const formInputs = searchForm.querySelectorAll("input, select");
  formInputs.forEach((input) => {
    input.addEventListener("change", filterProperties);
  });
}

/**
 * Filter properties based on form inputs
 */
function filterProperties() {
  const propertyType = document.getElementById("propertyType")?.value;
  const budget = document.getElementById("budget")?.value;
  const bhk = document.getElementById("bhk")?.value;
  const location = document.getElementById("location")?.value.toLowerCase();
  const possession = document.getElementById("possession")?.value;
  const amenities = document.getElementById("amenities")?.value;

  const propertyCards = document.querySelectorAll("#properties-grid .col-lg-6");
  let visibleCount = 0;

  propertyCards.forEach((card) => {
    let showProperty = true;

    // Filter by property type
    if (propertyType && showProperty) {
      const cardPropertyType = card.dataset.propertyType;
      if (cardPropertyType && !cardPropertyType.includes(propertyType)) {
        showProperty = false;
      }
    }

    // Filter by budget
    if (budget && showProperty) {
      const cardPriceRange = card.dataset.priceRange;
      if (cardPriceRange) {
        const budgetMatch = checkBudgetMatch(budget, cardPriceRange);
        if (!budgetMatch) {
          showProperty = false;
        }
      }
    }

    // Filter by BHK
    if (bhk && showProperty) {
      const cardBhk = card.dataset.bhk;
      if (cardBhk) {
        const bhkMatch = checkBhkMatch(bhk, cardBhk);
        if (!bhkMatch) {
          showProperty = false;
        }
      }
    }

    // Filter by location
    if (location && showProperty) {
      const cardLocation = card
        .querySelector(".text-muted")
        ?.textContent.toLowerCase();
      if (cardLocation && !cardLocation.includes(location)) {
        showProperty = false;
      }
    }

    // Filter by possession status
    if (possession && showProperty) {
      const cardStatus = card.dataset.status;
      if (cardStatus && cardStatus !== possession) {
        showProperty = false;
      }
    }

    // Filter by amenities
    if (amenities && showProperty) {
      const cardAmenities = card.dataset.amenities;
      if (cardAmenities) {
        const amenitiesMatch = checkAmenitiesMatch(amenities, cardAmenities);
        if (!amenitiesMatch) {
          showProperty = false;
        }
      }
    }

    // Show or hide the property card
    card.style.display = showProperty ? "block" : "none";
    if (showProperty) visibleCount++;
  });

  // Update filter results info
  updateFilterResultsInfo(visibleCount);
}

/**
 * Update filter results information
 */
function updateFilterResultsInfo(visibleCount) {
  const resultsInfo = document.getElementById("filter-results-info");
  const resultsCount = document.getElementById("results-count");
  const activeFilters = document.getElementById("active-filters");
  const clearFiltersBtn = document.getElementById("clear-filters");

  if (resultsInfo && resultsCount) {
    resultsCount.textContent = visibleCount;
    resultsInfo.classList.remove("d-none");

    // Show/hide clear filters button
    if (clearFiltersBtn) {
      const hasActiveFilters = hasFiltersApplied();
      clearFiltersBtn.classList.toggle("d-none", !hasActiveFilters);
    }

    // Update active filters text
    if (activeFilters) {
      const filters = getActiveFilters();
      if (filters.length > 0) {
        activeFilters.textContent = `(${filters.join(", ")})`;
      } else {
        activeFilters.textContent = "";
      }
    }
  }
}

/**
 * Check if any filters are currently applied
 */
function hasFiltersApplied() {
  const propertyType = document.getElementById("propertyType")?.value;
  const budget = document.getElementById("budget")?.value;
  const bhk = document.getElementById("bhk")?.value;
  const location = document.getElementById("location")?.value;
  const possession = document.getElementById("possession")?.value;
  const amenities = document.getElementById("amenities")?.value;

  return !!(
    propertyType ||
    budget ||
    bhk ||
    location ||
    possession ||
    amenities
  );
}

/**
 * Get list of active filters for display
 */
function getActiveFilters() {
  const filters = [];

  const propertyType = document.getElementById("propertyType")?.value;
  const budget = document.getElementById("budget")?.value;
  const bhk = document.getElementById("bhk")?.value;
  const location = document.getElementById("location")?.value;
  const possession = document.getElementById("possession")?.value;
  const amenities = document.getElementById("amenities")?.value;

  if (propertyType) filters.push(`Type: ${propertyType}`);
  if (budget) filters.push(`Budget: ${getBudgetLabel(budget)}`);
  if (bhk) filters.push(`BHK: ${bhk}`);
  if (location) filters.push(`Location: ${location}`);
  if (possession) filters.push(`Status: ${possession}`);
  if (amenities) filters.push(`Amenities: ${getAmenityLabel(amenities)}`);

  return filters;
}

/**
 * Get budget label for display
 */
function getBudgetLabel(budgetValue) {
  const budgetLabels = {
    "50-100": "₹50L - ₹1Cr",
    "100-250": "₹1Cr - ₹2.5Cr",
    "250-500": "₹2.5Cr - ₹5Cr",
    "500-1000": "₹5Cr - ₹10Cr",
    "1000+": "₹10Cr+",
  };

  return budgetLabels[budgetValue] || budgetValue;
}

/**
 * Get amenity label for display
 */
function getAmenityLabel(amenityValue) {
  const amenityLabels = {
    pool: "Swimming Pool",
    gym: "Gymnasium",
    club: "Clubhouse",
    security: "24/7 Security",
    solar: "Solar Power",
  };

  return amenityLabels[amenityValue] || amenityValue;
}

// Add event listener for clear filters button
document.addEventListener("DOMContentLoaded", function () {
  const clearFiltersBtn = document.getElementById("clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", clearAllFilters);
  }
});

/**
 * Clear all filters
 */
function clearAllFilters() {
  // Reset all form inputs
  const formInputs = document.querySelectorAll(
    "#propertySearchForm input, #propertySearchForm select"
  );
  formInputs.forEach((input) => {
    if (input.type === "select-one") {
      input.selectedIndex = 0;
    } else {
      input.value = "";
    }
  });

  // Trigger filter update
  filterProperties();
}

/**
 * Check if budget matches property price range
 */
function checkBudgetMatch(budget, priceRange) {
  // Convert budget value to price range format for comparison
  switch (budget) {
    case "50-100":
      return priceRange === "50l" || priceRange === "1cr";
    case "100-250":
      return priceRange === "1cr" || priceRange === "2.5cr";
    case "250-500":
      return priceRange === "2.5cr" || priceRange === "5cr";
    case "500-1000":
      return priceRange === "5cr" || priceRange === "10cr";
    case "1000+":
      return priceRange === "10cr" || priceRange === "on-request";
    default:
      return true;
  }
}

/**
 * Check if BHK matches property BHK options
 */
function checkBhkMatch(bhk, cardBhk) {
  if (!cardBhk) return true;

  // Split cardBhk into individual options
  const bhkOptions = cardBhk.split(",");

  // Handle special cases
  if (bhk === "5+") {
    // Check if any BHK option is 5 or higher
    return bhkOptions.some((option) => {
      const num = parseInt(option);
      return !isNaN(num) && num >= 5;
    });
  }

  // Check if the selected BHK is in the options
  return bhkOptions.includes(bhk);
}

/**
 * Check if amenities match property amenities
 */
function checkAmenitiesMatch(amenity, cardAmenities) {
  if (!cardAmenities) return true;

  // Split cardAmenities into individual options
  const amenityOptions = cardAmenities.split(",");

  // Map form values to data attributes
  const amenityMap = {
    pool: "pool",
    gym: "gym",
    club: "club",
    security: "security",
    solar: "solar",
  };

  const mappedAmenity = amenityMap[amenity] || amenity;

  return amenityOptions.includes(mappedAmenity);
}

/**
 * Redirect to properties page with applied filters
 */
function redirectToFilteredProperties() {
  const propertyType = document.getElementById("propertyType")?.value;
  const budget = document.getElementById("budget")?.value;
  const bhk = document.getElementById("bhk")?.value;
  const location = document.getElementById("location")?.value;
  const possession = document.getElementById("possession")?.value;
  const amenities = document.getElementById("amenities")?.value;

  // Build query string
  const params = new URLSearchParams();
  if (propertyType) params.append("type", propertyType);
  if (budget) params.append("budget", budget);
  if (bhk) params.append("bhk", bhk);
  if (location) params.append("location", location);
  if (possession) params.append("status", possession);
  if (amenities) params.append("amenities", amenities);

  // Redirect to properties page with filters
  window.location.href = `properties.html?${params.toString()}`;
}

// Add property filtering to index page
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the index page
  if (document.querySelector(".property-finder-section")) {
    const searchForm = document.getElementById("propertySearchForm");

    if (searchForm) {
      // Add event listener to the form
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        // For index page, redirect to properties page with filters
        redirectToFilteredProperties();
      });
    }
  }

  // Check if we're on the properties page and apply any filters from URL
  if (window.location.pathname.includes("properties.html")) {
    applyUrlFilters();
  }
});

/**
 * Apply filters from URL parameters
 */
function applyUrlFilters() {
  const urlParams = new URLSearchParams(window.location.search);

  // Get filter values from URL
  const propertyType = urlParams.get("type");
  const budget = urlParams.get("budget");
  const bhk = urlParams.get("bhk");
  const location = urlParams.get("location");
  const possession = urlParams.get("status");
  const amenities = urlParams.get("amenities");

  // Set form values
  if (propertyType)
    document.getElementById("propertyType").value = propertyType;
  if (budget) document.getElementById("budget").value = budget;
  if (bhk) document.getElementById("bhk").value = bhk;
  if (location) document.getElementById("location").value = location;
  if (possession) document.getElementById("possession").value = possession;
  if (amenities) document.getElementById("amenities").value = amenities;

  // Apply filters
  setTimeout(filterProperties, 100);
}

// Add to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Loaded - Starting initialization...");

  // Debug: Check if Bootstrap is loaded
  if (typeof bootstrap !== "undefined") {
    console.log("Bootstrap is loaded");
  } else {
    console.error("Bootstrap is NOT loaded!");
  }

  // Initialize website features
  initializeWebsite();
  initializeServicesPage();
  setupPropertyFiltering();

  // Initialize subtle features - only if classes are defined
  if (typeof ScrollAnimations !== "undefined") {
    new ScrollAnimations();
  }
  if (typeof EnhancedNavbar !== "undefined") {
    new EnhancedNavbar();
  }
  setupPropertyFinderAnimations();
});

// Add CSS animations
function addAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);
}

addAnimationStyles();

// Error handling for failed image loads
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+";
      e.target.alt = "Image not available";
    }
  },
  true
);
