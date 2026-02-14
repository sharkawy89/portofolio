// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Update icon
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// Optional: Add keyboard accessibility
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});


function connectWebSocket() {
    window.myVideoSocket = new WebSocket('ws://portofolio-virid-chi.vercel.app/#');
    
    window.myVideoSocket.onopen = () => console.log('Connected!');
}

connectWebSocket();

window.addEventListener('pagehide', () => {
    if (window.myVideoSocket) {
        window.myVideoSocket.close();
    }
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        console.log('Restored from bfcache! Reconnecting...');
        connectWebSocket();
    }
});