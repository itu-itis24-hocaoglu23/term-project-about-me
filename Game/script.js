const word = "BLINK"; 
let score = 0;
let lives = 3;
let gameOver = false;
let guessedLetters = [];

const guessInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-button");
const resetButton = document.getElementById("reset-button");
const scoreDisplay = document.getElementById("score");

const livesDisplay = document.getElementById("lives");

function updateDisplay() {
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
}

function showImage(letter) {
    const img = document.getElementById(`img-${letter}`);
    if (img) img.style.visibility = "visible"; 
}

function showAllImages() {
    word.split("").forEach(showImage); 
}

function checkWinCondition() {
    const allVisible = Array.from(word).every(letter => {
        const img = document.getElementById(`img-${letter}`);
        return img && img.style.visibility === "visible";
    });

    if (allVisible) {
        gameOver = true;
        document.getElementById("finalText").textContent = "Congratulations! You won the game!"
        document.getElementById("finalText").style.visibility = "visible";
    }
}

function checkGuess(guess) {
    if (gameOver) {
        alert("Game over. Press the 'Reset Game' button to restart.");
        document.getElementById("finalText").style.visibility = "visible";
        return;
    }

    if (!guess) {
        alert("Please enter a letter or word!");
        return;
    }

    if (guess.length === 1) {
        if (guessedLetters.includes(guess)) {
            alert(`The letter '${guess}' has already been guessed.`);
            return;
        }

        guessedLetters.push(guess);
        let correctGuess = false;
        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                correctGuess = true;
                showImage(guess); 
            }
        }

        if (correctGuess) {
            score += 20;
        } else {
            lives--;
        }
    } else if (guess.length === word.length) {
        if (guess === word) {
            score = 100; 
            showAllImages(); 
            gameOver = true;
        } else {
            lives = 0;
            document.getElementById("finalText").textContent = "You entered the wrong word! You lost the game."
            document.getElementById("finalText").style.visibility = "visible";
            gameOver = true;
        }
    } else {
        alert("The entry is incorrect! Enter 1 character for a letter guess or a full length entry for a word guess.");
        document.getElementById("finalText").style.visibility = "visible";
        return;
    }

    updateDisplay();
    if (lives <= 0 && !gameOver) {
        document.getElementById("finalText").textContent = "Your lives are over! You lost the game."
        document.getElementById("finalText").style.visibility = "visible";
        gameOver = true;
    }
    checkWinCondition();
}

submitButton.addEventListener("click", () => {
    const guess = guessInput.value.toUpperCase().trim();
    guessInput.value = ""; 
    checkGuess(guess);
});

resetButton.addEventListener("click", () => {
    document.getElementById("finalText").style.visibility = "hidden";
    score = 0;
    lives = 3;
    gameOver = false;
    guessedLetters = []; 
    const images = document.querySelectorAll("#images-container img");
    images.forEach(img => (img.style.visibility = "hidden"));
    updateDisplay();
});


updateDisplay();




