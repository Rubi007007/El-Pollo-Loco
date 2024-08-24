class Chicken extends MovableObject {
    y = 343;
    height = 79;
    width = 79;
    offsetY = 0;
    offsetX = 0;
    hitboxWidth = this.width;
    hitboxHeight = this.height;
    type = 'Chicken';
    isDead = false;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    
    constructor(existingChickens) {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        
        // this.x = 400 + Math.random() * 2400; // Zahl zwischen 300 und 1100
        this.speed = 0.15 + Math.random() * 0.25;
        this.notCollidingChickens(existingChickens);
        this.animate();
    }

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

    notCollidingChickens(existingChickens) {
        let isColliding;
        do {
            this.x = 400 + Math.random() * 2400;
            isColliding = existingChickens.some(chicken => this.isColliding(chicken));
        } while (isColliding);
    }
}
