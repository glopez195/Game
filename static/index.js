// Targeting the canvas in the playOn HTML
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Asisgning canvas size
canvas.width = 1280;
canvas.height = 720;

// Animation Speeds
const idle_animation_speed = 12;
const running_animation_speed = 5;
const shrine_animation_speed = 10;

// Speeds
const runnin_speed = 4;


let stats;
// Map Img
const mapImg = new Image();
mapImg.src = "/static/images/map.png";

// Foreground Img
const foregroundImg = new Image();
foregroundImg.src = '/static/images/overlayer.png';

const apple = new Image();
apple.src = '/static/images/apple.png';
// Player Img
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

// Shrine Img
const shrineImg = new Image();
shrineImg.src = 'static/images/shrine.png';

// Mineral
const mineralImg = new Image();
mineralImg.src = 'static/images/rock 2.png'
// Roof Img
const roofImgTrue = new Image();
roofImgTrue.src = '/static/images/roof.png';
const roofImgFalse = new Image();
roofImgFalse.src = '/static/images/roofOpacity20.png';

// Luces azules
const luzAzul = new Image();
luzAzul.src = '/static/images/lucesAzules.png';

// Map Symbols for collisions and objects
const apple_symbol = 1360;
const collision_symbol = 1359;

// Size of the map in tiles
const MAP_TILES_WIDTH = 60;

const offset = {
    x: -1700,
    y: -1700
}

let enemybOut = true;

// ---------------------Time Variables
let lucesAzules = false;
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
const grass_step = new Audio('/static/sounds/03_Step_grass_03.wav');
const sword_swing = new Audio('/static/sounds/fast-sword-whoosh.wav');
const shrine_audio = document.getElementById("shrine_sound");
shrine_audio.loop = true;
shrine_audio.volume = 0;
shrine_audio.autoplay = true;

// Adding boudaries objects to the coordenates of the collision array
const boundaries = [];
// Adding apples objects to the coordenates of the apples array
const apples = [];
// Count how many keys are being pressed
let pressedKeys = 0;
// Last key pressed
let lastKey = 's';
// Inserting all the collision boxes coordenates in an array
const collision_map = []
for (let i = 0; i < collisions.length; i += MAP_TILES_WIDTH) {
    collision_map.push(collisions.slice(i, MAP_TILES_WIDTH + i))
}

// Inserting all the apples coordenates in an array
const apples_map = []
for (let i = 0; i < apples_json.length; i += MAP_TILES_WIDTH) {
    apples_map.push(apples_json.slice(i, MAP_TILES_WIDTH + i))
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

// Solid Roof
const roof_img_true = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: roofImgTrue
})

const blueLights = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: luzAzul
})

// Roof image with an opacity of 20% to see through it
const roof_img_false = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: roofImgFalse
})

//   Creating Player object
const player = new Player({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2 + 50
    },
    image: playerDownIdlImg,
    frames: {
        max: 5,
        animation_speed: idle_animation_speed
    },
    moving: false,
    velocity: runnin_speed,
    sprites: {
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

const enemy = new Player({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2 + 50
    },
    image: enemyIdleSE,
    frames: {
        max: 12,
        animation_speed: idle_animation_speed - 4
    },
    moving: false,
    velocity: runnin_speed + 10,
    sprites: {
        down: enemyIdleS,
        down_right: enemyIdleSW,
        down_left: enemyIdleSW,
        up: enemyIdleN,
        up_left: enemyIdleNW,
        up_right: enemyIdleNE,
        left: enemyIdleW,
        right: enemyIdleE,
        downAttack: enemyAttackS,
        down_left_Attack: enemyAttackSW,
        down_right_Attack: enemyAttackSE,
        upAttack: enemyAttackN,
        up_left_Attack: enemyAttackNW,
        up_right_Attack: enemyAttackNE,
        leftAttack: enemyAttackW,
        rightAttack: enemyAttackE
    }
})

const shrine = new Sprite({
    position: {
        x: 960,
        y: 1590
    },
    image: shrineImg,
    frames: {
        max: 8,
        animation_speed: shrine_animation_speed
    }
})

const mineral = new Sprite({
    position: {
        x: 3750,
        y: 1090
    },
    image: mineralImg,
    frames: {
        max: 4,
        animation_speed: shrine_animation_speed * 2.5
    }
})


// All the objects that are moving to create optic ilusion that the player is moving
const none_staticMaps = [backGround, foreground, roof_img_false, roof_img_true, blueLights];
let staticMaps = [];

window.addEventListener("load", () => {
    loading();
})


async function gameStarts() {
    // Save progress in case of window closing 
    window.addEventListener("unload", function () {
        let user_data = {
            "xLocation": backGround.position.x,
            "yLocation": backGround.position.y,
            "hour": hours
        }
        navigator.sendBeacon('/saveProgress', JSON.stringify(user_data));
    })

    let response = await fetch('/getStats');
    stats = await response.json();

    shrine.position.x += stats.xLocation;
    shrine.position.y += stats.yLocation;
    mineral.position.x += stats.xLocation;
    mineral.position.y += stats.yLocation;
    none_staticMaps.forEach(movable => {
        movable.position.x = stats.xLocation;
        movable.position.y = stats.yLocation;
    })
    hours = stats.hour;

    collision_map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == collision_symbol) {
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + stats.xLocation,
                            y: i * Boundary.height + stats.yLocation
                        },
                        color: 'rgba(255, 0, 0)'
                    }))
            }
        })
    })
    apples_map.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == apple_symbol) {
                apples.push({
                    position: {
                        x: j * Boundary.width + stats.xLocation,
                        y: i * Boundary.height + stats.yLocation
                    },
                    height: apple.height,
                    width: apple.width
                })
            }
        })
    })
    adjustLight();
    staticMaps = [...boundaries, ...apples, shrine, mineral, enemy];
    //    ----------------------Main refreshing function ---------------------------
    function animate() {
        window.requestAnimationFrame(animate)

        // Draw background --------------------------------------------------------------------------
        backGround.draw();
        displayTime();

        // Draw the shrine and play sound --------------------------------------------------------------------
        shrine.draw();
        play_shrine_sound();

        // The commented function below is only for troubleshooting: displays the collision boxes for the terrain
        //boundaries.forEach(boundary => {  boundary.draw();});

        // Drawing the apple images whenever there is one in the map -----------------------------------------
        apples.forEach(apple_item => {
            c.drawImage(apple, apple_item.position.x, apple_item.position.y)
            //if (rectangularCollision(apple_item, player)) {}
        });
        if (lucesAzules) blueLights.draw();
        // Draw player sprite -----------------------------------------------------------------------
        player.draw();
        if (enemybOut)
        {
            if (min != minutes)
            {
                navigate_enemy();
                min = minutes;
            }
            enemy.draw();
        }
        // Draw all objects that are being shown on top of the player image -------------------------------
        foreground.draw();
        // Draws the roof depending on the position of the player
        drawRoof();

        // Takes input to navigate the player through the map
        if (!player.moving) navigate();
        if (pressedKeys < 0) pressedKeys = 0;

    }
    setTimeout(() => {
        animate();
    }, 3000);
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
            PlayerAttack();
            break
    }
})

window.addEventListener('keyup', (e) => {
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
            break
        case 'a':
            pressedKeys--;
            keys.a.pressed = false;
            if (pressedKeys === 0 && !player.moving) {
                player.frames.val = 0;
                player.image = player.sprites.leftIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break
        case 's':
            pressedKeys--;
            keys.s.pressed = false;
            if (pressedKeys === 0 && !player.moving) {
                player.frames.val = 0;
                player.image = player.sprites.downIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break
        case 'd':
            pressedKeys--;
            keys.d.pressed = false;
            if (pressedKeys === 0 && !player.moving) {
                player.frames.val = 0;
                player.image = player.sprites.rightIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break
    }
})


function navigate() {
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
            player.image = playerUpImg;
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

function interact(item) {

    console.log("Cogela cabron");
}

function drawRoof() {
    if (backGround.position.x < -2900 && backGround.position.y > -250) {
        roof_img_false.draw();
    }
    else { roof_img_true.draw(); }
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
        })) {
            return true;
        }

    }
    return false;
}

function adjustSpeed() {
    if (pressedKeys > 1) { player.velocity = runnin_speed - 1; }
    else { player.velocity = runnin_speed; }
}

function PlayerAttack() {
    player.frames.animation_speed = 8;
    player.frames.max = 6;
    player.frames.val = 0;
    switch (lastKey) {
        case 's':
            player.frames.lastSprite = player.sprites.downIdle;
            player.image = player.sprites.downAttack;
            break;
        case 'w':
            player.frames.lastSprite = player.sprites.upIdle;
            player.image = player.sprites.upAttack;
            break;
        case 'd':
            player.frames.lastSprite = player.sprites.rightIdle;
            player.image = player.sprites.rightAttack;
            break;
        case 'a':
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
    }, 3000);
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

function displayTime() {
    clock = new Date();
    minutes = clock.getSeconds();
    if (minutes === 0 && !hourAdded) {
        hours++;
        if (hours === 24) {
            hours = 0;
        }
        adjustLight();
        hourAdded = true;
    }
    if (minutes > 1) hourAdded = false;
    time.innerHTML = hours + ':';
    if (minutes < 10) time.innerHTML += '0';
    time.innerHTML += minutes;
}

function adjustLight() {
    switch (hours) {
        case 0:
            lucesAzules = true;
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
        case 1:
            lucesAzules = false;
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
        case 2: case 3:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
        case 4:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.4;
            break;
        case 5:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.5;
            break;
        case 6:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.6;
            break;
        case 7:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.8;
            break;
        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17:
            game_layer.style.opacity = 1;
            time_layer.style.backgroundColor = nightColor;
            break;
        case 18:
            time_layer.style.backgroundColor = '#b14500';
            game_layer.style.opacity = 0.9;
            break;
        case 19:
            time_layer.style.backgroundColor = '#b14500';
            game_layer.style.opacity = 0.8;
            break;
        case 20:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.6;
            break;
        case 21:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.5;
            break;
        case 22:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.4;
            break;
        case 23:
            time_layer.style.backgroundColor = nightColor;
            game_layer.style.opacity = 0.3;
            break;
    }
    if (hours >= 20 && solIsUp === true || hours < 6 && solIsUp === true) {
        time_icon.src = '/static/images/moon.png';
        solIsUp = false;
    }
    else if (hours >= 6 && solIsUp === false && hours < 20) {
        time_icon.src = '/static/images/sun.png';
        solIsUp = true;
    }
}

function play_shrine_sound() {
    let x = (backGround.position.x + 1160 - canvas.width / 2);
    let y = (backGround.position.y + 1720 - canvas.height / 2);
    let distance = Math.sqrt(((x ** 2) + (y ** 2)))
    volume = Math.round(distance / 100);
    switch (volume) {
        case 0: case 1:
            shrine_audio.volume = 1;
            break;
        case 2:
            shrine_audio.volume = 0.8;
            break;
        case 3:
            shrine_audio.volume = 0.6;
            break;
        case 4:
            shrine_audio.volume = 0.4;
            break;
        case 5:
            shrine_audio.volume = 0.2;
            break;
        case 6:
            shrine_audio.volume = 0.1;
            break;
        case 7:
            shrine_audio.volume = 0.08;
            break;
        case 8:
            shrine_audio.volume = 0.05;
            break;
        case 9:
            shrine_audio.volume = 0.03;
            break;
        default:
            shrine_audio.volume = 0;
    }
    if (shrine_audio.paused) {
        shrine_audio.play();
    }
}

function navigate_enemy()
{
    let direction = Math.floor(Math.random() * 8);
    switch (direction)
    {
        case 0:
            // Going N
            enemy.image = enemy.sprites.up;
            enemy.position.y += enemy.velocity;
            break; 
        case 1:
            // Going NE
            enemy.image = enemy.sprites.up_right;
            enemy.position.y += enemy.velocity;
            enemy.position.x -= enemy.velocity;
            break; 
        case 2:
            // Going NW
            enemy.image = enemy.sprites.up_left;
            enemy.position.y += enemy.velocity;
            enemy.position.x += enemy.velocity;
            break; 
        case 3:
            // Going W
            enemy.image = enemy.sprites.left;
            enemy.position.x += enemy.velocity;
            break; 
        case 4:
            // Going SW
            enemy.image = enemy.sprites.down_left;
            enemy.position.y -= enemy.velocity;
            enemy.position.x += enemy.velocity;
            break; 
        case 5:
            // Going SE
            enemy.image = enemy.sprites.down_left;
            enemy.position.y -= enemy.velocity;
            enemy.position.x -= enemy.velocity;
            break; 
        case 6:
            // Going S
            enemy.image = enemy.sprites.down;
            enemy.position.y -= enemy.velocity;
            break; 
        case 7:
            // Going E
            enemy.image = enemy.sprites.right;
            enemy.position.x += enemy.velocity;
            break; 
    }
}