document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links (commented out as per your code)
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const yOffset = -100; // height of nav plus extra
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
    */

    // Slideshow logic
    let slides = document.querySelectorAll(".slide");
    let index = 0;
    function showNextSlide() {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }
    setInterval(showNextSlide, 5000);

    // Scrolling text animation
    const scrollingText = document.querySelector('.scrolling-text');
    const scrollingTextContainer = document.querySelector('.scrolling-text-container');
    if (scrollingText && scrollingTextContainer) {
        const containerTop = scrollingTextContainer.offsetTop;
        const containerHeight = scrollingTextContainer.offsetHeight;

        window.addEventListener('scroll', () => {
            let scrollProgress = (window.scrollY - containerTop + window.innerHeight) / (window.innerHeight + containerHeight);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));
            const maxScrollDistance = scrollingText.scrollWidth - window.innerWidth;
            const translateXValue = -(maxScrollDistance * scrollProgress * 2);
            scrollingText.style.transform = `translateX(${translateXValue}px)`;
        });
    }

    // Nav bar logic
    const nav = document.querySelector('.hero-nav');
    const hero = document.querySelector('.hero'); // Add reference to hero section
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('.site-footer') || { getBoundingClientRect: () => ({ top: Infinity, bottom: Infinity }) };

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
        const navRect = nav.getBoundingClientRect();
        const navCenterY = navRect.top + navRect.height / 2;

        let underlyingBg = '#fff'; // Default background
        const heroRect = hero.getBoundingClientRect();
        if (navCenterY >= heroRect.top && navCenterY <= heroRect.bottom) {
            underlyingBg = 'rgba(255, 255, 255, 0.9)'; // White over hero
        } else {
            sections.forEach(section => {
                const sectionRect = section.getBoundingClientRect();
                if (navCenterY >= sectionRect.top && navCenterY <= sectionRect.bottom) {
                    underlyingBg = window.getComputedStyle(section).backgroundColor;
                }
            });
            const footerRect = footer.getBoundingClientRect();
            if (navCenterY >= footerRect.top && navCenterY <= footerRect.bottom) {
                underlyingBg = '#1b1b1b';
            }
        }

        const bgColor = underlyingBg;
        if (
            bgColor === 'rgb(244, 244, 244)' || // #f4f4f4 from .section-about
            bgColor === 'rgb(248, 248, 248)' || // #f8f8f8 from .events
            bgColor === 'rgb(255, 255, 255)'    // #fff from .section-watch, .discover-section, .scroll-gallery
        ) {
            nav.classList.add('dark');
        } else {
            nav.classList.remove('dark');
        }

        // Trigger fade-in animation if not already visible
        if (nav && getComputedStyle(nav).opacity === '0') {
            setTimeout(() => {
                nav.style.opacity = '1';
                nav.style.transform = 'translateY(0) translateX(-50%)';
            }, 1500); // Match the 1.5s delay from CSS animation
        }
    };

    // Initial call and event listener
    window.addEventListener('scroll', throttle(handleScrollEffects, 16));
    handleScrollEffects();
});