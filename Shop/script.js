// Full script.js with Shop additions
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
        }, index * 150); // Increased delay for smoother stagger (no effect now due to display: none)
    });

    // Use requestAnimationFrame for smoother animations (CHANGE: Replaced throttle with requestAnimationFrame)
    let lastScrollY = 0;
    let animationFrameId = null;

    const handleScrollEffects = () => {
        if (animationFrameId) return;
        animationFrameId = requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const navBottom = viewportHeight - 60; // Nav is 60px from bottom
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
                if (scrollY >= triggerPointForSections && sectionTop < viewportHeight * 0.8 && !section.classList.contains('is-visible')) {
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
            animationFrameId = null;
        });
    };

    // CHANGE: Added passive: true to prevent scroll blocking for better performance
    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects(); // Initial call

    // Shop cart functionality
    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.shop-card');
            const item = {
                name: card.querySelector('h3').textContent,
                price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
                quantity: 1
            };

            const existingItem = cart.find(i => i.name === item.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(item);
            }

            updateCart();
        });
    });

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';

        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItems.appendChild(div);
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        document.getElementById('cart-total').textContent = total.toFixed(2);
    }

    // Basic checkout form submission (for demo purposes)
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed! (This is a demo - no real payment processed)');
        cart = []; // Clear cart
        updateCart();
    });
});