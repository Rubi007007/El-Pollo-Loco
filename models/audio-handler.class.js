class AudioHandler {
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