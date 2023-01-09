import { canvas } from "../../canvas";
import { Settings } from "../../classes/Settings";
import { Vector2 } from "../../types/Vector2";
import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { OverlayComponent } from "../components/OverlayComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Input } from "../core/Input";
import { Entity } from "../core/Entity";

interface IPlayer {
  name: string;
  position?: Vector2;
  keyBindings: Record<string, string>;
  imageSrc: string;
  width: number;
  height: number;
  offset: Vector2;
  scale?: Vector2;
  sprites: Record<string, { imageSrc: string; framesMax: number; }>;
  defaultAnim: string;
}

export class Player extends Entity {
  _name: string;
  _velocity: Vector2 = { x: 0, y: 0 };
  _isJumping: boolean = false;
  _keyMappings: Record<string, string>;

  _renderComp: RenderComponent;
  // _boxCollisionComp: BoxCollisionComponent;
  _transformComp: TransformComponent;

  constructor({ name, position, keyBindings, imageSrc, width, height, offset, scale, sprites, defaultAnim }: IPlayer) {
    super({ position, scale });

    this._name = name;
    this._keyMappings = keyBindings;
    this._transformComp = this.transform as TransformComponent;

    this._renderComp = new RenderComponent({
      imageSrc,
      width,
      height,
      offset,
      defaultAnim,
      sprites,
    });
    this.addComponent(this._renderComp);

    // this._boxCollisionComp = new BoxCollisionComponent({
    //   position: this._transformComp.position,
    //   height,
    //   width,
    // });
    // this.addComponent(this._boxCollisionComp);
  }

  update(delta: number): void {
    this._transformComp.position.x += this._velocity.x * delta;
    this._transformComp.position.y += this._velocity.y * delta;

    if (this._transformComp.position.y + this._renderComp.height + this._velocity.y >= canvas.height - 96) {
      this._velocity.y = 0;
      this._transformComp.position.y = 330;
    } else {
      this._velocity.y += Settings.gravity * delta;
    }

    this._velocity.x = 0;
    if (Input.keys[this._keyMappings.left].pressed) {
      this._velocity.x = -10;
      this._renderComp.switchSprite('run');
    } else if (Input.keys[this._keyMappings.right].pressed) {
      this._velocity.x = 10;
      this._renderComp.switchSprite('run');
    } else {
      this._renderComp.switchSprite('idle');
    }

    if (this._velocity.y < 0) {
      this._renderComp.switchSprite('jump');
    } else if (this._velocity.y > 0) {
      this._renderComp.switchSprite('fall');
    } else {
      this._isJumping = false;
    }

    if (Input.keys[this._keyMappings.jump].pressed) this.jump();
  }

  jump() {
    if (this._isJumping) return;
    this._velocity.y = -20;
    this._isJumping = true;
  }
}