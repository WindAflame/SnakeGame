import * as PIXI from 'pixi.js';
import { Snake } from './Snake';
import { Food } from './Food';
import { Controls } from './Controls';
import { Score } from './Score';

export class Game {
  private app: PIXI.Application;
  private snake!: Snake;
  private food!: Food;
  private controls!: Controls;
  private score!: Score;
  private gridSize: number;
  private tileSize: number;
  private gameOver: boolean;
  private lastUpdateTime: number;
  private updateInterval: number;
  private backgroundContainer: PIXI.Container;
  private textures: Map<string, PIXI.Texture> = new Map();
  private gameOverText?: PIXI.Container;

  constructor(gridSize: number = 20, canvasWidth: number = 600) {
    this.gridSize = gridSize;
    this.tileSize = canvasWidth / gridSize;
    this.gameOver = false;
    this.lastUpdateTime = 0;
    this.updateInterval = 150;
    this.backgroundContainer = new PIXI.Container();

    this.app = new PIXI.Application();
  }

  async init(container: HTMLElement): Promise<void> {
    await this.app.init({
      width: this.gridSize * this.tileSize,
      height: this.gridSize * this.tileSize,
      backgroundColor: 0x1a1a1a,
    });

    container.insertBefore(this.app.canvas, container.firstChild);

    await this.loadTextures();
    this.createBackground();
    this.score = new Score('score');
    this.setupControls();
    this.initializeGame();
    this.app.ticker.add(() => this.gameLoop());
  }

  private async loadTextures(): Promise<void> {
    const textureNames = [
      { name: 'head', path: '/sprites/head.png' },
      { name: 'body', path: '/sprites/body.png' },
      { name: 'snack', path: '/sprites/snack.png' },
      { name: 'empty', path: '/sprites/empy.png' },
    ];

    for (const { name, path } of textureNames) {
      const texture = await PIXI.Assets.load(path);
      this.textures.set(name, texture);
    }
  }

  private createBackground(): void {
    const emptyTexture = this.textures.get('empty')!;

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const sprite = new PIXI.Sprite(emptyTexture);
        sprite.width = this.tileSize;
        sprite.height = this.tileSize;
        sprite.x = x * this.tileSize;
        sprite.y = y * this.tileSize;
        this.backgroundContainer.addChild(sprite);
      }
    }

    this.app.stage.addChild(this.backgroundContainer);
  }

  private initializeGame(): void {
    if (this.snake) {
      this.snake.destroy();
    }
    if (this.food) {
      this.food.destroy();
    }

    const headTexture = this.textures.get('head')!;
    const bodyTexture = this.textures.get('body')!;
    const snackTexture = this.textures.get('snack')!;

    this.snake = new Snake(
      Math.floor(this.gridSize / 2),
      Math.floor(this.gridSize / 2),
      headTexture,
      bodyTexture,
      this.tileSize
    );

    this.food = new Food(this.gridSize, this.snake, snackTexture, this.tileSize);

    this.app.stage.addChild(this.snake.getContainer());
    this.app.stage.addChild(this.food.getSprite());

    this.score.reset();
    this.gameOver = false;
    if (this.gameOverText) {
      this.app.stage.removeChild(this.gameOverText);
      this.gameOverText.destroy();
      this.gameOverText = undefined;
    }
  }

  private setupControls(): void {
    this.controls = new Controls(
      (direction) => {
        if (!this.gameOver && this.snake) {
          this.snake.setDirection(direction);
        }
      },
      () => {
        if (this.gameOver) {
          this.restart();
        }
      }
    );
  }

  private update(): void {
    if (this.gameOver) return;

    this.snake.move();

    if (this.snake.checkCollision(this.gridSize)) {
      this.gameOver = true;
      this.showGameOver();
      return;
    }

    const head = this.snake.getHead();
    const foodPos = this.food.getPosition();

    if (head.x === foodPos.x && head.y === foodPos.y) {
      this.snake.grow();
      this.food.regenerate(this.gridSize, this.snake);
      this.score.add(10);
    }
  }

  private gameLoop(): void {
    const currentTime = Date.now();

    if (currentTime - this.lastUpdateTime >= this.updateInterval) {
      this.update();
      this.lastUpdateTime = currentTime;
    }
  }

  private showGameOver(): void {
    const overlay = new PIXI.Graphics();
    overlay.rect(0, 0, this.app.screen.width, this.app.screen.height);
    overlay.fill({ color: 0x000000, alpha: 0.7 });

    const gameOverTitle = new PIXI.Text({
      text: 'Game Over!',
      style: {
        fontSize: 48,
        fontWeight: 'bold',
        fill: 0xff5252,
        align: 'center',
      },
    });
    gameOverTitle.anchor.set(0.5);
    gameOverTitle.x = this.app.screen.width / 2;
    gameOverTitle.y = this.app.screen.height / 2 - 30;

    const scoreText = new PIXI.Text({
      text: `Final Score: ${this.score.get()}`,
      style: {
        fontSize: 24,
        fill: 0xffffff,
        align: 'center',
      },
    });
    scoreText.anchor.set(0.5);
    scoreText.x = this.app.screen.width / 2;
    scoreText.y = this.app.screen.height / 2 + 20;

    const restartText = new PIXI.Text({
      text: 'Press SPACE to restart',
      style: {
        fontSize: 20,
        fill: 0x4caf50,
        align: 'center',
      },
    });
    restartText.anchor.set(0.5);
    restartText.x = this.app.screen.width / 2;
    restartText.y = this.app.screen.height / 2 + 60;

    this.gameOverText = new PIXI.Container();
    this.gameOverText.addChild(overlay);
    this.gameOverText.addChild(gameOverTitle);
    this.gameOverText.addChild(scoreText);
    this.gameOverText.addChild(restartText);

    this.app.stage.addChild(this.gameOverText);
  }

  private restart(): void {
    this.initializeGame();
  }

  destroy(): void {
    if (this.controls) {
      this.controls.destroy();
    }
    if (this.snake) {
      this.snake.destroy();
    }
    if (this.food) {
      this.food.destroy();
    }
    this.app.destroy();
  }
}
