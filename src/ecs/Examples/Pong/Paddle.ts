import { canvas } from "../../../canvas";
import { CollisionComponent } from "../../components/CollisionComponent";
import { OverlayComponent } from "../../components/OverlayComponent";
import { Entity } from "../../core/Entity";
import { Input } from "../../core/Input";
import { RGBA } from "../../core/RGBA";
import { Vector2 } from "../../core/Vector2";

interface IPaddle {
  position: Vector2;
  keyBindings: Record<string, string>;
}

export class Paddle extends Entity {
  _velocity: Vector2 = Vector2.Zero;
  _width = 12;
  _height = 120;
  _speed = 10;
  _keyBindings: Record<string, string> = {};

  public get velocity() { return this._velocity; }
  public set velocity(velocity: Vector2) { this._velocity = velocity; }

  constructor({ position, keyBindings }: IPaddle) {
    super({ position, name: 'Paddle' });

    this._keyBindings = keyBindings;

    this.addComponent(new OverlayComponent(
      RGBA.White,
      this._width,
      this._height,
    ));
 
    this.addComponent(new CollisionComponent({
      width: this._width,
      height: this._height,
      layer: 1,
      layerMask: [2],
    }));

  }

  update(delta: number) {
    this.transform.position = Vector2.add(
      this.transform.position,
      Vector2.mult(this.velocity, delta),
    );

    this.velocity.y = 0;
    if (Input.keys[this._keyBindings.up].pressed && this.transform.position.y > 0) {
      this.velocity = Vector2.mult(Vector2.Up, this._speed);
    } else if (Input.keys[this._keyBindings.down].pressed && this.transform.position.y + this._height <= canvas.height) {
      this.velocity = Vector2.mult(Vector2.Down, this._speed);
    }
  }
}