document.addEventListener("DOMContentLoaded", () => {
    // === 1. MENGAMBIL SKOR DARI MEMORI (Atau mulai dari 0) ===
    let currentScore = parseInt(localStorage.getItem("oceanScore")) || 0;
    const scoreVal = document.getElementById("scoreVal"); // Pastikan mencari 'scoreVal'
    if (scoreVal) {
        scoreVal.innerText = currentScore;
    }
    // =========================================================

    const correctSound = document.getElementById("audioCorrect");
    const wrongSound = document.getElementById("audioWrong");
    const winSound = document.getElementById("audioWin");
    const box = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    let matchedCount = 0;

    const words = document.querySelectorAll(".word-box");
    const dropZones = document.querySelectorAll(".drop-zone");

    // === 2. EVENT SAAT KATA MULAI DITARIK ===
    words.forEach(word => {
        word.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => e.target.classList.add("dragging"), 0);
        });
        
        word.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        });
    });

    // === 3. MENGATUR AREA TARGET GAMBAR ===
    dropZones.forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); 
        });

        zone.addEventListener("dragenter", (e) => {
            e.preventDefault();
            zone.classList.add("glow");
        });

        zone.addEventListener("dragleave", () => {
            zone.classList.remove("glow");
        });

        // === 4. LOGIKA SAAT KATA DILEPASKAN (DROP) ===
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("glow"); 
            
            const draggedId = e.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(draggedId);
            
            if (!draggedElement) return;

            const expectedMatch = zone.getAttribute("data-match");
            const draggedMatch = draggedElement.getAttribute("data-match");

            if (expectedMatch === draggedMatch) {
                // --- JIKA JAWABAN BENAR ---
                if(correctSound) { 
                    correctSound.currentTime = 0; 
                    correctSound.play().catch(e=>console.log(e)); 
                }
                
                // === PENAMBAHAN SKOR BERADA DI SINI ===
                currentScore += 5; // Tambah 5 poin
                localStorage.setItem("oceanScore", currentScore); // Simpan ke memori
                if (scoreVal) {
                    scoreVal.innerText = currentScore; // Update angka di layar
                }
                // ======================================

                matchedCount++;

                zone.appendChild(draggedElement);
                draggedElement.removeAttribute("style"); 
                draggedElement.classList.add("dropped"); 
                draggedElement.draggable = false; 

                if (matchedCount === 4) {
                    setTimeout(() => showFeedback(true), 800);
                }
            } else {
                // --- JIKA JAWABAN SALAH ---
                if(wrongSound) { 
                    wrongSound.currentTime = 0; 
                    wrongSound.play().catch(e=>console.log(e)); 
                }
                
                draggedElement.classList.add("shake-animation");
                setTimeout(() => {
                    draggedElement.classList.remove("shake-animation");
                }, 500);
                
                showFeedback(false);
            }
        });
    });

    // === 5. FUNGSI MEMUNCULKAN POP-UP ===
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

    // === 6. FUNGSI MENUTUP POP-UP ===
    window.closeFeedback = function() {
        box.style.display = "none";
        overlay.style.display = "none";
        if(wrongSound) wrongSound.pause();
    };
});