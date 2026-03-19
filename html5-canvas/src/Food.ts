import { Position } from './types';
import { Snake } from './Snake';

export class Food {
  private position: Position;

  constructor(gridSize: number, snake: Snake) {
    this.position = this.generatePosition(gridSize, snake);
  }

  getPosition(): Position {
    return this.position;
  }

  regenerate(gridSize: number, snake: Snake): void {
    this.position = this.generatePosition(gridSize, snake);
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
}
