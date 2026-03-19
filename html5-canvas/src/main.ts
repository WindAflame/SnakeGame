import { Game } from './Game';

const game = new Game('gameCanvas', 20);
game.init().catch(console.error);
