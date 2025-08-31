const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const dotsContainer = document.getElementById('dots');
let current = 0;
let slidesToShow = 2;

function updateSliderToShow() {
    if (window.innerWidth <= 700) {
        slidesToShow = 1;
        dotsContainer.style.display = "flex";
    } else {
        slidesToShow = 2;
        dotsContainer.style.display = "none";
    }
    // Adjust index if needed for last slide full visibility
    if (current > slides.length - slidesToShow) current = slides.length - slidesToShow;
    if (current < 0) current = 0;
    moveSlider();
    updateDots();
    arrowDisable();
}

function arrowDisable() {
    if (current === 0) {
        prev.style.opacity = '0.5';
    } else {
        prev.style.opacity = '1';
    }
    if (current < slides.length - slidesToShow) {
        next.style.opacity = '1';
    } else {
        next.style.opacity = '0.5';
    }
}

function moveSlider() {
    const gap = window.innerWidth <= 700 ? 12 : 20;
    const slideWidth = slides[0].offsetWidth + gap;
    // Prevent scrolling past last full group
    if (current > slides.length - slidesToShow) current = slides.length - slidesToShow;
    if (current < 0) current = 0;
    slider.scrollTo({ left: current * slideWidth, behavior: 'smooth' });
    updateDots();
}

prev.onclick = () => {
    if (current > 0) current--;
    moveSlider();
    arrowDisable();
};

console.log(current);
next.onclick = () => {
    // Only increment if this doesn't make the last slide incomplete
    if (current < slides.length - slidesToShow) current++;
    moveSlider();
    arrowDisable();
};

// Dots Navigation (for mobile)
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
        const btn = document.createElement('button');
        btn.classList.add('dot');
        btn.addEventListener('click', () => {
            current = i;
            moveSlider();
        });
        dotsContainer.appendChild(btn);
    }
}

function updateDots() {
    if (window.innerWidth > 700) return;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === current);
    });
}

window.addEventListener('resize', updateSliderToShow);

// Touch swipe for mobile
let startX = 0;
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
slider.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50 && current < slides.length - slidesToShow) { current++; moveSlider(); }
    if (endX - startX > 50 && current > 0) { current--; moveSlider(); }
});

// Init
createDots();
updateSliderToShow();