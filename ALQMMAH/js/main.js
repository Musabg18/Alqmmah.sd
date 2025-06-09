// Mobile Menu Toggle - Improved Version with Error Handling
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        try {
            // Mobile Menu Toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mainNav = document.querySelector('.main-nav ul');
            const header = document.querySelector('.main-header');

            if (mobileMenuBtn && mainNav && header) {
                mobileMenuBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    mainNav.classList.toggle('menu-open');
                    header.classList.toggle('menu-opened');
                });

                document.addEventListener('click', function (e) {
                    if (!mainNav.contains(e.target) && e.target !== mobileMenuBtn) {
                        mainNav.classList.remove('menu-open');
                        header.classList.remove('menu-opened');
                    }
                });

                const navLinks = document.querySelectorAll('.main-nav a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function () {
                        if (window.innerWidth <= 992) {
                            mainNav.classList.remove('menu-open');
                            header.classList.remove('menu-opened');
                        }
                    });
                });
            }

            // Stats Counter
            const statNumbers = document.querySelectorAll('.stat-number');
            const statsSection = document.querySelector('.stats-section');

            if (statsSection && statNumbers.length) {
                function animateStats() {
                    try {
                        const rect = statsSection.getBoundingClientRect();
                        const isVisible = (rect.top <= window.innerHeight / 1.5) &&
                                          (rect.bottom >= window.innerHeight / 3);

                        if (isVisible) {
                            statNumbers.forEach(stat => {
                                const target = parseInt(stat.getAttribute('data-count')) || 0;
                                const duration = 2000;
                                const increment = target / (duration / 16);
                                let current = 0;

                                const timer = setInterval(() => {
                                    current += increment;
                                    if (current >= target) {
                                        clearInterval(timer);
                                        current = target;
                                    }
                                    stat.textContent = Math.floor(current);
                                }, 16);
                            });

                            window.removeEventListener('scroll', animateStats);
                        }
                    } catch (error) {
                        console.error('Error in animateStats:', error);
                    }
                }

                window.addEventListener('scroll', animateStats);
                setTimeout(animateStats, 100);
            }

            // Animate on Scroll
            function animateOnScroll() {
                try {
                    const elements = document.querySelectorAll('.animate-on-scroll');

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('animated');
                                observer.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.1
                    });

                    elements.forEach(el => observer.observe(el));
                } catch (error) {
                    console.error('Error in animateOnScroll:', error);
                }
            }

            animateOnScroll();

            // Smooth Scroll
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            anchorLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    try {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');
                        if (targetId === '#') return;
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    } catch (error) {
                        console.error('Error in smooth scrolling:', error);
                    }
                });
            });

        } catch (mainError) {
            console.error('Main initialization error:', mainError);
        }
    });

})();
