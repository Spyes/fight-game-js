import { ctx } from "../../canvas";
import { CircleComponent } from "../components/CircleComponent";
import { OverlayComponent } from "../components/OverlayComponent";
import { RenderComponent } from "../components/RenderComponent";
import { TextComponent } from "../components/TextComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/managers/EntityManager";
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
        const renderComp = component as RenderComponent;
        this.draw(transform, renderComp, parentTransform);
        if (renderComp.sprites) {
          this.animateFrames(renderComp, delta);
        }
      }
      if (component.name === 'Overlay') {
        const overlayComp = component as OverlayComponent;
        this.drawOverlay(transform, overlayComp, parentTransform);
      }
      if (component.name === 'Circle') {
        const circleComp = component as CircleComponent;
        this.drawCircle(transform, circleComp, parentTransform);
      }
      if (component.name === 'Text') {
        const textComp = component as TextComponent;
        this.drawText(transform, textComp, parentTransform);
      }
    }
  }

  private drawText(transform: TransformComponent, textComp: TextComponent, parentTransform?: TransformComponent) {
    ctx.fillStyle = textComp.rgba.toString();
    ctx.font = textComp.font;
    ctx.fillText(
      textComp.text,
      (parentTransform?.position?.x || 0) + transform.position.x,
      (parentTransform?.position?.y || 0) + transform.position.y,
    );
  }

  private drawCircle(transform: TransformComponent, circleComp: CircleComponent, parentTransform?: TransformComponent) { 
    ctx.fillStyle = circleComp.rgba.toString();
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
    ctx.fillStyle = overlayComp.rgba.toString();
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
