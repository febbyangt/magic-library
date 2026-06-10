document.addEventListener("DOMContentLoaded", () => {
    // Cari wadah utama permainan
    const gameContainer = document.querySelector('.screen') || document.querySelector('.library-container') || document.body;

    // 1. Ciptakan elemen audio
    const audio = document.createElement("audio");
    audio.id = "globalBGM";
    audio.src = "../assets/audio/bgm.mp3"; 
    audio.loop = true; 
    audio.volume = 0.4; 
    audio.style.display = "none"; // Wajib agar tidak merusak layout
    
    gameContainer.appendChild(audio); // Masukkan ke wadah game

    // 2. Ciptakan tombol Mute/Unmute
    const btn = document.createElement("button");
    btn.id = "bgmBtn";
    btn.className = "bgm-btn";
    
    gameContainer.appendChild(btn); // Masukkan ke wadah game

    // 3. Cek memori browser
    let isMuted = localStorage.getItem("bgmMuted") === "true";
    let savedTime = parseFloat(localStorage.getItem("bgmTime")) || 0; 

    audio.currentTime = savedTime;

    const updateBGM = () => {
        if (isMuted) {
            audio.pause();
            btn.innerText = "🔇";
        } else {
            audio.play().catch(e => console.log("Menunggu interaksi..."));
            btn.innerText = "🔊";
        }
    };

    updateBGM();

    btn.addEventListener("click", () => {
        isMuted = !isMuted;
        localStorage.setItem("bgmMuted", isMuted);
        updateBGM();
    });

    document.body.addEventListener("click", () => {
        if (!isMuted && audio.paused) {
            audio.play().catch(e => console.log(e));
        }
    }, { once: true }); 

    window.addEventListener("beforeunload", () => {
        localStorage.setItem("bgmTime", audio.currentTime);
    });
});