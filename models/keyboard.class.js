/**
 * Represents the state of the keyboard inputs, specifically for mobile button interactions.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;

    constructor() {
        this.btnPressEventsMobile();
    }

    /**
     * Registers event listeners for touch events on mobile directional buttons and action buttons. 
     * Updates the corresponding state properties (e.g., LEFT, RIGHT, UP) based on user interaction.
     */
    btnPressEventsMobile() {
        document.getElementById('arrow-btn-left-mobile').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('arrow-btn-left-mobile').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('arrow-btn-right-mobile').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('arrow-btn-right-mobile').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('jump-btn-mobile').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });

        document.getElementById('jump-btn-mobile').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('throw-btn-mobile').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.THROW = true;
        });

        document.getElementById('throw-btn-mobile').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.THROW = false;
        });
    }
}