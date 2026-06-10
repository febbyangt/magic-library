document.addEventListener("DOMContentLoaded", () => {
    // === 1. SETUP PAPAN SKOR (Mengambil memori Ocean) ===
    let currentScore = parseInt(localStorage.getItem("oceanScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;
    // ====================================================

    const questionSound = document.getElementById("audioQuestion");
    const correctSound = document.getElementById("audioCorrect");
    const wrongSound = document.getElementById("audioWrong");
    const winSound = document.getElementById("audioWin");
    
    const box = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    const correctAnswer = 'shark'; 

    // Fungsi memutar soal
    window.playQuestion = function() {
        if(questionSound) {
            questionSound.currentTime = 0;
            questionSound.play().catch(e => console.log(e));
        }
    };

    // Fungsi mengecek jawaban
    window.checkAnswer = function(selectedAnimal) {
        if (selectedAnimal === correctAnswer) {
            // --- JIKA BENAR ---
            if(correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log(e));
            }
            
            // === TAMBAH SKOR (Langsung +20 Poin) ===
            currentScore += 20;
            localStorage.setItem("oceanScore", currentScore);
            if (scoreVal) scoreVal.innerText = currentScore;
            // =======================================

            // Matikan hotspot agar poin tidak bisa diklik dobel
            const hotspots = document.querySelectorAll(".hotspot");
            hotspots.forEach(btn => btn.style.pointerEvents = "none");

            // Beri jeda sedikit lalu tampilkan pop-up berhasil
            setTimeout(() => {
                showFeedback(true);
            }, 500);

        } else {
            // --- JIKA SALAH ---
            if(wrongSound) {
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log(e));
            }
            showFeedback(false);
        }
    };

    // FUNGSI MEMUNCULKAN POP-UP
    window.showFeedback = function(isSuccess) {
        box.style.display = "block";
        overlay.style.display = "block";
        
        if (isSuccess) {
            box.style.backgroundImage = "url('../assets/buttons/excellent.png')";
            tryAgainBtn.style.display = "none";
            nextBtn.style.display = "block";
            
            if(winSound) { 
                winSound.currentTime = 0; 
                winSound.play().catch(e=>console.log(e)); 
            }
        } else {
            box.style.backgroundImage = "url('../assets/buttons/try_again.png')";
            tryAgainBtn.style.display = "block";
            nextBtn.style.display = "none";
        }
    };

    // FUNGSI MENUTUP POP-UP
    window.closeFeedback = function() {
        box.style.display = "none";
        overlay.style.display = "none";
        if(wrongSound) wrongSound.pause();
    };
});