class Character extends MovableObject {
    height = 280;
    width = 140;
    y = 150;
    speed = 7;
    world;
    walking_sound = new Audio('./audio/walking.mp3');

    JUMP_SOUNDS = [
        new Audio('./audio/1_jump.mp3'),
        new Audio('./audio/2_jump.mp3'),
        new Audio('./audio/3_jump.mp3'),
        new Audio('./audio/4_jump.mp3'),
        new Audio('./audio/5_jump.mp3'),
        new Audio('./audio/6_jump.mp3'),
        new Audio('./audio/7_jump.mp3'),
        new Audio('./audio/8_jump.mp3'),
        new Audio('./audio/9_jump.mp3'),
        new Audio('./audio/10_jump.mp3'),
    ];

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
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];


    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.walking_sound.volume = 0.1;
            }

            if (this.world.keyboard.LEFT && this.x > -350) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                this.walking_sound.volume = 0.1;
            }

            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.JUMP_SOUNDS[this.playRandomSound(this.JUMP_SOUNDS)].play();
                
                for (let i = 0; i < this.JUMP_SOUNDS.length; i++) {
                    this.JUMP_SOUNDS[i].volume = 0.2;
                }
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    playRandomSound(array) {
        return Math.round(Math.random() * (array.length - 1))
    }
}
