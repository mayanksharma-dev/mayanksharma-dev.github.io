document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        themeToggle.src = 'https://img.icons8.com/ios-glyphs/30/000000/sun.png';
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isLight: true } }));
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        
        if (isLight) {
            themeToggle.src = 'https://img.icons8.com/ios-glyphs/30/000000/sun.png';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.src = 'https://img.icons8.com/ios-glyphs/30/ffffff/bright-moon.png';
            localStorage.setItem('theme', 'dark');
        }
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isLight: isLight } }));
    });
});
