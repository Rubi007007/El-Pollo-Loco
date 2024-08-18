class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    collectableBottles = level1.collectableBottles;
    collectableCoins = level1.collectableCoins;
    collect_coin_sound = new Audio('./audio/collect_coin.mp3');
    collect_bottle_sound = new Audio('./audio/collect_bottle.mp3');
    out_of_bottles_sound = new Audio('./audio/out_of_bottles.mp3')
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.collisionHandler = new CollisionHandler(this);

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
        }, 200);
    }

    stopGame() {
        clearInterval(this.gameInterval);
        cancelAnimationFrame(this.animationFrame);
    }

    checkThrowObjects() {
        if (this.keyboard.THROW && this.statusbarBottle.availableBottles()) {
            let bottle;
            
            if (this.character.otherDirection == false) {
                bottle = new ThrowableObject(this.character.x + 80, this.character.y + 120);
                bottle.throwRight();
            } else if (this.character.otherDirection == true) {
                bottle = new ThrowableObject(this.character.x, this.character.y + 145);
                bottle.throwLeft();
            }
            
            this.throwableObjects.push(bottle);
            this.statusbarBottle.collectedBottles -= 1;
            this.statusbarBottle.setPercentage(this.statusbarBottle.collectedBottles * 10);

        } else if (this.keyboard.THROW) {
            this.out_of_bottles_sound.play();
            this.out_of_bottles_sound.volume = 0.1;
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
}
