/**
 * Handles collision detection and responses between the character, enemies, throwable objects, and collectables.
 * @class
 */
class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    checkCollisions() {
        const char = this.world.character;

        this.world.level.enemies.forEach((enemy) => {
            if (char.invulnerable || enemy.isDead) {
                return;
            }

            if (char.isColliding(enemy)) {
                if (char.isFalling()) {
                    char.killEnemy(enemy);
                    char.speedY = 15;
                } else if (!char.isAboveGround()) {
                    char.hit(enemy.type);
                    char.bounceEffectHit(enemy);
                }
                this.world.statusbarHealth.setPercentage(
                    char.energy,
                    this.world.statusbarHealth.IMAGES_HEALTHBAR
                );
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

        if (this.world.endboss) {
            if (this.world.endboss.isColliding(char)) {
                char.hit(this.world.endboss.type);
                char.bounceEffectHit(this.world.endboss);
                this.world.endboss.endbossStatus = 'attackAfterHit';
                this.world.endboss.handleEndboss();
                this.world.statusbarHealth.setPercentage(
                    char.energy,
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

        this.world.level.collectableCoins.forEach((coin) => {
            if (char.isColliding(coin)) {
                let index = this.world.level.collectableCoins.indexOf(coin);
                this.world.level.collectableCoins.splice(index, 1);
                this.world.statusbarCoin.collectCoin();
            }
        });

        this.world.level.collectableBottles.forEach((bottle) => {
            if (char.isColliding(bottle)) {
                let index = this.world.level.collectableBottles.indexOf(bottle);
                this.world.level.collectableBottles.splice(index, 1);
                this.world.statusbarBottle.collectBottle();
            }
        });
    }
}
