import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  create () {
    console.log('Loading boot scene');
    this.scene.start('Preloader');
  }
}
