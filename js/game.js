let canvas;
let world;
let gameIsRunning = false;
let keyboard = new Keyboard();
let isMuted;
let btn_click_sound = new Audio('./audio/btn_click.mp3')
let game_music = new Audio('./audio/game_music.mp3')
let start_screen_music = new Audio('./audio/start_screen_music.mp3')

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    start_screen_music.pause();
    gameIsRunning = true;
    addKeyboardListeners();
    initLevel();
    world = new World(canvas, keyboard);
    
    if (!isMuted) {
        game_music.play();
        game_music.volume = 0.04;
    }
    
    console.log('My Char is', world.character);
}

function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    resetGame();
    startGame();
}

// TODO: Sounds resetten, werden dauerhaft abgespielt, sobald gameOver ist
function resetGame() {
    world.character.energy = 100;
    world.keyboard.DOWN = false;
    world.keyboard.UP = false;
    world.keyboard.LEFT = false;
    world.keyboard.RIGHT = false;
    world.keyboard.SPACE = false;
    world.keyboard.THROW = false;
}

function endGame() {
    document.getElementById('end-screen').style.display = 'block';
    game_music.pause();
    world.stopGame();
    gameIsRunning = false;
    removeKeyboardListeners();
}

function btnSound() {
    btn_click_sound.play();
}

// TODO: Sounds stumm schalten
function toggleVolume() {
    let speaker = document.getElementById('speaker-btn');
    
    if (!isMuted) {
        speaker.src = './img/11_menu/speaker_volume_off.png';
        isMuted = true;
        if (gameIsRunning) {
            game_music.pause();
        }
    } else if (isMuted) {
        speaker.src = './img/11_menu/speaker_volume_on.png';
        isMuted = false;
        if (gameIsRunning) {
            game_music.play();
            game_music.volume = 0.04;
        }
    }

    console.log('Sounds noch nicht deaktivierbar');
}

function addKeyboardListeners() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function removeKeyboardListeners() {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
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
}

function handleKeyUp(e) {
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
}
