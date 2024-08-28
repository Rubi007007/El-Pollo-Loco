/**
 * Represents a level in the game, containing all relevant entities such as enemies, clouds, background objects, and collectable items.
 */
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