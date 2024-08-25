let canvas;
let world;
let keyboard = new Keyboard();
let isMuted;
let btn_click_sound = new Audio('./audio/btn_click.mp3');
let game_music = new Audio('./audio/game_music.mp3');
let start_screen_music = new Audio('./audio/start_screen_music.mp3');
let gameover_sound = new Audio('./audio/game_over.mp3');
let winning_sound = new Audio('./audio/winning_sound.mp3');

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
    
    world.audioHandler.toggleSound(game_music);
    world.audioHandler.toggleVolume(game_music, 0.04);
    game_music.loop = true;
    
    console.log('My Char is', world.character);
}

// TODO: wenn Game gewonnen, zum startScreen zurück
function restartGame() {
    document.getElementById('end-screen').style.display = 'none';
    resetGame();
    startGame();
}

function goToHomescreen() {
    resetGame();
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

// TODO: Sounds resetten, werden dauerhaft abgespielt, sobald gameOver ist
function resetGame() {
    world.audioHandler.isStopped = false;
    world.character.invulnerable = false;
    world.character.JUMP_SOUNDS = [];
    world.character.HURT_SOUNDS = [];
    world.character.energy = 100;
    world.keyboard.DOWN = false;
    world.keyboard.UP = false;
    world.keyboard.LEFT = false;
    world.keyboard.RIGHT = false;
    world.keyboard.SPACE = false;
    world.keyboard.THROW = false;
}


function finishedGame() {
    game_music.pause();
    if (world.endbossSpawned) {
        world.endboss.endboss_theme.pause();
    }
    // TODO: isDead animation noch ausführen lassen, dann Spiel beenden
    world.character.invulnerable = true;
    world.stopGame();
    setTimeout(() => {
        world.audioHandler.isStopped = true;
    }, 200);
    removeKeyboardListeners();
}

function endGame() {
    document.getElementById('end-screen').style.display = 'block';
    world.audioHandler.toggleSound(gameover_sound);
    world.audioHandler.toggleVolume(gameover_sound, 1);
    finishedGame();
}

function winGame() {
    document.getElementById('win-screen').style.display = 'block';
    world.audioHandler.toggleSound(winning_sound);
    world.audioHandler.toggleVolume(winning_sound, 0.7);
    finishedGame();
}

function btnSound() {
    world.audioHandler.toggleSound(btn_click_sound);
    world.audioHandler.toggleVolume(btn_click_sound, 1);
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
        world.audioHandler.toggleVolume(game_music, 0.04)
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
