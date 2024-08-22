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
        this.speed = 1.15;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 200);

        setTimeout(() => {
            clearInterval(this.currentInterval);
            this.endbossStatus = 'alert';
            this.handleEndboss();
        }, 4000);
    }

    attack() {
        if (this.currentInterval) clearInterval(this.currentInterval);
        this.speed = 0;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            // TODO: Hier einen kleinen Sprung nach vorne animieren! Als Attack sozusagen
            this.endbossJump();
            this.playAnimation(this.IMAGES_ATTACK);
        }, 200);
        
        setTimeout(() => {
            this.endbossStatus = 'walk';
            this.handleEndboss();
        }, 900);
    }

    endbossJump() {
        if (this.currentInterval) clearInterval(this.currentInterval);
    
        let jumpDuration = 600; // Gesamtdauer des Sprungs
        let jumpSteps = 60; // Anzahl der Animationsschritte
        let stepDuration = jumpDuration / jumpSteps; // Dauer eines Schritts
        let startX = this.x; // Ursprüngliche X-Position
        let startY = 55; // Ursprüngliche Y-Position
        let jumpStepX = this.jumpDistance / jumpSteps; // Schrittweite in X-Richtung
        let step = 0;
    
        this.currentInterval = setInterval(() => {
            this.x = startX - (step * jumpStepX);
    
            // Simuliere den Sprungbogen (parabolische Bewegung)
            if (step <= jumpSteps / 2) {
                // Aufstieg
                this.y = startY - (step / (jumpSteps / 2)) * this.jumpHeight;
            } else {
                // Abstieg
                this.y = startY - ((jumpSteps - step) / (jumpSteps / 2)) * this.jumpHeight;
            }
    
            step++;

            if (this.world.character.isColliding(this)) {
                console.log("Collision detected during jump!");
                this.resetPosition(); // Setze die Y-Koordinate zurück
                clearInterval(this.currentInterval);
                return; // Beende die Methode
            }
    
            // Wenn der Sprung abgeschlossen ist
            if (step >= jumpSteps) {
                clearInterval(this.currentInterval);
                this.resetPosition(); // Stelle sicher, dass er auf der ursprünglichen Y-Position landet
                console.log(`Jump finished. Final Y: ${this.y}`);
            }
        }, stepDuration);
    }

    resetPosition() {
        this.y = 55; // Setzt die Y-Koordinate auf die ursprüngliche Höhe zurück
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
            case 'walkBack':
                console.log('Endbossstatus: Walk Back')
                this.endbossGoesBack();
                break;
            case 'attack':
                console.log('Endbossstatus: Attack');
                this.attack();
                break;
            case 'alert':
                console.log('Endbossstatus: Alert');
                this.alert();
                break;
            case 'hurt':
                console.log('Endbossstatus: Hurt');
                this.endbossHitted();
                break;
        }
    }
    
}