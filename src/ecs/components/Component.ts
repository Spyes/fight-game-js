import { v4 } from "uuid";

export class Component {
  private _id: string = '';
  private _name: string = '';
  private _parent: string = '';

  constructor(name: string) {
    this._id = v4();
    this._name = name;
  }

  public get id() { return this._id; }
  public get name() { return this._name; }
  public get parent(): string { return this._parent; }

  public set name(name: string) { this._name = name; }
  public set parent(parent: string) { this._parent = parent; }
}