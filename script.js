// DOM Elements
const hamburger = document.querySelector('.social-icon.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const heroButtons = document.querySelectorAll('.hero-buttons .btn');
const contactForm = document.getElementById('contactForm');
const socialIcons = document.querySelectorAll('.social-icon');

// Mobile Navigation Toggle
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero button actions
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent === 'EXPLORE NOW') {
            // Scroll to showcase section
            const showcaseSection = document.querySelector('#showcase');
            const offsetTop = showcaseSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else if (button.textContent === 'LEARN MORE') {
            // Scroll to about section
            const aboutSection = document.querySelector('#about');
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.feature, .showcase-item, .contact-info, .contact-form');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero video
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || e.target.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CD964' : type === 'error' ? '#FF3B30' : '#F5A623'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Showcase item hover effects
const showcaseItems = document.querySelectorAll('.showcase-item');
showcaseItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});

// Feature card hover effects
const features = document.querySelectorAll('.feature');
features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
        feature.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    feature.addEventListener('mouseleave', () => {
        feature.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #F5A623;
    color: #000;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
});

// Loading animation
window.addEventListener('load', () => {
    // Hide loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Trigger initial animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) heroTitle.style.animationDelay = '0.2s';
    if (heroSubtitle) heroSubtitle.style.animationDelay = '0.4s';
    if (heroButtons) heroButtons.style.animationDelay = '0.6s';
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar background change
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Scroll to top button
    if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(100px)';
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Copy contract address functionality
window.copyContract = function() {
    const contractAddress = document.getElementById('contractAddress').textContent;
    navigator.clipboard.writeText(contractAddress).then(() => {
        showNotification('Contract address copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = contractAddress;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Contract address copied to clipboard!', 'success');
    });
};

// Animate roadmap milestones on scroll
const roadmapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, { threshold: 0.2 });

// Observe roadmap milestones
const milestones = document.querySelectorAll('.milestone');
milestones.forEach((milestone, index) => {
    milestone.style.opacity = '0';
    milestone.style.transform = 'translateY(50px) scale(0.9)';
    milestone.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    roadmapObserver.observe(milestone);
});

// Animate buy steps on scroll
const stepsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, { threshold: 0.3 });

// Observe buy step cards
const stepCards = document.querySelectorAll('.step-card.compact');
stepCards.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px) scale(0.9)';
    step.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    stepsObserver.observe(step);
});

// Animate tokenomics content on scroll
const tokenomicsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tokenCard = entry.target.querySelector('.token-card');
            const mascot = entry.target.querySelector('.token-mascot-img');

            if (tokenCard) {
                tokenCard.style.opacity = '1';
                tokenCard.style.transform = 'translateX(0)';
            }

            if (mascot) {
                mascot.style.opacity = '1';
                mascot.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    });
}, { threshold: 0.3 });

// Observe tokenomics content
const tokenomicsContent = document.querySelector('.tokenomics-content');
if (tokenomicsContent) {
    const tokenCard = tokenomicsContent.querySelector('.token-card');
    const mascot = tokenomicsContent.querySelector('.token-mascot-img');

    if (tokenCard) {
        tokenCard.style.opacity = '0';
        tokenCard.style.transform = 'translateX(-50px)';
        tokenCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }

    if (mascot) {
        mascot.style.opacity = '0';
        mascot.style.transform = 'scale(0.8) rotate(-10deg)';
        mascot.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
    }

    tokenomicsObserver.observe(tokenomicsContent);
}

// Add hover effects for compact step cards
const compactStepCards = document.querySelectorAll('.step-card.compact');
compactStepCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects for milestone cards
const milestoneCards = document.querySelectorAll('.milestone-card');
milestoneCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const milestone = card.closest('.milestone');
        if (milestone) {
            milestone.style.transform = 'translateY(-10px) scale(1.05)';
        }
    });

    card.addEventListener('mouseleave', () => {
        const milestone = card.closest('.milestone');
        if (milestone) {
            milestone.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Animate progress bars when milestones come into view
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
            }
        }
    });
}, { threshold: 0.5 });

milestones.forEach(milestone => {
    progressObserver.observe(milestone);
});

// Social icon interactions
socialIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();

        // Add click animation
        icon.style.transform = 'scale(0.95)';
        setTimeout(() => {
            icon.style.transform = '';
        }, 150);

        // Handle different social platforms
        const ariaLabel = icon.getAttribute('aria-label');
        switch(ariaLabel) {
            case 'Twitter':
                // Replace with actual Twitter URL
                window.open('https://twitter.com/MeetNIA', '_blank');
                break;
            case 'Telegram':
                // Replace with actual Telegram URL
                window.open('https://t.me/MeetNIA', '_blank');
                break;
            case 'DexTools':
                // Replace with actual DexTools URL
                window.open('https://www.dextools.io/app/ether/pair-explorer/CONTRACT_ADDRESS', '_blank');
                break;
            case 'Menu':
                // Toggle mobile menu
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');

                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
                break;
        }
    });

    // Add hover sound effect (optional)
    icon.addEventListener('mouseenter', () => {
        // You can add a subtle sound effect here if desired
    });
});

// Showcase Gallery Horizontal Scrolling
const showcaseGallery = document.querySelector('.showcase-gallery');

if (showcaseGallery) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse drag scrolling
    showcaseGallery.addEventListener('mousedown', (e) => {
        isDown = true;
        showcaseGallery.classList.add('active');
        startX = e.pageX - showcaseGallery.offsetLeft;
        scrollLeft = showcaseGallery.scrollLeft;
    });

    showcaseGallery.addEventListener('mouseleave', () => {
        isDown = false;
        showcaseGallery.classList.remove('active');
    });

    showcaseGallery.addEventListener('mouseup', () => {
        isDown = false;
        showcaseGallery.classList.remove('active');
    });

    showcaseGallery.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - showcaseGallery.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        showcaseGallery.scrollLeft = scrollLeft - walk;
    });

    // Touch scrolling for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    showcaseGallery.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = showcaseGallery.scrollLeft;
    });

    showcaseGallery.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 2;
        showcaseGallery.scrollLeft = touchScrollLeft + walk;
    });

    showcaseGallery.addEventListener('touchend', () => {
        touchStartX = 0;
    });

    // Auto-scroll animation (optional)
    let autoScrollDirection = 1;
    let autoScrollSpeed = 0.5;
    let isUserInteracting = false;

    function autoScroll() {
        if (!isUserInteracting && showcaseGallery) {
            showcaseGallery.scrollLeft += autoScrollSpeed * autoScrollDirection;

            // Reverse direction at ends
            if (showcaseGallery.scrollLeft >= showcaseGallery.scrollWidth - showcaseGallery.clientWidth) {
                autoScrollDirection = -1;
            } else if (showcaseGallery.scrollLeft <= 0) {
                autoScrollDirection = 1;
            }
        }
        requestAnimationFrame(autoScroll);
    }

    // Pause auto-scroll on user interaction
    showcaseGallery.addEventListener('mouseenter', () => {
        isUserInteracting = true;
    });

    showcaseGallery.addEventListener('mouseleave', () => {
        setTimeout(() => {
            isUserInteracting = false;
        }, 2000); // Resume auto-scroll after 2 seconds
    });

    showcaseGallery.addEventListener('touchstart', () => {
        isUserInteracting = true;
    });

    showcaseGallery.addEventListener('touchend', () => {
        setTimeout(() => {
            isUserInteracting = false;
        }, 3000); // Resume auto-scroll after 3 seconds on mobile
    });

    // Start auto-scroll
    autoScroll();
}
