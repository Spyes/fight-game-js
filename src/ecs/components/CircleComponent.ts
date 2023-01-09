import { RGBA } from "../core/RGBA";
import { Component } from "./Component";

export class CircleComponent extends Component {
  private _rgba: RGBA;
  private _radius: number;

  constructor(rgba: RGBA, radius: number) {
    super('Circle', 'render');

    this._rgba = rgba;
    this._radius = radius;
  }

  public get rgba() { return this._rgba; }
  public get radius() { return this._radius; }
}