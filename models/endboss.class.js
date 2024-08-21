class Endboss extends MovableObject {

    height = 400;
    width = 400;
    y = 55;
    x;
    hitboxWidth = this.width - 120;
    hitboxHeight = this.height - 230;
    offsetY = 150;
    offsetX = 65;
    type = 'Endboss';
    isMoving = false;

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.world = world;
        this.x = 3000;
        this.animateIdle();
    }

    animateIdle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }

    inRageRange() {
        if (this.world.character.x > 2720) {
            return true
        }
    }
    
    walk() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        this.speed = 0.15 + Math.random() * 0.25;
        
        setInterval(() => {
            this.moveLeft();
        }, 2500)
    }

    attack() {
        setTimeout(() => {
            setInterval(() => {
                this.playAnimation(this.IMAGES_ATTACK);
            }, 200);
            this.speed = 0;
        }, 1000);
    }

    endbossHitted() {
        this.energy -= 20; // TODO: Hier wird so lange Enegie abgezogen, bis die Flasche gelöscht wurde -> fixen
        console.log(this.energy)
        setTimeout(() => {
            let interval = setInterval(() => {
                this.speed = 0;
                this.playAnimation(this.IMAGES_HURT);
            }, 200);
        }, 1000);
    }
}