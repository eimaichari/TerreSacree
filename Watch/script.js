document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const fbUrl = button.getAttribute('data-fb');
            const fbPlayer = document.getElementById('facebook-player');
            const fbFrame = document.getElementById('fb-embed-frame');

            if (fbUrl && fbPlayer && fbFrame) {
                fbFrame.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(fbUrl)}&show_text=false&autoplay=1`;
                fbPlayer.style.display = 'flex';
            }
        });
    });

    // Nav bar logic
    const nav = document.querySelector('.hero-nav');
    const hero = document.querySelector('.hero');
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
            bgColor === 'rgb(255, 255, 255)' || // #fff from #watch-section
            bgColor === 'rgb(253, 246, 227)'    // #fdf6e3 from #watch-clips-section
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
            }, 1500);
        }

        // Optional debugging (remove after testing)
        // console.log('navCenterY:', navCenterY, 'heroRect:', heroRect, 'sectionRect:', sections[0]?.getBoundingClientRect());
    };

    // Initial call and event listener
    window.addEventListener('scroll', throttle(handleScrollEffects, 16));
    handleScrollEffects();

    function closeFacebookPlayer() {
        const fbPlayer = document.getElementById('facebook-player');
        const fbFrame = document.getElementById('fb-embed-frame');
        if (fbPlayer && fbFrame) {
            fbPlayer.style.display = 'none';
            fbFrame.src = '';
        }
    }
});