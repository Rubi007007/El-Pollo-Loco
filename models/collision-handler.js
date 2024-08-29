/**
 * Handles collision detection and responses between the character, enemies, throwable objects, and collectables.
 * @class
 */
class CollisionHandler {    
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        this.checkCharacterCollisions();

        if (this.world.endboss) {
            if (this.world.endboss.isColliding(this.world.character)) {
                this.world.character.hit(this.world.endboss.type);
                this.world.character.bounceEffectHit(this.world.endboss);
                this.world.endboss.endbossStatus = 'attackAfterHit';
                this.world.endboss.handleEndboss();
                this.world.statusbarHealth.setPercentage(
                    this.world.character.energy,
                    this.world.statusbarHealth.IMAGES_HEALTHBAR
                );
            }

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

        this.collectBottleAfterCollision();
        this.collectCoinAfterCollision();
    }

    checkCharacterCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.invulnerable || enemy.isDead) {
                return;
            }

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
        });
    }

    collectBottleAfterCollision() {
        this.world.level.collectableBottles.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                let index = this.world.level.collectableBottles.indexOf(bottle);
                this.world.level.collectableBottles.splice(index, 1);
                this.world.statusbarBottle.collectBottle();
            }
        });
    }

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
