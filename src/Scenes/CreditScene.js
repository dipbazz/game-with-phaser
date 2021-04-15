import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class CreditScene extends Phaser.Scene {
  constructor() {
    super('Credit');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    const menuButton = new Button(this, config.scale.width / 2, config.scale.height / 2 + 80, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.add.existing(menuButton);
    this.add.dom(config.scale.width / 2, config.scale.height / 2 - 30).createFromCache('about');
  }
}
