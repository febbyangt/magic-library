document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("jungleScore")) || 0;
    const scoreText = document.getElementById("score-text");
    if (scoreText) scoreText.innerText = currentScore;
    // ========================

    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    const wrongModal = document.getElementById("wrongModal");
    const correctModal = document.getElementById("correctModal");

    let status = {
        monkey: false,
        flower: false
    };

    window.checkLetter = function(questionType, isCorrect) {
        if (status[questionType] === true) return;

        if (isCorrect) {
            // --- JAWABAN BENAR ---
            if (audioCorrect) {
                audioCorrect.currentTime = 0;
                audioCorrect.play().catch(e => console.log(e));
            }

            // === TAMBAH SKOR (10 Poin per huruf) ===
            currentScore += 10; 
            localStorage.setItem("jungleScore", currentScore); 
            if (scoreText) scoreText.innerText = currentScore; 
            // =====================================

            const fillText = document.getElementById(`fill-${questionType}`);
            fillText.classList.add("show");

            const options = document.querySelectorAll(`.${questionType}-opt`);
            options.forEach(opt => opt.style.pointerEvents = "none");

            status[questionType] = true;

            if (status.monkey === true && status.flower === true) {
                setTimeout(() => {
                    correctModal.style.display = "flex";
                }, 800);
            }

        } else {
            // --- JAWABAN SALAH ---
            if (audioWrong) {
                audioWrong.currentTime = 0;
                audioWrong.play().catch(e => console.log(e));
            }
            
            wrongModal.style.display = "flex";
        }
    };

    window.closeModal = function() {
        wrongModal.style.display = "none";
    };
});