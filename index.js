import { loadRPSGame } from './rps.js';
import { loadTTTGame } from './ttt.js';
import { loadNumberGuessingGame } from './numberGuessing.js';

document.getElementById('rps-game').addEventListener('click', loadRPSGame);
document.getElementById('ttt-game').addEventListener('click', loadTTTGame);
document.getElementById('number-guessing-game').addEventListener('click', loadNumberGuessingGame);
