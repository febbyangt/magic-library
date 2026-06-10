document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("spaceScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;
    // ========================

    const questionSound = document.getElementById("audioQuestion");
    const correctSound = document.getElementById("audioCorrect");
    const wrongSound = document.getElementById("audioWrong");
    const winSound = document.getElementById("audioWin");
    
    const box = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Tentukan jawaban yang benar di sini
    const correctAnswer = 'planet'; 

    // Fungsi memutar soal
    window.playQuestion = function() {
        if(questionSound) {
            questionSound.currentTime = 0;
            questionSound.play().catch(e => console.log(e));
        }
    };

    // Fungsi mengecek jawaban
    window.checkAnswer = function(selectedObject) {
        if (selectedObject === correctAnswer) {
            // --- JAWABAN BENAR ---
            if(correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log(e));
            }
            
            // Tambah Skor (+20 Poin)
            currentScore += 20;
            localStorage.setItem("spaceScore", currentScore);
            if (scoreVal) scoreVal.innerText = currentScore;

            // Matikan klik agar skor tidak bisa digandakan
            const hotspots = document.querySelectorAll(".choice-btn");
            hotspots.forEach(btn => btn.style.pointerEvents = "none");

            // Munculkan Pop-up Berhasil
            setTimeout(() => {
                showFeedback(true);
            }, 500);

        } else {
            // --- JAWABAN SALAH ---
            if(wrongSound) {
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log(e));
            }
            showFeedback(false);
        }
    };

    // Fungsi Menampilkan Pop-up
    window.showFeedback = function(isSuccess) {
        box.style.display = "block";
        overlay.style.display = "block";
        
        if (isSuccess) {
            box.style.backgroundImage = "url('../assets/buttons/space_excellent.png')";
            tryAgainBtn.style.display = "none";
            nextBtn.style.display = "block";
            
            if(winSound) { 
                winSound.currentTime = 0; 
                winSound.play().catch(e=>console.log(e)); 
            }
        } else {
            box.style.backgroundImage = "url('../assets/buttons/space_tryagain.png')";
            tryAgainBtn.style.display = "block";
            nextBtn.style.display = "none";
        }
    };

    // Fungsi Menutup Pop-up
    window.closeFeedback = function() {
        box.style.display = "none";
        overlay.style.display = "none";
        if(wrongSound) wrongSound.pause();
    };
});