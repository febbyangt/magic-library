document.addEventListener("DOMContentLoaded", () => {
    // === 1. SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("oceanScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;
    // ===========================

    const correctSound = document.getElementById("audioCorrect");
    const wrongSound = document.getElementById("audioWrong");
    const winSound = document.getElementById("audioWin");
    
    const box = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    let solvedCount = 0;

    // FUNGSI UTAMA PENGECEKAN JAWABAN
    window.checkAnswer = function(animal, letter, isCorrect) {
        if (isCorrect) {
            // Munculkan huruf di atas garis bawah
            const blankSpace = document.getElementById(`blank-${animal}`);
            blankSpace.innerText = letter;
            blankSpace.style.display = "block";

            if(correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e=>console.log(e));
            }

            const group = document.getElementById(`group-${animal}`);
            group.style.pointerEvents = "none";
            group.style.opacity = "0.5";

            // === 2. UPDATE SKOR (+10 poin per jawaban benar) ===
            currentScore += 10;
            localStorage.setItem("oceanScore", currentScore);
            if (scoreVal) scoreVal.innerText = currentScore;
            // ===================================================

            solvedCount++;
            if (solvedCount === 2) {
                setTimeout(() => {
                    showFeedback(true);
                }, 1000);
            }
        } else {
            // JIKA SALAH
            if(wrongSound) {
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e=>console.log(e));
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
            
            // Putar suara Excellent
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

    // FUNGSI MENUTUP POP-UP (Tombol Try Again)
    window.closeFeedback = function() {
        box.style.display = "none";
        overlay.style.display = "none";
        if(wrongSound) wrongSound.pause();
    };
});