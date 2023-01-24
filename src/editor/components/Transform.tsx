import React from 'react';
import { TransformComponent } from '../../ecs/components/TransformComponent';
import { Component } from './Component';
import { Vector2 } from './Vector2';

interface IProps {
  transform: TransformComponent;
}

export function Transform({ transform }: IProps): JSX.Element {
  const onChange = (property: 'position' | 'scale') => (name: 'x' | 'y', value: number): void => {
    transform[property][name] = value;
  }

  const onChangeTransform = onChange('position');
  const onChangeScale = onChange('scale');

  return (
    <div>
      <div>{transform.name}</div>
      <hr />
      <Vector2 title="Position" vector={transform.position} onChange={onChangeTransform} />
      <Vector2 title="Scale" vector={transform.scale} onChange={onChangeScale} />
    </div>
  )
}