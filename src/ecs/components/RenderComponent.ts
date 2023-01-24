import { Vector2 } from "../core/Vector2";
import { Component } from "./Component";

type AnimSprite = {
  imageSrc: string;
  framesMax: number;
  events?: FrameEvents;
}

type FrameEvents = Record<number, () => void>;

interface IRenderComp {
  imageSrc: string;
  width?: number;
  height?: number;
  offset?: Vector2;
  sprites?: Record<string, AnimSprite>;
  defaultAnim?: string;
  onAnimationEnd?: () => void;
}

export class RenderComponent extends Component {
  _topic: string = 'render';
  private _image: HTMLImageElement = new Image();
  private _width: number;
  private _height: number;
  private _offset: Vector2;
  private _sprites: Record<string, AnimSprite & { image?: HTMLImageElement } & FrameEvents> | undefined;
  private _frameCurrent: number = 0;
  private _framesMax: number = 1;
  private _animAccu = 0;
  private _animFrameTime = 6;
  private _onAnimationEnd;
  private _sprite: string;

  constructor({
    imageSrc,
    width,
    height,
    offset = Vector2.Zero,
    sprites,
    defaultAnim = '',
    onAnimationEnd = () => {},
  }: IRenderComp) {
    super('Render');

    this._image.src = imageSrc;
    this._width = width || this._image.width;
    this._height = height || this._image.height;
    this._offset = offset;
    this._sprites = sprites;
    this._onAnimationEnd = onAnimationEnd;
    this._sprite = defaultAnim;

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
  public get sprite() { return this._sprite; }

  public get animAccu() { return this._animAccu; }
  public set animAccu(animAccu: number) { this._animAccu = animAccu; }

  public get frameCurrent() { return this._frameCurrent; }
  public set frameCurrent(frameCurrent: number) { this._frameCurrent = frameCurrent; }

  public get framesMax() { return this._framesMax; }
  public get animFrameTime() { return this._animFrameTime; }
  public get onAnimationEnd() { return this._onAnimationEnd; }

  public switchSprite(sprite: string) {
    if (!this._sprites?.[sprite]) return;
    if (this.image === this._sprites[sprite]?.image) return;

    this._sprite = sprite;
    this._image = this._sprites[sprite].image as HTMLImageElement;
    this._framesMax = this._sprites[sprite].framesMax;
    this._frameCurrent = 0;
  }
}
