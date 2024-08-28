/**
 * Represents the status bar for collected coins in the game, extending from the `DrawableObject` class.
 * Tracks the number of collected coins and updates the status bar display accordingly.
 */
class StatusbarCoin extends DrawableObject {
    percentage = 100;
    collectedCoins = 0;
    collect_coin_sound = new Audio('./audio/collect_coin.mp3');

    IMAGES_COINBAR = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 40;
        this.y = 55;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0, this.IMAGES_COINBAR);
    }

    /**
     * Updates the status bar when a coin is collected, plays the collection sound,
     * and increments the collected coins count.
     */
    collectCoin() {
        world.audioHandler.toggleSound(this.collect_coin_sound);
        world.audioHandler.toggleVolume(this.collect_coin_sound, 0.6);
        this.collectedCoins += 1;
        this.setPercentage(this.collectedCoins * 10, this.IMAGES_COINBAR);
    }
}
