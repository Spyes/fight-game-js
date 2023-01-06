import { Fighter } from "../classes/Fighter";

export function collisionRect(a: Fighter, b: Fighter): boolean {
  return a.attackBox.position.x + a.attackBox.width >= b.position.x
    && a.attackBox.position.x <= b.position.x + b.width
    && a.attackBox.position.y + a.attackBox.height >= b.position.y
    && a.attackBox.position.y <= b.position.y + b.height;
}
