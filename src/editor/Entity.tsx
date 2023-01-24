import React from 'react';
import { Entity as CEntity } from '../ecs/core/Entity';
import { EntityManager } from '../ecs/core/managers/EntityManager';

interface IProps {
  entityId: CEntity['id'];
  onClick: (entityId: CEntity['id']) => void;
  selected: boolean;
}

export function Entity({ entityId, onClick, selected }: IProps) {
  const entity: CEntity = EntityManager.getEntity(entityId);
  return (
    <div onClick={() => onClick(entityId)}>
      {selected ? '> ' : (<span>&nbsp;&nbsp;</span>)}
      { entity.name }
    </div>
  );
}