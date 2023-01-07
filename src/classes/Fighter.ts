import { canvas } from "../canvas";
import { Settings } from "./Settings";
import { Vector2 } from "../types/Vector2";
import { Input } from "./Input";
import { ISprite, Sprite } from "./Sprite";

interface IFighter {
  name: string;
  position: Vector2;
  velocity: Vector2;
  height?: number;
  health?: number;
  color?: string;
  sprites?: Record<string, { imageSrc: string; framesMax: number; image?: HTMLImageElement; }>;
  keyMapping: Record<string, string>;
}

type AttackBox = {
  offset?: Vector2;
  width?: number;
  height?: number;
};

export class Fighter extends Sprite {
  name = '';
  velocity: Vector2 = { x: 0, y: 0 };
  height = 150;
  width = 50;
  attackBox = {
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    width: 100,
    height: 50,
  };
  isAttacking = false;
  isJumping = false;
  health = 100;
  sprites: Record<string, { imageSrc: string; framesMax: number; image?: HTMLImageElement; }> = {};
  dead = false;
  keyMapping: Record<string, string> = {};

  constructor(
    { name, position, velocity, height, health, color, sprites, keyMapping, imageSrc, scale, offset, framesMax, attackBox }:
      IFighter
      & ISprite
      & { attackBox?: AttackBox; }
  ) {
    super(imageSrc, position, scale, offset, framesMax);

    this.name = name;
    this.velocity = velocity;
    this.height = height || this.height;
    this.attackBox.offset = attackBox?.offset || this.attackBox.offset;
    this.attackBox.width = attackBox?.width || this.attackBox.width;
    this.attackBox.height = attackBox?.height || this.attackBox.height;
    this.health = health || this.health;
    this.sprites = sprites || this.sprites;
    this.keyMapping = keyMapping;

    for (const sprite in sprites) {
      sprites[sprite].image = new Image();
      (sprites[sprite].image as HTMLImageElement).src = sprites[sprite].imageSrc;
    }
  }

  update(delta: number) {
    this.draw();
    if (!this.dead) this.animateFrames(delta);

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;


    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else {
      this.velocity.y += Settings.gravity * delta;
    }

    this.velocity.x = 0;
    if (Input.keys[this.keyMapping.left].pressed) {
      this.velocity.x = -10;
      this.switchSprite('run');
    } else if (Input.keys[this.keyMapping.right].pressed) {
      this.velocity.x = 10;
      this.switchSprite('run');
    } else {
      this.switchSprite('idle');
    }

    if (Input.keys[this.keyMapping.jump].pressed) this.jump();
    if (Input.keys[this.keyMapping.attack].pressed && this.image !== this.sprites.attack1.image) this.attack();

    if (this.velocity.y < 0) {
      this.switchSprite('jump');
    } else if (this.velocity.y > 0) {
      this.switchSprite('fall');
    } else {
      this.isJumping = false;
    }

    if (this.isAttacking && this.image !== this.sprites.attack1.image) {
      this.isAttacking = false;
    }
  }

  attack() {
    this.switchSprite('attack1');
    this.isAttacking = true;
  }

  jump() {
    if (this.isJumping) return;
    this.velocity.y = -20;
    this.isJumping = true;
  }

  switchSprite(sprite: string): void {
    if (!this.sprites[sprite]) return;
    if (this.image === this.sprites.death.image) {
      if (this.frameCurrent === this.sprites.death.framesMax - 1) this.dead = true;
      return;
    }
    if (this.image === this.sprites.attack1.image && this.frameCurrent < this.sprites.attack1.framesMax - 1) return;
    if (this.image === this.sprites.takeHit.image && this.frameCurrent < this.sprites.takeHit.framesMax - 1) return;
    if (this.image === this.sprites[sprite]?.image) return;

    this.image = this.sprites[sprite].image as HTMLImageElement;
    this.framesMax = this.sprites[sprite].framesMax;
    this.frameCurrent = 0;
  }

  takeHit(damage: number): void {
    this.health = Math.max(this.health - damage, 0);

    if (this.health <= 0) {
      this.switchSprite('death');
    } else {
      this.switchSprite('takeHit');
    }
  }
}
