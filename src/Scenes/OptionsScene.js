import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(50, 20, 'Options', { fontSize: 20 });
    this.musicButton = this.add.image(50, 80, 'checkedBox');
    this.musicButton.scale = 0.6
    this.musicText = this.add.text(70, 70, 'Music Enabled', { fontSize: 18 });

    this.soundButton = this.add.image(50, 120, 'checkedBox');
    this.soundButton.scale = 0.6
    this.soundText = this.add.text(70, 110, 'Sound Enabled', { fontSize: 18 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      this.model.soundOn = !this.model.soundOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = new Button(this, config.scale.width/2, 180, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.add.existing(this.menuButton);

    this.updateAudio();
  }

  updateAudio() {
    if (this.model.musicOn) {
      this.musicButton.setTexture('checkedBox');
      if(!this.model.bgMusicPlaying) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    } else {
      this.musicButton.setTexture('uncheckedBox');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    }

    if (this.model.soundOn) {
      this.soundButton.setTexture('checkedBox');
    } else {
      this.soundButton.setTexture('uncheckedBox');
    }
  };

};
