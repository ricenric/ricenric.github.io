

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

    // // 2. Toggle Logic
    // const toggleBtn = document.getElementById('theme-toggle');
    // if (toggleBtn) {
    //     toggleBtn.addEventListener('click', () => {
    //         document.documentElement.classList.toggle('dark');
    //         console.log("Dark mode toggled:", document.documentElement.classList.contains('dark'));
    //     });
    // } else {
    //     console.error("Theme toggle button not found!");
    // }
});