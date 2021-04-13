import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    console.log('Game over');
  }
}
