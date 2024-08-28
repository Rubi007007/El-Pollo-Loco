/**
 * Represents a movable object in the game, extending from the `DrawableObject` class. 
 * Handles movement, gravity, collisions, and interactions with other entities.
 */
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

    /**
     * Applies gravity to the object by continuously updating its vertical position 
     * and speed based on its acceleration. Ensures that the object remains above the ground.
     */
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

    /**
     * Determines if the object is above the ground level.
     * 
     * @returns {boolean} - True if the object is above ground, or always true for throwable objects.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
        
    }

    /**
     * Checks if the object is currently falling based on its vertical speed and ground position.
     * 
     * @returns {boolean} - True if the object is falling, false otherwise.
     */
    isFalling() {
        return this.speedY < 0 && this.isAboveGround();
    }

    /**
     * Determines if this object is colliding with another object.
     * 
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} - True if a collision is detected, false otherwise.
     */
    isColliding(obj) {
        return this.x + this.offsetX < obj.x + obj.width &&
           this.x + this.offsetX + this.hitboxWidth > obj.x &&
           this.y + this.offsetY < obj.y + obj.height &&
           this.y + this.offsetY + this.hitboxHeight > obj.y;
    }

    /**
     * Handles the hit event when the object is attacked by an enemy. 
     * Reduces the object's energy based on the enemy type and makes the object temporarily invulnerable.
     * 
     * @param {string} enemyType - The type of enemy (e.g., 'Chicken', 'SmallChicken', 'Endboss').
     */
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

    /**
     * Checks if the object is currently hurt (i.e., hit within the last second).
     * 
     * @returns {boolean} - True if the object was hurt recently, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1
    }

    /**
     * Checks if the object is dead (i.e., has no energy left).
     * 
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed to a fixed value.
     */
    jump() {
        this.speedY = 21;
    }

    /**
     * Handles the logic to kill an enemy, removes the enemy from the level after a delay.
     * 
     * @param {Object} enemy - The enemy to be killed.
     */
    killEnemy(enemy) {
        let index = this.world.level.enemies.indexOf(enemy);
        this.enemyDies(enemy);

        setTimeout(() => {
            if (index > -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }, 400);
    }

    /**
     * Triggers the death animation and sound for the enemy.
     * 
     * @param {Object} enemy - The enemy that dies.
     */
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

    /**
     * Applies a bounce effect when the object hits an enemy, pushing the object away from the enemy.
     * 
     * @param {Object} enemy - The enemy that was hit.
     */
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

    /**
     * Plays a sequence of images to animate the object.
     * 
     * @param {Array} images - The array of image paths to be used in the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
