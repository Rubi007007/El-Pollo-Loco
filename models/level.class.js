class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableBottles;
    collectableCoins;
    level_end_x = 3690;

    constructor(enemies, clouds, backgroundObjects, collectableBottles, collectableCoins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;
    }
}