let currentAudio = null;

function playAudio(fileName) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    currentAudio = new Audio(`../assets/audio/${fileName}.mp3`);
    currentAudio.play();
}

document.getElementById('jellyfishSpeaker').addEventListener('click', () => playAudio('jellyfish'));
document.getElementById('sharkSpeaker').addEventListener('click', () => playAudio('shark'));
document.getElementById('coralSpeaker').addEventListener('click', () => playAudio('coral'));
document.getElementById('boatSpeaker').addEventListener('click', () => playAudio('boat'));

document.getElementById('nextBtn').addEventListener('click', () => {
    window.location.href = "ocean-look.html"; 
});