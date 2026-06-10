document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    // Mengambil skor dari halaman sebelumnya
    let currentScore = parseInt(localStorage.getItem("oceanScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;
    // ========================

    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    const audioWin = document.getElementById("audioWin");
    
    const feedbackBox = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Jawaban yang dicari adalah JELLYFISH
    const targetAnimal = "jellyfish"; 

    window.checkFind = function(clickedAnimal) {
        if (clickedAnimal === targetAnimal) {
            // --- JAWABAN BENAR ---
            if (audioCorrect) {
                audioCorrect.currentTime = 0;
                audioCorrect.play().catch(e => console.log(e));
            }
            
            // === TAMBAH SKOR (+20 Poin sebagai penutup) ===
            currentScore += 20; 
            localStorage.setItem("oceanScore", currentScore); 
            if (scoreVal) scoreVal.innerText = currentScore; 
            // ==============================================

            // Tampilkan pop-up Success
            setTimeout(() => {
                showFeedback(true);
            }, 500);

        } else {
            // --- JAWABAN SALAH ---
            if (audioWrong) {
                audioWrong.currentTime = 0;
                audioWrong.play().catch(e => console.log(e));
            }
            showFeedback(false);
        }
    };

    window.showFeedback = function(isSuccess) {
        feedbackBox.style.display = "block";
        overlay.style.display = "block";
        
        if (isSuccess) {
            feedbackBox.style.backgroundImage = "url('../assets/buttons/excellent.png')";
            tryAgainBtn.style.display = "none";
            nextBtn.style.display = "block";
            
            // ==============================================================
            // 👉 DI SINI TEMPATNYA: PELATUK BUKU TAMAT 👈
            // Memastikan memori browser mencatat bahwa Ocean sudah beres
            localStorage.setItem("oceanScore", 100); 
            // ==============================================================

            if(audioWin) { 
                audioWin.currentTime = 0; 
                audioWin.play().catch(e=>console.log(e)); 
            }
        } else {
            feedbackBox.style.backgroundImage = "url('../assets/buttons/try_again.png')";
            tryAgainBtn.style.display = "block";
            nextBtn.style.display = "none";
        }
    };

    window.closeFeedback = function() {
        feedbackBox.style.display = "none";
        overlay.style.display = "none";
    };
});