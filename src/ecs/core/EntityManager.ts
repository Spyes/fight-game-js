import { ITransform } from "../components/TransformComponent";
import { Entity } from "../entities/Entity";

interface ICreateEntity {
  entity?: Entity;
}

export class EntityManager {
  private static _entities: Entity[] = [];

  public static get entities(): Entity[] { return EntityManager._entities; }

  public static createEntity({ entity, position, scale }: ICreateEntity & ITransform = {}): Entity {
    const newEntity = entity || new Entity({ position, scale });
    EntityManager.entities.push(newEntity);
    return newEntity;
  }  
}