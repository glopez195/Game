class Sprite {
    constructor({ position, velocity, image, frames = { max: 1, animation_speed: 10 }, sprites }) {
        this.position = position;
        this.image = image;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.velocity = velocity;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        };
        this.sprites = sprites;
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

        if (this.frames.max > 1) this.frames.elapsed++
        if (this.frames.elapsed % this.frames.animation_speed === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
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
    constructor({ position, velocity, image, frames = { max: 1, animation_speed: 10 }, sprites, moving,idle_animation_speed,idle_frames }) {
        this.position = position;
        this.image = image;
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
            if (this.frames.val < this.frames.max - 1) 
            {
                this.frames.val++;
            }
            else if(this.moving === true) 
            {   
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
