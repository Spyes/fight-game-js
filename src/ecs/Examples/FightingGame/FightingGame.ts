import { canvas } from "../../../canvas";
import { BoxCollisionComponent } from "../../components/BoxCollisionComponent";
import { OverlayComponent } from "../../components/OverlayComponent";
import { RenderComponent } from "../../components/RenderComponent";
import { TransformComponent } from "../../components/TransformComponent";
import { EntityManager } from "../../core/managers/EntityManager";
import { GameManager } from "../../core/managers/GameManager";
import { SystemManager } from "../../core/managers/SystemManager";
import { Entity } from "../../core/Entity";
import { CollisionSystem } from "../../systems/CollisionSystem";
import { RenderSystem } from "../../systems/RenderSystem";
import { Player } from "./Player";
import { Vector2 } from "../../core/Vector2";
import { RGBA } from "../../core/RGBA";

export function FightingGame() {
  SystemManager.systems.push(new RenderSystem());
  SystemManager.systems.push(new CollisionSystem());

  const background = EntityManager.createEntity();
  background.addComponent(new RenderComponent({
    imageSrc: './img/background.png',
  }));

  const shop = EntityManager.createEntity({
    position: new Vector2(600, 128),
    scale: new Vector2(2.75, 2.75),
  });
  shop.addComponent(new RenderComponent({
    imageSrc: './img/shop.png',
    defaultAnim: 'shop',
    sprites: {
      shop: {
        imageSrc: './img/shop.png',
        framesMax: 6,
      },
    },
  }));

  const overlay = EntityManager.createEntity();
  overlay.addComponent(new OverlayComponent(
    new RGBA(255, 255, 255, 0.12),
    canvas.width,
    canvas.height,
  ));

  const player1 = new Player({
    name: 'Kenji',
    position: new Vector2(600, 0),
    imageSrc: './img/Kenji/Idle.png',
    width: 50,
    height: 150,
    offset: new Vector2(215, 167),
    scale: new Vector2(2.5, 2.5),
    defaultAnim: 'idle',
    sprites: {
      idle: {
        imageSrc: './img/Kenji/Idle.png',
        framesMax: 4,
      },
      run: {
        imageSrc: './img/Kenji/Run.png',
        framesMax: 8,
      },
      jump: {
        imageSrc: './img/Kenji/Jump.png',
        framesMax: 2,
      },
      fall: {
        imageSrc: './img/Kenji/Fall.png',
        framesMax: 2,
      },
    },
    keyBindings: {
      left: 'ArrowLeft',
      right: 'ArrowRight',
      jump: 'ArrowUp',
      attack: 'ArrowDown',
    }
  });
  const player1AttackHitbox = new Entity({ position: new Vector2(-170, 40) });
  EntityManager.createEntity({
    entity: player1,
  });
  EntityManager.createEntity({
    entity: player1AttackHitbox,
  });

  player1AttackHitbox.addComponent(new OverlayComponent(RGBA.White, 150, 50));
  const boxCollisionComp1 = new BoxCollisionComponent({
    position: (player1AttackHitbox.transform as TransformComponent).position,
    width: 150,
    height: 50,
  });
  player1AttackHitbox.addComponent(boxCollisionComp1);
  player1.addChild(player1AttackHitbox);

  const player2 = new Player({
    name: 'Samurai Mack',
    position: new Vector2(20, 0),
    imageSrc: './img/SamuraiMack/Idle.png',
    width: 50,
    height: 150,
    offset: new Vector2(215, 155),
    scale: new Vector2(2.5, 2.5),
    defaultAnim: 'idle',
    sprites: {
      idle: {
        imageSrc: './img/SamuraiMack/Idle.png',
        framesMax: 8,
      },
      run: {
        imageSrc: './img/SamuraiMack/Run.png',
        framesMax: 8,
      },
      jump: {
        imageSrc: './img/SamuraiMack/Jump.png',
        framesMax: 2,
      },
      fall: {
        imageSrc: './img/SamuraiMack/Fall.png',
        framesMax: 2,
      }
    },
    keyBindings: {
      left: 'KeyA',
      right: 'KeyD',
      jump: 'KeyW',
      attack: 'Space',
    }
  });
  const player2AttackHitbox = new Entity({ position: new Vector2(80, 1) });
  EntityManager.createEntity({
    entity: player2,
  });
  EntityManager.createEntity({
    entity: player2AttackHitbox,
  });

  player2AttackHitbox.addComponent(new OverlayComponent(RGBA.White, 150, 50));
  const boxCollisionComp2 = new BoxCollisionComponent({
    position: (player2AttackHitbox.transform as TransformComponent).position,
    width: 150,
    height: 50,
  });
  player2AttackHitbox.addComponent(boxCollisionComp2);
  player2.addChild(player2AttackHitbox);

  GameManager.startGame();
}