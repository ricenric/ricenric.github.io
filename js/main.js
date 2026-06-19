import { setPetalCount } from './petals.js';
import { initPlayer } from './player.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock Logic
    let use24Hour = false;

    function updateClock() {
        const clockEl = document.getElementById('console-clock');
        if (!clockEl) return;
        const now = new Date();
        const minutes = String(now.getMinutes()).padStart(2, '0');

        if (use24Hour) {
            const hours = String(now.getHours()).padStart(2, '0');
            clockEl.textContent = `${hours}:${minutes}`;
        } else {
            let hours = now.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            clockEl.textContent = `${hours}:${minutes} ${ampm}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Options Menu Logic
    const optionsMenu = document.getElementById('options-menu');
    const optionsOverlay = document.getElementById('options-overlay');
    const openOptionsBtn = document.getElementById('open-options-btn');
    const closeOptionsBtn = document.getElementById('close-options-btn');
    const themeToggle = document.getElementById('theme-toggle');

    function toggleMenu() {
        const isClosed = optionsMenu.classList.contains('-translate-x-[120%]');
        if (isClosed) {
            optionsMenu.classList.remove('-translate-x-[120%]');
        } else {
            optionsMenu.classList.add('-translate-x-[120%]');
        }
    }

    openOptionsBtn?.addEventListener('click', toggleMenu);
    closeOptionsBtn?.addEventListener('click', toggleMenu);
    optionsOverlay?.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'x' && e.target.tagName !== 'INPUT') {
            toggleMenu();
        }
        if (e.key === 'Escape') {
            toggleMenu();
        }
    });

    // 3. Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                console.log("Dark Mode Enabled");
            } else {
                console.log("Light Mode Enabled");
            }
        });
    }

    // 4. Clock Format Toggle
    const clockToggle = document.getElementById('clock-toggle');
    if (clockToggle) {
        clockToggle.addEventListener('change', (e) => {
            use24Hour = e.target.checked;
            updateClock();
        });
    }

    // 5. Petal Density Slider
    const petalSlider = document.getElementById('petal-slider');
    const petalCountEl = document.getElementById('petal-count');
    if (petalSlider) {
        petalSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            petalCountEl.textContent = val;
            setPetalCount(val);
        });
    }

    // 6. Init Player
    initPlayer();
});