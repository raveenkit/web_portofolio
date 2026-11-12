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

// Pesan di Console
console.log("Script loaded! Dark Mode, Smooth Scroll, and Music Player features are ready. ✨");