// settings.js

// --- DOM Elements (Must exist on the page) ---
const body = document.body;
const wallpaperSelect = document.getElementById('wallpaperSelect');
const cloakToggle = document.getElementById('cloakToggle');
const cloakSelect = document.getElementById('cloakSelect');
const dynamicFavicon = document.getElementById('dynamic-favicon');
const mainTitle = document.getElementById('mainTitle');

// --- Disguise Data ---
const disguises = {
    'default': { title: 'Subzero', icon: 'assets/default.png' },
    'clever': { title: 'Clever | Portal', icon: 'assets/cropped-Favicon-512px-180x180.webp' },
    'google': { title: 'Google Classroom', icon: 'assets/googleclassroom.webp' },
    'canvas': { title: 'Canvas', icon: 'assets/canvas.png' },
    'school': { title: 'Student Portal', icon: 'assets/school.png' }
};

// --- Apply Settings Function ---
function applySettings() {
    const saved = localStorage.getItem('subzeroSettings');
    
    if (saved) {
        const settings = JSON.parse(saved);
        
        // 1. Apply Wallpaper
        if (settings.wallpaper && body) {
            body.style.backgroundImage = `url('${settings.wallpaper}')`;
        }

        // 2. Apply Cloaking
        if (settings.isCloaked && disguises[settings.disguise]) {
            document.title = disguises[settings.disguise].title;
            if (dynamicFavicon) dynamicFavicon.href = disguises[settings.disguise].icon;
            
            // If you have a mainTitle on the new page, hide it if cloaked
            if (mainTitle) mainTitle.style.display = 'none'; 
        }
    }
}

// --- Save Settings Function (Call this when user changes a setting) ---
function saveSettings() {
    // Only save if the input elements exist on this page
    if (!cloakToggle || !cloakSelect || !wallpaperSelect) return;

    const settings = {
        isCloaked: cloakToggle.checked,
        disguise: cloakSelect.value,
        wallpaper: wallpaperSelect.value
    };
    localStorage.setItem('subzeroSettings', JSON.stringify(settings));
    
    // Re-apply immediately so the user sees the change
    applySettings();
}

// --- Initialize on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    applySettings();

    // Add event listeners only if elements exist on this page
    if (wallpaperSelect) {
        wallpaperSelect.addEventListener('change', saveSettings);
    }
    if (cloakToggle) {
        cloakToggle.addEventListener('change', saveSettings);
    }
    if (cloakSelect) {
        cloakSelect.addEventListener('change', saveSettings);
    }
});