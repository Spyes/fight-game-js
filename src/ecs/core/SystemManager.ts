import { System } from "../systems/System";

export class SystemManager {
  private static _systems: System[] = [];

  public static get systems(): System[] { return SystemManager._systems; }
}