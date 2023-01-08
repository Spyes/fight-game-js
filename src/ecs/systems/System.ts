import { v4 } from "uuid";
import { Entity } from "../entities/Entity";

export abstract class System {
  _id = '';

  constructor() {
    this._id = v4();
  }

  public abstract update(entity: Entity[], delta: number): void;
}