const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 720;

const MAP_TILES_WIDTH = 60;

const collision_map = []
for (let i = 0; i < collisions.length; i += MAP_TILES_WIDTH) {
    collision_map.push(collisions.slice(i, MAP_TILES_WIDTH + i))
}
const apples_map = []
for (let i = 0; i < apples_json.length; i += MAP_TILES_WIDTH) {
    apples_map.push(apples_json.slice(i, MAP_TILES_WIDTH + i))
}
const offset = {
    x: -2000,
    y: -2000
}
const boundaries = [];
const apples = [];

collision_map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1359)
        {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    color: 'rgba(255, 0, 0, 0)'
                }))
        }
    })
})
apples_map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1360)
        {
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
const staticMaps = [backGround, ...boundaries,...apples, foreground, roof_img_false, roof_img_true]

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
    boundaries.forEach(boundary => {  boundary.draw();});
    apples.forEach(apple_item => {
        c.drawImage(apple, apple_item.position.x, apple_item.position.y)
    });
    player.draw();
    foreground.draw();
    if (backGround.position.x < -2900 && backGround.position.y > -250)
    {
        roof_img_false.draw();
    }
    else {roof_img_true.draw();}
    navigate();   
    
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
        for (let i = 0; i < apples.length; i++)
        {
            const apple_item = apples[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...apple_item,
                    position:{
                        x: apple_item.position.x,
                        y: apple_item.position.y
                    }
                }
            })) {
                interact(apple_item)
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
        for (let i = 0; i < apples.length; i++)
        {
            const apple_item = apples[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...apple_item,
                    position:{
                        x: apple_item.position.x,
                        y: apple_item.position.y
                    }
                }
            })) {
                interact(apple_item)
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
        for (let i = 0; i < apples.length; i++)
        {
            const apple_item = apples[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...apple_item,
                    position:{
                        x: apple_item.position.x,
                        y: apple_item.position.y
                    }
                }
            })) {
                interact(apple_item)
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
            player.moving = true;
            player.image = player.sprites.rightFast;
            player.velocity = 5;
        }
        else
        {
            player.velocity = 3;
            player.moving = true;
            player.image = player.sprites.right;
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
                moving = false;
                break;
            }

        }
        for (let i = 0; i < apples.length; i++)
        {
            const apple_item = apples[i]
            if(rectangularCollision({
                object1:player,
                object2: {
                    ...apple_item,
                    position:{
                        x: apple_item.position.x,
                        y: apple_item.position.y
                    }
                }
            })) {
                interact(apple_item);
                break;
            }
        }
        if (moving){
            staticMaps.forEach((movable)=> {
                movable.position.x -= player.velocity;
            })
        }
    }
}

function interact(item)
{
    console.log("Cogela cabron");
}