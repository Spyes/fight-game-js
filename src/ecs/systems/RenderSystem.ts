import { ctx } from "../../canvas";
import { CircleComponent } from "../components/CircleComponent";
import { OverlayComponent } from "../components/OverlayComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/EntityManager";
import { System } from "./System";

export class RenderSystem extends System {
  constructor() {
    super('render');
  }

  public update(delta: number) {
    for (const component of this._components) {
      const entity = EntityManager.getEntity(component.parent);
      const transform = entity.transform as TransformComponent;
      const parentTransform = EntityManager.getEntity(entity.parent)
        ? EntityManager.getEntity(entity.parent).transform as TransformComponent
        : undefined;

        if (component.name === 'Render') {
        const renderComp = entity.components.Render as RenderComponent;
        this.draw(transform, renderComp, parentTransform);
        if (renderComp.sprites) {
          this.animateFrames(renderComp, delta);
        }
      }
      if (component.name === 'Overlay') {
        const overlayComp = entity.components.Overlay as OverlayComponent;
        this.drawOverlay(transform, overlayComp, parentTransform);
      }
      if (component.name === 'Circle') {
        const circleComp = entity.components.Circle as CircleComponent;
        this.drawCircle(transform, circleComp, parentTransform);
      }
    }
  }

  private drawCircle(transform: TransformComponent, circleComp: CircleComponent, parentTransform?: TransformComponent) { 
    ctx.fillStyle = circleComp.toString();
    ctx.beginPath();
    ctx.arc(
      (parentTransform?.position?.x || 0) + transform.position.x,
      (parentTransform?.position?.y || 0) + transform.position.y,
      circleComp.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
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
