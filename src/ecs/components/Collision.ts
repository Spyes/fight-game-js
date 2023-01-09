import { BoxCollisionComponent } from "./BoxCollisionComponent";

export abstract class Collision {
  public abstract onCollide(hit: BoxCollisionComponent): void;
}