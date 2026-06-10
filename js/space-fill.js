document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("spaceScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;

    const correctSound = document.getElementById("audioCorrect");
    const wrongSound = document.getElementById("audioWrong");
    const winSound = document.getElementById("audioWin");
    
    const box = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Status penyelesaian masing-masing kata
    let rocketSolved = false;
    let starSolved = false;

    // === LOGIKA JAWABAN ===
    window.checkAnswer = function(word, isCorrect, btnElement) {
        // Jika kata tersebut sudah dijawab benar sebelumnya, cegah klik ganda
        if (word === 'rocket' && rocketSolved) return;
        if (word === 'star' && starSolved) return;

        if (isCorrect) {
            // --- JAWABAN BENAR ---
            if (correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(e => console.log(e));
            }
            
            // Tambah skor (+10 Poin)
            currentScore += 10;
            localStorage.setItem("spaceScore", currentScore);
            if (scoreVal) scoreVal.innerText = currentScore;

            // Munculkan huruf di garis kosong
            if (word === 'rocket') {
                rocketSolved = true;
                document.getElementById('fill-rocket').style.display = 'block';
            } else if (word === 'star') {
                starSolved = true;
                document.getElementById('fill-star').style.display = 'block';
            }

            // Cek apakah kedua soal sudah selesai
            if (rocketSolved && starSolved) {
                setTimeout(() => showFeedback(true), 800);
            }

        } else {
            // --- JAWABAN SALAH ---
            if (wrongSound) {
                wrongSound.currentTime = 0;
                wrongSound.play().catch(e => console.log(e));
            }
            
            // Animasi getar salah
            btnElement.classList.add("shake-animation");
            setTimeout(() => {
                btnElement.classList.remove("shake-animation");
                showFeedback(false); // Memunculkan pop-up Try Again
            }, 500);
        }
    };

    // === FUNGSI POP-UP ===
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

    window.closeFeedback = function() {
        box.style.display = "none";
        overlay.style.display = "none";
        if(wrongSound) wrongSound.pause();
    };
});