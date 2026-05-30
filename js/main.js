// Main JS for M.1 Photography

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initPreloader();
    initNavigation();
    initAnimations();
    initPageTransitions();
});

// 1. Smooth Scrolling (Lenis)
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

// 2. Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    const tl = gsap.timeline();

    tl.to('.preloader-logo span', {
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
    })
    .to('.preloader', {
        y: '-100%',
        duration: 1.2,
        ease: 'expo.inOut',
        delay: 0.5
    })
    .from('.hero h1 span', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5');
}

// 3. Navigation
function initNavigation() {
    const header = document.querySelector('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links-center');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close menu when a link is clicked (mobile)
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// 4. Global Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in sections
    const fadeElements = document.querySelectorAll('.gsap-fade-in');
    fadeElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Parallax Images
    const parallaxImages = document.querySelectorAll('.gsap-parallax');
    parallaxImages.forEach(img => {
        gsap.to(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -50,
            ease: 'none'
        });
    });
}

// 5. Page Transitions
function initPageTransitions() {
    const transitionOverlay = document.querySelector('.page-transition');
    const links = document.querySelectorAll('a[href$=".html"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === window.location.pathname) return;
            
            e.preventDefault();
            
            gsap.to(transitionOverlay, {
                y: 0,
                duration: 0.8,
                ease: 'expo.inOut',
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });
}
