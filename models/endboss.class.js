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
    currentInterval;
    activeTimeouts = [];

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
     * Handles the alert state of the Endboss.
     */
    alert() {
        this.clearAnimation();
        this.alertAnimation(); // von 200 auf 170 //TODO: hier weiter machen -> Alertanimation und Walkanimation nun flüssiger dargestellt und Jump nicht mehr implementiert

        if (this.endbossStatus != 'hurt') {
            this.addTimeout(() => {
                // clearInterval(this.currentInterval);
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
        this.walkAnimation(2.15, 120);

        if (this.endbossStatus != 'hurt') {
            this.addTimeout(() => {
                // clearInterval(this.currentInterval);
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
        this.walkAnimation(15, 80);
        
        if (this.endbossStatus != 'hurt') {
            this.addTimeout(() => {
                this.endbossStatus = 'walk';
                this.handleEndboss();
            }, 1000);
        }
    }

    /**
     * Handles the attack state after hitting the player.
     */
    attackAfterHit() {
        this.clearAnimation();
        this.attackAnimation();
        
        if (this.endbossStatus != 'hurt') {
            this.addTimeout(() => {
                this.endbossStatus = 'walk';
                this.handleEndboss();
            }, 1500);
        }
    }

    /**
     * Handles the attack state after taking damage.
     */
    attackAfterDamage() {
        this.clearAnimation();
        this.walkAnimation(40, 40);

        if (this.endbossStatus != 'hurt') {
            this.addTimeout(() => {
                this.endbossStatus = 'alert';
                this.handleEndboss();
            }, 400);
        }
    }

    /**
     * Handles the Endboss being hit.
     */
    endbossHitted() {
        if (this.invulnerable) {
            return;
        }

        this.invulnerable = true;
        this.clearAnimation();
        this.takingDamageAnimation();
        this.endbossLooseEnergy();

        if (this.energy > 0) {
            this.addTimeout(() => {
                this.invulnerable = false;
                this.endbossStatus = 'attackAfterDamage';
                this.handleEndboss();
            }, 1800);
        }
    }

    /**
     * Reduces the Endboss's energy by 20 and updates the status bar.
     * Also checks if the Endboss is dead after losing energy.
    */
    endbossLooseEnergy() {
        this.energy -= 20;
        this.world.statusbarEndboss.setPercentage(this.energy, world.statusbarEndboss.IMAGES_ENDBOSSBAR)
        this.checkEndbossIsDead();
    }

    /**
     * Handles the death state of the Endboss.
     */
    dead() {
        this.clearAnimation();
        this.world.invulnerable = true;
        this.deadAnimation();
        
        this.addTimeout(() => {
            this.isEndbossDead = true;
        }, 1000);
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
     * Animates the Endboss in the walking state and moves it to the left.
     * @param {number} speed - The speed at which the Endboss moves.
     * @param {number} interval - The interval (in milliseconds) for the animation.
     */
    walkAnimation(speed, interval) {
        this.speed = speed;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }, interval);
    }

    /**
     * Animates the Endboss in the alert state without movement.
     */
    alertAnimation() {
        this.speed = 0;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 170);
    }

    /**
     * Animates the Endboss in the attack state without movement.
     */
    attackAnimation() {
        this.speed = 0;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK);
        }, 100);
    }

    /**
     * Animates the Endboss in the hurt state, representing it taking damage.
     */
    takingDamageAnimation() {
        this.endbossStatus = 'hurt';
        this.speed = 0;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 140);
        this.world.audioHandler.toggleSound(this.endboss_damage_sound);
        this.world.audioHandler.toggleVolume(this.endboss_damage_sound, 0.2);
    }

    /**
     * Animates the Endboss in the dead state, representing its death.
     */
    deadAnimation() {
        this.speed = 0;
        this.currentInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 110);
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
     * Adds a timeout function and stores its ID for later removal.
     * @param {Function} callback - The function to execute after the delay.
     * @param {number} delay - The delay (in milliseconds) before executing the callback.
     */
    addTimeout(callback, delay) {
        this.clearTimeouts();
        const timeoutId = setTimeout(() => {
            callback();
            this.removeTimeout(timeoutId);
        }, delay);
        this.activeTimeouts.push(timeoutId);
    }

    /**
     * Clears all active timeouts that were previously set.
     */
    clearTimeouts() {
        this.activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        this.activeTimeouts = [];
    }

    /**
     * Removes a specific timeout from the list of active timeouts.
     * @param {number} timeoutId - The ID of the timeout to remove.
     */
    removeTimeout(timeoutId) {
        this.activeTimeouts = this.activeTimeouts.filter(id => id !== timeoutId);
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