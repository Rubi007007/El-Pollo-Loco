class CollisionHandler {
    constructor(world) {
        this.world = world;
    }

    // TODO: killEnemy umsetzen
    checkCollisions() {
        const char = this.world.character;
        
        this.world.level.enemies.forEach((enemy) => {
            if (char.invulnerable) {
                return;
            }

            if (char.isColliding(enemy)) {
                if (char.isFalling()) {
                    char.killEnemy(enemy);
                    char.speedY = 20;
                } else {
                    char.hit();
                    char.bounceEffectHit(enemy);
                }
                this.world.statusbarHealth.setPercentage(char.energy);
                if (char.energy <= 0) {
                    console.log('Game Over');
                } else {
                    console.log(char.energy);
                }
            };
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