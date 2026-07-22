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
class ScrollAnimations {
constructor() {
this.animatedElements = new Set();
this.init();
}
init() {
this.observeElements();
this.setupIntersectionObserver();
setTimeout(() => {
document.querySelectorAll(".animate-on-scroll, [data-animation]").forEach(el => {
if (getComputedStyle(el).opacity === "0" || el.style.opacity === "0") {
el.style.opacity = "1";
el.style.transform = "translateY(0)";
}
});
}, 1500);
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
function initializeWebsite() {
setupNavigation();
setupContactForm();
setupNewsletterForm();
setupPropertyFinderAnimations();
setupLazyLoading();
setupInvestmentTracking();
setupHeroSlideshow();
}
function initializePropertyPage() {
if (!document.querySelector(".property-page")) {
setupPropertyContactForm();
setupPropertyScrollEffects();
setupPropertyCarousel();
setupPropertyModalForms();
setupPropertyUnitEnquiry();
}
}
function setupPropertyContactForm() {
const form = document.getElementById("propertyContactForm");
if (!form) return;
form.addEventListener("submit", function (e) {
e.preventDefault();
const formData = {
name: form.querySelector('input[type="text"]')?.value,
phone: form.querySelector('input[type="tel"]')?.value,
email: form.querySelector('input[type="email"]')?.value,
interest: form.querySelector("select")?.value,
project: "Dasnac",
};
if (!validatePropertyForm(formData)) {
showNotification("Please fill all required fields", "error");
return;
}
submitPropertyContactForm(formData);
});
}
function setupPropertyScrollEffects() {
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
function setupPropertyCarousel() {
const carousel = document.getElementById("projectGallery");
if (!carousel) return;
const carouselInstance = new bootstrap.Carousel(carousel, {
interval: 5000,
wrap: true,
});
carousel.addEventListener("mouseenter", () => {
carouselInstance.pause();
});
carousel.addEventListener("mouseleave", () => {
carouselInstance.cycle();
});
}
function setupPropertyModalForms() {
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
function setupPropertyUnitEnquiry() {
window.enquireUnit = function (unitType) {
showNotification(
`Thank you for your interest in ${unitType} units. Our team will contact you with detailed information within 24 hours.`,
"success"
);
};
}
document.addEventListener("DOMContentLoaded", function () {
if (document.querySelector(".hero-section")) {
initializePropertyPage();
}
});
window.enquireUnit = window.enquireUnit || function () {};
document.addEventListener("DOMContentLoaded", function () {
initializeWebsite();
initializeServicesPage();
setupPropertyFiltering();
if (typeof ScrollAnimations !== "undefined") {
new ScrollAnimations();
}
if (typeof EnhancedNavbar !== "undefined") {
new EnhancedNavbar();
}
setupPropertyFinderAnimations();
});
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
function setupHotProjectsCarousel() {
const wrapper = document.querySelector(".hot-projects-wrapper");
if (!wrapper) return;
const carousel = wrapper.querySelector(".hot-projects-carousel");
if (!carousel) return;
const container = carousel.querySelector(".projects-container");
const prevBtn = wrapper.querySelector(".carousel-prev");
const nextBtn = wrapper.querySelector(".carousel-next");
const cards = container.querySelectorAll(".project-card");
if (!container || !prevBtn || !nextBtn || cards.length === 0) return;
function getScrollStep() {
const card = cards[0];
const style = window.getComputedStyle(container);
const gap = parseFloat(style.gap) || 16;
return card.offsetWidth + gap;
}
prevBtn.addEventListener("click", (e) => {
e.stopPropagation();
e.preventDefault();
const step = getScrollStep();
carousel.scrollBy({ left: -step, behavior: "smooth" });
});
nextBtn.addEventListener("click", (e) => {
e.stopPropagation();
e.preventDefault();
const step = getScrollStep();
carousel.scrollBy({ left: step, behavior: "smooth" });
});
function updateArrowVisibility() {
const scrollLeft = carousel.scrollLeft;
const maxScroll = carousel.scrollWidth - carousel.clientWidth;
if (scrollLeft <= 5) {
prevBtn.style.opacity = "0.4";
prevBtn.style.pointerEvents = "none";
} else {
prevBtn.style.opacity = "1";
prevBtn.style.pointerEvents = "auto";
}
if (scrollLeft >= maxScroll - 5) {
nextBtn.style.opacity = "0.4";
nextBtn.style.pointerEvents = "none";
} else {
nextBtn.style.opacity = "1";
nextBtn.style.pointerEvents = "auto";
}
}
carousel.addEventListener("scroll", updateArrowVisibility);
window.addEventListener("resize", updateArrowVisibility);
setTimeout(updateArrowVisibility, 100);
}
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
function initializeServicesPage() {
if (!document.querySelector(".services-hero")) return;
setupServicesAnimations();
setupServicesContactForm();
setupServiceNavigation();
}
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
}, index * 100);
}
});
}, observerOptions);
serviceCards.forEach((card) => {
card.style.opacity = "0";
card.style.transform = "translateY(20px)";
card.style.transition = "all 0.6s ease-out";
serviceObserver.observe(card);
});
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
}, index * 150);
}
});
}, observerOptions);
processObserver.observe(step);
});
}
function setupServicesContactForm() {
const form = document.getElementById("servicesContactForm");
if (!form) return;
form.addEventListener("submit", function (e) {
e.preventDefault();
if (!form.checkValidity()) {
e.stopPropagation();
form.classList.add("was-validated");
return;
}
const formData = {
firstName: document.getElementById("firstName")?.value,
lastName: document.getElementById("lastName")?.value,
email: document.getElementById("email")?.value,
service: document.getElementById("service")?.value,
message: document.getElementById("message")?.value,
};
const submitBtn = form.querySelector('button[type="submit"]');
const originalText = submitBtn.textContent;
submitBtn.disabled = true;
submitBtn.innerHTML =
'<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
setTimeout(() => {
form.reset();
form.classList.remove("was-validated");
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
function setupServiceNavigation() {
const serviceLinks = document.querySelectorAll('a[href^="#"]');
serviceLinks.forEach((link) => {
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
const sections = document.querySelectorAll("section[id]");
const handleScroll = utils.throttle(() => {
const scrollPos = window.scrollY + 150;
sections.forEach((section) => {
const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;
const sectionId = section.getAttribute("id");
if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
document.querySelectorAll(".service-card").forEach((card) => {
card.classList.remove("active");
});
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
hashLinks.forEach((link) => {
console.log("Found hash link:", link.href, link.classList);
link.addEventListener("click", function (e) {
const href = this.getAttribute("href");
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
function updateActiveNavLink() {
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
function viewProperty(propertyId) {
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
function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}
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
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
button.addEventListener("mouseenter", function (e) {
this.style.transform = "translateY(-2px)";
});
button.addEventListener("mouseleave", function (e) {
this.style.transform = "translateY(0)";
});
});
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
let ticking = false;
window.addEventListener("scroll", () => {
if (!ticking) {
requestAnimationFrame(() => {
const scrolled = window.pageYOffset;
const heroImages = document.querySelectorAll(
".hero-background, .services-hero"
);
heroImages.forEach((img) => {
img.style.transform = `translateY(${scrolled * 0.3}px)`;
});
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
function setupPropertyFiltering() {
const searchForm = document.getElementById("propertySearchForm");
const propertyCards = document.querySelectorAll("#properties-grid > div");
if (!searchForm) return;
searchForm.addEventListener("submit", function (e) {
e.preventDefault();
filterProperties();
});
const formInputs = searchForm.querySelectorAll("input, select");
formInputs.forEach((input) => {
input.addEventListener("change", filterProperties);
});
}
function filterProperties() {
const propertyType = document.getElementById("propertyType")?.value;
const budget = document.getElementById("budget")?.value;
const bhk = document.getElementById("bhk")?.value;
const location = document.getElementById("location")?.value.toLowerCase();
const possession = document.getElementById("possession")?.value;
const amenities = document.getElementById("amenities")?.value;
const propertyCards = document.querySelectorAll("#properties-grid > div");
let visibleCount = 0;
propertyCards.forEach((card) => {
let showProperty = true;
if (propertyType && showProperty) {
const cardPropertyType = card.dataset.propertyType;
if (cardPropertyType && !cardPropertyType.includes(propertyType)) {
showProperty = false;
}
}
if (budget && showProperty) {
const cardPriceRange = card.dataset.priceRange;
if (cardPriceRange) {
const budgetMatch = checkBudgetMatch(budget, cardPriceRange);
if (!budgetMatch) {
showProperty = false;
}
}
}
if (bhk && showProperty) {
const cardBhk = card.dataset.bhk;
if (cardBhk) {
const bhkMatch = checkBhkMatch(bhk, cardBhk);
if (!bhkMatch) {
showProperty = false;
}
}
}
if (location && showProperty) {
const cardLocation = card
.querySelector(".text-muted")
?.textContent.toLowerCase();
if (cardLocation && !cardLocation.includes(location)) {
showProperty = false;
}
}
if (possession && showProperty) {
const cardStatus = card.dataset.status;
if (cardStatus && cardStatus !== possession) {
showProperty = false;
}
}
if (amenities && showProperty) {
const cardAmenities = card.dataset.amenities;
if (cardAmenities) {
const amenitiesMatch = checkAmenitiesMatch(amenities, cardAmenities);
if (!amenitiesMatch) {
showProperty = false;
}
}
}
card.style.display = showProperty ? "block" : "none";
if (showProperty) visibleCount++;
});
updateFilterResultsInfo(visibleCount);
}
function updateFilterResultsInfo(visibleCount) {
const resultsInfo = document.getElementById("filter-results-info");
const resultsCount = document.getElementById("results-count");
const activeFilters = document.getElementById("active-filters");
const clearFiltersBtn = document.getElementById("clear-filters");
if (resultsInfo && resultsCount) {
resultsCount.textContent = visibleCount;
resultsInfo.classList.remove("d-none");
if (clearFiltersBtn) {
const hasActiveFilters = hasFiltersApplied();
clearFiltersBtn.classList.toggle("d-none", !hasActiveFilters);
}
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
document.addEventListener("DOMContentLoaded", function () {
const clearFiltersBtn = document.getElementById("clear-filters");
if (clearFiltersBtn) {
clearFiltersBtn.addEventListener("click", clearAllFilters);
}
});
function clearAllFilters() {
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
filterProperties();
}
function checkBudgetMatch(budget, priceRange) {
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
function checkBhkMatch(bhk, cardBhk) {
if (!cardBhk) return true;
const bhkOptions = cardBhk.split(",");
if (bhk === "5+") {
return bhkOptions.some((option) => {
const num = parseInt(option);
return !isNaN(num) && num >= 5;
});
}
return bhkOptions.includes(bhk);
}
function checkAmenitiesMatch(amenity, cardAmenities) {
if (!cardAmenities) return true;
const amenityOptions = cardAmenities.split(",");
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
function redirectToFilteredProperties() {
const propertyType = document.getElementById("propertyType")?.value;
const budget = document.getElementById("budget")?.value;
const bhk = document.getElementById("bhk")?.value;
const location = document.getElementById("location")?.value;
const possession = document.getElementById("possession")?.value;
const amenities = document.getElementById("amenities")?.value;
const params = new URLSearchParams();
if (propertyType) params.append("type", propertyType);
if (budget) params.append("budget", budget);
if (bhk) params.append("bhk", bhk);
if (location) params.append("location", location);
if (possession) params.append("status", possession);
if (amenities) params.append("amenities", amenities);
window.location.href = `properties.html?${params.toString()}`;
}
document.addEventListener("DOMContentLoaded", function () {
if (document.querySelector(".property-finder-section")) {
const searchForm = document.getElementById("propertySearchForm");
if (searchForm) {
searchForm.addEventListener("submit", function (e) {
e.preventDefault();
redirectToFilteredProperties();
});
}
}
if (window.location.pathname.includes("properties.html")) {
applyUrlFilters();
}
});
function applyUrlFilters() {
const urlParams = new URLSearchParams(window.location.search);
const propertyType = urlParams.get("type");
const budget = urlParams.get("budget");
const bhk = urlParams.get("bhk");
const location = urlParams.get("location");
const possession = urlParams.get("status");
const amenities = urlParams.get("amenities");
if (propertyType)
document.getElementById("propertyType").value = propertyType;
if (budget) document.getElementById("budget").value = budget;
if (bhk) document.getElementById("bhk").value = bhk;
if (location) document.getElementById("location").value = location;
if (possession) document.getElementById("possession").value = possession;
if (amenities) document.getElementById("amenities").value = amenities;
setTimeout(filterProperties, 100);
}
document.addEventListener("DOMContentLoaded", function () {
console.log("DOM Loaded - Starting initialization...");
if (typeof bootstrap !== "undefined") {
console.log("Bootstrap is loaded");
} else {
console.error("Bootstrap is NOT loaded!");
}
initializeWebsite();
initializeServicesPage();
setupPropertyFiltering();
if (typeof ScrollAnimations !== "undefined") {
new ScrollAnimations();
}
if (typeof EnhancedNavbar !== "undefined") {
new EnhancedNavbar();
}
setupPropertyFinderAnimations();
});
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
function setupHeroSlideshow() {
const slides = document.querySelectorAll(".hero-background-slide");
if (slides.length === 0) return;
let currentSlide = 0;
setInterval(() => {
slides[currentSlide].classList.remove("active");
currentSlide = (currentSlide + 1) % slides.length;
slides[currentSlide].classList.add("active");
}, 5000);
}