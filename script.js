// Modern JavaScript with ES6+ features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modern features
    initModernFeatures();
});

// Modern Features Initialization
function initModernFeatures() {
    initMobileMenu();
    initSmoothScrolling();
    initHeaderScroll();
    initIntersectionObserver();
    initParticleEffect();
    initButtonRipples();
    initSearchFunctionality();
    initPerformanceOptimizations();
    initConsoleWelcome();
}

// Mobile Menu with Modern Animation
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (mobileMenuBtn.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }
}

// Enhanced Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modern Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    };
    
    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', handleScroll);
}

// Modern Intersection Observer
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation for multiple elements
                const children = entry.target.querySelectorAll('.stat-item, .feature-item, .service-text');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Particle Effect for Hero
function initParticleEffect() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(0, 123, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
}

// Modern Button Ripple Effect
function initButtonRipples() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced Search Functionality
function initSearchFunctionality() {
    const searchBtn = document.querySelector('.search-btn');
    if (!searchBtn) return;
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = prompt('🔍 Digite o que você está procurando:');
        if (searchTerm) {
            performSearch(searchTerm);
        }
    });
}

function performSearch(term) {
    const sections = document.querySelectorAll('section');
    let found = false;
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(term.toLowerCase())) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            section.style.outline = '2px solid #007BFF';
            setTimeout(() => {
                section.style.outline = '';
            }, 3000);
            found = true;
        }
    });
    
    if (!found) {
        showNotification('Nenhum resultado encontrado para: ' + term, 'warning');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'warning' ? '#FF6B35' : '#007BFF'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalImages = [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Console Welcome Message
function initConsoleWelcome() {
    const styles = {
        title: 'color: #007BFF; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 123, 255, 0.5);',
        subtitle: 'color: #FF6B35; font-size: 14px; font-weight: 600;',
        info: 'color: #666; font-size: 12px;'
    };
    
    console.log('%c🚀 XPAM Soluções - Landing Page Moderna', styles.title);
    console.log('%c✨ Desenvolvido com as melhores práticas de 2024', styles.subtitle);
    console.log('%c🔧 Performance otimizada • Design responsivo • Animações suaves', styles.info);
    console.log('%c📱 Mobile-first • Acessibilidade • SEO otimizado', styles.info);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(5deg);
        }
    }
    
    .notification {
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    }
    
    .header {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .fade-in .stat-item,
    .fade-in .feature-item,
    .fade-in .service-text {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Modern Error Handling
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Could send to analytics service
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejeitada:', e.reason);
    // Could send to analytics service
});

// Export functions for potential external use
window.XPAMUtils = {
    showNotification,
    performSearch,
    initModernFeatures
};