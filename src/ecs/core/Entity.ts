import { v4 } from "uuid";
import { Component } from "../components/Component";
import { ITransform, TransformComponent } from "../components/TransformComponent";
import { EntityManager } from "./managers/EntityManager";
import { PubSub } from "./PubSub";

export class Entity {
  private _id: string = '';
  private _name: string = '';
  private _components: Record<string, Component> = {};
  private _componentsB: Component[] = [];
  private _parent: string = '';
  private _transform: TransformComponent;

  public get id() { return this._id; }
  public get name() { return this._name; }
  public set name(name: string) { this._name = name; }
  public get components() { return this._components; }
  public get parent(): string { return this._parent; }
  public set parent(parent: string) { this._parent = parent; }
  public get transform() { return this._transform; }

  constructor({ position, scale, name }: ITransform & { name: string }) {
    this._id = v4();
    this._name = name;
    const transformComp = new TransformComponent({ position, scale });
    this.addComponent(transformComp);
    this._transform = transformComp;
  }

  public addComponent(component: Component) {
    component.parent = this.id;
    this._components[component.name] = component;
    this._componentsB.push(component);
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

  public getParent(): Entity {
    return EntityManager.getEntity(this.parent);
  }

  public getChild(childName: string): Entity | undefined {
    const children = Object.values(EntityManager.entities).filter(({ parent }) => parent === this.id);
    return children.find(entity => entity.name === childName);
  }

  public update(delta: number) {}
}