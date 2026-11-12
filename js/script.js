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
// 2. FUNGSI MUSIK OTOMATIS & TOMBOL KONTROL
// ==========================================
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = false;

function toggleMusic() {
    if (!bgMusic) return;
    
    if (isPlaying) {
        bgMusic.pause();
        if (musicBtn) musicBtn.textContent = '🎵 Play Musik';
        isPlaying = false;
    } else {
        bgMusic.play().then(() => {
            if (musicBtn) musicBtn.textContent = '⏸️ Pause Musik';
            isPlaying = true;
        }).catch(err => {
            console.log("Gagal memutar audio:", err);
        });
    }
}

// Otomatis mencoba memutar musik saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    if (!bgMusic) return;
    
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        isPlaying = true;
        if (musicBtn) musicBtn.textContent = '⏸️ Pause Musik';
    }).catch(() => {
        // Jika diblokir browser, musik langsung menyala pada klik/sentuhan pertama di layar
        document.body.addEventListener('click', function autoPlayOnFirstClick() {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    if (musicBtn) musicBtn.textContent = '⏸️ Pause Musik';
                    isPlaying = true;
                });
            }
            document.body.removeEventListener('click', autoPlayOnFirstClick);
        }, { once: true });
    });
});

// Pesan di Console
console.log("Script loaded! Dark Mode, Smooth Scroll, and Music Player features are ready. ✨");