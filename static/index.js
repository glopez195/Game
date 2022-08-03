// Targeting the canvas in the playOn HTML
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Asisgning canvas size
canvas.width = 1280;
canvas.height = 720;

// Map Symbols for collisions and objects
const apple_symbol = 1360;
const collision_symbol = 1359;

// Size of the map in tiles
const MAP_TILES_WIDTH = 60;

// Initial speed for player = normal
let speedUp = false;

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

// Starting position
const offset = {
    x: -2000,
    y: -2000
}

// Adding boudaries objects to the coordenates of the collision array
const boundaries = [];
// Adding apples objects to the coordenates of the apples array
const apples = [];

collision_map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == collision_symbol) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
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
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                height: apple.height,
                width: apple.width
            })
        }
    })
})


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
const player = new Sprite({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2 + 50
    },
    image: playerDownImg,
    frames: {
        max: 4
    },
    velocity: 3,
    sprites: {
        down: playerDownImg,
        up: playerUpImg,
        left: playerLeftImg,
        right: playerRightImg,
        downFast: playerFastDown,
        upFast: playerFastUp,
        leftFast: playerFastLeft,
        rightFast: playerFastRight
    }
})

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
function rectangularCollision({ object1, object2 }) {
    return (
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y + ((object1.height / 4) * 3) <= object2.position.y + object2.height &&
        object1.position.y + object1.height >= object2.position.y
    )
}

// Count how many keys are being pressed
let pressedKeys = 0;

// All the objects that are moving to create optic ilusion that the player is moving
const staticMaps = [backGround, ...boundaries, ...apples, foreground, roof_img_false, roof_img_true]

//    ----------------------Main refreshing function ---------------------------
function animate() {
    window.requestAnimationFrame(animate)

    // Draw background
    backGround.draw();

    // The commented function below is only for troubleshooting: displays the collision boxes for the terrain
    //boundaries.forEach(boundary => {  boundary.draw();});

    // Drawing the apple images whenever there is one in the map
    apples.forEach(apple_item => {
        c.drawImage(apple, apple_item.position.x, apple_item.position.y)
    });

    // Draw player sprite
    player.draw();

    // Draw all objects that are being shown on top of the player image
    foreground.draw();

    // Draws the roof depending on the position of the player
    drawRoof();

    // Takes input to navigate the player through the map
    navigate();

} animate()


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            if (!keys.w.pressed){pressedKeys++;}
            keys.w.pressed = true;
            break
        case 'a':
            if (!keys.a.pressed){pressedKeys++;}
            keys.a.pressed = true;
            break
        case 's':
            if (!keys.s.pressed){pressedKeys++;}
            keys.s.pressed = true;
            break
        case 'd':
            if (!keys.d.pressed){pressedKeys++;}
            keys.d.pressed = true;
            break
        case 'Shift':
            speedUp = (!speedUp)
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            pressedKeys--;
            player.moving = false;
            keys.w.pressed = false;
            break
        case 'a':
            pressedKeys--;
            player.moving = false;
            keys.a.pressed = false;
            break
        case 's':
            pressedKeys--;
            player.moving = false;
            keys.s.pressed = false;
            break
        case 'd':
            pressedKeys--;
            player.moving = false;
            keys.d.pressed = false;
            break
    }
})


function navigate() {
    // Player pressed 'W' to go up
    if (keys.w.pressed) {
        player.moving = true
        if (speedUp) {
            player.image = player.sprites.upFast
        }
        else {
            player.image = player.sprites.up
        }
        adjustSpeed();
        if (!willCrash('up')) {
            staticMaps.forEach((movable) => { movable.position.y += player.velocity })
        }
        else{
            player.moving = false;
            player.image = playerUpImg;
            player.frames.val = 0;
        }
    }

    // Player pressed 'S' to go down
    if (keys.s.pressed) {
        player.moving = true;
        if (speedUp) {
            player.image = player.sprites.downFast;
        }
        else {
            player.image = player.sprites.down;
        }
        adjustSpeed();
        if (!willCrash('down')) {
            staticMaps.forEach((movable) => { movable.position.y -= player.velocity })
        }
        else{
            player.moving = false;
            player.image = playerDownImg;
            player.frames.val = 0;
        }
    }

    // Player pressed 'A' to go to the left
    if (keys.a.pressed) {
        player.moving = true
        if (speedUp) {
            player.image = player.sprites.leftFast
        }
        else {
            player.image = player.sprites.left
        }
        adjustSpeed();
        if (!willCrash('left')) {
            staticMaps.forEach((movable) => { movable.position.x += player.velocity })
        }
        else{
            player.moving = false;
            player.image = playerLeftImg;
            player.frames.val = 0;
        }
    }

    // Player pressed 'D' to go to the right
    if (keys.d.pressed) {
        player.moving = true;
        if (speedUp) {
            player.image = player.sprites.rightFast;
        }
        else {
            player.image = player.sprites.right;
        }
        adjustSpeed();
        if (!willCrash('right')) {
            staticMaps.forEach((movable) => { movable.position.x -= player.velocity })
        }
        else{
            player.moving = false;
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
            object1: player,
            object2: {
                ...boundary,
                position: {
                    x: boundary.position.x + xDirection,
                    y: boundary.position.y + yDirection
                }
            }
        })) {
            return true;
            break;
        }

    }
    return false;
}

function adjustSpeed()
{
    console.log(pressedKeys);
    if (speedUp)
    {
        if (pressedKeys > 1) {player.velocity = 4;}
        else {player.velocity = 5;}
    }
    else{
        if (pressedKeys > 1) {player.velocity = 2;}
        else {player.velocity = 3;}
    }
}

// Save progress in case of window closing 
window.addEventListener("unload", function(){
    console.log("left the page");
    let user_data = {   "xLocation" : backGround.position.x,
                        "yLocation" : backGround.position.y
                    }
    let user_data_jsoned = JSON.stringify(user_data);
    navigator.sendBeacon("/saveProgress", user_data_jsoned);
})