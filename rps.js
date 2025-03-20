export function loadRPSGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Rock, Paper, Scissors</h2>
        <div class="choices">
            <button class="choice" id="rock"><img src="src/images/rock.png" alt="Rock"></button>
            <button class="choice" id="paper"><img src="src/images/paper.png" alt="Paper"></button>
            <button class="choice" id="scissors"><img src="src/images/scissors.png" alt="Scissors"></button>
        </div>
        <div class="result">
            <p id="result-text"></p>
        </div>
        <button id="restart-button">Restart Game</button>
        <audio id="click-sound" src="src/sounds/click.mp3"></audio>
        <audio id="win-sound" src="src/sounds/win.mp3"></audio>
        <audio id="lose-sound" src="src/sounds/lose.mp3"></audio>
        <audio id="retry-sound" src="src/sounds/retry.mp3"></audio>
    `;

    const choices = ['rock', 'paper', 'scissors'];
    const resultText = document.getElementById('result-text');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const retrySound = document.getElementById('retry-sound');
    const restartButton = document.getElementById('restart-button');

    document.querySelectorAll('.choice').forEach(button => {
        button.addEventListener('click', () => {
            clickSound.play();
            const playerChoice = button.id;
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const result = getResult(playerChoice, computerChoice);
            resultText.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
            if (result === "You win!") {
                winSound.play();
            } else if (result === "You lose!") {
                loseSound.play();
            } else {
                retrySound.play();
            }
        });
    });

    restartButton.addEventListener('click', loadRPSGame);

    function getResult(player, computer) {
        if (player === computer) {
            return "It's a tie!";
        }
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return "You win!";
        }
        return "You lose!";
    }
}
