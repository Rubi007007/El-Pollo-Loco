class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('./img/5_background/layers/air.png', 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0)
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);


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
        this.ctx.drawImage(mO.img, mO.x, mO.y, mO.width, mO.height);
    }
}
