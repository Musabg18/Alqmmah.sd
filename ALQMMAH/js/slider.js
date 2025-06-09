
// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slider = document.querySelector('.slider-container');

    let currentIndex = 0;
    let slideInterval;

    if (!slides.length || !slider) return;

    // Generate dots dynamically
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');

    showSlide(currentIndex);
    startSlider();

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    function showSlide(index) {
        if (!slides[index]) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index]?.classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        resetInterval();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        resetInterval();
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlider);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startSlider();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        const diff = touchStartX - touchEndX;

        if (diff > threshold) nextSlide();
        else if (diff < -threshold) prevSlide();
    }
});
