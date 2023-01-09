import { v4 } from "uuid";
import { Component } from "../components/Component";
import { ITransform, TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "./EntityManager";
import { PubSub } from "./PubSub";

export class Entity {
  private _id: string = '';
  private _components: Record<string, Component> = {};
  private _parent: string = '';

  public get id() { return this._id; }
  public get components() { return this._components; }
  public get parent(): string { return this._parent; }
  public set parent(parent: string) { this._parent = parent; }

  constructor({ position, scale }: ITransform) {
    this._id = v4();
    this.addComponent(new TransformComponent({ position, scale }));
  }

  public addComponent(component: Component) {
    this._components[component.name] = component;
    this._components[component.name].parent = this.id;
    PubSub.publish(component.topic, ['created', component]);
  }

  public removeComponent(component: Component) {
    this._components[component.name].parent = '';
    PubSub.publish(component.topic, ['destroyed', component]);
    delete this._components[component.name];
  }

  public addChild(entity: Entity) {
    entity.parent = this.id;
  }

  public removeChild(entity: Entity) {
    entity.parent = '';
  }

  public getParent() {
    return EntityManager.getEntity(this.parent);
  }

  public update(delta: number) {}
}