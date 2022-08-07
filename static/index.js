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
// Shrine Img
const shrineImg = new Image();
shrineImg.src = 'static/images/shrine.png';

// Roof Img
const roofImgTrue = new Image();
roofImgTrue.src = '/static/images/roof.png';
const roofImgFalse = new Image();
roofImgFalse.src = '/static/images/roofOpacity20.png';


// Map Symbols for collisions and objects
const apple_symbol = 1360;
const collision_symbol = 1359;

// Size of the map in tiles
const MAP_TILES_WIDTH = 60;

const offset = {
    x: -2000,
    y: -2000
}

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
    moving:false,
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


// All the objects that are moving to create optic ilusion that the player is moving
const none_staticMaps = [backGround, foreground, roof_img_false, roof_img_true];
let staticMaps = [];

async function gameStarts() {
    console.log("Game is starting")
    // Save progress in case of window closing 
    window.addEventListener("unload", function () {
        let user_data = {
            "xLocation": backGround.position.x,
            "yLocation": backGround.position.y
        }
        navigator.sendBeacon('/saveProgress', JSON.stringify(user_data));
    })

    let response = await fetch('/getStats');
    let stats = await response.json();

    shrine.position.x += stats.xLocation;
    shrine.position.y += stats.yLocation; 
    none_staticMaps.forEach(movable =>{
        movable.position.x = stats.xLocation;
        movable.position.y = stats.yLocation; 
    })

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

    staticMaps = [...boundaries, ...apples, shrine];

    //    ----------------------Main refreshing function ---------------------------
    function animate() {
        window.requestAnimationFrame(animate)

        // Draw background
        backGround.draw();

        // Draw the shrine
        shrine.draw();
        // The commented function below is only for troubleshooting: displays the collision boxes for the terrain
        //boundaries.forEach(boundary => {  boundary.draw();});

        // Drawing the apple images whenever there is one in the map
        apples.forEach(apple_item => {
            c.drawImage(apple, apple_item.position.x, apple_item.position.y)
            //if (rectangularCollision(apple_item, player)) {}
        });

        // Draw player sprite
        player.draw();

        // Draw all objects that are being shown on top of the player image
        foreground.draw();

        // Draws the roof depending on the position of the player
        drawRoof();

        // Takes input to navigate the player through the map
        if (!player.moving) navigate();
        console.log(player.moving);
        console.log(pressedKeys);
        if(pressedKeys < 0) pressedKeys = 0;

    } animate()
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
    let xPos = player1.position.x + 35;
    let pWidth = player1.width - 70; 
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
            if (player.moving)return;
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
            if (pressedKeys===0 && !player.moving){
                player.image = player.sprites.upIdle;
                player.frames.max = 5;
                player.frames.animation_speed = 12;
            }
            break
        case 'a':
            pressedKeys--;
            keys.a.pressed = false;
            if (pressedKeys===0 && !player.moving){
            player.image = player.sprites.leftIdle;
            player.frames.max = 5;
            player.frames.animation_speed = 12;
            }
            break
        case 's':
            pressedKeys--;
            keys.s.pressed = false;
            if (pressedKeys===0 && !player.moving){
            player.image = player.sprites.downIdle;
            player.frames.max = 5;
            player.frames.animation_speed = 12;
            }
            break
        case 'd':
            pressedKeys--;
            keys.d.pressed = false;
            if (pressedKeys===0 && !player.moving){
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

function PlayerAttack()
{
    player.frames.animation_speed = 8;
    player.frames.max = 6;
    player.frames.val = 0;
    switch (lastKey) 
        {
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
}

gameStarts();

