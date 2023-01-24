import React from 'react';
import { Entity as CEntity } from '../ecs/core/Entity';
import { Entity } from './Entity';

interface IProps {
  entities: CEntity['id'][];
  addEntity: () => void;
  setSelectedEntity: (entityId: CEntity['id']) => void;
  selectedEntityId: string;
}

export function HierarchyPanel({ entities, addEntity, setSelectedEntity, selectedEntityId }: IProps) {
  return (
    <div className='panel left'>
      <button onClick={addEntity}>Add Entity</button>
      {entities.map(entityId => (
        <div key={entityId}>
          <Entity entityId={entityId} onClick={setSelectedEntity} selected={selectedEntityId === entityId} />
        </div>
      ))}
    </div>
  );
}