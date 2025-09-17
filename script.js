// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            // Respect CSS scroll-margin-top (e.g., Tailwind's scroll-mt-*)
            e.preventDefault();
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled
        if (currentScrollY > 10) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
        
        lastScrollY = currentScrollY;
    });

    // Active navigation highlighting (include extra blocks)
    const sections = document.querySelectorAll('section[id], #tech-stack, #certifications');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-primary', 'font-semibold');
            item.classList.add('text-secondary');
            
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.remove('text-secondary');
                item.classList.add('text-primary', 'font-semibold');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial call

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections/blocks for animation
    sections.forEach(section => {
        observer.observe(section);
    });

    // Tech stack cards staggered animation on scroll
    const techCards = document.querySelectorAll('#tech-stack .grid > div');
    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    const techObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const cards = Array.from(techCards);
            cards.forEach((card, idx) => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, idx * 120);
            });
            obs.disconnect(); // run once
        });
    }, { threshold: 0.2 });

    const techSection = document.querySelector('#tech-stack');
    if (techSection) techObserver.observe(techSection);

    // Lecture cards staggered animation on scroll
    const lectureCards = document.querySelectorAll('#lectures .grid > a');
    lectureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    const lectureObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const cards = Array.from(lectureCards);
            cards.forEach((card, idx) => {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, idx * 120);
            });
            obs.disconnect();
        });
    }, { threshold: 0.2 });

    const lecturesSection = document.querySelector('#lectures');
    if (lecturesSection) lectureObserver.observe(lecturesSection);

    // Contact form validation (if needed)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // You can add analytics tracking here
            console.log('Email link clicked');
        });
    });

    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 text-white p-3 rounded-full shadow-lg transition-colors opacity-0 pointer-events-none z-50';
    scrollToTopBtn.style.backgroundColor = '#F7BFA5';
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#E5A689';
    });
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#F7BFA5';
    });
    scrollToTopBtn.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    // Typing effect for the main title (optional)
    const titleElement = document.querySelector('h1 span');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                titleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
});

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #2d3748;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #4a5568;
    }
`;

document.head.appendChild(style);
