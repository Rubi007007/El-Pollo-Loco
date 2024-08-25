class Character extends MovableObject {
    height = 280;
    width = 140;

    offsetX = 15;
    offsetY = 100;
    hitboxWidth = this.width - 45;
    hitboxHeight = this.height - 112;

    y = 150;
    speed = 7;
    world;
    isMoving = false;
    idleTimer;
    idleTime = 10000;
    longIdleActive = false;
    walking_sound = new Audio('./audio/walking.mp3');
    snore_sound = new Audio('./audio/snore.mp3');
    JUMP_SOUNDS = [];
    HURT_SOUNDS = [];

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.addArraySounds();
    }

    animate() {
        this.resetIdleTimer();

        // Bewegung und Interaktionen
        setInterval(() => {
            this.isMoving = false;

            if (
                this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x
            ) {
                this.moveRight();
                this.otherDirection = false;
                this.isMoving = true;
                this.resetIdleTimer();

                if (this.walking_sound.paused) {
                    this.world.audioHandler.toggleSound(this.walking_sound);
                    this.world.audioHandler.toggleVolume(
                        this.walking_sound,
                        0.1
                    );
                }
            }

            if (this.world.keyboard.LEFT && this.x > -350) {
                this.moveLeft();
                this.otherDirection = true;
                this.isMoving = true;
                this.resetIdleTimer();

                if (this.walking_sound.paused) {
                    this.world.audioHandler.toggleSound(this.walking_sound);
                    this.world.audioHandler.toggleVolume(
                        this.walking_sound,
                        0.1
                    );
                }
            }

            if (
                (this.world.keyboard.UP && !this.isAboveGround()) ||
                (this.world.keyboard.SPACE && !this.isAboveGround())
            ) {
                this.jump();
                this.resetIdleTimer();

                const jumpSound =
                    this.JUMP_SOUNDS[
                        this.world.playRandomSound(this.JUMP_SOUNDS)
                    ];
                if (this.JUMP_SOUNDS.length > 0) {
                    if (jumpSound.paused) {
                        this.world.audioHandler.toggleSound(jumpSound);

                        for (let i = 0; i < this.JUMP_SOUNDS.length; i++) {
                            this.world.audioHandler.toggleVolume(
                                this.JUMP_SOUNDS[i],
                                0.2
                            );
                        }
                    }
                }
            }

            if (!this.isMoving) {
                this.walking_sound.pause();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.startAnimationIntervals();
    }

    startAnimationIntervals() {
        // Idle und Long Idle Animationen
        setInterval(() => {
            if (
                !this.isMoving &&
                !this.isDead() &&
                !this.isHurt() &&
                !this.isAboveGround()
            ) {
                if (this.longIdleActive) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                    this.world.audioHandler.toggleSound(this.snore_sound);
                    this.world.audioHandler.toggleVolume(this.snore_sound, 0.9);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 200);

        // Andere Animationen (Jumping, Walking, Hurt, Dead)
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                endGame();
                clearInterval(animationInterval);
                this.idleTime = 1000000;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

                const hurtSound =
                    this.HURT_SOUNDS[
                        this.world.playRandomSound(this.HURT_SOUNDS)
                    ];
                if (this.HURT_SOUNDS.length > 0) {
                    if (hurtSound.paused) {
                        this.world.audioHandler.toggleSound(hurtSound);
    
                        for (let i = 0; i < this.HURT_SOUNDS.length; i++) {
                            this.world.audioHandler.toggleVolume(
                                this.HURT_SOUNDS[i],
                                0.4
                            );
                        }
                    }
                }
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.isMoving) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }

    resetIdleTimer() {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }

        this.longIdleActive = false;
        this.snore_sound.pause();

        this.idleTimer = setTimeout(() => {
            this.longIdleActive = true;
            this.idleTimer = null;
        }, this.idleTime);
    }

    addArraySounds() {
        for (let i = 1; i <= 10; i++) {
            this.JUMP_SOUNDS.push(
                new Audio(`./audio/jump_sounds/${i}_jump.mp3`),
            );
        }

        for (let i = 1; i <= 4; i++) {
            this.HURT_SOUNDS.push(
                new Audio(`./audio/hurt_sounds/hurt_${i}.mp3`),
            );
        }
    }
}
