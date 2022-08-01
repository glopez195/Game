class Sprite {
    constructor({ position, velocity, image, frames = { max:1 }, sprites }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0 }
        this.velocity = velocity
        this.moving = false
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.sprites = sprites
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

        if (!this.moving) return
        if( this.frames.max > 1) this.frames.elapsed++
        if (this.frames.elapsed % 10 === 0)
        {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
        
    }
}

class Boundary {
    static width = 80
    static height = 80
    constructor({position, color}){
        this.color = color;
        this.position = position;
        this.width = 80;
        this.height = 80;
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}