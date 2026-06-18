// Carousel
const track     = document.getElementById('carousel-track');
const cards     = Array.from(track.querySelectorAll('[data-card]'));
const prevBtn   = document.getElementById('prev-btn');
const nextBtn   = document.getElementById('next-btn');
const dotsEl    = document.getElementById('dots');

// card width (w-64 = 256px) + gap (gap-10 = 40px)
const CARD_STEP = 384 + 40;
let current = 0;

// Build dots
dotsEl.innerHTML = cards.map((_, i) =>
    `<div class="dot cursor-pointer h-1.5 rounded-full bg-slate-700 transition-all duration-300 ${i === 0 ? 'w-4 bg-cyan-500' : 'w-1.5'}"></div>`
).join('');
const dots = Array.from(dotsEl.querySelectorAll('.dot'));

function update() {
    track.style.transform = `translateX(-${current * CARD_STEP}px)`;

    cards.forEach((card, i) => card.classList.toggle('active', i === current));

    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-cyan-500', i === current);
        dot.classList.toggle('bg-slate-700', i !== current);
        dot.classList.toggle('w-4', i === current);
        dot.classList.toggle('w-1.5', i !== current);
    });

    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === cards.length - 1;
}

prevBtn.addEventListener('click', () => { if (current > 0) { current--; update(); } });
nextBtn.addEventListener('click', () => { if (current < cards.length - 1) { current++; update(); } });
dots.forEach((dot, i) => dot.addEventListener('click', () => { current = i; update(); }));

// 1. Helper to handle moving the carousel
function goToCard(index) {
    if (index >= 0 && index < cards.length) {
        current = index;
        update();
    }
}

// 2. Add focus event listeners to each card for TAB accessibility
cards.forEach((card, index) => {
    card.addEventListener('focus', () => {
        goToCard(index);
    });
});

// 3. Update the keydown listener to be cleaner
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        goToCard(current - 1);
    } else if (e.key === 'ArrowRight') {
        goToCard(current + 1);
    }
});

update();