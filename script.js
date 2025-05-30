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

// Arka plan resmi kontrolü
const backgroundImage = document.getElementById('backgroundImage');

// === SAYFA YÜKLENDİĞİNDE === 
window.addEventListener('load', () => {
    // Arka plan GIF'ini yükle ve göster
    if (backgroundImage) {
        backgroundImage.addEventListener('load', () => {
            backgroundImage.classList.add('loaded');
        });
        
        // Eğer GIF zaten yüklenmişse
        if (backgroundImage.complete) {
            backgroundImage.classList.add('loaded');
        }
    }
    
    // Sayfa yüklenme animasyonu
    document.body.classList.add('loading');
});

// === TEMAYI YÜKLE ===
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

// === TEMA DEĞİŞTİRME (ANİMASYONLU) ===
darkModeToggle.addEventListener('click', () => {
    // Buton animasyonu
    darkModeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        darkModeToggle.style.transform = '';
    }, 150);
    
    // Tema değişimi
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
        
        // Gece modu animasyonu
        document.body.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
    } else {
        darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
        
        // Gündüz modu animasyonu
        document.body.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
    }
});

// === DİL SEÇİMİ ===
function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    
    // Çeviri animasyonu ile
    document.querySelectorAll('[data-en]').forEach((el, index) => {
        setTimeout(() => {
            const enText = el.getAttribute('data-en');
            const trText = el.getAttribute('data-tr');
            
            if (enText && trText) {
                el.style.opacity = '0.5';
                el.style.transform = 'translateY(-5px)';
                
                setTimeout(() => {
                    el.textContent = lang === 'en' ? enText : trText;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 150);
            }
        }, index * 50);
    });
    
    // Title elementini güncelle
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const enTitle = titleElement.getAttribute('data-en');
        const trTitle = titleElement.getAttribute('data-tr');
        
        if (enTitle && trTitle) {
            titleElement.textContent = lang === 'en' ? enTitle : trTitle;
        }
    }
    
    // HTML lang attribute'unu güncelle
    document.documentElement.lang = lang === 'en' ? 'en' : 'tr';
    
    // Dropdown'u kapat
    langDropdown.classList.add('hidden');
    
    console.log(`Dil değiştirildi: ${lang}`);
}

// Dropdown toggle (animasyonlu)
langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Buton animasyonu
    langToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        langToggle.style.transform = '';
    }, 150);
    
    langDropdown.classList.toggle('hidden');
});

// Dropdown dış tıklamada kapanması
document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target)) {
        langDropdown.classList.add('hidden');
    }
});

// Dil seçimi (animasyonlu)
document.querySelectorAll('#langDropdown div').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Seçim animasyonu
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 100);
        
        const lang = item.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Sayfa yüklendiğinde varsayılan dili ayarla
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    changeLanguage(savedLang);
});

// === MÜZİK KONTROLÜ ===
function updatePlayPauseButton() {
    const isPlaying = !backgroundMusic.paused;
    playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    
    // Müzik çalarken animasyon
    if (isPlaying) {
        musicControl.style.animation = 'pulse 2s infinite';
    } else {
        musicControl.style.animation = '';
    }
}

playPauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Buton animasyonu
    playPauseBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        playPauseBtn.style.transform = '';
    }, 150);
    
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(err => {
            console.error("Müzik oynatılamadı:", err);
            const currentLang = localStorage.getItem('lang') || 'en';
            const message = currentLang === 'en' 
                ? "Please click on the page first to allow audio playback." 
                : "Lütfen önce sayfaya tıklayarak ses çalmaya izin verin.";
            alert(message);
        });
    } else {
        backgroundMusic.pause();
    }
});

backgroundMusic.addEventListener('play', updatePlayPauseButton);
backgroundMusic.addEventListener('pause', updatePlayPauseButton);

musicControl.addEventListener('click', (e) => {
    if (e.target !== playPauseBtn && !playPauseBtn.contains(e.target)) {
        // Ana kontrol animasyonu
        musicControl.style.transform = 'scale(0.95)';
        setTimeout(() => {
            musicControl.style.transform = '';
        }, 150);
        
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(console.error);
        } else {
            backgroundMusic.pause();
        }
    }
});

// === SCROLL ANİMASYONLARI ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Kartları gözlemle
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// === KLAVYE ERİŞİLEBİLİRLİĞİ ===
document.addEventListener('keydown', (e) => {
    // ESC ile dropdown'u kapat
    if (e.key === 'Escape') {
        langDropdown.classList.add('hidden');
    }
    
    // D tuşu ile dark mode toggle
    if (e.key === 'd' || e.key === 'D') {
        if (!e.ctrlKey && !e.metaKey) {
            darkModeToggle.click();
        }
    }
    
    // L tuşu ile dil değiştir
    if (e.key === 'l' || e.key === 'L') {
        if (!e.ctrlKey && !e.metaKey) {
            langToggle.click();
        }
    }
});
