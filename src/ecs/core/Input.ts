import { Keys } from "../../types/Keys";
import { Settings } from "../../classes/Settings";

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

  public static startInput() {
    window.addEventListener('keydown', Input.onKeyDown);
    window.addEventListener('keyup', Input.onKeyUp);
  }

  public static stopInput() {
    window.removeEventListener('keydown', Input.onKeyDown);
    window.removeEventListener('keyup', Input.onKeyUp);
    Object.keys(Input.keys).forEach(key => Input.keys[key].pressed = false);
  }
}