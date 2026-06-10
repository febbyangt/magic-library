document.addEventListener("DOMContentLoaded", () => {
    // Ambil skor dari 'jungleScore'
    const finalScore = parseInt(localStorage.getItem('jungleScore')) || 0;
    const scoreVal = document.querySelector('.score-val');
    
    // Animasi Bintang
    const stars = document.querySelectorAll('.star-icon');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.classList.add('pop-animation');
        }, 600 + (index * 400));
    });

    // Animasi Hitung Skor
    let count = 0;
    const duration = 2000;
    const step = finalScore / (duration / 20);

    const interval = setInterval(() => {
        count += step;
        scoreVal.innerText = Math.floor(count);
        if (count >= finalScore) {
            scoreVal.innerText = finalScore;
            clearInterval(interval);
        }
    }, 20);
});