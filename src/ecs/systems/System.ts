import { v4 } from "uuid";
import { PubSub } from "../core/PubSub";
import { Component } from "../components/Component";

export abstract class System {
  _id = '';
  _components: Component[];

  constructor(topic: string) {
    this._id = v4();
    this._components = [];
    PubSub.subscribe(topic, (...args) => this.onComponentCreated(...args));
  }

  public abstract update(delta: number): void;

  public onComponentCreated(...args: any): void {
    const [action, component] = args;
    if (action === 'created') {
      this._components.push(component);
    }
  }
}