import { Vector2 } from "../core/Vector2";
import { Component } from "./Component";

export interface ITransform {
  position?: Vector2;
  scale?: Vector2;
}

export class TransformComponent extends Component {
  private _local: Vector2;
  private _position: Vector2;
  private _scale: Vector2;

  constructor({ position = Vector2.Zero, scale = Vector2.One }: ITransform) {
    super('Transform', 'transform');

    this._local = position;
    this._position = position;
    this._scale = scale;
  }

  public get position() { return this._position; }
  public set position(position: Vector2) { this._position = position; }

  public get local() { return this._local; }
  public set local(local: Vector2) { this._local = local; }

  public get scale() { return this._scale; }
  public set scale(scale: Vector2) { this._scale = scale; }
}