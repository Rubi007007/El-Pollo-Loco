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

    // TODO: Sounds stoppen nach Lose oder Win
    // TODO: Mobile Ansicht
    // TODO: Vollbildmodus
    // TODO: after Win -> länger warten im Startscreen -> schnarchen ausschalten
    // TODO: FIXME: VERMUTLICH NUN GEFIXED Restartbutton funktioniert noch nicht richtig -> vorheriges Spiel läuft weiter im Hintergrund

    // FIXME: Restart button Cooldown einfügen!

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

    setWorld() {
        this.character.world = this;
    };

    run() {
        this.gameInterval = setInterval(() => {
            this.collisionHandler.checkCollisions();
            this.checkThrowObjects();
            this.checkEndbossSpawn();
            this.checkEndbossDead();
        }, 25);
    }

    spawnEndboss() {
        this.endboss = new Endboss(this);
        this.level.enemies.push(this.endboss);
        this.endbossSpawned = true;
    }

    checkEndbossSpawn() {
        if (!this.endbossSpawned && this.character.x >= 2420) {
            this.spawnEndboss();
        }
    }

    checkEndbossDead() {
        if (this.endboss && this.endboss.isEndbossDead) {
            winGame();
        }
    }

    stopGame() {
        clearInterval(world.gameInterval);
        if (this.animationFrame) {
            setTimeout(() => {
                cancelAnimationFrame(this.animationFrame);
            }, 800);
        }
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // - Kamera -> verschiebt die Statusbar nicht
        // ----- Space for fixed Objects ----- //
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        if (this.endbossSpawned) {
            this.addToMap(this.statusbarEndboss);
        }
        this.ctx.translate(this.camera_x, 0); // hier wieder aufgehoben
        
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectableBottles);
        this.addObjectsToMap(this.level.collectableCoins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this; // this wird innerhalb der u.a. Funktion nicht erkannt
        this.animationFrame = requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(mO) {
        if (mO.otherDirection) {
            this.flipImage(mO);
        }

        mO.draw(this.ctx);
        mO.drawCollisionFrame(this.ctx);

        if (mO.otherDirection) {
            this.flipImageBack(mO);
        }
    }

    flipImage(mO) {
        this.ctx.save();
        this.ctx.translate(mO.width, 0);
        this.ctx.scale(-1, 1);
        mO.x = mO.x * -1;
    }

    flipImageBack(mO) {
        mO.x = mO.x * -1;
        this.ctx.restore();
    }

    playRandomSound(array) {
        return Math.round(Math.random() * (array.length - 1))
    }
}
