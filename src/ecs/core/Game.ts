import { Input } from "./Input";
import { Timing } from "./Timing";

export class Game {
  public static startGame() {
    Timing.startTiming();
    Input.startInput();
  }

  public static stopGame() {
    Timing.stopTiming();
    Input.stopInput();
  }
}
