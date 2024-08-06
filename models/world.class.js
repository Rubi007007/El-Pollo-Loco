class World {
    character = new Character();
    level = level1;
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this; // this wird innerhalb der u.a. Funktion nicht erkannt
        requestAnimationFrame(function() {
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
