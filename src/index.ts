import './index.css';
// import reportWebVitals from './reportWebVitals';

import { Keys } from './types/Keys';
import { Fighter } from './classes/Fighter';
import { canvas, ctx } from './canvas';
import { Sprite } from './classes/Sprite';
import { collisionRect } from './utils/collsionRect';
import gsap from 'gsap';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const background = new Sprite('./img/background.png');

const shop = new Sprite(
  './img/shop.png',
  {
    x: 600,
    y: 128,
  },
  2.75,
  { x: 0, y: 0 },
  6,
);

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/SamuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  attackBox: {
    offset: {
      x: 80,
      y: 40,
    },
    width: 175,
  },
  offset: {
    x: 215,
    y: 155,
  },
  sprites: {
    idle: {
      imageSrc: './img/SamuraiMack/Idle.png',
      framesMax: 8,
    },
    run: {
      imageSrc: './img/SamuraiMack/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './img/SamuraiMack/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './img/SamuraiMack/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './img/SamuraiMack/Attack1.png',
      framesMax: 6,
    },
    takeHit: {
      imageSrc: './img/SamuraiMack/Take Hit - white silhouette.png',
      framesMax: 4,
    },
    death: {
      imageSrc: './img/SamuraiMack/Death.png',
      framesMax: 6,
    },
  },
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/Kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  attackBox: {
    offset: {
      x: -170,
      y: 40,
    },
    width: 170,
  },
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imageSrc: './img/Kenji/Idle.png',
      framesMax: 4,
    },
    run: {
      imageSrc: './img/Kenji/Run.png',
      framesMax: 8,
    },
    jump: {
      imageSrc: './img/Kenji/Jump.png',
      framesMax: 2,
    },
    fall: {
      imageSrc: './img/Kenji/Fall.png',
      framesMax: 2,
    },
    attack1: {
      imageSrc: './img/Kenji/Attack1.png',
      framesMax: 4,
    },
    takeHit: {
      imageSrc: './img/Kenji/Take hit.png',
      framesMax: 3,
    },
    death: {
      imageSrc: './img/Kenji/Death.png',
      framesMax: 7,
    },
  },
});

const keys: Keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function showWinnerText(): void {
  clearTimeout(timerId);
  let result = '';
  const displayText = document.querySelector('#displayText') as HTMLElement;
  displayText.style.display = 'flex';
  if (player.health === enemy.health) {
    result = 'draw';
  } else if (player.health > enemy.health) {
    result = 'player wins';
  } else {
    result = 'enemy wins';
  }
  displayText.innerHTML = result;
}

let timer = 60;
let timerId: NodeJS.Timeout;
function decreaseTimer(): void {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    (document.querySelector('#timer') as HTMLElement).innerHTML = `${timer}`;
  }

  if (timer === 0) showWinnerText();
}

decreaseTimer();

let frames_per_second = 60;
let previousTime = performance.now();

let frame_interval = 1000 / frames_per_second;
let delta_time_multiplier = 1;
let delta_time = 0;
function animate(currentTime: DOMHighResTimeStamp): void {
  delta_time = currentTime - previousTime;
  delta_time_multiplier = delta_time / frame_interval;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.update(delta_time_multiplier);
  shop.update(delta_time_multiplier);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.update(delta_time_multiplier);
  enemy.update(delta_time_multiplier);

  /** Player Animation */
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -10;
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 10;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
  } else {
    player.isJumping = false;
  }

  /** Enemy Animation */
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -10;
    enemy.switchSprite('run');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 10;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  } else {
    enemy.isJumping = false;
  }

  /** Collision Detection */
  if (collisionRect(player, enemy) && player.isAttacking && player.frameCurrent === 4) {
    player.isAttacking = false;
    enemy.takeHit(25);
    gsap.to('#enemyHealth', { width: `${enemy.health}%` });
  }

  if (player.isAttacking && player.frameCurrent === 4) player.isAttacking = false;

  if (collisionRect(enemy, player) && enemy.isAttacking && enemy.frameCurrent === 2) {
    enemy.isAttacking = false;
    player.takeHit(10);
    gsap.to('#playerHealth', { width: `${player.health}%` });
  }

  if (enemy.isAttacking && enemy.frameCurrent === 2) enemy.isAttacking = false;

  /** End Game */
  if (enemy.health <= 0 || player.health <= 0) {
    showWinnerText();
  }
  previousTime = currentTime;
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

window.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (!player.dead) {
    switch (event.code) {
      case 'KeyD':
        keys.d.pressed = true;
        player.lastKey = 'd';
        break;
      case 'KeyA':
        keys.a.pressed = true;
        player.lastKey = 'a';
        break;
      case 'KeyW':
        player.jump();
        break;
      case 'Space':
        player.attack();
        break;
    }
  }

  if (!enemy.dead) {
    switch (event.code) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        break;
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
        break;
      case 'ArrowUp':
        enemy.jump();
        break;
      case 'ArrowDown':
        enemy.attack();
        break;
    }
  }
});

window.addEventListener('keyup', (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;

    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});