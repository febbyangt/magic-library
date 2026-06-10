document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("spaceScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;
    // ========================

    const correctSound = document.getElementById("audioCorrect");
    const wrongSound = document.getElementById("audioWrong");
    const winSound = document.getElementById("audioWin");
    
    const box = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Fungsi menampilkan feedback benar / salah
    window.showFeedback = function(isCorrect) {
        box.style.display = "block";
        overlay.style.display = "block";
        
        if (isCorrect) {
            // --- JAWABAN BENAR ---
            box.style.backgroundImage = "url('../assets/buttons/space_success.png')";
            nextBtn.style.display = "block";
            tryAgainBtn.style.display = "none";
            
            // Tambah Skor (+20 Poin)
            currentScore += 20; 
            localStorage.setItem("spaceScore", currentScore); 
            if (scoreVal) scoreVal.innerText = currentScore; 
            
            // Putar suara
            if (correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log(e));
            }
            if (winSound) {
                setTimeout(() => {
                    winSound.currentTime = 0;
                    winSound.play().catch(e => console.log(e));
                }, 400); // Delay sedikit untuk suara excellent
            }

            // Matikan semua tombol agar skor tidak bisa ditekan ganda
            const hotspots = document.querySelectorAll(".hotspot");
            hotspots.forEach(btn => btn.style.pointerEvents = "none");

        } else {
            // --- JAWABAN SALAH ---
            box.style.backgroundImage = "url('../assets/buttons/space_feedback.png')";
            nextBtn.style.display = "none";
            tryAgainBtn.style.display = "block";
            
            if (wrongSound) {
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log(e));
            }
        }
    };

    // Fungsi menutup pop-up
    window.closeFeedback = function() {
        box.style.display = "none";
        overlay.style.display = "none";
        if (wrongSound) wrongSound.pause();
    };
});