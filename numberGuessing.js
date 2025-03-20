export function loadNumberGuessingGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Number Guessing Game</h2>
        <p>Guess a number between 1 and 100</p>
        <input type="number" id="guess-input" min="1" max="100">
        <button id="guess-button">Guess</button>
        <div class="result">
            <p id="guess-result-text"></p>
        </div>
        <button id="restart-button">Restart Game</button>
        <audio id="click-sound" src="src/sounds/click.mp3"></audio>
        <audio id="win-sound" src="src/sounds/win.mp3"></audio>
        <audio id="lose-sound" src="src/sounds/lose.mp3"></audio>
        <audio id="retry-sound" src="src/sounds/retry.mp3"></audio>
    `;

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const resultText = document.getElementById('guess-result-text');
    const guessButton = document.getElementById('guess-button');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const retrySound = document.getElementById('retry-sound');
    const restartButton = document.getElementById('restart-button');

    guessButton.addEventListener('click', () => {
        clickSound.play();
        const userGuess = parseInt(document.getElementById('guess-input').value);
        if (userGuess === randomNumber) {
            resultText.textContent = "Congratulations! You guessed the correct number!";
            winSound.play();
        } else {
            resultText.textContent = userGuess < randomNumber ? "Too low! Try again." : "Too high! Try again.";
            retrySound.play();
        }
    });

    restartButton.addEventListener('click', loadNumberGuessingGame);
}
