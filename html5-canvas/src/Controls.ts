import { Direction } from './types';

export class Controls {
  private onDirectionChange: (direction: Direction) => void;
  private onRestart: () => void;
  private handleKeyDownBound: (e: KeyboardEvent) => void;

  constructor(
    onDirectionChange: (direction: Direction) => void,
    onRestart: () => void
  ) {
    this.onDirectionChange = onDirectionChange;
    this.onRestart = onRestart;
    this.handleKeyDownBound = this.handleKeyDown.bind(this);

    document.addEventListener('keydown', this.handleKeyDownBound);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Space') {
      this.onRestart();
      return;
    }

    switch (e.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.onDirectionChange('UP');
        e.preventDefault();
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.onDirectionChange('DOWN');
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.onDirectionChange('LEFT');
        e.preventDefault();
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.onDirectionChange('RIGHT');
        e.preventDefault();
        break;
    }
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyDownBound);
  }
}
