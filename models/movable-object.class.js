class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    otherDirection = false;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // throwable Objects should always fall
            return true;
        } else {
            return this.y < 150;
        }
        
    }

    // character.isColliding(chicken);
    isColliding(obj) {
        return this.x + this.offsetX < obj.x + obj.width &&
           this.x + this.offsetX + this.hitboxWidth > obj.x &&
           this.y + this.offsetY < obj.y + obj.height &&
           this.y + this.offsetY + this.hitboxHeight > obj.y;
    }

    isCollidingAbove(obj) {
        return this.y + this.height <= obj.y + 20;
    }

    isCollidingFrontOrBack(obj) {
        return (this.x + this.width >= obj.x && this.x <= obj.x + obj.width) &&
               (this.y + this.height <= obj.y + obj.height);
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime()
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 1
    }

    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 21;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationStopLastImage(images) {
        if (this.currentImage < images.length) {
            let path = images[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else {
            let path = images[images.length - 1];
            this.img = this.imageCache[path];
        }
    }
}
