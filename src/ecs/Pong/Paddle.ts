import { canvas } from "../../canvas";
import { Vector2 } from "../../types/Vector2";
import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { OverlayComponent } from "../components/OverlayComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../core/Entity";
import { Input } from "../core/Input";

interface IPaddle {
  position: Vector2;
  keyBindings: Record<string, string>;
}

export class Paddle extends Entity {
  _velocity: Vector2 = { x: 0, y: 0 };
  _width = 12;
  _height = 120;
  _speed = 10;
  _keyBindings: Record<string, string> = {};

  public get velocity() { return this._velocity; }

  constructor({ position, keyBindings }: IPaddle) {
    super({ position });

    this._keyBindings = keyBindings;

    this.addComponent(new OverlayComponent(
      { r: 255, g: 255, b: 255, a: 1 },
      this._width,
      this._height,
    ));
 
    this.addComponent(new BoxCollisionComponent({
      width: this._width,
      height: this._height,
    }));

  }

  update(delta: number) { 
    this.transform.position.y += this._velocity.y * delta;

    this._velocity.y = 0;
    if (Input.keys[this._keyBindings.up].pressed && this.transform.position.y > 0) {
      this._velocity.y = -this._speed;
    } else if (Input.keys[this._keyBindings.down].pressed && this.transform.position.y + this._height <= canvas.height) {
      this._velocity.y = this._speed;
    }
  }
}