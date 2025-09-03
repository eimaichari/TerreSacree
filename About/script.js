// Full script.js for About page with nav fix
document.addEventListener('DOMContentLoaded', () => {
    // FAQ code
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqItem = header.closest('.faq-item');
            const faqContent = header.nextElementSibling;
            const plus = header.querySelector('.plus');

            if (!faqContent) return;

            // Optional: close all others first
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-content').style.maxHeight = '0';
                    item.querySelector('.plus').classList.remove('rotate');
                }
            });

            faqItem.classList.toggle('active');
            plus.classList.toggle('rotate');

            if (faqItem.classList.contains('active')) {
                faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
            } else {
                faqContent.style.maxHeight = '0';
            }
        });
    });

    // Scroll animation code
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Nav background adjustment based on section background
    const nav = document.querySelector('.hero-nav');
    const sections = document.querySelectorAll('header, section, footer');
    const darkSections = ['header', '.site-footer']; // Sections with darker backgrounds

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const navRect = nav.getBoundingClientRect();
            const navCenterY = navRect.top + navRect.height / 2;

            if (entry.isIntersecting) {
                const section = entry.target;
                const bgColor = window.getComputedStyle(section).backgroundColor;
                const isDark = darkSections.includes(section.tagName.toLowerCase()) || 
                              bgColor === 'rgba(0, 0, 0, 0.6)' || // Hero overlay
                              bgColor === 'rgb(27, 27, 27)';     // Footer

                if (isDark && navCenterY >= entry.boundingClientRect.top && navCenterY <= entry.boundingClientRect.bottom) {
                    nav.classList.add('light');
                } else {
                    nav.classList.remove('light');
                }
            }
        });
    }, { threshold: [0, 1], rootMargin: '-50px 0px -50px 0px' }); // Adjust for nav height

    sections.forEach(section => {
        navObserver.observe(section);
    });
});