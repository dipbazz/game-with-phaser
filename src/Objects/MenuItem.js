import Phaser from 'phaser';

export default class MenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(scene, x, y, text, { color: '#fff', align: 'left' });
  }

  select() {
    this.setColor('#f8ff38');
  }

  deselect() {
    this.setColor('#fff');
  }

  unitKilled() {
    this.visible = false;
    this.active = false;
  }
}
