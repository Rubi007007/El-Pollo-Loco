let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    initLevel();
    world = new World(canvas, keyboard);

    console.log('My Char is', world.character);
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 40 || e.keyCode == 83) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 38 || e.keyCode == 87) {
        keyboard.UP = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 70 || e.keyCode == 13 || e.keyCode == 82) { // 70: F 13: Enter 82: R
        keyboard.THROW = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39 || e.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37 || e.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 40 || e.keyCode == 83) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 38 || e.keyCode == 87) {
        keyboard.UP = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 70 || e.keyCode == 13 || e.keyCode == 82) {
        keyboard.THROW = false;
    }
});
