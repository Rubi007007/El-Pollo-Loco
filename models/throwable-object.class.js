class ThrowableObject extends MovableObject {

    throw_bottle_sound = new Audio('./audio/throw_bottle.mp3');

    IMAGES_BOTTLE_THROW = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    
    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
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
        this.animateThrowingBottle();
        let intervalID = setInterval(() => {
            if (this.y <= 350) {
                this.x += 13;
            } else {
                clearInterval(intervalID);
                this.speedY = 0;
                this.acceleration = 0;
                this.y = 350;
                this.animateSplashedBottle(); // ToDo: STOPPING BOTH ANIMATIONS 
            }
        }, 25);
    }
    
    throwLeft() {
        this.speedY = 8;
        this.applyGravity();
        this.animateThrowingBottle();
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }

    animateThrowingBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_THROW);
        }, 1000 / 100);
    }

    animateSplashedBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 1000 / 100);
    }
}