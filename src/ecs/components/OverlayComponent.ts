import { RGBA } from "../core/RGBA";
import { Component } from "./Component";

export class OverlayComponent extends Component {
  _topic: string = 'render';
  private _rgba: RGBA;
  private _width: number;
  private _height: number;

  constructor(rgba: RGBA, width: number, height: number) {
    super('Overlay');

    this._rgba = rgba;
    this._width = width;
    this._height = height;
  }

  public get rgba() { return this._rgba; }
  public get width() { return this._width; }
  public get height() { return this._height; }

  public set width(width: number) { this._width = width; }
  public set height(height: number) { this._height = height; }
}