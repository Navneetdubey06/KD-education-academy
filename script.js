// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hero slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider .slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Gallery carousel functionality
let currentGallerySlide = 0;
let currentResultGallerySlide = 0;
const galleryItems = document.querySelectorAll('#gallery .gallery-item');
const resultGalleryItems = document.querySelectorAll('#result-gallery .gallery-item');

function showGallerySlide(index, items, currentSlideVar) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextGallerySlide() {
    currentGallerySlide = (currentGallerySlide + 1) % galleryItems.length;
    showGallerySlide(currentGallerySlide, galleryItems, currentGallerySlide);
}

function prevGallerySlide() {
    currentGallerySlide = (currentGallerySlide - 1 + galleryItems.length) % galleryItems.length;
    showGallerySlide(currentGallerySlide, galleryItems, currentGallerySlide);
}

function nextResultGallerySlide() {
    currentResultGallerySlide = (currentResultGallerySlide + 1) % resultGalleryItems.length;
    showGallerySlide(currentResultGallerySlide, resultGalleryItems, currentResultGallerySlide);
}

function prevResultGallerySlide() {
    currentResultGallerySlide = (currentResultGallerySlide - 1 + resultGalleryItems.length) % resultGalleryItems.length;
    showGallerySlide(currentResultGallerySlide, resultGalleryItems, currentResultGallerySlide);
}

// Gallery controls
document.addEventListener('DOMContentLoaded', function() {
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.closest('#gallery')) {
                nextGallerySlide();
            } else if (this.closest('#result-gallery')) {
                nextResultGallerySlide();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.closest('#gallery')) {
                prevGallerySlide();
            } else if (this.closest('#result-gallery')) {
                prevResultGallerySlide();
            }
        });
    });

    // Auto-gallery slide every 4 seconds
    setInterval(nextGallerySlide, 4000);
    setInterval(nextResultGallerySlide, 4000);
});

// Form handling for admission form
document.getElementById('admission-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('student-name').value;
    const parentName = document.getElementById('parent-name').value;
    const grade = document.getElementById('grade').value;
    const course = document.getElementById('course').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;

    // Basic validation
    if (!studentName || !parentName || !grade || !course || !contact || !email) {
        alert('Please fill in all required fields.');
        return;
    }

    // Send WhatsApp message for admission
    const whatsappMessage = `Hello KD Education Academy! I would like to apply for admission.\n\nStudent Name: ${studentName}\nParent Name: ${parentName}\nGrade: ${grade}\nCourse: ${course}\nContact: ${contact}\nEmail: ${email}`;

    const whatsappUrl = `https://wa.me/919582701166?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    alert('Redirecting to WhatsApp to complete your admission process!');

    // Reset form
    this.reset();
});

// Form handling for contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;
    const grade = document.getElementById('contact-grade').value;
    const message = document.getElementById('contact-message').value;

    // Basic validation
    if (!name || !phone || !grade) {
        alert('Please fill in all required fields.');
        return;
    }

    // Send WhatsApp message
    const whatsappMessage = `Hello KD Education Academy! I would like to book a free demo class.\n\nName: ${name}\nPhone: ${phone}\nGrade: ${grade}\nMessage: ${message || 'No additional message'}`;

    const whatsappUrl = `https://wa.me/919582701166?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    alert('Redirecting to WhatsApp to book your demo class!');

    // Reset form
    this.reset();
});

// Tab functionality for study material
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabContainer = this.closest('.study-category');
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons in this container
            tabContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide all tab contents in this container
            tabContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            // Show the target tab content
            tabContainer.querySelector(`#${targetTab}`).classList.add('active');
        });
    });
});

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.course-card, .faculty-member, .facility, .review-card, .blog-post, .stat, .study-category');

    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;

        if (isVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Initialize animations on scroll
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    observer.observe(aboutSection);
}

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.createElement('button');
    navToggle.textContent = '☰';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5em;
        color: var(--primary-color);
        cursor: pointer;
    `;

    document.querySelector('.nav-container').insertBefore(navToggle, document.querySelector('.nav-menu'));

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Show/hide mobile menu button
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navMenu.style.display = 'none';
            navMenu.classList.remove('active');
        } else {
            navToggle.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: var(--secondary-color);
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 15px var(--shadow);
            display: none;
        }

        .nav-menu.active {
            display: flex;
        }

        .nav-menu li {
            margin: 10px 0;
            width: 100%;
            text-align: center;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);