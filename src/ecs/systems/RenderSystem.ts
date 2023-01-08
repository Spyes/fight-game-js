import { transform } from "typescript";
import { ctx } from "../../canvas";
import { Vector2 } from "../../types/Vector2";
import { OverlayComponent } from "../components/OverlayComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/EntityManager";
import { Entity } from "../entities/Entity";
import { System } from "./System";

export class RenderSystem extends System {
  public update(entityIds: string[], delta: number) {
    for (const entityId of entityIds) {
      const entity = EntityManager.getEntity(entityId);
      if (entity.components.Render) {
        const renderComp = entity.components.Render as RenderComponent;
        const transform = entity.components.Transform as TransformComponent;
        const parentTransform = EntityManager.getEntity(entity.parent)
          ? EntityManager.getEntity(entity.parent).components.Transform as TransformComponent
          : undefined;
        this.draw(transform, renderComp, parentTransform);
        if (renderComp.sprites) {
          this.animateFrames(renderComp, delta);
        }
      }
      if (entity.components.Overlay) {
        const overlayComp = entity.components.Overlay as OverlayComponent;
        const transform = entity.components.Transform as TransformComponent;
        const parentTransform = EntityManager.getEntity(entity.parent)
        ? EntityManager.getEntity(entity.parent).components.Transform as TransformComponent
        : undefined;
        this.drawOverlay(transform, overlayComp, parentTransform);
      }
    }
  }

  private drawOverlay(transform: TransformComponent, overlayComp: OverlayComponent, parentTransform?: TransformComponent) {
    ctx.fillStyle = overlayComp.toString();
    ctx.fillRect(
      (parentTransform?.position?.x || 0) + transform.position.x,
      (parentTransform?.position?.y || 0) + transform.position.y,
      overlayComp.width,
      overlayComp.height,
    );
  }

  private draw(transform: TransformComponent, renderComp: RenderComponent, parentTransform?: TransformComponent) {
    ctx.drawImage(
      renderComp.image,
      renderComp.frameCurrent * (renderComp.image.width / renderComp.framesMax),
      0,
      renderComp.image.width / renderComp.framesMax,
      renderComp.image.height,
      (parentTransform?.position?.x || 0) + transform.position.x - renderComp.offset.x,
      (parentTransform?.position?.y || 0) + transform.position.y - renderComp.offset.y,
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
