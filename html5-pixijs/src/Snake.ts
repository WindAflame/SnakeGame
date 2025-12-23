import * as PIXI from 'pixi.js';
import { Position, Direction } from './types';

export class Snake {
  private body: Position[] = [];
  private direction: Direction = 'RIGHT';
  private nextDirection: Direction = 'RIGHT';
  private growing = false;
  private container: PIXI.Container;
  private headTexture: PIXI.Texture;
  private bodyTexture: PIXI.Texture;
  private tileSize: number;
  private sprites: PIXI.Sprite[] = [];

  constructor(
    startX: number,
    startY: number,
    headTexture: PIXI.Texture,
    bodyTexture: PIXI.Texture,
    tileSize: number
  ) {
    this.body = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];
    this.container = new PIXI.Container();
    this.headTexture = headTexture;
    this.bodyTexture = bodyTexture;
    this.tileSize = tileSize;
    this.createSprites();
  }

  private createSprites(): void {
    this.sprites.forEach(sprite => sprite.destroy());
    this.sprites = [];
    this.container.removeChildren();

    this.body.forEach((segment, index) => {
      const texture = index === 0 ? this.headTexture : this.bodyTexture;
      const sprite = new PIXI.Sprite(texture);
      sprite.width = this.tileSize;
      sprite.height = this.tileSize;
      sprite.x = segment.x * this.tileSize;
      sprite.y = segment.y * this.tileSize;
      this.sprites.push(sprite);
      this.container.addChild(sprite);
    });
  }

  getContainer(): PIXI.Container {
    return this.container;
  }

  getHead(): Position {
    return this.body[0];
  }

  getBody(): Position[] {
    return this.body;
  }

  getDirection(): Direction {
    return this.direction;
  }

  setDirection(newDirection: Direction): void {
    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (opposites[this.direction] !== newDirection) {
      this.nextDirection = newDirection;
    }
  }

  move(): void {
    this.direction = this.nextDirection;

    const head = this.getHead();
    let newHead: Position;

    switch (this.direction) {
      case 'UP':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'DOWN':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'LEFT':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'RIGHT':
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    this.body.unshift(newHead);

    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }

    this.updateSprites();
  }

  private updateSprites(): void {
    this.createSprites();
  }

  grow(): void {
    this.growing = true;
  }

  checkCollision(gridSize: number): boolean {
    const head = this.getHead();

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      return true;
    }

    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }

    return false;
  }

  destroy(): void {
    this.sprites.forEach(sprite => sprite.destroy());
    this.container.destroy();
  }
}
