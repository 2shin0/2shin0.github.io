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
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
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

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
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

    // Observe all sections for animation
    sections.forEach(section => {
        observer.observe(section);
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-md');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Tech stack icons animation
    const techIcons = document.querySelectorAll('.grid.grid-cols-2 > div');
    
    techIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, index * 100);
    });

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
