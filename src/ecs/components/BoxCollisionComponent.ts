import { Vector2 } from "../../types/Vector2";
import { Component } from "./Component";

interface IBoxCollision {
  position?: Vector2;
  width: number;
  height: number;
}

export class BoxCollisionComponent extends Component {
  private _position: Vector2;
  private _width: number;
  private _height: number;

  constructor({ position = { x: 0, y: 0 }, width, height }: IBoxCollision) {
    super('BoxCollision', 'collision');

    this._position = position;
    this._width = width;
    this._height = height;
  }

  public get position() { return this._position; }
  public get width() { return this._width; }
  public get height() { return this._height; }
}