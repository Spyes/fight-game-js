import { Keys } from "../../types/Keys";
import { Settings } from "../../classes/Settings";
import { Vector2 } from "./Vector2";
import { PubSub } from "./PubSub";

// TURN INTO A PROPER SYSTEM

export class Input {
  public static keys: Keys = Settings.availableKeys.reduce((acc: Keys, key: string): Keys => {
    acc[key] = { pressed: false };
    return acc;
  }, {});

  private static onKeyDown(event: KeyboardEvent): void {
    if (Input.keys[event.code]) Input.keys[event.code].pressed = true;
  }

  private static onKeyUp(event: KeyboardEvent): void {
    if (Input.keys[event.code]) Input.keys[event.code].pressed = false;
  }

  private static onMouseDown(event: MouseEvent): void {
    PubSub.publish('input', [new Vector2(event.x, event.y)]);
  }

  public static startInput() {
    window.addEventListener('keydown', Input.onKeyDown);
    window.addEventListener('keyup', Input.onKeyUp);
    window.addEventListener('mousedown', Input.onMouseDown);
  }

  public static stopInput() {
    window.removeEventListener('keydown', Input.onKeyDown);
    window.removeEventListener('keyup', Input.onKeyUp);
    Object.keys(Input.keys).forEach(key => Input.keys[key].pressed = false);
  }
}