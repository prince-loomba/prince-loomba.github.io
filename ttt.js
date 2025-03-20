export function loadTTTGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Tic-Tac-Toe</h2>
        <div class="tic-tac-toe">
            <div class="row">
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
            </div>
            <div class="row">
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
            </div>
            <div class="row">
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
                <div class="cell" data-cell></div>
            </div>
        </div>
        <div class="result">
            <p id="ttt-result-text"></p>
        </div>
        <button id="restart-button">Restart Game</button>
        <audio id="click-sound" src="src/sounds/click.mp3"></audio>
        <audio id="win-sound" src="src/sounds/win.mp3"></audio>
        <audio id="lose-sound" src="src/sounds/lose.mp3"></audio>
        <audio id="retry-sound" src="src/sounds/retry.mp3"></audio>
    `;

    const cells = document.querySelectorAll('[data-cell]');
    const resultText = document.getElementById('ttt-result-text');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const retrySound = document.getElementById('retry-sound');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    restartButton.addEventListener('click', loadTTTGame);

    function handleClick(e) {
        const cell = e.target;
        clickSound.play();
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            resultText.textContent = `${currentPlayer} wins!`;
            winSound.play();
            endGame();
        } else if (isDraw()) {
            resultText.textContent = "It's a draw!";
            retrySound.play();
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.textContent === 'X' || cell.textContent === 'O';
        });
    }

    function endGame() {
        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }
}
