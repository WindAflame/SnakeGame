import * as PIXI from 'pixi.js';
import { Position } from './types';
import { Snake } from './Snake';

export class Food {
  private position: Position;
  private sprite: PIXI.Sprite;
  private tileSize: number;

  constructor(gridSize: number, snake: Snake, texture: PIXI.Texture, tileSize: number) {
    this.tileSize = tileSize;
    this.position = this.generatePosition(gridSize, snake);
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.width = tileSize;
    this.sprite.height = tileSize;
    this.updateSpritePosition();
  }

  getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  getPosition(): Position {
    return this.position;
  }

  regenerate(gridSize: number, snake: Snake): void {
    this.position = this.generatePosition(gridSize, snake);
    this.updateSpritePosition();
  }

  private updateSpritePosition(): void {
    this.sprite.x = this.position.x * this.tileSize;
    this.sprite.y = this.position.y * this.tileSize;
  }

  private generatePosition(gridSize: number, snake: Snake): Position {
    let newPos: Position;
    let isOnSnake: boolean;

    do {
      newPos = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };

      isOnSnake = snake.getBody().some(
        (segment) => segment.x === newPos.x && segment.y === newPos.y
      );
    } while (isOnSnake);

    return newPos;
  }

  destroy(): void {
    this.sprite.destroy();
  }
}
