import { canvas } from "../../../canvas";
import { Settings } from "../../../classes/Settings";
import { RenderComponent } from "../../components/RenderComponent";
import { TransformComponent } from "../../components/TransformComponent";
import { Input } from "../../core/Input";
import { Entity } from "../../core/Entity";
import { Vector2 } from "../../core/Vector2";
import { CollisionComponent } from "../../components/CollisionComponent";

interface IPlayer {
  name: string;
  position?: Vector2;
  keyBindings: Record<string, string>;
  imageSrc: string;
  width: number;
  height: number;
  offset: Vector2;
  scale?: Vector2;
  sprites: RenderComponent['sprites'];
  defaultAnim: string;
}

export class Player extends Entity {
  _velocity: Vector2 = Vector2.Zero;
  _isJumping: boolean = false;
  _isAttacking: boolean = false;
  _health: number = 100;
  _keyMappings: Record<string, string>;

  _renderComp: RenderComponent;
  _transformComp: TransformComponent;
  _boxCollision: CollisionComponent;

  constructor({ name, position, keyBindings, imageSrc, width, height, offset, scale, sprites, defaultAnim }: IPlayer) {
    super({ position, scale, name: 'Player' });

    this.name = name;
    this._keyMappings = keyBindings;
    this._transformComp = this.transform as TransformComponent;

    this._renderComp = new RenderComponent({
      imageSrc,
      width,
      height,
      offset,
      defaultAnim,
      sprites,
      onAnimationEnd: () => this.onAnimationEnd(),
    });
    this.addComponent(this._renderComp);

    this._boxCollision = new CollisionComponent({
      width,
      height,
      layer: 1,
      layerMask: [2],
    });
    this.addComponent(this._boxCollision);
  }

  public get health() { return this._health; }
  public set health(health: number) { this._health = health; }

  update(delta: number): void {
    this._transformComp.position = Vector2.add(this._transformComp.position, Vector2.mult(this._velocity, delta));

    if (this._transformComp.position.y + this._renderComp.height + this._velocity.y >= canvas.height - 96) {
      this._velocity.y = 0;
      this._transformComp.position.y = 330;
    } else {
      this._velocity.y += Settings.gravity * delta;
    }

    this._velocity.x = 0;
    if (Input.keys[this._keyMappings.left].pressed) {
      this._velocity.x = -10;
      if (this._renderComp.sprite !== 'attack') {
        this._renderComp.switchSprite('run');
      }
    } else if (Input.keys[this._keyMappings.right].pressed) {
      this._velocity.x = 10;
      if (this._renderComp.sprite !== 'attack') {
        this._renderComp.switchSprite('run');
      }
    } else {
      if (this._renderComp.sprite !== 'attack') {
        this._renderComp.switchSprite('idle');
      }
    }

    if (this._velocity.y < 0) {
      if (this._renderComp.sprite !== 'attack') {
        this._renderComp.switchSprite('jump');
      }
    } else if (this._velocity.y > 0) {
      if (this._renderComp.sprite !== 'attack') {
        this._renderComp.switchSprite('fall');
      }
    } else {
      this._isJumping = false;
    }

    if (Input.keys[this._keyMappings.jump].pressed) this.jump();
    if (Input.keys[this._keyMappings.attack].pressed) this.attack();
  }

  jump() {
    if (this._isJumping) return;
    this._velocity.y = -20;
    this._isJumping = true;
  }

  attack() {
    if (this._renderComp.sprite === 'attack') return;
    this._isAttacking = true;
    this._renderComp.switchSprite('attack');
  }

  enableAttack() {
    const playerAttackBox = this.getChild('playerAttackHitbox');
    if (playerAttackBox) {
      playerAttackBox.components.Collision.enabled = true;
    }
  }

  onAnimationEnd() {
    if (this._isAttacking) {
      const playerAttackBox = this.getChild('playerAttackHitbox');
      if (playerAttackBox) {
        playerAttackBox.components.Collision.enabled = false;
      }
      this._isAttacking = false;
      this._renderComp.switchSprite('idle');
    }
  }
}