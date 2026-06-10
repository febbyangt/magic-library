document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("jungleScore")) || 0;
    const scoreText = document.getElementById("score-text");
    if (scoreText) scoreText.innerText = currentScore;
    // ========================

    const audioQuestion = document.getElementById("audioQuestion");
    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    
    const wrongModal = document.getElementById("wrongModal");
    const correctModal = document.getElementById("correctModal");

    // Tentukan jawaban benar untuk soal ini
    const correctAnswer = "Flower"; 

    // Fungsi untuk memutar audio soal
    window.playQuestion = function() {
        if (audioQuestion) {
            audioQuestion.currentTime = 0;
            audioQuestion.play().catch(e => console.log("Gagal memutar soal:", e));
        }
    };

    // Fungsi mengecek jawaban kartu yang diklik
    window.checkAnswer = function(selectedAnswer, element) {
        if (selectedAnswer === correctAnswer) {
            // --- JAWABAN BENAR ---
            if (audioCorrect) {
                audioCorrect.currentTime = 0;
                audioCorrect.play().catch(e => console.log(e));
            }
            
            // === KODE PENAMBAH SKOR (20 POIN) ===
            currentScore += 20; 
            localStorage.setItem("jungleScore", currentScore); 
            if (scoreText) scoreText.innerText = currentScore; 
            // ====================================

            // Tambahkan efek cahaya di kartu
            element.classList.add("correct-glow");
            disableAllCards();

            // Munculkan pop-up sukses dengan delay sebentar
            setTimeout(() => {
                correctModal.style.display = "flex";
            }, 800);

        } else {
            // --- JAWABAN SALAH ---
            if (audioWrong) {
                audioWrong.currentTime = 0;
                audioWrong.play().catch(e => console.log(e));
            }
            
            // Efek getar kartu
            element.classList.add("wrong-shake");
            setTimeout(() => {
                element.classList.remove("wrong-shake");
            }, 500);

            // Munculkan pop-up oops
            wrongModal.style.display = "flex"; 
        }
    };

    window.closeModal = function() {
        wrongModal.style.display = "none";
    };

    function disableAllCards() {
        const cards = document.querySelectorAll(".card-hotspot");
        cards.forEach(card => {
            card.style.pointerEvents = "none";
        });
    }
});