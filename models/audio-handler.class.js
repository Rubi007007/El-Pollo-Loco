/**
 * Handles audio control for the game, including muting, stopping, and managing sound volumes.
 * @class
 */
class AudioHandler {
    isMuted;
    isStopped;
    
    constructor(world) {
        this.world = world;
    }

    /**
     * Toggles the volume of the specified sound. If the game is muted, the volume is set to 0.
     * Otherwise, the volume is set to the specified value.
     * @param {HTMLAudioElement} sound - The sound object whose volume will be adjusted.
     * @param {number} volume - The volume level to set, between 0 and 1.
     */
    toggleVolume(sound, volume) {
        if (!isMuted || isMuted == null) {
            sound.volume = volume;
        } else {
            sound.volume = 0;
        }
    }

    /**
     * Toggles the sound playback based on the `isStopped` property. 
     * If `isStopped` is true, the sound is paused; otherwise, it is played.
     * @param {HTMLAudioElement} sound - The sound object to play or pause.
     */
    toggleSound(sound) {
        if (this.isStopped) {
            sound.pause();
        } else if (!this.isStopped) {
            sound.play();
        }
    }
}