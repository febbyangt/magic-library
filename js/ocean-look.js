// Deklarasikan variabel
let box, overlay, nextBtn, tryAgainBtn, correctSound, wrongSound, scoreText;
localStorage.setItem("oceanScore", 0);
// Ambil skor Ocean dari memori browser (Pisahkan dari jungleScore)
let currentScore = parseInt(localStorage.getItem("oceanScore")) || 0;

document.addEventListener("DOMContentLoaded", () => {
    box = document.getElementById("feedbackBox");
    overlay = document.getElementById("overlay");
    nextBtn = document.getElementById("nextBtn");
    tryAgainBtn = document.getElementById("tryAgainBtn");
    correctSound = document.getElementById("audioCorrect");
    wrongSound = document.getElementById("audioWrong");
    
    // Tampilkan skor awal saat layar dimuat
    scoreText = document.getElementById("score-text");
    if (scoreText) scoreText.innerText = currentScore;
});

window.showFeedback = function(isCorrect) {
    console.log("Tombol diklik! Jawaban Benar:", isCorrect);
    
    // MUNCULKAN KOTAK TERLEBIH DAHULU
    box.style.display = "block";
    overlay.style.display = "block";
    
    if (isCorrect) {
        box.style.backgroundImage = "url('../assets/buttons/ocean_success.png')";
        nextBtn.style.display = "block";
        tryAgainBtn.style.display = "none";
        
        // === TAMBAH SKOR (Langsung 20 Poin) ===
        currentScore += 20; 
        localStorage.setItem("oceanScore", currentScore); 
        if (scoreText) scoreText.innerText = currentScore; 
        // ======================================
        
        // Putar suara benar
        if (correctSound) {
            correctSound.currentTime = 0;
            correctSound.play().catch(e => console.log("Audio tertahan browser:", e));
        }

        // Matikan semua hotspot agar skor tidak bisa di-spam
        const hotspots = document.querySelectorAll(".hotspot");
        hotspots.forEach(btn => btn.style.pointerEvents = "none");

    } else {
        box.style.backgroundImage = "url('../assets/buttons/ocean_feedback.png')";
        nextBtn.style.display = "none";
        tryAgainBtn.style.display = "block";
        
        // Putar suara salah
        if (wrongSound) {
            wrongSound.currentTime = 0;
            wrongSound.play().catch(e => console.log("Audio tertahan browser:", e));
        }
    }
};

window.handleAction = function() {
    console.log("Menutup popup...");
    box.style.display = "none";
    overlay.style.display = "none";
    
    // Matikan suara jika ditutup cepat
    if (wrongSound) {
        wrongSound.pause();
    }
};