import { Vector2 } from "../../types/Vector2";
import { Component } from "./Component";

type AnimSprite = {
  imageSrc: string;
  framesMax: number;
}

interface IRenderComp {
  imageSrc: string;
  width?: number;
  height?: number;
  offset?: Vector2;
  sprites?: Record<string, AnimSprite>;
  defaultAnim?: string;
}

export class RenderComponent extends Component {
  private _image: HTMLImageElement = new Image();
  private _width: number;
  private _height: number;
  private _offset: Vector2;
  private _sprites: Record<string, AnimSprite & { image?: HTMLImageElement }> | undefined;
  private _frameCurrent: number = 0;
  private _framesMax: number = 1;
  private _animAccu = 0;
  private _animFrameTime = 6;

  constructor({
    imageSrc,
    width,
    height,
    offset = { x: 0, y: 0 },
    sprites,
    defaultAnim = '',
  }: IRenderComp) {
    super('Render');

    this._image.src = imageSrc;
    this._width = width || this._image.width;
    this._height = height || this._image.height;
    this._offset = offset;
    this._sprites = sprites;

    if (this._sprites) {
      for (const sprite in this._sprites) {
        this._sprites[sprite].image = new Image();
        (this._sprites[sprite].image as HTMLImageElement).src = this._sprites[sprite].imageSrc;
        if (defaultAnim === sprite) {
          this._image = this._sprites[defaultAnim].image as HTMLImageElement;
          this._framesMax = this._sprites[defaultAnim].framesMax;  
        }
      }
    }
  }

  public get height() { return this._height; }
  public set height(height: number) { this._height = height; }

  public get width() { return this._width; }
  public set width(width: number) { this._width = width; }


  public get image() { return this._image; }
  public set image(image: HTMLImageElement) { this._image = image; }

  public get offset() { return this._offset; }
  public set offset(offset: Vector2) { this._offset = offset; }

  public get sprites() { return this._sprites; }

  public get animAccu() { return this._animAccu; }
  public set animAccu(animAccu: number) { this._animAccu = animAccu; }

  public get frameCurrent() { return this._frameCurrent; }
  public set frameCurrent(frameCurrent: number) { this._frameCurrent = frameCurrent; }

  public get framesMax() { return this._framesMax; }
  public get animFrameTime() { return this._animFrameTime; }

  public switchSprite(sprite: string) {
    if (!this._sprites?.[sprite]) return;
    if (this.image === this._sprites[sprite]?.image) return;

    this._image = this._sprites[sprite].image as HTMLImageElement;
    this._framesMax = this._sprites[sprite].framesMax;
    this._frameCurrent = 0;
  }
}
