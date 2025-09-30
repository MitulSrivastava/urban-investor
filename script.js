/**
 * Urban Investors - Luxury Real Estate Website JavaScript
 * Handles interactive features, form validation, and dynamic content
 */

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
  setupNavigation();
  generatePropertyCards();
  setupContactForm();
  setupScrollEffects();
  setupLazyLoading();
  setupNewsletterForm();
  setupAccessibility();
  setupInvestmentTracking();
}

/**
 * Navigation functionality
 */
function setupNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
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

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse.classList.contains("show")) {
            bootstrap.Collapse.getInstance(navbarCollapse).hide();
          }
        }
      }
    });
  });

  // Active link highlighting
  window.addEventListener("scroll", updateActiveNavLink);
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
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
 * Generate dynamic property cards
 */
function generatePropertyCards() {
  const propertiesGrid = document.getElementById("properties-grid");

  const properties = [
    {
      id: 1,
      title: "Manhattan Penthouse",
      location: "Upper East Side, New York",
      price: "$12,500,000",
      type: "Luxury Residence",
      bedrooms: 4,
      bathrooms: 5,
      area: "4,200 sq ft",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["City Views", "Private Terrace", "Concierge Service"],
    },
    {
      id: 2,
      title: "Beverly Hills Estate",
      location: "Beverly Hills, California",
      price: "$18,750,000",
      type: "Luxury Estate",
      bedrooms: 7,
      bathrooms: 9,
      area: "12,000 sq ft",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Pool & Spa", "Wine Cellar", "Home Theater"],
    },
    {
      id: 3,
      title: "Miami Waterfront Condo",
      location: "South Beach, Miami",
      price: "$8,900,000",
      type: "Waterfront Residence",
      bedrooms: 3,
      bathrooms: 4,
      area: "3,500 sq ft",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Ocean Views", "Private Beach", "Boat Dock"],
    },
    {
      id: 4,
      title: "Aspen Mountain Lodge",
      location: "Aspen, Colorado",
      price: "$15,200,000",
      type: "Mountain Estate",
      bedrooms: 6,
      bathrooms: 7,
      area: "8,500 sq ft",
      image:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Ski Access", "Mountain Views", "Fireplace"],
    },
    {
      id: 5,
      title: "Hamptons Estate",
      location: "East Hampton, New York",
      price: "$22,500,000",
      type: "Coastal Estate",
      bedrooms: 8,
      bathrooms: 10,
      area: "15,000 sq ft",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Beach Access", "Tennis Court", "Guest House"],
    },
    {
      id: 6,
      title: "Downtown Loft",
      location: "SoHo, New York",
      price: "$6,750,000",
      type: "Urban Loft",
      bedrooms: 2,
      bathrooms: 3,
      area: "2,800 sq ft",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["High Ceilings", "Exposed Brick", "Rooftop Access"],
    },
  ];

  properties.forEach((property) => {
    const propertyCard = createPropertyCard(property);
    propertiesGrid.appendChild(propertyCard);
  });

  // Add entrance animations
  observePropertyCards();
}

/**
 * Create individual property card
 */
function createPropertyCard(property) {
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
 * Property card intersection observer for animations
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
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Initially hide cards and observe them
  document.querySelectorAll(".property-card").forEach((card, index) => {
    card.parentElement.style.opacity = "0";
    card.parentElement.style.transform = "translateY(30px)";
    card.parentElement.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card.parentElement);
  });
}

/**
 * Contact form setup and validation
 */
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Reset validation
    this.classList.remove("was-validated");

    // Validate form
    if (!this.checkValidity()) {
      this.classList.add("was-validated");
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.classList.add("d-none");
    btnLoading.classList.remove("d-none");

    try {
      // Simulate form submission
      await simulateFormSubmission();

      // Show success message
      showNotification(
        "Thank you! Your message has been sent successfully. We'll contact you within 24 hours.",
        "success"
      );

      // Reset form
      this.reset();
      this.classList.remove("was-validated");
    } catch (error) {
      showNotification(
        "Sorry, there was an error sending your message. Please try again or call us directly.",
        "error"
      );
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      btnText.classList.remove("d-none");
      btnLoading.classList.add("d-none");
    }
  });

  // Real-time validation
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
 * Validate individual form field
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
 * Simulate form submission (replace with actual API call)
 */
function simulateFormSubmission() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 95% success rate
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
 * Show notification to user
 */
function showNotification(message, type = "info") {
  // Remove existing notifications
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

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

/**
 * Scroll effects and animations
 */
function setupScrollEffects() {
  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Fade-in animations for sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Observe sections for animations
  const sections = document.querySelectorAll("section:not(#home)");
  sections.forEach((section) => {
    observer.observe(section);
  });
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
 * Accessibility enhancements
 */
function setupAccessibility() {
  // Skip to content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.className = "skip-link";
  skipLink.textContent = "Skip to main content";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content ID
  const mainContent =
    document.querySelector("main") || document.querySelector("#home");
  if (mainContent) {
    mainContent.id = "main-content";
  }

  // Keyboard navigation for cards
  const propertyCards = document.querySelectorAll(".property-card");
  propertyCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const viewButton = this.querySelector(".btn-primary");
        if (viewButton) viewButton.click();
      }
    });
  });

  // Enhanced focus management for modals and forms
  document.addEventListener("focusin", function (e) {
    if (e.target.closest(".modal")) {
      // Trap focus within modals
      trapFocus(e.target.closest(".modal"));
    }
  });
}

/**
 * Focus trapping for accessibility
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

/**
 * Property viewing functions
 */
function viewProperty(propertyId) {
  showNotification(
    `Viewing details for property ${propertyId}. In a real application, this would open a detailed property page.`,
    "info"
  );
}

function scheduleViewing(propertyId) {
  showNotification(
    `Scheduling viewing for property ${propertyId}. In a real application, this would open a calendar booking system.`,
    "info"
  );
}

/**
 * Add CSS animations dynamically
 */
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
        
        .animate-fade-in {
            animation: fadeInUp 0.8s ease-out;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .animate-fade-in {
                animation: none;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize animation styles
addAnimationStyles();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(updateActiveNavLink, 100);
window.addEventListener("scroll", debouncedScrollHandler);

/**
 * Investment opportunity tracking
 */
function setupInvestmentTracking() {
  const investmentSection = document.querySelector(".bg-accent");
  const investmentButton = document.querySelector(".bg-accent .btn-primary");

  if (investmentButton) {
    investmentButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Track investment interest
      showNotification(
        "Redirecting to secure investment consultation. Our team will contact you within 2 hours.",
        "success"
      );

      // Scroll to contact form with pre-filled investment interest
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
            "I am interested in the Assured Exit Option investment opportunity with ₹50 Lakhs investment and 1-year exit strategy. Please provide more details.";
        }
      }, 1000);
    });
  }

  // Add animation to investment highlights
  if (investmentSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(investmentSection);
  }
}

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
