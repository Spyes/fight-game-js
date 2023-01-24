import { canvas } from "../../../canvas";
import { CollisionComponent } from "../../components/CollisionComponent";
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
import { TextComponent } from "../../components/TextComponent";

export function FightingGame() {
  SystemManager.systems.push(new RenderSystem());
  SystemManager.systems.push(new CollisionSystem());

  const background = EntityManager.createEntity({ name: "background" });
  background.addComponent(new RenderComponent({
    imageSrc: './img/background.png',
  }));

  const shop = EntityManager.createEntity({
    name: "shop",
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

  const overlay = EntityManager.createEntity({ name: "overlay" });
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
      attack: {
        imageSrc: './img/Kenji/Attack1.png',
        framesMax: 4,
        events: {
          2: () => { player1.enableAttack(); },
        },
      },
    },
    keyBindings: {
      left: 'ArrowLeft',
      right: 'ArrowRight',
      jump: 'ArrowUp',
      attack: 'ArrowDown',
    }
  });
  EntityManager.createEntity({
    entity: player1,
  });

  const player1AttackHitbox = new Entity({ position: new Vector2(-170, 40), name: 'playerAttackHitbox' });
  EntityManager.createEntity({
    entity: player1AttackHitbox,
  });
  const collisionComp1 = new CollisionComponent({
    position: (player1AttackHitbox.transform as TransformComponent).position,
    width: 150,
    height: 50,
    layer: 2,
    layerMask: [1],
    onCollide: function onHit(hit: CollisionComponent) {
      collisionComp1.enabled = false;
      const hitPlayer = (EntityManager.getEntity(hit.parent)) as Player;
      hitPlayer.health = hitPlayer.health - 10;
    },
  });
  collisionComp1.enabled = false;
  player1AttackHitbox.addComponent(collisionComp1);
  player1.addChild(player1AttackHitbox);

  const player1HealthText = new Entity({ name: 'playerHealthText '});
  EntityManager.createEntity({
    entity: player1HealthText,
  });
  player1HealthText.addComponent(new TextComponent({ rgba: RGBA.White, text: `${player1.health}`, font: '16px sans-serif' }));
  player1HealthText.update = function update(delta: number) {
    (this.components.Text as TextComponent).text = `${player1.health}`;
  };
  player1.addChild(player1HealthText);

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
      },
      attack: {
        imageSrc: './img/SamuraiMack/Attack1.png',
        framesMax: 6,
        events: {
          4: () => { player2.enableAttack(); },
        },  
      },
    },
    keyBindings: {
      left: 'KeyA',
      right: 'KeyD',
      jump: 'KeyW',
      attack: 'Space',
    }
  });
  EntityManager.createEntity({
    entity: player2,
  });

  const player2AttackHitbox = new Entity({ position: new Vector2(80, 40), name: 'playerAttackHitbox' });
  EntityManager.createEntity({
    entity: player2AttackHitbox,
  });
  const collisionComp2 = new CollisionComponent({
    position: (player2AttackHitbox.transform as TransformComponent).position,
    width: 165,
    height: 50,
    layer: 2,
    layerMask: [1],
    onCollide: function onHit(hit: CollisionComponent) {
      collisionComp2.enabled = false;
      const hitPlayer = (EntityManager.getEntity(hit.parent)) as Player;
      hitPlayer.health = hitPlayer.health - 10;
    },
  });
  collisionComp2.enabled = false;
  player2AttackHitbox.addComponent(collisionComp2);
  player2.addChild(player2AttackHitbox);

  const player2HealthText = new Entity({ name: 'playerHealthText '});
  EntityManager.createEntity({
    entity: player2HealthText,
  });
  player2HealthText.addComponent(new TextComponent({ rgba: RGBA.White, text: `${player2.health}`, font: '16px sans-serif' }));
  player2HealthText.update = function update(delta: number) {
    (this.components.Text as TextComponent).text = `${player2.health}`;
  };
  player2.addChild(player2HealthText);

  GameManager.startGame();
}