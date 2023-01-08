import { transform } from "typescript";
import { ctx } from "../../canvas";
import { Vector2 } from "../../types/Vector2";
import { OverlayComponent } from "../components/OverlayComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";
import { System } from "./System";

export class RenderSystem extends System {
  public update(entities: Entity[], delta: number) {
    for (const entity of entities) {
      if (entity.components.Render) {
        const renderComp = entity.components.Render as RenderComponent;
        const transform = entity.components.Transform as TransformComponent;
        this.draw(transform, renderComp);
        if (renderComp.sprites) {
          this.animateFrames(renderComp, delta);
        }
      }
      if (entity.components.Overlay) {
        const overlayComp = entity.components.Overlay as OverlayComponent;
        const transform = entity.components.Transform as TransformComponent;
        this.drawOverlay(transform, overlayComp);
      }
    }
  }

  private drawOverlay(transform: TransformComponent, overlayComp: OverlayComponent) {
    ctx.fillStyle = overlayComp.toString();
    ctx.fillRect(
      transform.position.x,
      transform .position.y,
      overlayComp.width,
      overlayComp.height,
    );
  }

  private draw(transform: TransformComponent, renderComp: RenderComponent) {
    ctx.drawImage(
      renderComp.image,
      renderComp.frameCurrent * (renderComp.image.width / renderComp.framesMax),
      0,
      renderComp.image.width / renderComp.framesMax,
      renderComp.image.height,
      transform.position.x - renderComp.offset.x,
      transform.position.y - renderComp.offset.y,
      (renderComp.image.width / renderComp.framesMax) * transform.scale.x,
      renderComp.image.height * transform.scale.y,
    );
  }

  private animateFrames(renderComp: RenderComponent, delta: number) {
    renderComp.animAccu = renderComp.animAccu + delta;
    while (renderComp.animAccu > renderComp.animFrameTime) {
      renderComp.animAccu = renderComp.animAccu - renderComp.animFrameTime;
      if (++renderComp.frameCurrent === renderComp.framesMax) renderComp.frameCurrent = 0;
    }
  }
}
