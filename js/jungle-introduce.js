document.addEventListener("DOMContentLoaded", () => {
    // Menyimpan rekam jejak apakah kata sudah diputar
    const vocabProgress = {
        Tiger: false,
        Flower: false,
        Monkey: false,
        Tree: false
    };

    const nextBtn = document.getElementById("nextBtn");

    window.playVocab = function(word) {
        // Memutar audio
        const audio = document.getElementById("audio" + word);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Gagal memutar audio:", e));
        }

        // Tandai kata sudah dipelajari
        vocabProgress[word] = true;

        // Cek apakah semua kata sudah diputar
        checkAllLearned();
    };

    function checkAllLearned() {
        const isComplete = Object.values(vocabProgress).every(status => status === true);
        if (isComplete) {
            // Tampilkan tombol NEXT jika semua sudah diputar
            nextBtn.style.display = "block";
        }
    }
});