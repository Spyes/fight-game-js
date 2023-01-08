import { BoxCollisionComponent } from "../components/BoxCollisionComponent";
import { Entity } from "../entities/Entity";
import { System } from "./System";

export class CollisionSystem extends System {
  public update(entities: Entity[], delta: number) {
    this.checkCollision(entities, entities, delta);
  }

  private checkCollision(entitiesA: Entity[], entitiesB: Entity[], delta: number, parent?: Entity) {
    for (const entityA of entitiesA) {
      if (entityA.components.BoxCollision) {
        const boxCollisionA = entityA.components.BoxCollision as BoxCollisionComponent;
        for (const entityB of entitiesB) {
          if (entityA !== entityB && entityB !== parent && entityB.components.BoxCollision) {
            const boxCollisionB = entityB.components.BoxCollision as BoxCollisionComponent;
            if (this.collisionRect(boxCollisionA, boxCollisionB)) console.log('we have a collision!!');
          }
          if (entityB.children.length) {
            this.checkCollision([entityA], entityB.children, delta);
          }
        }
      }
      if (entityA.children.length) {
        this.checkCollision(entityA.children, entitiesB, delta, entityA);
      }
    }
  }

  private collisionRect(a: BoxCollisionComponent, b: BoxCollisionComponent): boolean {
    return a.position.x + a.width >= b.position.x
      && a.position.x <= b.position.x + b.width
      && a.position.y + a.height >= b.position.y
      && a.position.y <= b.position.y + b.height;
  }
}