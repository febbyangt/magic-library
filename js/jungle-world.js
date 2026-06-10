document.addEventListener("DOMContentLoaded", () => {
    const vocabProgress = {
        Tiger: false,
        Tree: false,
        Flower: false,
        Monkey: false
    };

    const startBtn = document.getElementById("btnStart");

    window.playVocab = function(word) {
        const audio = document.getElementById("audio" + word);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Gagal memutar audio:", e));
        }

        vocabProgress[word] = true;
        checkAllLearned();
    };

    function checkAllLearned() {
        const isComplete = Object.values(vocabProgress).every(status => status === true);
        if (isComplete) {
            startBtn.style.display = "block";
            
            // Kedipan kecil memberi tahu anak-anak bahwa tombol Start sudah aktif
            startBtn.style.background = "rgba(255, 255, 255, 0.3)";
            setTimeout(() => {
                startBtn.style.background = "transparent"; 
            }, 500);
        }
    }

    window.goToNext = function() {
        window.location.href = './jungle-introduce.html';
    };
});