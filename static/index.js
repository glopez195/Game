// Targeting the canvas in the playOn HTML
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Canvas Variables
canvas.width = 1280;
canvas.height = 720;

// Player
const player_idle_animation_speed = 12;
const running_animation_speed = 5;
const runnin_speed = 4;

//------------------------UI Variables
const healthBar = document.querySelector("#healthbar");
const btnResume = document.querySelector("#resume_btn");
const btnSave = document.querySelector("#save_btn");
const btnLoad = document.querySelector("#load_btn");
const btnExit = document.querySelector("#exit_btn");
const btnControls = document.querySelector("#control_btn");
const checkMusic = document.querySelector("#musicCheck");
const chat = document.querySelector("#chat_ui");
const text = document.querySelector("#text");
const menu = document.querySelector("#menu");
const uiAll = document.querySelector("#UI");
const mw = document.querySelector("#menu_wrapper");
const iw = document.querySelector("#inventory_wrapper");
const pw = document.querySelector("#wpw");
const hbw = document.querySelector("#health_bar_wrapper");
const cw = document.querySelector("#clock_wrapper");

// Menu buttons Actions
btnResume.addEventListener("click", togglePause);
btnSave.addEventListener("click", beaconOfHope);
btnLoad.addEventListener("click", () => {
  menu_sound.play();
  location.reload();
});
btnControls.addEventListener("click", toggleControls);

// Shrine
const shrine_animation_speed = 10;

// this is the video at the end
let x = document.createElement("VIDEO");
x.style.height = "100%";
x.style.width = "100%";
x.muted = true;
x.src = "/static/images/credits.mp4";
x.loop = false;
let creditsShowing = false;

// 💀
const ghost_attack_animation_speed = 2;
const ghost_idle_animation_speed = 4;
let ghostFree = false;

// this is some general variables made global for easy access
let isRunning = true;
let mission_count = 0;
let displayMessage = false;
let message = "";
let storyLineObject = {
  9: "slime",
  13: "monsterEgg",
  17: "bones",
};
let gameEnded = false;

// ----------------- Map Variables
// Size of the map in tiles horizontally
const MAP_TILES_WIDTH = 60;

// Map Symbols for collisions and objects
const apple_symbol = 1360;
const collision_symbol = 1359;
const bluePotion_symbol = 1364;
const yellowPotion_symbol = 1365;
const pinkPotion_symbol = 1366;
const monsterEgg_symbol = 1361;
const bones_symbol = 1368;
const slime_symbol = 1362;

// This is the container for all the player info being pulled from the database.
let stats;
let introduction = false;
let current_mission = 0;
let missionCompleted = true;
let flaskIndx = 0;

// Map Img
const mapImg = new Image();
mapImg.src = "/static/images/map.png";

// Foreground Img
const foregroundImg = new Image();
foregroundImg.src = "/static/images/overlayer.png";

// Container for each attack check the damage and if it hit
let playerDamage = {
  hit: false,
  damage: 0,
};

// Detect if the player is close enough from the Mission objects
let playerInShrineRange = false;
let playerInChaliceRange = false;

// Control images
const controlImg = new Image();
controlImg.src = "/static/images/controls.png";
const controlDownImg = new Image();
controlDownImg.src = "/static/images/controlsDown.png";
let controlHandler = false;

// Objects Imgs
const apple = new Image();
apple.src = "/static/images/apple.png";
const nightPotion = new Image();
nightPotion.src = "/static/images/night_potion.png";
const dayPotion = new Image();
dayPotion.src = "/static/images/day_potion.png";
const healthPotion = new Image();
healthPotion.src = "/static/images/health_potion.png";
const bonesIcon = new Image();
bonesIcon.src = "static/images/Bone.png";
const slimeImg = new Image();
slimeImg.src = "/static/images/slime.png";
const monsterEggImg = new Image();
monsterEggImg.src = "/static/images/monster_egg.png";
const flaskImg = new Image();
flaskImg.src = "/static/images/flask.png";
const fountainFlaskImg = new Image();
fountainFlaskImg.src = "/static/images/fountain_flask.png";
const chaliceFlask = new Image();
chaliceFlask.src = "/static/images/chalice_flask.png";
const slimeFlaskImg = new Image();
slimeFlaskImg.src = "/static/images/slime_flask.png";

// Player Img
const playerDeathImg = new Image();
playerDeathImg.src = "/static/images/WarriorDownDeath.png";
const playerDownImg = new Image();
playerDownImg.src = "/static/images/WarriorDownWalk.png";
const playerUpImg = new Image();
playerUpImg.src = "/static/images/WarriorUpWalk.png";
const playerLeftImg = new Image();
playerLeftImg.src = "/static/images/WarriorLeftWalk.png";
const playerRightImg = new Image();
playerRightImg.src = "/static/images/WarriorRightWalk.png";
const playerUpIdlImg = new Image();
playerUpIdlImg.src = "/static/images/WarriorUpIdle.png";
const playerLeftIdlImg = new Image();
playerLeftIdlImg.src = "/static/images/WarriorLeftIdle.png";
const playerRightIdlImg = new Image();
playerRightIdlImg.src = "/static/images/WarriorRightIdle.png";
const playerDownIdlImg = new Image();
playerDownIdlImg.src = "/static/images/WarriorDownIdle.png";
const playerDownAttack = new Image();
playerDownAttack.src = "/static/images/WarriorDownAttack01.png";
const playerLeftAttack = new Image();
playerLeftAttack.src = "/static/images/WarriorLeftAttack01.png";
const playerUpAttack = new Image();
playerUpAttack.src = "/static/images/WarriorUpAttack01.png";
const playerRightAttack = new Image();
playerRightAttack.src = "/static/images/WarriorRightAttack01.png";
const lastAttack = new Image();
lastAttack.src = "/static/images/WarriorLastAttack.png";

// Chat Bubble Img
const bubbleImg = new Image();
bubbleImg.src = "/static/images/bubble.png";

// Enemy Img
const enemyAttackE = new Image();
enemyAttackE.src = "static/images/Enemy-Melee-Attack-E.png";
const enemyAttackN = new Image();
enemyAttackN.src = "static/images/Enemy-Melee-Attack-N.png";
const enemyAttackNE = new Image();
enemyAttackNE.src = "static/images/Enemy-Melee-Attack-NE.png";
const enemyAttackNW = new Image();
enemyAttackNW.src = "static/images/Enemy-Melee-Attack-NW.png";
const enemyAttackS = new Image();
enemyAttackS.src = "static/images/Enemy-Melee-Attack-S.png";
const enemyAttackSE = new Image();
enemyAttackSE.src = "static/images/Enemy-Melee-Attack-SE.png";
const enemyAttackSW = new Image();
enemyAttackSW.src = "static/images/Enemy-Melee-Attack-SW.png";
const enemyAttackW = new Image();
enemyAttackW.src = "static/images/Enemy-Melee-Attack-W.png";
const enemyDeath = new Image();
enemyDeath.src = "static/images/Enemy-Melee-Death.png";
const enemyIdleE = new Image();
enemyIdleE.src = "static/images/Enemy-Melee-Idle-E.png";
const enemyIdleN = new Image();
enemyIdleN.src = "static/images/Enemy-Melee-Idle-N.png";
const enemyIdleNE = new Image();
enemyIdleNE.src = "static/images/Enemy-Melee-Idle-NE.png";
const enemyIdleNW = new Image();
enemyIdleNW.src = "static/images/Enemy-Melee-Idle-NW.png";
const enemyIdleS = new Image();
enemyIdleS.src = "static/images/Enemy-Melee-Idle-S.png";
const enemyIdleSE = new Image();
enemyIdleSE.src = "static/images/Enemy-Melee-Idle-SE.png";
const enemyIdleSW = new Image();
enemyIdleSW.src = "static/images/Enemy-Melee-Idle-SW.png";
const enemyIdleW = new Image();
enemyIdleW.src = "static/images/Enemy-Melee-Idle-W.png";

// Efects
const pink_effect = new Image();
pink_effect.src = "/static/images/pink_effect.png";
const night_effect = new Image();
night_effect.src = "/static/images/night_effect.png";
const day_effect = new Image();
day_effect.src = "/static/images/day_effect.png";
const reborn = new Image();
reborn.src = "/static/images/reborn.png";
const dark_myst = new Image();
dark_myst.src = "/static/images/dark_myst.png";
const finaLights = new Image();
finaLights.src = "/static/images/lights.png";
const blue_effect = new Image();
blue_effect.src = "/static/images/blue_effect.png";

// Shrine Img
const shrineImg = new Image();
shrineImg.src = "static/images/shrine.png";

// Golden Chalice
const goldeChaliceImg = new Image();
goldeChaliceImg.src = "static/images/golden_chalice.png";

// Merchant Img
const merchantImg = new Image();
merchantImg.src = "static/images/NPC Merchant-idle.png";
const merchantInterEntry = new Image();
merchantInterEntry.src = "static/images/NPC Merchant-interacting-entry.png";
const merchantInterLoop = new Image();
merchantInterLoop.src = "static/images/NPC Merchant-interacting-loop.png";
const merchantInterRest = new Image();
merchantInterRest.src = "static/images/NPC Merchant-interacting-rest.png";
const goldenKeyImg = new Image();
goldenKeyImg.src = "/static/images/key.png";

// Luces azules
const luzAzul = new Image();
luzAzul.src = "/static/images/lucesAzules.png";
let jump = false;
const offset = {
  x: -2900,
  y: -770,
};
let playerPower = 5;
let playerInDanger = false;

// ---------------------Time Variables
let minutes = 0;
let hours = 0;
let clock = new Date();
let hourAdded = false;
let solIsUp = true;
const nightColor = "#0c042b";
const time_icon = document.getElementById("time_icon");
const time = document.getElementById("time");
const game_layer = document.getElementById("game_layer");
const time_layer = document.getElementById("time_layer");
let min = 0;

// ----------------------Audio Variables
let globalMusicVolume = 0.05;
let globalSoundsVolume = 0.05;
const grass_step = new Audio("/static/sounds/03_Step_grass_03.wav");
const sword_swing = new Audio("/static/sounds/fast-sword-whoosh.wav");
const shrine_audio = document.getElementById("shrine_sound");
shrine_audio.loop = true;
shrine_audio.volume = 0;
shrine_audio.autoplay = true;
const enemy_attack_sound = new Audio(
  "/static/sounds/aggressive-beast-roar.wav"
);
enemy_attack_sound.volume = globalSoundsVolume + 0.5;
const enemy_engage_sound = new Audio(
  "/static/sounds/aggressive-monster-beast-roar.wav"
);
enemy_engage_sound.volume = globalSoundsVolume + 0.5;
const enemy_hurt = new Audio("/static/sounds/beast_hurt.wav");
enemy_hurt.volume = globalSoundsVolume + 0.1;
const menu_sound = new Audio("/static/sounds/Abstract1.wav");
const day_music = new Audio("/static/sounds/day.wav");
day_music.volume = globalMusicVolume;
day_music.loop = true;
const finalMusic = new Audio("/static/sounds/final.wav");
finalMusic.volume = globalMusicVolume;
const afternoon_music = new Audio("/static/sounds/afternoon.wav");
afternoon_music.loop = true;
afternoon_music.volume = globalMusicVolume;
const nigth_music = new Audio("/static/sounds/night.wav");
nigth_music.loop = true;
nigth_music.volume = globalMusicVolume;
const merchant_music = new Audio("/static/sounds/merchant.wav");
merchant_music.volume = globalMusicVolume;
merchant_music.loop = true;
const engage_music = new Audio("/static/sounds/engagedghost.wav");
engage_music.loop = true;
engage_music.volume = globalMusicVolume;
const fullFlask = new Audio("/static/sounds/gettingFlask.wav");
fullFlask.volume = globalSoundsVolume + 0.1;
const picksPotion = new Audio("/static/sounds/picksPotion.wav");
picksPotion.volume = globalSoundsVolume;
const apple_sound = new Audio("static/sounds/apple.wav");
apple_sound.volume = globalSoundsVolume + 0.1;
const potionSound = new Audio("static/sounds/potionSound.wav");
potionSound.volume = globalSoundsVolume;
const pickUp = new Audio("static/sounds/pickUp.mp3");
pickUp.volume = globalSoundsVolume;
let currentMusic = day_music;
const gulp = new Audio("/static/sounds/gulp.mp3");
gulp.volume = globalSoundsVolume + 0.1;
const drum = new Audio("/static/sounds/drum.wav");
drum.volume = globalSoundsVolume + 0.1;
const death_drum = new Audio("/static/sounds/death_drum.mp3");
death_drum.volume = globalSoundsVolume + 0.1;
const final_blow = new Audio("/static/sounds/final_blow.mp3");
final_blow.volume = globalSoundsVolume + 0.1;
const intense = new Audio("/static/sounds/intense.wav");
intense.volume = globalSoundsVolume + 0.1;
const intense1 = new Audio("/static/sounds/intense1.wav");
intense1.volume = globalSoundsVolume + 0.1;

// Adding boudaries objects to the coordenates of the collision array
const boundaries = [];
// Adding apples objects to the coordenates of the apples array
const items = [];
// Count how many keys are being pressed
let pressedKeys = 0;
// Last key pressed
let lastKey = "w";
// Inserting all the collision boxes coordenates in an array
const collision_map = [];
for (let i = 0; i < collisions.length; i += MAP_TILES_WIDTH) {
  collision_map.push(collisions.slice(i, MAP_TILES_WIDTH + i));
}

// Inserting all the apples coordenates in an array
const items_map = [];
for (let i = 0; i < apples_json.length; i += MAP_TILES_WIDTH) {
  items_map.push(apples_json.slice(i, MAP_TILES_WIDTH + i));
}

// Creating the backGround Object
const backGround = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImg,
});

// This is the objects that are being displayed on top of the player to create some depth to the world
const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImg,
});

// BlueLights is an extra feature added for the heck of details, just lights that turn on at midnight in the game
const blueLights = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: luzAzul,
});

//   Creating Player object
const player = new Player({
  position: {
    x: canvas.width / 2 - 72,
    y: canvas.height / 2 - 72,
  },
  image: playerDownIdlImg,
  frames: {
    max: 5,
    animation_speed: player_idle_animation_speed,
  },
  idle_animation_speed: player_idle_animation_speed,
  idle_frames: 5,
  moving: false,
  health: 100,
  velocity: runnin_speed,
  sprites: {
    death: playerDeathImg,
    down: playerDownImg,
    up: playerUpImg,
    left: playerLeftImg,
    right: playerRightImg,
    upIdle: playerUpIdlImg,
    leftIdle: playerLeftIdlImg,
    rightIdle: playerRightIdlImg,
    downIdle: playerDownIdlImg,
    downAttack: playerDownAttack,
    upAttack: playerUpAttack,
    leftAttack: playerLeftAttack,
    rightAttack: playerRightAttack,
    lastAttack: lastAttack,
  },
});

// 💀
const ghost = new Enemy({
  position: {
    x: 2700,
    y: 1550,
  },
  image: enemyIdleS,
  attack_animation_speed: ghost_attack_animation_speed,
  attack_frames: 24,
  health: 100,
  frames: {
    max: 12,
    animation_speed: ghost_idle_animation_speed,
  },
  idle_animation_speed: ghost_idle_animation_speed,
  idle_frames: 12,
  moving: false,
  attack_reach: 60,
  velocity: 0.7,
  mapLimit: {
    position: {
      x: 2220,
      y: 1400,
    },
  },
  sounds: {
    attack: enemy_attack_sound,
    hurt: null,
    engaged: enemy_engage_sound,
  },
  sprites: {
    down: enemyIdleS,
    down_right: enemyIdleSE,
    down_left: enemyIdleSW,
    up: enemyIdleN,
    up_left: enemyIdleNE,
    up_right: enemyIdleNW,
    left: enemyIdleW,
    right: enemyIdleE,
    down_Attack: enemyAttackS,
    down_left_Attack: enemyAttackSW,
    down_right_Attack: enemyAttackSE,
    up_Attack: enemyAttackN,
    up_left_Attack: enemyAttackNW,
    up_right_Attack: enemyAttackNE,
    left_Attack: enemyAttackW,
    right_Attack: enemyAttackE,
    death: enemyDeath,
  },
});

// Sprite for the Shrine
const shrine = new Sprite({
  position: {
    x: 960,
    y: 1590,
  },
  image: shrineImg,
  frames: {
    rows: 1,
    max: 8,
    animation_speed: shrine_animation_speed,
  },
});

// Chat bubble
const bubble = new Sprite({
  position: {
    x: 660,
    y: 260,
  },
  image: bubbleImg,
});

// Golden Chalice Sprite
const golden_chalice = new Sprite({
  position: {
    x: 740,
    y: 3200,
  },
  image: goldeChaliceImg,
  frames: {
    rows: 1,
    max: 8,
    animation_speed: shrine_animation_speed,
  },
});

// Cool Effect is the animations that play when the player dies
const coolEffect = new Sprite({
  position: {
    x: canvas.width / 3 - 28,
    y: canvas.height / 5 - 20,
  },
  image: reborn,
  frames: {
    max: 5,
    animation_speed: 3,
    rows: 4,
  },
  sprites: {
    heal: pink_effect,
    day: day_effect,
    night: night_effect,
    reborn: reborn,
    finaLights: finaLights,
    blue: blue_effect,
  },
});
coolEffect.play = false;

// darkness is the animations that play when the player dies
const darkness = new Sprite({
  position: {
    x: ghost.position.x - 100,
    y: ghost.position.y - 100,
  },
  image: dark_myst,
  frames: {
    max: 5,
    animation_speed: 3,
    rows: 4,
  },
});
darkness.play = false;

// Merchant Sprite
const merchant = new Player({
  position: {
    x: 2930,
    y: 725,
  },
  health: false,
  moving: false,
  image: merchantImg,
  frames: {
    max: 8,
    animation_speed: shrine_animation_speed,
  },
  sprites: {
    idle: merchantImg,
    entry: merchantInterEntry,
    loop: merchantInterLoop,
    rest: merchantInterRest,
  },
  idle_frames: 8,
  idle_animation_speed: shrine_animation_speed,
});
merchant.state = "resting";
merchant.goldenKeyOnDisplay = false;
merchant.message = [];
merchant.action = "talk";

// Golden key is what the merchant is holding in her hands
const goldenKey = new Sprite({
  position: {
    x: 3020,
    y: 830,
  },
  image: goldenKeyImg,
  frames: {
    rows: 1,
    max: 8,
    animation_speed: shrine_animation_speed,
  },
});

// Setting the inventory for the player
player.items = [null, null, null, null, null, null, null, null, null];
const inventory = new Inventory({
  items: player.items,
  itemImages: {
    apple: apple,
    bones: bonesIcon,
    dayPotion: dayPotion,
    nightPotion: nightPotion,
    healthPotion: healthPotion,
    flask: flaskImg,
    fountainFlask: fountainFlaskImg,
    chaliceFlask: chaliceFlask,
    slime: slimeImg,
    slimeFlask: slimeFlaskImg,
    monsterEgg: monsterEggImg,
  },
  state: "hidden",
});

// All the objects that are moving to create optic ilusion that the player is moving
const none_staticMaps = [backGround, foreground, blueLights];
let staticMaps = [];

// Loading screen
window.addEventListener("load", () => {
  loading();
});

// fetch all the data when the game starts
async function gameStarts() {
  let response = await fetch("/getStats");
  let user_stats = await response.json();
  stats = user_stats[0];
  // fill the inventory from the data pulled from the DB
  user_stats[1].forEach((item) => {
    if (item.count != 0) {
      inventory.add(item.name, item.count);
    }
  });
  // Relocate all the moving components based on the new position of the player
  none_staticMaps.forEach((movable) => {
    movable.position.x = stats.xLocation;
    movable.position.y = stats.yLocation;
  });

  // Set the time to the time saved in previous game
  hours = stats.hour;

  // Set the progress from the last save
  current_mission = stats.progress;

  // Add all collisions
  collision_map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol == collision_symbol) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height,
            },
            color: "rgba(255, 0, 0)",
          })
        );
      }
    });
  });

  // Loop the JSON map to see the coordinates or all the objects in the game, mission objects included
  items_map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === apple_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: apple.height,
          width: apple.width,
          name: "apple",
        });
      } else if (symbol === bluePotion_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: nightPotion.height,
          width: nightPotion.width,
          name: "nightPotion",
        });
      } else if (symbol === slime_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: slimeImg.height,
          width: slimeImg.width,
          name: "slime",
        });
      } else if (symbol === bones_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: bonesIcon.height,
          width: bonesIcon.width,
          name: "bones",
        });
      } else if (symbol === monsterEgg_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: monsterEggImg.height,
          width: monsterEggImg.width,
          name: "monsterEgg",
        });
      } else if (symbol === yellowPotion_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: dayPotion.height,
          width: dayPotion.width,
          name: "dayPotion",
        });
      } else if (symbol === pinkPotion_symbol) {
        items.push({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height,
          },
          height: healthPotion.height,
          width: healthPotion.width,
          name: "healthPotion",
        });
      }
    });
  });

  // Set the lights based on the time
  adjustLight();

  // All the pieces that are going to be moving with the player
  staticMaps = [
    ...boundaries,
    ...items,
    shrine,
    merchant,
    ghost,
    ghost.mapLimit,
    goldenKey,
    darkness,
    golden_chalice,
  ];
  staticMaps.forEach((movable) => {
    movable.position.x += stats.xLocation;
    movable.position.y += stats.yLocation;
  });

  // If mission is 0 means is a new player, so it triggers the start 'scene'
  if (current_mission === 0) {
    uiAll.style.backgroundImage = "url('/static/images/controls.png')";
    setTimeout(() => {
      chat.style.opacity = 1;
      text.innerHTML = "Hey Hero, over here hurry!";
      uiAll.style.backgroundImage = "none";
      setTimeout(() => {
        chat.style.opacity = 0;
      }, 5000);
    }, 7000);

    // Or if the player already got to level 19 then get the powers from the potion back
  } else if (current_mission >= 19) {
    playerPower = 20;
    ghost.power = 30;
  }

  // invoke the ghost if is time
  setTimeout(() => {
    if (hours < 3) invokeghost("in");
    animate();
    setTimeout(() => {
      adjustSound();
    }, 1000);
  }, 7000);
}
gameStarts();

//    ----------------------Main refreshing function ---------------------------
function animate() {
  // For as long as the game is runnin this is the main loop
  if (isRunning) {
    reqAnim = window.requestAnimationFrame(animate);
  }
  // Update the UI time
  displayTime();

  // Draw all the objects in specific order
  objectsDrawing();

  // The commented function below is only for troubleshooting: displays the collision boxes for the terrain
  //boundaries.forEach(boundary => { boundary.draw(); });

  // Making sure the player is still alive
  player.checkStatus();

  // If the player is not moving (attackin) then navigate takes the keys input to move
  if (!player.moving) player.navigate();

  // In order to run diagonally I keep account of all pressed keys but it can bug if it doesn't detect the lifting of one if you changed the window or something so is better make sure it doesn't go below 0
  if (pressedKeys < 0) pressedKeys = 0;
}

//    Assinging initial values to the keys
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  shift: {
    pressed: false,
  },
};

// Checks for collision based on the players dimantions and an object
function rectangularCollision({ player1, object2 }) {
  let xPos = player1.position.x + 55;
  let pWidth = player1.width - 120;
  let pHeight = player1.height - 20;
  return (
    xPos + pWidth >= object2.position.x &&
    xPos <= object2.position.x + object2.width &&
    player1.position.y + (pHeight / 4) * 3 <=
      object2.position.y + object2.height &&
    player1.position.y + pHeight >= object2.position.y
  );
}

// Listening for keys being pressed down
window.addEventListener("keydown", (e) => {
  // if the game is over then ignore the rest
  if (player.health === 0 || gameEnded) return;
  switch (e.key) {
    // UP
    case "w":
      // If the 'w' key isn't registered as pressed already then add one to the pressedKeys
      if (!keys.w.pressed) {
        pressedKeys++;
      }
      // Marked they key as already pressed so it doesn't get counted double
      keys.w.pressed = true;
      break;

    // LEFT
    case "a":
      if (!keys.a.pressed) {
        pressedKeys++;
      }
      keys.a.pressed = true;
      break;

    // Dwon
    case "s":
      if (!keys.s.pressed) {
        pressedKeys++;
      }
      keys.s.pressed = true;
      break;

    // RIGHT
    case "d":
      if (!keys.d.pressed) {
        pressedKeys++;
      }
      keys.d.pressed = true;
      break;

    // ATTACK
    case "q":
      // if player is already attacking ignore key
      if (player.moving) return;
      // if not register that is attacking and then attack
      player.moving = true;
      player.attack();
      break;

    // INTERACT
    case "f":
      // if player is already attacking ignore key
      if (player.moving) return;
      // interact watches for anything close to the player and interacts if available
      player.interact();
      break;

    // INVENTORY SHOW/ HIDE TOGGLE
    case "i":
      inventory.changeState();
      break;

    // USING THE INVENTORY ITEMS
    case "1":
      if (player.moving) return;
      inventory.use(8);
      break;
    case "2":
      if (player.moving) return;
      inventory.use(7);
      break;
    case "3":
      if (player.moving) return;
      inventory.use(6);
      break;
    case "4":
      if (player.moving) return;
      inventory.use(5);
      break;
    case "5":
      if (player.moving) return;
      inventory.use(4);
      break;
    case "6":
      if (player.moving) return;
      inventory.use(3);
      break;
    case "7":
      if (player.moving) return;
      inventory.use(2);
      break;
    case "8":
      if (player.moving) return;
      inventory.use(1);
      break;
    case "9":
      if (player.moving) return;
      inventory.use(0);
      break;

    // ACTIVATING THE MENU
    case "Escape":
      togglePause();
  }
});

// Knowing when the key is no longer being pressed
window.addEventListener("keyup", (e) => {
  if (player.health === 0) return;
  switch (e.key) {
    case "w":
      pressedKeys--;
      keys.w.pressed = false;
      // if user is no moving player then setting the IDLE animation
      if (pressedKeys === 0 && !player.moving) {
        player.frames.val = 0;
        player.image = player.sprites.upIdle;
        player.frames.max = 5;
        player.frames.animation_speed = 12;
      }
      break;
    case "a":
      pressedKeys--;
      keys.a.pressed = false;
      if (pressedKeys === 0 && !player.moving) {
        player.frames.val = 0;
        player.image = player.sprites.leftIdle;
        player.frames.max = 5;
        player.frames.animation_speed = 12;
      }
      break;
    case "s":
      pressedKeys--;
      keys.s.pressed = false;
      if (pressedKeys === 0 && !player.moving) {
        player.frames.val = 0;
        player.image = player.sprites.downIdle;
        player.frames.max = 5;
        player.frames.animation_speed = 12;
      }
      break;
    case "d":
      pressedKeys--;
      keys.d.pressed = false;
      if (pressedKeys === 0 && !player.moving) {
        player.frames.val = 0;
        player.image = player.sprites.rightIdle;
        player.frames.max = 5;
        player.frames.animation_speed = 12;
      }
      break;
  }
});

player.navigate = function () {
  // Player pressed 'W' to go up
  if (keys.w.pressed) {
    // Setting the animation for going up
    player.frames.animation_speed = running_animation_speed;
    player.image = player.sprites.up;
    player.frames.max = 8;
    lastKey = "w";

    // Adjust speed just takes into account which direction is the player going in case is diagonally since both x and y are changing at the same time then its moving ar twice the speed so we have to decrease the units of distance per frame
    adjustSpeed();

    // Will Crash takes in a direction and it calculates if the player is going or not to crash if he keeps going in that direction
    if (!willCrash("up")) {
      // so if we got false from that if it means it isn't going to crash so me proceed to move the player and play the walking sounf
      grass_step.play();
      staticMaps.forEach((movable) => {
        movable.position.y += player.velocity;
      });
      none_staticMaps.forEach((movable) => {
        movable.position.y += player.velocity;
      });
    }

    // if the WillCrash got true then we don't do anything and set the animation to stop
    else {
      player.image = player.sprites.upIdle;
      player.frames.val = 0;
    }
  }

  // Player pressed 'S' to go down
  if (keys.s.pressed) {
    player.frames.animation_speed = running_animation_speed;
    player.image = player.sprites.down;
    player.frames.max = 8;
    lastKey = "s";
    adjustSpeed();
    if (!willCrash("down")) {
      grass_step.play();
      staticMaps.forEach((movable) => {
        movable.position.y -= player.velocity;
      });
      none_staticMaps.forEach((movable) => {
        movable.position.y -= player.velocity;
      });
    } else {
      player.image = playerDownImg;
      player.frames.val = 0;
    }
  }

  // Player pressed 'A' to go to the left
  if (keys.a.pressed) {
    player.frames.animation_speed = running_animation_speed;
    player.image = player.sprites.left;
    player.frames.max = 8;
    lastKey = "a";
    adjustSpeed();
    if (!willCrash("left")) {
      grass_step.play();
      staticMaps.forEach((movable) => {
        movable.position.x += player.velocity;
      });
      none_staticMaps.forEach((movable) => {
        movable.position.x += player.velocity;
      });
    } else {
      player.image = playerLeftImg;
      player.frames.val = 0;
    }
  }

  // Player pressed 'D' to go to the right
  if (keys.d.pressed) {
    player.frames.animation_speed = running_animation_speed;
    player.image = player.sprites.right;
    player.frames.max = 8;
    lastKey = "d";
    adjustSpeed();
    if (!willCrash("right")) {
      grass_step.play();
      staticMaps.forEach((movable) => {
        movable.position.x -= player.velocity;
      });
      none_staticMaps.forEach((movable) => {
        movable.position.x -= player.velocity;
      });
    } else {
      player.image = player.sprites.right;
      player.frames.val = 1;
    }
  }
};

// Triggers when 'F' is pressed
player.interact = function () {
  // Looping all the objects that player can interact with
  items.forEach((value, index) => {
    // if it's null it means the player already picked it up
    if (value != null) {
      // detecting if the objects are any potions or the current object from the mission
      if (
        value.name === "nightPotion" ||
        value.name === "dayPotion" ||
        value.name === "healthPotion" ||
        value.name === "apple" ||
        value.name === storyLineObject[current_mission]
      ) {
        // if hours is > 4 it means is no night so all object mission that can be found around in the floor should be hidden so we are gonna ignore then
        if (value.name === storyLineObject[current_mission] && hours > 4) {
          return;
        } else {
          // finds the distance between the object and an object
          let distance = findDistance({ player1: player, object2: value });
          // <50 means in pick up range
          if (distance < 50) {
            // we add it to the inventory
            if (inventory.add(value.name, 1)) {
              items[index] = null;
              if (
                value.name === "nightPotion" ||
                value.name === "dayPotion" ||
                value.name === "healthPotion"
              )
                // depending on the object the sound we make
                picksPotion.play();
              else pickUp.play();
            }
          }
        }
      }
    }
  });

  // if player is in range of the Shrine and that mission is active and he has the flask then get the holy water
  if (playerInShrineRange) {
    inventory.items[flaskIndx] = {
      name: "fountainFlask",
      count: 1,
    };
    // if successfully grabbed the holy wawter then mission is passed
    current_mission++;
    fullFlask.play();
    showMessage("Got it!");
    playerInShrineRange = false;
    inventory.update();
  }

  if (playerInChaliceRange) {
    inventory.items[flaskIndx] = {
      name: "chaliceFlask",
      count: 1,
    };
    fullFlask.play();
    current_mission++;
    showMessage("Acquired!");
    playerInChaliceRange = false;
    inventory.update();
  }

  // Below I am recycling the health property of the merchant object since im not using it (can't be killed) but it has
  // nothing to do with health, just checking if the talk bubble is already open or not

  // if the state is iteracting or looping it means the player is in close distance with the merchant
  if (merchant.state === "interacting" || merchant.state === "looping") {
    // detects if the player has the meet criteria to pass the cuurent mission
    missionCompleted = storyLine();
    if (merchant_music.paused) delayMusic(merchant_music);
    // this is to detect when the player interacted for the first time or pressed 'F' to coninue reading in which case if there is no more details to add for the mission it skips this and show a random tip
    if (!merchant.health) {
      chat.style.opacity = 1;
      text.innerHTML = missions[current_mission];
      // if the player does meet the criteria from storyLine() then he passes the mission
      if (missionCompleted) current_mission++;
      else merchant.health = true;
    }
    // Random tips
    else {
      chat.style.opacity = 1;
      let rand_fact = Math.floor(Math.random() * 6);
      text.innerHTML = randomFacts[rand_fact];
    }
  }
};

// Takes a direction and detects if player would crash if he continues in that direction or not
function willCrash(direction) {
  let xDirection = 0;
  let yDirection = 0;

  // If the user is pressing the opposite directional keys then don't move
  if (
    (keys.d.pressed && keys.a.pressed) ||
    (keys.w.pressed && keys.s.pressed)
  ) {
    return true;
  }

  // Based on the direction then the x and y values are changed
  switch (direction) {
    case "up":
      yDirection = player.velocity;
      break;
    case "down":
      yDirection = -1 * player.velocity;
      break;
    case "left":
      xDirection = player.velocity;
      break;
    case "right":
      xDirection = -1 * player.velocity;
      break;
  }

  // detects collision with any boundary and the future position of the player
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    if (
      rectangularCollision({
        player1: player,
        object2: {
          ...boundary,
          position: {
            x: boundary.position.x + xDirection,
            y: boundary.position.y + yDirection,
          },
        },
      })
    )
      return true;
  }

  // if it got all the way here and the time is passed the 3 hours then just return false and let the player move
  if (hours > 3) return false;

  // else then the ghost is roaming around in which case I'll check for collision with the ghost as well
  let tempghost = {
    position: {
      x: ghost.position.x + 100 + xDirection,
      y: ghost.position.y + 170 + yDirection,
    },
    width: 50,
    height: 50,
  };
  if (
    rectangularCollision({
      player1: player,
      object2: tempghost,
    })
  )
    return true;

  return false;
}

// Adjust speeds based on how many directional keys are being pressed
function adjustSpeed() {
  // if keysPressed > 1 then the player is moving diagonally so the speed is lowered since x and y values are decreading or incrementing together
  if (pressedKeys > 1) {
    player.velocity = runnin_speed - 1;
  } else {
    player.velocity = runnin_speed;
  }
}

// Triggers when the player presses 'Q'
player.attack = function () {
  // Change the animation settings to the attack position
  player.frames.animation_speed = 8;
  player.frames.max = 6;
  player.frames.val = 0;
  // based on the last directional key the attack direction
  switch (lastKey) {
    case "s":
      // this function takes the direction of the attack and handles everything to detect if the ghost gets hit or not
      ghostDamage("s");
      // saves the direction the player was looking so after the attack if no key is pressed the game knows which direction set the player after the attack
      player.frames.lastSprite = player.sprites.downIdle;
      player.image = player.sprites.downAttack;
      break;
    case "w":
      ghostDamage("n");
      player.frames.lastSprite = player.sprites.upIdle;
      player.image = player.sprites.upAttack;
      break;
    case "d":
      ghostDamage("e");
      player.frames.lastSprite = player.sprites.rightIdle;
      player.image = player.sprites.rightAttack;
      break;
    case "a":
      ghostDamage("w");
      player.frames.lastSprite = player.sprites.leftIdle;
      player.image = player.sprites.leftAttack;
      break;
  }
  // play the sound of the swing
  sword_swing.play();
};

// the loading bar
function loading() {
  const loader = document.getElementById("loader_main");
  const main = document.getElementById("canvas");
  const bar = document.getElementById("barra_de_carga");

  // 4 sec of bar loading
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = "none";
    main.style.display = "flex";
    setTimeout(() => {
      main.style.opacity = 1;
    }, 50);
  }, 4000);

  let progress = 0;
  let random = 0;
  var run = setInterval(frames, 300);
  function frames() {
    random = Math.random() * 30;
    progress += random;
    if (progress > 100) {
      progress = 100;
      clearInterval(run);
    }
    bar.style.width = progress.toFixed(2) + "%";
    bar.innerHTML = progress.toFixed(2) + "%";
  }
}

// updates the player status based in if it was hit by the ghost or not
player.checkStatus = function () {
  if (playerDamage.hit) {
    // if the damage received is bigger than the health of the player
    if (playerDamage.damage > player.health) player.health = 0;
    // else just substract it from the
    else player.health -= playerDamage.damage;
    // update UI
    healthBar.style.width = player.health + "%";
    // setting the hit to false so it doesn't triggered again until player gets hit one more time
    playerDamage.hit = false;
    // if player dies then play animation death and restart the window
    if (player.health === 0) {
      gameEnded = true;
      setTimeout(() => {
        location.reload();
      }, 2500);
      window.cancelAnimationFrame(reqAnim);
      // plays the effect after player dies
      coolEffect.frames.max = 5;
      coolEffect.frames.rows = 4;
      coolEffect.frames.val = 0;
      coolEffect.frames.row = 0;
      coolEffect.frames.animation_speed = 3;
      coolEffect.image = coolEffect.sprites.reborn;
      player.moving = true;
      player.frames.val = 0;
      player.image = player.sprites.death;
      player.frames.animation_speed = 12;
      player.lastSprite = player.sprites.death;
      player.frames.max = 5;
      currentMusic.pause();
      death_drum.play();
      death();
    }
  }
};

// Plays the water running sound of the shrine based on how far the player is from it
function play_shrine_sound() {
  // the hard coded numbers are the coordinates of the map when the shrine is in the middle of the screen
  let x = backGround.position.x + 1160 - canvas.width / 2;
  let y = backGround.position.y + 1720 - canvas.height / 2;

  // calculates distance
  let distance = Math.sqrt(x ** 2 + y ** 2);
  volume = Math.round(distance / 100);

  // based on the distance from the shrine I created 7 levels of volume
  if (volume > 7) {
    // if player is to far then pause the sound
    shrine_audio.pause();
    return;
  }
  //else play by the level of distance
  switch (volume) {
    case 0:
    case 1:
      shrine_audio.volume = 1;
      break;
    case 2:
      shrine_audio.volume = 0.8;
      break;
    case 3:
      shrine_audio.volume = 0.5;
      break;
    case 4:
      shrine_audio.volume = 0.2;
      break;
    case 5:
      shrine_audio.volume = 0.09;
      break;
    case 6:
      shrine_audio.volume = 0.05;
      break;
    case 7:
      shrine_audio.volume = 0.02;
      break;
  }
  // play only if it paused and the function hasn't returned yet
  if (shrine_audio.paused) {
    shrine_audio.play();
  }
}

// This is the function that takes care of drawing the characters (player and ghost) and order matters, if anything is drawed after something else then if the share space in the screen the second one will be render on top
function drawCharacters() {
  // depending on the y postion which one will be draw in top of the other
  let y1 = ghost.position.y + ghost.height - 50;
  let y2 = player.position.y + player.height - 35;
  if (y1 < y2) {
    ghost.draw();
    player.draw();
  } else {
    player.draw();
    ghost.draw();
  }
}

// takes an item and quantity and adds it to the incentory
inventory.add = function (item, quantity) {
  // making sure the item was successfully added to the inventory
  let picked = false;
  // loops the inventory to find out if we have already that item in the inventory and increase count only or if it needs to be added
  inventory.items.forEach((invItem, index) => {
    // if slot is not empty then we check inside to see if it matches with what is being picked up
    if (invItem != null) {
      if (invItem.name === item) {
        invItem.count++;
        picked = true;
      }
    } else {
      // if the slot is empty then we save the index here in case it needs to be added up then we already know the position of the empty slot and since the items are in backward order from the UI it will find the closest empty slot to the top
      nextFreeSlot = index;
    }
  });
  // if it was successfully picked up then we proceed to update inventory and return true
  if (picked) {
    inventory.update();
    return true;
  }
  // else if inventory in the nextFreeSlot is full it means the whole inventory is full return false so item doesn't disapear from the map and display message
  else if (inventory.items[nextFreeSlot] != null) {
    showMessage("Inventory Full");
    return false;
  }
  // if the item is the slime then it triggers this special condition since its the only one that needs to be put in a flask that doesn't have its own detecting function like the Shrine or the Chalice
  else if (item === "slime") {
    inventory.items[flaskIndx] = {
      name: "slimeFlask",
      count: quantity,
    };
    current_mission++;
    showMessage("Found it!");
    inventory.update();
    return true;
  }
  // if the code got up to here then we just don't have the item so just go ahead and added to the inventory
  else {
    inventory.items[nextFreeSlot] = {
      name: item,
      count: quantity,
    };
    // if the item added is a flask then we save in which slot is storaged so when we find the sustance we fill it with it just replaces the flask slot instad of adding a new one, since every flask object full or empty are different objects
    if (item === "flask") flaskIndx = nextFreeSlot;

    // if the object found is a mission object other than the slime then it will be detected here and handled
    if (item === "monsterEgg") {
      current_mission++;
      showMessage("Found it!");
    }
    if (item === "bones") {
      current_mission++;
      showMessage("Done!");
    }
    inventory.update();
    return true;
  }
};

// beaconOfHope its called every time the user saves the game progress and it simply sends all the infor to the DB
function beaconOfHope() {
  // since this function can only be called from the menu then play the sound
  menu_sound.play();
  let user_data = {
    xLocation: backGround.position.x,
    yLocation: backGround.position.y,
    hour: hours,
    health: player.health,
    progress: current_mission,
    inventory: inventory.items,
  };
  navigator.sendBeacon("/saveProgress", JSON.stringify(user_data));
  // remove the pause after game saves
  togglePause();
}

// Interacting with the Merchant
function merchant_interaction() {
  // the moving state on the merchant is for when the players gets in proximity or when is interacting already and the player moves away in which case the moving won't get set to 'false' until the startingInteraction or endingInteraction animation is completed
  if (merchant.moving) return;

  // detects how far is the merchant from the player
  let distance = findDistance({ player1: player, object2: merchant });

  // if player is in talking distance from the merchant then show the Action menu in top of the merchant
  if (distance < 150) {
    c.beginPath();
    c.moveTo(
      merchant.position.x + merchant.width / 2 - 50,
      merchant.position.y + merchant.height / 2 - 50
    );
    c.lineTo(
      merchant.position.x + merchant.width / 2 - 70,
      merchant.position.y + merchant.height / 2 - 70
    );
    c.strokeStyle = "white";
    c.font = "20px Papyrus";
    c.strokeText(
      merchant.action,
      merchant.position.x + merchant.width / 2 - 100,
      merchant.position.y + merchant.height / 2 - 75
    );
    c.stroke();
  }

  // if the player get in engaging distance with the Merchant, and the merchant was resting (means far from player) then initiate the startInteraction animation and change the state of the merchant to Interacting
  if (distance < 105 && merchant.state === "resting") {
    merchant.frames.animation_speed = 6;
    merchant.state = "interacting";
    merchant.image = merchant.sprites.entry;
    merchant.moving = true;
    merchant.frames.lastSprite = merchant.sprites.loop;
    merchant.frames.val = 0;
    merchant.frames.max = 8;
  }
  // if the merchant is already interacting then just play the loop animation
  else if (distance < 105 && merchant.state === "interacting") {
    merchant.goldenKeyOnDisplay = true;
    merchant.frames.animation_speed = 6;
    merchant.state = "looping";
    merchant.frames.val = 0;
    merchant.frames.max = 8;
  }
  // if the player gets away from the merchant during either the interacting or looping states then play the endInteraction animation and pause the merchant soundtrack music
  else if (
    (distance > 105 && merchant.state === "interacting") ||
    (distance > 105 && merchant.state === "looping")
  ) {
    merchant.goldenKeyOnDisplay = false;
    merchant_music.pause();
    adjustSound();
    chat.style.opacity = 0;
    merchant.health = false;
    merchant.frames.animation_speed = 8;
    merchant.state = "exiting";
    merchant.image = merchant.sprites.rest;
    merchant.frames.lastSprite = merchant.sprites.idle;
    merchant.moving = true;
    merchant.frames.val = 0;
    merchant.frames.max = 4;
  }
  // any other situation the merchant just loops the IDLE animation
  else if (merchant.state === "exiting") {
    merchant.frames.animation_speed = 8;
    merchant.state = "resting";
    merchant.frames.val = 0;
    merchant.frames.max = 8;
  }
}

function fillArea(x, y, w, h, color) {
  c.fillStyle = color;
  c.fillRect(x, y, w, h);
}

// This is the function that takes care of drawing everything. The order matters, if anything is drawed after something else then if the share space in the screen the second one will be render on top
function objectsDrawing() {
  // First we draw the background
  backGround.draw();
  // We see if to play the shrine running watter sound or not
  play_shrine_sound();
  // Draw Shrine
  shrine.draw();
  // If the ghosth is free meaning is night and hes roaming and aslo engaged with the player we show the UI for the ghost
  if (ghostFree && ghost.engaged) ghost.ui.style.opacity = 1;
  // Else we hide it
  else ghost.ui.style.opacity = 0;

  // Loop all the items in the map and draw them if they are not null (already picked up)
  items.forEach((value) => {
    if (value != null) {
      if (
        value.name === "nightPotion" ||
        value.name === "dayPotion" ||
        value.name === "healthPotion" ||
        value.name === "apple" ||
        value.name === storyLineObject[current_mission]
      ) {
        // if the item is an story line object and is already day then we don't render it since it can only be picked up during night
        if (value.name === storyLineObject[current_mission] && hours > 4)
          return;
        // else we draw the item
        c.drawImage(
          inventory.itemImages[value.name],
          value.position.x,
          value.position.y
        );

        // if the object is close to the player then an action label will be displayed on top of the item so user knows it can be interacted with
        let distance = findDistance({ player1: player, object2: value });
        if (distance < 100) {
          c.beginPath();
          c.moveTo(
            value.position.x + value.width / 2 - 15,
            value.position.y + value.height / 2 - 15
          );
          c.lineTo(
            value.position.x + value.width / 2 - 30,
            value.position.y + value.height / 2 - 30
          );
          c.strokeStyle = "white";
          c.font = "15px Papyrus";
          c.strokeText(
            "pick up?",
            value.position.x + value.width / 2 - 50,
            value.position.y + value.height / 2 - 40
          );
          c.stroke();
        }
      }
    }
  });

  // if the player is in the Holy Water mission then detect if the shrine is close so a message of pick up can be displayed
  if (current_mission === 11 && hours > 8 && hours < 18) {
    let distance = findDistance({ player1: player, object2: shrine });
    if (distance < 200) {
      c.beginPath();
      c.moveTo(
        shrine.position.x + shrine.width / 2 + 70,
        shrine.position.y + shrine.height / 2 - 15
      );
      c.lineTo(shrine.position.x + shrine.width - 50, shrine.position.y + 60);
      c.strokeStyle = "white";
      c.font = "20px Papyrus";
      c.strokeText(
        "Fill bottle?",
        shrine.position.x + shrine.width - 40,
        shrine.position.y + 60
      );
      c.stroke();
    }
    if (distance < 100) playerInShrineRange = true;
  }

  // if the player is in the Chalice's content mission then detect if the Chalice is close so a message of pick up can be displayed
  if (current_mission === 15 && hours > 8 && hours < 18) {
    let distance = findDistance({ player1: player, object2: golden_chalice });
    if (distance < 200) {
      c.beginPath();
      c.moveTo(
        golden_chalice.position.x + golden_chalice.width / 2 + 70,
        golden_chalice.position.y + golden_chalice.height / 2 - 15
      );
      c.lineTo(
        golden_chalice.position.x + golden_chalice.width - 40,
        golden_chalice.position.y + 90
      );
      c.strokeStyle = "white";
      c.font = "20px Papyrus";
      c.strokeText(
        "Fill bottle?",
        golden_chalice.position.x + golden_chalice.width - 40,
        golden_chalice.position.y + 60
      );
      c.stroke();
    }
    if (distance < 100) playerInChaliceRange = true;
  }

  // if displayedMessage is true then somewhere in the program a message is needed to be displayed to the user so it gets displayed
  if (displayMessage) {
    c.beginPath();
    bubble.draw();
    c.strokeStyle = "black";
    c.font = "15px Papyrus";
    c.strokeText(message, bubble.position.x + 5, bubble.position.y + 18);
    c.stroke();
  }

  // draw the merchant
  merchant.draw();
  // Interact with merchant
  merchant_interaction();
  // Draw golden Key
  if (merchant.goldenKeyOnDisplay) goldenKey.draw();

  // interact with the cool effects meaning theyr will draw if it's needed at the moment
  coolEffect.interact();
  darkness.interact();

  // if ghost is free then we check which one to draw first if player or ghost Check the drawCharacters() to see how
  if (ghostFree) {
    // if the ghost is not attacking then he should be moving around, based on the player coordinates he'll know what to do, check the classes.js file to know more in the Enemy class
    if (!ghost.moving) ghost.navigate(player.position.x, player.position.y);
    drawCharacters();
  }
  // if the ghost is not even roaming around then just draw the player
  else player.draw();

  // foreground is a png with all the objects that no matter what will always be render on top of everything (ex: the top of columns or top of trees, since it is the same size as the map it fits perfectly on top of the objects so the users cann't tell that they are being rendered twice)
  foreground.draw();

  // draw the blue lights if its midnight
  if (hours === 0) blueLights.draw();

  // and last draw the chalice, since the player can't get in front of it its save to always draw last
  golden_chalice.draw();
}

// if coolEffect is needed it will be handled here
coolEffect.interact = function () {
  if (!coolEffect.play) return;
  coolEffect.draw();
  if (
    coolEffect.frames.row === coolEffect.frames.rows - 1 &&
    coolEffect.frames.val === coolEffect.frames.max - 1
  )
    coolEffect.play = false;
};
darkness.interact = function () {
  if (!darkness.play) return;
  darkness.draw();
  if (
    darkness.frames.row === darkness.frames.rows - 1 &&
    darkness.frames.val === darkness.frames.max - 1
  )
    darkness.play = false;
};

// This function gets triggered when the player wants to use an item from the inventory in which case it gets handled base on what the slot contains or if it even contains anything
inventory.use = function (index) {
  // if the slot is empty then do nothing
  if (inventory.items[index] === null) return;
  // if it is any potion then call the respectively function to handle the situation 
  else if (
    inventory.items[index].name === "nightPotion" ||
    inventory.items[index].name === "apple" ||
    inventory.items[index].name === "dayPotion" ||
    inventory.items[index].name === "healthPotion"
  ) {
    // the count goes down
    inventory.items[index].count--;
    switch (inventory.items[index].name) {
      case "dayPotion":
        potionSound.play();
        coolEffect.play = true;
        coolEffect.frames.max = 5;
        coolEffect.frames.rows = 3;
        coolEffect.frames.val = 0;
        coolEffect.frames.row = 0;
        coolEffect.frames.animation_speed = 6;
        coolEffect.image = coolEffect.sprites.day;
        // if the ghost is free meaning is night then when calling the day potion we set the ghost not free
        if (ghostFree) invokeghost("out");
        hours = 12;
        adjustSound();
        adjustLight();
        break;
      case "nightPotion":
        potionSound.play();
        coolEffect.play = true;
        coolEffect.frames.max = 5;
        coolEffect.frames.rows = 4;
        coolEffect.frames.val = 0;
        coolEffect.frames.row = 0;
        coolEffect.frames.animation_speed = 6;
        coolEffect.image = coolEffect.sprites.night;
        hours = 0;
        // if the ghost is not already free then we free him since its midnight
        if (!ghost.engaged) invokeghost("in");
        adjustSound();
        adjustLight();
        break;
      case "healthPotion":
        coolEffect.play = true;
        potionSound.play();
        coolEffect.frames.max = 5;
        coolEffect.frames.rows = 6;
        coolEffect.frames.val = 0;
        coolEffect.frames.row = 0;
        coolEffect.frames.animation_speed = 3;
        coolEffect.image = coolEffect.sprites.heal;
        player.health = 100;
        healthBar.style.width = player.health + "%";
        break;
      case "apple":
        apple_sound.play();
        player.health += 15;
        if (player.health > 100) player.health = 100;
        healthBar.style.width = player.health + "%";
        break;
    }
    inventory.update();
  } 
  // any other case that is none of this objects but is not empty then is probably a mission object in which case we just display a message that it cant be used
  else {
    showMessage("Can't use this.");
  }
};

// triggers when the user's health drops to 0
function death() {
  window.requestAnimationFrame(death);
  // play the effect of death
  if (!coolEffect.play && !player.moving) {
    coolEffect.play = true;
    coolEffect.frames.val = 0;
    coolEffect.frames.row = 0;
  }
  // play player's dying animation
  if (!player.moving) {
    (player.image = player.sprites.death), (player.frames.val = 4);
    player.moving;
    player.frames.elapsed = 0;
  }

  // we draw only this objects for the rest of the interaction before the tab gets reloaded
  backGround.draw();
  displayTime();
  player.draw();
  coolEffect.draw();
}

// Get's triggered when user presses 'Esc' key
function togglePause() {
  menu_sound.play();
  // toggle the value of isRunning
  isRunning = !isRunning;
  // call animate() if working
  if (isRunning) {
    adjustSound();
    menu.style.display = "none";
    animate();
  } else {
    currentMusic.pause();
    menu.style.display = "flex";
  }
}

// Given the player and an object it finds the distance in between
function findDistance({ player1, object2 }) {
  let x =
    object2.position.x +
    object2.width / 2 -
    (player1.position.x + player1.width / 2);
  let y =
    object2.position.y +
    object2.height / 2 -
    (player1.position.y + player1.height / 2);
  let distance = Math.sqrt(x ** 2 + y ** 2);

  // if this commented code gets uncommented then you can see a direct line between the player and every object he can interact with

  /*
        c.beginPath();
        c.moveTo((object2.position.x + object2.width / 2), (object2.position.y + object2.height / 2));
        c.lineTo((player1.position.x + player1.width / 2), (player1.position.y + player1.height / 2));
        c.stroke();
    */
  return distance;
}

// Based on the direction of the attack we calculate if the ghost took damage from the player's attack or not
function ghostDamage(direc) {
  setTimeout(() => {
    let newDistance = findDistance({ player1: player, object2: ghost });
    if (newDistance < 100) {
      let y1 = ghost.position.y + ghost.height - 50;
      let y2 = player.position.y + player.height - 35;
      let x1 = ghost.position.x + ghost.width / 2;
      let x2 = player.position.x + player.width / 2;

      // the math took a lot of trial and error so I left the hard coded numbers here
      switch (direc) {
        case "n":
          if (y1 < y2 && Math.abs(x2 - x1) < 35 && newDistance < 100) {
            ghost.health -= playerPower;
          }
          break;
        case "s":
          if (y1 > y2 && Math.abs(x2 - x1) < 35 && newDistance < 40) {
            ghost.health -= playerPower;
          }
          break;
        case "e":
          if (x1 > x2 && Math.abs(y2 - y1) < 25 && newDistance < 90) {
            ghost.health -= playerPower;
          }
          break;
        case "w":
          if (x1 < x2 && Math.abs(y2 - y1) < 25 && newDistance < 90) {
            ghost.health -= playerPower;
          }
          break;
      }

      // if the ghost's health get's below 0 then we end the game with the winning scene
      if (ghost.health <= 0) {
        gameEnded = true;
        // we start the 'Movie' 😂
        startEndMovie();
      }
    }
  }, 300);
}

// invoking the ghost 'in' or 'out' 
function invokeghost(direc) {
  darkness.position.x = ghost.position.x - 100;
  darkness.position.y = ghost.position.y - 100;
  if (direc === "in" && !ghostFree) {
    ghost.health = 100;
    darkness.play = true;
    darkness.frames.val = 0;
    darkness.frames.row = 0;
    setTimeout(() => {
      ghostFree = true;
    }, 1100);
  } else {
    ghostFree = false;
    ghost.engaged = false;
    darkness.play = true;
    darkness.frames.val = 0;
    darkness.frames.row = 0;
  }
}

// the storyLine depending on the mission the player is at, checks the inventory and  passes a 'completed' to the interaction with the merchant if the criteria is met
function storyLine() {
  let completed = false;
  if (current_mission <= 6) return true;
  else if (current_mission === 7) {
    inventory.items.forEach((item) => {
      if (item != null) {
        if (item.name === "apple" && item.count >= 3) {
          item.count -= 3;
          merchant.health = false;
          inventory.update();
          completed = true;
        }
      }
    });
  } else if (current_mission === 8) {
    setTimeout(() => {
      inventory.add("nightPotion", 1);
      inventory.add("flask", 1);
      inventory.update();
    }, 3000);
    completed = true;
  } else if (current_mission === 10) {
    inventory.items.forEach((item) => {
      if (item != null) {
        if (item.name === "slimeFlask") {
          item.count = 0;
          merchant.health = false;
          inventory.update();
          setTimeout(() => {
            inventory.add("dayPotion", 1);
            inventory.add("flask", 1);
            inventory.update();
          }, 3000);
          completed = true;
        }
      }
    });
  } else if (current_mission === 12) {
    inventory.items.forEach((item) => {
      if (item != null) {
        if (item.name === "fountainFlask") {
          item.count = 0;
          merchant.health = false;
          inventory.update();
          setTimeout(() => {
            inventory.add("nightPotion", 1);
            inventory.update();
          }, 2000);
          completed = true;
        }
      }
    });
  } else if (current_mission === 14) {
    inventory.items.forEach((item) => {
      if (item != null) {
        if (item.name === "monsterEgg") {
          item.count = 0;
          merchant.health = false;
          inventory.update();
          setTimeout(() => {
            inventory.add("flask", 1);
            inventory.add("dayPotion", 1);
            inventory.update();
          }, 2000);
          completed = true;
        }
      }
    });
  } else if (current_mission === 16) {
    inventory.items.forEach((item) => {
      if (item != null) {
        if (item.name === "chaliceFlask") {
          item.count = 0;
          merchant.health = false;
          inventory.update();
          completed = true;
        }
      }
    });
  } else if (current_mission === 18) {
    inventory.items.forEach((item) => {
      if (item != null) {
        if (item.name === "bones") {
          item.count = 0;
          merchant.health = false;
          inventory.update();
          completed = true;
        }
      }
    });
  } else if (current_mission === 19) {
    completed = true;
    setTimeout(() => {
      gulp.play();
    }, 1000);
    setTimeout(() => {
      coolEffect.play = true;
      coolEffect.frames.max = 5;
      coolEffect.frames.rows = 6;
      coolEffect.frames.val = 0;
      coolEffect.frames.row = 0;
      coolEffect.frames.animation_speed = 3;
      coolEffect.image = coolEffect.sprites.blue;
      inventory.add("nightPotion", 1);
      inventory.add("healthPotion", 1);
      inventory.update();
      playerPower = 20;
      ghost.power = 30;
    }, 2000);
  } else return false;

  return completed;
}

// we show whichever message needs to be display for 3s
function showMessage(text) {
  message = text;
  displayMessage = true;
  setTimeout(() => {
    displayMessage = false;
  }, 3000);
}

// this is the controls in the menu to check which keyboard's keys do what
function toggleControls() {
  menu_sound.play();
  if (!controlHandler) {
    buttonsUp = setInterval(() => {
      uiAll.style.backgroundImage = "url('/static/images/controls.png')";
    }, 500);
    buttonsDown = setInterval(() => {
      uiAll.style.backgroundImage = "url('/static/images/controlsDown.png')";
    }, 1000);
    controlHandler = true;
    togglePause();
  } else {
    clearInterval(buttonsUp);
    clearInterval(buttonsDown);
    uiAll.style.backgroundImage = "none";
    controlHandler = false;
    togglePause();
  }
}

// If the startMovie is called literally the whole html gets destroyed (all the UI are purged)
function startEndMovie() {
  window.cancelAnimationFrame(reqAnim);

  // Clear UI
  while (mw.hasChildNodes()) {
    mw.removeChild(mw.firstChild);
  }
  while (cw.hasChildNodes()) {
    cw.removeChild(cw.firstChild);
  }
  cw.style.display = "none";
  while (iw.hasChildNodes()) {
    iw.removeChild(iw.firstChild);
  }
  mw.style.width = 0 + "%";
  iw.style.width = 0 + "%";
  while (chat.hasChildNodes()) {
    chat.removeChild(chat.firstChild);
  }
  while (pw.hasChildNodes()) {
    pw.removeChild(pw.firstChild);
  }

  // Modifying the new look of the HTML file
  hbw.style.width = 100 + "%";
  chat.style.width = 100 + "%";
  pw.style.width = 100 + "%";
  chat.classList.add("bb");
  pw.classList.add("bb");
  setTimeout(() => {
    uiAll.style.background = "black";
  }, 1000);
  currentMusic.pause();
  // We play the drums
  drum.play();
  // Drama is pouring and finally 'lastScene'
  setTimeout(() => {
    lastScene();
    backGround.position.x = -1751;
    backGround.position.y = -2500;
    ghost.image = ghost.sprites.left;
    ghost.frames.lastSprite = ghost.sprites.left;
    ghost.frames.val = 0;
    ghost.moving = true;
    ghost.position.x = canvas.width;
    ghost.position.y = canvas.height / 3;
    player.frames.val = 0;
    player.frames.max = 8;
    player.image = player.sprites.left;
    player.idle_frames = 8;
    player.frames.lastSprite = player.sprites.left;
    player.position.x = canvas.width + 680;
    player.idle_animation_speed = 4;
    player.animation_speed = 4;
    player.position.y = canvas.height / 3 + 70;
    uiAll.style.background = "none";
    coolEffect.play = true;
    coolEffect.frames.max = 5;
    coolEffect.frames.rows = 2;
    coolEffect.frames.val = 0;
    coolEffect.frames.row = 0;
    coolEffect.width = 400;
    coolEffect.height = 400;
    coolEffect.position.x -= 55;
    coolEffect.frames.animation_speed = 3;
    coolEffect.image = coolEffect.sprites.finaLights;
    intense.play();
    setTimeout(() => {
      intense1.play();
      currentMusic.pause();
    }, 3200);
  }, 2000);
}

// The next functions was my efforts to create a cinematic piece of content but gone wrong and overcomplicated the code
function lastScene() {
  requestAnimationFrame(lastScene);
  let xg = 3;
  let xp = 5;
  backGround.draw();
  player.draw();
  if (player.position.x === canvas.width / 2 - 50) {
    player.image = player.sprites.lastAttack;
    player.position.y -= 70;
    player.moving = true;
    player.frames.val = 0;
    player.frames.max = 6;
    player.animation_speed = 6;
    jump = true;
    setTimeout(() => {
      final_blow.play();
    }, 150);
  }
  if (jump && !player.moving) {
    if (player.position.y < canvas.height / 3 + 50) player.position.y += 30;
    playAnimationDead();
    player.frames.val = 0;
    xg = 0;
    xp = 0;
    setTimeout(() => {
      hours = 12;
      adjustLight();
    }, 2000);
  } else {
    ghost.position.x -= xg;
    player.position.x -= xp;
  }
  if (!ghost.engaged && !ghost.moving) {
    player.image = player.sprites.downIdle;
    player.frames.max = 5;
    player.frames.val = 0;
  } else ghost.draw();
}

// The next functions was my efforts to create a cinematic piece of content but gone wrong and overcomplicated the code
function playAnimationDead() {
  if (ghost.engaged) {
    ghost.image = ghost.sprites.death;
    ghost.frames.max = 24;
    ghost.frames.val = 0;
    ghost.animation_speed = 5;
    enemy_hurt.play();
    ghost.moving = true;
    ghost.engaged = false;
    setTimeout(() => {
      window.cancelAnimationFrame(lastScene);
      ok4RealLastScene();
    }, 3000);
    setTimeout(() => {
      const textnode = document.createTextNode(
        "Thank you Hero! You have returned the light to G's World."
      );
      chat.appendChild(textnode);
      const textnode1 = document.createTextNode(
        "The journey has just begun, but thanks to you now we have a chance!"
      );
      pw.appendChild(textnode1);
      setTimeout(() => {
        const textnode2 = document.createTextNode("- G");
        const br = document.createElement("br");
        pw.appendChild(br);
        pw.appendChild(textnode2);
      }, 2000);
    }, 4000);
  }
}

// The next functions was my efforts to create a cinematic piece of content but gone wrong and overcomplicated the code
function ok4RealLastScene() {
  requestAnimationFrame(ok4RealLastScene);
  backGround.draw();
  player.draw();
  finalMusic.loop = true;
  finalMusic.play();
  coolEffect.draw();
  setTimeout(() => {
    credits();
  }, 7000);
}

// Finally credits roll
function credits() {
  if (creditsShowing) return;
  creditsShowing = true;
  window.cancelAnimationFrame(ok4RealLastScene);
  while (uiAll.hasChildNodes()) {
    uiAll.removeChild(uiAll.firstChild);
  }
  uiAll.appendChild(x);
  x.play();
  setTimeout(() => {
    x.pause();
    uiAll.backGround = "black";
  }, 17000);
}

// This function it's a way to transition from the music tracks
function delayMusic(sound) {
  if (!checkMusic.checked || gameEnded) return;
  currentMusic.volume /= 2;
  setTimeout(() => {
    currentMusic.pause();
    sound.play();
    currentMusic.volume = globalMusicVolume;
    currentMusic = sound;
  }, 1000);
}