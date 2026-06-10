document.addEventListener("DOMContentLoaded", () => {
    // === SETUP PAPAN SKOR ===
    let currentScore = parseInt(localStorage.getItem("jungleScore")) || 0;
    const scoreText = document.getElementById("score-text");
    if (scoreText) scoreText.innerText = currentScore;
    // ========================

    const draggables = document.querySelectorAll(".drag-item");
    const dropZones = document.querySelectorAll(".drop-zone");
    
    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    const wrongModal = document.getElementById("wrongModal");
    const correctModal = document.getElementById("correctModal");

    let itemsMatched = 0; // Mengganti nama variabel score menjadi itemsMatched agar tidak tertukar
    const maxItems = 4; // Target jawaban benar

    // 1. Mengatur kotak saat mulai ditarik
    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => {
                e.target.style.opacity = "0.5";
            }, 0);
        });

        draggable.addEventListener("dragend", (e) => {
            e.target.style.opacity = "1";
        });
    });

    // 2. Mengatur area tempat menjatuhkan (drop)
    dropZones.forEach(zone => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); 
        });

        zone.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData("text/plain");
            const draggedElement = document.getElementById(draggedId);
            
            const matchTarget = zone.getAttribute("data-match");
            const elementTarget = draggedElement.getAttribute("data-match");

            if (matchTarget === elementTarget) {
                // --- JAWABAN BENAR ---
                if (audioCorrect) {
                    audioCorrect.currentTime = 0;
                    audioCorrect.play().catch(e => console.log("Audio play error", e));
                }
                
                // === TAMBAH SKOR (5 Poin per kata) ===
                currentScore += 5; 
                localStorage.setItem("jungleScore", currentScore); 
                if (scoreText) scoreText.innerText = currentScore; 
                // =====================================

                // Menempelkan kotak kata ke gambar
                zone.appendChild(draggedElement);
                draggedElement.classList.add("dropped-correct");
                draggedElement.setAttribute("draggable", "false"); // Matikan fungsi tarik
                
                itemsMatched++;

                // Jika keempat kata sudah berhasil dipasang
                if (itemsMatched === maxItems) {
                    // PERBAIKAN: Jeda diubah dari 800 menjadi 200 agar secepat kilat
                    setTimeout(() => {
                        correctModal.style.display = "flex";
                    }, 200);
                }
            } else {
                // --- JAWABAN SALAH ---
                if (audioWrong) {
                    audioWrong.currentTime = 0;
                    audioWrong.play().catch(e => console.log("Audio play error", e));
                }
                
                // Munculkan pop-up OOPS!
                wrongModal.style.display = "flex";
            }
        });
    });

    // 3. Fungsi menutup pop-up salah
    window.closeModal = function() {
        wrongModal.style.display = "none";
    };
});