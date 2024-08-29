/**
 * Handles collision detection and responses between the character, enemies, throwable objects, and collectables.
 * @class
 */
class CollisionHandler {    
    constructor(world) {
        this.world = world;
    }

    /**
     * Checks for collisions between the character and various entities in the world.
     * This includes enemies, throwable objects, collectable bottles, and coins.
     */
    checkCollisions() {
        this.checkCharacterCollisions();
        this.checkEndbossCollisions();
        this.collectBottleAfterCollision();
        this.collectCoinAfterCollision();
    }

    /**
     * Checks for collisions between the character and enemies.
     * Handles interactions such as hitting or killing enemies and processing thrown bottles.
     */
    checkCharacterCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.invulnerable || enemy.isDead) {
                return;
            }

            this.isCharCollidingWithEnemy(enemy);
            this.checkThrowedBottles(enemy);
        });
    }

    /**
     * Determines if the character is colliding with an enemy and handles the collision response.
     * Updates the character's state based on the collision and applies effects.
     * @param {Object} enemy - The enemy object to check for collision with the character.
     */
    isCharCollidingWithEnemy(enemy) {
        if (this.world.character.isColliding(enemy)) {
            if (this.world.character.isFalling()) {
                this.world.character.killEnemy(enemy);
                this.world.character.speedY = 15;
            } else if (!this.world.character.isAboveGround()) {
                this.world.character.hit(enemy.type);
                this.world.character.bounceEffectHit(enemy);
            }
            this.world.statusbarHealth.setPercentage(this.world.character.energy, this.world.statusbarHealth.IMAGES_HEALTHBAR);
        }
    }

    /**
     * Checks for collisions between thrown bottles and enemies.
     * Updates the bottle's state and removes it from the world if it has been used.
     * @param {Object} enemy - The enemy object to check for collision with thrown bottles.
     */
    checkThrowedBottles(enemy) {
        for (let i = 0; i < this.world.throwableObjects.length; i++) {
            let bottle = this.world.throwableObjects[i];

            if (!bottle.isUsed && enemy.isColliding(bottle)) {
                bottle.killEnemy(enemy);
                bottle.isUsed = true;
                bottle.splashAnimation();
                setTimeout(() => {
                    this.world.throwableObjects.splice(i, 1);
                }, 600);
                break;
            }
        }
    }

    /**
     * Checks for collisions between the endboss and the character.
     * Handles the collision response, including applying effects to the character and the endboss.
     */
    checkEndbossCollisions() {
        if (this.world.endboss) {
            if (this.world.endboss.isColliding(this.world.character)) {
                this.world.character.hit(this.world.endboss.type);
                this.world.character.bounceEffectHit(this.world.endboss);
                this.world.endboss.endbossStatus = 'attackAfterHit';
                this.world.endboss.handleEndboss();
                this.world.statusbarHealth.setPercentage(this.world.character.energy, this.world.statusbarHealth.IMAGES_HEALTHBAR);
            }

            this.checkThrowedBottlesEndboss();
        }
    }

    /**
     * Checks for collisions between thrown bottles and the endboss.
     * Updates the endboss's state and removes the bottle from the world if it has been used.
     */
    checkThrowedBottlesEndboss() {
        for (let i = 0; i < this.world.throwableObjects.length; i++) {
            let bottle = this.world.throwableObjects[i];

            if (!bottle.isUsed && this.world.endboss.isColliding(bottle)) {
                this.world.endboss.endbossHitted();
                bottle.isUsed = true;
                bottle.splashAnimation();
                this.world.throwableObjects.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Checks for collisions between the character and collectable bottles.
     * Removes the collected bottle from the world and updates the bottle status.
     */
    collectBottleAfterCollision() {
        this.world.level.collectableBottles.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                let index = this.world.level.collectableBottles.indexOf(bottle);
                this.world.level.collectableBottles.splice(index, 1);
                this.world.statusbarBottle.collectBottle();
            }
        });
    }

    /**
     * Checks for collisions between the character and collectable coins.
     * Removes the collected coin from the world and updates the coin status.
     */
    collectCoinAfterCollision() {
        this.world.level.collectableCoins.forEach((coin) => {
            if (this.world.character.isColliding(coin)) {
                let index = this.world.level.collectableCoins.indexOf(coin);
                this.world.level.collectableCoins.splice(index, 1);
                this.world.statusbarCoin.collectCoin();
            }
        });
    }    
}
