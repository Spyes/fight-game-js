import { Keys } from "../types/Keys";
import { Settings } from "./Settings";

export class Input {
  public static keys: Keys = Settings.availableKeys.reduce((acc: Keys, key: string): Keys => {
    acc[key] = { pressed: false };
    return acc;
  }, {});

  static onKeyDown(event: KeyboardEvent): void {
    if (Input.keys[event.code]) Input.keys[event.code].pressed = true;
  }

  static onKeyUp(event: KeyboardEvent): void {
    if (Input.keys[event.code]) Input.keys[event.code].pressed = false;
  }

  static StartInput() {
    window.addEventListener('keydown', Input.onKeyDown);
    window.addEventListener('keyup', Input.onKeyUp);
  }

  static StopInput() {
    window.removeEventListener('keydown', Input.onKeyDown);
    window.removeEventListener('keyup', Input.onKeyUp);
    Object.keys(Input.keys).forEach(key => Input.keys[key].pressed = false);
  }
}