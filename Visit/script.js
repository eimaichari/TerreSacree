document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.getElementById('hero-content');
    const heroContentWrapper = document.querySelector('.hero-content-wrapper');
    const sections = document.querySelectorAll('section');
    const heroSection = document.querySelector('.hero');
    const scatteredImages = document.querySelectorAll('.hero-scattered-image');
    const nav = document.querySelector('.hero-nav');

    // Initial animations
    heroContent.classList.add('is-visible');
    scatteredImages.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('is-visible');
        }, index * 150); // Increased delay for smoother stagger
    });

    // Throttle scroll event for performance
    let lastScrollY = window.scrollY;
    const throttle = (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    };

    const handleScrollEffects = () => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const navBottom = window.innerHeight - 60; // Nav is 60px from bottom
        const navRect = nav.getBoundingClientRect();
        const navCenterY = navRect.top + navRect.height / 2;

        // Hero content wrapper scroll behavior
        const heroContentScrollStart = viewportHeight * 1.5;
        if (scrollY >= heroContentScrollStart) {
            heroContentWrapper.classList.add('absolute-scroll');
            heroContentWrapper.style.top = `${heroContentScrollStart}px`;
        } else {
            heroContentWrapper.classList.remove('absolute-scroll');
            heroContentWrapper.style.top = '0';
        }

        // Smooth parallax effect for scattered images
        scatteredImages.forEach((img, index) => {
            const speed = 0.15 + (index * 0.03); // Reduced speed for smoother effect
            const offset = scrollY * speed;
            img.style.transform = `translateY(${offset}px) scale(1)`;
            img.style.transition = 'transform 0.1s ease-out'; // Fast update for smooth scrolling
        });

        // Dynamic nav background based on underlying section
        let underlyingBg = '#fff'; // Default to body background
        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            if (navCenterY >= sectionRect.top && navCenterY <= sectionRect.bottom) {
                underlyingBg = window.getComputedStyle(section).backgroundColor;
            }
        });
        const footerRect = document.querySelector('.site-footer').getBoundingClientRect();
        if (navCenterY >= footerRect.top && navCenterY <= footerRect.bottom) {
            underlyingBg = '#1b1b1b'; // Footer background
        }

        // Adjust nav background
        const bgColor = underlyingBg;
        if (bgColor === 'rgb(248, 248, 248)' || bgColor === 'rgb(232, 232, 232)' || bgColor === 'rgb(255, 255, 255)') {
            nav.classList.add('dark');
        } else {
            nav.classList.remove('dark');
        }

        // Section animations
        const triggerPointForSections = heroSection.offsetHeight - (viewportHeight * 0.5);
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (scrollY >= triggerPointForSections && sectionTop < viewportHeight * 0.8) {
                section.classList.add('is-visible');
                const cards = section.querySelectorAll('.time-card, .expect-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, index * 150);
                });
            }
        });

        lastScrollY = scrollY;
    };

    window.addEventListener('scroll', throttle(handleScrollEffects, 16)); // ~60fps
    handleScrollEffects();
});