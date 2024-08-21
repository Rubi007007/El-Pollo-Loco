class ThrowableObject extends MovableObject {

    throw_bottle_sound = new Audio('./audio/throw_bottle.mp3');
    splash_bottle_sound = new Audio('./audio/broken_glass_bottle.mp3');
    throwableBottles = [];

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
    
    constructor(x, y) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.throw_bottle_sound.play();
        volume(this.throw_bottle_sound, 0.4);
    }

    throwRight() {
        this.speedY = 17;
        this.applyGravity();
        world.character.resetIdleTimer();
        let intervalID = setInterval(() => {
            if (this.y <= 350) {
                this.x += 13;
                this.playAnimation(this.IMAGES_BOTTLE_THROW);
            } else {
                clearInterval(intervalID);
                this.speedY = 0;
                this.acceleration = 0;
                this.y = 350;
                this.splashAnimation();
                this.splash_bottle_sound.play();
                volume(this.splash_bottle_sound, 0.1);
            }
        }, 25);
    }
    
    throwLeft() {
        this.speedY = 8;
        this.applyGravity();
        let intervalID = setInterval(() => {
            if (this.y <= 350) {
                this.x -= 10;
                this.playAnimation(this.IMAGES_BOTTLE_THROW);
            } else {
                clearInterval(intervalID);
                this.speedY = 0;
                this.acceleration = 0;
                this.y = 350;
                this.splashAnimation();
                this.splash_bottle_sound.play();
                volume(this.splash_bottle_sound, 0.1);
            }
        }, 25);
    }

    deleteBottle() {
        setTimeout(() => {
            let index = world.throwableObjects.indexOf(this);
            if (index > -1) {
                world.throwableObjects.splice(index, 1);
            }
        }, 250);
    }

    splashAnimation() {
        let splashIndex = 0;
        let splashInterval = setInterval(() => {
            if (splashIndex < this.IMAGES_BOTTLE_SPLASH.length) {
                this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[splashIndex]];
                splashIndex++;
            } else {
                clearInterval(splashInterval);
                this.deleteBottle();
            }
        }, 60);
    }
}