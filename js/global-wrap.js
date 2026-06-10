document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 0. MANTRA SAPU JAGAT (Bersih-bersih tombol lama)
    // ==========================================
    const sapuJagat = document.querySelectorAll('[class*="home"], [id*="home"], [class*="fullscreen"], [id*="fullscreen"], img[src*="home"], img[src*="fullscreen"]');
    
    sapuJagat.forEach(el => {
        if (!el.className.includes('home-btn-global') && !el.className.includes('fullscreen-btn-global')) {
            if (el.tagName === 'BUTTON' || el.tagName === 'IMG' || el.tagName === 'A' || el.tagName === 'DIV') {
                el.remove();
                console.log("Sapu jagat berhasil membersihkan tombol lama!");
            }
        }
    });
    
    // Cari wadah utama permainan
    const gameContainer = document.querySelector('.screen') || document.querySelector('.library-container') || document.body;

    // ==========================================
    // 1. TRANSISI HALAMAN (Fade In)
    // ==========================================
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    document.body.appendChild(overlay); 

    setTimeout(() => {
        overlay.style.opacity = "0";
    }, 100);

    // ==========================================
    // 2. TOMBOL HOME GLOBAL
    // ==========================================
    // Ubah URL ke huruf kecil agar kebal dari salah baca
    const isLibraryPage = window.location.pathname.toLowerCase().includes("library");

    if (!isLibraryPage) {
        const homeBtn = document.createElement("button");
        homeBtn.className = "home-btn-global";
        homeBtn.innerHTML = "🏠"; // Menggunakan ikon rumah
        homeBtn.title = "Back to Library";
        
        gameContainer.appendChild(homeBtn); 

        homeBtn.addEventListener("click", () => {
            overlay.style.opacity = "1";
            setTimeout(() => {
                window.location.href = "./library.html";
            }, 800); 
        });
    }

   // ==========================================
    // 3. JEJAK PROGRES DI LIBRARY (VERSI OVERLAY CEKLIS)
    // ==========================================
    if (isLibraryPage) {
        
        // --- Pengecekan Ocean ---
        const oceanScore = parseInt(localStorage.getItem("oceanScore")) || 0;
        if (oceanScore > 0) {
            const oceanCheck = document.getElementById("oceanCheck");
            const oceanBook = document.getElementById("oceanBook");
            
            if (oceanCheck) oceanCheck.style.display = "block"; 
            if (oceanBook) oceanBook.style.filter = "none";
        }

        // --- Pengecekan Space ---
        const spaceScore = parseInt(localStorage.getItem("spaceScore")) || 0;
        if (spaceScore > 0) {
            const spaceCheck = document.getElementById("spaceCheck");
            const spaceBook = document.getElementById("spaceBook");
            
            if (spaceCheck) spaceCheck.style.display = "block"; 
            if (spaceBook) spaceBook.style.filter = "none";
        }

        // --- Pengecekan Jungle ---
        const jungleScore = parseInt(localStorage.getItem("jungleScore")) || 0;
        if (jungleScore > 0) {
            const jungleCheck = document.getElementById("jungleCheck");
            const jungleBook = document.getElementById("jungleBook");
            
            if (jungleCheck) jungleCheck.style.display = "block"; 
            if (jungleBook) jungleBook.style.filter = "none";
        }

        // --- PEMICU POP-UP ENDING (Jika ketiga skor sudah terisi) ---
        if (oceanScore > 0 && spaceScore > 0 && jungleScore > 0) {
            const endingModal = document.getElementById("endingModal");
            const trumpetSound = document.getElementById("trumpetSound"); // Panggil audionya
            
            // Beri jeda 1 detik setelah masuk Library agar dramatis
            if (endingModal) {
                setTimeout(() => {
                    endingModal.style.display = "flex";
                    
                    // Putar suara terompetnya tepat saat pop-up muncul!
                    if (trumpetSound) {
                        trumpetSound.currentTime = 0;
                        trumpetSound.play().catch(e => console.log("Gagal memutar audio: ", e));
                    }
                }, 1000); 
            }
        }

        // --- FUNGSI TOMBOL PLAY AGAIN GLOBAL ---
        const btnPlayAgain = document.getElementById("btnPlayAgainGlobal");
        if (btnPlayAgain) {
            btnPlayAgain.addEventListener("click", () => {
                // Menghapus semua ingatan skor agar aplikasi kembali seperti baru
                localStorage.clear();
                // Me-refresh halaman
                window.location.reload();
            });
        }

        // --- FUNGSI TOMBOL CLOSE (X) POP-UP ENDING ---
        const btnCloseEnding = document.getElementById("btnCloseEnding");
        if (btnCloseEnding) {
            btnCloseEnding.addEventListener("click", () => {
                const endingModal = document.getElementById("endingModal");
                if (endingModal) {
                    endingModal.style.display = "none"; // Menyembunyikan pop-up ending saja
                }
            });
        }
    }

    // ==========================================
    // 4. FITUR FULLSCREEN
    // ==========================================
    const fsBtn = document.createElement("button");
    fsBtn.className = "fullscreen-btn-global";
    fsBtn.innerHTML = "🔲"; 
    fsBtn.title = "Toggle Fullscreen";
    
    gameContainer.appendChild(fsBtn); 

    fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Gagal fullscreen: ${err.message}`);
            });
            fsBtn.innerHTML = "❌"; 
        } else {
            document.exitFullscreen();
            fsBtn.innerHTML = "🔲"; 
        }
    });
});