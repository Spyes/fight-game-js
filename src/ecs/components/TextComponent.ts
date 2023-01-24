import { RGBA } from "../core/RGBA";
import { Component } from "./Component";

export interface ITextComponent {
  rgba: RGBA;
  text: string;
  font: string;
  align?: CanvasTextAlign;
}

export class TextComponent extends Component {
  _topic: string = 'render';
  private _rgba: RGBA;
  private _text: string;
  private _font: string;

  constructor({ rgba, text, font }: ITextComponent) {
    super('Text');

    this._rgba = rgba;
    this._text = text;
    this._font = font;
  }

  public get rgba() { return this._rgba; }
  public set rgba(rgba: RGBA) { this._rgba = rgba; }

  public get text() { return this._text; }
  public set text(text: string) { this._text = text; }

  public get font() { return this._font; }
  public set font(font: string) { this._font = font; }
}