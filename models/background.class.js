/**
 * Represents a background object in the game, which is a type of movable object.
 * The background object has a predefined width and height, and is positioned based on the given `x` coordinate.
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
