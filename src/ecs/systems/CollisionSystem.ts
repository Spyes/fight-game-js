import { CollisionComponent } from "../components/CollisionComponent";
import { TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "../core/managers/EntityManager";
import { System } from "./System";

export class CollisionSystem extends System {
  constructor() {
    super('collision');
  }

  public update(delta: number) {
    for (const collisionCompA of this._components) {
      if (!collisionCompA.enabled) continue;
      for (const collisionCompB of this._components) {
        if (!collisionCompB.enabled || collisionCompA === collisionCompB) continue;
        if ((collisionCompA as CollisionComponent).layerMask.includes((collisionCompB as CollisionComponent).layer)) {
          const transformA = EntityManager.getEntity(collisionCompA.parent).components.Transform as TransformComponent;
          const transformB = EntityManager.getEntity(collisionCompB.parent).components.Transform as TransformComponent;
          if (this.collisionRect(
            collisionCompA as CollisionComponent,
            collisionCompB as CollisionComponent,
            transformA,
            transformB,
          )) {
            (collisionCompA as CollisionComponent).onCollide(collisionCompB as CollisionComponent);
          }
        }
      }
    }
  }

  private collisionRect(
    a: CollisionComponent,
    b: CollisionComponent,
    transformA: TransformComponent,
    transformB: TransformComponent,
  ): boolean {
    return transformA.position.x + a.width >= transformB.position.x
      && transformA.position.x <= transformB.position.x + b.width
      && transformA.position.y + a.height >= transformB.position.y
      && transformA.position.y <= transformB.position.y + b.height;
  }
}