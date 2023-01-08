import { v4 } from "uuid";
import { PubSub } from "../../classes/PubSub";
import { Component } from "../components/Component";
import { ITransform, TransformComponent } from "../components/TransformComponent";

export class Entity {
  private _id: string = '';
  private _components: Record<string, Component> = {};
  private _children: Entity[] = [];
  private _parent: Entity | undefined;

  public get id() { return this._id; }
  public get components() { return this._components; }
  public get children() { return this._children; }
  public get parent(): Entity | undefined { return this._parent; }
  public set parent(parent: Entity | undefined) { this._parent = parent; }

  constructor({ position, scale }: ITransform) {
    this._id = v4();
    this.addComponent(new TransformComponent({ position, scale }));
  }

  public addComponent(component: Component) {
    this._components[component.name] = component;
    this._components[component.name].parent = this;
  }

  public removeComponent(component: Component) {
    this._components[component.name].parent = undefined;
    delete this._components[component.name];
  }

  public addChild(entity: Entity) {
    this._children.push(entity);
    entity.parent = this;
  }

  public removeChild(entity: Entity) {
    const index = this._children.findIndex(child => child.id === entity.id);
    this._children.splice(index, 1);
    entity.parent = undefined;
  }

  public update(delta: number) {}
}