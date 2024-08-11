class ThrowableObject extends MovableObject {
    
    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        
        if (otherDirection == false) {
            this.throwRight();
        } else if (otherDirection == true) {
            this.throwLeft();
        }
    }

    throwRight() {
        this.speedY = 17;
        this.applyGravity();
        setInterval(() => {
            this.x += 13;
        }, 25);
    }

    throwLeft() {
        this.speedY = 8;
        this.applyGravity();
        setInterval(() => {
            this.x -= 10;
        }, 25);
    }
}