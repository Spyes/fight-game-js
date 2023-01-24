import React from 'react';
import { RGBA as CRGBA } from '../../ecs/core/RGBA';

interface IProps {
  title: string;
  rgba: CRGBA;
  onChange: (name: 'r' | 'g' | 'b' | 'a', value: number) => void;
}

export function RGBA({ title, rgba, onChange }: IProps) {
  return (
    <div>
      <div>
        <div>{title}</div>
        <label>R:</label>
        <input type="number" defaultValue={rgba.r} onChange={({ target: { value } }) => onChange('r', parseInt(value, 10))} />
        <label>G:</label>
        <input type="number" defaultValue={rgba.g} onChange={({ target: { value } }) => onChange('g', parseInt(value, 10))} />
        <label>B:</label>
        <input type="number" defaultValue={rgba.b} onChange={({ target: { value } }) => onChange('b', parseInt(value, 10))} />
        <label>A:</label>
        <input type="number" defaultValue={rgba.a} onChange={({ target: { value } }) => onChange('a', parseInt(value, 10))} />
      </div>
    </div>
  );
}