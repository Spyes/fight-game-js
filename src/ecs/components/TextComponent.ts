import { Component } from "./Component";
import { RGBA } from "../../types/RGBA";

interface ITextComponent {
  rgba: RGBA;
  text: string;
}

export class TextComponent extends Component {
  private _rgba: RGBA;
  private _text: string;

  constructor({ rgba, text }: ITextComponent) {
    super('Text', 'render');

    this._rgba = rgba;
    this._text = text;
  }

  public get rgba() { return this._rgba; }
  public set rgba(rgba: RGBA) { this._rgba = rgba; }

  public get text() { return this._text; }
  public set text(text: string) { this._text = text; }
}