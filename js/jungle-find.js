document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    // Mengambil skor dari halaman sebelumnya
    let currentScore = parseInt(localStorage.getItem("jungleScore")) || 0;
    const scoreText = document.getElementById("score-text");
    if (scoreText) scoreText.innerText = currentScore;
    // ========================

    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    
    const wrongModal = document.getElementById("wrongModal");
    const correctModal = document.getElementById("correctModal");

    // Jawaban yang dicari
    const targetAnimal = "monkey"; 

    window.checkAnimal = function(clickedAnimal, element) {
        if (clickedAnimal === targetAnimal) {
            // --- JAWABAN BENAR ---
            if (audioCorrect) {
                audioCorrect.currentTime = 0;
                audioCorrect.play().catch(e => console.log(e));
            }
            
            // === TAMBAH SKOR (Langsung 20 Poin) ===
            currentScore += 20; 
            localStorage.setItem("jungleScore", currentScore); 
            if (scoreText) scoreText.innerText = currentScore; 
            // ======================================

            // Tambahkan efek cahaya
            element.classList.add("correct-glow");
            disableAllAnimals();

            // Tampilkan pop-up Success
            setTimeout(() => {
                correctModal.style.display = "flex";
            }, 800);

        } else {
            // --- JAWABAN SALAH ---
            if (audioWrong) {
                audioWrong.currentTime = 0;
                audioWrong.play().catch(e => console.log(e));
            }
            
            // Efek getar menyala merah
            element.classList.add("wrong-shake");
            setTimeout(() => {
                element.classList.remove("wrong-shake");
            }, 500);

            // Tampilkan pop-up Oops
            wrongModal.style.display = "flex"; 
        }
    };

    window.closeModal = function() {
        wrongModal.style.display = "none";
    };

    function disableAllAnimals() {
        const animals = document.querySelectorAll(".animal-sprite");
        animals.forEach(animal => {
            animal.style.pointerEvents = "none";
        });
    }
});