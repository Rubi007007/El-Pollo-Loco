/**
 * Represents a small chicken enemy in the game, extending from the `MovableObject` class. 
 * Handles movement, animation, and positioning to avoid collisions with other small chickens.
 */
class SmallChicken extends MovableObject {
    y = 360;
    height = 60;
    width = 60;
    offsetY = 0;
    offsetX = 7;
    hitboxWidth = this.width - 12;
    hitboxHeight = this.height;
    type = 'SmallChicken';
    isDead = false;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    
    constructor(existingSmallChickens) {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        
        this.speed = 0.55 + Math.random() * 1.25;
        this.notCollidingSmallChickens(existingSmallChickens);
        this.animate();
    }

    /**
     * Animates the small chicken by moving it left when alive and switching between walking and dead animations based on its state.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGE_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Ensures that the new small chicken does not spawn in a position that collides with other existing small chickens.
     * 
     * @param {Array} existingSmallChickens - The array of existing small chickens to check for collisions.
     */
    notCollidingSmallChickens(existingSmallChickens) {
        let isColliding;
        do {
            this.x = 700 + Math.random() * 2000;
            isColliding = existingSmallChickens.some(chicken => this.isColliding(chicken));
        } while (isColliding);
    }
}
