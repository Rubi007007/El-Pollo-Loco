class AudioHandler {
    // walking_sound = new Audio('./audio/walking.mp3');
    // snore_sound = new Audio('./audio/snore.mp3');
    // endboss_nearby_sound = new Audio('./audio/chicken/endboss_in_range.mp3');
    // endboss_theme = new Audio('./audio/chicken/endboss_theme.mp3');
    endboss_damage_sound = new Audio('./audio/chicken/endboss_damage_sound.mp3');
    small_chicken_sound = new Audio('./audio/chicken/small_chicken_damage_sound.mp3');
    chicken_sound = new Audio('./audio/chicken/chicken_damage_sound.mp3');
    throw_bottle_sound = new Audio('./audio/throw_bottle.mp3');
    splash_bottle_sound = new Audio('./audio/broken_glass_bottle.mp3');
    // collect_coin_sound = new Audio('./audio/collect_coin.mp3');
    // collect_bottle_sound = new Audio('./audio/collect_bottle.mp3');
    out_of_bottles_sound = new Audio('./audio/out_of_bottles.mp3');

    isMuted;
    isStopped;
    
    constructor(world) {
        this.world = world;
    }

    toggleVolume(sound, volume) {
        if (!isMuted || isMuted == null) {
            sound.volume = volume;
        } else {
            sound.volume = 0;
        }
    }

    toggleSound(sound) {
        if (this.isStopped) {
            sound.pause();
        } else if (!this.isStopped) {
            sound.play();
        }
    }
}