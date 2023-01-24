import { Vector2 } from "../core/Vector2";
import { Component } from "./Component";

interface ICollision {
  position?: Vector2;
  width: number;
  height: number;
  layer: number;
  layerMask: number[];
  onCollide?: (hit: CollisionComponent) => void;
}

const collideEmptyFn = (collide: CollisionComponent) => {}

export class CollisionComponent extends Component {
  _topic: string = 'collision';
  private _width: number;
  private _height: number;
  private _layer: number;
  private _layerMask: number[];
  private _onCollide: (hit: CollisionComponent) => void;
  

  constructor({ width, height, layer, layerMask = [], onCollide = collideEmptyFn }: ICollision) {
    super('Collision');

    this._width = width;
    this._height = height;
    this._layer = layer;
    this._layerMask = layerMask;
    this._onCollide = onCollide;
  }

  public get width() { return this._width; }
  public get height() { return this._height; }
  public get layer() { return this._layer; }
  public get layerMask() { return this._layerMask; }
  public get onCollide() { return this._onCollide; }
}