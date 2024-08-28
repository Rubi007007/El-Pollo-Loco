/**
 * Represents a Cloud object in the game. Clouds move continuously from right to left across the screen.
 * @class
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 3200;
        this.animate();
    }

    /**
     * Moves the cloud left and resets its position when it moves off-screen.
     * The cloud reappears from the right after moving past the left edge.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();

            if (this.x + this.width < 0) {
                this.x = 2000 + Math.random() * 500;
            }
        }, 1000 / 60);
    }
}
