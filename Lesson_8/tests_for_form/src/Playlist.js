class Playlist {
    constructor() {
        this.songs = [];
    }
    addSong(song) {
        this.songs.push(song);
    }
    getSong(index) {
        return this.songs[index];
    }
    removeSong(index) {
        this.songs.splice(index, 1);
    }
}