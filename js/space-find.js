document.addEventListener("DOMContentLoaded", () => {
    let currentScore = parseInt(localStorage.getItem("spaceScore")) || 0;
    const scoreVal = document.getElementById("scoreVal");
    if (scoreVal) scoreVal.innerText = currentScore;

    const audioCorrect = document.getElementById("audioCorrect");
    const audioWrong = document.getElementById("audioWrong");
    const audioWin = document.getElementById("audioWin");
    
    const feedbackBox = document.getElementById("feedbackBox");
    const overlay = document.getElementById("overlay");
    const tryAgainBtn = document.getElementById("tryAgainBtn");
    const nextBtn = document.getElementById("nextBtn");

    const targetObject = "moon"; 

    window.checkFind = function(clickedObject, element) {
        if (clickedObject === targetObject) {
            if (audioCorrect) {
                audioCorrect.currentTime = 0;
                audioCorrect.play().catch(e => console.log(e));
            }
            currentScore += 20; 
            localStorage.setItem("spaceScore", currentScore); 
            if (scoreVal) scoreVal.innerText = currentScore; 

            element.classList.add("correct-glow");
            disableAllSprites();

            setTimeout(() => { showFeedback(true); }, 800);
        } else {
            if (audioWrong) {
                audioWrong.currentTime = 0;
                audioWrong.play().catch(e => console.log(e));
            }
            element.classList.add("wrong-shake");
            setTimeout(() => {
                element.classList.remove("wrong-shake");
                showFeedback(false);
            }, 500);
        }
    };

    function disableAllSprites() {
        const sprites = document.querySelectorAll(".space-sprite");
        sprites.forEach(sprite => { sprite.style.pointerEvents = "none"; });
    }

    window.showFeedback = function(isSuccess) {
        feedbackBox.style.display = "block";
        overlay.style.display = "block";
        if (isSuccess) {
            feedbackBox.style.backgroundImage = "url('../assets/buttons/space_excellent.png')";
            tryAgainBtn.style.display = "none";
            nextBtn.style.display = "block";
            if(audioWin) { audioWin.currentTime = 0; audioWin.play().catch(e=>console.log(e)); }
        } else {
            feedbackBox.style.backgroundImage = "url('../assets/buttons/space_tryagain.png')";
            tryAgainBtn.style.display = "block";
            nextBtn.style.display = "none";
        }
    };

    window.closeFeedback = function() {
        feedbackBox.style.display = "none";
        overlay.style.display = "none";
    };
});