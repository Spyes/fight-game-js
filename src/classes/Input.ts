import { Keys } from "../types/Keys";

export class Input {
  public static keys: Keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowUp: {
      pressed: false,
    },
    ArrowDown: {
      pressed: false,
    },
  };

  static onKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyD':
        Input.keys.d.pressed = true;
        break;
      case 'KeyA':
        Input.keys.a.pressed = true;
        break;
      case 'KeyW':
        Input.keys.w.pressed = true;
        break;
      case 'Space':
        Input.keys.space.pressed = true;
        break;
      case 'ArrowRight':
        Input.keys.ArrowRight.pressed = true;
        break;
      case 'ArrowLeft':
        Input.keys.ArrowLeft.pressed = true;
        break;
      case 'ArrowUp':
        Input.keys.ArrowUp.pressed = true;
        break;
      case 'ArrowDown':
        Input.keys.ArrowDown.pressed = true;
        break;
    }
  }

  static onKeyUp(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyD':
        Input.keys.d.pressed = false;
        break;
      case 'KeyA':
        Input.keys.a.pressed = false;
        break;
      case 'KeyW':
        Input.keys.w.pressed = false;
        break;
      case 'Space':
        Input.keys.space.pressed = false;
        break;
      case 'ArrowRight':
        Input.keys.ArrowRight.pressed = false;
        break;
      case 'ArrowLeft':
        Input.keys.ArrowLeft.pressed = false;
        break;
      case 'ArrowUp':
        Input.keys.ArrowUp.pressed = false;
        break;
      case 'ArrowDown':
        Input.keys.ArrowDown.pressed = false;
        break;
    }
  }

  static StartInput() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  static StopInput() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    Object.keys(this.keys).forEach(key => this.keys[key].pressed = false);
  }
}