let canvas;
let world;
let keyboard = new Keyboard();
let isMuted;
let gameIsOver;
let btn_click_sound = new Audio('./audio/btn_click.mp3');
let game_music = new Audio('./audio/game_music.mp3');
let gameover_sound = new Audio('./audio/game_over.mp3');
let winning_sound = new Audio('./audio/winning_sound.mp3');

/**
 * Initializes the game by setting up the canvas and handling the start screen music.
 */
function init() {
    canvas = document.getElementById('canvas');
}

/**
 * Starts the game by hiding the start screen, showing the canvas, adding keyboard listeners, 
 * initializing the level, and starting game music.
 */
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    addKeyboardListeners();
    initLevel();
    world = new World(canvas, keyboard);

    world.audioHandler.toggleSound(game_music);
    world.audioHandler.toggleVolume(game_music, 0.1);
    game_music.loop = true;
}

/**
 * Restarts the game by resetting the game state and calling the `startGame` function.
 */
function restartGame() {

    if (world) {
        document.getElementById('win-screen').style.display = 'none';
        document.getElementById('end-screen').style.display = 'none';
        resetGame();
        startGame();
    }
}

/**
 * Restarts the game through a button click, clearing intervals and animations, 
 * and resetting the game with a slight delay.
 */
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

/**
 * Navigates to the home screen, handles the start screen music, resets the game, and 
 * shows the start screen while hiding other elements.
 */
function goToHomescreen() {
    gameIsOver = true;
    resetGame();
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}

/**
 * Resets the game state, including character properties, keyboard input states, and music. 
 * Hides the canvas and resets the world object.
 */
function resetGame() {
    world.collectedBottles = 0;
    world.collectedCoins = 0;
    world.audioHandler.isStopped = false;
    world.character.invulnerable = false;
    world.character.JUMP_SOUNDS = [];
    world.character.HURT_SOUNDS = [];
    world.character.energy = 100;
    world.character.resetIdleTimer();
    
    world.invulnerable = false;
    world.keyboard.DOWN = false;
    world.keyboard.UP = false;
    world.keyboard.LEFT = false;
    world.keyboard.RIGHT = false;
    world.keyboard.SPACE = false;
    world.keyboard.THROW = false;

    gameIsOver = null;
    game_music.currentTime = 0;
    game_music.pause();
    world = null;
    document.getElementById('canvas').style.display = 'none';
}

/**
 * Stops the game and handles the game music and boss music. 
 * Makes the character invulnerable and stops the game processes.
 */
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

/**
 * Ends the game, shows the end screen, plays the game over sound, 
 * and calls the `finishedGame` function to stop the game.
 */
function endGame() {
    document.getElementById('end-screen').style.display = 'block';
    world.audioHandler.toggleSound(gameover_sound);
    world.audioHandler.toggleVolume(gameover_sound, 1);
    gameIsOver = true;
    finishedGame();
}

/**
 * Handles winning the game, shows the win screen, plays the winning sound, 
 * and calls the `finishedGame` function to stop the game.
 */
function winGame() {
    document.getElementById('win-screen').style.display = 'block';
    world.audioHandler.toggleSound(winning_sound);
    world.audioHandler.toggleVolume(winning_sound, 0.7);
    gameIsOver = true;
    finishedGame();
}

/**
 * Plays a button click sound when the game is not muted.
 */
function btnSound() {
    if (world && !isMuted) {
        world.audioHandler.toggleSound(btn_click_sound);
        world.audioHandler.toggleVolume(btn_click_sound, 1);
    }
}

/**
 * Opens the menu by making the menu elements visible and removing any closing animations.
 */
function openMenu() {
    document.getElementById('menu-control').classList.remove('closing');
    document.getElementById('menu-control').style.display = 'flex';
    document.getElementById('background-overlay').style.display = 'block';
}

/**
 * Opens the impressum (legal notice) by making it visible and removing any closing animations.
 */
function openImpressum() {
    document.getElementById('impressum').classList.remove('closing');
    document.getElementById('impressum').style.display = 'flex';
    document.getElementById('background-overlay').style.display = 'block';
}

/**
 * Closes the menu by adding a closing animation, hiding the menu after a delay, 
 * and hiding the background overlay.
 */
function closeMenu() {
    document.getElementById('menu-control').classList.add('closing');
    setTimeout(() => {
        document.getElementById('menu-control').style.display = 'none';
    }, 300);
    document.getElementById('background-overlay').style.display = 'none';
}

/**
 * Closes the impressum by adding a closing animation, hiding it after a delay, 
 * and hiding the background overlay.
 */
function closeImpressum() {
    document.getElementById('impressum').classList.add('closing');
    setTimeout(() => {
        document.getElementById('impressum').style.display = 'none';
    }, 300);
    document.getElementById('background-overlay').style.display = 'none';
}

/**
 * Toggles the volume button state and handles muting or unmuting the game music.
 */
function toggleVolumeBtn() {
    let speaker = document.getElementById('speaker-btn');
    let speakerMobile = document.getElementById('speaker-btn-mobile');

    if (!isMuted) {
        speaker.src = './img/11_menu/speaker_volume_off.png';
        speakerMobile.src = './img/11_menu/speaker_volume_off.png';
        game_music.volume = 0;
        isMuted = true;
    } else if (isMuted) {
        speaker.src = './img/11_menu/speaker_volume_on.png';
        speakerMobile.src = './img/11_menu/speaker_volume_on.png';
        isMuted = false;
        if (world) {
            world.audioHandler.toggleVolume(game_music, 0.04);
        }
    }
}

/**
 * Adds event listeners for keyboard input (keydown and keyup events).
 */
function addKeyboardListeners() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

/**
 * Removes event listeners for keyboard input (keydown and keyup events).
 */
function removeKeyboardListeners() {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
}

/**
 * Handles keydown events and updates the keyboard input state accordingly.
 * @param {KeyboardEvent} e - The keydown event.
 */
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
    if (e.keyCode == 70) {
        keyboard.THROW = true;
    }
}

/**
 * Handles keyup events and updates the keyboard input state accordingly.
 * @param {KeyboardEvent} e - The keyup event.
 */
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
    if (e.keyCode == 70) {
        keyboard.THROW = false;
    }
}

/**
 * Enters fullscreen mode by adjusting the CSS classes and updating the fullscreen button.
 */
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

/**
 * Requests fullscreen mode for the specified element.
 * @param {HTMLElement} element - The element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Handles the change in fullscreen state and updates the UI elements 
 * based on whether the fullscreen mode is active or not.
 */
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