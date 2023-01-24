import React from 'react';
import { OverlayComponent } from '../../ecs/components/OverlayComponent';
import { RGBA } from './RGBA';

interface IProps {
  overlay: OverlayComponent;
}

export function Overlay({ overlay }: IProps) {
  const onChange = (name: 'r' | 'g' | 'b' | 'a' | 'width' | 'height', value: number): void => {
    switch (name) {
      case 'width':
        overlay.width = value;
        break;
      case 'height':
        overlay.height = value;
        break;
      default:
        overlay.rgba[name] = value;
        break;
    }
  }

  return (
    <div>
      <div>{overlay.name}</div>
      <hr/>
      <div>
        <RGBA title="RGBA" rgba={overlay.rgba} onChange={onChange} />
        <label>Width:</label>
        <input
          type="number"
          value={overlay.width}
          onChange={({ target: { value } }) => onChange('width', parseInt(value, 10))}
        />
        <label>Height:</label>
        <input
          type="number"
          value={overlay.height}
          onChange={({ target: { value } }) => onChange('height', parseInt(value, 10))}
        />
      </div>
    </div>
  )
}