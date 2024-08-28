/**
 * Represents a Coin object in the game. Coins are collectible items that animate with a flipping effect.
 * @class
 * @extends MovableObject
 */
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

    /**
     * Animates the coin by flipping between different images at a set interval.
     * The animation is controlled by changing the image every 600 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 600);
    }

    /**
     * Ensures that the coin's position does not collide with any existing coins.
     * Repositions the coin until it is placed in a non-colliding location.
     * @param {Array} existingCoins - Array of existing coin objects to check for collision.
     */
    notCollidingCoins(existingCoins) {
        let isColliding;
        do {
            this.x = 300 + Math.random() * 1800;
            this.y = 160;
            isColliding = existingCoins.some(coin => this.isColliding(coin));
        } while (isColliding);
    }
}