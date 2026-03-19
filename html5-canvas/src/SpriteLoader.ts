export class SpriteLoader {
  private sprites: Map<string, HTMLImageElement> = new Map();
  private loadedCount = 0;
  private totalCount = 0;

  async loadSprite(name: string, path: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.sprites.set(name, img);
        this.loadedCount++;
        resolve(img);
      };
      img.onerror = reject;
      img.src = path;
      this.totalCount++;
    });
  }

  async loadAll(): Promise<void> {
    await Promise.all([
      this.loadSprite('head', '/sprites/head.png'),
      this.loadSprite('body', '/sprites/body.png'),
      this.loadSprite('snack', '/sprites/snack.png'),
      this.loadSprite('empty', '/sprites/empy.png'),
    ]);
  }

  getSprite(name: string): HTMLImageElement | undefined {
    return this.sprites.get(name);
  }

  isLoaded(): boolean {
    return this.loadedCount === this.totalCount;
  }
}
