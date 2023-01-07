import { ctx } from "../canvas";
import { Vector2 } from "../types/Vector2";
import { Base } from "./Base";

export interface ISprite {
  imageSrc: string;
  position?: Vector2;
  scale?: number;
  offset?: Vector2;
  framesMax?: number;
}

export class Sprite extends Base {
  image = new Image();
  frameCurrent = 0;
  animAccu = 0;
  animFrameTime = 6;

  constructor(
    imageSrc: string,
    public position: Vector2 = { x: 0, y: 0 },
    private scale: number = 1,
    private offset: Vector2 = { x: 0, y: 0 },
    public framesMax: number = 1,
  ) {
    super();

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

  update(delta: number): void {
    this.draw();   
    this.animateFrames(delta);
  }

  animateFrames(delta: number): void {
    this.animAccu = this.animAccu + delta;
    while (this.animAccu > this.animFrameTime) {
      this.animAccu = this.animAccu - this.animFrameTime;
      if (++this.frameCurrent === this.framesMax) this.frameCurrent = 0;
    }
  }
}