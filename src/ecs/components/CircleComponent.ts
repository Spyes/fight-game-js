import { RGBA } from "../core/RGBA";
import { Component } from "./Component";

export class CircleComponent extends Component {
  _topic: string = 'render';
  private _rgba: RGBA;
  private _radius: number;

  constructor(rgba: RGBA, radius: number) {
    super('Circle');

    this._rgba = rgba;
    this._radius = radius;
  }

  public get rgba() { return this._rgba; }
  public get radius() { return this._radius; }
}