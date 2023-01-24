import React from 'react';
import { Vector2 as CVector2 } from '../../ecs/core/Vector2';

interface IProps {
  title: string;
  vector: CVector2;
  onChange: (name: 'x' | 'y', value: number) => void;
}

export function Vector2({ title, vector, onChange }: IProps) {
  return (
    <div>
      <div>
        <div>{title}</div>
        <label>X:</label>
        <input type="number" defaultValue={vector.x} onChange={({ target: { value } }) => onChange('x', parseInt(value, 10))} />
        <label>Y:</label>
        <input type="number" defaultValue={vector.y} onChange={({ target: { value } }) => onChange('y', parseInt(value, 10))} />
      </div>
    </div>
  );
}