import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/EntityManager";
import { Entity } from "../entities/Entity";
import { System } from "./System";

export class CollisionSystem extends System {
  public update(entityIds: string[], delta: number) {
    for (const entityIdA of entityIds) {
      const entityA = EntityManager.getEntity(entityIdA);
      if (entityA.components.BoxCollision) {
        const boxCollisionA = entityA.components.BoxCollision as BoxCollisionComponent;
        const parentTransformA = EntityManager.getEntity(entityA.parent)
          ? EntityManager.getEntity(entityA.parent).components.Transform as TransformComponent
          : undefined;
        for (const entityIdB of entityIds) {
          const entityB = EntityManager.getEntity(entityIdB);
          if (entityA !== entityB && entityB.components.BoxCollision) {
            const boxCollisionB = entityB.components.BoxCollision as BoxCollisionComponent;
            const parentTransformB = EntityManager.getEntity(entityB.parent)
            ? EntityManager.getEntity(entityB.parent).components.Transform as TransformComponent
            : undefined;  
            if (this.collisionRect(boxCollisionA, boxCollisionB, parentTransformA, parentTransformB)) console.log('we have a collision!!');
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