import { Position, Direction } from './types';

export class Snake {
  private body: Position[] = [];
  private direction: Direction = 'RIGHT';
  private nextDirection: Direction = 'RIGHT';
  private growing = false;

  constructor(startX: number, startY: number) {
    this.body = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];
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
}
