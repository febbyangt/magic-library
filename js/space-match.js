document.addEventListener("DOMContentLoaded", () => {
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

    let matchedCount = 0;

    const words = document.querySelectorAll(".word-box");
    const dropZones = document.querySelectorAll(".drop-zone");

    // === EVENT SAAT KATA DITARIK ===
    words.forEach(word => {
        word.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            // Hentikan animasi mengambang saat ditarik
            setTimeout(() => e.target.classList.add("dragging"), 0); 
        });
        
        word.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        });
    });

    // === EVENT AREA TARGET ===
    dropZones.forEach(zone => {
        zone.addEventListener("dragover", (e) => { e.preventDefault(); });
        zone.addEventListener("dragenter", (e) => {
            e.preventDefault();
            zone.classList.add("glow");
        });
        zone.addEventListener("dragleave", () => {
            zone.classList.remove("glow");
        });

        // === LOGIKA SAAT KATA DILEPASKAN ===
        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            zone.classList.remove("glow"); 
            
            const draggedId = e.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(draggedId);
            
            if (!draggedElement) return;

            const expectedMatch = zone.getAttribute("data-match");
            const draggedMatch = draggedElement.getAttribute("data-match");

            if (expectedMatch === draggedMatch) {
                // --- JAWABAN BENAR ---
                if(correctSound) { 
                    correctSound.currentTime = 0; 
                    correctSound.play().catch(e=>console.log(e)); 
                }
                
                currentScore += 5; 
                localStorage.setItem("spaceScore", currentScore); 
                if (scoreVal) scoreVal.innerText = currentScore; 

                matchedCount++;

                zone.appendChild(draggedElement);
                draggedElement.classList.remove("word-box"); // Hapus class lama agar tidak mengambang lagi
                draggedElement.classList.add("dropped"); // Tambahkan gaya baru (memantul)
                draggedElement.draggable = false; 

                if (matchedCount === 4) {
                    setTimeout(() => showFeedback(true), 800);
                }
            } else {
                // --- JAWABAN SALAH (MEMUNCULKAN TRY AGAIN) ---
                if(wrongSound) { 
                    wrongSound.currentTime = 0; 
                    wrongSound.play().catch(e=>console.log(e)); 
                }
                
                draggedElement.classList.add("shake-animation");
                
                // Setelah animasi getar selesai, munculkan pop-up Try Again
                setTimeout(() => {
                    draggedElement.classList.remove("shake-animation");
                    showFeedback(false); 
                }, 500);
            }
        });
    });

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
            // Tampilan untuk Try Again
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