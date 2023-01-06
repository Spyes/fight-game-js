import { ctx } from "../canvas";
import { Vector2 } from "../types/Vector2";

export interface ISprite {
  imageSrc: string;
  position?: Vector2;
  scale?: number;
  offset?: Vector2;
  framesMax?: number;
}

export class Sprite {
  image = new Image();
  frameCurrent = 0;
  framesElapsed = 0;
  framesHold = 13;

  constructor(
    imageSrc: string,
    public position: Vector2 = { x: 0, y: 0 },
    private scale: number = 1,
    private offset: Vector2 = { x: 0, y: 0 },
    public framesMax: number = 1,
  ) {
    this.image.src = imageSrc;
  }

  draw(): void {
    ctx.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale,
    );
  }

  update(): void {
    this.draw();
    this.animateFrames();
  }

  animateFrames(): void {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (++this.frameCurrent === this.framesMax) this.frameCurrent = 0;
    }
  }
}