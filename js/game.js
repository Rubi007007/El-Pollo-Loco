let canvas;
let world;
let keyboard = new Keyboard();
let isMuted;
let btn_click_sound = new Audio('./audio/btn_click.mp3');
let game_music = new Audio('./audio/game_music.mp3');
// let start_screen_music = new Audio('./audio/start_screen_music.mp3');
let gameover_sound = new Audio('./audio/game_over.mp3');
let winning_sound = new Audio('./audio/winning_sound.mp3');

function init() {
    canvas = document.getElementById('canvas');
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    // start_screen_music.pause();
    addKeyboardListeners();
    initLevel();
    world = new World(canvas, keyboard);

    world.audioHandler.toggleSound(game_music);
    world.audioHandler.toggleVolume(game_music, 0.04);
    game_music.loop = true;

    console.log('My Char is', world.character);
}

function restartGame() {
    if (world) {
        document.getElementById('end-screen').style.display = 'none';
        resetGame();
        startGame();
    }
}

function restartGameButton() {
    if (world) {
        clearInterval(world.gameInterval);
        cancelAnimationFrame(world.animationFrame);
        document.getElementById('win-screen').style.display = 'none';
        document.getElementById('end-screen').style.display = 'none';
        resetGame();
        setTimeout(() => {startGame()}, 100);
    }
}

function goToHomescreen() {
    resetGame();
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

// TODO: Sounds resetten, werden dauerhaft abgespielt, sobald gameOver ist
function resetGame() {
    world.collectedBottles = 0;
    world.collectedCoins = 0;
    world.audioHandler.isStopped = false;
    world.character.invulnerable = false;
    world.character.JUMP_SOUNDS = [];
    world.character.HURT_SOUNDS = [];
    world.character.energy = 100;
    world.invulnerable = false;
    world.keyboard.DOWN = false;
    world.keyboard.UP = false;
    world.keyboard.LEFT = false;
    world.keyboard.RIGHT = false;
    world.keyboard.SPACE = false;
    world.keyboard.THROW = false;

    game_music.currentTime = 0;
    game_music.pause();
    world = null;
    document.getElementById('canvas').style.display = 'none';
}

function finishedGame() {
    game_music.pause();
    if (world.endbossSpawned) {
        world.endboss.endboss_theme.pause();
        world.endboss.endboss_theme.currentTime = 0;
    }
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
    if (world) {
        world.audioHandler.toggleSound(btn_click_sound);
        world.audioHandler.toggleVolume(btn_click_sound, 1);
    }
}

function openMenu() {
    document.getElementById('menu-control').classList.remove('closing');
    document.getElementById('menu-control').style.display = 'flex';
    document.getElementById('background-overlay').style.display = 'block';
}

function openImpressum() {
    document.getElementById('impressum').classList.remove('closing');
    document.getElementById('impressum').style.display = 'flex';
    document.getElementById('background-overlay').style.display = 'block';
}

function closeMenu() {
    document.getElementById('menu-control').classList.add('closing');
    setTimeout(() => {
        document.getElementById('menu-control').style.display = 'none';
    }, 300);
    document.getElementById('background-overlay').style.display = 'none';
}

function closeImpressum() {
    document.getElementById('impressum').classList.add('closing');
    setTimeout(() => {
        document.getElementById('impressum').style.display = 'none';
    }, 300);
    document.getElementById('background-overlay').style.display = 'none';
}

function toggleVolumeBtn() {
    let speaker = document.getElementById('speaker-btn');

    if (!isMuted) {
        speaker.src = './img/11_menu/speaker_volume_off.png';
        game_music.volume = 0;
        isMuted = true;
    } else if (isMuted) {
        speaker.src = './img/11_menu/speaker_volume_on.png';
        isMuted = false;
        if (world) {
            world.audioHandler.toggleVolume(game_music, 0.04);
        }
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
    if (e.keyCode == 70 || e.keyCode == 13 || e.keyCode == 82) {
        // 70: F 13: Enter 82: R
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

function fullscreen() {
    document.getElementById('canvas').classList.add('fullscreen');
    document.getElementById('start-screen').classList.add('fullscreen');
    document.getElementById('start-screen-bg').classList.add('fullscreen');
    document.getElementById('win-screen').classList.add('fullscreen');
    document.getElementById('win-screen-bg').classList.add('fullscreen-win-screen');
    document.getElementById('end-screen').classList.add('fullscreen');
    document.getElementById('end-screen-bg').classList.add('fullscreen');
    document.getElementById('menu-btns').classList.add('menu-fullscreen-btns');
    document.getElementById('fullscreen-btn').src = './img/11_menu/fullscreen_exit.png';
    document.getElementById('fullscreen-btn').setAttribute('onClick', 'exitFullscreen()' );
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        // iOS Safari
        element.webkitRequestFullscreen();
    }
}

document.addEventListener('fullscreenchange', function(){ 
    if (!document.fullscreenElement) { 
        document.getElementById('fullscreen-btn').src = './img/11_menu/fullscreen.png';
        document.getElementById('fullscreen-btn').setAttribute('onClick', 'fullscreen()' );
        document.getElementById('canvas').classList.remove('fullscreen');
        document.getElementById('start-screen').classList.remove('fullscreen');
        document.getElementById('start-screen-bg').classList.remove('fullscreen');
        document.getElementById('win-screen').classList.remove('fullscreen');
        document.getElementById('win-screen-bg').classList.remove('fullscreen-win-screen');
        document.getElementById('end-screen').classList.remove('fullscreen');
        document.getElementById('end-screen-bg').classList.remove('fullscreen');
        document.getElementById('menu-btns').classList.remove('menu-fullscreen-btns');
    }
})