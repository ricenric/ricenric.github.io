export function initPlayer() {
    const bgm = document.getElementById('bgm');
    const fxToggle = document.getElementById('fx-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeCount = document.getElementById('volume-count');
    const volumeLabel = document.getElementById('volume-label');
    

    const bgmTracks = [
        { src: '/assets/sounds/bgm/from_the_beginning.mp3', name: 'From the Beginning' },
        { src: '/assets/sounds/bgm/ludibrium_fairytale.mp3', name: 'Ludibrium: Fairytale' },
        { src: '/assets/sounds/bgm/queens_garden.mp3', name: 'Ereve: Queens Garden' },
        { src: '/assets/sounds/bgm/sellas_where_stars_rest.mp3', name: 'Sellas: Where Stars Rest' },
        { src: '/assets/sounds/bgm/shangrila_the_land_of_peach_blossoms.mp3', name: 'Shangri-La: The Land of Peach Blossoms' },
        { src: '/assets/sounds/bgm/ludibrium_timeless.mp3', name: 'Ludibrium: Timeless' },
        { src: '/assets/sounds/bgm/temple_of_time.mp3', name: 'Temple of Time' },
        { src: '/assets/sounds/bgm/kerning_square.mp3', name: 'Kerning Square' },
        { src: '/assets/sounds/bgm/water_way.mp3', name: 'Perion: Water Way' },
        { src: '/assets/sounds/bgm/the_worlds_end.mp3', name: 'Limen: The Worlds End' }
        

    ];

    let currentTrackIndex = 0;
    let isShuffled = true;
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

    // Set initial shuffle button appearance
    shuffleBtn?.classList.add('text-cyan-400');
    shuffleBtn?.classList.remove('text-slate-500');

    function setControlsEnabled(enabled) {
        const controls = [prevBtnBgm, nextBtnBgm, shuffleBtn, repeatBtn, progressBar];
        controls.forEach(el => {
            if (!el) return;
            if (enabled) {
                el.disabled = false;
                el.classList.remove('opacity-40', 'cursor-not-allowed', 'pointer-events-none');
            } else {
                el.disabled = true;
                el.classList.add('opacity-40', 'cursor-not-allowed', 'pointer-events-none');
            }
        });
    }

    // Lock controls on init
    setControlsEnabled(false);
    
    function formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function loadTrack(index) {
        bgm.src = bgmTracks[index].src;
        bgm.load();

        // Reset first
        trackName.textContent = bgmTracks[index].name;
        trackName.classList.remove('scrolling');

        setTimeout(() => {
            const wrapper = trackName.parentElement;
            if (trackName.scrollWidth > wrapper.clientWidth) {
                trackName.textContent = bgmTracks[index].name + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + bgmTracks[index].name;
                trackName.classList.add('scrolling');
            } else {
                trackName.style.transform = 'translateX(0)';
            }
        }, 50);
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
        setControlsEnabled(!muted);

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

    // Init
    loadTrack(0);
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

    // Autoplay on first keydown
    function startBgm() {
        if (!bgm.muted) bgm.play().catch(() => {});
        document.removeEventListener('keydown', startBgm);
    }
    document.addEventListener('keydown', startBgm);
}