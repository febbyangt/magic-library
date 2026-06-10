const slides = [
    "../assets/story/story 1.png",
    "../assets/story/story 2.png",
    "../assets/story/story 3.png",
    "../assets/story/story 4.png",
    "../assets/story/story 5.png",
    "../assets/story/story 6.png",
    "../assets/story/story 7.png",
    "../assets/story/story 8.png",
    "../assets/story/story 9.png",
    "../assets/story/story 10.png",
    "../assets/story/story 11.png",
    "../assets/story/story 12.png",
    "../assets/story/story 13.png"
];

let currentSlide = 0;
const slide = document.getElementById("storySlide");
const nextHotspot = document.getElementById("nextHotspot");
const backHotspot = document.getElementById("backHotspot");

// Fungsi untuk mengecek apakah tombol Back perlu ditampilkan
function updateButtons() {
    // Tombol Back muncul jika slide > 0
    backHotspot.style.display = (currentSlide > 0) ? "block" : "none";
}

// Event untuk tombol Next
nextHotspot.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        slide.src = slides[currentSlide];
        updateButtons();
    } else {
        window.location.href = "./library.html";
    }
});

// Event untuk tombol Back
backHotspot.addEventListener("click", () => {
    if (currentSlide > 0) {
        currentSlide--;
        slide.src = slides[currentSlide];
        updateButtons();
    }
});