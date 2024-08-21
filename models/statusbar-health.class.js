class StatusbarHealth extends DrawableObject {
    percentage = 100;

    IMAGES_HEALTHBAR = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTHBAR);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100, this.IMAGES_HEALTHBAR);
    }
}
