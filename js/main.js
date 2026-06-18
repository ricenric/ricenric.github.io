document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock Logic
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const clockEl = document.getElementById('console-clock');
        if (clockEl) clockEl.textContent = `${hours}:${minutes} ${ampm}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Options Menu Logic
    const optionsMenu = document.getElementById('options-menu');
    const optionsOverlay = document.getElementById('options-overlay');
    const openOptionsBtn = document.getElementById('open-options-btn');
    const closeOptionsBtn = document.getElementById('close-options-btn');
    const themeToggle = document.getElementById('theme-toggle');

    // Simplified toggle for floating sidebar
    function toggleMenu() {
        const isClosed = optionsMenu.classList.contains('-translate-x-[120%]');
        
        if (isClosed) {
            optionsMenu.classList.remove('-translate-x-[120%]');
        } else {
            optionsMenu.classList.add('-translate-x-[120%]');
        }
    }

    // Click listeners
    openOptionsBtn?.addEventListener('click', toggleMenu);
    closeOptionsBtn?.addEventListener('click', toggleMenu);
    optionsOverlay?.addEventListener('click', toggleMenu);

    // Keyboard listeners
    document.addEventListener('keydown', (e) => {
        // Toggle menu with 'X' key (only if they aren't typing in an input)
        if (e.key.toLowerCase() === 'x' && e.target.tagName !== 'INPUT') {
            toggleMenu();
        }
        // Close menu with 'Escape'
        if (e.key === 'Escape' && !optionsMenu.classList.contains('-translate-x-full')) {
            toggleMenu();
        }
    });

    // 3. Theme Toggle Placeholder Logic
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                console.log("Dark Mode Enabled");
                // document.documentElement.classList.add('dark');
            } else {
                console.log("Light Mode Enabled");
                // document.documentElement.classList.remove('dark');
            }
        });
    }
});