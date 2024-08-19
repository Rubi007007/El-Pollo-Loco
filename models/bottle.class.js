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

    randomBottleImage() {
        return Math.floor(1 + Math.random() * 2);
    }

    notCollidingBottles(existingBottles) {
        let isColliding;
        do {
            this.x = 300 + Math.random() * 700;
            isColliding = existingBottles.some(bottle => this.isColliding(bottle));
        } while (isColliding);
    }
}