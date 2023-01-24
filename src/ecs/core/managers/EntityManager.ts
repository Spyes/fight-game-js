import { ITransform } from "../../components/TransformComponent";
import { Entity } from "../Entity";

interface ICreateEntity {
  name?: string;
  entity?: Entity;
}

export class EntityManager {
  private static _entities: Record<string, Entity> = {};
  private static _entityIds: string[] = [];

  public static get entityIds(): string[] { return EntityManager._entityIds; }
  public static get entities(): Record<string, Entity> { return EntityManager._entities; }

  public static createEntity({ entity, position, scale, name }: ICreateEntity & ITransform = {}): Entity {
    const entityName = name || `Entity ${this.entityIds.length + 1}`;
    const newEntity = entity || new Entity({ position, scale, name: entityName });
    EntityManager.entityIds.push(newEntity.id);
    EntityManager.entities[newEntity.id] = newEntity as Entity;
    return newEntity;
  }

  public static getEntity(entityId: string): Entity {
    return EntityManager.entities[entityId];
  }
}