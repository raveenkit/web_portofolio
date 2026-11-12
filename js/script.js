// ==========================================
// 1. FITUR DARK MODE
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('selected-theme');

function updateToggleButton(isDark) {
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-checked', String(isDark));
    }
}

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateToggleButton(true);
} else {
    updateToggleButton(false);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            updateToggleButton(true);
            localStorage.setItem('selected-theme', 'dark');
        } else {
            updateToggleButton(false);
            localStorage.setItem('selected-theme', 'light');
        }
    });
}

// ==========================================
// 2. KONTROL MUSIK
// ==========================================
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function updateMusicButton() {
    if (musicBtn && bgMusic) {
        musicBtn.textContent = bgMusic.paused ? '🎵 Play Musik' : '⏸️ Pause Musik';
    }
}

function toggleMusic() {
    if (!bgMusic) return;
    
    if (!bgMusic.paused) {
        bgMusic.pause();
    } else {
        bgMusic.play().then(() => {
            updateMusicButton();
        }).catch(err => {
            if (err.name !== 'AbortError') {
                console.error('Gagal memutar audio:', err);
            }
            updateMusicButton();
        });
    }
}

if (bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.addEventListener('play', updateMusicButton);
    bgMusic.addEventListener('pause', updateMusicButton);
    updateMusicButton();
}

// ==========================================
// 3. PEMUTAR VIDEO WOOSAN
// ==========================================
const woosanVideo = document.getElementById('woosan-video');
const woosanVideoToggle = document.getElementById('woosan-video-toggle');

function updateWooSanVideoButton() {
    if (!woosanVideo || !woosanVideoToggle) return;

    const isPlaying = !woosanVideo.paused && !woosanVideo.ended;
    woosanVideoToggle.textContent = isPlaying ? '⏸ Pause Video' : '▶ Play Video';
    woosanVideoToggle.setAttribute('aria-label', isPlaying ? 'Jeda video WooSan' : 'Putar video WooSan');
    woosanVideoToggle.setAttribute('aria-pressed', String(isPlaying));
}

if (woosanVideo && woosanVideoToggle) {
    woosanVideo.addEventListener('play', updateWooSanVideoButton);
    woosanVideo.addEventListener('pause', updateWooSanVideoButton);
    woosanVideo.addEventListener('ended', updateWooSanVideoButton);
    woosanVideoToggle.addEventListener('click', () => {
        if (woosanVideo.paused || woosanVideo.ended) {
            woosanVideo.play().catch(err => {
                if (err.name !== 'AbortError') {
                    console.error('Gagal memutar video WooSan:', err);
                }
                updateWooSanVideoButton();
            });
        } else {
            woosanVideo.pause();
        }
    });
}

// Pesan di Console
console.log("Script loaded! Dark Mode, Smooth Scroll, and Music Player features are ready. ✨");