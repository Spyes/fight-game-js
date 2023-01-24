import { EntityManager } from "../core/managers/EntityManager";
import { Vector2 } from "../core/Vector2";
import { Component } from "./Component";

export interface ITransform {
  position?: Vector2;
  scale?: Vector2;
}

export class TransformComponent extends Component {
  _topic: string = 'transform';
  private _position: Vector2;
  private _scale: Vector2;

  constructor({ position = Vector2.Zero, scale = Vector2.One }: ITransform) {
    super('Transform');

    this._position = position;
    this._scale = scale;

    this._exposed = [
      'position',
    ];
  }

  public get position() {
    const entity = EntityManager.getEntity(this.parent);
    const parentEntity = EntityManager.getEntity(entity.parent);
    const parentPosition = parentEntity ? parentEntity.transform.position : Vector2.Zero;
    return Vector2.add(this._position, parentPosition);
  }
  public set position(position: Vector2) { this._position = position; }

  public get scale() { return this._scale; }
  public set scale(scale: Vector2) { this._scale = scale; }
}