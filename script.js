// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
startFloatingHearts();
// Click Envelope

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    },50);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 50;
    const max = 250;

    const btnRect = noBtn.getBoundingClientRect();

    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.15s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});


yesBtn.addEventListener("click", () => {
    title.textContent = "Phas gayi😏";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";

    fireConfetti();
});

/* floating heart function */
function startFloatingHearts() {
    //setInterval(() => {
    const spawnHeart = () => {
        const heart = document.createElement("div");
        heart.classList.add("floating-heart");

        // 1. Random Colors
        const heartVariations = ["💙", "🩵", "🩷"];
        const randomHeart = heartVariations[Math.floor(Math.random() * heartVariations.length)];
        heart.innerHTML = randomHeart;

        // 2. Random Position
        heart.style.left = Math.random() * 100 + "vw";
        
        // 3. Random Size (Small to Large)
        // Generates a size between 15px and 45px
        const size = Math.random() * 40 + 30; 
        heart.style.fontSize = size + "px";
        
        // 4. Random Duration (Slow!)
        // Generates a speed between 8s (fastest) and 15s (slowest)
        const duration = Math.random() * 7 + 8; 
        heart.style.animationDuration = duration + "s"; 
        
        document.getElementById("hearts-container").appendChild(heart);

        // Remove heart after animation finishes
        // We add 1 extra second to be safe so it doesn't pop out early
        setTimeout(() => {
            heart.remove();
        }, duration * 1000); 
    }; // Created slightly less frequently (400ms) to avoid clutter since they last longer
    
    spawnHeart();

    // 3. Start the interval for subsequent hearts
    setInterval(spawnHeart, 400); 
}


/* Confetti Function */
function fireConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 999 };

    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}