import { RGBA } from "../../types/RGBA";
import { Component } from "./Component";

export class CircleComponent extends Component {
  private _rgba: RGBA;
  private _radius: number;

  constructor(rgba: RGBA, radius: number) {
    super('Circle', 'render');

    this._rgba = rgba;
    this._radius = radius;
  }

  public get radius() { return this._radius; }

  public toString(): string {
    return `rgba(${this._rgba.r}, ${this._rgba.g}, ${this._rgba.b}, ${this._rgba.a})`
  }
}