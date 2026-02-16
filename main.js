document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contribution graph
    const graph = document.querySelector('.graph');
    if (graph) {
        const totalDays = 371; // 53 weeks * 7 days
        for (let i = 0; i < totalDays; i++) {
            const cell = document.createElement('div');
            cell.classList.add('graph-cell');
            const randomValue = Math.random();
            if (document.body.classList.contains('light-theme')) {
                if (randomValue < 0.1) {
                    cell.style.backgroundColor = '#7dd3fc';
                } else if (randomValue < 0.3) {
                    cell.style.backgroundColor = '#38bdf8';
                } else if (randomValue < 0.6) {
                    cell.style.backgroundColor = '#0ea5e9';
                }
            } else {
                if (randomValue < 0.1) {
                    cell.style.backgroundColor = '#67e8f9';
                } else if (randomValue < 0.3) {
                    cell.style.backgroundColor = '#22d3ee';
                } else if (randomValue < 0.6) {
                    cell.style.backgroundColor = '#06b6d4';
                }
            }
            graph.appendChild(cell);
        }
    }
});

