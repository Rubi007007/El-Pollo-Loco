class StatusbarBottle extends DrawableObject {
    percentage = 100;
    collectedBottles = 0;

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
        this.setPercentage(this.collectedBottles);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // Zahl zwischen 0 und 5
        let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    collectBottle() {
        this.collectedBottles += 1;
        this.setPercentage(this.collectedBottles * 10); // * 10 für schnelleren Progress in Bar
    }

    availableBottles() {
        if (this.collectedBottles > 0) {
            return true
        } else {
            return false
        }
        
    }
}
