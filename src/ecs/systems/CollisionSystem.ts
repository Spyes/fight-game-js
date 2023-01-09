import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { Collision } from "../components/Collision";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/managers/EntityManager";
import { System } from "./System";

export class CollisionSystem extends System {
  constructor() {
    super('collision');
  }

  public update(delta: number) {
    for (const componentA of this._components) {
      const entityA = EntityManager.getEntity(componentA.parent);
      const parentTransformA = entityA.transform as TransformComponent;
      for (const componentB of this._components) {
        const entityB = EntityManager.getEntity(componentB.parent);
        if (entityA !== entityB) {
          const parentTransformB = entityB.transform as TransformComponent
          if (this.collisionRect(
            componentA as BoxCollisionComponent,
            componentB as BoxCollisionComponent,
            parentTransformA,
            parentTransformB
          )) {
            const collision = (entityA as unknown) as Collision;
            if (collision.onCollide) {
              collision.onCollide(componentB as BoxCollisionComponent);
            }
          }
        }
      }
    }
  }

  private collisionRect(
    a: BoxCollisionComponent,
    b: BoxCollisionComponent,
    parentTransformA?: TransformComponent,
    parentTransformB?: TransformComponent,
  ): boolean {
    return (parentTransformA?.position?.x || 0) + a.position.x + a.width >= (parentTransformB?.position?.x || 0) + b.position.x
      && (parentTransformA?.position?.x || 0) + a.position.x <= (parentTransformB?.position?.x || 0) + b.position.x + b.width
      && (parentTransformA?.position?.y || 0) + a.position.y + a.height >= (parentTransformB?.position?.y || 0) + b.position.y
      && (parentTransformA?.position?.y || 0) + a.position.y <= (parentTransformB?.position?.y || 0) + b.position.y + b.height;
  }
}