import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { Editor } from './editor/Editor';
import { FightingGame } from "./ecs/Examples/FightingGame/FightingGame";
import { Pong } from "./ecs/Examples/Pong/Pong";

// Pong();
FightingGame();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
