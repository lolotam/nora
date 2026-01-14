// ================================================
// أكاديمية النور - JavaScript Interactions
// ================================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== Mobile Navigation Toggle =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Animated Counters =====
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        const heroSection = document.querySelector('.hero');
        const heroPosition = heroSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (heroPosition < screenPosition) {
            hasAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // ===== Scroll Animation for Elements =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // ===== Smooth Scroll for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Particle Effect for Hero Section =====
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        // Create golden particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = '#d4af37';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.pointerEvents = 'none';

        // Random position
        particle.style.right = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Add to container
        particlesContainer.appendChild(particle);

        // Animate particle
        animateParticle(particle);
    }

    function animateParticle(particle) {
        const duration = Math.random() * 10000 + 5000; // 5-15 seconds
        const initialTop = parseFloat(particle.style.top);
        const initialRight = parseFloat(particle.style.right);

        let startTime = null;

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = (elapsed % duration) / duration;

            // Floating motion
            const newTop = initialTop + Math.sin(progress * Math.PI * 2) * 20;
            const newRight = initialRight + Math.cos(progress * Math.PI * 2) * 20;

            particle.style.top = newTop + '%';
            particle.style.right = newRight + '%';

            // Pulsing opacity
            particle.style.opacity = 0.2 + Math.sin(progress * Math.PI * 4) * 0.3;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // ===== Pricing Card Hover Effect Enhancement =====
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            if (this.classList.contains('popular')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // ===== Feature Card Animation on Hover =====
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-icon');

        card.addEventListener('mouseenter', function () {
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.1)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    // ===== Qualification Card Click to Expand (Optional) =====
    const qualCards = document.querySelectorAll('.qualification-card');

    qualCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add a subtle pulse effect on click
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // ===== WhatsApp Button Enhanced Animation =====
    const whatsappButton = document.querySelector('.whatsapp-float');

    if (whatsappButton) {
        // Add tooltip on hover
        whatsappButton.addEventListener('mouseenter', function () {
            this.setAttribute('title', 'تواصل معنا عبر واتساب');
        });
    }

    // ===== Active Section Highlighting in Navbar =====
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== Loading Animation (Optional) =====
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // ===== Console Welcome Message =====
    console.log('%c أكاديمية النور لحفظ القرآن الكريم ',
        'background: linear-gradient(135deg, #0d4f4f 0%, #1e8449 100%); color: #d4af37; padding: 15px 30px; font-size: 18px; font-weight: bold; border-radius: 10px;');
    console.log('%c المعلمة نوره عبدالواحد - معتمدة من الأزهر الشريف ',
        'color: #0d4f4f; font-size: 14px; font-weight: bold;');
    console.log('%c للتواصل: 01091347498 ',
        'color: #1e8449; font-size: 12px;');

});

// ===== Additional Utility Functions =====

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
