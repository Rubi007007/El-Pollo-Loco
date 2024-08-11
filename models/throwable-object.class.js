class ThrowableObject extends MovableObject {

    throw_bottle_sound = new Audio('./audio/throw_bottle.mp3');

    IMAGES_BOTTLE_THROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    
    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.throw_bottle_sound.play();
        this.throw_bottle_sound.volume = 0.4;
        if (otherDirection == false) {
            this.throwRight();
        } else if (otherDirection == true) {
            this.throwLeft();
        }
    }

    throwRight() {
        this.speedY = 17;
        this.applyGravity();
        this.animate();
        setInterval(() => { // 117
            this.x += 13;
            if (this.y == 117) {
                console.log('test')
            }
        }, 25);
    }
    
    throwLeft() {
        this.speedY = 8;
        this.applyGravity();
        this.animate();
        setInterval(() => { // 259
            this.x -= 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_THROW);
        }, 1000 / 100);
    }
}