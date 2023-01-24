import React, { useState } from 'react';
import { Entity } from '../ecs/core/Entity';
import { EntityManager } from '../ecs/core/managers/EntityManager';
import { Canvas } from './Canvas';
import './editor.css';
import { HierarchyPanel } from './HierarchyPanel';
import { InfoPanel } from './InfoPanel';

export function Editor() {
  const [entities, setEntities] = useState<Entity['id'][]>(EntityManager.entityIds);
  const [selectedEntity, setSelectedEntity] = useState<Entity['id']>('');

  const addEntity = () => {
    EntityManager.createEntity({});
    setEntities(EntityManager.entityIds);
  }

  return (
    <div className='editor-container'>
      <HierarchyPanel entities={entities} addEntity={addEntity} setSelectedEntity={setSelectedEntity} selectedEntityId={selectedEntity} />
      <InfoPanel selectedEntity={selectedEntity} />
    </div>
  );
}