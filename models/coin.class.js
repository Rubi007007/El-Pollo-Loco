class Coin extends MovableObject {
    coins = 0;
    width = 60;
    height = 60;
    offsetY = 8;
    offsetX = 8;
    hitboxWidth = this.width - 16;
    hitboxHeight = this.height - 16;

    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor(existingCoins) {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.notCollidingCoins(existingCoins);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 600);
    }

    notCollidingCoins(existingCoins) {
        let isColliding;
        do {
            this.x = 300 + Math.random() * 1800;
            this.y = 160 + Math.random() * 50;
            isColliding = existingCoins.some(coin => this.isColliding(coin));
        } while (isColliding);
    }
}