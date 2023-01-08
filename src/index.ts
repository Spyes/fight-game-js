// import './index.css';
// // import reportWebVitals from './reportWebVitals';

import { FightingGame } from "./ecs/FightingGame/FightingGame";

// import { Fighter } from './classes/Fighter';
// import { canvas, ctx } from './canvas';
// import { Sprite } from './classes/Sprite';
// import { collisionRect } from './utils/collsionRect';
// import gsap from 'gsap';
// import { Input } from './classes/Input';

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// const background = new Sprite('./img/background.png');

// const shop = new Sprite(
//   './img/shop.png',
//   {
//     x: 600,
//     y: 128,
//   },
//   2.75,
//   { x: 0, y: 0 },
//   6,
// );

// const player = new Fighter({
//   name: 'Samurai Mack',
//   position: {
//     x: 0,
//     y: 0,
//   },
//   velocity: {
//     x: 0,
//     y: 0,
//   },
//   imageSrc: './img/SamuraiMack/Idle.png',
//   framesMax: 8,
//   scale: 2.5,
//   attackBox: {
//     offset: {
//       x: 80,
//       y: 40,
//     },
//     width: 175,
//   },
//   offset: {
//     x: 215,
//     y: 155,
//   },
//   sprites: {
//     idle: {
//       imageSrc: './img/SamuraiMack/Idle.png',
//       framesMax: 8,
//     },
//     run: {
//       imageSrc: './img/SamuraiMack/Run.png',
//       framesMax: 8,
//     },
//     jump: {
//       imageSrc: './img/SamuraiMack/Jump.png',
//       framesMax: 2,
//     },
//     fall: {
//       imageSrc: './img/SamuraiMack/Fall.png',
//       framesMax: 2,
//     },
//     attack1: {
//       imageSrc: './img/SamuraiMack/Attack1.png',
//       framesMax: 6,
//     },
//     takeHit: {
//       imageSrc: './img/SamuraiMack/Take Hit - white silhouette.png',
//       framesMax: 4,
//     },
//     death: {
//       imageSrc: './img/SamuraiMack/Death.png',
//       framesMax: 6,
//     },
//   },
//   keyMapping: {
//     left: 'KeyA',
//     right: 'KeyD',
//     jump: 'KeyW',
//     attack: 'Space',
//   },
// });

// const enemy = new Fighter({
//   name: 'Kenji',
//   position: {
//     x: 400,
//     y: 0,
//   },
//   velocity: {
//     x: 0,
//     y: 0,
//   },
//   imageSrc: './img/Kenji/Idle.png',
//   framesMax: 4,
//   scale: 2.5,
//   attackBox: {
//     offset: {
//       x: -170,
//       y: 40,
//     },
//     width: 170,
//   },
//   offset: {
//     x: 215,
//     y: 167,
//   },
//   sprites: {
//     idle: {
//       imageSrc: './img/Kenji/Idle.png',
//       framesMax: 4,
//     },
//     run: {
//       imageSrc: './img/Kenji/Run.png',
//       framesMax: 8,
//     },
//     jump: {
//       imageSrc: './img/Kenji/Jump.png',
//       framesMax: 2,
//     },
//     fall: {
//       imageSrc: './img/Kenji/Fall.png',
//       framesMax: 2,
//     },
//     attack1: {
//       imageSrc: './img/Kenji/Attack1.png',
//       framesMax: 4,
//     },
//     takeHit: {
//       imageSrc: './img/Kenji/Take hit.png',
//       framesMax: 3,
//     },
//     death: {
//       imageSrc: './img/Kenji/Death.png',
//       framesMax: 7,
//     },
//   },
//   keyMapping: {
//     left: 'ArrowLeft',
//     right: 'ArrowRight',
//     jump: 'ArrowUp',
//     attack: 'ArrowDown',
//   },
// });

// function showWinnerText(): void {
//   clearTimeout(timerId);
//   let result = '';
//   const displayText = document.querySelector('#displayText') as HTMLElement;
//   displayText.style.display = 'flex';
//   if (player.health === enemy.health) {
//     result = 'draw';
//   } else if (player.health > enemy.health) {
//     result = 'player wins';
//   } else {
//     result = 'enemy wins';
//   }
//   displayText.innerHTML = result;
// }

// let timer = 60;
// let timerId: NodeJS.Timeout;
// function decreaseTimer(): void {
//   if (timer > 0) {
//     timerId = setTimeout(decreaseTimer, 1000);
//     timer--;
//     (document.querySelector('#timer') as HTMLElement).innerHTML = `${timer}`;
//   }

//   if (timer === 0) showWinnerText();
// }

// decreaseTimer();

// let frames_per_second = 60;
// let previousTime = performance.now();

// let frame_interval = 1000 / frames_per_second;
// let this.delta_time_multiplier = 1;
// let this.delta_time = 0;
// function animate(currentTime: DOMHighResTimeStamp): void {
//   this.delta_time = currentTime - previousTime;
//   this.delta_time_multiplier = this.delta_time / frame_interval;

//   ctx.fillStyle = 'black';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   background.update(this.delta_time_multiplier);
//   shop.update(this.delta_time_multiplier);

//   ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   player.update(this.delta_time_multiplier);
//   enemy.update(this.delta_time_multiplier);

//   /** Collision Detection */
//   if (player.isAttacking && collisionRect(player, enemy) && player.frameCurrent === 4) {
//     player.isAttacking = false;
//     enemy.takeHit(25);
//     gsap.to('#enemyHealth', { width: `${enemy.health}%` });
//   }

//   if (enemy.isAttacking && collisionRect(enemy, player) && enemy.frameCurrent === 2) {
//     enemy.isAttacking = false;
//     player.takeHit(10);
//     gsap.to('#playerHealth', { width: `${player.health}%` });
//   }

//   /** End Game */
//   if (enemy.health <= 0 || player.health <= 0) {
//     showWinnerText();
//     Input.stopInput();
//   }
//   previousTime = currentTime;
//   window.requestAnimationFrame(animate);
// }

// window.requestAnimationFrame(animate);

// Input.startInput();

FightingGame();