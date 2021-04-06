import 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    console.log('creating a title scene ...');

    this.scene.start('Game');
  }
}
