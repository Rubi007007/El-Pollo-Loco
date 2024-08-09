class Bottle extends MovableObject {
    bottles;
    
    IMAGES_BOTTLE_COLLECTABLE = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    
    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_COLLECTABLE);

        this.x = 300 + Math.random() * 700; // Zahl zwischen 200 und 700
        this.y =  350;

        this.width = 70;
        this.height = 70;
 
        this.animate();      
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_COLLECTABLE);
        }, 600);
    }
}