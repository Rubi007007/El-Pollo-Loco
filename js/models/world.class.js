class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
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

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        enemies.forEach(enemy => {
            this.ctx.drawImage(this.enemy.img, this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
        });

        // Draw() wird immer wieder aufgerufen
        let self = this; // this wird innerhalb der u.a. Funktion nicht erkannt
        requestAnimationFrame(function() {
            self.draw();
        })
    }
}
