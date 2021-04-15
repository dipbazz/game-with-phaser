import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.scene.stop('Score');

    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    const playButton = new Button(this, config.scale.width / 2, config.scale.height / 2 - 80, 'blueButton1', 'blueButton2', 'Play', 'Login');
    this.add.existing(playButton);

    const optionsButton = new Button(this, config.scale.width / 2, config.scale.height / 2 - 30, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.add.existing(optionsButton);

    const creditButton = new Button(this, config.scale.width / 2, config.scale.height / 2 + 20, 'blueButton1', 'blueButton2', 'Leaderboard', 'Leaderboard');
    this.add.existing(creditButton);

    const aboutButton = new Button(this, config.scale.width / 2, config.scale.height / 2 + 70, 'blueButton1', 'blueButton2', 'About', 'Credits');
    this.add.existing(aboutButton);

    if(this.model.musicOn && !(this.model.bgMusicPlaying)) {
      this.model.bgMusicPlaying = true;
      this.bgMusic = this.sound.add('bgMusic', {volume: 0.5, loop: true});
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }

}
