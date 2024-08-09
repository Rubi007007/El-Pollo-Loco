class CollectableObject extends MovableObject {
    
    
    constructor() {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');

        this.x = 300 + Math.random() * 700; // Zahl zwischen 200 und 700
        this.y = 80 + Math.random() * 150; // Zahl zwischen 80 und 230

        this.width = 70;
        this.height = 70;
    }
}