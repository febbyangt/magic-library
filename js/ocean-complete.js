document.addEventListener("DOMContentLoaded", () => {
    // Ambil total skor yang terakumulasi
    const finalScore = parseInt(localStorage.getItem('totalScore')) || 100;
    const scoreVal = document.querySelector('.score-val');
    
    // Animasi Bintang Muncul Satu Per Satu
    const stars = document.querySelectorAll('.star-icon');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.classList.add('pop-animation');
        }, 600 + (index * 400));
    });

    // Animasi Hitung Skor 0 ke 500
    let count = 0;
    const duration = 2000; // 2 detik durasi animasi
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