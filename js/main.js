import { setPetalCount } from './petals.js';

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

    // 6. BGM Setup
    const bgm = document.getElementById('bgm');
    const fxToggle = document.getElementById('fx-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeCount = document.getElementById('volume-count');
    const volumeLabel = document.getElementById('volume-label');

    // 7. Music Player
    const bgmTracks = [
        { src: '/assets/sounds/bgm/queens_garden.mp3', name: 'Ereve: Queens Garden' },
        { src: '/assets/sounds/bgm/water_way.mp3', name: 'Perion: Water Way' },
        { src: '/assets/sounds/bgm/the_worlds_end.mp3', name: 'Limen: The Worlds End' },
    ];

    let currentTrackIndex = 0;
    let isShuffled = false;
    let isRepeating = false;

    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtnBgm = document.getElementById('prev-btn-bgm');
    const nextBtnBgm = document.getElementById('next-btn-bgm');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressBar = document.getElementById('progress-bar');
    const bgmCurrent = document.getElementById('bgm-current');
    const bgmDuration = document.getElementById('bgm-duration');
    const trackName = document.getElementById('track-name');

    function formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function loadTrack(index) {
        bgm.src = bgmTracks[index].src;
        trackName.textContent = bgmTracks[index].name;
        bgm.load();
    }

    function playTrack(index) {
        currentTrackIndex = index;
        loadTrack(index);
        bgm.play().catch(() => {});
        playPauseBtn.textContent = '⏸';
    }

    function getNextIndex() {
        if (isShuffled) {
            let next;
            do { next = Math.floor(Math.random() * bgmTracks.length); }
            while (next === currentTrackIndex && bgmTracks.length > 1);
            return next;
        }
        return (currentTrackIndex + 1) % bgmTracks.length;
    }

    function setMuteState(muted) {
        bgm.muted = muted;
        fxToggle.checked = !muted;

        volumeSlider.disabled = muted;
        volumeSlider.classList.toggle('opacity-40', muted);
        volumeSlider.classList.toggle('cursor-not-allowed', muted);
        volumeSlider.classList.toggle('cursor-pointer', !muted);
        volumeLabel.classList.toggle('opacity-40', muted);
        volumeCount.classList.toggle('opacity-40', muted);

        if (!muted) {
            bgm.play().catch(() => {});
            playPauseBtn.textContent = '⏸';
        } else {
            bgm.pause();
            playPauseBtn.textContent = '▶';
        }
    }

    // Single playPauseBtn listener
    playPauseBtn?.addEventListener('click', () => {
        if (bgm.muted) {
            setMuteState(false);
            return;
        }
        if (bgm.paused) {
            bgm.play();
            playPauseBtn.textContent = '⏸';
        } else {
            bgm.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    nextBtnBgm?.addEventListener('click', () => playTrack(getNextIndex()));
    prevBtnBgm?.addEventListener('click', () => {
        if (bgm.currentTime > 3) { bgm.currentTime = 0; }
        else { playTrack((currentTrackIndex - 1 + bgmTracks.length) % bgmTracks.length); }
    });

    shuffleBtn?.addEventListener('click', () => {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('text-cyan-400', isShuffled);
        shuffleBtn.classList.toggle('text-slate-500', !isShuffled);
    });

    repeatBtn?.addEventListener('click', () => {
        isRepeating = !isRepeating;
        repeatBtn.classList.toggle('text-cyan-400', isRepeating);
        repeatBtn.classList.toggle('text-slate-500', !isRepeating);
    });

    bgm.addEventListener('ended', () => {
        if (isRepeating) { bgm.play(); }
        else { playTrack(getNextIndex()); }
    });

    bgm.addEventListener('timeupdate', () => {
        if (!bgm.duration) return;
        const pct = (bgm.currentTime / bgm.duration) * 100;
        progressFill.style.width = `${pct}%`;
        bgmCurrent.textContent = formatTime(bgm.currentTime);
        bgmDuration.textContent = formatTime(bgm.duration);
    });

    progressBar?.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        bgm.currentTime = pct * bgm.duration;
    });

    // Load first track on init
    loadTrack(0);

    // 8. Volume + BGM toggle
    bgm.volume = 0.25;
    bgm.muted = true;

    if (fxToggle) {
        fxToggle.addEventListener('change', (e) => setMuteState(!e.target.checked));
    }

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            bgm.volume = val / 100;
            volumeCount.textContent = `${val}%`;
        });
    }

    // 9. BGM Autoplay on first interaction — keydown only, no click
    function startBgm() {
        if (!bgm.muted) bgm.play().catch(() => {});
        document.removeEventListener('keydown', startBgm);
    }
    document.addEventListener('keydown', startBgm);
});