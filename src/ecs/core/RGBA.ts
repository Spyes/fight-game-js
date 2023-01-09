export class RGBA {
  _r: number;
  _g: number;
  _b: number;
  _a: number;

  constructor(r: number, g: number, b: number, a: number = 1) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
  }

  public static get White() { return new RGBA(255, 255, 255, 1); }
  public static get Black() { return new RGBA(0, 0, 0, 1); }

  public toString() {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
  }
}