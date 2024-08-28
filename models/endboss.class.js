/**
 * Represents the Endboss character in the game.
 * @extends MovableObject
 */
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
    isEndbossDead = false;
    endbossStatus = 'alert';
    jumpDistance = 170;
    jumpHeight = 50;
    endboss_nearby_sound = new Audio('./audio/chicken/endboss_in_range.mp3');
    endboss_theme = new Audio('./audio/chicken/endboss_theme.mp3');
    endboss_damage_sound = new Audio('./audio/chicken/endboss_damage_sound.mp3');

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
        game_music.pause();
        this.world.audioHandler.toggleSound(this.endboss_nearby_sound);
        this.world.audioHandler.toggleVolume(this.endboss_nearby_sound, 0.2);
        setTimeout(() => {
            this.world.audioHandler.toggleSound(this.endboss_theme);
            this.world.audioHandler.toggleVolume(this.endboss_theme, 0.08);
            this.endboss_theme.loop = true;
        }, 1800);
    }

    /**
     * Clears any ongoing animation intervals.
     */
    clearAnimation() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = null;
        }
    }

    /**
     * Handles the alert state of the Endboss.
     */
    alert() {
        this.clearAnimation();
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 170); // von 200 auf 170 //TODO: hier weiter machen -> Alertanimation und Walkanimation nun flüssiger dargestellt und Jump nicht mehr implementiert

        if (this.endbossStatus != 'hurt') {
            setTimeout(() => {
                clearInterval(this.currentInterval);
                this.endbossStatus = 'attack';
                this.handleEndboss();
            }, 2500);
        }
    }

    /**
     * Handles the walking state of the Endboss.
     */
    walk() {
        this.clearAnimation();
        this.speed = 2.15;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 120); // von 200 auf 120

        if (this.endbossStatus != 'hurt') {
            setTimeout(() => {
                clearInterval(this.currentInterval);
                this.endbossStatus = 'alert';
                this.handleEndboss();
            }, 2000);
        }
    }

    /**
     * Handles the attack state of the Endboss.
     */
    attack() {
        this.clearAnimation();
        this.speed = 0;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 200);
        
        if (this.endbossStatus != 'hurt') {
            setTimeout(() => {
                this.endbossStatus = 'walk';
                this.handleEndboss();
            }, 900);
        }
    }

    /**
     * Handles the attack state after hitting the player.
     */
    attackAfterHit() {
        this.clearAnimation();
        this.speed = 0;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 200);
        
        if (this.endbossStatus != 'hurt') {
            setTimeout(() => {
                this.endbossStatus = 'walk';
                this.handleEndboss();
            }, 900);
        }
    }

    /**
     * Handles the attack state after taking damage.
     */
    attackAfterDamage() {
        this.clearAnimation();
        this.speed = 80;
        this.resetPosition();
        this.currentInterval = setInterval (() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, 200);

        if (this.endbossStatus != 'hurt') {
            setTimeout(() => {
                this.endbossStatus = 'walk';
                this.handleEndboss();
            }, 1900);
        }
    }

    /**
     * Handles the death state of the Endboss.
     */
    dead() {
        this.clearAnimation();
        this.speed = 0;
        this.world.invulnerable = true;
        this.resetPosition();
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 200);
        
        setTimeout(() => {
            this.isEndbossDead = true;
        }, 1000);
    }

    /**
     * Makes the Endboss jump.
     */
    /*endbossJump() {
        this.clearAnimation();
    
        let jumpDuration = 600;
        let jumpSteps = 60;
        let stepDuration = jumpDuration / jumpSteps;
        let startX = this.x;
        let startY = 55;
        let jumpStepX = this.jumpDistance / jumpSteps;
        let step = 0;
    
        if (this.isEndbossDead) {
            this.speed = 0;
            this.jumpDuration = 0;
            this.jumpSteps = 0;
        } else {
            this.currentInterval = setInterval(() => {
                this.x = startX - (step * jumpStepX);
        
                if (step <= jumpSteps / 2) {
                    this.y = startY - (step / (jumpSteps / 2)) * this.jumpHeight;
                } else {
                    this.y = startY - ((jumpSteps - step) / (jumpSteps / 2)) * this.jumpHeight;
                }
        
                step++;
    
                if (this.world.character.isColliding(this)) {
                    this.resetPosition();
                    clearInterval(this.currentInterval);
                    return;
                }
        
                if (step >= jumpSteps) {
                    clearInterval(this.currentInterval);
                    this.resetPosition();
                }
            }, stepDuration);
        }
    }*/

    /**
     * Resets the Endboss's Y position.
     */
    resetPosition() {
        this.y = 55;
    }

    /**
     * Handles the Endboss being hit.
     */
    endbossHitted() {
        this.clearAnimation();
        this.resetPosition();
        this.energy -= 20;
        this.world.statusbarEndboss.setPercentage(this.energy, world.statusbarEndboss.IMAGES_ENDBOSSBAR)
        this.checkEndbossIsDead();
        this.world.audioHandler.toggleSound(this.endboss_damage_sound);
        this.world.audioHandler.toggleVolume(this.endboss_damage_sound, 0.2);

        this.currentInterval = setInterval(() => {
            this.endbossStatus = 'hurt';
            this.playAnimation(this.IMAGES_HURT);
        }, 200);

        if (this.energy > 0) {
            setTimeout(() => {
                this.endbossStatus = 'attackAfterDamage';
                this.handleEndboss();
            }, 1800);
        }
    }

    /**
     * Checks if the Endboss is dead and updates status.
     */
    checkEndbossIsDead() {
        if (this.energy > 0) {
            return
        } else {
            this.endbossStatus = 'dead';
            this.handleEndboss();
        }
    }

    /**
     * Handles the Endboss's state and behavior.
     */
    handleEndboss() {
        this.clearAnimation();

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