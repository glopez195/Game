// Targeting the canvas in the playOn HTML
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas Variables
canvas.width = 1280;
canvas.height = 720;

// Player
const player_idle_animation_speed = 12;
const running_animation_speed = 5;
const runnin_speed = 4;

const btnResume = document.querySelector('#resume_btn');
const btnSave = document.querySelector('#save_btn');
const btnLoad = document.querySelector('#load_btn');
const btnExit = document.querySelector('#exit_btn');
const btnControls = document.querySelector('#control_btn');
const checkMusic = document.querySelector('#musicCheck');


btnResume.addEventListener('click', togglePause);
btnSave.addEventListener('click', beaconOfHope);
btnLoad.addEventListener('click', () => { menu_sound.play(); location.reload(); });
btnControls.addEventListener('click', toggleControls);

// Shrine
const shrine_animation_speed = 10;

const chat = document.querySelector('#chat_ui');
const text = document.querySelector('#text');
const menu = document.querySelector('#menu');
const uiAll = document.querySelector('#UI');
const mw = document.querySelector('#menu_wrapper');
const iw = document.querySelector('#inventory_wrapper');
const pw = document.querySelector('#wpw');
const hbw = document.querySelector('#health_bar_wrapper');
const cw = document.querySelector('#clock_wrapper');

let x = document.createElement("VIDEO");
x.style.height = '100%';
x.style.width = '100%';
x.muted = true;
x.src = '/static/images/Default_Startup.mp4'; 
x.loop = false;

// Gosth
const gosth_attack_animation_speed = 2;
const gosth_idle_animation_speed = 4;
let gosthFree = false;

let isRunning = true;
let mission_count = 0;
let displayMessage = false;
let message = "";
let storyLineObject = {
    9: 'slime',
    13: 'monsterEgg',
    17: 'bones'
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
foregroundImg.src = '/static/images/overlayer.png';

// Container for each attack check the damage and if it hit
let playerDamage = {
    hit: false,
    damage: 0
};
let playerInShrineRange = false;
let playerInChaliceRange = false;

const controlImg = new Image();
controlImg.src = "/static/images/controls.png";
const controlDownImg = new Image();
controlDownImg.src = "/static/images/controlsDown.png";
let controlHandler = false;

// Objects Imgs
const apple = new Image();
apple.src = '/static/images/apple.png';
const nightPotion = new Image();
nightPotion.src = '/static/images/night_potion.png';
const dayPotion = new Image();
dayPotion.src = '/static/images/day_potion.png';
const healthPotion = new Image();
healthPotion.src = '/static/images/health_potion.png';
const bonesIcon = new Image();
bonesIcon.src = 'static/images/Bone.png';
const blackPotion = new Image();
blackPotion.src = 'static/images/black_potion.png';
const slimeImg = new Image();
slimeImg.src = '/static/images/slime.png';
const monsterEggImg = new Image();
monsterEggImg.src = '/static/images/monster_egg.png';
const flaskImg = new Image();
flaskImg.src = '/static/images/flask.png';
const fountainFlaskImg = new Image();
fountainFlaskImg.src = '/static/images/fountain_flask.png';
const chaliceFlask = new Image();
chaliceFlask.src = '/static/images/chalice_flask.png';
const slimeFlaskImg = new Image();
slimeFlaskImg.src = '/static/images/slime_flask.png';

// Player Img
const playerDeathImg = new Image();
playerDeathImg.src = '/static/images/WarriorDownDeath.png';
const playerDownImg = new Image();
playerDownImg.src = '/static/images/WarriorDownWalk.png';
const playerUpImg = new Image();
playerUpImg.src = '/static/images/WarriorUpWalk.png';
const playerLeftImg = new Image();
playerLeftImg.src = '/static/images/WarriorLeftWalk.png';
const playerRightImg = new Image();
playerRightImg.src = '/static/images/WarriorRightWalk.png';
const playerUpIdlImg = new Image();
playerUpIdlImg.src = '/static/images/WarriorUpIdle.png';
const playerLeftIdlImg = new Image();
playerLeftIdlImg.src = '/static/images/WarriorLeftIdle.png';
const playerRightIdlImg = new Image();
playerRightIdlImg.src = '/static/images/WarriorRightIdle.png';
const playerDownIdlImg = new Image();
playerDownIdlImg.src = '/static/images/WarriorDownIdle.png';
const playerDownAttack = new Image();
playerDownAttack.src = '/static/images/WarriorDownAttack01.png';
const playerLeftAttack = new Image();
playerLeftAttack.src = '/static/images/WarriorLeftAttack01.png';
const playerUpAttack = new Image();
playerUpAttack.src = '/static/images/WarriorUpAttack01.png';
const playerRightAttack = new Image();
playerRightAttack.src = '/static/images/WarriorRightAttack01.png';

const bubbleImg = new Image();
bubbleImg.src = '/static/images/bubble.png';

// Enemy Img
const enemyAttackE = new Image();
enemyAttackE.src = 'static/images/Enemy-Melee-Attack-E.png';
const enemyAttackN = new Image();
enemyAttackN.src = 'static/images/Enemy-Melee-Attack-N.png';
const enemyAttackNE = new Image();
enemyAttackNE.src = 'static/images/Enemy-Melee-Attack-NE.png';
const enemyAttackNW = new Image();
enemyAttackNW.src = 'static/images/Enemy-Melee-Attack-NW.png';
const enemyAttackS = new Image();
enemyAttackS.src = 'static/images/Enemy-Melee-Attack-S.png';
const enemyAttackSE = new Image();
enemyAttackSE.src = 'static/images/Enemy-Melee-Attack-SE.png';
const enemyAttackSW = new Image();
enemyAttackSW.src = 'static/images/Enemy-Melee-Attack-SW.png';
const enemyAttackW = new Image();
enemyAttackW.src = 'static/images/Enemy-Melee-Attack-W.png';
const enemyDeath = new Image();
enemyDeath.src = 'static/images/Enemy-Melee-Death.png';
const enemyIdleE = new Image();
enemyIdleE.src = 'static/images/Enemy-Melee-Idle-E.png';
const enemyIdleN = new Image();
enemyIdleN.src = 'static/images/Enemy-Melee-Idle-N.png';
const enemyIdleNE = new Image();
enemyIdleNE.src = 'static/images/Enemy-Melee-Idle-NE.png';
const enemyIdleNW = new Image();
enemyIdleNW.src = 'static/images/Enemy-Melee-Idle-NW.png';
const enemyIdleS = new Image();
enemyIdleS.src = 'static/images/Enemy-Melee-Idle-S.png';
const enemyIdleSE = new Image();
enemyIdleSE.src = 'static/images/Enemy-Melee-Idle-SE.png';
const enemyIdleSW = new Image();
enemyIdleSW.src = 'static/images/Enemy-Melee-Idle-SW.png';
const enemyIdleW = new Image();
enemyIdleW.src = 'static/images/Enemy-Melee-Idle-W.png';

// Efects
const pink_effect = new Image();
pink_effect.src = '/static/images/pink_effect.png';
const night_effect = new Image();
night_effect.src = '/static/images/night_effect.png';
const day_effect = new Image();
day_effect.src = '/static/images/day_effect.png';
const reborn = new Image();
reborn.src = '/static/images/reborn.png';
const dark_myst = new Image();
dark_myst.src = '/static/images/dark_myst.png';
const finaLights = new Image();
finaLights.src = '/static/images/lights.png';
const blue_effect = new Image();
blue_effect.src = '/static/images/blue_effect.png';


// Shrine Img
const shrineImg = new Image();
shrineImg.src = 'static/images/shrine.png';

// Golden Chalice
const goldeChaliceImg = new Image();
goldeChaliceImg.src = 'static/images/golden_chalice.png'

// Merchant Img
const merchantImg = new Image();
merchantImg.src = 'static/images/NPC Merchant-idle.png';
const merchantInterEntry = new Image();
merchantInterEntry.src = 'static/images/NPC Merchant-interacting-entry.png';
const merchantInterLoop = new Image();
merchantInterLoop.src = 'static/images/NPC Merchant-interacting-loop.png';
const merchantInterRest = new Image();
merchantInterRest.src = 'static/images/NPC Merchant-interacting-rest.png';
const goldenKeyImg = new Image();
goldenKeyImg.src = '/static/images/key.png';

// Luces azules
const luzAzul = new Image();
luzAzul.src = '/static/images/lucesAzules.png';
let jump = false;
const offset = {
    x: -2900,
    y: -770
}
let playerPower = 5;
let playerInDanger = false;
// ---------------------Time Variables
let minutes = 0;
let hours = 0;
let clock = new Date();
let hourAdded = false;
let solIsUp = true;
const nightColor = '#0c042b'
const time_icon = document.getElementById('time_icon');
const time = document.getElementById('time');
const game_layer = document.getElementById('game_layer');
const time_layer = document.getElementById('time_layer');
let min = 0;

// ----------------------Audio Variables
let globalMusicVolume = 0.05;
let globalSoundsVolume = 0.05;
const grass_step = new Audio('/static/sounds/03_Step_grass_03.wav');
const sword_swing = new Audio('/static/sounds/fast-sword-whoosh.wav');
const shrine_audio = document.getElementById("shrine_sound");
shrine_audio.loop = true;
shrine_audio.volume = 0;
shrine_audio.autoplay = true;
const enemy_attack_sound = new Audio('/static/sounds/aggressive-beast-roar.wav');
enemy_attack_sound.volume = globalSoundsVolume + 0.5;
const enemy_engage_sound = new Audio('/static/sounds/aggressive-monster-beast-roar.wav');
enemy_engage_sound.volume = globalSoundsVolume + 0.5;
const enemy_hurt = new Audio('/static/sounds/beast_hurt.wav');
enemy_hurt.volume = globalSoundsVolume + 0.1;
const menu_sound = new Audio('/static/sounds/Abstract1.wav');
const day_music = new Audio('/static/sounds/day.wav');
day_music.volume = globalMusicVolume;
day_music.loop = true;
const finalMusic = new Audio('/static/sounds/final.wav');
finalMusic.volume = globalMusicVolume;
const afternoon_music = new Audio('/static/sounds/afternoon.wav');
afternoon_music.loop = true;
afternoon_music.volume = globalMusicVolume;
const nigth_music = new Audio('/static/sounds/night.wav');
nigth_music.loop = true;
nigth_music.volume = globalMusicVolume;
const merchant_music = new Audio('/static/sounds/merchant.wav');
merchant_music.volume = globalMusicVolume;
merchant_music.loop = true;
const engage_music = new Audio('/static/sounds/engagedGosth.wav');
engage_music.loop = true;
engage_music.volume = globalMusicVolume;
const fullFlask = new Audio('/static/sounds/gettingFlask.wav');
fullFlask.volume = globalSoundsVolume + 0.1;
const picksPotion = new Audio('/static/sounds/picksPotion.wav');
picksPotion.volume = globalSoundsVolume;
const apple_sound = new Audio('static/sounds/apple.wav');
apple_sound.volume = globalSoundsVolume + 0.1;
const potionSound = new Audio('static/sounds/potionSound.wav');
potionSound.volume = globalSoundsVolume;
const pickUp = new Audio('static/sounds/pickUp.mp3');
pickUp.volume = globalSoundsVolume;
let currentMusic = day_music;
const gulp = new Audio('/static/sounds/gulp.mp3');
gulp.volume = globalSoundsVolume + 0.1;
const drum = new Audio('/static/sounds/drum.wav');
drum.volume = globalSoundsVolume + 0.1;
const death_drum = new Audio('/static/sounds/death_drum.mp3');
death_drum.volume = globalSoundsVolume + 0.1;
const final_blow = new Audio('/static/sounds/final_blow.mp3');
final_blow.volume = globalSoundsVolume + 0.1;
const intense = new Audio('/static/sounds/intense.wav');
intense.volume = globalSoundsVolume + 0.1;
const intense1 = new Audio('/static/sounds/intense1.wav');
intense1.volume = globalSoundsVolume + 0.1;
//------------------------UI Variables
const healthBar = document.querySelector('#healthbar');

// Adding boudaries objects to the coordenates of the collision array
const boundaries = [];
// Adding apples objects to the coordenates of the apples array
const items = [];
// Count how many keys are being pressed
let pressedKeys = 0;
// Last key pressed
let lastKey = 'w';
// Inserting all the collision boxes coordenates in an array
const collision_map = []
for (let i = 0; i < collisions.length; i += MAP_TILES_WIDTH) {
    collision_map.push(collisions.slice(i, MAP_TILES_WIDTH + i))
}

// Inserting all the apples coordenates in an array
const items_map = []
for (let i = 0; i < apples_json.length; i += MAP_TILES_WIDTH) {
    items_map.push(apples_json.slice(i, MAP_TILES_WIDTH + i))
}

// Creating the backGround Object
const backGround = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImg
})

// This is the objects that are being displayed on top of the player to create some depth to the world
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImg
})

const blueLights = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: luzAzul
})

//   Creating Player object
const player = new Player({
    position: {
        x: canvas.width / 2 - 72,
        y: canvas.height / 2 - 72
    },
    image: playerDownIdlImg,
    frames: {
        max: 5,
        animation_speed: player_idle_animation_speed
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
        rightAttack: playerRightAttack
    }
})

const gosth = new Enemy({
    position: {
        x: 2700,
        y: 1550
    },
    image: enemyIdleS,
    attack_animation_speed: gosth_attack_animation_speed,
    attack_frames: 24,
    health: 100,
    frames: {
        max: 12,
        animation_speed: gosth_idle_animation_speed
    },
    idle_animation_speed: gosth_idle_animation_speed,
    idle_frames: 12,
    moving: false,
    attack_reach: 60,
    velocity: 0.7,
    mapLimit: {
        position: {
            x: 2220,
            y: 1400
        }
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
        right_Attack: enemyAttackE
    }
})

const shrine = new Sprite({
    position: {
        x: 960,
        y: 1590
    },
    image: shrineImg,
    frames: {
        rows: 1,
        max: 8,
        animation_speed: shrine_animation_speed
    }
});

const bubble = new Sprite({
    position: {
        x: 660,
        y: 260
    },
    image: bubbleImg
});

const golden_chalice = new Sprite({
    position: {
        x: 740,
        y: 3200
    },
    image: goldeChaliceImg,
    frames: {
        rows: 1,
        max: 8,
        animation_speed: shrine_animation_speed
    }
})

const coolEffect = new Sprite({
    position: {
        x: canvas.width / 3 - 28,
        y: canvas.height / 5 - 20
    },
    image: reborn,
    frames: {
        max: 5,
        animation_speed: 3,
        rows: 4
    },
    sprites: {
        heal: pink_effect,
        day: day_effect,
        night: night_effect,
        reborn: reborn,
        finaLights: finaLights,
        blue: blue_effect
    }
})
coolEffect.play = false;

const darkness = new Sprite({
    position: {
        x: gosth.position.x - 100,
        y: gosth.position.y - 100
    },
    image: dark_myst,
    frames: {
        max: 5,
        animation_speed: 3,
        rows: 4
    }
})
darkness.play = false;

const merchant = new Player({
    position: {
        x: 2930,
        y: 725
    },
    health: false,
    moving: false,
    image: merchantImg,
    frames: {
        max: 8,
        animation_speed: shrine_animation_speed
    },
    sprites: {
        idle: merchantImg,
        entry: merchantInterEntry,
        loop: merchantInterLoop,
        rest: merchantInterRest
    },
    idle_frames: 8,
    idle_animation_speed: shrine_animation_speed
})
merchant.state = 'resting';
merchant.goldenKeyOnDisplay = false;
merchant.message = [];
merchant.action = 'talk';

const goldenKey = new Sprite({
    position: {
        x: 3020,
        y: 830
    },
    image: goldenKeyImg,
    frames: {
        rows: 1,
        max: 8,
        animation_speed: shrine_animation_speed
    }
})

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
        monsterEgg: monsterEggImg
    },
    state: 'hidden'
})
// All the objects that are moving to create optic ilusion that the player is moving
const none_staticMaps = [backGround, foreground, blueLights];
let staticMaps = [];

window.addEventListener("load", () => {
    loading();
})

async function gameStarts() {
    let response = await fetch('/getStats');
    let user_stats = await response.json();
    stats = user_stats[0];
    user_stats[1].forEach(item => {
        if (item.count != 0) {
            inventory.add(item.name, item.count);
        }
    });
    none_staticMaps.forEach(movable => {
        movable.position.x = stats.xLocation;
        movable.position.y = stats.yLocation;
    });
    hours = stats.hour;
    current_mission = stats.progress;
    collision_map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == collision_symbol) {
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'rgba(255, 0, 0)'
                    }))
            }
        })
    });
    items_map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol === apple_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: apple.height,
                    width: apple.width,
                    name: 'apple'
                })
            }
            else if (symbol === bluePotion_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: nightPotion.height,
                    width: nightPotion.width,
                    name: 'nightPotion'
                })
            }
            else if (symbol === slime_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: slimeImg.height,
                    width: slimeImg.width,
                    name: 'slime'
                })
            }
            else if (symbol === bones_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: bonesIcon.height,
                    width: bonesIcon.width,
                    name: 'bones'
                })
            }
            else if (symbol === monsterEgg_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: monsterEggImg.height,
                    width: monsterEggImg.width,
                    name: 'monsterEgg'
                })
            }
            else if (symbol === yellowPotion_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: dayPotion.height,
                    width: dayPotion.width,
                    name: 'dayPotion'
                })
            }
            else if (symbol === pinkPotion_symbol) {
                items.push({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                    },
                    height: healthPotion.height,
                    width: healthPotion.width,
                    name: 'healthPotion'
                })
            }
        })
    })
    adjustLight();
    staticMaps = [...boundaries, ...items, shrine, merchant, gosth, gosth.mapLimit, goldenKey, darkness, golden_chalice];
    staticMaps.forEach(movable => {
        movable.position.x += stats.xLocation;
        movable.position.y += stats.yLocation;
    })
    if (current_mission === 0) {
        uiAll.style.backgroundImage = "url('/static/images/controls.png')";
        setTimeout(() => {
            chat.style.opacity = 1;
            text.innerHTML = "Hey Hero, over here hurry!";
            uiAll.style.backgroundImage = 'none';
            setTimeout(()=>{
                chat.style.opacity = 0;
            },3000);
        }, 6000);
    } else if (current_mission >= 19) {
        playerPower = 20;
        gosth.power = 30;
    }
    setTimeout(() => {
        if (hours < 3) invokeGosth('in');
        animate();
        setTimeout(() => {
            adjustSound();
        }, 1000);
    }, 4000);
}



//    ----------------------Main refreshing function ---------------------------
function animate() {
    if (isRunning) {
        reqAnim = window.requestAnimationFrame(animate);
    }
    // Draw background --------------------------------------------------------------------------
    displayTime();
    objectsDrawing();
    // The commented function below is only for troubleshooting: displays the collision boxes for the terrain
    //boundaries.forEach(boundary => { boundary.draw(); });

    //fillArea((gosth.position.x + 100), (gosth.position.y + 170), 50, 50)
    // Draw player sprite -----------------------------------------------------------------------
    player.checkStatus();
    // Draw all objects that are being shown on top of the player image -------------------------------
    // Takes input to navigate the player through the map
    if (!player.moving) player.navigate();
    if (pressedKeys < 0) pressedKeys = 0;
}

//    Assinging initial values to the keys
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    shift: {
        pressed: false
    },
}

// Checks for collision of two rectangles given the initial position, width and height
function rectangularCollision({ player1, object2 }) {
    let xPos = player1.position.x + 55;
    let pWidth = player1.width - 120;
    let pHeight = player1.height - 20;
    return (
        xPos + pWidth >= object2.position.x &&
        xPos <= object2.position.x + object2.width &&
        player1.position.y + ((pHeight / 4) * 3) <= object2.position.y + object2.height &&
        player1.position.y + pHeight >= object2.position.y
    )
}
window.addEventListener('keydown', (e) => {
    if (player.health === 0 || gameEnded) return;
    switch (e.key) {
        case 'w':
            if (!keys.w.pressed) { pressedKeys++; }
            keys.w.pressed = true;
            break
        case 'a':
            if (!keys.a.pressed) { pressedKeys++; }
            keys.a.pressed = true;
            break
        case 's':
            if (!keys.s.pressed) { pressedKeys++; }
            keys.s.pressed = true;
            break
        case 'd':
            if (!keys.d.pressed) { pressedKeys++; }
            keys.d.pressed = true;
            break
        case 'q':
            if (player.moving) return;
            player.moving = true;
            player.attack();
            break
        case 'f':
            if (player.moving) return;
            player.interact();
            break
        case 'i':
            inventory.changeState();
            break;
        case '1':
            if (player.moving) return;
            inventory.use(8);
            break;
        case '2':
            if (player.moving) return;
            inventory.use(7);
            break;
        case '3':
            if (player.moving) return;
            inventory.use(6);
            break;
        case '4':
            if (player.moving) return;
            inventory.use(5);
            break;
        case '5':
            if (player.moving) return;
            inventory.use(4);
            break;
        case '6':
            if (player.moving) return;
            inventory.use(3);
            break;
        case '7':
            if (player.moving) return;
            inventory.use(2);
            break;
        case '8':
            if (player.moving) return;
            inventory.use(1);
            break;
        case '9':
            if (player.moving) return;
            inventory.use(0);
            break;
        case 'Escape':
            togglePause();

    }
})

window.addEventListener('keyup', (e) => {
    if (player.health === 0) return;
    switch (e.key) {
        case 'w':
            pressedKeys--;
            keys.w.pressed = false;
            if (pressedKeys === 0 && !player.moving) {
                player.frames.val = 0;
                player.image = player.sprites.upIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break;
        case 'a':
            pressedKeys--;
            keys.a.pressed = false;
            if (pressedKeys === 0 && !player.moving) {
                player.frames.val = 0;
                player.image = player.sprites.leftIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break;
        case 's':
            pressedKeys--;
            keys.s.pressed = false;
            if (pressedKeys === 0 && !player.moving) {
                player.frames.val = 0;
                player.image = player.sprites.downIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break;
        case 'd':
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
})


player.navigate = function () {
    // Player pressed 'W' to go up
    if (keys.w.pressed) {
        player.frames.animation_speed = running_animation_speed;
        player.image = player.sprites.up;
        player.frames.max = 8;
        lastKey = 'w';
        adjustSpeed();
        if (!willCrash('up')) {
            grass_step.play();
            staticMaps.forEach((movable) => { movable.position.y += player.velocity })
            none_staticMaps.forEach((movable) => { movable.position.y += player.velocity })
        }
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
        lastKey = 's';
        adjustSpeed();
        if (!willCrash('down')) {
            grass_step.play();
            staticMaps.forEach((movable) => { movable.position.y -= player.velocity })
            none_staticMaps.forEach((movable) => { movable.position.y -= player.velocity })
        }
        else {
            player.image = playerDownImg;
            player.frames.val = 0;
        }
    }

    // Player pressed 'A' to go to the left
    if (keys.a.pressed) {
        player.frames.animation_speed = running_animation_speed;
        player.image = player.sprites.left
        player.frames.max = 8;
        lastKey = 'a';
        adjustSpeed();
        if (!willCrash('left')) {
            grass_step.play();
            staticMaps.forEach((movable) => { movable.position.x += player.velocity })
            none_staticMaps.forEach((movable) => { movable.position.x += player.velocity })
        }
        else {
            player.image = playerLeftImg;
            player.frames.val = 0;
        }
    }

    // Player pressed 'D' to go to the right
    if (keys.d.pressed) {
        player.frames.animation_speed = running_animation_speed;
        player.image = player.sprites.right;
        player.frames.max = 8;
        lastKey = 'd';
        adjustSpeed();
        if (!willCrash('right')) {
            grass_step.play();
            staticMaps.forEach((movable) => { movable.position.x -= player.velocity })
            none_staticMaps.forEach((movable) => { movable.position.x -= player.velocity })
        }
        else {
            player.image = player.sprites.right;
            player.frames.val = 1;
        }
    }
}

player.interact = function () {
    items.forEach((value, index) => {
        if (value != null) {
            if (value.name === 'nightPotion' ||
                value.name === 'dayPotion' ||
                value.name === 'healthPotion' ||
                value.name === 'apple' ||
                value.name === storyLineObject[current_mission]) {
                if (value.name === storyLineObject[current_mission] && hours > 4) {
                    return;
                }
                else {
                    let distance = findDistance({ player1: player, object2: value });
                    if (distance < 50) {
                        if (inventory.add(value.name, 1)) {
                            items[index] = null;
                            if (value.name === 'nightPotion' ||
                                value.name === 'dayPotion' ||
                                value.name === 'healthPotion') picksPotion.play();
                            else pickUp.play();
                        }
                    }
                }
            }
        }
    })
    if (playerInShrineRange) {
        inventory.items[flaskIndx] = {
            name: 'fountainFlask',
            count: 1
        }
        current_mission++;
        fullFlask.play();
        showMessage("Got it!");
        playerInShrineRange = false;
        inventory.update();
    }
    if (playerInChaliceRange) {
        inventory.items[flaskIndx] = {
            name: 'chaliceFlask',
            count: 1
        }
        fullFlask.play();
        current_mission++;
        showMessage("Acquired!");
        playerInChaliceRange = false;
        inventory.update();
    }
    // Recycling the health property of the player class since im not using it but it has
    // nothing to do with health, just checking if the talk bubble is already open or not
    if (merchant.state === 'interacting' || merchant.state === 'looping') {
        missionCompleted = storyLine();
        if (merchant_music.paused) delayMusic(merchant_music);
        if (!merchant.health) {
            chat.style.opacity = 1;
            text.innerHTML = missions[current_mission];
            if (missionCompleted) current_mission++;
            else merchant.health = true;
        } else {
            chat.style.opacity = 1;
            let rand_fact = Math.floor(Math.random() * 6);
            text.innerHTML = randomFacts[rand_fact];
        }
    }
}

function willCrash(direction) {
    let xDirection = 0;
    let yDirection = 0;
    if (keys.d.pressed && keys.a.pressed || keys.w.pressed && keys.s.pressed) { return true; }
    switch (direction) {
        case 'up':
            yDirection = player.velocity;
            break;
        case 'down':
            yDirection = (-1) * (player.velocity);
            break;
        case 'left':
            xDirection = player.velocity;
            break;
        case 'right':
            xDirection = (-1) * (player.velocity);
            break;
    }

    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (rectangularCollision({
            player1: player,
            object2: {
                ...boundary,
                position: {
                    x: boundary.position.x + xDirection,
                    y: boundary.position.y + yDirection
                }
            }
        })) return true;
    }
    if (hours > 3) return false;
    let tempGosth = {
        position:
        {
            x: gosth.position.x + 100 + xDirection,
            y: gosth.position.y + 170 + yDirection
        },
        width: 50,
        height: 50
    };
    if (rectangularCollision({
        player1: player,
        object2: tempGosth
    })) return true;

    return false;
}

function adjustSpeed() {
    if (pressedKeys > 1) { player.velocity = runnin_speed - 1; }
    else { player.velocity = runnin_speed; }
}

player.attack = function () {
    player.frames.animation_speed = 8;
    player.frames.max = 6;
    player.frames.val = 0;
    switch (lastKey) {
        case 's':
            gosthDamage('s');
            player.frames.lastSprite = player.sprites.downIdle;
            player.image = player.sprites.downAttack;
            break;
        case 'w':
            gosthDamage('n');
            player.frames.lastSprite = player.sprites.upIdle;
            player.image = player.sprites.upAttack;
            break;
        case 'd':
            gosthDamage('e');
            player.frames.lastSprite = player.sprites.rightIdle;
            player.image = player.sprites.rightAttack;
            break;
        case 'a':
            gosthDamage('w');
            player.frames.lastSprite = player.sprites.leftIdle;
            player.image = player.sprites.leftAttack;
            break;
    }
    sword_swing.play();
}

gameStarts();

function loading() {
    const loader = document.getElementById('loader_main');
    const main = document.getElementById('canvas');
    const bar = document.getElementById('barra_de_carga');

    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.display = 'none';
        main.style.display = 'flex';
        setTimeout(() => {
            main.style.opacity = 1
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
        bar.style.width = progress.toFixed(2) + '%';
        bar.innerHTML = progress.toFixed(2) + '%';
    }
}
player.checkStatus = function () {
    if (playerDamage.hit) {
        if (playerDamage.damage > player.health) player.health = 0;
        else player.health -= playerDamage.damage;
        healthBar.style.width = player.health + '%';
        playerDamage.hit = false;
        if (player.health === 0) {
            gameEnded = true;
            setTimeout(() => {
                location.reload();
            }, 2500);
            window.cancelAnimationFrame(reqAnim);
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
}


function play_shrine_sound() {
    let x = (backGround.position.x + 1160 - canvas.width / 2);
    let y = (backGround.position.y + 1720 - canvas.height / 2);
    let distance = Math.sqrt(((x ** 2) + (y ** 2)))
    volume = Math.round(distance / 100);

    if (volume > 7) {
        shrine_audio.pause();
        return;
    }
    switch (volume) {
        case 0: case 1:
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
    if (shrine_audio.paused) {
        shrine_audio.play();
    }
}

function drawCharacters() {
    let y1 = (gosth.position.y + gosth.height - 50);
    let y2 = (player.position.y + player.height - 35);
    if (y1 < y2) {
        gosth.draw();
        player.draw();
    } else {
        player.draw();
        gosth.draw();
    }
}

inventory.add = function (item, quantity) {
    let picked = false;
    inventory.items.forEach((invItem, index) => {
        if (invItem != null) {
            if (invItem.name === item) {
                invItem.count++;
                picked = true;
            }
        } else { nextFreeSlot = index; }
    });
    if (picked) { inventory.update(); return true; }
    else if (inventory.items[nextFreeSlot] != null) {
        showMessage("Inventory Full");
        return false;
    }
    else if (item === 'slime') {
        inventory.items[flaskIndx] = {
            name: 'slimeFlask',
            count: quantity
        }
        current_mission++;
        showMessage("Found it!");
        inventory.update();
        return true;
    }
    else {
        inventory.items[nextFreeSlot] = {
            name: item,
            count: quantity
        }
        if (item === 'flask') flaskIndx = nextFreeSlot;
        if (item === 'monsterEgg') { current_mission++; showMessage("Found it!"); }
        if (item === 'bones') { current_mission++; showMessage("Done!"); }
        inventory.update();
        return true;
    }

}

function beaconOfHope() {
    menu_sound.play();
    let user_data = {
        "xLocation": backGround.position.x,
        "yLocation": backGround.position.y,
        "hour": hours,
        "health": player.health,
        "progress": current_mission,
        "inventory": inventory.items
    }
    navigator.sendBeacon('/saveProgress', JSON.stringify(user_data));
    togglePause();
}

function merchant_interaction() {
    if (merchant.moving) return;
    let distance = findDistance({ player1: player, object2: merchant });

    if (distance < 150) {
        c.beginPath();
        c.moveTo((merchant.position.x + merchant.width / 2 - 50), (merchant.position.y + merchant.height / 2 - 50));
        c.lineTo((merchant.position.x + merchant.width / 2 - 70), (merchant.position.y + merchant.height / 2 - 70));
        c.strokeStyle = "white";
        c.font = '20px Papyrus';
        c.strokeText(merchant.action, (merchant.position.x + merchant.width / 2 - 100), (merchant.position.y + merchant.height / 2 - 75));
        c.stroke();
    }

    if (distance < 105 && merchant.state === 'resting') {
        merchant.frames.animation_speed = 6;
        merchant.state = 'interacting';
        merchant.image = merchant.sprites.entry;
        merchant.moving = true;
        merchant.frames.lastSprite = merchant.sprites.loop;
        merchant.frames.val = 0;
        merchant.frames.max = 8;

    }
    else if (distance < 105 && merchant.state === 'interacting') {
        merchant.goldenKeyOnDisplay = true;
        merchant.frames.animation_speed = 6;
        merchant.state = 'looping';
        merchant.frames.val = 0;
        merchant.frames.max = 8;
    }
    else if (distance > 105 && merchant.state === 'interacting' || distance > 105 && merchant.state === 'looping') {
        merchant.goldenKeyOnDisplay = false;
        merchant_music.pause();
        adjustSound();
        chat.style.opacity = 0;
        merchant.health = false;
        merchant.frames.animation_speed = 8;
        merchant.state = 'exiting';
        merchant.image = merchant.sprites.rest;
        merchant.frames.lastSprite = merchant.sprites.idle;
        merchant.moving = true;
        merchant.frames.val = 0;
        merchant.frames.max = 4;
    }
    else if (merchant.state === 'exiting') {
        merchant.frames.animation_speed = 8;
        merchant.state = 'resting';
        merchant.frames.val = 0;
        merchant.frames.max = 8;
    }
}

function fillArea(x, y, w, h, color) {
    c.fillStyle = color;
    c.fillRect(x, y, w, h);
}

function objectsDrawing() {
    backGround.draw();
    // Shrine Sound Effect
    play_shrine_sound();
    // Draw Shrine
    shrine.draw();
    if (gosthFree && gosth.engaged) gosth.ui.style.opacity = 1;
    else gosth.ui.style.opacity = 0;
    // Map items
    items.forEach(value => {
        if (value != null) {
            if (value.name === 'nightPotion' ||
                value.name === 'dayPotion' ||
                value.name === 'healthPotion' ||
                value.name === 'apple' ||
                value.name === storyLineObject[current_mission]) {
                if (value.name === storyLineObject[current_mission] && hours > 4) return;
                c.drawImage(inventory.itemImages[value.name], value.position.x, value.position.y);
                let distance = findDistance({ player1: player, object2: value });
                if (distance < 100) {
                    c.beginPath();
                    c.moveTo((value.position.x + value.width / 2 - 15), (value.position.y + value.height / 2 - 15));
                    c.lineTo((value.position.x + value.width / 2 - 30), (value.position.y + value.height / 2 - 30));
                    c.strokeStyle = "white";
                    c.font = '15px Papyrus';
                    c.strokeText("pick up?", (value.position.x + value.width / 2 - 50), (value.position.y + value.height / 2 - 40));
                    c.stroke();
                }
            }
        }
    });
    if (current_mission === 11 && hours > 8 && hours < 18) {
        let distance = findDistance({ player1: player, object2: shrine });
        if (distance < 200) {
            c.beginPath();
            c.moveTo((shrine.position.x + shrine.width / 2 + 70), (shrine.position.y + shrine.height / 2 - 15));
            c.lineTo((shrine.position.x + shrine.width - 50), (shrine.position.y + 60));
            c.strokeStyle = "white";
            c.font = '20px Papyrus';
            c.strokeText("Fill bottle?", (shrine.position.x + shrine.width - 40), (shrine.position.y + 60));
            c.stroke();
        }
        if (distance < 100) playerInShrineRange = true;
    }
    if (current_mission === 15 && hours > 8 && hours < 18) {
        let distance = findDistance({ player1: player, object2: golden_chalice });
        if (distance < 200) {
            c.beginPath();
            c.moveTo((golden_chalice.position.x + golden_chalice.width / 2 + 70), (golden_chalice.position.y + golden_chalice.height / 2 - 15));
            c.lineTo((golden_chalice.position.x + golden_chalice.width - 40), (golden_chalice.position.y + 90));
            c.strokeStyle = "white";
            c.font = '20px Papyrus';
            c.strokeText("Fill bottle?", (golden_chalice.position.x + golden_chalice.width - 40), (golden_chalice.position.y + 60));
            c.stroke();
        }
        if (distance < 100) playerInChaliceRange = true;
    }
    if (displayMessage) {
        c.beginPath();
        bubble.draw();
        c.strokeStyle = "black";
        c.font = '15px Papyrus';
        c.strokeText(message, bubble.position.x + 5, bubble.position.y + 18);
        c.stroke();
    }
    merchant.draw();
    // Interact with merchant
    merchant_interaction();
    // Draw golden Key
    if (merchant.goldenKeyOnDisplay) goldenKey.draw();
    // draw merchant
    // Draw blue lights
    if (hours === 0) blueLights.draw();
    coolEffect.interact();
    darkness.interact();
    if (gosthFree) {
        if (!gosth.moving) gosth.navigate(player.position.x, player.position.y);
        drawCharacters();
    } else player.draw();
    foreground.draw();
    golden_chalice.draw();
}

coolEffect.interact = function () {
    if (!coolEffect.play) return;
    coolEffect.draw();
    if (coolEffect.frames.row === (coolEffect.frames.rows - 1) &&
        coolEffect.frames.val === (coolEffect.frames.max - 1)) coolEffect.play = false;
}
darkness.interact = function () {
    if (!darkness.play) return;
    darkness.draw();
    if (darkness.frames.row === (darkness.frames.rows - 1) &&
        darkness.frames.val === (darkness.frames.max - 1)) darkness.play = false;
}

inventory.use = function (index) {
    if (inventory.items[index] === null) return;
    else if (inventory.items[index].name === 'nightPotion' ||
        inventory.items[index].name === 'apple' ||
        inventory.items[index].name === 'dayPotion' ||
        inventory.items[index].name === 'healthPotion') {
        inventory.items[index].count--;
        switch (inventory.items[index].name) {
            case 'dayPotion':
                potionSound.play();
                coolEffect.play = true;
                coolEffect.frames.max = 5;
                coolEffect.frames.rows = 3;
                coolEffect.frames.val = 0;
                coolEffect.frames.row = 0;
                coolEffect.frames.animation_speed = 6;
                coolEffect.image = coolEffect.sprites.day;
                if (gosthFree) invokeGosth('out');
                hours = 12;
                adjustSound();
                adjustLight();
                break;
            case 'nightPotion':
                potionSound.play();
                coolEffect.play = true;
                coolEffect.frames.max = 5;
                coolEffect.frames.rows = 4;
                coolEffect.frames.val = 0;
                coolEffect.frames.row = 0;
                coolEffect.frames.animation_speed = 6;
                coolEffect.image = coolEffect.sprites.night;
                hours = 0;
                if (!gosth.engaged) invokeGosth('in');
                adjustSound();
                adjustLight();
                break;
            case 'healthPotion':
                coolEffect.play = true;
                potionSound.play();
                coolEffect.frames.max = 5;
                coolEffect.frames.rows = 6;
                coolEffect.frames.val = 0;
                coolEffect.frames.row = 0;
                coolEffect.frames.animation_speed = 3;
                coolEffect.image = coolEffect.sprites.heal;
                player.health = 100;
                healthBar.style.width = player.health + '%';
                break;
            case 'apple':
                apple_sound.play();
                player.health += 15;
                if (player.health > 100) player.health = 100;
                healthBar.style.width = player.health + '%';
                break;
        }
        inventory.update();
    }
    else {
        showMessage("Can\'t use this.")
    }
}

function death() {
    window.requestAnimationFrame(death);
    if (!coolEffect.play && !player.moving) {
        coolEffect.play = true;
        coolEffect.frames.val = 0;
        coolEffect.frames.row = 0;
    }
    if (!player.moving) { player.image = player.sprites.death, player.frames.val = 4; player.moving; player.frames.elapsed = 0; }
    backGround.draw();
    displayTime();
    player.draw();
    coolEffect.draw();
}

function togglePause() {
    menu_sound.play();
    // toggle the value of isRunning
    isRunning = !isRunning;
    // call animate() if working
    if (isRunning) {
        adjustSound();
        menu.style.display = 'none';
        animate();
    }
    else {
        currentMusic.pause();
        menu.style.display = 'flex';
    }
}

function findDistance({ player1, object2 }) {
    let x = object2.position.x + object2.width / 2 - (player1.position.x + player1.width / 2);
    let y = object2.position.y + object2.height / 2 - (player1.position.y + player1.height / 2);
    let distance = Math.sqrt(((x ** 2) + (y ** 2)));
    /*
        c.beginPath();
        c.moveTo((object2.position.x + object2.width / 2), (object2.position.y + object2.height / 2));
        c.lineTo((player1.position.x + player1.width / 2), (player1.position.y + player1.height / 2));
        c.stroke();
    */
    return distance;
}

function gosthDamage(direc) {
    setTimeout(() => {
        let newDistance = findDistance({ player1: player, object2: gosth });
        if (newDistance < 100) {
            let y1 = (gosth.position.y + gosth.height - 50);
            let y2 = (player.position.y + player.height - 35);
            let x1 = (gosth.position.x + gosth.width / 2);
            let x2 = (player.position.x + player.width / 2);
            switch (direc) {
                case 'n':
                    if (y1 < y2 && Math.abs(x2 - x1) < 35 && newDistance < 100) { gosth.health -= playerPower; }
                    break;
                case 's':
                    if (y1 > y2 && Math.abs(x2 - x1) < 35 && newDistance < 40) { gosth.health -= playerPower; }
                    break;
                case 'e':
                    if (x1 > x2 && Math.abs(y2 - y1) < 25 && newDistance < 90) { gosth.health -= playerPower; }
                    break;
                case 'w':
                    if (x1 < x2 && Math.abs(y2 - y1) < 25 && newDistance < 90) { gosth.health -= playerPower; }
                    break;
            }
            if (gosth.health <= 0) {
                gameEnded = true;
                startEndMovie();
            }
        }
    }, 300);
}

function invokeGosth(direc) {
    darkness.position.x = gosth.position.x - 100;
    darkness.position.y = gosth.position.y - 100;
    if (direc === 'in' && !gosthFree) {
        gosth.health = 100;
        darkness.play = true;
        darkness.frames.val = 0;
        darkness.frames.row = 0;
        setTimeout(() => {
            gosthFree = true;
        }, 1100);
    } else {
        gosthFree = false;
        gosth.engaged = false;
        darkness.play = true;
        darkness.frames.val = 0;
        darkness.frames.row = 0;
    }
}

function storyLine() {
    let completed = false;
    if (current_mission <= 6) return true;
    else if (current_mission === 7) {
        inventory.items.forEach(item => {
            if (item != null) {
                if (item.name === 'apple' && item.count >= 3) {
                    item.count -= 3;
                    merchant.health = false;
                    inventory.update();
                    completed = true;
                }
            }
        });
    } else if (current_mission === 8) {
        setTimeout(() => {
            inventory.add('nightPotion', 1);
            inventory.add('flask', 1);
            inventory.update();
        }, 3000);
        completed = true;
    }
    else if (current_mission === 10) {
        inventory.items.forEach(item => {
            if (item != null) {
                if (item.name === 'slimeFlask') {
                    item.count = 0;
                    merchant.health = false;
                    inventory.update();
                    setTimeout(() => {
                        inventory.add('dayPotion', 1);
                        inventory.add('flask', 1);
                        inventory.update();
                    }, 3000);
                    completed = true;
                }
            }
        });
    }
    else if (current_mission === 12) {
        inventory.items.forEach(item => {
            if (item != null) {
                if (item.name === 'fountainFlask') {
                    item.count = 0;
                    merchant.health = false;
                    inventory.update();
                    setTimeout(() => {
                        inventory.add('nightPotion', 1);
                        inventory.update();
                    }, 2000);
                    completed = true;
                }
            }
        });
    }
    else if (current_mission === 14) {
        inventory.items.forEach(item => {
            if (item != null) {
                if (item.name === 'monsterEgg') {
                    item.count = 0;
                    merchant.health = false;
                    inventory.update();
                    setTimeout(() => {
                        inventory.add('flask', 1);
                        inventory.add('dayPotion', 1);
                        inventory.update();
                    }, 2000);
                    completed = true;
                }
            }
        });
    }
    else if (current_mission === 16) {
        inventory.items.forEach(item => {
            if (item != null) {
                if (item.name === 'chaliceFlask') {
                    item.count = 0;
                    merchant.health = false;
                    inventory.update();
                    completed = true;
                }
            }
        });
    }
    else if (current_mission === 18) {
        inventory.items.forEach(item => {
            if (item != null) {
                if (item.name === 'bones') {
                    item.count = 0;
                    merchant.health = false;
                    inventory.update();
                    completed = true;
                }
            }
        });
    }
    else if (current_mission === 19) {
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
            inventory.add('nightPotion', 1);
            inventory.add('healthPotion',1);
            inventory.update();
            playerPower = 20;
            gosth.power = 30;
        }, 2000);
    }
    else return false;

    return completed;
}

function showMessage(text) {
    message = text;
    displayMessage = true;
    setTimeout(() => {
        displayMessage = false;
    }, 3000);
}
function toggleControls() {
    menu_sound.play();
    if (!controlHandler) {
        buttonsUp = setInterval(() => {
            uiAll.style.backgroundImage = "url('/static/images/controls.png')";
        }, 500);
        buttonsDown = setInterval(() => {
            uiAll.style.backgroundImage = "url('/static/images/controlsDown.png')";
        }, 1000)
        controlHandler = true;
        togglePause();
    } else {
        clearInterval(buttonsUp);
        clearInterval(buttonsDown);
        uiAll.style.backgroundImage = 'none';
        controlHandler = false;
        togglePause();
    }
}

function startEndMovie() {
    window.cancelAnimationFrame(reqAnim);
    while (mw.hasChildNodes()) {
        mw.removeChild(mw.firstChild);
    }
    while (cw.hasChildNodes()) {
        cw.removeChild(cw.firstChild);
    }
    cw.style.display = 'none';
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
    hbw.style.width = 100 + '%';
    chat.style.width = 100 + "%";
    pw.style.width = 100 + "%";
    chat.classList.add("bb");
    pw.classList.add("bb");
    setTimeout(() => {
        uiAll.style.background = 'black';
    }, 1000);
    currentMusic.pause();
    drum.play();
    setTimeout(() => {
        lastScene();
        backGround.position.x = -1751;
        backGround.position.y = -2500;
        gosth.image = gosth.sprites.left;
        gosth.frames.lastSprite = gosth.sprites.left;
        gosth.frames.val = 0;
        gosth.moving = true;
        gosth.position.x = canvas.width;
        gosth.position.y = canvas.height / 3;
        player.frames.val = 0;
        player.frames.max = 8;
        player.image = player.sprites.left;
        player.idle_frames = 8;
        player.frames.lastSprite = player.sprites.left;
        player.position.x = canvas.width + 680;
        player.idle_animation_speed = 4;
        player.animation_speed = 4;
        player.position.y = canvas.height / 3 + 70;
        uiAll.style.background = 'none';
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
        setTimeout(()=>{
            intense1.play();
            currentMusic.pause();
        },3200);
    }, 2000);
}

function lastScene() {
    requestAnimationFrame(lastScene);
    let xg = 3;
    let xp = 5;
    backGround.draw();
    player.draw();
    if (player.position.x === canvas.width / 2 - 50) {
        player.image.src = '/static/images/WarriorLastAttack.png';
        player.position.y -= 70;
        player.moving = true;
        player.frames.val = 0;
        player.frames.max = 6;
        player.animation_speed = 6;
        jump = true;
        setTimeout(()=>{
            final_blow.play();
        },150);
    }
    if (jump && !player.moving) {
        if (player.position.y < canvas.height / 3 + 50) player.position.y += 30;
        playAnimationDead();
        player.frames.val = 0;
        xg = 0;
        xp = 0;
        setTimeout(()=>{
            hours = 12;
            adjustLight();
        }, 2000);
    } else {
        gosth.position.x -= xg;
        player.position.x -= xp;
    }
    if (!gosth.engaged && !gosth.moving) {
        player.image = player.sprites.downIdle;
        player.frames.max = 5;
        player.frames.val = 0;
    }
    else gosth.draw();
}

function playAnimationDead() {
    if (gosth.engaged) {
        gosth.image.src = '/static/images/enemy.death.png';
        gosth.frames.max = 24;
        gosth.frames.val = 0;
        gosth.animation_speed = 5;
        enemy_hurt.play();
        gosth.moving = true;
        gosth.engaged = false;
        setTimeout(()=>{
            window.cancelAnimationFrame(lastScene);
            ok4RealLastScene();
        },3000);
        setTimeout(()=>{
            const textnode = document.createTextNode("Thank you Hero you have retorned the light to G's World.");
            chat.appendChild(textnode);
            const textnode1 = document.createTextNode("The journy has just began, but you have set us to a great start.");
            pw.appendChild(textnode1);
            setTimeout(()=>{
                const textnode2 = document.createTextNode("- G");
                const br = document.createElement('br');
                pw.appendChild(br);
                pw.appendChild(textnode2);
            },2000)
        },4000);
    }
}

function  ok4RealLastScene(){
    requestAnimationFrame(ok4RealLastScene);
    backGround.draw();
    player.draw();
    finalMusic.loop = true;
    finalMusic.play();
    coolEffect.draw();
    setTimeout(()=>{
        credits();
    },7000);
}

function credits(){
    window.cancelAnimationFrame(ok4RealLastScene);
    while (uiAll.hasChildNodes()) {
        uiAll.removeChild(uiAll.firstChild);
    }
    uiAll.appendChild(x);
    x.play();
}

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
