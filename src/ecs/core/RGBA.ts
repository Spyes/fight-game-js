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

  public get r() { return this._r; }
  public set r(r: number) { this._r = r; }
  public get g() { return this._g; }
  public set g(g: number) { this._g = g; }
  public get b() { return this._b; }
  public set b(b: number) { this._b = b; }
  public get a() { return this._a; }
  public set a(a: number) { this._a = a; }

  public toString() {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
  }
}