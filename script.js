// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    // Update icon
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Download Resume Button Handler
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function(e) {
        // Allow default behavior if on a proper server
        if (window.location.protocol !== 'file:') {
            return; // Let the normal download attribute work
        }
        
        // For file:// protocol, use alternative method
        e.preventDefault();
        
        const link = document.createElement('a');
        const pdfPath = 'public/Adhamsharkawy-resume.pdf';
        
        // For file protocol, open in new tab (browsers block direct download from file://)
        link.href = pdfPath;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const sections = document.querySelectorAll('main > div[id], section[id]');
const navLinks = document.querySelectorAll('.nav-items a');

function setActiveLink() {
    let currentSection = '';
    
    // Get current scroll position with navbar offset
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if we're in this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // If at the very top of the page, set home as active
    if (window.scrollY < 100) {
        currentSection = 'home';
    }

    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current section's link
    if (currentSection) {
        const activeLink = document.querySelector(`.nav-items a[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Debounce scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        setActiveLink();
    });
});

window.addEventListener('load', setActiveLink);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const targetSection = document.querySelector(href);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Manually trigger active link update after smooth scroll
            setTimeout(() => {
                setActiveLink();
            }, 100);
        }
    });
});


// Contact Form Validation
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Regular expressions
        const nameRegex = /^[a-zA-Z]{3,20}\s+[a-zA-Z]{3,20}$/i;
        const emailRegex = /^[a-zA-Z0-9.-_]+@(gmail)+\.(com|org|eg|edu)$/;
        const subjectRegex = /^[a-zA-Z\s.,!?'-]{4,}$/;
        const messageRegex = /^[\s\S]{10,}$/;

        // Validation flags
        let isValid = true;
        let errors = [];

        // Validate name
        if (!nameRegex.test(nameInput.value.trim())) {
            isValid = false;
            errors.push('Name must be your fullname (each name 3-15 letters)');
            nameInput.style.borderColor = '#ef4444';
        } else {
            nameInput.style.borderColor = '#22c55e';
        }

        // Validate email
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errors.push('Please enter a valid email');
            emailInput.style.borderColor = '#ef4444';
        } else {
            emailInput.style.borderColor = '#22c55e';
        }

        // Validate subject
        if (!subjectRegex.test(subjectInput.value.trim())) {
            isValid = false;
            errors.push('Subject must be at least 4 characters (no digits allowed)');
            subjectInput.style.borderColor = '#ef4444';
        } else {
            subjectInput.style.borderColor = '#22c55e';
        }

        // Validate message
        if (!messageRegex.test(messageInput.value.trim())) {
            isValid = false;
            errors.push('Message must be at least 10 characters');
            messageInput.style.borderColor = '#ef4444';
        } else {
            messageInput.style.borderColor = '#22c55e';
        }

        // If validation passes, submit the form
        if (isValid) {
            // Hide any previous error messages
            if (formMessage) {
                formMessage.style.display = 'none';
            }

            // Reset border colors to success
            nameInput.style.borderColor = '#22c55e';
            emailInput.style.borderColor = '#22c55e';
            subjectInput.style.borderColor = '#22c55e';
            messageInput.style.borderColor = '#22c55e';

            // Submit form to Formspree
            this.submit();
        } else {
            // Show error messages
            if (formMessage) {
                formMessage.className = 'form-message error';
                formMessage.innerHTML = '<strong>Please fix the following errors:</strong><br>' + errors.join('<br>');
                formMessage.style.display = 'block';

                // Scroll to error message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });

    // Real-time validation feedback
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('input', function () {
            const nameRegex = /^[a-zA-Z]{3,20}\s+[a-zA-Z]{3,20}$/i;
            if (nameRegex.test(this.value.trim())) {
                this.style.borderColor = '#22c55e';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const emailRegex = /^[a-zA-Z0-9.-_]+@(gmail)+\.(com|org|eg|edu)$/;
            if (emailRegex.test(this.value.trim())) {
                this.style.borderColor = '#22c55e';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    if (subjectInput) {
        subjectInput.addEventListener('input', function () {
            const subjectRegex = /^[a-zA-Z\s.,!?'-]{4,}$/;
            if (subjectRegex.test(this.value.trim())) {
                this.style.borderColor = '#22c55e';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('input', function () {
            const messageRegex = /^[\s\S]{10,}$/;
            if (messageRegex.test(this.value.trim())) {
                this.style.borderColor = '#22c55e';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
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
        // Configuration options
        this.options = {
            threshold: options.threshold || 0.1, // Percentage of section visible before triggering
            rootMargin: options.rootMargin || '0px 0px -100px 0px', // Adjust viewport for triggering
            once: options.once !== undefined ? options.once : true, // Animate only once
            sectionSelector: options.sectionSelector || 'main > div[id], section[id]' // Sections to observe
        };

        // Initialize the observer
        this.observer = null;
        this.sections = [];
        this.init();
    }

    init() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            this.showAllElements();
            return;
        }

        // Select all sections
        this.sections = document.querySelectorAll(this.options.sectionSelector);

        if (this.sections.length === 0) {
            return;
        }

        // Create the Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            }
        );

        // Observe each section
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all reveal elements within this section
                const revealElements = entry.target.querySelectorAll('[data-reveal]');
                
                // Trigger all animations in this section
                revealElements.forEach(element => {
                    element.classList.add('reveal-active');
                    
                    // Clean up after animation completes
                    const handleTransitionEnd = (e) => {
                        if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                            // Remove the data-reveal attribute to clear all reveal styles
                            element.removeAttribute('data-reveal');
                            element.removeAttribute('data-reveal-delay');
                            element.removeAttribute('data-reveal-duration');
                            element.removeAttribute('data-reveal-easing');
                            // Keep opacity at 1 and remove the active class
                            element.style.opacity = '1';
                            element.classList.remove('reveal-active');
                            element.removeEventListener('transitionend', handleTransitionEnd);
                        }
                    };
                    element.addEventListener('transitionend', handleTransitionEnd);
                });

                // If once option is true, stop observing this section
                if (this.options.once) {
                    this.observer.unobserve(entry.target);
                }
            } else if (!this.options.once) {
                // If once is false, remove active class when section leaves viewport
                const revealElements = entry.target.querySelectorAll('[data-reveal]');
                revealElements.forEach(element => {
                    element.classList.remove('reveal-active');
                });
            }
        });
    }

    showAllElements() {
        // Fallback for browsers that don't support Intersection Observer
        const allRevealElements = document.querySelectorAll('[data-reveal]');
        allRevealElements.forEach(element => {
            element.classList.add('reveal-active');
        });
    }

    // Public method to refresh and observe new sections
    refresh() {
        if (this.observer) {
            // Disconnect existing observer
            this.observer.disconnect();
        }
        // Re-initialize
        this.init();
    }

    // Public method to destroy the observer
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

// Initialize the Reveal on Scroll system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const revealOnScroll = new RevealOnScroll({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
        once: true,
        sectionSelector: 'main > div[id], section[id]'
    });

    // Optional: Expose to global scope for manual control
    window.revealOnScroll = revealOnScroll;
});
