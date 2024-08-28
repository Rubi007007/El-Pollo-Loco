class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 1;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    invulnerable = false;
    invulnerableEndTime = 0;
    small_chicken_sound = new Audio('./audio/chicken/small_chicken_damage_sound.mp3');
    chicken_sound = new Audio('./audio/chicken/chicken_damage_sound.mp3');


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

            if (this instanceof Character && !this.isAboveGround()) {
                this.y = 150;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
        
    }

    isFalling() {
        return this.speedY < 0 && this.isAboveGround();
    }

    isColliding(obj) {
        return this.x + this.offsetX < obj.x + obj.width &&
           this.x + this.offsetX + this.hitboxWidth > obj.x &&
           this.y + this.offsetY < obj.y + obj.height &&
           this.y + this.offsetY + this.hitboxHeight > obj.y;
    }

    hit(enemyType) {
        if (!this.invulnerable) {
            if (enemyType == 'Chicken') {
                this.energy -= 20;
            } else if (enemyType == 'SmallChicken') {
                this.energy -= 10;
            } else if (enemyType == 'Endboss') {
                this.energy -= 40;
            }

            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
                this.invulnerable = true;
                this.invulnerableEndTime = new Date().getTime() + 1000;
                setTimeout(() => {
                    this.invulnerable = false;
                }, 1000);
            }
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
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
        let index = this.world.level.enemies.indexOf(enemy);
        this.enemyDies(enemy);

        setTimeout(() => {
            if (index > -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 400);
    }

    enemyDies(enemy) {
        enemy.isDead = true;
        enemy.animate();
        enemy.speed = 0;
        if (enemy.type == 'Chicken') {
            this.world.audioHandler.toggleSound(this.chicken_sound);
            this.world.audioHandler.toggleVolume(this.chicken_sound, 0.2);
        } else if (enemy.type == 'SmallChicken') {
            this.world.audioHandler.toggleSound(this.small_chicken_sound);
            this.world.audioHandler.toggleVolume(this.small_chicken_sound, 0.2);
        }
    }

    bounceEffectHit(enemy) {
        const bounceDistance = 150;
        const bounceSpeed = 15;
        const bounceSteps = 25;
        
        let direction = this.x < enemy.x ? -1 : 1;
        let step = 0;
        const distancePerStep = bounceDistance / bounceSteps;
        
        if (this.x >= -356) {
            let bounceInterval = setInterval(() => {
                if (step >= bounceSteps) {
                    clearInterval(bounceInterval);
                } else {
                    this.x += direction * distancePerStep;
                    step++;
                }
            }, bounceSpeed);
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
