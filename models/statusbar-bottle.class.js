/**
 * Represents the status bar for collected bottles in the game, extending from the `DrawableObject` class.
 * Tracks the number of collected bottles and updates the status bar display accordingly.
 */
class StatusbarBottle extends DrawableObject {
    percentage = 100;
    collectedBottles = 0;
    collect_bottle_sound = new Audio('./audio/collect_bottle.mp3');

    IMAGES_BOTTLEBAR = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 40;
        this.y = 110;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.collectedBottles, this.IMAGES_BOTTLEBAR);
    }

    /**
     * Updates the status bar when a bottle is collected, plays the collection sound, 
     * and increments the collected bottles count.
     */
    collectBottle() {
        world.audioHandler.toggleSound(this.collect_bottle_sound);
        world.audioHandler.toggleVolume(this.collect_bottle_sound, 0.6);
        this.collectedBottles += 1;
        this.setPercentage(this.collectedBottles * 10, this.IMAGES_BOTTLEBAR);
    }

    /**
     * Checks if there are any collected bottles available.
     * 
     * @returns {boolean} - True if there is at least one collected bottle, false otherwise.
     */
    availableBottles() {
        if (this.collectedBottles > 0) {
            return true;
        } else {
            return false;
        }
    }
}
