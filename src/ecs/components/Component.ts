import { v4 } from "uuid";

export class Component {
  private _id: string = '';
  private _name: string = '';
  private _parent: string = '';
  private _topic: string = '';

  constructor(name: string, topic: string) {
    this._id = v4();
    this._name = name;
    this._topic = topic;
  }

  public get id() { return this._id; }
  public get name() { return this._name; }
  public get parent() { return this._parent; }
  public get topic() { return this._topic; }

  public set name(name: string) { this._name = name; }
  public set parent(parent: string) { this._parent = parent; }
}