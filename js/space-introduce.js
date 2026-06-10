document.addEventListener("DOMContentLoaded", () => {
    
    // Fungsi untuk memutar suara berdasarkan kata yang diklik
    window.playSound = function(word) {
        // Mencari elemen audio yang sesuai (contoh: audio-star, audio-moon)
        const audio = document.getElementById(`audio-${word}`);
        
        if (audio) {
            // Mengulang waktu audio ke 0 agar bisa ditekan berkali-kali tanpa harus menunggu selesai
            audio.currentTime = 0;
            
            // Memutar suara
            audio.play().catch(error => {
                console.log("Audio tidak bisa diputar (mungkin tertahan oleh browser):", error);
            });
        }
    };

});