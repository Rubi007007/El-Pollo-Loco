class Coin extends MovableObject {
    coins = 0;
    collect_coin_sound = new Audio('./audio/collect_coin.mp3');
    width = 60;
    height = 60;

    IMAGES_COINS = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x = 300 + Math.random() * 700;
        this.y = 120 + Math.random() * 130;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 600);
    }

    collectCoin() {
        this.collect_coin_sound.play();
        this.coins += 1;
        /*
            Statusbar einbinden,
            Coins müssen verschwinden
        */
        console.log(this.coins)
    }
}