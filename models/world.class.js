/**
 * Manages the game world, including the character, enemies, background, and status bars.
 * Handles game logic such as spawning enemies, throwing objects, and collision detection.
 */
class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    endboss = null;
    endbossSpawned = false;
    backgroundObjects = level1.backgroundObjects;
    collectableBottles = level1.collectableBottles;
    collectableCoins = level1.collectableCoins;
    out_of_bottles_sound = new Audio('./audio/out_of_bottles.mp3');
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    statusbarEndboss = new StatusbarEndboss();
    throwableObjects = [];
    throwPressed = false;
    throwCooldownActive = false;
    throwCooldownDuration = 1000;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisionHandler = new CollisionHandler(this);
        this.audioHandler = new AudioHandler(this);

        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference for the character and initializes the game loop.
     */
    setWorld() {
        this.character.world = this;
    };

    /**
     * Starts the game loop, which periodically checks for collisions, throw objects, and endboss state.
     */
    run() {
        this.gameInterval = setInterval(() => {
            this.collisionHandler.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossSpawn();
            this.checkEndbossDead();
        }, 25);
    }

    /**
     * Spawns the endboss and adds it to the level's enemies list.
     */
    spawnEndboss() {
        this.endboss = new Endboss(this);
        this.level.enemies.push(this.endboss);
        this.endbossSpawned = true;
    }

    /**
     * Checks if the endboss should be spawned based on the character's position.
     */
    checkEndbossSpawn() {
        if (!this.endbossSpawned && this.character.x >= 2420) {
            this.spawnEndboss();
        }
    }

    /**
     * Checks if the endboss is dead and triggers the win condition if true.
     */
    checkEndbossDead() {
        if (this.endboss && this.endboss.isEndbossDead) {
            winGame();
        }
    }

    /**
     * Stops the game by clearing the game interval and canceling any ongoing animations.
     */
    stopGame() {
        clearInterval(world.gameInterval);
        if (this.animationFrame) {
            setTimeout(() => {
                cancelAnimationFrame(this.animationFrame);
            }, 800);
        }
    }

    /**
     * Checks if a throw action is initiated, handles the creation and throwing of a throwable object,
     * and manages the throw cooldown.
     */
    checkThrowObjects() {
        if (this.keyboard.THROW && !this.throwPressed && this.statusbarBottle.availableBottles() && !this.throwCooldownActive) {
            let bottle;
            
            if (!this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x + 80, this.character.y + 120, this);
                bottle.throwRight();
            } else if (this.character.otherDirection) {
                bottle = new ThrowableObject(this.character.x, this.character.y + 145, this);
                bottle.throwLeft();
            }
            
            this.throwableObjects.push(bottle);
            this.statusbarBottle.collectedBottles -= 1;
            this.statusbarBottle.setPercentage(this.statusbarBottle.collectedBottles * 10, this.statusbarBottle.IMAGES_BOTTLEBAR);

            this.throwPressed = true;

            this.throwCooldownActive = true;
            setTimeout(() => {
                this.throwCooldownActive = false;
            }, this.throwCooldownDuration);

        } else if (this.keyboard.THROW && !this.statusbarBottle.availableBottles()) {
            this.audioHandler.toggleSound(this.out_of_bottles_sound);
            this.audioHandler.toggleVolume(this.out_of_bottles_sound, 0.1);
            this.throwPressed = true;
        }

        if (!this.keyboard.THROW) {
            this.throwPressed = false;
        }
    }

    /**
     * Draws all game objects to the canvas, including background, character, status bars, and throwable objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ----- Space for fixed Objects ----- //
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        if (this.endbossSpawned) {
            this.addToMap(this.statusbarEndboss);
        }
        // ----- Space for fixed Objects ----- //
        this.ctx.translate(this.camera_x, 0);
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectableBottles);
        this.addObjectsToMap(this.level.collectableCoins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        this.animationFrame = requestAnimationFrame(function() {
            self.draw();
        })
    }

    /**
     * Adds multiple objects to the canvas map for rendering.
     * 
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single object to the canvas map for rendering, handling its direction if necessary.
     * 
     * @param {DrawableObject} mO - The object to add to the map.
     */
    addToMap(mO) {
        if (mO.otherDirection) {
            this.flipImage(mO);
        }

        mO.draw(this.ctx);
        // mO.drawCollisionFrame(this.ctx);

        if (mO.otherDirection) {
            this.flipImageBack(mO);
        }
    }

    /**
     * Flips the image of an object horizontally for rendering, useful for objects moving in the opposite direction.
     * 
     * @param {DrawableObject} mO - The object whose image will be flipped.
     */
    flipImage(mO) {
        this.ctx.save();
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1);
        mO.x = mO.x * -1;
    }

    /**
     * Restores the canvas context after an image has been flipped.
     * 
     * @param {DrawableObject} mO - The object whose image was flipped.
     */
    flipImageBack(mO) {
        mO.x = mO.x * -1;
        this.ctx.restore();
    }

    /**
     * Plays a random sound from a given array of sounds.
     * 
     * @param {Array} array - The array of sound file paths.
     * @returns {number} - The index of the randomly selected sound.
     */
    playRandomSound(array) {
        return Math.round(Math.random() * (array.length - 1))
    }
}
