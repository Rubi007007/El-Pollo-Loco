/**
 * Represents a bottle object in the game, which is a type of movable object.
 * Bottles are collectable items that are positioned randomly on the ground, avoiding collisions with existing bottles.
 * @class
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    width = 70;
    height = 70;
    offsetY = 10;
    offsetX = 15;
    hitboxWidth = this.width - 20;
    hitboxHeight = this.height - 10;
    y = 350;
    
    IMAGES_BOTTLE_COLLECTABLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    
    constructor(existingBottles) {
        super();
        this.loadImages(this.IMAGES_BOTTLE_COLLECTABLE);
        this.loadImage(`./img/6_salsa_bottle/${this.randomBottleImage()}_salsa_bottle_on_ground.png`);
        this.notCollidingBottles(existingBottles);
    }

    /**
     * Returns a random number to select a bottle image.
     * @returns {number} A random number between 1 and 2.
     */
    randomBottleImage() {
        return Math.floor(1 + Math.random() * 2);
    }

    /**
     * Ensures that the bottle does not collide with any existing bottles by adjusting its position.
     * @param {Array<Bottle>} existingBottles - An array of existing bottle objects to check for collisions.
     */
    notCollidingBottles(existingBottles) {
        let isColliding;
        do {
            this.x = 300 + Math.random() * 2400;
            isColliding = existingBottles.some(bottle => this.isColliding(bottle));
        } while (isColliding);
    }
}