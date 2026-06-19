// Carousel
const track     = document.getElementById('carousel-track');
const cards     = Array.from(track.querySelectorAll('[data-card]'));
const prevBtn   = document.getElementById('prev-btn');
const nextBtn   = document.getElementById('next-btn');
const dotsEl    = document.getElementById('dots');

// card width (w-64 = 256px) + gap (gap-10 = 40px)
let current = 0;

// Build dots
dotsEl.innerHTML = cards.map((_, i) =>
    `<div class="dot cursor-pointer h-1.5 rounded-full bg-slate-700 transition-all duration-300 ${i === 0 ? 'w-4 bg-cyan-500' : 'w-1.5'}"></div>`
).join('');
const dots = Array.from(dotsEl.querySelectorAll('.dot'));

function update() {
    track.style.transform = `translateX(-${current * getCardStep()}px)`;

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

prevBtn.addEventListener('click', () => { 
    if (current > 0) { 
        current--; 
        update(); 
        cards[current].focus(); // Keep focus synced on click
    } 
});
nextBtn.addEventListener('click', () => { 
    if (current < cards.length - 1) { 
        current++; 
        update(); 
        cards[current].focus(); // Keep focus synced on click
    } 
});
dots.forEach((dot, i) => dot.addEventListener('click', () => { 
    current = i; 
    update(); 
    cards[current].focus(); // Keep focus synced on dot click
}));

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

// 3. Update the keydown listener to handle initial focus snapping
document.addEventListener('keydown', e => {
    // Check if any card currently has focus
    const isAnyCardFocused = cards.some(card => document.activeElement === card);

    if (e.key === 'ArrowLeft') {
        e.preventDefault(); 
        
        if (!isAnyCardFocused) {
            // First interaction: Snap focus to the currently visible card
            cards[current].focus();
        } else {
            // Normal interaction: Move left
            goToCard(current - 1);
            cards[current].focus();
        }
        
    } else if (e.key === 'ArrowRight') {
        e.preventDefault(); 
        
        if (!isAnyCardFocused) {
            // First interaction: Snap focus to the currently visible card
            cards[current].focus();
        } else {
            // Normal interaction: Move right
            goToCard(current + 1);
            cards[current].focus();
        }
    }
});

window.addEventListener('resize', () => {
    update();
});

// Add this function:
function getCardStep() {
    const card = cards[current];
    const trackGap = parseFloat(getComputedStyle(track).gap) || 40;
    return card.offsetWidth + trackGap;
}

// Initialize on load
update();