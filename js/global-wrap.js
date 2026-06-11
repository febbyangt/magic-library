document.addEventListener("DOMContentLoaded", function initGame() {
    
    // 0. MANTRA SAPU JAGAT
    const sapuJagat = document.querySelectorAll('[class*="home"], [id*="home"], [class*="fullscreen"], [id*="fullscreen"], img[src*="home"], img[src*="fullscreen"]');
    // ... sisa kode Anda tetap sama ...
    sapuJagat.forEach(el => {
        if (!el.className.includes('home-btn-global') && !el.className.includes('fullscreen-btn-global')) {
            if (['BUTTON', 'IMG', 'A', 'DIV'].includes(el.tagName)) {
                el.remove();
            }
        }
    });

    const gameContainer = document.querySelector('.screen') || document.querySelector('.library-container') || document.body;

    // 1. TRANSISI
    const overlay = document.createElement("div");
    overlay.className = "page-transition-overlay";
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = "0"; }, 100);

    // 2. TOMBOL HOME
    document.addEventListener("DOMContentLoaded", () => {
    const currentFile = window.location.pathname.split("/").pop().toLowerCase();

    const isMainPage =
        currentFile === "" ||
        currentFile === "index.html" ||
        currentFile === "library.html";

    if (!isMainPage) {
        const homeBtn = document.createElement("a");
        homeBtn.href = "../index.html";
        homeBtn.className = "home-btn-global";
        homeBtn.innerHTML = "🏠";
        homeBtn.title = "Back to Home";
        document.body.appendChild(homeBtn);
    }

    document.querySelectorAll(".fullscreen-btn-global").forEach(btn => btn.remove());
});

    // 3. LOGIKA LIBRARY
    if (isLibraryPage) {
        ['ocean', 'space', 'jungle'].forEach(game => {
            const score = parseInt(localStorage.getItem(game + "Score")) || 0;
            if (score > 0) {
                const check = document.getElementById(game + "Check");
                const book = document.getElementById(game + "Book");
                if (check) check.style.display = "block";
                if (book) book.style.filter = "none";
            }
        });

        // Ending Modal
        if (parseInt(localStorage.getItem("oceanScore")) > 0 && 
            parseInt(localStorage.getItem("spaceScore")) > 0 && 
            parseInt(localStorage.getItem("jungleScore")) > 0) {
            const endingModal = document.getElementById("endingModal");
            const trumpet = document.getElementById("trumpetSound");
            if (endingModal) {
                setTimeout(() => {
                    endingModal.style.display = "flex";
                    if (trumpet) { trumpet.currentTime = 0; trumpet.play().catch(() => {}); }
                }, 1000);
            }
        }

        const btnPlayAgain = document.getElementById("btnPlayAgainGlobal");
        if (btnPlayAgain) {
            btnPlayAgain.addEventListener("click", () => { localStorage.clear(); window.location.reload(); });
        }
    }

    // 4. FULLSCREEN
    const fsBtn = document.createElement("button");
    fsBtn.className = "fullscreen-btn-global";
    fsBtn.innerHTML = "🔲";
    document.body.appendChild(fsBtn);
    fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fsBtn.innerHTML = "❌";
        } else {
            document.exitFullscreen();
            fsBtn.innerHTML = "🔲";
        }
    });
}); // <--- INI ADALAH PENUTUP SATU-SATUNYA
