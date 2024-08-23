let canvas;
let world;
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
    addKeyboardListeners();
    initLevel();
    world = new World(canvas, keyboard);
    
    game_music.play();
    volume(game_music, 0.04);
    
    console.log('My Char is', world.character);
}

// TODO: wenn Game gewonnen, zum startScreen zurück
function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
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
    removeKeyboardListeners();
}

function winGame() {
    document.getElementById('win-screen').style.display = 'block';
    game_music.pause();
    world.stopGame();
    removeKeyboardListeners();
}

function btnSound() {
    btn_click_sound.play();
}

function toggleVolume() {
    let speaker = document.getElementById('speaker-btn');
    
    if (!isMuted) {
        speaker.src = './img/11_menu/speaker_volume_off.png';
        game_music.volume = 0;
        isMuted = true;
    } else if (isMuted) {
        speaker.src = './img/11_menu/speaker_volume_on.png';
        isMuted = false;
        game_music.volume = 0.04;
    }
}

function volume(sound, volume) {
    if (!isMuted || isMuted == null) {
        sound.volume = volume;
    } else {
        sound.volume = 0;
    }
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
