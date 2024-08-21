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
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // Zahl zwischen 0 und 5
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}