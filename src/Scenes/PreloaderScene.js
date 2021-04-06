import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  preload () {
    console.log('Loading assets in preloader');
  }

  create () {
    console.log('creating scene preloader')
    this.scene.start('Title');
  }
}
