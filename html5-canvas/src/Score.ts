export class Score {
  private score: number = 0;
  private domElement: HTMLElement | null;

  constructor(domElementId: string) {
    this.domElement = document.getElementById(domElementId);
    this.updateDisplay();
  }

  add(points: number): void {
    this.score += points;
    this.updateDisplay();
  }

  get(): number {
    return this.score;
  }

  reset(): void {
    this.score = 0;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    if (this.domElement) {
      this.domElement.textContent = `Score: ${this.score}`;
    }
  }
}
