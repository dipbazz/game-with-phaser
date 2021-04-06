import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super ('Game');
  }

  create () {
    console.log('starting the game scene');
  }
}
