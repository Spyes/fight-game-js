import { canvas } from "../../canvas";
import { OverlayComponent } from "../components/OverlayComponent";
import { EntityManager } from "../core/EntityManager";
import { Game } from "../core/Game";
import { SystemManager } from "../core/SystemManager";
import { CollisionSystem } from "../systems/CollisionSystem";
import { RenderSystem } from "../systems/RenderSystem";
import { Ball } from "./Ball";
import { Paddle } from "./Paddle";

export function Pong() {
  SystemManager.systems.push(new RenderSystem());
  SystemManager.systems.push(new CollisionSystem());

  const background = EntityManager.createEntity();
  background.addComponent(new OverlayComponent(
    { r: 0, g: 0, b: 0, a: 1 },
    canvas.width,
    canvas.height,
  ));

  const divider = EntityManager.createEntity({
    position: {
      x: (canvas.width / 2) - 5,
      y: 0,
    },
  });
  divider.addComponent(new OverlayComponent(
    { r: 255, g: 255, b: 255, a: 1 },
    10,
    canvas.height,
  ));

  const player1Score = EntityManager.createEntity({
    position: {
      x: 50,
      y: 50,
    },
  });

  const player1 = new Paddle({
    position: {
      x: 30,
      y: (canvas.height / 2) - 60,
    },
    keyBindings: {
      up: 'KeyW',
      down: 'KeyS',
    },
  });
  EntityManager.createEntity({ entity: player1 });

  const player2 = new Paddle({
    position: {
      x: canvas.width - 40,
      y: (canvas.height / 2) - 60,
    },
    keyBindings: {
      up: 'ArrowUp',
      down: 'ArrowDown',
    },
  });
  EntityManager.createEntity({ entity: player2 });

  const ball = new Ball({
    position: {
      x: (canvas.width / 2) - 5,
      y: (canvas.height / 2) + 5,
    },
    radius: 10,
  });
  EntityManager.createEntity({ entity: ball });

  Game.startGame();
}