import { canvas } from "../../../canvas";
import { OverlayComponent } from "../../components/OverlayComponent";
import { EntityManager } from "../../core/managers/EntityManager";
import { GameManager } from "../../core/managers/GameManager";
import { SystemManager } from "../../core/managers/SystemManager";
import { Vector2 } from "../../core/Vector2";
import { CollisionSystem } from "../../systems/CollisionSystem";
import { RenderSystem } from "../../systems/RenderSystem";
import { Ball } from "./Ball";
import { Paddle } from "./Paddle";
import { EPlayers } from "./Score";
import { ScoreText } from "./ScoreText";
import { RGBA } from "../../core/RGBA";

export function Pong() {
  SystemManager.systems.push(new RenderSystem());
  SystemManager.systems.push(new CollisionSystem());

  const background = EntityManager.createEntity({ name: 'Background' });
  background.addComponent(new OverlayComponent(
    RGBA.Black,
    canvas.width,
    canvas.height,
  ));

  const divider = EntityManager.createEntity({
    position: new Vector2((canvas.width / 2) - 5, 0),
    name: 'Divider',
  });
  divider.addComponent(new OverlayComponent(
    RGBA.White,
    10,
    canvas.height,
  ));

  const player1Score = new ScoreText({
    position: new Vector2(50, 70),
    player: EPlayers.PLAYER_ONE,
  });
  EntityManager.createEntity({ entity: player1Score });

  const player2Score = new ScoreText({
    position: new Vector2(canvas.width - 100, 70),
    player: EPlayers.PLAYER_TWO,
  });
  EntityManager.createEntity({ entity: player2Score });

  const player1 = new Paddle({
    position: new Vector2(30, (canvas.height / 2) - 60),
    keyBindings: {
      up: 'KeyW',
      down: 'KeyS',
    },
  });
  EntityManager.createEntity({ entity: player1 });

  const player2 = new Paddle({
    position: new Vector2(canvas.width - 40, (canvas.height / 2) - 60),
    keyBindings: {
      up: 'ArrowUp',
      down: 'ArrowDown',
    },
  });
  EntityManager.createEntity({ entity: player2 });

  const ball = new Ball({
    position: new Vector2((canvas.width / 2) - 5, (canvas.height / 2) + 5),
    radius: 10,
  });
  EntityManager.createEntity({ entity: ball });

  GameManager.startGame();
}