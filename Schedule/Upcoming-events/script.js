document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => observer.observe(element));

  // Parallax background on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const bg = document.querySelector('.background-image img');
    if (bg) {
      bg.style.transform = `translateY(${scrollY * 0.3}px)`; // parallax effect
      //bg.style.transition = 'transform 0.2s ease-out';
    }
  });

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

    // Trigger on scroll and once on load
    window.addEventListener('scroll', throttle(handleScrollEffects, 16));
    handleScrollEffects();
});