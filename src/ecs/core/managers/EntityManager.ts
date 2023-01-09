import { ITransform } from "../../components/TransformComponent";
import { Entity } from "../Entity";

interface ICreateEntity {
  entity?: Entity;
}

export class EntityManager {
  private static _entities: Record<string, Entity> = {};
  private static _entityIds: string[] = [];

  public static get entityIds(): string[] { return EntityManager._entityIds; }
  public static get entities(): Record<string, Entity> { return EntityManager._entities; }

  public static createEntity({ entity, position, scale }: ICreateEntity & ITransform = {}): Entity {
    const newEntity = entity || new Entity({ position, scale });
    EntityManager.entityIds.push(newEntity.id);
    EntityManager.entities[newEntity.id] = newEntity as Entity;
    return newEntity;
  }

  public static getEntity(entityId: string): Entity {
    return EntityManager.entities[entityId];
  }
}