document.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("jungleScore", 0);
    // 1. Ambil skor dari memori browser (jika kosong, anggap 0)
    let currentScore = parseInt(localStorage.getItem("jungleScore")) || 0;
    
    // 2. Tampilkan di papan skor
    const scoreText = document.getElementById("score-text");
    if (scoreText) scoreText.innerText = currentScore;
    
    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    
    const wrongModal = document.getElementById("wrongModal");
    const correctModal = document.getElementById("correctModal"); // Panggil pop-up benar

    const correctAnswer = "Tiger";

    window.checkAnswer = function(selectedAnswer, element) {
        if (selectedAnswer === correctAnswer) {
            // --- JAWABAN BENAR ---
            if (audioCorrect) {
                audioCorrect.currentTime = 0;
                audioCorrect.play().catch(e => console.log(e));
            }
            
            // ---> KODE PENAMBAH SKOR (BARU DITAMBAHKAN) <---
            currentScore += 20; // Menambah 10 poin
            localStorage.setItem("jungleScore", currentScore); // Simpan skor baru ke memori browser
            if (scoreText) scoreText.innerText = currentScore; // Update angka di layar
            // -----------------------------------------------
            
            // Tambahkan efek cahaya di kartu target
            element.classList.add("correct-glow");
            disableAllCards();

            // Munculkan Pop-up Benar (dengan jeda 0.8 detik agar efek cahaya terlihat dulu)
            setTimeout(() => {
                correctModal.style.display = "flex";
            }, 800);

        } else {
            // --- JAWABAN SALAH ---
            if (audioWrong) {
                audioWrong.currentTime = 0;
                audioWrong.play().catch(e => console.log(e));
            }
            
            // Munculkan Pop-up Feedback Salah (tanpa jeda)
            wrongModal.style.display = "flex"; 
        }
    };

    // Fungsi untuk menutup pop-up salah saat tombol TRY AGAIN diklik
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