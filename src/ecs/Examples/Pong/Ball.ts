import { canvas } from "../../../canvas";
import { CollisionComponent } from "../../components/CollisionComponent";
import { CircleComponent } from "../../components/CircleComponent";
import { Entity } from "../../core/Entity";
import { EntityManager } from "../../core/managers/EntityManager";
import { RGBA } from "../../core/RGBA";
import { Vector2 } from "../../core/Vector2";
import { Paddle } from "./Paddle";
import { EPlayers, Score } from "./Score";

interface IBall {
  position: Vector2;
  radius: number;
}

export class Ball extends Entity {
  private _velocity: Vector2 = Vector2.Zero;
  private _radius: number;
  private _speed: number = 1;
  private _initialPosition: Vector2;

  constructor({ position, radius }: IBall) {
    super({ position, name: 'Ball' });

    this._initialPosition = new Vector2(position.x, position.y);
    this._radius = radius;

    this.addComponent(new CircleComponent(
      RGBA.White,
      radius,
    ));

    this.addComponent(new CollisionComponent({
      width: radius,
      height: radius,
      layer: 2,
      layerMask: [1],
      onCollide: (hit: CollisionComponent) => this.onCollide(hit),
    }));

    this._velocity.x = (Date.now() % 2 === 0 ? 1 : -1) * this._speed;
    this._velocity.y = (Date.now() % 2 === 0 ? 1 : -1) * this._speed;

    setInterval(() => {
      this._speed += 0.3;
    }, 1500);
  }

  public update(delta: number): void {
    this.transform.position = Vector2.add(
      this.transform.position,
      Vector2.mult(this._velocity, this._speed),
    );

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

  public onCollide(hit: CollisionComponent): void {
    const paddle = EntityManager.getEntity(hit.parent) as Paddle;
    this._velocity = new Vector2(
      -this._velocity.x,
      (this._velocity.y / 2) + (paddle.velocity.y / 4),
    );
  }

  public reset() {
    this._speed = 1;

    this.transform.position = this._initialPosition;

    this._velocity.x = (Date.now() % 2 === 0 ? 1 : -1) * this._speed;
    this._velocity.y = (Date.now() % 2 === 0 ? 1 : -1) * this._speed;
  }
}