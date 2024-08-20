class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    // TODO: killEnemy umsetzen
    checkCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.world.character.invulnerable) {
                return;
            }

            if (this.world.character.isColliding(enemy)) {
                if (this.world.character.isFalling()) {
                    this.world.character.killEnemy(enemy);
                    this.world.character.speedY = 20;
                } else {
                    this.world.character.hit();
                    this.world.character.bounceEffectHit(enemy);
                }
                this.world.statusbarHealth.setPercentage(this.world.character.energy);
                if (this.world.character.energy <= 0) {
                    console.log('Game Over');
                } else {
                    console.log(this.world.character.energy);
                }
            };
        });

        this.world.level.collectableCoins.forEach((coin) => {
            if (this.world.character.isColliding(coin)) {
                let index = this.world.level.collectableCoins.indexOf(coin);
                this.world.level.collectableCoins.splice(index, 1);
                this.world.collect_coin_sound.play();
                volume(this.world.collect_coin_sound, 0.6);
                this.world.statusbarCoin.collectCoin();
            }
        });

        this.world.level.collectableBottles.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                let index = this.world.level.collectableBottles.indexOf(bottle);
                this.world.level.collectableBottles.splice(index, 1);
                this.world.collect_bottle_sound.play();
                volume(this.world.collect_bottle_sound, 0.4);
                this.world.statusbarBottle.collectBottle();
            }
        });
    }
}