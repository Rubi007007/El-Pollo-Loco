class Coin extends MovableObject {
    coins;

    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 300 + Math.random() * 700;
        this.y = 50 + Math.random() * 280;
        this.width = 120;
        this.height = 120;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 600);
    }
}