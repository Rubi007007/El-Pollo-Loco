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
                console.log(enemy)
                if (char.isFalling()) {
                    char.killEnemy(enemy);
                    char.speedY = 15;
                } else if (!char.isAboveGround()) {
                    char.hit(enemy.type);
                    char.bounceEffectHit(enemy);
                }
                this.world.statusbarHealth.setPercentage(char.energy, this.world.statusbarHealth.IMAGES_HEALTHBAR);
            };

            // Endboss Kollisionen
            if (this.world.endboss
                && char.isColliding(this.world.endboss)) {

                char.hit(this.world.endboss.type);
                char.bounceEffectHit(this.world.endboss);
                this.world.endboss.attack();
                this.world.statusbarHealth.setPercentage(char.energy, this.world.statusbarHealth.IMAGES_HEALTHBAR);
            }

            // for Schleife dafür, dass jede Flasche nur einen Gegner töten kann.
            for (let i = 0; i < this.world.throwableObjects.length; i++) {
                let bottle = this.world.throwableObjects[i];
                
                if (!bottle.isUsed && enemy.isColliding(bottle)) {
                    bottle.killEnemy(enemy);

                    bottle.isUsed = true;
                    bottle.splashAnimation();
                    break;
                } else if (!bottle.isUsed && this.world.endboss.isColliding(bottle)) {
                    this.world.endboss.endbossHitted();
                    // this.world.statusbarEndboss.setPercentage(this.world.statusbarEndboss.setPercentage(this.world.endboss.energy, this.world.statusbarEndboss.IMAGES_ENDBOSSBAR))
                    console.log('Endboss hitted!')
                }
            }
        });

        this.world.level.collectableCoins.forEach((coin) => {
            if (char.isColliding(coin)) {
                let index = this.world.level.collectableCoins.indexOf(coin);
                this.world.level.collectableCoins.splice(index, 1);
                this.world.collect_coin_sound.play();
                volume(this.world.collect_coin_sound, 0.6);
                this.world.statusbarCoin.collectCoin();
            }
        });

        this.world.level.collectableBottles.forEach((bottle) => {
            if (char.isColliding(bottle)) {
                let index = this.world.level.collectableBottles.indexOf(bottle);
                this.world.level.collectableBottles.splice(index, 1);
                this.world.collect_bottle_sound.play();
                volume(this.world.collect_bottle_sound, 0.4);
                this.world.statusbarBottle.collectBottle();
            }
        });
    }
}