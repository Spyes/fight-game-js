import { v4 } from "uuid";

export abstract class Component {
  private _id: string = '';
  private _name: string = '';
  private _parent: string = '';
  private _enabled: boolean = true;
  protected _exposed: string[] = [];
  readonly abstract _topic: string;

  constructor(name: string) {
    this._id = v4();
    this._name = name;
  }

  public get id() { return this._id; }
  public get name() { return this._name; }
  public get parent() { return this._parent; }
  public get topic() { return this._topic; }
  public get enabled() { return this._enabled; }
  public get exposed() { return this._exposed; };

  public set name(name: string) { this._name = name; }
  public set parent(parent: string) { this._parent = parent; }
  public set enabled(enabled: boolean) { this._enabled = enabled; }
}