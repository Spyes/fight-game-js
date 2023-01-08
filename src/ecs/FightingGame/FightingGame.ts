import { canvas } from "../../canvas";
import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { OverlayComponent } from "../components/OverlayComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/EntityManager";
import { Game } from "../core/Game";
import { SystemManager } from "../core/SystemManager";
import { Entity } from "../entities/Entity";
import { CollisionSystem } from "../systems/CollisionSystem";
import { RenderSystem } from "../systems/RenderSystem";
import { Player } from "./Player";

export function FightingGame() {
  SystemManager.systems.push(new RenderSystem());
  SystemManager.systems.push(new CollisionSystem());

  const background = EntityManager.createEntity();
  background.addComponent(new RenderComponent({
    imageSrc: './img/background.png',
  }));

  const shop = EntityManager.createEntity({
    position: {
      x: 600,
      y: 128,
    },
    scale: {
      x: 2.75,
      y: 2.75,
    },
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
    { r: 255, g: 255, b: 255, a: 0.12 },
    canvas.width,
    canvas.height,
  ));

  const player1 = new Player({
    name: 'Kenji',
    position: { x: 600, y: 0 },
    imageSrc: './img/Kenji/Idle.png',
    width: 50,
    height: 150,
    offset: {
      x: 215,
      y: 167,
    },
    scale: {
      x: 2.5,
      y: 2.5,
    },
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
  const player1AttackHitbox = new Entity({ position: { x: -170, y: 40 } });
  EntityManager.createEntity({
    entity: player1,
  });
  EntityManager.createEntity({
    entity: player1AttackHitbox,
  });

  player1AttackHitbox.addComponent(new OverlayComponent({ r: 255, g: 255, b: 255, a: 1 }, 150, 50));
  const boxCollisionComp1 = new BoxCollisionComponent({
    position: (player1AttackHitbox.components.Transform as TransformComponent).position,
    width: 150,
    height: 50,
  });
  player1AttackHitbox.addComponent(boxCollisionComp1);
  player1.addChild(player1AttackHitbox);

  const player2 = new Player({
    name: 'Samurai Mack',
    position: { x: 20, y: 0 },
    imageSrc: './img/SamuraiMack/Idle.png',
    width: 50,
    height: 150,
    offset: {
      x: 215,
      y: 155,
    },
    scale: {
      x: 2.5,
      y: 2.5,
    },
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
  const player2AttackHitbox = new Entity({ position: { x: 80, y: 1 } });
  EntityManager.createEntity({
    entity: player2,
  });
  EntityManager.createEntity({
    entity: player2AttackHitbox,
  });

  player2AttackHitbox.addComponent(new OverlayComponent({ r: 255, g: 255, b: 255, a: 1 }, 150, 50));
  const boxCollisionComp2 = new BoxCollisionComponent({
    position: (player2AttackHitbox.components.Transform as TransformComponent).position,
    width: 150,
    height: 50,
  });
  player2AttackHitbox.addComponent(boxCollisionComp2);
  player2.addChild(player2AttackHitbox);

  Game.startGame();
}