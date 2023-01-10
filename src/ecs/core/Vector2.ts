export class Vector2 {
  _x: number;
  _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public static get Zero() { return new Vector2(0, 0); }
  public static get One() { return new Vector2(1, 1); } 
  public static get Right() { return new Vector2(1, 0); }
  public static get Left() { return new Vector2(-1, 0); }
  public static get Up() { return new Vector2(0, -1); }
  public static get Down() { return new Vector2(0, 1); }

  public static add(a: Vector2, b: Vector2 | number): Vector2 {
    if (typeof b === 'number') {
      return new Vector2(
        a.x + b,
        a.y + b,
      );
    }

    return new Vector2(
      a.x + b.x,
      a.y + b.y,
    );
  }

  public static sub(a: Vector2, b: Vector2 | number): Vector2 {
    if (typeof b === 'number') {
      return new Vector2(
        a.x - b,
        a.y - b,
      );
    }

    return new Vector2(
      a.x - b.x,
      a.y - b.y,
    );
  }

  public static mult(a: Vector2, b: Vector2 | number): Vector2 {
    if (typeof b === 'number') {
      return new Vector2(
        a.x * b,
        a.y * b,
      );
    }

    return new Vector2(
      a.x * b.x,
      a.y * b.y,
    );
  }

  public static div(a: Vector2, b: Vector2 | number): Vector2 {
    if (typeof b === 'number') {
      if (b === 0) throw new Error('Cannot divide by zero');
      return new Vector2(
        a.x / b,
        a.y / b,
      );
    }

    if (b.x === 0 || b.y === 0) throw new Error('Cannot divid by zero');
    return new Vector2(
      a.x / b.x,
      a.y / b.y,
    );
  }

  public get x() { return this._x; }
  public set x(x: number) { this._x = x; }

  public get y() { return this._y; }
  public set y(y: number) { this._y = y; }
}
