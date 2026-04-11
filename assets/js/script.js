// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeicon");
const body = document.body;
const nameRegex = /^[a-zA-Z]{3,20}\s+[a-zA-Z]{3,20}$/i;
const emailRegex = /^[a-zA-Z0-9.-_]+@(gmail)+\.(com|org|eg|edu)$/;
const phoneRegex = /^(?=(?:\D*\d){7,15}\D*$)\+?[0-9\s().-]+$/;
const subjectRegex = /^[a-zA-Z\s.,!?'-]{4,}$/;
const messageRegex = /^[\s\S]{10,}$/;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="fill:#c9d1d9;"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 32C328.4 32 336.3 36.4 340.6 43.7L396.1 136.3L500.9 110C509.1 108 517.8 110.4 523.7 116.3C529.6 122.2 532 131 530 139.1L503.7 243.8L596.4 299.3C603.6 303.6 608.1 311.5 608.1 319.9C608.1 328.3 603.7 336.2 596.4 340.5L503.7 396.1L530 500.8C532 509 529.6 517.7 523.7 523.6C517.8 529.5 509 532 500.9 530L396.2 503.7L340.7 596.4C336.4 603.6 328.5 608.1 320.1 608.1C311.7 608.1 303.8 603.7 299.5 596.4L243.9 503.7L139.2 530C131 532 122.4 529.6 116.4 523.7C110.4 517.8 108 509 110 500.8L136.2 396.1L43.6 340.6C36.4 336.2 32 328.4 32 320C32 311.6 36.4 303.7 43.7 299.4L136.3 243.9L110 139.1C108 130.9 110.3 122.3 116.3 116.3C122.3 110.3 131 108 139.2 110L243.9 136.2L299.4 43.6L301.2 41C305.7 35.3 312.6 31.9 320 31.9zM320 176C240.5 176 176 240.5 176 320C176 399.5 240.5 464 320 464C399.5 464 464 399.5 464 320C464 240.5 399.5 176 320 176zM320 416C267 416 224 373 224 320C224 267 267 224 320 224C373 224 416 267 416 320C416 373 373 416 320 416z"/></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="fill: #c9d1d9;"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"/></svg>`;

// Apply the saved theme on page load
if (currentTheme === "light" && body) {
  body.classList.add("light-theme");
  if (themeIcon) {
    themeIcon.innerHTML = moonIcon;
  }
}

// Toggle theme when button is clicked
if (themeToggle && themeIcon) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");

    // Update icon
    if (body.classList.contains("light-theme")) {
      themeIcon.innerHTML = sunIcon;
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.innerHTML = moonIcon;
      localStorage.setItem("theme", "dark");
    }
  });

  themeToggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      themeToggle.click();
    }
  });
}

const sectionToNavTarget = {
  "about-me": "#about-me",
  skills: "#skills",
  "projects-section": "#projects-section",
  education: "#education",
  contact: "#contact",
};
const navbar = document.querySelector(".nav-bar");
const sections = Object.keys(sectionToNavTarget)
  .map((sectionId) => document.getElementById(sectionId))
  .filter(Boolean);
const navLinks = Array.from(document.querySelectorAll(".nav-items a"));

window.__portfolioNavLoaded = true;

function getNavOffset() {
  return navbar ? Math.ceil(navbar.getBoundingClientRect().height) : 90;
}

function getSectionActivationOffset() {
  return getNavOffset() + 8;
}

function updateNavbarState() {
  if (!navbar) {
    return;
  }

  navbar.classList.toggle("scrolled", window.scrollY > 50);
}

function getLinkForSection(sectionId) {
  const targetHref = sectionToNavTarget[sectionId] || `#${sectionId}`;

  return navLinks.find((link) => link.getAttribute("href") === targetHref);
}

function updateActiveLink() {
  if (!sections.length) {
    return;
  }

  const isAtBottom =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2;

  const activationLine = window.scrollY + getSectionActivationOffset();
  let currentSectionId = sections[0].id || "home";

  for (const section of sections) {
    if (section.offsetTop <= activationLine) {
      currentSectionId = section.id;
    } else {
      break;
    }
  }

  if (isAtBottom) {
    currentSectionId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = getLinkForSection(currentSectionId);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

let navSyncFrame = null;

function syncNavigationState() {
  if (navSyncFrame !== null) {
    return;
  }

  navSyncFrame = window.requestAnimationFrame(() => {
    navSyncFrame = null;
    updateNavbarState();
    updateActiveLink();
  });
}

window.addEventListener(
  "scroll",
  () => {
    syncNavigationState();
  },
  { passive: true },
);

window.addEventListener("load", syncNavigationState);
window.addEventListener("resize", syncNavigationState);
window.addEventListener("DOMContentLoaded", syncNavigationState);

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    const targetSection = document.querySelector(href);

    if (targetSection) {
      const offsetTop = Math.max(
        targetSection.offsetTop - getSectionActivationOffset(),
        0,
      );
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        updateActiveLink();
      }, 250);
    }
  });
});

// Contact Form Validation
const contactForm = document.querySelector(".contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form inputs
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    // Validation flags
    let isValid = true;
    let errors = [];

    // Validate name
    if (!nameRegex.test(nameInput.value.trim())) {
      isValid = false;
      errors.push("Name must be your fullname (each name 3-15 letters)");
      nameInput.style.borderColor = "#ef4444";
    } else {
      nameInput.style.borderColor = "#22c55e";
    }

    // Validate email
    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      errors.push("Please enter a valid email");
      emailInput.style.borderColor = "#ef4444";
    } else {
      emailInput.style.borderColor = "#22c55e";
    }

    // Validate phone when provided
    if (
      phoneInput &&
      phoneInput.value.trim() == "" &&
      !phoneRegex.test(phoneInput.value.trim())
    ) {
      isValid = false;
      errors.push("Please enter a valid phone number");
      phoneInput.style.borderColor = "#ef4444";
    } else if (phoneInput) {
      phoneInput.style.borderColor =
        phoneInput.value.trim() !== "" ? "#22c55e" : "";
    }

    // Validate subject
    if (!subjectRegex.test(subjectInput.value.trim())) {
      isValid = false;
      errors.push("Subject must be at least 4 characters (no digits allowed)");
      subjectInput.style.borderColor = "#ef4444";
    } else {
      subjectInput.style.borderColor = "#22c55e";
    }

    // Validate message
    if (!messageRegex.test(messageInput.value.trim())) {
      isValid = false;
      errors.push("Message must be at least 10 characters");
      messageInput.style.borderColor = "#ef4444";
    } else {
      messageInput.style.borderColor = "#22c55e";
    }

    // If validation passes, submit the form
    if (isValid) {
      // Hide any previous error messages
      if (formMessage) {
        formMessage.style.display = "none";
      }

      // Reset border colors to success
      nameInput.style.borderColor = "#22c55e";
      emailInput.style.borderColor = "#22c55e";
      subjectInput.style.borderColor = "#22c55e";
      messageInput.style.borderColor = "#22c55e";

      // Submit form to Formspree
      this.submit();
    } else {
      // Show error messages
      if (formMessage) {
        formMessage.className = "form-message error";
        formMessage.innerHTML =
          "<strong>Please fix the following errors:</strong><br>" +
          errors.join("<br>");
        formMessage.style.display = "block";

        // Scroll to error message
        formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  });

  // Real-time validation feedback
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  if (nameInput) {
    nameInput.addEventListener("input", function () {
      if (nameRegex.test(this.value.trim())) {
        this.style.borderColor = "#22c55e";
      } else if (this.value.trim() !== "") {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      if (emailRegex.test(this.value.trim())) {
        this.style.borderColor = "#22c55e";
      } else if (this.value.trim() !== "") {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      if (this.value.trim() === "") {
        this.style.borderColor = "#ef4444";
      } else if (phoneRegex.test(this.value.trim())) {
        this.style.borderColor = "#22c55e";
      }
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener("input", function () {
      if (subjectRegex.test(this.value.trim())) {
        this.style.borderColor = "#22c55e";
      } else if (this.value.trim() !== "") {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener("input", function () {
      if (messageRegex.test(this.value.trim())) {
        this.style.borderColor = "#22c55e";
      } else if (this.value.trim() !== "") {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });
  }
}

// ===== REVEAL ON SCROLL ANIMATION SYSTEM =====

/**
 * Lightweight Reveal on Scroll Animation System
 * Uses Intersection Observer API for optimal performance
 * Animates entire sections at once when they come into view
 */

class RevealOnScroll {
  constructor(options = {}) {
    this.options = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || "0px 0px -100px 0px",
      once: options.once !== undefined ? options.once : true,
      targetSelector: options.targetSelector || "[data-reveal]",
    };

    this.observer = null;
    this.targets = [];
    this.init();
  }

  init() {
    if (!("IntersectionObserver" in window)) {
      this.showAllElements();
      return;
    }

    this.targets = document.querySelectorAll(this.options.targetSelector);

    if (this.targets.length === 0) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin,
      },
    );

    this.targets.forEach((target) => {
      this.observer.observe(target);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        element.classList.add("reveal-active");

        const handleTransitionEnd = (e) => {
          if (e.propertyName === "opacity" || e.propertyName === "transform") {
            element.removeAttribute("data-reveal");
            element.removeAttribute("data-reveal-delay");
            element.removeAttribute("data-reveal-duration");
            element.removeAttribute("data-reveal-easing");
            element.style.opacity = "1";
            element.classList.remove("reveal-active");
            element.removeEventListener("transitionend", handleTransitionEnd);
          }
        };

        element.addEventListener("transitionend", handleTransitionEnd);

        if (this.options.once) {
          this.observer.unobserve(element);
        }
      } else if (!this.options.once) {
        entry.target.classList.remove("reveal-active");
      }
    });
  }

  showAllElements() {
    const allRevealElements = document.querySelectorAll("[data-reveal]");
    allRevealElements.forEach((element) => {
      element.classList.add("reveal-active");
    });
  }

  refresh() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.init();
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Initialize the Reveal on Scroll system when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const revealOnScroll = new RevealOnScroll({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
    once: true,
    targetSelector: "[data-reveal]",
  });

  // Optional: Expose to global scope for manual control
  window.revealOnScroll = revealOnScroll;
});
