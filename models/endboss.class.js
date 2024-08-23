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
    jumpDistance = 100;
    jumpHeight = 50;

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

    inRageRange() {
        if (this.world.character.x > 2720) {
            return true
        }
    }

    alert() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);

        setTimeout(() => {
            clearInterval(this.currentInterval);
            this.endbossStatus = 'attack';
            this.handleEndboss();
        }, 2500);
    }

    walk() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 2.15;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 200);

        setTimeout(() => {
            clearInterval(this.currentInterval);
            this.endbossStatus = 'alert';
            this.handleEndboss();
        }, 2000);
    }

    attack() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 0;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            if (this.x >= 1500) {
                this.endbossJump();
            }
            this.playAnimation(this.IMAGES_ATTACK);
        }, 200);
        
        setTimeout(() => {
            this.endbossStatus = 'walk';
            this.handleEndboss();
        }, 900);
    }

    attackAfterHit() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 0;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 200);
        
        setTimeout(() => {
            this.endbossStatus = 'walk';
            this.handleEndboss();
        }, 900);
    }

    attackAfterDamage() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 80;
        this.resetPosition();
        this.currentInterval = setInterval (() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 200);

        setTimeout(() => {
            this.endbossStatus = 'walk';
            this.handleEndboss();
        }, 1900);
    }

    dead() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 0;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
    }

    endbossJump() {
        if (this.currentInterval) clearInterval(this.currentInterval);
    
        let jumpDuration = 600;
        let jumpSteps = 60;
        let stepDuration = jumpDuration / jumpSteps;
        let startX = this.x;
        let startY = 55;
        let jumpStepX = this.jumpDistance / jumpSteps;
        let step = 0;
    
        this.currentInterval = setInterval(() => {
            this.x = startX - (step * jumpStepX);
    
            if (step <= jumpSteps / 2) {
                // Sprung nach oben
                this.y = startY - (step / (jumpSteps / 2)) * this.jumpHeight;
            } else {
                // Sprung nach unten
                this.y = startY - ((jumpSteps - step) / (jumpSteps / 2)) * this.jumpHeight;
            }
    
            step++;

            if (this.world.character.isColliding(this)) {
                // console.log("Collision detected during jump!");
                this.resetPosition();
                clearInterval(this.currentInterval);
                return;
            }
    
            if (step >= jumpSteps) {
                clearInterval(this.currentInterval);
                this.resetPosition();
                // console.log(`Jump finished. Final Y: ${this.y}`);
            }
        }, stepDuration);
    }

    resetPosition() {
        this.y = 55;
    }

    endbossHitted() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.resetPosition();
        this.energy -= 20;
        this.world.statusbarEndboss.setPercentage(this.energy, world.statusbarEndboss.IMAGES_ENDBOSSBAR)
        this.checkEndbossIsDead();
        console.log(this.energy)
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 200);

        if (this.energy > 0) {
            setTimeout(() => {
                this.endbossStatus = 'attackAfterDamage';
                this.handleEndboss();
            }, 1800);
        }
    }

    checkEndbossIsDead() {
        if (this.energy > 0) {
            return
        } else {
            this.endbossStatus = 'dead';
            this.handleEndboss();
        }
    }

    handleEndboss() {
        switch (this.endbossStatus) {
            case 'walk':
                this.walk();
                break;
            case 'attack':
                this.attack();
                break;
            case 'attackAfterHit':
                this.attackAfterHit();
                break;
            case 'attackAfterDamage':
                this.attackAfterDamage();
                break;
            case 'alert':
                this.alert();
                break;
            case 'hurt':
                this.endbossHitted();
                break;
            case 'dead':
                this.dead();
                break;
        }
    }
    
}