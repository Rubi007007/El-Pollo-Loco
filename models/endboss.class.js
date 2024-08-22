class Endboss extends MovableObject {

    width = 400;
    height = 400;
    y = 55;
    x = 3000;
    hitboxWidth = 280;
    hitboxHeight = 170;
    offsetY = 150;
    offsetX = 65;
    type = 'Endboss';
    isMoving = false;
    endbossStatus = 'alert';

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
        this.currentInterval = null;
        this.handleEndboss();
    }

    alert() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }

    inRageRange() {
        if (this.world.character.x > 2720) {
            return true
        }
    }
    
    walk() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 0.15 + Math.random() * 0.25;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 200);
    }

    attack() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 0;
        setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 700);
        
        setTimeout(() => {
            this.endbossStatus = 'walk';
            this.handleEndboss();
        }, 5000); 
    }

    endbossHitted() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.energy -= 20; // TODO: Hier wird so lange Enegie abgezogen, bis die Flasche gelöscht wurde -> fixen
        console.log(this.energy)
        setTimeout(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 1000);
    }

    handleEndboss() {
        switch (this.endbossStatus) {
            case 'walk':
                console.log('Endbossstatus: Walk');
                this.walk();
                break;
            case 'attack':
                console.log('Endbossstatus: Attack');
                this.attack();
                break;
            case 'alert':
                console.log('Endbossstatus: alert');
                this.alert();
                break;
            case 'hurt':
                console.log('Endbossstatus: Hurt');
                this.endbossHitted();
                break;
        }
        
        /*if (this.endbossStatus == 'walk') {
            this.walk();
        } else if (this.endbossStatus == 'attack') {
            setTimeout(() => {
                this.attack();
                console.log('teset')
            }, 1000);
            this.endbossStatus = 'walk'
            this.handleEndboss();
        } else if (this.endbossStatus == 'alert') {
            this.animateAlert()
        } else if (this.endbossStatus == 'hurt') {
            this.endbossHitted();
        }*/
    }
}