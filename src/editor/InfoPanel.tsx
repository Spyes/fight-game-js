import React, { useState } from 'react';
import { Component as CComponent } from '../ecs/components/Component';
import { OverlayComponent } from '../ecs/components/OverlayComponent';
import { Entity as CEntity } from '../ecs/core/Entity';
import { EntityManager } from '../ecs/core/managers/EntityManager';
import { RGBA } from '../ecs/core/RGBA';
import { Component } from './components/Component';
import { Entity } from './Entity';

interface IProps {
  selectedEntity?: CEntity['id'];
}

export function InfoPanel({ selectedEntity }: IProps) {
  const [component, setSelectedComponent] = useState('overlay');

  const addComponent = () => {
    let componentClass: CComponent;
    switch (component) {
      case 'overlay':
        entity.addComponent(new OverlayComponent(
          RGBA.White,
          10,
          10,
        ));
        break;
    }
  }

  if (!selectedEntity) return (
    <div>Select an Entity</div>
  );

  const entity: CEntity = EntityManager.getEntity(selectedEntity);

  return (
    <div className='panel'>
      {Object.keys(entity.components).map(componentId => (
        <Component
          key={entity.components[componentId].id}
          component={entity.components[componentId]}
        />
      ))}
      <select value={component} onChange={({ target: { value } }) => setSelectedComponent(value)}>
      <option value="overlay">Overlay</option>
      </select>
      <button onClick={addComponent}>Add Component</button>
    </div>
  );
}