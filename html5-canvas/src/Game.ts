import { SpriteLoader } from './SpriteLoader';
import { Snake } from './Snake';
import { Food } from './Food';
import { Controls } from './Controls';
import { Score } from './Score';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private spriteLoader: SpriteLoader;
  private snake: Snake;
  private food: Food;
  private controls: Controls;
  private score: Score;
  private gridSize: number;
  private tileSize: number;
  private gameOver: boolean;
  private gameStarted: boolean;
  private lastUpdateTime: number;
  private updateInterval: number;

  constructor(canvasId: string, gridSize: number = 20) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.gridSize = gridSize;
    this.tileSize = this.canvas.width / gridSize;
    this.gameOver = false;
    this.gameStarted = false;
    this.lastUpdateTime = 0;
    this.updateInterval = 150;

    this.spriteLoader = new SpriteLoader();
    this.snake = new Snake(Math.floor(gridSize / 2), Math.floor(gridSize / 2));
    this.food = new Food(gridSize, this.snake);
    this.score = new Score('score');

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

  async init(): Promise<void> {
    await this.spriteLoader.loadAll();
    this.gameStarted = true;
    this.gameLoop(0);
  }

  private update(): void {
    if (this.gameOver) return;

    this.snake.move();

    if (this.snake.checkCollision(this.gridSize)) {
      this.gameOver = true;
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

  private render(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const emptySprite = this.spriteLoader.getSprite('empty');
        if (emptySprite) {
          this.ctx.drawImage(
            emptySprite,
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }

    const foodSprite = this.spriteLoader.getSprite('snack');
    const foodPos = this.food.getPosition();
    if (foodSprite) {
      this.ctx.drawImage(
        foodSprite,
        foodPos.x * this.tileSize,
        foodPos.y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }

    const snakeBody = this.snake.getBody();
    const headSprite = this.spriteLoader.getSprite('head');
    const bodySprite = this.spriteLoader.getSprite('body');

    snakeBody.forEach((segment, index) => {
      const sprite = index === 0 ? headSprite : bodySprite;
      if (sprite) {
        this.ctx.drawImage(
          sprite,
          segment.x * this.tileSize,
          segment.y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    });

    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = '#FF5252';
      this.ctx.font = 'bold 48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 30);

      this.ctx.fillStyle = '#FFF';
      this.ctx.font = '24px Arial';
      this.ctx.fillText(
        `Final Score: ${this.score.get()}`,
        this.canvas.width / 2,
        this.canvas.height / 2 + 20
      );

      this.ctx.fillStyle = '#4CAF50';
      this.ctx.font = '20px Arial';
      this.ctx.fillText(
        'Press SPACE to restart',
        this.canvas.width / 2,
        this.canvas.height / 2 + 60
      );
    }
  }

  private gameLoop(currentTime: number): void {
    if (!this.gameStarted) return;

    if (currentTime - this.lastUpdateTime >= this.updateInterval) {
      this.update();
      this.lastUpdateTime = currentTime;
    }

    this.render();
    requestAnimationFrame((time) => this.gameLoop(time));
  }

  private restart(): void {
    this.snake = new Snake(Math.floor(this.gridSize / 2), Math.floor(this.gridSize / 2));
    this.food = new Food(this.gridSize, this.snake);
    this.score.reset();
    this.gameOver = false;
  }

  destroy(): void {
    if (this.controls) {
      this.controls.destroy();
    }
  }
}
