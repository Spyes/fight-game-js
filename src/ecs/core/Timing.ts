import { EntityManager } from "./EntityManager";
import { SystemManager } from "./SystemManager";

export class Timing {
  private static frames_per_second = 60;
  private static previousTime = performance.now();
  private static frame_interval = 1000 / this.frames_per_second;
  private static delta_time_multiplier = 1;
  private static delta_time = 0;

  private static _handleId: number;

  private static tick(currentTime: DOMHighResTimeStamp) {
    Timing.delta_time = currentTime - Timing.previousTime;
    Timing.delta_time_multiplier = Timing.delta_time / Timing.frame_interval;

    EntityManager.entityIds.forEach(entityId => EntityManager.getEntity(entityId).update(Timing.delta_time_multiplier));
    SystemManager.systems.forEach(system => system.update(Timing.delta_time_multiplier));

    Timing.previousTime = currentTime;
    window.requestAnimationFrame(Timing.tick);
  }

  public static startTiming(): void {
    Timing._handleId = window.requestAnimationFrame(Timing.tick);
  }

  public static stopTiming(): void {
    window.cancelAnimationFrame(Timing._handleId);
  }
}

