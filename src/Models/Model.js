export default class Model {
  constructor() {
    this.sound = true;
    this.music = true;
    this.bgMusic = false;
    this.playerScore = 0;
    this.playerUsername = '';
  }

  set musicOn(value) {
    this.music = value;
  }

  get musicOn() {
    return this.music;
  }

  set score(value) {
    this.playerScore = value;
  }

  get score() {
    return this.playerScore;
  }

  set username(value) {
    this.playerUsername = value;
  }

  get username() {
    return this.playerUsername;
  }

  set soundOn(value) {
    this.sound = value;
  }

  get soundOn() {
    return this.sound;
  }

  set bgMusicPlaying(value) {
    this.bgMusic = value;
  }

  get bgMusicPlaying() {
    return this.bgMusic;
  }
}
