import { Game } from './Game';

const gameContainer = document.getElementById('gameContainer')!;
const game = new Game(20, 600);
game.init(gameContainer);
