// Tema Kontrolleri
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.body;

// Dil Kontrolleri
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');

// Müzik Kontrolleri
const backgroundMusic = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const musicControl = document.getElementById('musicControl');

// === TEMAYI YÜKLE ===
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

// === TEMA DEĞİŞTİRME ===
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// === DİL SEÇİMİ ===
function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-tr');
    });
    langDropdown.classList.add('hidden'); // Dropdown kapat
}

langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    langDropdown.classList.add('hidden');
});

document.querySelectorAll('#langDropdown div').forEach(item => {
    item.addEventListener('click', () => {
        const lang = item.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    changeLanguage(savedLang);
});

// === MÜZİK KONTROLÜ ===
function updatePlayPauseButton() {
    playPauseBtn.innerHTML = backgroundMusic.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}

playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(err => {
            console.error("Müzik oynatılamadı:", err);
            alert("Lütfen önce sayfaya tıklayarak izin verin.");
        });
    } else {
        backgroundMusic.pause();
    }
});

backgroundMusic.addEventListener('play', updatePlayPauseButton);
backgroundMusic.addEventListener('pause', updatePlayPauseButton);

musicControl.addEventListener('click', (e) => {
    if (e.target !== playPauseBtn && !playPauseBtn.contains(e.target)) {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(console.error);
        } else {
            backgroundMusic.pause();
        }
    }
});