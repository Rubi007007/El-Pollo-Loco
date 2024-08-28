/**
 * Represents the status bar for the endboss's health in the game, extending from the `DrawableObject` class.
 * Displays the endboss's health as a percentage and updates the status bar accordingly.
 */
class StatusbarEndboss extends DrawableObject {
    percentage = 100;

    IMAGES_ENDBOSSBAR = [
        './img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        './img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        this.x = 480;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100, this.IMAGES_ENDBOSSBAR);
    }
}