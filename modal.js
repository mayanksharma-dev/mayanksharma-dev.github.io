document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const demoButtons = document.querySelectorAll('.demo-btn');
    const closeBtn = document.querySelector('.close-btn');

    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoSrc = button.getAttribute('data-video-src');
            modalVideo.src = videoSrc;
            modal.style.display = 'block';
            modalVideo.play();
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
    }

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});
