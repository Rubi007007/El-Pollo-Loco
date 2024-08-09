class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableBottles;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects, collectableBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableBottles = collectableBottles;
    }
}