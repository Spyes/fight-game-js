import { v4 } from "uuid";
import { Entity } from "../entities/Entity";

export class Component {
  private _id: string = '';
  private _name: string = '';
  private _parent: Entity | undefined = undefined;

  constructor(name: string) {
    this._id = v4();
    this._name = name;
  }

  public get id() { return this._id; }
  public get name() { return this._name; }
  public get parent(): Entity | undefined { return this._parent; }

  public set name(name: string) { this._name = name; }
  public set parent(parent: Entity | undefined) { this._parent = parent; }
}