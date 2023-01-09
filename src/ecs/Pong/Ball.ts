import { canvas } from "../../canvas";
import { Vector2 } from "../../types/Vector2";
import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { CircleComponent } from "../components/CircleComponent";
import { Entity } from "../core/Entity";
import { Paddle } from "./Paddle";
import { EPlayers, Score } from "./Score";

interface IBall {
  position: Vector2;
  radius: number;
}

export class Ball extends Entity {
  private _velocity: Vector2 = { x: 0, y: 0 };
  private _radius: number;
  private _speed: number = 2;
  private _initialPosition: Vector2;

  constructor({ position, radius }: IBall) {
    super({ position });

    this._initialPosition = {
      x: position.x,
      y: position.y,
    };
    this._radius = radius;

    this.addComponent(new CircleComponent(
      { r: 255, g: 255, b: 255, a: 1 },
      radius,
    ));

  this.addComponent(new BoxCollisionComponent({
    width: radius,
    height: radius,
  }));

    let direction = Date.now() % 2 === 0 ? 1 : -1;
    this._velocity.x = direction * this._speed;
    direction = Date.now() % 2 === 0 ? 1 : -1;
    this._velocity.y = direction * this._speed;
  }

  public update(delta: number): void {
    this.transform.position.x += this._velocity.x;
    this.transform.position.y += this._velocity.y;

    if ((this.transform.position.y - this._radius) <= 0 || (this.transform.position.y + this._radius) >= canvas.height) {
      this._velocity.y *= -1;
    }

    if (this.transform.position.x + this._radius < 0) {
      Score.addPoint(EPlayers.PLAYER_TWO);
      this.reset();
    } else if (this.transform.position.x - this._radius > canvas.width) {
      Score.addPoint(EPlayers.PLAYER_ONE);
      this.reset();
    }
  }

  public onCollide(hit: Entity) {
    const paddle = hit as Paddle;
    this._velocity = {
      x: -this._velocity.x,
      y: (this._velocity.y / 2) + (paddle.velocity.y / 3)
    };
  }

  public reset() {
    this.transform.position.x = this._initialPosition.x;
    this.transform.position.y = this._initialPosition.y;
    let direction = Date.now() % 2 === 0 ? 1 : -1;
    this._velocity.x = direction * this._speed;
    direction = Date.now() % 2 === 0 ? 1 : -1;
    this._velocity.y = direction * this._speed;
  }
}