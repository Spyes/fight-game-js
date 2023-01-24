import React from 'react';
import { Component as CComponent } from "../../ecs/components/Component";
import { OverlayComponent } from '../../ecs/components/OverlayComponent';
import { TransformComponent } from "../../ecs/components/TransformComponent";
import { Overlay } from './Overlay';
import { Transform } from "./Transform";

interface IProps {
  component: CComponent;
}

export function Component({ component }: IProps): JSX.Element {
  switch (component.name) {
    case 'Transform':
      return <Transform transform={component as TransformComponent} />;
    case 'Overlay':
      return <Overlay overlay={component as OverlayComponent} />
  }
  return (<div></div>);
}