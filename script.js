document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 4. Floating CTA Visibility
    const floatingBtn = document.querySelector('.floating-cta');
    const heroSection = document.getElementById('hero');

    if (heroSection && floatingBtn) {
        const ctaOptions = {
            rootMargin: "-500px 0px 0px 0px"
        };

        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    floatingBtn.classList.add('visible');
                } else {
                    floatingBtn.classList.remove('visible');
                }
            });
        }, ctaOptions);

        ctaObserver.observe(heroSection);
    }

    // 5. Accordion Logic for FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.style.padding = "0 1.4rem";
                    const prevIcon = item.previousElementSibling?.querySelector('i');
                    if (prevIcon) {
                        prevIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                    }
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0 1.4rem";
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                content.style.maxHeight = content.scrollHeight + 40 + "px";
                content.style.padding = "1.5rem";
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });

    // 6. Countdown Timer
    const countdownEl = document.getElementById("countdown");
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const targetDate = new Date('July 12, 2026 11:00:00 GMT+0530').getTime();

    const updateCountdown = () => {
        if (!countdownEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownEl.innerHTML = "Workshop is starting!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
});