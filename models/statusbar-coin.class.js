class StatusbarCoin extends DrawableObject {
    percentage = 100;
    collectedCoins = 0;
    // maxCollectableCoin = this.level.collectableCoins.length;

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

    collectCoin() {
        this.collectedCoins += 1;
        this.setPercentage(this.collectedCoins * 10, this.IMAGES_COINBAR); // * 10 für schnelleren Progress in Bar
    }
}
