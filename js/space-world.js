document.addEventListener("DOMContentLoaded", () => {
    // Menambahkan event listener ke tombol start
    const startBtn = document.querySelector(".start-btn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            console.log("Mission Started!");
            // Kamu bisa menambahkan audio klik di sini
            // const clickSound = new Audio('../assets/audio/click.mp3');
            // clickSound.play();
        });
    }
});