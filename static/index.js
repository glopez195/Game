const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

const MAP_TILES_WIDTH = 60;

const map_tiles = []
for (let i = 0; i < collisions_map.length; i += MAP_TILES_WIDTH) {
    map_tiles
.push(collisions_map.slice(i, MAP_TILES_WIDTH + i))
}

const offset = {
    x: -2000,
    y: -2000
}
const boundaries = [];
const apples = [];

map_tiles.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol != 0)
        {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
        }
    })
})

// Map Img
const mapImg = new Image();
mapImg.src = '/Images/map.png';

// Foreground Img
const foregroundImg = new Image();
foregroundImg.src = '/Images/overlayer.png';


// Player Img
const playerDownImg = new Image()
playerDownImg.src = 'Images/playerDown.png'
const playerUpImg = new Image()
playerUpImg.src = 'Images/playerUp.png'
const playerLeftImg = new Image()
playerLeftImg.src = 'Images/playerLeft.png'
const playerRightImg = new Image()
playerRightImg.src = 'Images/playerRight.png'
const playerFastDown = new Image()
playerFastDown.src = 'Images/playerDownFast.png'
const playerFastUp = new Image()
playerFastUp.src = 'Images/playerUpFast.png'
const playerFastLeft = new Image()
playerFastLeft.src = 'Images/playerLeftFast.png'
const playerFastRight = new Image()
playerFastRight.src = 'Images/playerRightFast.png'

// Roof Img
const roofImgTrue = new Image()
roofImgTrue.src = 'Images/roof.png'
const roofImgFalse = new Image()
roofImgFalse.src = 'Images/roofOpacity20.png'

// Creating the backGround Object
const backGround = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImg
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImg
})

const roof_img_true = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: roofImgTrue
})

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
        x: canvas.width/2,
        y: canvas.height/2 +50
    },
    image: playerDownImg,
    frames: {
        max:4
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

let speedUp = false;
const staticMaps = [backGround, ...boundaries, foreground, roof_img_false, roof_img_true]

function rectangularCollision ({object1, object2})
{
    return(
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y + ((object1.height/4)*3) <= object2.position.y + object2.height &&
        object1.position.y + object1.height >= object2.position.y
    )
}

//    ----------------------Main refreshing function ---------------------------
function animate() {
    window.requestAnimationFrame(animate)
    backGround.draw();
    boundaries.forEach(boundary => {  boundary.draw() })
    player.draw();
    foreground.draw();
    if (backGround.position.x < -2900 && backGround.position.y > -250)
    {
        roof_img_false.draw();
    }
    else {roof_img_true.draw();}
    navigate();
    console.log(backGround.position)    
    
}
animate()
let lastkey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
        case 'Shift':
            speedUp = (!speedUp)
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            player.moving = false
            keys.w.pressed = false
            break
        case 'a':
            player.moving = false
            keys.a.pressed = false
            break
        case 's':
            player.moving = false
            keys.s.pressed = false
            break
        case 'd':
            player.moving = false
            keys.d.pressed = false
            break
    }
})


function navigate()
{
    let moving = true
    if (keys.w.pressed && lastkey === 'w') {
        if (speedUp)
        {
            player.moving = true
            player.image = player.sprites.upFast
            player.velocity = 5
        }
        else
        {
            player.velocity = 3
            player.moving = true
            player.image = player.sprites.up
        }
        for (let i = 0; i < boundaries.length; i++)
        {
            const boundary = boundaries[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x,
                        y: boundary.position.y + player.velocity
                    }
                }
            })) {
                moving = false
                break
            }

        }
        if (moving){
            staticMaps.forEach((movable)=> {
                movable.position.y += player.velocity 
            })
        }
    }
     if (keys.a.pressed && lastkey === 'a') {
        if (speedUp)
        {
            player.moving = true
            player.image = player.sprites.leftFast
            player.velocity = 5
        }
        else
        {
            player.velocity = 3
            player.moving = true
            player.image = player.sprites.left
        }
        for (let i = 0; i < boundaries.length; i++)
        {
            const boundary = boundaries[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x + player.velocity,
                        y: boundary.position.y,
                    }
                }
            })) {
                moving = false
                break
            }

        }
        if (moving){
            staticMaps.forEach((movable)=> {
                movable.position.x += player.velocity 
            })
        }
    }
     if (keys.s.pressed && lastkey === 's') {
        if (speedUp)
        {
            player.moving = true
            player.image = player.sprites.downFast
            player.velocity = 5
        }
        else
        {
            player.velocity = 3
            player.moving = true
            player.image = player.sprites.down
        }
        for (let i = 0; i < boundaries.length; i++)
        {
            const boundary = boundaries[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x,
                        y: boundary.position.y - player.velocity
                    }
                }
            })) {
                moving = false
                break
            }

        }
        if (moving){
            staticMaps.forEach((movable) => {
                movable.position.y -= player.velocity 
            })
        }
    }
     if (keys.d.pressed && lastkey === 'd') {
        if (speedUp)
        {
            player.moving = true
            player.image = player.sprites.rightFast
            player.velocity = 5
        }
        else
        {
            player.velocity = 3
            player.moving = true
            player.image = player.sprites.right
        }
        for (let i = 0; i < boundaries.length; i++)
        {
            const boundary = boundaries[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...boundary,
                    position:{
                        x: boundary.position.x - player.velocity,
                        y: boundary.position.y
                    }
                }
            })) {
                moving = false
                break
            }

        }
        if (moving){
            staticMaps.forEach((movable)=> {
                movable.position.x -= player.velocity 
            })
        }
    }
}