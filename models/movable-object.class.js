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
        return this.y + this.height - this.offsetY <= obj.y &&
                this.y + this.height - this.offsetY > obj.y - this.speedY &&
                this.x + this.width > obj.x &&
                this.x < obj.x + obj.width;
    }

    isCollidingFrontOrBack(obj) {
        return (this.x + this.offsetX + this.width >= obj.x + obj.offsetX &&
            this.x + this.offsetX <= obj.x + obj.width + obj.offsetX) &&
           (this.y + this.offsetY + this.height >= obj.y + obj.offsetY &&
            this.y + this.offsetY <= obj.y + obj.height + obj.offsetY);
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

    killEnemy(enemy) {
        console.log('Character landed on top of the enemy');
        // Reverse the vertical speed to simulate bouncing
        this.speedY = -15; // Adjust the bounce force as needed

        // Remove the enemy from the level
        let index = this.world.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
            console.log('Enemy defeated!');
        }
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
