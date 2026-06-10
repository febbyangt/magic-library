document.addEventListener("DOMContentLoaded", () => {
    // Ambil skor dari 'spaceScore'
    const finalScore = parseInt(localStorage.getItem('spaceScore')) || 0;
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
    // Mencegah pembagian dengan nol jika finalScore 0
    const step = finalScore > 0 ? finalScore / (duration / 20) : 0; 

    if (finalScore > 0) {
        const interval = setInterval(() => {
            count += step;
            scoreVal.innerText = Math.floor(count);
            if (count >= finalScore) {
                scoreVal.innerText = finalScore;
                clearInterval(interval);
            }
        }, 20);
    } else {
        scoreVal.innerText = 0;
    }
});