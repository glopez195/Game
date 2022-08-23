class Sprite {
    constructor({ position, velocity, image, frames = { max: 1, animation_speed: 10, rows:1 }, sprites }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0, row:0 };
        this.velocity = velocity;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.rows
        };
        this.sprites = sprites;
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            this.frames.row * this.height,
            this.image.width / this.frames.max,
            this.image.height / this.frames.rows,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height / this.frames.rows
        )

        if (this.frames.max > 1) this.frames.elapsed++
        if (this.frames.elapsed % this.frames.animation_speed === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else if(this.frames.rows > 1) {
                this.frames.row++;
                this.frames.val=0;
                if (this.frames.row === this.frames.rows) this.frames.row = 0;
            }
            else this.frames.val = 0;
        }

    }
}

class Boundary {
    static width = 80;
    static height = 80;
    constructor({ position, color }) {
        this.color = color;
        this.position = position;
        this.width = 80;
        this.height = 80;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Player {
    constructor({ position, velocity, image, frames = { max: 1, animation_speed: 10 }, sprites, health, moving, idle_animation_speed, idle_frames }) {
        this.position = position;
        this.image = image;
        this.health = health;
        this.frames = { ...frames, val: 0, elapsed: 0, lastSprite: image };
        this.velocity = velocity;
        this.moving = moving;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        };
        this.sprites = sprites;
        this.idle_animation_speed = idle_animation_speed;
        this.idle_frames = idle_frames;
    }

    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        this.frames.elapsed++;
        if (this.frames.elapsed % this.frames.animation_speed === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++;
            }
            else if (this.moving === true) {
                this.frames.animation_speed = this.idle_animation_speed;
                this.image = this.frames.lastSprite;
                this.frames.max = this.idle_frames;
                this.frames.val = 0;
                this.moving = false;
            }
            else this.frames.val = 0;
        }

    }
}

class Inventory {
    constructor({ items, itemImages, state }) {
        this.items = items;
        this.itemImages = itemImages;
        this.state = state;
        this.ui = document.querySelector("#inventory");
        this.slots = document.querySelectorAll(".inventory_slot");
    }
    update() {
        this.items.forEach((value, index) => {
            let icon;
            if (value != null) {
                if (value.count === 0){
                    this.slots[8-index].removeChild(this.slots[8-index].firstElementChild);
                    this.slots[8 - index].innerHTML = "";
                    this.items[index] = null;
                } else {
                icon = this.itemImages[value.name];
                this.slots[8 - index].innerHTML = value.count;
                this.slots[8 - index].appendChild(icon);
                }
            }
        })
    }

    changeState() {
        if (inventory.state === 'hidden') {
            this.ui.style.opacity = 1;
            inventory.state = 'shown';
        } else {
            this.ui.style.opacity = 0;
            inventory.state = 'hidden';
        }
    }
}

class Enemy {
    constructor({ position, mapLimit, health,attack_reach, sounds, velocity, attack_frames, attack_animation_speed, image, frames = { max: 1, animation_speed: 10 }, sprites, moving, idle_animation_speed, idle_frames }) {
        this.position = position;
        this.image = image;
        this.mapLimit = mapLimit;
        this.attack_frames = attack_frames;
        this.frames = { ...frames, val: 0, elapsed: 0, lastSprite: image };
        this.velocity = velocity;
        this.moving = moving;
        this.health = health;
        this.attack_animation_speed = attack_animation_speed;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        };
        this.attack_reach = attack_reach;
        this.sprites = sprites;
        this.idle_animation_speed = idle_animation_speed;
        this.idle_frames = idle_frames;
        this.direction = 'se';
        this.sounds = sounds;
        this.engaged = false;
        this.playerXpos = 0;
        this.playerYpos = 0;
        this.playerW = 144;
        this.playerH = 144;
        this.power = 50;
        this.x = 0;
        this.y = 0;
        this.beforeAttackDirection = 'n';
        this.distance = 0;
        this.ui = document.querySelector('#portrait_wraper_gosth');
        this.health_bar = document.querySelector('#gosth_healthbar');
    }

    draw() {
        this.health_bar.style.height = this.health + "%";
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        this.frames.elapsed++;
        if (this.frames.elapsed % this.frames.animation_speed === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++;
            }
            else if (this.moving === true) {
                this.frames.animation_speed = this.idle_animation_speed;
                this.image = this.frames.lastSprite;
                this.frames.max = this.idle_frames;
                this.frames.val = 0;
                this.moving = false;
            }
            else this.frames.val = 0;
        }
    }

    navigate(playerX, playerY) {
        if(this.moving) return;
        if(this.health <= 0) {
            this.health = 0;
        }
        this.playerXpos = playerX;
        this.playerYpos = playerY;
        this.updatePlayerDistance();
        if (this.distance < this.attack_reach) {
            this.attack();
            this.moving = true;
            return;
        }
        else if (this.distance < 500 && this.playerInEngagingZone() && !this.engaged) this.engage();
        if (this.engaged) this.direction = this.findPlayer();
        this.frames.max = 12;
        this.animation_speed = this.idle_animation_speed;
        this.modifyVel();
        switch (this.direction) {
            case 'n':
                // Going N
                if (this.outsideArea(this.position.x, this.position.y - this.velocity)) return;
                this.image = this.sprites.up;
                this.position.y -= this.velocity;
                break;
            case 'ne':
                // Going NE
                if (this.outsideArea(this.position.x + this.velocity, this.position.y - this.velocity)) return;
                this.image = this.sprites.up_right;
                this.position.y -= this.velocity;
                this.position.x += this.velocity;
                break;
            case 'nw':
                // Going NW
                if (this.outsideArea(this.position.x - this.velocity, this.position.y - this.velocity)) return;
                this.image = this.sprites.up_left;
                this.position.y -= this.velocity;
                this.position.x -= this.velocity;
                break;
            case 'w':
                // Going W
                if (this.outsideArea(this.position.x - this.velocity, this.position.y)) return;
                this.image = this.sprites.left;
                this.position.x -= this.velocity;
                break;
            case 'sw':
                // Going SW
                if (this.outsideArea(this.position.x - this.velocity, this.position.y + this.velocity)) return;
                this.image = this.sprites.down_left;
                this.position.y += this.velocity;
                this.position.x -= this.velocity;
                break;
            case 'se':
                // Going SE
                if (this.outsideArea(this.position.x + this.velocity, this.position.y + this.velocity)) return;
                this.image = this.sprites.down_right;
                this.position.y += this.velocity;
                this.position.x += this.velocity;
                break;
            case 's':
                // Going S
                if (this.outsideArea(this.position.x, this.position.y + this.velocity)) return;
                this.image = this.sprites.down;
                this.position.y += this.velocity;
                break;
            case 'e':
                // Going E
                if (this.outsideArea(this.position.x + this.velocity, this.position.y)) return;
                this.image = this.sprites.right;
                this.position.x += this.velocity;
                break;
        }
    }

    attack() {
        this.frames.animation_speed = this.attack_animation_speed;
        this.frames.max = this.attack_frames;
        this.frames.val = 0;
        this.direction = this.findPlayer();
        this.beforeAttackDirection = this.direction;
        setTimeout(() => {
            this.updatePlayerDistance();
            this.direction = this.findPlayer();
            if (this.direction === this.beforeAttackDirection && this.distance <= (this.attack_reach * 2)) {
                playerDamage.hit = true;
                playerDamage.damage = this.power;
            }
        }, 400);
        switch (this.direction) {
            case 's':
                this.frames.lastSprite = this.sprites.down;
                this.image = this.sprites.down_Attack;
                break;
            case 'se':
                this.frames.lastSprite = this.sprites.down_right;
                this.image = this.sprites.down_right_Attack;
                break;
            case 'sw':
                this.frames.lastSprite = this.sprites.down_left;
                this.image = this.sprites.down_left_Attack;
                break;
            case 'n':
                this.frames.lastSprite = this.sprites.up;
                this.image = this.sprites.up_Attack;
                break;
            case 'ne':
                this.frames.lastSprite = this.sprites.up_right;
                this.image = this.sprites.up_right_Attack;
                break;
            case 'nw':
                this.frames.lastSprite = this.sprites.up_left;
                this.image = this.sprites.up_left_Attack;
                break;
            case 'e':
                this.frames.lastSprite = this.sprites.right;
                this.image = this.sprites.right_Attack;
                break;
            case 'w':
                this.frames.lastSprite = this.sprites.left;
                this.image = this.sprites.left_Attack;
                break;
        }
        this.sounds.attack.play();
    }

    findPlayer() {

        if (this.x < 20 && this.x > -20) {
            this.x = 0;
        }
        if (this.y < 20 && this.y > -20) {
            this.y = 0;
        }

        if (this.x < 0) {
            if (this.y < 0) return 'se';
            else if (this.y > 0) return 'ne';
            else return 'e';
        }
        else if (this.x > 0) {
            if (this.y < 0) return 'sw';
            else if (this.y > 0) return 'nw';
            else return 'w';
        }
        else {
            if (this.y < 0) return 's';
            else return 'n';
        }
    }

    updatePlayerDistance() {
        let x1 = (this.position.x + this.width / 2);
        let y1 = (this.position.y + this.height - 55);
        let x2 = (this.playerXpos + this.playerW / 2);
        let y2 = (this.playerYpos + this.playerH - 35);
        this.x = x1 - x2;
        this.y = y1 - y2;
        this.distance = (Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))).toFixed(2);
    }

    outsideArea(xPosition, yPosition) {
        let temp_dire = [];
        let random_direction = Math.floor(Math.random() * 3);

        if (xPosition < this.mapLimit.position.x) {
            temp_dire = ['ne', 'e', 'se'];
            this.direction = temp_dire[random_direction];
            playerInDanger = false;
            this.engaged = false;
            adjustSound();
            return true;
        }
        else if (xPosition + this.width > this.mapLimit.position.x + 2000) {
            temp_dire = ['nw', 'w', 'sw'];
            this.direction = temp_dire[random_direction];
            playerInDanger = false;
            this.engaged = false;
            adjustSound();
            return true;
        }
        else if (yPosition + this.height/3 < this.mapLimit.position.y) {
            temp_dire = ['sw', 's', 'se'];
            this.direction = temp_dire[random_direction];
            playerInDanger = false;
            this.engaged = false;
            adjustSound();
            return true;
        }
        else if (yPosition + this.height > this.mapLimit.position.y + 2000) {
            temp_dire = ['nw', 'n', 'ne'];
            this.direction = temp_dire[random_direction];
            playerInDanger = false;
            this.engaged = false;
            adjustSound();
            return true;
        }

    }

    modifyVel() {
        if (this.direction.length > 1 && !this.engaged) this.velocity = 1;
        else if (this.direction.length === 1 && !this.engaged) this.velocity = 2;
        else if (this.engaged && this.direction.length > 1) this.velocity = 3;
        else this.velocity = 4;
    }

    playerInEngagingZone() {
        if (this.playerXpos > this.mapLimit.position.x &&
            this.playerXpos + this.playerW < this.mapLimit.position.x + 2000 &&
            this.playerYpos > this.mapLimit.position.y &&
            this.playerYpos + this.playerH < this.mapLimit.position.y + 2000) {
            return true;
        }
        else {
            playerInDanger = false;
            adjustSound();
            this.engaged = false;
            return false;
        }
    }

    engage() {
        delayMusic(engage_music);
        playerInDanger = true;
        this.sounds.engaged.play();
        this.engaged = true;
    }
}